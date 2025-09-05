'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const faqItems = [
  {
    id: '1',
    question: 'How long does the grading process take?',
    answer: 'Turnaround times depend on your selected service level: Value (20 business days), Standard (10 business days), and Premium (5 business days). These timeframes begin once we receive your cards at our facility.'
  },
  {
    id: '2',
    question: 'What is included in the grading service?',
    answer: 'All services include authentication verification, condition grading on a 10-point scale with subgrades, secure encapsulation in tamper-evident holders, detailed grading report, and full insurance coverage during the process.'
  },
  {
    id: '3',
    question: 'How do you determine a card\'s grade?',
    answer: 'We evaluate four key areas: Centering (card alignment within borders), Corners (wear and rounding), Edges (cuts and whitening), and Surface (scratches, print defects). Each area receives a subgrade, and the overall grade reflects the card\'s condition.'
  },
  {
    id: '4',
    question: 'Can you grade cards in languages other than English?',
    answer: 'Yes! We grade Pokémon cards in all languages including Dutch, German, French, Spanish, Italian, and Japanese. Our graders are trained to identify authentic cards across all language variants.'
  },
  {
    id: '5',
    question: 'What happens if a card is determined to be fake?',
    answer: 'If we determine a card is not authentic, we will contact you immediately. The card will be returned ungraded with a detailed explanation. You will not be charged for the grading service, only return shipping.'
  },
  {
    id: '6',
    question: 'Do you offer bulk submission discounts?',
    answer: 'Yes, we offer tiered discounts for bulk submissions: 10% off for 50+ cards, 15% off for 100+ cards, and 20% off for 250+ cards. Bulk submissions also receive priority processing within their service tier.'
  },
  {
    id: '7',
    question: 'How are my cards insured during shipping?',
    answer: 'All submissions are fully insured during transit to and from our facility. Insurance coverage is based on the declared value of your cards up to the maximum allowed for each service tier.'
  },
  {
    id: '8',
    question: 'Can I track my submission progress?',
    answer: 'Absolutely! You\'ll receive a unique submission ID when you send your cards. Use this ID on our tracking page to see real-time updates including when cards are received, graded, and shipped back.'
  }
];

export default function FAQSection() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  const toggleFaq = (id: string) => {
    setExpandedFaq(expandedFaq === id ? null : id);
  };

  return (
    <div className="mt-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-heading font-bold text-neutral-900 mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          Find answers to the most common questions about our grading services.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="space-y-4">
          {faqItems.map((faq) => (
            <Card key={faq.id} className="overflow-hidden">
              <CardContent className="p-0">
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-neutral-50 transition-colors"
                >
                  <h3 className="font-semibold text-neutral-900 pr-4">
                    {faq.question}
                  </h3>
                  {expandedFaq === faq.id ? (
                    <ChevronUpIcon className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="h-5 w-5 text-neutral-500 flex-shrink-0" />
                  )}
                </button>
                {expandedFaq === faq.id && (
                  <div className="px-6 pb-4">
                    <p className="text-neutral-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
