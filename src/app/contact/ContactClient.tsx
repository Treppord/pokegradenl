'use client';

import React from "react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import ContactForm from "./ContactForm";
import FAQSection from "./FAQSection";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon,
  QuestionMarkCircleIcon,
} from "@heroicons/react/24/outline";

const contactInfo = [
  {
    icon: EnvelopeIcon,
    label: "Email",
    value: "contact@pokegrade.nl",
    description: "General inquiries and support",
  },
  {
    icon: MapPinIcon,
    label: "Address",
    value: "3014GH Rotterdam",
    description: "By appointment only",
  },
  {
    icon: ClockIcon,
    label: "Business Hours",
    value: "Mon-Fri 9:00-17:00",
    description: "CET/CEST",
  },
];

export default function ContactClient() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {t('contact.hero_title')}
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {t('contact.hero_desc')}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
                {t('contact.get_in_touch')}
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-heading font-bold text-neutral-900 mb-6">
                {t('contact.our_office')}
              </h2>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <Card key={index}>
                    <CardContent className="flex items-start space-x-4">
                      <info.icon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-semibold text-neutral-900 mb-1">
                          {info.label}
                        </h3>
                        <p className="text-neutral-900 mb-1">{info.value}</p>
                        <p className="text-sm text-neutral-600">
                          {info.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Map placeholder */}
              <div className="mt-8">
                <Card>
                  <CardContent>
                    <div className="aspect-w-16 aspect-h-9 bg-neutral-100 rounded-lg">
                      <div className="flex items-center justify-center">
                        <div className="text-center">
                          <MapPinIcon className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                          <p className="text-neutral-600">
                            Interactive map coming soon
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* CTA Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container-custom text-center">
          <h2 className="text-2xl lg:text-3xl font-heading font-bold text-neutral-900 mb-4">
            Ready to Submit Your Cards?
          </h2>
          <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
            Start the grading process today and join thousands of satisfied
            collectors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild>
              <a href="/submit">Submit Cards Now</a>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <a href="/services">View Pricing</a>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
}
