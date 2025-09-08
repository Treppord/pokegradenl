import { createMollieClient, PaymentMethod } from '@mollie/api-client';

export interface MolliePaymentData {
  amount: {
    currency: string;
    value: string;
  };
  description: string;
  redirectUrl: string;
  webhookUrl?: string;
  metadata?: Record<string, any>;
  method?: PaymentMethod;
}

export interface MollieCustomerInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
}

class MollieService {
  private client;

  constructor() {
    if (!process.env.MOLLIE_API_KEY) {
      throw new Error('MOLLIE_API_KEY environment variable is required');
    }
    
    this.client = createMollieClient({ 
      apiKey: process.env.MOLLIE_API_KEY,
    });
  }

  async createPayment(paymentData: MolliePaymentData, customerInfo?: MollieCustomerInfo) {
    try {
      const payment = await this.client.payments.create({
        amount: paymentData.amount,
        description: paymentData.description,
        redirectUrl: paymentData.redirectUrl,
        webhookUrl: paymentData.webhookUrl,
        metadata: {
          ...paymentData.metadata,
          customerEmail: customerInfo?.email,
          customerName: customerInfo ? `${customerInfo.firstName} ${customerInfo.lastName}` : undefined,
        },
        method: paymentData.method,
      });

      return payment;
    } catch (error) {
      console.error('Mollie payment creation failed:', error);
      throw new Error('Failed to create payment');
    }
  }

  async createIdealPayment(paymentData: Omit<MolliePaymentData, 'method'>, customerInfo?: MollieCustomerInfo) {
    return this.createPayment({
      ...paymentData,
      method: PaymentMethod.ideal,
    }, customerInfo);
  }

  async getPayment(paymentId: string) {
    try {
      return await this.client.payments.get(paymentId);
    } catch (error) {
      console.error('Failed to get payment:', error);
      throw new Error('Failed to retrieve payment');
    }
  }

  async getPaymentMethods() {
    try {
      return await this.client.methods.list();
    } catch (error) {
      console.error('Failed to get payment methods:', error);
      throw new Error('Failed to retrieve payment methods');
    }
  }

  async getIdealIssuers() {
    try {
      const method = await this.client.methods.get(PaymentMethod.ideal);
      return [];
    } catch (error) {
      console.error('Failed to get iDEAL issuers:', error);
      throw new Error('Failed to retrieve iDEAL issuers');
    }
  }
}

export default MollieService;
