"use client";

import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import Link from "next/link";
import {
  ShieldCheckIcon,
  ClockIcon,
  CurrencyEuroIcon,
  StarIcon,
  TrophyIcon,
  DocumentMagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useLanguage } from "@/contexts/LanguageContext";

// Features will be dynamically generated with translations

const serviceTiers = [
  {
    name: "Value",
    price: "€15",
    turnaround: "20 business days",
    maxValue: "€500",
    features: ["Standard grading", "Basic protection", "Online tracking"],
    popular: false,
  },
  {
    name: "Standard",
    price: "€25",
    turnaround: "10 business days",
    maxValue: "€2,500",
    features: [
      "Priority grading",
      "Enhanced protection",
      "Online tracking",
      "Express handling",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "€45",
    turnaround: "5 business days",
    maxValue: "€10,000",
    features: [
      "Express grading",
      "Maximum protection",
      "Online tracking",
      "Priority handling",
      "Phone updates",
    ],
    popular: false,
  },
];

const testimonials = [
  {
    name: "Mark van der Berg",
    location: "Amsterdam",
    rating: 5,
    text: "Outstanding service! My vintage Charizard was handled with incredible care. The grading report was thorough and professional.",
  },
  {
    name: "Emma Janssen",
    location: "Rotterdam",
    rating: 5,
    text: "Fast turnaround and competitive prices. PokeGrade has become my go-to for all card authentication needs.",
  },
  {
    name: "Thomas de Wit",
    location: "Utrecht",
    rating: 5,
    text: "The online tracking system is amazing. I could follow my cards every step of the way. Highly recommend!",
  },
];

export default function Home() {
  const { t } = useLanguage();

  // Dynamic features with translations
  const features = [
    {
      icon: ShieldCheckIcon,
      title: t("features.auth.title"),
      description: t("features.auth.desc"),
    },
    {
      icon: ClockIcon,
      title: t("features.turnaround.title"),
      description: t("features.turnaround.desc"),
    },
    {
      icon: CurrencyEuroIcon,
      title: t("features.pricing.title"),
      description: t("features.pricing.desc"),
    },
    {
      icon: DocumentMagnifyingGlassIcon,
      title: t("features.reports.title"),
      description: t("features.reports.desc"),
    },
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5"></div>
        <div className="container-custom py-20 lg:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-neutral-900 mb-6 leading-tight">
                <span className="text-gradient">{t("hero.title")}</span>
                <br />
                <span className="text-2xl lg:text-3xl font-medium text-neutral-700">
                  {t("hero.subtitle")}
                </span>
              </h1>
              <p className="text-lg lg:text-xl text-neutral-600 mb-8 leading-relaxed">
                {t("hero.description")}{" "}
                <strong>{t("hero.psa_alternative")}</strong>
              </p>

              <div className="mb-8 text-left">
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-center">
                    <StarIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span>{t("hero.cost_from")}</span>
                  </li>
                  <li className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span>{t("hero.fast_service")}</span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span>{t("hero.professional_auth")}</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/submit">
                  <Button size="lg" className="w-full sm:w-auto">
                    {t("hero.submit_cards")}
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    {t("hero.view_pricing")}
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-6 transform rotate-3 hover:rotate-1 transition-transform duration-300">
                <div className="bg-neutral-100 rounded-lg overflow-hidden">
                  <img
                    src="/assets/img/rashi.png"
                    alt="Genesect Ex Pokémon kaart professioneel gegraded door PokeGrade Nederland - Pokemon card grading example"
                    className="w-full h-96 object-contain"
                    width={768}
                    height={1024}
                  />
                </div>
                <div className="mt-4 text-center">
                  <p className="text-lg font-semibold text-neutral-900 mb-1">
                    {t("common.professional_grade")}
                  </p>
                  <p className="text-sm text-neutral-600 mb-3">
                    Reshiram EX - White Flare
                  </p>
                  <div className="inline-flex items-center bg-success text-white px-3 py-1 rounded-full text-sm font-medium">
                    <StarIcon className="h-4 w-4 mr-1" />
                    {t("common.grade")}: 10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {t("features.title")}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {t("features.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {t("services.title")}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {t("services.description")}{" "}
              <strong>{t("services.transparent_pricing")}</strong>
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTiers.map((tier) => (
              <Card
                key={tier.name}
                className={`text-center relative ${
                  tier.popular
                    ? "ring-2 ring-primary-500 transform scale-105"
                    : ""
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      {t("services.most_popular")}
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-neutral-900">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-primary-500">
                      {tier.price}
                    </span>
                    <span className="text-neutral-600 ml-1">
                      {t("services.per_card")}
                    </span>
                  </div>
                  <p className="text-neutral-600 mt-2">{tier.turnaround}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-left">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-success rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg
                            className="w-3 h-3 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                        <span className="text-neutral-700 text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-neutral-500 mt-4">
                    Max card value: {tier.maxValue}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg">{t("services.view_detailed")}</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {t("testimonials.title")}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {t("testimonials.description")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index}>
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className="h-5 w-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                  <p className="text-neutral-700 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-neutral-100 pt-4">
                    <p className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-neutral-600">
                      {testimonial.location}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            {t("cta.title")}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {t("cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-primary-500 border-white hover:bg-neutral-50"
              >
                {t("cta.submit_now")}
              </Button>
            </Link>
            <Link href="/track">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-white border border-white/30 hover:bg-white/10"
              >
                {t("cta.track_order")}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
