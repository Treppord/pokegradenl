import { NextRequest, NextResponse } from 'next/server';
import MollieService from '@/services/mollieService';
import { sendEmail } from '@/lib/gmail/client';
import { createUserConfirmationEmail, createAdminNotificationEmail } from '@/lib/email/templates';

export async function POST(request: NextRequest) {
  console.log('🔔 WEBHOOK: Mollie webhook endpoint called');
  
  try {
    const body = await request.text();
    console.log('📝 WEBHOOK: Raw body received:', body);
    
    const params = new URLSearchParams(body);
    const paymentId = params.get('id');
    console.log('💳 WEBHOOK: Extracted payment ID:', paymentId);

    if (!paymentId) {
      console.log('❌ WEBHOOK: No payment ID found in request');
      return NextResponse.json(
        { error: 'Missing payment ID' },
        { status: 400 }
      );
    }

    console.log('🔄 WEBHOOK: Creating Mollie service...');
    const mollieService = new MollieService();
    
    console.log('🔍 WEBHOOK: Fetching payment details...');
    const payment = await mollieService.getPayment(paymentId);

    console.log('📊 WEBHOOK: Payment status received:', {
      id: paymentId,
      status: payment.status,
      amount: payment.amount,
      hasMetadata: !!payment.metadata
    });

    // Here you would typically:
    // 1. Update your database with the payment status
    // 2. Send confirmation emails
    // 3. Update order status
    // 4. Process the submission data

    if (payment.status === 'paid') {
      console.log('✅ WEBHOOK: Payment is PAID, processing...');
      
      // Parse submission data from metadata
      if (payment.metadata && typeof payment.metadata === 'object' && payment.metadata !== null) {
        console.log('📦 WEBHOOK: Metadata found, checking for submission data...');
        const metadata = payment.metadata as Record<string, string>;
        
        if (metadata.submissionData) {
          console.log('📄 WEBHOOK: Submission data found in metadata, parsing...');
          const submissionData = JSON.parse(metadata.submissionData);
          console.log('🎯 WEBHOOK: Parsed submission data:', {
            tier: submissionData.selectedTier,
            cardCount: submissionData.cards?.length,
            customerEmail: submissionData.shippingInfo?.pickupAddress?.email,
            total: submissionData.total
          });
          
          // Check environment variables
          const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER_EMAIL;
          console.log('🔧 WEBHOOK: Environment check:', {
            hasGmailUser: !!process.env.GMAIL_USER_EMAIL,
            hasAdminEmail: !!process.env.ADMIN_EMAIL,
            hasClientId: !!process.env.GMAIL_CLIENT_ID,
            hasClientSecret: !!process.env.GMAIL_CLIENT_SECRET,
            hasRefreshToken: !!process.env.GMAIL_REFRESH_TOKEN,
            adminEmailValue: adminEmail
          });
          
          try {
            console.log('📧 WEBHOOK: Starting email sending process...');
            
            // Send confirmation email to customer
            console.log('👤 WEBHOOK: Preparing customer confirmation email...');
            const userEmailTemplate = createUserConfirmationEmail(paymentId, submissionData);
            const customerEmail = submissionData.shippingInfo.pickupAddress.email;
            
            console.log('📤 WEBHOOK: Sending confirmation email to:', customerEmail);
            await sendEmail({
              to: customerEmail,
              subject: userEmailTemplate.subject,
              html: userEmailTemplate.html,
              text: userEmailTemplate.text,
            });
            console.log('✅ WEBHOOK: Customer confirmation email sent successfully to:', customerEmail);

            // Send notification email to admin
            if (adminEmail) {
              console.log('🔔 WEBHOOK: Preparing admin notification email...');
              const adminEmailTemplate = createAdminNotificationEmail(paymentId, submissionData);
              
              console.log('📤 WEBHOOK: Sending admin notification to:', adminEmail);
              await sendEmail({
                to: adminEmail,
                subject: adminEmailTemplate.subject,
                html: adminEmailTemplate.html,
                text: adminEmailTemplate.text,
              });
              console.log('✅ WEBHOOK: Admin notification email sent successfully to:', adminEmail);
            } else {
              console.log('⚠️ WEBHOOK: No admin email configured, skipping admin notification');
            }
            
            console.log('🎉 WEBHOOK: All emails sent successfully!');
            
          } catch (emailError) {
            console.error('❌ WEBHOOK: Email sending failed:', emailError);
            console.error('❌ WEBHOOK: Email error details:', {
              message: emailError instanceof Error ? emailError.message : 'Unknown error',
              stack: emailError instanceof Error ? emailError.stack : undefined
            });
            // Don't fail the webhook if email fails - payment is still successful
          }
          
          // TODO: Save submission to database
          // TODO: Create user account if needed
        } else {
          console.log('⚠️ WEBHOOK: No submission data found in metadata');
        }
      } else {
        console.log('⚠️ WEBHOOK: No metadata found in payment');
      }
    } else if (payment.status === 'canceled' || payment.status === 'expired' || payment.status === 'failed') {
      console.log('❌ WEBHOOK: Payment failed/cancelled:', paymentId, 'Status:', payment.status);
    } else {
      console.log('⏳ WEBHOOK: Payment in pending state:', payment.status);
    }

    console.log('✅ WEBHOOK: Webhook processing completed successfully');
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('❌ WEBHOOK: Webhook processing error:', error);
    console.error('❌ WEBHOOK: Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
