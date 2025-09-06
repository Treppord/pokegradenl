'use client';

import { Layout } from '@/components/layout/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card';
import Link from 'next/link';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  CurrencyEuroIcon,
  StarIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  TrophyIcon,
  ChartBarIcon,
  CameraIcon,
  LockClosedIcon
} from '@heroicons/react/24/outline';

const pricingTiers = [
  {
    name: 'Value',
    price: '€15',
    originalPrice: null,
    turnaround: '20 business days',
    maxValue: '€500',
    popular: false,
    features: [
      'Professional 10-point grading scale',
      'Tamper-evident protective slab',
      'Online order tracking',
      'High-resolution card photography',
      'Basic grading report',
      'Standard shipping included',
    ],
    limitations: [
      'No subgrade scoring',
      'Standard processing queue',
    ],
    recommendation: 'Perfect for modern cards and budget-conscious collectors',
  },
  {
    name: 'Standard',
    price: '€25',
    originalPrice: '€30',
    turnaround: '10 business days',
    maxValue: '€2,500',
    popular: true,
    features: [
      'Professional 10-point grading scale',
      'Detailed subgrade analysis (Centering, Corners, Edges, Surface)',
      'Premium protective slab',
      'Priority processing',
      'Online order tracking with updates',
      'High-resolution card photography (multiple angles)',
      'Detailed grading report with analysis',
      'Express shipping included',
    ],
    limitations: [],
    recommendation: 'Most popular choice for valuable vintage and modern cards',
  },
  {
    name: 'Premium',
    price: '€45',
    originalPrice: '€55',
    turnaround: '5 business days',
    maxValue: '€10,000',
    popular: false,
    features: [
      'Professional 10-point grading scale',
      'Detailed subgrade analysis (Centering, Corners, Edges, Surface)',
      'Ultra-premium protective slab',
      'Express processing (top priority)',
      'Real-time order tracking',
      'Professional photography session (6+ angles)',
      'Comprehensive grading report with detailed analysis',
      'Phone consultation available',
      'Overnight shipping included',
      'Insurance coverage up to card value',
    ],
    limitations: [],
    recommendation: 'Ideal for high-value vintage cards and tournament prizes',
  },
];

const gradingStandards = [
  {
    grade: 'Gem Mint 10',
    description: 'Perfect card with sharp corners, perfect centering, and pristine surface',
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200',
  },
  {
    grade: 'Mint 9',
    description: 'Exceptional card with minimal wear, near-perfect centering',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
  },
  {
    grade: 'Near Mint-Mint 8.5',
    description: 'Excellent card with slight wear, very good centering',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
  },
  {
    grade: 'Near Mint 8',
    description: 'Very good card with minor flaws, good centering',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
  },
  {
    grade: 'Excellent-Near Mint 7.5',
    description: 'Good card with some wear, acceptable centering',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
  },
  {
    grade: 'Excellent 7',
    description: 'Card with noticeable wear but still collectible',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
  },
];

const subgradeCategories = [
  {
    icon: ChartBarIcon,
    name: 'Centering',
    description: 'Evaluates how evenly the card image is positioned within the borders',
    details: 'Measured as percentages (e.g., 50/50 is perfect, 60/40 is acceptable)',
  },
  {
    icon: TrophyIcon,
    name: 'Corners',
    description: 'Assesses the sharpness and condition of all four corners',
    details: 'Examines for rounding, wear, whitening, and damage',
  },
  {
    icon: DocumentTextIcon,
    name: 'Edges',
    description: 'Reviews the condition of all card edges for wear and damage',
    details: 'Checks for roughness, whitening, nicks, and chipping',
  },
  {
    icon: StarIcon,
    name: 'Surface',
    description: 'Analyzes the card surface for scratches, print defects, and stains',
    details: 'Includes foil condition, print quality, and surface integrity',
  },
];

