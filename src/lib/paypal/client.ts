// Using PayPal Checkout Server SDK for API calls
import paypal from '@paypal/checkout-server-sdk'

function environment() {
  const clientId = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID!
  const clientSecret = process.env.PAYPAL_CLIENT_SECRET!

  return process.env.PAYPAL_ENVIRONMENT === 'production'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret)
}

const client = new paypal.core.PayPalHttpClient(environment())

export default client
