import React from 'react';
import { Layout } from '@/components/layout/Layout';
import ContactForm from './ContactForm';
import FAQSection from './FAQSection';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  QuestionMarkCircleIcon
} from '@heroicons/react/24/outline';
import type { Metadata } from 'next';

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: 'Email',
    value: 'support@pokegrade.nl',
    description: 'General inquiries and support'
  },
  {
    icon: PhoneIcon,
    label: 'Phone',
    value: '+31 20 123 4567',
    description: 'Mon-Fri 9:00-17:00 CET'
  },
  {
    icon: MapPinIcon,
    label: 'Address',
    value: 'Groenland 125, 1011 RM Amsterdam',
    description: 'By appointment only'
  },
  {
    icon: ClockIcon,
    label: 'Business Hours',
    value: 'Monday - Friday 9:00-17:00',
    description: 'CET/CEST timezone'
  }
];



export default function ContactPage() {

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-gradient-start dark:to-dark-gradient-end py-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 dark:text-white mb-4">
              Contact Us
            </h1>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Have questions about our grading services? Our expert team is here to help.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <ContactForm />

          {/* Contact Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Get in Touch</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {contactInfo.map((info) => (
                    <div key={info.label} className="flex items-start">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary-50 dark:bg-neutral-700 rounded-lg flex items-center justify-center mr-4">
                        <info.icon className="h-6 w-6 text-primary-500 dark:text-primary-400" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-neutral-900 dark:text-white">{info.label}</h3>
                        <p className="text-neutral-800 dark:text-neutral-300 font-medium">{info.value}</p>
                        <p className="text-sm text-neutral-600 dark:text-neutral-400">{info.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Links */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Help</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <QuestionMarkCircleIcon className="h-5 w-5 mr-3" />
                    View Frequently Asked Questions
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <ClockIcon className="h-5 w-5 mr-3" />
                    Track My Submission
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <EnvelopeIcon className="h-5 w-5 mr-3" />
                    Submit a New Order
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <FAQSection />

        {/* Additional Support */}
        <div className="mt-20">
          <Card className="bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-dark-gradient-start dark:to-dark-gradient-end border-0">
            <CardContent className="text-center py-12">
              <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">
                Still Need Help?
              </h3>
              <p className="text-neutral-700 dark:text-neutral-300 mb-6 max-w-2xl mx-auto">
                Can't find what you're looking for? Our support team is available Monday through 
                Friday to help with any questions about our grading services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button>
                  Email Support Team
                </Button>
                <Button variant="outline">
                  Schedule a Call
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Contact PokeGrade Nederland for questions about our Pokémon card grading services. View our FAQ, send us a message, or find our contact information.',
  keywords: ['contact pokegrade', 'grading support', 'pokemon card help', 'customer service', 'grading questions'],
};
