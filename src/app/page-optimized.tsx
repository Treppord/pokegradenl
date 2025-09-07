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

const features = [
  {
    icon: ShieldCheckIcon,
    title: "Gecertificeerde Authenticatie | Certified Authentication",
    description:
      "Geavanceerde scantechnologie gecombineerd met expert beoordelaars voor authentieke, nauwkeurige grading. Advanced scanning technology with expert human graders ensure authentic, accurate grading.",
  },
  {
    icon: ClockIcon,
    title: "Snelle Doorlooptijd | Fast Turnaround",
    description:
      "Meerdere service opties van 5-dag express tot 20-dag standaard. Multiple service tiers from 5-day express to 20-day standard, fitting your timeline.",
  },
  {
    icon: CurrencyEuroIcon,
    title: "Scherpe Prijzen | Competitive Pricing",
    description:
      "Transparante prijzen vanaf €15 per kaart zonder verborgen kosten. Transparent pricing starting from €15 per card with no hidden fees.",
  },
  {
    icon: DocumentMagnifyingGlassIcon,
    title: "Uitgebreide Rapporten | Detailed Reports",
    description:
      "Uitgebreide grading rapporten met hoge resolutie foto's en gedetailleerde conditie analyse. Comprehensive reports with high-resolution images and detailed condition analysis.",
  },
];

const serviceTiers = [
  {
    name: "Value",
    price: "€15",
    turnaround: "20 werkdagen | 20 business days",
    maxValue: "€500",
    features: [
      "Standaard grading | Standard grading",
      "Basis bescherming | Basic protection",
      "Online tracking",
    ],
    popular: false,
  },
  {
    name: "Standard",
    price: "€25",
    turnaround: "10 werkdagen | 10 business days",
    maxValue: "€2,500",
    features: [
      "Prioriteit grading | Priority grading",
      "Verbeterde bescherming | Enhanced protection",
      "Online tracking",
      "Express behandeling | Express handling",
    ],
    popular: true,
  },
  {
    name: "Premium",
    price: "€45",
    turnaround: "5 werkdagen | 5 business days",
    maxValue: "€10,000",
    features: [
      "Express grading",
      "Maximum bescherming | Maximum protection",
      "Online tracking",
      "Prioriteit behandeling | Priority handling",
      "Telefoon updates | Phone updates",
    ],
    popular: false,
  },
];

const testimonials = [
  {
    name: "Mark van der Berg",
    location: "Amsterdam",
    rating: 5,
    text: "Uitstekende service! Mijn vintage Charizard werd met ongelooflijke zorg behandeld. Het grading rapport was grondig en professioneel.",
  },
  {
    name: "Emma Janssen",
    location: "Rotterdam",
    rating: 5,
    text: "Snelle doorlooptijd en concurrerende prijzen. PokeGrade is mijn go-to voor alle kaart authenticatie behoeften geworden.",
  },
  {
    name: "Thomas de Wit",
    location: "Utrecht",
    rating: 5,
    text: "Het online tracking systeem is geweldig. Ik kon mijn kaarten elke stap van de weg volgen. Zeer aan te bevelen!",
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section - SEO Optimized */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5"></div>
        <div className="container-custom py-20 lg:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              {/* SEO-optimized H1 with Dutch and English keywords */}
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-neutral-900 mb-6 leading-tight">
                <span className="text-gradient">
                  Pokémon Kaarten Grading Nederland
                </span>
                <br />
                <span className="text-2xl lg:text-3xl font-medium text-neutral-700">
                  Professional Pokemon Card Grading Netherlands
                </span>
              </h1>

              {/* SEO-optimized description with key terms */}
              <p className="text-lg lg:text-xl text-neutral-600 mb-8 leading-relaxed">
                Nederland's vertrouwde Pokémon kaarten grading service. Laat je
                Pokémon kaarten authentificeren en keuren door gecertificeerde
                experts met geavanceerde technologie.
                <strong>
                  {" "}
                  PSA alternative with fast turnaround and competitive prices.
                </strong>
              </p>

              {/* Keyword-rich benefits list */}
              <div className="mb-8 text-left">
                <ul className="space-y-2 text-neutral-600">
                  <li className="flex items-center">
                    <StarIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span>
                      <strong>Pokémon kaarten grading kosten</strong> vanaf €15
                      per kaart
                    </span>
                  </li>
                  <li className="flex items-center">
                    <ClockIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span>
                      <strong>Snelle grading service</strong> - 5 tot 20
                      werkdagen
                    </span>
                  </li>
                  <li className="flex items-center">
                    <ShieldCheckIcon className="h-5 w-5 text-primary-500 mr-2" />
                    <span>
                      <strong>Professionele authenticatie</strong> voor alle TCG
                      kaarten
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/submit">
                  <Button size="lg" className="w-full sm:w-auto">
                    Pokémon Kaarten Insturen | Submit Your Cards
                  </Button>
                </Link>
                <Link href="/services">
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full sm:w-auto"
                  >
                    Grading Prijzen | View Pricing
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
                    Professionele Grade | Professional Grade
                  </p>
                  <p className="text-sm text-neutral-600 mb-3">
                    Reshiram EX - White Flare
                  </p>
                  <div className="inline-flex items-center bg-success text-white px-3 py-1 rounded-full text-sm font-medium">
                    <StarIcon className="h-4 w-4 mr-1" />
                    Grade: 10
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Local SEO Keywords */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              Waarom Kiezen voor PokeGrade Nederland? | Why Choose PokeGrade
              Netherlands?
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Wij combineren geavanceerde technologie met menselijke expertise
              voor de meest nauwkeurige en betrouwbare
              <strong>
                {" "}
                Pokémon kaarten grading service in Amsterdam, Rotterdam, Utrecht
              </strong>{" "}
              en heel Nederland. We deliver the most accurate and trusted{" "}
              <strong>Pokemon card grading service in the Netherlands</strong>.
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

      {/* Services Overview - Cost-focused SEO */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              Pokémon Kaarten Grading Kosten & Service Levels
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Van budget-vriendelijke tot premium express service, wij hebben
              opties voor elke verzamelaar en tijdslijn.
              <strong> Pokemon card grading cost Netherlands</strong> -
              transparent pricing from €15 per card.
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
                      Populairste Keuze | Most Popular
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
                      per kaart | per card
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
                    Max kaart waarde | Max card value: {tier.maxValue}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg">
                Bekijk Gedetailleerde Prijzen | View Detailed Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials - Local SEO */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              Vertrouwd door Verzamelaars in Heel Nederland
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Sluit je aan bij duizenden tevreden klanten in{" "}
              <strong>Amsterdam, Rotterdam, Utrecht</strong> en heel Nederland
              die PokeGrade vertrouwen met hun meest waardevolle Pokémon
              kaarten.
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
            Klaar om je Pokémon Collectie te Laten Graden?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Sluit je aan bij duizenden verzamelaars die PokeGrade Nederland
            vertrouwen voor professionele, nauwkeurige en betrouwbare{" "}
            <strong>Pokémon kaarten grading services</strong>. Join collectors
            who trust us for{" "}
            <strong>professional Pokemon card grading in Netherlands</strong>.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white text-primary-500 border-white hover:bg-neutral-50"
              >
                Stuur Kaarten Nu In | Submit Cards Now
              </Button>
            </Link>
            <Link href="/track">
              <Button
                variant="ghost"
                size="lg"
                className="w-full sm:w-auto text-white border border-white/30 hover:bg-white/10"
              >
                Volg je Bestelling | Track Your Order
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
