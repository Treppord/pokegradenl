export function createAccountSetupEmailTemplate(
  customerName: string,
  setupLink: string,
  orderDetails: {
    orderId: string
    amount: number
    currency: string
  }
): { html: string; text: string } {
  const html = `
<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welkom bij PokeGrade Nederland</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-color: #dc3545; color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background-color: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
        .button { display: inline-block; background-color: #dc3545; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .order-details { background-color: #fff; padding: 20px; margin: 20px 0; border-radius: 5px; border-left: 4px solid #3b82f6; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 14px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎉 Bedankt voor je bestelling!</h1>
            <p>Welkom bij PokeGrade Nederland</p>
        </div>
        
        <div class="content">
            <p>Beste ${customerName},</p>
            
            <p>Hartelijk dank voor je bestelling bij PokeGrade Nederland! Je betaling is succesvol verwerkt en we zijn blij je te verwelkomen als klant.</p>
            
            <div class="order-details">
                <h3>📋 Bestelling Details</h3>
                <p><strong>Bestelnummer:</strong> ${orderDetails.orderId}</p>
                <p><strong>Bedrag:</strong> €${orderDetails.amount.toFixed(2)}</p>
                <p><strong>Status:</strong> Betaald</p>
            </div>
            
            <h3>🔐 Maak je account aan</h3>
            <p>Om je account te activeren en gebruik te maken van onze diensten, klik je op de onderstaande knop om je wachtwoord in te stellen:</p>
            
            <div style="text-align: center;">
                <a href="${setupLink}" class="button">Account Activeren</a>
            </div>
            
            <p><strong>Belangrijk:</strong> Deze link is 24 uur geldig. Als de link is verlopen, neem dan contact met ons op via info@pokegradenl.com</p>
            
            <h3>📦 Wat gebeurt er nu?</h3>
            <ul>
                <li>Activeer je account via bovenstaande link</li>
                <li>Log in op je dashboard</li>
                <li>Volg de instructies voor het insturen van je kaarten</li>
                <li>Ontvang updates over de gradering van je kaarten</li>
            </ul>
            
            <p>Als je vragen hebt, aarzel dan niet om contact met ons op te nemen. We helpen je graag verder!</p>
            
            <p>Met vriendelijke groet,<br>
            <strong>Team PokeGrade Nederland</strong></p>
        </div>
        
        <div class="footer">
            <p>Deze email is verstuurd naar ${orderDetails.orderId} op verzoek van PokeGrade Nederland.</p>
            <p>PokeGrade Nederland | info@pokegradenl.com | www.pokegradenl.com</p>
        </div>
    </div>
</body>
</html>
  `

  const text = `
Welkom bij PokeGrade Nederland!

Beste ${customerName},

Hartelijk dank voor je bestelling bij PokeGrade Nederland! Je betaling is succesvol verwerkt.

Bestelling Details:
- Bestelnummer: ${orderDetails.orderId}
- Bedrag: €${orderDetails.amount.toFixed(2)}
- Status: Betaald

Maak je account aan:
Om je account te activeren, ga naar: ${setupLink}

Deze link is 24 uur geldig. Als de link is verlopen, neem contact op via info@pokegradenl.com

Wat gebeurt er nu?
1. Activeer je account via bovenstaande link
2. Log in op je dashboard  
3. Volg de instructies voor het insturen van je kaarten
4. Ontvang updates over de gradering van je kaarten

Met vriendelijke groet,
Team PokeGrade Nederland

info@pokegradenl.com | www.pokegradenl.com
  `

  return { html, text }
}
