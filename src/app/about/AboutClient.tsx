"use client";

import React from "react";
import { Layout } from "@/components/layout/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import {
  ShieldCheckIcon,
  EyeIcon,
  UserGroupIcon,
  ClockIcon,
  CpuChipIcon,
  BuildingOfficeIcon,
  TrophyIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";

const values = [
  {
    icon: EyeIcon,
    title: "Precision",
    description:
      "Every card is evaluated with meticulous attention to detail using advanced technology and expert knowledge.",
  },
  {
    icon: HeartIcon,
    title: "Passion",
    description:
      "We share the same love for Pokémon cards as our customers, treating every submission with personal care.",
  },
  {
    icon: UserGroupIcon,
    title: "Trust",
    description:
      "Building lasting relationships with collectors through transparency, reliability, and consistent quality.",
  },
  {
    icon: ClockIcon,
    title: "Speed",
    description:
      "Efficient processes and multiple service tiers ensure your cards are graded and returned promptly.",
  },
];

const teamMembers = [
  {
    name: "Sarah van Dijk",
    role: "Founder & Lead Grader",
    experience: "12 years",
    specialty: "Vintage Pokémon Authentication",
    description:
      "Former PSA consultant with extensive knowledge in early Pokémon sets and authentication techniques.",
  },
  {
    name: "Marcus de Jong",
    role: "Senior Grader",
    experience: "8 years",
    specialty: "Modern TCG & Surface Analysis",
    description:
      "Expert in modern printing techniques and surface condition assessment with advanced imaging technology.",
  },
  {
    name: "Elena Rodriguez",
    role: "Operations Manager",
    experience: "6 years",
    specialty: "Process Optimization",
    description:
      "Ensures smooth operations and customer satisfaction with background in logistics and quality control.",
  },
];

const stats = [
  {
    icon: TrophyIcon,
    number: "50,000+",
    label: "Cards Graded",
  },
  {
    icon: UserGroupIcon,
    number: "2,500+",
    label: "Happy Customers",
  },
  {
    icon: ClockIcon,
    number: "99.8%",
    label: "On-Time Delivery",
  },
  {
    icon: ShieldCheckIcon,
    number: "100%",
    label: "Satisfaction Rate",
  },
];

export default function AboutClient() {
  const { t } = useLanguage();

  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6">
              {t("about.hero_title")}
            </h1>
            <p className="text-xl text-neutral-600 leading-relaxed">
              {t("about.hero_desc")}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-6">
                {t("about.our_story")}
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  PokeGrade Nederland was founded in 2018 by a group of
                  passionate Pokémon card collectors who recognized the need for
                  accessible, high-quality grading services in the Netherlands.
                </p>
                <p>
                  After years of shipping cards internationally and dealing with
                  long wait times, high costs, and customs complications, we
                  decided to bring professional grading services directly to
                  Dutch and European collectors.
                </p>
                <p>
                  Today, we're proud to be the Netherlands' leading independent
                  card grading service, combining traditional expertise with
                  cutting-edge technology to provide accurate, consistent, and
                  trustworthy grading for collectors across Europe.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              These principles guide everything we do, from individual card
              evaluations to customer service and business operations.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center">
                <CardContent>
                  <value.icon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-6">
              {t("about.our_mission")}
            </h2>
            <div className="text-lg text-neutral-600 leading-relaxed space-y-4">
              <p>
                Our mission is to provide the most accurate, consistent, and
                accessible Pokémon card grading service in Europe, while
                supporting and growing the collecting community through
                education, transparency, and exceptional service.
              </p>
              <p>
                We believe that every collector, whether they own vintage Base
                Set cards or the latest tournament promos, deserves
                professional-grade authentication and preservation services at
                fair prices with reasonable turnaround times.
              </p>
            </div>
            <div className="mt-8">
              <Link href="/services">
                <Button size="lg">Explore Our Services</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Process */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-6">
                Technology & Process
              </h2>
              <div className="space-y-4 text-neutral-600 leading-relaxed">
                <p>
                  We utilize state-of-the-art imaging technology, including
                  high-resolution scanners and UV authentication equipment, to
                  ensure every card receives thorough and accurate evaluation.
                </p>
                <p>
                  Our proprietary grading software helps maintain consistency
                  across all evaluations, while our experienced team provides
                  the human expertise that technology alone cannot replace.
                </p>
                <p>
                  Every step of our process is documented and trackable, giving
                  you complete transparency from submission to delivery.
                </p>
              </div>
              <div className="mt-6 flex items-center space-x-4">
                <CpuChipIcon className="h-8 w-8 text-primary-500" />
                <BuildingOfficeIcon className="h-8 w-8 text-secondary-500" />
                <ShieldCheckIcon className="h-8 w-8 text-success" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied collectors who trust PokeGrade Nederland
            for their most valuable cards.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-primary-500 border-white hover:bg-neutral-50"
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
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
