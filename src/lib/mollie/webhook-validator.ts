import { createHash, timingSafeEqual } from 'crypto';

export function validateMollieWebhook(
  body: string,
  signature: string | null,
  webhookSecret: string
): boolean {
  if (!signature) {
    console.log('⚠️ WEBHOOK-VALIDATOR: No signature provided');
    return false;
  }

  if (!webhookSecret) {
    console.log('⚠️ WEBHOOK-VALIDATOR: No webhook secret configured');
    return false;
  }

  try {
    // Remove 'sha256=' prefix if present
    const cleanSignature = signature.replace(/^sha256=/, '');
    
    // Create expected signature
    const expectedSignature = createHash('sha256')
      .update(body + webhookSecret)
      .digest('hex');

    console.log('🔐 WEBHOOK-VALIDATOR: Validating signature...', {
      providedSignature: cleanSignature.substring(0, 8) + '...',
      expectedSignature: expectedSignature.substring(0, 8) + '...',
      bodyLength: body.length
    });

    // Use timing-safe comparison to prevent timing attacks
    const providedBuffer = Buffer.from(cleanSignature, 'hex');
    const expectedBuffer = Buffer.from(expectedSignature, 'hex');

    if (providedBuffer.length !== expectedBuffer.length) {
      console.log('❌ WEBHOOK-VALIDATOR: Signature length mismatch');
      return false;
    }

    const isValid = timingSafeEqual(providedBuffer, expectedBuffer);
    console.log(`${isValid ? '✅' : '❌'} WEBHOOK-VALIDATOR: Signature validation ${isValid ? 'passed' : 'failed'}`);
    
    return isValid;
  } catch (error) {
    console.error('❌ WEBHOOK-VALIDATOR: Error validating signature:', error);
    return false;
  }
}

export function logWebhookHeaders(headers: Headers): void {
  const relevantHeaders = [
    'content-type',
    'x-mollie-signature',
    'user-agent',
    'x-forwarded-for',
    'x-real-ip'
  ];

  const headerInfo: Record<string, string | null> = {};
  relevantHeaders.forEach(header => {
    headerInfo[header] = headers.get(header);
  });

  console.log('📋 WEBHOOK-VALIDATOR: Request headers:', headerInfo);
}
