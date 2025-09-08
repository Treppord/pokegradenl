import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('🔍 DEBUG-WEBHOOK: Checking webhook configuration...');
  
  const baseUrl = process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'http://localhost:3000';
  const webhookUrl = `${baseUrl}/api/mollie/webhook`;
  
  const debugInfo = {
    webhookUrl,
    baseUrl,
    environment: {
      NEXTAUTH_URL: process.env.NEXTAUTH_URL,
      VERCEL_URL: process.env.VERCEL_URL,
      NODE_ENV: process.env.NODE_ENV
    },
    mollieConfig: {
      hasMollieApiKey: !!process.env.MOLLIE_API_KEY,
      mollieApiKeyPrefix: process.env.MOLLIE_API_KEY?.substring(0, 8) + '...',
      hasWebhookSecret: !!process.env.MOLLIE_WEBHOOK_SECRET,
      webhookSecretPrefix: process.env.MOLLIE_WEBHOOK_SECRET?.substring(0, 8) + '...',
    },
    emailConfig: {
      hasGmailUser: !!process.env.GMAIL_USER_EMAIL,
      hasAdminEmail: !!process.env.ADMIN_EMAIL,
      gmailUser: process.env.GMAIL_USER_EMAIL,
      adminEmail: process.env.ADMIN_EMAIL
    }
  };
  
  console.log('🔍 DEBUG-WEBHOOK: Configuration info:', debugInfo);
  
  return NextResponse.json({
    success: true,
    message: 'Webhook debug information',
    ...debugInfo,
    instructions: {
      step1: 'Copy the webhookUrl and set it in your Mollie Dashboard',
      step2: 'Go to https://my.mollie.com/dashboard/developers/webhooks',
      step3: 'Add webhook endpoint with the URL above',
      step4: 'Select "Payment status changes" as the event',
      step5: 'Copy the webhook secret from Mollie and add MOLLIE_WEBHOOK_SECRET to your .env',
      step6: 'Test with a real payment to see if webhook is called'
    },
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  console.log('🔍 DEBUG-WEBHOOK: Webhook POST received for debugging');
  
  try {
    const body = await request.text();
    const headers = Object.fromEntries(request.headers.entries());
    
    console.log('📝 DEBUG-WEBHOOK: Headers received:', headers);
    console.log('📝 DEBUG-WEBHOOK: Body received:', body);
    
    const params = new URLSearchParams(body);
    const paymentId = params.get('id');
    
    return NextResponse.json({
      success: true,
      message: 'Debug webhook received!',
      received: {
        body,
        headers,
        paymentId,
        timestamp: new Date().toISOString()
      }
    });
    
  } catch (error) {
    console.error('❌ DEBUG-WEBHOOK: Error processing debug webhook:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
