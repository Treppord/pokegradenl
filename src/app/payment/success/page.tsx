'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  CheckCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  EnvelopeIcon,
  TruckIcon
} from '@heroicons/react/24/outline';

interface PaymentStatus {
  id: string;
  status: string;
  amount: {
    value: string;
    currency: string;
  };
  description: string;
  isPaid: boolean;
  isCanceled: boolean;
  isExpired: boolean;
  isFailed: boolean;
}

export default function PaymentSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const paymentId = searchParams.get('paymentId');
  
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [submissionData, setSubmissionData] = useState<any>(null);

  useEffect(() => {
    if (!paymentId) {
      router.push('/submit');
      return;
    }

    checkPaymentStatus();
    
    // Load submission data from localStorage
    const lastSubmission = localStorage.getItem('lastSubmission');
    if (lastSubmission) {
      setSubmissionData(JSON.parse(lastSubmission));
    }
  }, [paymentId, router]);

  const checkPaymentStatus = async () => {
    try {
      const response = await fetch(`/api/mollie/payment-status?id=${paymentId}`);
      const data = await response.json();
      
      if (data.success) {
        setPaymentStatus(data.payment);
      }
    } catch (error) {
      console.error('Failed to check payment status:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
          <p>Checking payment status...</p>
        </div>
      </Layout>
    );
  }

  if (!paymentStatus) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find your payment. Please contact support if you believe this is an error.</p>
          <Button onClick={() => router.push('/contact')}>Contact Support</Button>
        </div>
      </Layout>
    );
  }

  const isSuccess = paymentStatus.isPaid;
  const isPending = paymentStatus.status === 'open' || paymentStatus.status === 'pending';
  const isFailed = paymentStatus.isFailed || paymentStatus.isCanceled || paymentStatus.isExpired;

  return (
    <Layout>
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          {/* Status Header */}
          <div className="text-center mb-8">
            {isSuccess && (
              <>
                <CheckCircleIcon className="h-16 w-16 text-success mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Payment Successful!</h1>
                <p className="text-lg text-neutral-600">Your card submission has been received and payment confirmed.</p>
              </>
            )}
            
            {isPending && (
              <>
                <ClockIcon className="h-16 w-16 text-warning mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-neutral-900 mb-2">Payment Processing</h1>
                <p className="text-lg text-neutral-600">Your payment is being processed. Please wait a moment.</p>
              </>
            )}
            
            {isFailed && (
              <>
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-red-600 text-2xl">✗</span>
                </div>
                <h1 className="text-3xl font-bold text-red-600 mb-2">Payment Failed</h1>
                <p className="text-lg text-neutral-600">There was an issue processing your payment. Please try again.</p>
              </>
            )}
          </div>

          {/* Payment Details */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="font-medium">Payment ID:</span>
                  <span className="font-mono text-sm">{paymentStatus.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount:</span>
                  <span>€{paymentStatus.amount.value}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status:</span>
                  <span className={`font-medium ${
                    isSuccess ? 'text-success' : 
                    isPending ? 'text-warning' : 
                    'text-red-600'
                  }`}>
                    {paymentStatus.status.charAt(0).toUpperCase() + paymentStatus.status.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Description:</span>
                  <span>{paymentStatus.description}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps - Only show if payment is successful */}
          {isSuccess && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>What Happens Next?</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <EnvelopeIcon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Confirmation Email</h4>
                      <p className="text-sm text-neutral-600">You'll receive a confirmation email with your submission details and next steps.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <DocumentTextIcon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Account Creation</h4>
                      <p className="text-sm text-neutral-600">Instructions to create your tracking account will be included in your email.</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <TruckIcon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                    <div>
                      <h4 className="font-medium">Shipping Labels</h4>
                      <p className="text-sm text-neutral-600">Pre-paid shipping labels and packaging instructions will be provided.</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Submission Summary - Only show if we have submission data */}
          {isSuccess && submissionData && (
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Submission Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Service Level:</span>
                    <span>{submissionData.selectedTier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Number of Cards:</span>
                    <span>{submissionData.cards?.length || 0}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Total Cost:</span>
                    <span>€{submissionData.total}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isSuccess && (
              <Button 
                onClick={() => router.push('/track')}
                className="flex-1 sm:flex-none"
              >
                Track Your Order
              </Button>
            )}
            
            {isFailed && (
              <Button 
                onClick={() => router.push('/submit')}
                className="flex-1 sm:flex-none"
              >
                Try Again
              </Button>
            )}
            
            <Button 
              variant="outline"
              onClick={() => router.push('/')}
              className="flex-1 sm:flex-none"
            >
              Back to Home
            </Button>
          </div>

          {/* Pending Payment Auto-refresh */}
          {isPending && (
            <div className="mt-6 text-center">
              <p className="text-sm text-neutral-600">
                This page will automatically refresh to check your payment status.
                <br />
                <button 
                  onClick={checkPaymentStatus}
                  className="text-primary-500 hover:text-primary-600 underline ml-1"
                >
                  Check now
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}
