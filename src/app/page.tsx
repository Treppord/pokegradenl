import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import Link from 'next/link';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  CurrencyEuroIcon,
  StarIcon,
  TrophyIcon,
  DocumentMagnifyingGlassIcon
} from '@heroicons/react/24/outline';

const features = [
  {
    icon: ShieldCheckIcon,
    title: 'Certified Authentication',
    description: 'Advanced scanning technology combined with expert human graders ensure authentic, accurate grading.',
  },
  {
    icon: ClockIcon,
    title: 'Fast Turnaround',
    description: 'Multiple service tiers available from 5-day express to 20-day standard, fitting your timeline.',
  },
  {
    icon: CurrencyEuroIcon,
    title: 'Competitive Pricing',
    description: 'Transparent pricing starting from €15 per card with no hidden fees or surprise charges.',
  },
  {
    icon: DocumentMagnifyingGlassIcon,
    title: 'Detailed Reports',
    description: 'Comprehensive grading reports with high-resolution images and detailed condition analysis.',
  },
];

const serviceTiers = [
  {
    name: 'Value',
    price: '€15',
    turnaround: '20 business days',
    maxValue: '€500',
    features: ['Standard grading', 'Basic protection', 'Online tracking'],
    popular: false,
  },
  {
    name: 'Standard',
    price: '€25',
    turnaround: '10 business days',
    maxValue: '€2,500',
    features: ['Priority grading', 'Enhanced protection', 'Online tracking', 'Express handling'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '€45',
    turnaround: '5 business days',
    maxValue: '€10,000',
    features: ['Express grading', 'Maximum protection', 'Online tracking', 'Priority handling', 'Phone updates'],
    popular: false,
  },
];

const testimonials = [
  {
    name: 'Mark van der Berg',
    location: 'Amsterdam',
    rating: 5,
    text: 'Outstanding service! My vintage Charizard was handled with incredible care. The grading report was thorough and professional.',
  },
  {
    name: 'Emma Janssen',
    location: 'Rotterdam',
    rating: 5,
    text: 'Fast turnaround and competitive prices. PokeGrade has become my go-to for all card authentication needs.',
  },
  {
    name: 'Thomas de Wit',
    location: 'Utrecht',
    rating: 5,
    text: 'The online tracking system is amazing. I could follow my cards every step of the way. Highly recommend!',
  },
];

export default function Home() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-dark-gradient-start dark:to-dark-gradient-end overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5 dark:from-dark-gradient-start/20 dark:to-dark-gradient-end/20"></div>
        <div className="container-custom py-20 lg:py-32 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-heading font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                <span className="text-gradient">Precision Grading,</span><br />
                Passionately Delivered
              </h1>
              <p className="text-lg lg:text-xl text-neutral-600 dark:text-neutral-300 mb-8 leading-relaxed">
                Netherlands' trusted Pokémon card grading service. Get your cards authenticated 
                and graded by certified experts using advanced technology and rigorous standards.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/submit">
                  <Button size="lg" className="w-full sm:w-auto">
                    Submit Your Cards
                  </Button>
                </Link>
                <Link href="/services">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-1 transition-transform duration-300">
                <div className="bg-gradient-to-br from-primary-500 to-secondary-500 h-64 rounded-lg flex items-center justify-center">
                  <div className="text-center text-white">
                    <TrophyIcon className="h-16 w-16 mx-auto mb-4" />
                    <p className="text-lg font-semibold">Professional Grade</p>
                    <p className="text-sm opacity-90">Charizard Base Set</p>
                  </div>
                </div>
                <div className="mt-4 text-center">
                  <div className="inline-flex items-center bg-success text-white px-3 py-1 rounded-full text-sm font-medium">
                    <StarIcon className="h-4 w-4 mr-1" />
                    Grade: 9.5
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 dark:text-white mb-4">
              Why Choose PokeGrade?
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              We combine cutting-edge technology with human expertise to deliver 
              the most accurate and trusted card grading service in the Netherlands.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="text-center dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-600 dark:text-neutral-300 text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-neutral-50 dark:bg-neutral-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 dark:text-white mb-4">
              Choose Your Service Level
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              From budget-friendly to premium express service, we have options 
              for every collector and timeline.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`text-center relative dark:bg-neutral-800 dark:border-neutral-700 ${
                  tier.popular ? 'ring-2 ring-primary-500 transform scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-2">
                    <span className="text-4xl font-bold text-primary-500">
                      {tier.price}
                    </span>
                    <span className="text-neutral-600 dark:text-neutral-300 ml-1">per card</span>
                  </div>
                  <p className="text-neutral-600 dark:text-neutral-300 mt-2">
                    {tier.turnaround}
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-left">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="flex-shrink-0 w-5 h-5 bg-success rounded-full flex items-center justify-center mr-3 mt-0.5">
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-neutral-700 dark:text-neutral-300 text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-4">
                    Max card value: {tier.maxValue}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/services">
              <Button size="lg">
                View Detailed Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white dark:bg-dark-bg">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 dark:text-white mb-4">
              Trusted by Collectors Across the Netherlands
            </h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust PokeGrade with their most valuable cards.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="dark:bg-neutral-800 dark:border-neutral-700">
                <CardContent>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <StarIcon key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-neutral-700 dark:text-neutral-300 mb-4 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="border-t border-neutral-100 dark:border-neutral-700 pt-4">
                    <p className="font-semibold text-neutral-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300">{testimonial.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500 dark:from-dark-gradient-start dark:to-dark-gradient-end">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Ready to Grade Your Collection?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join the thousands of collectors who trust PokeGrade for professional, 
            accurate, and reliable Pokémon card grading services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/submit">
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto bg-white dark:bg-neutral-800 text-primary-500 dark:text-white border-white dark:border-neutral-600 hover:bg-neutral-50 dark:hover:bg-neutral-700"
              >
                Submit Cards Now
              </Button>
            </Link>
            <Link href="/track">
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full sm:w-auto text-white border border-white/30 dark:border-neutral-600 hover:bg-white/10 dark:hover:bg-neutral-800/50"
              >
                Track Your Order
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
