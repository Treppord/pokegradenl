'use client';

import React, { useState } from 'react';
import { Button } from './Button';

interface IdealButtonProps {
  amount: number;
  description: string;
  items: Array<{
    name: string;
    description: string;
    quantity: number;
    unit_amount: {
      currency_code: string;
      value: string;
    };
  }>;
  customerInfo: {
    firstName: string;
    lastName: string;
    phone?: string;
  };
  submissionData: any;
  onSuccess: (paymentId: string) => void;
  onError: (error: any) => void;
  onCancel?: () => void;
}

export function IdealButton({
  amount,
  description,
  items,
  customerInfo,
  submissionData,
  onSuccess,
  onError,
  onCancel,
}: IdealButtonProps) {
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      const response = await fetch('/api/mollie/create-payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          description,
          items,
          customerInfo,
          submissionData,
        }),
      });

      const data = await response.json();

      if (data.success && data.payment.checkoutUrl) {
        // Store payment ID in localStorage for tracking
        localStorage.setItem('currentPaymentId', data.payment.id);
        
        // Redirect to Mollie checkout
        window.location.href = data.payment.checkoutUrl;
      } else {
        throw new Error(data.error || 'Failed to create payment');
      }
    } catch (error) {
      console.error('Payment initiation failed:', error);
      onError(error);
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <Button
        onClick={handlePayment}
        loading={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl"
        size="lg"
      >
        {loading ? 'Creating Payment...' : `Pay €${amount.toFixed(2)} with iDEAL`}
      </Button>
      
      <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
        <span>Secured by Mollie • iDEAL Banking</span>
      </div>
      
      <div className="text-xs text-center text-gray-500">
        You will be redirected to your bank to complete the payment securely
      </div>
    </div>
  );
}
