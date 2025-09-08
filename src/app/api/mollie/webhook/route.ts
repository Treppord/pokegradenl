import { NextRequest, NextResponse } from 'next/server';
import MollieService from '@/services/mollieService';
import { sendEmail } from '@/lib/gmail/client';
import { createUserConfirmationEmail, createAdminNotificationEmail } from '@/lib/email/templates';

export async function POST(request: NextRequest) {
  try {
    const body = await request.text();
    const params = new URLSearchParams(body);
    const paymentId = params.get('id');

    if (!paymentId) {
      return NextResponse.json(
        { error: 'Missing payment ID' },
        { status: 400 }
      );
    }

    const mollieService = new MollieService();
    const payment = await mollieService.getPayment(paymentId);

    console.log('Webhook received for payment:', paymentId, 'Status:', payment.status);

    // Here you would typically:
    // 1. Update your database with the payment status
    // 2. Send confirmation emails
    // 3. Update order status
    // 4. Process the submission data

    if (payment.status === 'paid') {
      console.log('Payment successful for:', paymentId);
      
      // Parse submission data from metadata
      if (payment.metadata && typeof payment.metadata === 'object' && payment.metadata !== null) {
        const metadata = payment.metadata as Record<string, string>;
        if (metadata.submissionData) {
          const submissionData = JSON.parse(metadata.submissionData);
          console.log('Processing submission:', submissionData);
          
          try {
            // Send confirmation email to customer
            const userEmailTemplate = createUserConfirmationEmail(paymentId, submissionData);
            await sendEmail({
              to: submissionData.shippingInfo.pickupAddress.email,
              subject: userEmailTemplate.subject,
              html: userEmailTemplate.html,
              text: userEmailTemplate.text,
            });
            console.log('Confirmation email sent to customer:', submissionData.shippingInfo.pickupAddress.email);

            // Send notification email to admin
            const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER_EMAIL;
            if (adminEmail) {
              const adminEmailTemplate = createAdminNotificationEmail(paymentId, submissionData);
              await sendEmail({
                to: adminEmail,
                subject: adminEmailTemplate.subject,
                html: adminEmailTemplate.html,
                text: adminEmailTemplate.text,
              });
              console.log('Admin notification email sent to:', adminEmail);
            }
            
          } catch (emailError) {
            console.error('Email sending failed:', emailError);
            // Don't fail the webhook if email fails - payment is still successful
          }
          
          // TODO: Save submission to database
          // TODO: Create user account if needed
        }
      }
    } else if (payment.status === 'canceled' || payment.status === 'expired' || payment.status === 'failed') {
      console.log('Payment failed/cancelled for:', paymentId, 'Status:', payment.status);
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}
