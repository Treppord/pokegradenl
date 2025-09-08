import { NextRequest, NextResponse } from 'next/server';

// Simple webhook monitor to see if ANY requests are coming in
let webhookCalls: Array<{
  timestamp: string;
  method: string;
  url: string;
  headers: Record<string, string>;
  body: string;
  userAgent?: string;
}> = [];

// Store only last 50 calls to prevent memory issues
const MAX_CALLS = 50;

export async function GET(request: NextRequest) {
  console.log('📊 WEBHOOK-MONITOR: Checking recent webhook calls...');
  
  return NextResponse.json({
    success: true,
    message: 'Recent webhook activity',
    totalCalls: webhookCalls.length,
    recentCalls: webhookCalls.slice(-20), // Show last 20
    lastCall: webhookCalls[webhookCalls.length - 1] || null,
    instructions: {
      note: 'This endpoint monitors all requests to help debug webhook issues',
      mollieWebhookUrl: `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'https://your-domain'}/api/mollie/webhook`,
      monitorUrl: `${process.env.NEXTAUTH_URL || process.env.VERCEL_URL || 'https://your-domain'}/api/webhook-monitor`,
      howToTest: 'Make a payment and check this URL to see if Mollie called your webhook'
    },
    timestamp: new Date().toISOString()
  });
}

export async function POST(request: NextRequest) {
  console.log('📊 WEBHOOK-MONITOR: POST request received for monitoring');
  
  try {
    const body = await request.text();
    const headers: Record<string, string> = {};
    
    // Convert headers to plain object
    request.headers.forEach((value, key) => {
      headers[key] = value;
    });
    
    const call = {
      timestamp: new Date().toISOString(),
      method: 'POST',
      url: request.url,
      headers,
      body,
      userAgent: headers['user-agent']
    };
    
    webhookCalls.push(call);
    
    // Keep only recent calls
    if (webhookCalls.length > MAX_CALLS) {
      webhookCalls = webhookCalls.slice(-MAX_CALLS);
    }
    
    console.log('📊 WEBHOOK-MONITOR: Call logged:', {
      timestamp: call.timestamp,
      bodyLength: body.length,
      hasSignature: !!headers['x-mollie-signature'],
      userAgent: call.userAgent
    });
    
    return NextResponse.json({
      success: true,
      message: 'Webhook call logged',
      callId: call.timestamp,
      hasBody: body.length > 0,
      hasSignature: !!headers['x-mollie-signature']
    });
    
  } catch (error) {
    console.error('❌ WEBHOOK-MONITOR: Error logging call:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}
