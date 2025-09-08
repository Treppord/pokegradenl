import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/gmail/client';
import { createUserConfirmationEmail, createAdminNotificationEmail } from '@/lib/email/templates';

export async function GET(request: NextRequest) {
  console.log('🧪 TEST-WEBHOOK: Starting webhook email test...');
  
  // Mock submission data for testing
  const mockSubmissionData = {
    selectedTier: 'standard',
    cards: [
      {
        name: 'Charizard',
        set: 'Base Set',
        condition: 'mint',
        estimatedValue: '500'
      },
      {
        name: 'Pikachu',
        set: 'Base Set',
        condition: 'near-mint',
        estimatedValue: '100'
      }
    ],
    shippingInfo: {
      pickupAddress: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'test-customer@example.com',
        phone: '+31612345678',
        street: 'Test Street 123',
        city: 'Amsterdam',
        postalCode: '1000AA'
      }
    },
    total: 50
  };

  const mockPaymentId = 'tr_test123456789';
  
  try {
    console.log('🎯 TEST-WEBHOOK: Using mock submission data:', {
      tier: mockSubmissionData.selectedTier,
      cardCount: mockSubmissionData.cards?.length,
      customerEmail: mockSubmissionData.shippingInfo?.pickupAddress?.email,
      total: mockSubmissionData.total
    });
    
    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER_EMAIL;
    console.log('🔧 TEST-WEBHOOK: Admin email for testing:', adminEmail);
    
    if (!adminEmail) {
      throw new Error('No admin email configured for testing');
    }
    
    // Test customer confirmation email
    console.log('👤 TEST-WEBHOOK: Testing customer confirmation email...');
    const userEmailTemplate = createUserConfirmationEmail(mockPaymentId, mockSubmissionData);
    const customerEmail = adminEmail; // Send to admin for testing instead of mock customer
    
    console.log('📤 TEST-WEBHOOK: Sending customer confirmation email to admin:', customerEmail);
    await sendEmail({
      to: customerEmail,
      subject: `[TEST] ${userEmailTemplate.subject}`,
      html: userEmailTemplate.html,
      text: userEmailTemplate.text,
    });
    console.log('✅ TEST-WEBHOOK: Customer confirmation email sent successfully');

    // Test admin notification email
    if (adminEmail) {
      console.log('🔔 TEST-WEBHOOK: Testing admin notification email...');
      const adminEmailTemplate = createAdminNotificationEmail(mockPaymentId, mockSubmissionData);
      
      console.log('📤 TEST-WEBHOOK: Sending admin notification to:', adminEmail);
      await sendEmail({
        to: adminEmail,
        subject: `[TEST] ${adminEmailTemplate.subject}`,
        html: adminEmailTemplate.html,
        text: adminEmailTemplate.text,
      });
      console.log('✅ TEST-WEBHOOK: Admin notification email sent successfully');
    }
    
    console.log('🎉 TEST-WEBHOOK: All test emails sent successfully!');
    
    return NextResponse.json({
      success: true,
      message: 'Test webhook emails sent successfully!',
      mockData: {
        paymentId: mockPaymentId,
        customerEmail: customerEmail,
        adminEmail: adminEmail,
        cardCount: mockSubmissionData.cards.length,
        total: mockSubmissionData.total
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ TEST-WEBHOOK: Test webhook failed:', error);
    console.error('❌ TEST-WEBHOOK: Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      mockData: {
        paymentId: mockPaymentId,
        adminEmail: process.env.ADMIN_EMAIL || process.env.GMAIL_USER_EMAIL,
      },
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  console.log('🧪 TEST-WEBHOOK: POST simulation of real Mollie webhook...');
  
  try {
    const body = await request.text();
    console.log('📝 TEST-WEBHOOK: Simulating Mollie webhook body:', body);
    
    // Parse like a real webhook would
    const params = new URLSearchParams(body);
    const paymentId = params.get('id') || 'tr_test123456789';
    
    console.log('💳 TEST-WEBHOOK: Simulated payment ID:', paymentId);
    
    // Mock successful payment with metadata
    const mockPaymentResponse = {
      id: paymentId,
      status: 'paid',
      amount: { value: '50.00', currency: 'EUR' },
      description: 'Test payment',
      metadata: {
        submissionData: JSON.stringify({
          selectedTier: 'standard',
          cards: [
            { name: 'Charizard', set: 'Base Set', condition: 'mint', estimatedValue: '500' },
            { name: 'Pikachu', set: 'Base Set', condition: 'near-mint', estimatedValue: '100' }
          ],
          shippingInfo: {
            pickupAddress: {
              firstName: 'John',
              lastName: 'Doe',
              email: process.env.ADMIN_EMAIL || process.env.GMAIL_USER_EMAIL,
              phone: '+31612345678',
              street: 'Test Street 123',
              city: 'Amsterdam',
              postalCode: '1000AA'
            }
          },
          total: 50
        }),
        items: JSON.stringify([])
      }
    };
    
    console.log('✅ TEST-WEBHOOK: Mock payment is PAID, processing emails...');
    
    const submissionData = JSON.parse(mockPaymentResponse.metadata.submissionData);
    const adminEmail = process.env.ADMIN_EMAIL || process.env.GMAIL_USER_EMAIL;
    
    // Send customer confirmation email
    const userEmailTemplate = createUserConfirmationEmail(paymentId, submissionData);
    await sendEmail({
      to: submissionData.shippingInfo.pickupAddress.email,
      subject: userEmailTemplate.subject,
      html: userEmailTemplate.html,
      text: userEmailTemplate.text,
    });
    console.log('✅ TEST-WEBHOOK: Customer email sent to:', submissionData.shippingInfo.pickupAddress.email);

    // Send admin notification
    if (adminEmail) {
      const adminEmailTemplate = createAdminNotificationEmail(paymentId, submissionData);
      await sendEmail({
        to: adminEmail,
        subject: adminEmailTemplate.subject,
        html: adminEmailTemplate.html,
        text: adminEmailTemplate.text,
      });
      console.log('✅ TEST-WEBHOOK: Admin email sent to:', adminEmail);
    }
    
    return NextResponse.json({
      success: true,
      message: 'Simulated webhook processed successfully',
      paymentId: paymentId,
      emailsSent: {
        customer: submissionData.shippingInfo.pickupAddress.email,
        admin: adminEmail
      },
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('❌ TEST-WEBHOOK: POST simulation failed:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}
