-- Add payment-related tables to existing schema

-- Create payment_orders table
CREATE TABLE IF NOT EXISTS public.payment_orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    paypal_order_id VARCHAR(100) UNIQUE NOT NULL,
    paypal_payer_id VARCHAR(100),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'EUR',
    status VARCHAR(20) NOT NULL DEFAULT 'created' CHECK (status IN ('created', 'approved', 'completed', 'cancelled', 'failed')),
    payment_method VARCHAR(20) DEFAULT 'paypal',
    items JSONB,
    payment_details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create pending_accounts table for pre-payment account setup
CREATE TABLE IF NOT EXISTS public.pending_accounts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    payment_order_id UUID REFERENCES public.payment_orders(id) ON DELETE CASCADE,
    setup_token VARCHAR(255) UNIQUE NOT NULL,
    token_expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    used_at TIMESTAMP WITH TIME ZONE
);

-- Update profiles table to track account creation source
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS account_source VARCHAR(20) DEFAULT 'direct' CHECK (account_source IN ('direct', 'google', 'payment'));

ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS payment_order_id UUID REFERENCES public.payment_orders(id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_payment_orders_email ON public.payment_orders(email);
CREATE INDEX IF NOT EXISTS idx_payment_orders_paypal_id ON public.payment_orders(paypal_order_id);
CREATE INDEX IF NOT EXISTS idx_payment_orders_status ON public.payment_orders(status);
CREATE INDEX IF NOT EXISTS idx_pending_accounts_email ON public.pending_accounts(email);
CREATE INDEX IF NOT EXISTS idx_pending_accounts_token ON public.pending_accounts(setup_token);
CREATE INDEX IF NOT EXISTS idx_pending_accounts_expires ON public.pending_accounts(token_expires_at);

-- Enable RLS on new tables
ALTER TABLE public.payment_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pending_accounts ENABLE ROW LEVEL SECURITY;

-- RLS policies for payment_orders
CREATE POLICY "Users can view own payment orders" ON public.payment_orders
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND (
            email = (SELECT email FROM public.profiles WHERE id = auth.uid())
        )
    );

-- RLS policies for pending_accounts (more restrictive - only for setup process)
CREATE POLICY "Pending accounts are private" ON public.pending_accounts
    FOR ALL USING (false); -- Only accessible via service role

-- Create trigger for updated_at on payment_orders
CREATE TRIGGER update_payment_orders_updated_at BEFORE UPDATE ON public.payment_orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create function to clean up expired tokens
CREATE OR REPLACE FUNCTION cleanup_expired_tokens()
RETURNS void AS $$
BEGIN
    DELETE FROM public.pending_accounts 
    WHERE token_expires_at < NOW() AND is_used = FALSE;
END;
$$ LANGUAGE plpgsql;

-- Create function to generate secure token
CREATE OR REPLACE FUNCTION generate_setup_token()
RETURNS TEXT AS $$
BEGIN
    RETURN encode(gen_random_bytes(32), 'base64url');
END;
$$ LANGUAGE plpgsql;
