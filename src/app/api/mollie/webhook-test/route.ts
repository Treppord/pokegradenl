import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('🧪 WEBHOOK-TEST: Test endpoint called');
  
  return NextResponse.json({
    success: true,
    message: 'Webhook endpoint is reachable!',
    timestamp: new Date().toISOString(),
    url: request.url,
    method: 'GET'
  });
}

export async function POST(request: NextRequest) {
  console.log('🧪 WEBHOOK-TEST: POST test endpoint called');
  
  try {
    const body = await request.text();
    console.log('📝 WEBHOOK-TEST: Body received:', body);
    
    return NextResponse.json({
      success: true,
      message: 'Webhook POST endpoint is working!',
      timestamp: new Date().toISOString(),
      receivedBody: body,
      url: request.url,
      method: 'POST'
    });
    
  } catch (error) {
    console.error('❌ WEBHOOK-TEST: Error processing POST:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
