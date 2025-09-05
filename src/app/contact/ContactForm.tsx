'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { Input, Textarea, Select } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/outline';

const subjects = [
  { value: 'general', label: 'General Inquiry' },
  { value: 'submission', label: 'Submission Question' },
  { value: 'tracking', label: 'Track My Order' },
  { value: 'technical', label: 'Technical Support' },
  { value: 'bulk', label: 'Bulk Submission' },
  { value: 'partnership', label: 'Business Partnership' },
  { value: 'feedback', label: 'Feedback' },
  { value: 'other', label: 'Other' }
];

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ChatBubbleLeftRightIcon className="h-6 w-6 mr-2" />
            Send us a Message
          </CardTitle>
        </CardHeader>
        <CardContent>
          {success ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-success rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                Message Sent Successfully!
              </h3>
              <p className="text-neutral-600 mb-4">
                Thank you for contacting us. We'll get back to you within 24 hours.
              </p>
              <Button onClick={() => setSuccess(false)} variant="outline">
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Your Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <Input
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
              </div>
              <Select
                label="Subject"
                options={subjects}
                value={formData.subject}
                onChange={(e) => handleInputChange('subject', e.target.value)}
                placeholder="Select a subject"
                required
              />
              <Textarea
                label="Message"
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Please describe your question or concern in detail..."
                required
              />
              <Button type="submit" loading={loading} className="w-full">
                Send Message
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
