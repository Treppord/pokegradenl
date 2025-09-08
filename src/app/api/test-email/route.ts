import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/gmail/client';

export async function GET(request: NextRequest) {
  console.log('🧪 TEST-EMAIL: Starting email test...');
  
  try {
    // Check environment variables
    const envCheck = {
      hasGmailUser: !!process.env.GMAIL_USER_EMAIL,
      hasAdminEmail: !!process.env.ADMIN_EMAIL,
      hasClientId: !!process.env.GMAIL_CLIENT_ID,
      hasClientSecret: !!process.env.GMAIL_CLIENT_SECRET,
      hasRefreshToken: !!process.env.GMAIL_REFRESH_TOKEN,
      gmailUserValue: process.env.GMAIL_USER_EMAIL,
      adminEmailValue: process.env.ADMIN_EMAIL || process.env.GMAIL_USER_EMAIL
    };
    
    console.log('🔧 TEST-EMAIL: Environment variables check:', envCheck);
    
    if (!envCheck.hasGmailUser || !envCheck.hasClientId || !envCheck.hasClientSecret || !envCheck.hasRefreshToken) {
      return NextResponse.json({
        success: false,
        error: 'Missing required environment variables',
        envCheck
      }, { status: 400 });
    }

    const testEmail = envCheck.adminEmailValue;
    if (!testEmail) {
      return NextResponse.json({
        success: false,
        error: 'No admin email configured',
        envCheck
      }, { status: 400 });
    }

    console.log('📧 TEST-EMAIL: Sending test email to:', testEmail);
    
    await sendEmail({
      to: testEmail,
      subject: '🧪 Test Email from PokeGrade NL',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background: #f5f5f5;">
          <div style="background: white; padding: 30px; border-radius: 10px; max-width: 500px; margin: 0 auto;">
            <h1 style="color: #dc3545;">✅ Email Test Successful!</h1>
            <p>This is a test email from your PokeGrade NL application.</p>
            <p><strong>Timestamp:</strong> ${new Date().toISOString()}</p>
            <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
            <p>If you're receiving this email, your Gmail integration is working correctly!</p>
            <hr style="margin: 20px 0;">
            <p style="color: #666; font-size: 12px;">
              This email was sent from: ${process.env.GMAIL_USER_EMAIL}<br>
              Environment check: ${JSON.stringify(envCheck, null, 2)}
            </p>
          </div>
        </div>
      `,
      text: `
✅ Email Test Successful!

This is a test email from your PokeGrade NL application.
Timestamp: ${new Date().toISOString()}
Environment: ${process.env.NODE_ENV || 'development'}

If you're receiving this email, your Gmail integration is working correctly!

Sent from: ${process.env.GMAIL_USER_EMAIL}
Environment check: ${JSON.stringify(envCheck, null, 2)}
      `
    });
    
    console.log('✅ TEST-EMAIL: Test email sent successfully!');
    
    return NextResponse.json({
      success: true,
      message: 'Test email sent successfully',
      sentTo: testEmail,
      timestamp: new Date().toISOString(),
      envCheck
    });

  } catch (error) {
    console.error('❌ TEST-EMAIL: Failed to send test email:', error);
    console.error('❌ TEST-EMAIL: Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
