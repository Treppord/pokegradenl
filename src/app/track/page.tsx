'use client';

import React, { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import {
  MagnifyingGlassIcon,
  CheckCircleIcon,
  ClockIcon,
  TruckIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

const mockTrackingData = {
  id: 'PG-2024-001234',
  status: 'processing',
  currentStep: 3,
  totalSteps: 6,
  estimatedCompletion: '2024-02-15',
  timeline: [
    {
      id: '1',
      status: 'submitted',
      title: 'Submission Received',
      description: 'Your submission has been confirmed and logged into our system.',
      timestamp: '2024-01-15T10:30:00Z',
      completed: true
    },
    {
      id: '2',
      status: 'received',
      title: 'Cards Received',
      description: 'Your cards have arrived at our facility and initial inspection completed.',
      timestamp: '2024-01-18T14:20:00Z',
      completed: true
    },
    {
      id: '3',
      status: 'processing',
      title: 'Authentication & Grading',
      description: 'Cards are currently being authenticated and graded by our experts.',
      timestamp: '2024-01-20T09:15:00Z',
      completed: true,
      current: true
    },
    {
      id: '4',
      status: 'quality-check',
      title: 'Quality Review',
      description: 'Final quality check and grade verification in progress.',
      timestamp: null,
      completed: false
    },
    {
      id: '5',
      status: 'packaging',
      title: 'Encapsulation & Packaging',
      description: 'Cards being sealed in protective cases and prepared for shipping.',
      timestamp: null,
      completed: false
    },
    {
      id: '6',
      status: 'shipped',
      title: 'Shipped',
      description: 'Your graded cards have been shipped back to you.',
      timestamp: null,
      completed: false
    }
  ],
  cards: [
    { name: 'Charizard', set: 'Base Set', cardNumber: '4/102', status: 'grading' },
    { name: 'Blastoise', set: 'Base Set', cardNumber: '2/102', status: 'grading' },
    { name: 'Venusaur', set: 'Base Set', cardNumber: '15/102', status: 'completed', grade: 9.0 }
  ]
};

export default function TrackPage() {
  const [submissionId, setSubmissionId] = useState('');
  const [trackingData, setTrackingData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      if (submissionId.toLowerCase().includes('pg-')) {
        setTrackingData(mockTrackingData);
      } else {
        setError('Submission not found. Please check your submission ID and try again.');
      }
      setLoading(false);
    }, 1000);
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Pending';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusIcon = (completed: boolean, current: boolean) => {
    if (completed) {
      return <CheckCircleIcon className="h-6 w-6 text-success" />;
    } else if (current) {
      return <ClockIcon className="h-6 w-6 text-primary-500 animate-pulse" />;
    } else {
      return <div className="h-6 w-6 rounded-full border-2 border-neutral-300 dark:border-neutral-600"></div>;
    }
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-gradient-start dark:to-dark-gradient-end py-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 dark:text-white mb-4">
              Track Your Submission
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Enter your submission ID to get real-time updates on your card grading progress.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Search Form */}
        <Card className="max-w-2xl mx-auto mb-12 dark:bg-neutral-800 dark:border-neutral-700">
          <CardHeader>
            <CardTitle className="flex items-center dark:text-white">
              <MagnifyingGlassIcon className="h-6 w-6 mr-2" />
              Find Your Submission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Submission ID"
                placeholder="e.g., PG-2024-001234"
                value={submissionId}
                onChange={(e) => setSubmissionId(e.target.value)}
                helperText="You can find your submission ID in your confirmation email"
                required
              />
              {error && (
                <div className="flex items-center space-x-2 text-error">
                  <ExclamationTriangleIcon className="h-5 w-5" />
                  <span className="text-sm">{error}</span>
                </div>
              )}
              <Button type="submit" loading={loading} className="w-full">
                Track Submission
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Tracking Results */}
        {trackingData && (
          <div className="space-y-8">
            {/* Status Overview */}
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Submission {trackingData.id}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary-500">
                      {trackingData.currentStep}/{trackingData.totalSteps}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300">Steps Completed</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-neutral-900 dark:text-white capitalize">
                      {trackingData.status.replace('-', ' ')}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300">Current Status</p>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-secondary-500">
                      {new Date(trackingData.estimatedCompletion).toLocaleDateString()}
                    </div>
                    <p className="text-neutral-600 dark:text-neutral-300">Estimated Completion</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Progress Timeline */}
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Progress Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative">
                  {trackingData.timeline.map((event: any, index: number) => (
                    <div key={event.id} className="flex items-start pb-8 last:pb-0">
                      <div className="flex-shrink-0 mr-4">
                        {getStatusIcon(event.completed, event.current)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-medium ${
                            event.completed || event.current ? 'text-neutral-900 dark:text-white' : 'text-neutral-500 dark:text-neutral-400'
                          }`}>
                            {event.title}
                          </h4>
                          <span className={`text-sm ${
                            event.completed || event.current ? 'text-neutral-600 dark:text-neutral-300' : 'text-neutral-400 dark:text-neutral-500'
                          }`}>
                            {formatDate(event.timestamp)}
                          </span>
                        </div>
                        <p className={`text-sm mt-1 ${
                          event.completed || event.current ? 'text-neutral-600 dark:text-neutral-300' : 'text-neutral-400 dark:text-neutral-500'
                        }`}>
                          {event.description}
                        </p>
                        {event.current && (
                          <div className="mt-2">
                            <div className="bg-primary-50 dark:bg-neutral-700 text-primary-700 dark:text-primary-300 px-3 py-1 rounded-full text-xs inline-block">
                              In Progress
                            </div>
                          </div>
                        )}
                      </div>
                      {index < trackingData.timeline.length - 1 && (
                        <div className={`absolute left-3 mt-8 h-8 w-px ${
                          event.completed ? 'bg-success' : 'bg-neutral-300 dark:bg-neutral-600'
                        }`} style={{ top: `${(index * 112) + 24}px` }}></div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Card Status */}
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardHeader>
                <CardTitle className="dark:text-white">Card Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {trackingData.cards.map((card: any, index: number) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-700 rounded-lg">
                      <div>
                        <h4 className="font-medium text-neutral-900 dark:text-white">
                          {card.name}
                        </h4>
                        <p className="text-sm text-neutral-600 dark:text-neutral-300">
                          {card.set} #{card.cardNumber}
                        </p>
                      </div>
                      <div className="text-right">
                        {card.grade ? (
                          <div>
                            <div className="text-lg font-bold text-success">
                              Grade: {card.grade}
                            </div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-300">Completed</div>
                          </div>
                        ) : (
                          <div>
                            <div className="text-primary-500 font-medium capitalize">
                              {card.status.replace('-', ' ')}
                            </div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-300">In Progress</div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Contact Support */}
            <Card className="bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700">
              <CardContent className="text-center py-8">
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                  Questions about your submission?
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 mb-4">
                  Our support team is here to help with any questions or concerns.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button variant="outline">
                    Contact Support
                  </Button>
                  <Button variant="ghost">
                    View FAQ
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Help Section */}
        {!trackingData && (
          <div className="mt-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Need Help Finding Your Submission?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="pt-6">
                  <DocumentCheckIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Your submission ID was sent to your email when you submitted your order.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="pt-6">
                  <TruckIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                    Check Shipping Label
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    The submission ID may also be printed on your shipping label or receipt.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="pt-6">
                  <ClockIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">
                    Contact Support
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    Our team can help you locate your submission using your email or phone number.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}


