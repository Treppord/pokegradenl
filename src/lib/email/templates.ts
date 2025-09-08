interface SubmissionData {
  selectedTier: string;
  cards: Array<{
    name: string;
    set: string;
    condition: string;
    estimatedValue: string;
  }>;
  shippingInfo: {
    pickupAddress: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      street: string;
      city: string;
      postalCode: string;
    };
  };
  total: number;
}

export function createUserConfirmationEmail(
  paymentId: string, 
  submissionData: SubmissionData
) {
  const { pickupAddress } = submissionData.shippingInfo;
  
  return {
    subject: `Payment Confirmed - Your PokeGrade NL Submission (Order #${paymentId.slice(-8)})`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #dc3545, #3b82f6); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f8f9fa; padding: 30px; }
            .card-list { background: white; border-radius: 8px; padding: 20px; margin: 20px 0; }
            .card-item { border-bottom: 1px solid #eee; padding: 10px 0; }
            .card-item:last-child { border-bottom: none; }
            .total { font-size: 18px; font-weight: bold; color: #dc3545; text-align: right; margin-top: 20px; }
            .next-steps { background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .footer { background: #333; color: white; text-align: center; padding: 20px; border-radius: 0 0 10px 10px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Payment Confirmed!</h1>
              <p>Your cards are ready for professional grading</p>
            </div>
            
            <div class="content">
              <h2>Hello ${pickupAddress.firstName},</h2>
              
              <p>We've successfully received your payment and your card submission is confirmed! Here are your order details:</p>
              
              <div class="card-list">
                <h3>Order Summary</h3>
                <p><strong>Order ID:</strong> #${paymentId.slice(-8)}</p>
                <p><strong>Service Level:</strong> ${submissionData.selectedTier.charAt(0).toUpperCase() + submissionData.selectedTier.slice(1)}</p>
                <p><strong>Number of Cards:</strong> ${submissionData.cards.length}</p>
                
                <h4>Your Cards:</h4>
                ${submissionData.cards.map((card, index) => `
                  <div class="card-item">
                    <strong>Card ${index + 1}:</strong> ${card.name || 'Unnamed'}<br>
                    <small>Set: ${card.set} | Condition: ${card.condition} | Est. Value: €${card.estimatedValue || '0'}</small>
                  </div>
                `).join('')}
                
                <div class="total">Total Paid: €${submissionData.total}</div>
              </div>
              
              <div class="next-steps">
                <h3>📋 What Happens Next?</h3>
                <ol>
                  <li><strong>Account Setup:</strong> We'll create your tracking account within 24 hours</li>
                  <li><strong>Shipping Labels:</strong> You'll receive pre-paid shipping labels via email</li>
                  <li><strong>Pack & Ship:</strong> Carefully pack your cards and ship them to us</li>
                  <li><strong>Grading Process:</strong> Professional grading begins once we receive your cards</li>
                  <li><strong>Return Shipping:</strong> Your graded cards will be shipped back securely</li>
                </ol>
              </div>
              
              <div class="next-steps">
                <h3>📦 Shipping Information</h3>
                <p><strong>Pickup Address:</strong><br>
                ${pickupAddress.firstName} ${pickupAddress.lastName}<br>
                ${pickupAddress.street}<br>
                ${pickupAddress.postalCode} ${pickupAddress.city}<br>
                Phone: ${pickupAddress.phone}</p>
              </div>
              
              <p>Track your order anytime at: <a href="https://pokegrade.nl/track">pokegrade.nl/track</a></p>
              
              <p>Questions? Reply to this email or contact us at info@pokegrade.nl</p>
              
              <p>Thank you for choosing PokeGrade Nederland!</p>
            </div>
            
            <div class="footer">
              <p>&copy; 2024 PokeGrade Nederland | Professional Pokémon Card Grading</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
Payment Confirmed - PokeGrade NL Submission

Hello ${pickupAddress.firstName},

Your payment has been confirmed! Order #${paymentId.slice(-8)}

Service Level: ${submissionData.selectedTier}
Number of Cards: ${submissionData.cards.length}
Total Paid: €${submissionData.total}

What happens next:
1. Account setup within 24 hours
2. Shipping labels sent via email  
3. Pack and ship your cards
4. Professional grading process
5. Secure return shipping

Track your order: https://pokegrade.nl/track

Questions? Contact info@pokegrade.nl

Thank you for choosing PokeGrade Nederland!
    `
  };
}

export function createAdminNotificationEmail(
  paymentId: string,
  submissionData: SubmissionData
) {
  const { pickupAddress } = submissionData.shippingInfo;
  
  return {
    subject: `🎯 New Order Received - #${paymentId.slice(-8)} (€${submissionData.total})`,
    html: `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #dc3545; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f8f9fa; padding: 20px; }
            .info-box { background: white; border-radius: 8px; padding: 15px; margin: 15px 0; border-left: 4px solid #dc3545; }
            .card-list { background: white; border-radius: 8px; padding: 15px; margin: 15px 0; }
            .card-item { background: #f8f9fa; padding: 8px; margin: 5px 0; border-radius: 4px; }
            .total-box { background: #dc3545; color: white; padding: 15px; text-align: center; border-radius: 8px; margin: 15px 0; }
            .footer { background: #333; color: white; text-align: center; padding: 15px; border-radius: 0 0 8px 8px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🎯 New Order Alert</h2>
              <p>Order #${paymentId.slice(-8)} - Payment Confirmed</p>
            </div>
            
            <div class="content">
              <div class="total-box">
                <h3>€${submissionData.total} PAID</h3>
                <p>Payment ID: ${paymentId}</p>
              </div>
              
              <div class="info-box">
                <h3>Customer Information</h3>
                <p><strong>Name:</strong> ${pickupAddress.firstName} ${pickupAddress.lastName}</p>
                <p><strong>Email:</strong> ${pickupAddress.email}</p>
                <p><strong>Phone:</strong> ${pickupAddress.phone}</p>
                <p><strong>Address:</strong><br>
                ${pickupAddress.street}<br>
                ${pickupAddress.postalCode} ${pickupAddress.city}</p>
              </div>
              
              <div class="info-box">
                <h3>Service Details</h3>
                <p><strong>Service Level:</strong> ${submissionData.selectedTier.charAt(0).toUpperCase() + submissionData.selectedTier.slice(1)}</p>
                <p><strong>Number of Cards:</strong> ${submissionData.cards.length}</p>
              </div>
              
              <div class="card-list">
                <h3>Card Details</h3>
                ${submissionData.cards.map((card, index) => `
                  <div class="card-item">
                    <strong>${index + 1}. ${card.name || 'Unnamed Card'}</strong><br>
                    Set: ${card.set || 'Not specified'} | 
                    Condition: ${card.condition || 'Not specified'} | 
                    Est. Value: €${card.estimatedValue || '0'}
                  </div>
                `).join('')}
              </div>
              
              <div class="info-box">
                <h3>🚀 Action Required</h3>
                <ul>
                  <li>Create customer tracking account</li>
                  <li>Generate and send shipping labels</li>
                  <li>Add to grading queue</li>
                  <li>Update order status system</li>
                </ul>
              </div>
            </div>
            
            <div class="footer">
              <p>PokeGrade Nederland Admin Dashboard</p>
            </div>
          </div>
        </body>
      </html>
    `,
    text: `
🎯 NEW ORDER ALERT - #${paymentId.slice(-8)}

PAYMENT CONFIRMED: €${submissionData.total}
Payment ID: ${paymentId}

CUSTOMER:
${pickupAddress.firstName} ${pickupAddress.lastName}
${pickupAddress.email}
${pickupAddress.phone}

ADDRESS:
${pickupAddress.street}
${pickupAddress.postalCode} ${pickupAddress.city}

SERVICE: ${submissionData.selectedTier} (${submissionData.cards.length} cards)

CARDS:
${submissionData.cards.map((card, index) => 
  `${index + 1}. ${card.name} - ${card.set} (${card.condition}) - €${card.estimatedValue}`
).join('\n')}

ACTION REQUIRED:
- Create customer account
- Send shipping labels
- Add to grading queue
- Update order status
    `
  };
}