const faqs = [
  {
    question: 'How long does the grading process take?',
    answer: 'Turnaround times vary by service tier: Value (20 business days), Standard (10 business days), and Premium (5 business days). These times start from when we receive your cards at our facility.',
  },
  {
    question: 'What is the maximum card value for each service?',
    answer: 'Value tier accepts cards up to €500, Standard tier up to €2,500, and Premium tier up to €10,000. For cards exceeding these values, please contact us for custom pricing.',
  },
  {
    question: 'Do you grade cards from all TCG sets?',
    answer: 'Yes, we grade Pokémon cards from all sets, including Base Set, Neo, e-Card, EX, Diamond & Pearl, Black & White, XY, Sun & Moon, and Sword & Shield series.',
  },
  {
    question: 'What authentication methods do you use?',
    answer: 'We use advanced scanning technology, UV light analysis, and expert authentication to detect altered, reprinted, or counterfeit cards. Our team has over 10 years of experience in TCG authentication.',
  },
  {
    question: 'Can I track my order online?',
    answer: 'Yes, all orders include online tracking. You\'ll receive updates when we receive your cards, during grading, and when they ship back to you. Premium customers also receive phone updates.',
  },
  {
    question: 'What happens if my card is damaged during grading?',
    answer: 'We handle all cards with extreme care and have comprehensive insurance coverage. In the rare event of damage, we provide full compensation up to the declared card value.',
  },
  {
    question: 'Do you offer bulk discounts?',
    answer: 'Yes, we offer discounts for submissions of 20+ cards. Contact us for bulk pricing information and special rates for large collections.',
  },
  {
    question: 'What payment methods do you accept?',
    answer: 'We accept all major credit cards, PayPal, bank transfers, and iDEAL. Payment is required before we begin the grading process.',
  },
];

