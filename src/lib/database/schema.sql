-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create addresses table
CREATE TABLE IF NOT EXISTS public.addresses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    type VARCHAR(20) NOT NULL CHECK (type IN ('shipping', 'billing')),
    street VARCHAR(200) NOT NULL,
    city VARCHAR(100) NOT NULL,
    postal_code VARCHAR(20) NOT NULL,
    country VARCHAR(100) NOT NULL DEFAULT 'Netherlands',
    is_default BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create cards table
CREATE TABLE IF NOT EXISTS public.cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    set_name VARCHAR(200) NOT NULL,
    card_number VARCHAR(50) NOT NULL,
    variant VARCHAR(100),
    language VARCHAR(50) DEFAULT 'English',
    condition VARCHAR(50) NOT NULL,
    estimated_value DECIMAL(10,2),
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create submissions table
CREATE TABLE IF NOT EXISTS public.submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    status VARCHAR(20) NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'submitted', 'received', 'processing', 'graded', 'shipped', 'completed', 'cancelled')),
    service_tier VARCHAR(20) NOT NULL CHECK (service_tier IN ('standard', 'value', 'premium')),
    total_value DECIMAL(10,2) NOT NULL DEFAULT 0,
    total_fee DECIMAL(10,2) NOT NULL DEFAULT 0,
    shipping_address_id UUID REFERENCES public.addresses(id),
    return_address_id UUID REFERENCES public.addresses(id),
    tracking_number VARCHAR(100),
    return_tracking_number VARCHAR(100),
    submitted_at TIMESTAMP WITH TIME ZONE,
    expected_completion_at TIMESTAMP WITH TIME ZONE,
    completed_at TIMESTAMP WITH TIME ZONE,
    notes TEXT,
    payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
    payment_id VARCHAR(100),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create submission_cards junction table
CREATE TABLE IF NOT EXISTS public.submission_cards (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE,
    card_id UUID REFERENCES public.cards(id) ON DELETE CASCADE,
    grade_id UUID,
    grade_score INTEGER,
    subgrades JSONB,
    authenticity_score DECIMAL(5,2),
    graded_at TIMESTAMP WITH TIME ZONE,
    grader_notes TEXT,
    certificate_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(submission_id, card_id)
);

-- Create tracking_events table
CREATE TABLE IF NOT EXISTS public.tracking_events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    submission_id UUID REFERENCES public.submissions(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(200),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);
CREATE INDEX IF NOT EXISTS idx_addresses_user_id ON public.addresses(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_user_id ON public.submissions(user_id);
CREATE INDEX IF NOT EXISTS idx_submissions_status ON public.submissions(status);
CREATE INDEX IF NOT EXISTS idx_submission_cards_submission_id ON public.submission_cards(submission_id);
CREATE INDEX IF NOT EXISTS idx_tracking_events_submission_id ON public.tracking_events(submission_id);

-- Enable Row Level Security (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tracking_events ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Profiles: Users can only see and update their own profile
CREATE POLICY "Users can view own profile" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.profiles
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Addresses: Users can only manage their own addresses
CREATE POLICY "Users can view own addresses" ON public.addresses
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own addresses" ON public.addresses
    FOR ALL USING (auth.uid() = user_id);

-- Submissions: Users can only see their own submissions
CREATE POLICY "Users can view own submissions" ON public.submissions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own submissions" ON public.submissions
    FOR ALL USING (auth.uid() = user_id);

-- Submission cards: Users can only see cards from their submissions
CREATE POLICY "Users can view own submission cards" ON public.submission_cards
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.submissions 
            WHERE submissions.id = submission_cards.submission_id 
            AND submissions.user_id = auth.uid()
        )
    );

CREATE POLICY "Users can manage own submission cards" ON public.submission_cards
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM public.submissions 
            WHERE submissions.id = submission_cards.submission_id 
            AND submissions.user_id = auth.uid()
        )
    );

-- Tracking events: Users can only view events for their submissions
CREATE POLICY "Users can view own tracking events" ON public.tracking_events
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM public.submissions 
            WHERE submissions.id = tracking_events.submission_id 
            AND submissions.user_id = auth.uid()
        )
    );

-- Create functions for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_addresses_updated_at BEFORE UPDATE ON public.addresses
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON public.submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submission_cards_updated_at BEFORE UPDATE ON public.submission_cards
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
