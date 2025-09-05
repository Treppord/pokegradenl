import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import {
  ShieldCheckIcon,
  EyeIcon,
  UserGroupIcon,
  ClockIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  TrophyIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import type { Metadata } from 'next';

const values = [
  {
    icon: EyeIcon,
    title: 'Precision',
    description: 'Every card is evaluated with meticulous attention to detail using advanced technology and expert knowledge.'
  },
  {
    icon: HeartIcon,
    title: 'Passion',
    description: 'We share the same love for Pokémon cards as our customers, treating every submission with personal care.'
  },
  {
    icon: ShieldCheckIcon,
    title: 'Trust',
    description: 'Building lasting relationships through consistent, reliable service and transparent communication.'
  },
  {
    icon: TrophyIcon,
    title: 'Excellence',
    description: 'Continuously improving our processes and technology to provide the highest quality grading services.'
  }
];

const team = [
  {
    name: 'Dr. Elena Marquez',
    role: 'Chief Grading Officer',
    experience: '15+ years TCG authentication',
    specialty: 'Vintage Pokémon cards (1996-2000)'
  },
  {
    name: 'Thomas van der Berg',
    role: 'Senior Grader',
    experience: '12+ years professional grading',
    specialty: 'Modern sets and Japanese cards'
  },
  {
    name: 'Sarah Chen',
    role: 'Technology Director',
    experience: '10+ years imaging technology',
    specialty: 'Authentication algorithms'
  }
];

const process = [
  {
    step: '01',
    title: 'Initial Inspection',
    description: 'Each card undergoes visual inspection to identify any obvious damage or concerns before processing.'
  },
  {
    step: '02',
    title: 'High-Resolution Scanning',
    description: 'Advanced imaging technology captures every detail at microscopic levels to detect counterfeits.'
  },
  {
    step: '03',
    title: 'Expert Evaluation',
    description: 'Certified graders assess centering, corners, edges, and surface using standardized criteria.'
  },
  {
    step: '04',
    title: 'Quality Verification',
    description: 'Independent review ensures consistency and accuracy of grading decisions.'
  },
  {
    step: '05',
    title: 'Secure Encapsulation',
    description: 'Cards are sealed in tamper-evident holders with unique certification numbers.'
  }
];

export default function AboutPage() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-gradient-start dark:to-dark-gradient-end py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
              About PokeGrade Nederland
            </h1>
            <p className="text-xl text-neutral-600 dark:text-neutral-300 leading-relaxed">
              Founded by passionate collectors, PokeGrade Nederland brings professional card 
              grading services to the Netherlands, combining cutting-edge technology with 
              decades of expertise to preserve and authenticate your most treasured Pokémon cards.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-neutral-700 dark:text-neutral-300">
                <p>
                  PokeGrade Nederland was born from a simple observation: Dutch collectors 
                  deserved access to world-class card grading services without the hassle 
                  of international shipping and customs delays.
                </p>
                <p>
                  Founded in 2023 by a team of longtime collectors and authentication experts, 
                  we set out to create the Netherlands' premier Pokémon card grading service. 
                  Our founders combined their decades of experience in the trading card industry 
                  with state-of-the-art technology to establish rigorous grading standards.
                </p>
                <p>
                  Today, we're proud to serve collectors across the Netherlands and beyond, 
                  providing the same level of expertise and reliability you'd expect from 
                  international services, but with the personal touch and accessibility 
                  of a local company.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-primary-500 to-secondary-500 dark:from-dark-gradient-start dark:to-dark-gradient-end rounded-2xl h-80 flex items-center justify-center">
                <div className="text-center text-white">
                  <BuildingOfficeIcon className="h-20 w-20 mx-auto mb-4" />
                  <p className="text-lg font-semibold">Est. 2023</p>
                  <p className="text-sm opacity-90">Amsterdam, Netherlands</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              These core principles guide every decision we make and every service we provide.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <Card key={value.title} className="text-center h-full dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="pt-8">
                  <value.icon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technology & Process */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-4">
              Our Technology & Process
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              We combine advanced imaging technology with human expertise to provide 
              the most accurate and reliable grading service in the Netherlands.
            </p>
          </div>

          {/* Technology Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardContent className="text-center pt-8">
                <CpuChipIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                  Advanced Imaging
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  High-resolution scanners capture microscopic details to detect 
                  counterfeits and assess card condition with unprecedented accuracy.
                </p>
              </CardContent>
            </Card>
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardContent className="text-center pt-8">
                <UserGroupIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                  Expert Graders
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  Certified professionals with decades of experience ensure 
                  consistent, accurate grading using industry-standard criteria.
                </p>
              </CardContent>
            </Card>
            <Card className="dark:bg-neutral-800 dark:border-neutral-700">
              <CardContent className="text-center pt-8">
                <ShieldCheckIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                  Secure Encapsulation
                </h3>
                <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                  Tamper-evident holders with unique serial numbers protect 
                  your cards while displaying grades and authentication details.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Grading Process */}
          <div className="bg-neutral-50 dark:bg-neutral-800 dark:border-neutral-700 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-8 text-center">
              Our 5-Step Grading Process
            </h3>
            <div className="space-y-8">
              {process.map((step, index) => (
                <div key={step.step} className="flex items-start">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-500 text-white rounded-full flex items-center justify-center font-bold mr-6">
                    {step.step}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-neutral-900 dark:text-white mb-2">
                      {step.title}
                    </h4>
                    <p className="text-neutral-600 dark:text-neutral-300">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-4">
              Meet Our Expert Team
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Our certified graders bring decades of combined experience to ensure 
              your cards receive the most accurate and professional assessment.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member) => (
              <Card key={member.name} className="text-center dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="pt-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-secondary-500 dark:from-dark-gradient-start dark:to-dark-gradient-end rounded-full mx-auto mb-4 flex items-center justify-center">
                    <UserGroupIcon className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary-500 font-medium mb-2">
                    {member.role}
                  </p>
                  <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-2">
                    {member.experience}
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Specialty: {member.specialty}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Safety */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-heading font-bold text-neutral-900 dark:text-white mb-4">
              Security & Safety
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto">
              Your cards are precious to you, and they're precious to us. We've implemented 
              comprehensive security measures to ensure your collection is protected every step of the way.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <ShieldCheckIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Full Insurance Coverage</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                All submissions are fully insured during transit and while in our facility.
              </p>
            </div>
            <div className="text-center">
              <BuildingOfficeIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Climate-Controlled Facility</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Temperature and humidity controlled environment protects cards from damage.
              </p>
            </div>
            <div className="text-center">
              <EyeIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">24/7 Monitoring</h3>
              <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                Advanced security systems monitor our facility around the clock.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-dark-gradient-start dark:to-dark-gradient-end">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-heading font-bold text-white mb-6">
            Ready to Experience Professional Grading?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of collectors who trust PokeGrade Nederland with their most valuable cards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto bg-white text-primary-500 border-white hover:bg-neutral-50 dark:bg-white dark:text-primary-500"
              >
                Submit Your Cards
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full sm:w-auto text-white border border-white/30 hover:bg-white/10"
              >
                Contact Our Team
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about PokeGrade Nederland - the Netherlands premier Pokémon card grading service. Founded by collectors, powered by expertise and advanced technology.',
  keywords: ['pokemon grading company', 'about pokegrade', 'card authentication experts', 'pokemon card grading netherlands', 'grading technology'],
};