export default function ServicesClient() {
  const { t } = useLanguage();
  
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-50 to-secondary-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5"></div>
        <div className="container-custom py-16 lg:py-24 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold text-neutral-900 mb-6 leading-tight">
              <span className="text-gradient">{t('services.hero_title')}</span>
            </h1>
            <p className="text-lg lg:text-xl text-neutral-600 mb-8 leading-relaxed">
              {t('services.hero_desc')} <strong>{t('services.alternative_quality')}</strong>
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/submit">
                <Button size="lg" className="w-full sm:w-auto">
                  {t('hero.submit_cards')}
                </Button>
              </Link>
              <Link href="#pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  {t('hero.view_pricing')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section id="pricing" className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              {t('services.description')} <strong>{t('services.transparent_pricing')}</strong>
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {pricingTiers.map((tier) => (
              <Card 
                key={tier.name} 
                className={`text-center relative ${
                  tier.popular 
                    ? 'ring-2 ring-primary-500 transform lg:scale-105 shadow-xl' 
                    : 'hover:shadow-lg'
                }`}
                padding="lg"
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-500 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {t('services.most_popular')}
                    </span>
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-neutral-900">
                    {tier.name}
                  </CardTitle>
                  <div className="mt-4">
                    <div className="flex items-center justify-center">
                      <span className="text-5xl font-bold text-primary-500">
                        {tier.price}
                      </span>
                      <span className="text-neutral-600 ml-2">{t('services.per_card')}</span>
                    </div>
                    {tier.originalPrice && (
                      <div className="mt-1">
                        <span className="text-lg text-neutral-400 line-through">
                          {tier.originalPrice}
                        </span>
                        <span className="text-sm text-green-600 ml-2 font-semibold">
                          Save {parseInt(tier.originalPrice.slice(1)) - parseInt(tier.price.slice(1))}€
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-center text-neutral-600">
                      <ClockIcon className="h-5 w-5 mr-2" />
                      <span>{tier.turnaround}</span>
                    </div>
                    <div className="flex items-center justify-center text-neutral-600">
                      <CurrencyEuroIcon className="h-5 w-5 mr-2" />
                      <span>Max value: {tier.maxValue}</span>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-neutral-900 mb-3 text-left">Included Features:</h4>
                      <ul className="space-y-2 text-left">
                        {tier.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircleIcon className="h-5 w-5 text-success flex-shrink-0 mt-0.5 mr-3" />
                            <span className="text-sm text-neutral-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {tier.limitations.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-neutral-900 mb-3 text-left">Limitations:</h4>
                        <ul className="space-y-2 text-left">
                          {tier.limitations.map((limitation, index) => (
                            <li key={index} className="flex items-start">
                              <div className="h-5 w-5 flex-shrink-0 mt-0.5 mr-3">
                                <div className="h-2 w-2 bg-neutral-400 rounded-full mt-1.5"></div>
                              </div>
                              <span className="text-sm text-neutral-600">{limitation}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter>
                  <div className="text-center">
                    <p className="text-sm text-neutral-600 mb-4 italic">
                      {tier.recommendation}
                    </p>
                    <Link href="/submit" className="w-full block">
                      <Button 
                        variant={tier.popular ? 'primary' : 'outline'} 
                        size="lg" 
                        className="w-full"
                      >
                        Choose {tier.name}
                      </Button>
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="bg-neutral-50 rounded-2xl p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-xl font-semibold text-neutral-900 mb-4">
                {t('services.need_different')}
              </h3>
              <p className="text-neutral-600 mb-6">
                {t('services.custom_service_desc')}
              </p>
              <Link href="/contact">
                <Button variant="outline" size="lg">
                  {t('services.contact_custom')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Grading Standards */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {t('services.grading_standards')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              We use the industry-standard 10-point grading scale with precise criteria 
              for each grade. Our certified experts ensure consistent and accurate grading.
            </p>
          </div>

          {/* Grading Scale */}
          <div className="mb-16">
            <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-8 text-center">
              {t('services.grading_scale')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {gradingStandards.map((grade) => (
                <Card key={grade.grade} className={`${grade.bgColor} ${grade.borderColor} border-2`}>
                  <CardContent>
                    <div className="text-center">
                      <h4 className={`text-lg font-bold ${grade.color} mb-2`}>
                        {grade.grade}
                      </h4>
                      <p className="text-sm text-neutral-700">
                        {grade.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Subgrade Categories */}
          <div>
            <h3 className="text-2xl font-heading font-semibold text-neutral-900 mb-8 text-center">
              {t('services.subgrade_analysis')}
            </h3>
            <p className="text-center text-neutral-600 mb-10 max-w-3xl mx-auto">
              Standard and Premium tiers include detailed subgrade analysis across four key categories. 
              Each subgrade is scored individually to provide comprehensive card evaluation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {subgradeCategories.map((category) => (
                <Card key={category.name} className="text-center">
                  <CardContent>
                    <category.icon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-neutral-900 mb-3">
                      {category.name}
                    </h4>
                    <p className="text-neutral-600 text-sm mb-3">
                      {category.description}
                    </p>
                    <p className="text-neutral-500 text-xs">
                      {category.details}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Authentication Process */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {t('services.auth_process')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Every card undergoes rigorous authentication before grading. Our multi-step process 
              ensures only genuine cards receive our certification.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center">
              <CardContent>
                <MagnifyingGlassIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Visual Inspection
                </h3>
                <p className="text-neutral-600 text-sm">
                  Expert examination of card stock, print quality, and design elements
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent>
                <CameraIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Advanced Scanning
                </h3>
                <p className="text-neutral-600 text-sm">
                  High-resolution digital analysis and UV light authentication
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent>
                <DocumentTextIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Database Verification
                </h3>
                <p className="text-neutral-600 text-sm">
                  Cross-reference with comprehensive database of known cards and variations
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent>
                <LockClosedIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                  Secure Encapsulation
                </h3>
                <p className="text-neutral-600 text-sm">
                  Tamper-evident protective slab with unique certification number
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-neutral-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              {t('services.faq_title')}
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Have questions about our grading services? Find answers to common questions below.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-start">
                  <QuestionMarkCircleIcon className="h-6 w-6 text-primary-500 flex-shrink-0 mt-1 mr-4" />
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {faq.question}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-neutral-600 mb-6">
              Don't see your question answered?
            </p>
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-secondary-500">
        <div className="container-custom text-center">
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-white mb-6">
            Ready to Grade Your Cards?
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied collectors who trust PokeGrade for professional, 
            accurate, and secure Pokémon card grading services.
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
            <Link href="/track">
              <Button 
                variant="ghost" 
                size="lg" 
                className="w-full sm:w-auto text-white border border-white/30 hover:bg-white/10"
              >
                Track Existing Order
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
