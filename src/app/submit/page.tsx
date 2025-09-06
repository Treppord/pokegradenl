'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/Button';
import { Input, Select, Textarea } from '@/components/ui/Input';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { PayPalButton } from '@/components/ui/PayPalButton';
import { 
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  TruckIcon,
  CreditCardIcon,
  PlusIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const serviceTiers = [
  {
    id: 'value',
    name: 'Value',
    price: 15,
    turnaround: '20 business days',
    maxValue: 500,
    features: ['Standard grading', 'Basic protection', 'Online tracking']
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 25,
    turnaround: '10 business days',
    maxValue: 2500,
    features: ['Priority grading', 'Enhanced protection', 'Online tracking', 'Express handling'],
    recommended: true
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 45,
    turnaround: '5 business days',
    maxValue: 10000,
    features: ['Express grading', 'Maximum protection', 'Online tracking', 'Priority handling', 'Phone updates']
  }
];

const cardSets = [
  'Base Set', 'Jungle', 'Fossil', 'Base Set 2', 'Team Rocket', 'Gym Heroes',
  'Gym Challenge', 'Neo Genesis', 'Neo Discovery', 'Neo Destiny', 'Neo Revelation',
  'Expedition', 'Aquapolis', 'Skyridge', 'Ruby & Sapphire', 'Sandstorm',
  'Dragon', 'Team Magma vs Team Aqua', 'Hidden Legends', 'FireRed & LeafGreen',
  'Deoxys', 'Emerald', 'Unseen Forces', 'Delta Species', 'Legend Maker',
  'Holon Phantoms', 'Crystal Guardians', 'Dragon Frontiers', 'Power Keepers',
  'Diamond & Pearl', 'Mysterious Treasures', 'Secret Wonders', 'Great Encounters',
  'Majestic Dawn', 'Legends Awakened', 'Stormfront', 'Platinum', 'Rising Rivals',
  'Supreme Victors', 'Arceus', 'HeartGold & SoulSilver', 'Unleashed', 'Undaunted',
  'Triumphant', 'Black & White', 'Emerging Powers', 'Noble Victories',
  'Next Destinies', 'Dark Explorers', 'Dragons Exalted', 'Boundaries Crossed',
  'Plasma Storm', 'Plasma Freeze', 'Plasma Blast', 'Legendary Treasures',
  'XY', 'Flashfire', 'Furious Fists', 'Phantom Forces', 'Primal Clash',
  'Roaring Skies', 'Ancient Origins', 'BREAKthrough', 'BREAKpoint',
  'Generations', 'Fates Collide', 'Steam Siege', 'Evolutions'
];

const conditions = [
  { value: 'mint', label: 'Mint (M)' },
  { value: 'near-mint', label: 'Near Mint (NM)' },
  { value: 'excellent', label: 'Excellent (EX)' },
  { value: 'very-good', label: 'Very Good (VG)' },
  { value: 'good', label: 'Good (G)' },
  { value: 'poor', label: 'Poor (P)' }
];

interface CardEntry {
  id: string;
  name: string;
  set: string;
  cardNumber: string;
  condition: string;
  estimatedValue: string;
  language: string;
  variant: string;
}

const steps = [
  { id: 1, name: 'Service Selection', icon: CheckCircleIcon },
  { id: 2, name: 'Card Details', icon: ClockIcon },
  { id: 3, name: 'Shipping Info', icon: TruckIcon },
  { id: 4, name: 'Review & Payment', icon: CreditCardIcon }
];

export default function SubmitPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTier, setSelectedTier] = useState('standard');
  const [cards, setCards] = useState<CardEntry[]>([{
    id: '1',
    name: '',
    set: '',
    cardNumber: '',
    condition: '',
    estimatedValue: '',
    language: 'english',
    variant: ''
  }]);
  const [shippingInfo, setShippingInfo] = useState({
    pickupAddress: {
      firstName: '',
      lastName: '',
      company: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'Netherlands',
      phone: '',
      email: ''
    },
    returnAddress: {
      firstName: '',
      lastName: '',
      company: '',
      street: '',
      city: '',
      postalCode: '',
      country: 'Netherlands',
      phone: '',
      email: ''
    },
    sameAsPickup: true,
    notes: ''
  });

  const addCard = () => {
    const newCard: CardEntry = {
      id: Date.now().toString(),
      name: '',
      set: '',
      cardNumber: '',
      condition: '',
      estimatedValue: '',
      language: 'english',
      variant: ''
    };
    setCards([...cards, newCard]);
  };

  const removeCard = (id: string) => {
    setCards(cards.filter(card => card.id !== id));
  };

  const updateCard = (id: string, field: keyof CardEntry, value: string) => {
    setCards(cards.map(card => 
      card.id === id ? { ...card, [field]: value } : card
    ));
  };

  const calculateTotal = () => {
    const tier = serviceTiers.find(t => t.id === selectedTier);
    return cards.length * (tier?.price || 0);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return selectedTier !== '';
      case 2:
        return cards.every(card => card.name && card.set && card.condition);
      case 3:
        return shippingInfo.pickupAddress.firstName && 
               shippingInfo.pickupAddress.lastName && 
               shippingInfo.pickupAddress.street &&
               shippingInfo.pickupAddress.city &&
               shippingInfo.pickupAddress.postalCode &&
               shippingInfo.pickupAddress.email;
      default:
        return true;
    }
  };

  const preparePaymentData = () => {
    const tier = serviceTiers.find(t => t.id === selectedTier);
    const items = [{
      name: `${tier?.name} Card Grading Service`,
      description: `Professional grading for ${cards.length} Pokémon cards`,
      quantity: cards.length,
      unit_amount: {
        currency_code: 'EUR',
        value: (tier?.price || 0).toFixed(2),
      },
    }];

    const customerInfo = {
      firstName: shippingInfo.pickupAddress.firstName,
      lastName: shippingInfo.pickupAddress.lastName,
      phone: shippingInfo.pickupAddress.phone,
    };

    return { items, customerInfo };
  };

  const handlePaymentSuccess = (orderId: string) => {
    // Store submission data in localStorage for later retrieval
    const submissionData = {
      orderId,
      selectedTier,
      cards,
      shippingInfo,
      total: calculateTotal(),
      timestamp: new Date().toISOString(),
    };
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastSubmission', JSON.stringify(submissionData));
    }
    
    router.push(`/payment/success?orderId=${orderId}`);
  };

  const handlePaymentError = (error: any) => {
    console.error('Payment failed:', error);
    alert('Payment failed. Please try again or contact support if the issue persists.');
  };

  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-12">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-heading font-bold text-neutral-900 mb-4">
              Submit Your Cards for Grading
            </h1>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Follow our simple 4-step process to submit your Pokémon cards for professional grading.
            </p>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Progress Steps */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <h3 className="font-semibold text-neutral-900 mb-4">Progress</h3>
              <nav aria-label="Progress">
                <ol className="space-y-4">
                  {steps.map((step) => (
                    <li key={step.id} className="flex items-center">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        currentStep > step.id
                          ? 'bg-success border-success text-white'
                          : currentStep === step.id
                          ? 'border-primary-500 text-primary-500'
                          : 'border-neutral-300 text-neutral-400'
                      }`}>
                        {currentStep > step.id ? (
                          <CheckCircleIcon className="h-6 w-6" />
                        ) : (
                          <span className="text-sm font-medium">{step.id}</span>
                        )}
                      </div>
                      <span className={`ml-3 text-sm font-medium ${
                        currentStep >= step.id ? 'text-neutral-900' : 'text-neutral-500'
                      }`}>
                        {step.name}
                      </span>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>
          </div>

          {/* Form Content */}
          <div className="lg:col-span-3">
            {/* Step 1: Service Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Choose Your Service Level</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {serviceTiers.map((tier) => (
                        <div
                          key={tier.id}
                          className={`cursor-pointer border-2 rounded-lg p-6 transition-all ${
                            selectedTier === tier.id
                              ? 'border-primary-500 bg-primary-50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                          onClick={() => setSelectedTier(tier.id)}
                        >
                          {tier.recommended && (
                            <div className="text-xs font-medium text-primary-500 uppercase tracking-wide mb-2">
                              Recommended
                            </div>
                          )}
                          <h3 className="text-xl font-semibold text-neutral-900 mb-2">
                            {tier.name}
                          </h3>
                          <p className="text-2xl font-bold text-primary-500 mb-2">
                            €{tier.price}
                            <span className="text-sm font-normal text-neutral-600 ml-1">per card</span>
                          </p>
                          <p className="text-neutral-600 mb-4">{tier.turnaround}</p>
                          <ul className="space-y-2">
                            {tier.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-sm">
                                <CheckCircleIcon className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 2: Card Details */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Card Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {cards.map((card, index) => (
                        <div key={card.id} className="border border-neutral-200 rounded-lg p-6">
                          <div className="flex justify-between items-center mb-4">
                            <h4 className="font-medium text-neutral-900">Card #{index + 1}</h4>
                            {cards.length > 1 && (
                              <Button
                                variant="ghost"
                                onClick={() => removeCard(card.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <XMarkIcon className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <Input
                              label="Card Name"
                              placeholder="e.g., Charizard"
                              value={card.name}
                              onChange={(e) => updateCard(card.id, 'name', e.target.value)}
                              required
                            />
                            <Select
                              label="Set"
                              options={cardSets.map(set => ({ value: set, label: set }))}
                              value={card.set}
                              onChange={(e) => updateCard(card.id, 'set', e.target.value)}
                              placeholder="Select set"
                              required
                            />
                            <Input
                              label="Card Number"
                              placeholder="e.g., 4/102"
                              value={card.cardNumber}
                              onChange={(e) => updateCard(card.id, 'cardNumber', e.target.value)}
                            />
                            <Select
                              label="Condition"
                              options={conditions}
                              value={card.condition}
                              onChange={(e) => updateCard(card.id, 'condition', e.target.value)}
                              placeholder="Select condition"
                              required
                            />
                            <Input
                              label="Estimated Value (€)"
                              type="number"
                              placeholder="0"
                              value={card.estimatedValue}
                              onChange={(e) => updateCard(card.id, 'estimatedValue', e.target.value)}
                            />
                            <Select
                              label="Language"
                              options={[
                                { value: 'english', label: 'English' },
                                { value: 'dutch', label: 'Dutch' },
                                { value: 'german', label: 'German' },
                                { value: 'french', label: 'French' },
                                { value: 'spanish', label: 'Spanish' },
                                { value: 'italian', label: 'Italian' },
                                { value: 'japanese', label: 'Japanese' }
                              ]}
                              value={card.language}
                              onChange={(e) => updateCard(card.id, 'language', e.target.value)}
                            />
                          </div>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        onClick={addCard}
                        className="w-full"
                      >
                        <PlusIcon className="h-4 w-4 mr-2" />
                        Add Another Card
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Shipping Information */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      <div>
                        <h4 className="font-medium text-neutral-900 mb-4">Pickup Address</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Input
                            label="First Name"
                            value={shippingInfo.pickupAddress.firstName}
                            onChange={(e) => setShippingInfo(prev => ({
                              ...prev,
                              pickupAddress: { ...prev.pickupAddress, firstName: e.target.value }
                            }))}
                            required
                          />
                          <Input
                            label="Last Name"
                            value={shippingInfo.pickupAddress.lastName}
                            onChange={(e) => setShippingInfo(prev => ({
                              ...prev,
                              pickupAddress: { ...prev.pickupAddress, lastName: e.target.value }
                            }))}
                            required
                          />
                          <Input
                            label="Email"
                            type="email"
                            value={shippingInfo.pickupAddress.email}
                            onChange={(e) => setShippingInfo(prev => ({
                              ...prev,
                              pickupAddress: { ...prev.pickupAddress, email: e.target.value }
                            }))}
                            required
                          />
                          <Input
                            label="Phone"
                            type="tel"
                            value={shippingInfo.pickupAddress.phone}
                            onChange={(e) => setShippingInfo(prev => ({
                              ...prev,
                              pickupAddress: { ...prev.pickupAddress, phone: e.target.value }
                            }))}
                          />
                          <div className="md:col-span-2">
                            <Input
                              label="Street Address"
                              value={shippingInfo.pickupAddress.street}
                              onChange={(e) => setShippingInfo(prev => ({
                                ...prev,
                                pickupAddress: { ...prev.pickupAddress, street: e.target.value }
                              }))}
                              required
                            />
                          </div>
                          <Input
                            label="City"
                            value={shippingInfo.pickupAddress.city}
                            onChange={(e) => setShippingInfo(prev => ({
                              ...prev,
                              pickupAddress: { ...prev.pickupAddress, city: e.target.value }
                            }))}
                            required
                          />
                          <Input
                            label="Postal Code"
                            value={shippingInfo.pickupAddress.postalCode}
                            onChange={(e) => setShippingInfo(prev => ({
                              ...prev,
                              pickupAddress: { ...prev.pickupAddress, postalCode: e.target.value }
                            }))}
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center mb-4">
                          <input
                            type="checkbox"
                            id="sameAsPickup"
                            checked={shippingInfo.sameAsPickup}
                            onChange={(e) => setShippingInfo(prev => ({
                              ...prev,
                              sameAsPickup: e.target.checked
                            }))}
                            className="mr-3"
                          />
                          <label htmlFor="sameAsPickup" className="font-medium text-neutral-900">
                            Use same address for return shipping
                          </label>
                        </div>

                        {!shippingInfo.sameAsPickup && (
                          <div>
                            <h4 className="font-medium text-neutral-900 mb-4">Return Address</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Input
                                label="First Name"
                                value={shippingInfo.returnAddress.firstName}
                                onChange={(e) => setShippingInfo(prev => ({
                                  ...prev,
                                  returnAddress: { ...prev.returnAddress, firstName: e.target.value }
                                }))}
                              />
                              <Input
                                label="Last Name"
                                value={shippingInfo.returnAddress.lastName}
                                onChange={(e) => setShippingInfo(prev => ({
                                  ...prev,
                                  returnAddress: { ...prev.returnAddress, lastName: e.target.value }
                                }))}
                              />
                            </div>
                          </div>
                        )}
                      </div>

                      <Textarea
                        label="Special Instructions (Optional)"
                        placeholder="Any special handling instructions or notes..."
                        value={shippingInfo.notes}
                        onChange={(e) => setShippingInfo(prev => ({
                          ...prev,
                          notes: e.target.value
                        }))}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 4: Review & Payment */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Review Your Submission</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Service Summary */}
                      <div>
                        <h4 className="font-medium text-neutral-900 mb-2">Service Level</h4>
                        <div className="bg-neutral-50 p-4 rounded-lg">
                          <p className="font-medium">{serviceTiers.find(t => t.id === selectedTier)?.name}</p>
                          <p className="text-sm text-neutral-600">
                            €{serviceTiers.find(t => t.id === selectedTier)?.price} per card • {serviceTiers.find(t => t.id === selectedTier)?.turnaround}
                          </p>
                        </div>
                      </div>

                      {/* Cards Summary */}
                      <div>
                        <h4 className="font-medium text-neutral-900 mb-2">Cards ({cards.length})</h4>
                        <div className="space-y-2">
                          {cards.map((card, index) => (
                            <div key={card.id} className="bg-neutral-50 p-3 rounded-lg flex justify-between items-center">
                              <span className="font-medium">{card.name || `Card #${index + 1}`}</span>
                              <span className="text-sm text-neutral-600">{card.set}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Cost Summary */}
                      <div className="border-t pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-neutral-900">Total Cost</span>
                          <span className="text-2xl font-bold text-primary-500">€{calculateTotal()}</span>
                        </div>
                        <p className="text-sm text-neutral-600 mt-1">
                          {cards.length} cards × €{serviceTiers.find(t => t.id === selectedTier)?.price}
                        </p>
                      </div>

                      {/* Payment Section */}
                      <div className="border-t pt-6">
                        <h4 className="font-medium text-neutral-900 mb-4">Complete Your Payment</h4>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                          <p className="text-blue-800 font-medium mb-2">🎉 Almost there!</p>
                          <p className="text-blue-700 text-sm">
                            After successful payment, you'll receive an email with:
                          </p>
                          <ul className="list-disc list-inside text-blue-700 text-sm mt-2 space-y-1">
                            <li>Account creation instructions</li>
                            <li>Shipping labels and instructions</li>
                            <li>Order tracking information</li>
                          </ul>
                        </div>
                        
                        <PayPalButton
                          email={shippingInfo.pickupAddress.email}
                          items={preparePaymentData().items}
                          customerInfo={preparePaymentData().customerInfo}
                          onSuccess={handlePaymentSuccess}
                          onError={handlePaymentError}
                          onCancel={() => console.log('Payment cancelled by user')}
                        />
                        
                        <div className="mt-4 text-center">
                          <p className="text-xs text-gray-500">
                            Secure payment processed by PayPal. Your card information is never stored on our servers.
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-8">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              {currentStep < 4 ? (
                <Button
                  onClick={nextStep}
                  disabled={!canProceed()}
                >
                  Next
                </Button>
              ) : (
                <div className="text-right">
                  <p className="text-sm text-gray-600 mb-2">
                    Complete payment above to submit your order
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Security Section */}
      <section className="bg-neutral-50 py-12">
        <div className="container-custom">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-4">
              Your Cards Are in Safe Hands
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <ShieldCheckIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-2">Insured Shipping</h3>
              <p className="text-neutral-600">Full insurance coverage during transit</p>
            </div>
            <div className="text-center">
              <ClockIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-2">Real-time Tracking</h3>
              <p className="text-neutral-600">Monitor your cards every step of the way</p>
            </div>
            <div className="text-center">
              <TruckIcon className="h-12 w-12 text-primary-500 mx-auto mb-4" />
              <h3 className="font-semibold text-neutral-900 mb-2">Secure Facility</h3>
              <p className="text-neutral-600">Climate-controlled, monitored storage</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}


