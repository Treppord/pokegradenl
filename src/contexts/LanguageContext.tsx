'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'nl' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Translation object
const translations = {
  // Navigation
  'nav.home': {
    nl: 'Home',
    en: 'Home'
  },
  'nav.services': {
    nl: 'Services',
    en: 'Services'
  },
  'nav.submit': {
    nl: 'Insturen',
    en: 'Submit'
  },
  'nav.track': {
    nl: 'Volgen',
    en: 'Track'
  },
  'nav.lookup': {
    nl: 'PG Lookup',
    en: 'PG Lookup'
  },
  'nav.about': {
    nl: 'Over Ons',
    en: 'About'
  },
  'nav.contact': {
    nl: 'Contact',
    en: 'Contact'
  },

  // Homepage Hero
  'hero.title': {
    nl: 'Pokémon Kaarten Grading Nederland',
    en: 'Pokemon Card Grading Netherlands'
  },
  'hero.subtitle': {
    nl: 'Professionele Pokémon Kaarten Authenticatie',
    en: 'Professional Pokemon Card Authentication'
  },
  'hero.description': {
    nl: 'Nederland\'s vertrouwde Pokémon kaarten grading service. Laat je Pokémon kaarten authentificeren en keuren door gecertificeerde experts met geavanceerde technologie.',
    en: 'Netherlands\' trusted Pokémon card grading service. Get your cards authenticated and graded by certified experts using advanced technology and rigorous standards.'
  },
  'hero.psa_alternative': {
    nl: 'PSA alternatief met snelle doorlooptijd en scherpe prijzen.',
    en: 'PSA alternative with fast turnaround and competitive prices.'
  },
  'hero.cost_from': {
    nl: 'Pokémon kaarten grading kosten vanaf €15 per kaart',
    en: 'Pokemon card grading cost from €15 per card'
  },
  'hero.fast_service': {
    nl: 'Snelle grading service - 5 tot 20 werkdagen',
    en: 'Fast grading service - 5 to 20 business days'
  },
  'hero.professional_auth': {
    nl: 'Professionele authenticatie voor alle TCG kaarten',
    en: 'Professional authentication for all TCG cards'
  },
  'hero.submit_cards': {
    nl: 'Pokémon Kaarten Insturen',
    en: 'Submit Your Cards'
  },
  'hero.view_pricing': {
    nl: 'Grading Prijzen',
    en: 'View Pricing'
  },

  // Features Section
  'features.title': {
    nl: 'Waarom Kiezen voor PokeGrade Nederland?',
    en: 'Why Choose PokeGrade Netherlands?'
  },
  'features.description': {
    nl: 'Wij combineren geavanceerde technologie met menselijke expertise voor de meest nauwkeurige en betrouwbare Pokémon kaarten grading service in Amsterdam, Rotterdam, Utrecht en heel Nederland.',
    en: 'We combine cutting-edge technology with human expertise to deliver the most accurate and trusted Pokemon card grading service in Amsterdam, Rotterdam, Utrecht and all of the Netherlands.'
  },
  'features.auth.title': {
    nl: 'Gecertificeerde Authenticatie',
    en: 'Certified Authentication'
  },
  'features.auth.desc': {
    nl: 'Geavanceerde scantechnologie gecombineerd met expert beoordelaars voor authentieke, nauwkeurige grading.',
    en: 'Advanced scanning technology combined with expert human graders ensure authentic, accurate grading.'
  },
  'features.turnaround.title': {
    nl: 'Snelle Doorlooptijd',
    en: 'Fast Turnaround'
  },
  'features.turnaround.desc': {
    nl: 'Meerdere service opties van 5-dag express tot 20-dag standaard.',
    en: 'Multiple service tiers available from 5-day express to 20-day standard, fitting your timeline.'
  },
  'features.pricing.title': {
    nl: 'Scherpe Prijzen',
    en: 'Competitive Pricing'
  },
  'features.pricing.desc': {
    nl: 'Transparante prijzen vanaf €15 per kaart zonder verborgen kosten.',
    en: 'Transparent pricing starting from €15 per card with no hidden fees or surprise charges.'
  },
  'features.reports.title': {
    nl: 'Uitgebreide Rapporten',
    en: 'Detailed Reports'
  },
  'features.reports.desc': {
    nl: 'Uitgebreide grading rapporten met hoge resolutie foto\'s en gedetailleerde conditie analyse.',
    en: 'Comprehensive grading reports with high-resolution images and detailed condition analysis.'
  },

  // Services Section
  'services.title': {
    nl: 'Pokémon Kaarten Grading Kosten & Service Levels',
    en: 'Pokemon Card Grading Costs & Service Levels'
  },
  'services.description': {
    nl: 'Van budget-vriendelijke tot premium express service, wij hebben opties voor elke verzamelaar en tijdslijn.',
    en: 'From budget-friendly to premium express service, we have options for every collector and timeline.'
  },
  'services.transparent_pricing': {
    nl: 'Transparante prijzen vanaf €15 per kaart.',
    en: 'Transparent pricing from €15 per card.'
  },
  'services.most_popular': {
    nl: 'Populairste Keuze',
    en: 'Most Popular'
  },
  'services.per_card': {
    nl: 'per kaart',
    en: 'per card'
  },
  'services.business_days': {
    nl: 'werkdagen',
    en: 'business days'
  },
  'services.max_value': {
    nl: 'Max kaart waarde',
    en: 'Max card value'
  },
  'services.view_detailed': {
    nl: 'Bekijk Gedetailleerde Prijzen',
    en: 'View Detailed Pricing'
  },

  // Testimonials
  'testimonials.title': {
    nl: 'Vertrouwd door Verzamelaars in Heel Nederland',
    en: 'Trusted by Collectors Across the Netherlands'
  },
  'testimonials.description': {
    nl: 'Sluit je aan bij duizenden tevreden klanten in Amsterdam, Rotterdam, Utrecht en heel Nederland die PokeGrade vertrouwen met hun meest waardevolle Pokémon kaarten.',
    en: 'Join thousands of satisfied customers in Amsterdam, Rotterdam, Utrecht and all of the Netherlands who trust PokeGrade with their most valuable Pokémon cards.'
  },

  // CTA Section
  'cta.title': {
    nl: 'Klaar om je Pokémon Collectie te Laten Graden?',
    en: 'Ready to Grade Your Pokemon Collection?'
  },
  'cta.description': {
    nl: 'Sluit je aan bij duizenden verzamelaars die PokeGrade Nederland vertrouwen voor professionele, nauwkeurige en betrouwbare Pokémon kaarten grading services.',
    en: 'Join thousands of collectors who trust PokeGrade Netherlands for professional, accurate and reliable Pokemon card grading services.'
  },
  'cta.submit_now': {
    nl: 'Stuur Kaarten Nu In',
    en: 'Submit Cards Now'
  },
  'cta.track_order': {
    nl: 'Volg je Bestelling',
    en: 'Track Your Order'
  },

  // Common
  'common.professional_grade': {
    nl: 'Professionele Grade',
    en: 'Professional Grade'
  },
  'common.grade': {
    nl: 'Grade',
    en: 'Grade'
  },
  'common.loading': {
    nl: 'Laden...',
    en: 'Loading...'
  },
  'common.submit': {
    nl: 'Versturen',
    en: 'Submit'
  },
  'common.cancel': {
    nl: 'Annuleren',
    en: 'Cancel'
  },
  'common.save': {
    nl: 'Opslaan',
    en: 'Save'
  },
  'common.email': {
    nl: 'E-mail',
    en: 'Email'
  },
  'common.phone': {
    nl: 'Telefoon',
    en: 'Phone'
  },
  'common.name': {
    nl: 'Naam',
    en: 'Name'
  },

  // Services Page
  'services.page_title': {
    nl: 'PSA Grading Nederland & Pokémon Kaarten Grading Kosten',
    en: 'PSA Grading Netherlands & Pokemon Card Grading Costs'
  },
  'services.hero_title': {
    nl: 'PSA Grading Nederland & Pokémon Kaarten Grading Services',
    en: 'PSA Grading Netherlands & Pokemon Card Grading Services'
  },
  'services.hero_desc': {
    nl: 'Professionele Pokémon kaarten grading kosten vanaf €15 per kaart. Kies uit onze uitgebreide grading tiers voor elke verzamelaar.',
    en: 'Professional Pokemon card grading costs from €15 per card. Choose from our comprehensive grading tiers for every collector.'
  },
  'services.alternative_quality': {
    nl: 'PSA alternatief met Beckett grading Nederland kwaliteit standaarden.',
    en: 'PSA alternative with Beckett grading Netherlands quality standards.'
  },
  'services.grading_standards': {
    nl: 'Onze Grading Standaarden',
    en: 'Our Grading Standards'
  },
  'services.grading_scale': {
    nl: '10-Punts Grading Schaal',
    en: '10-Point Grading Scale'
  },
  'services.subgrade_analysis': {
    nl: 'Subgrade Analyse',
    en: 'Subgrade Analysis'
  },
  'services.auth_process': {
    nl: 'Authenticatie Proces',
    en: 'Authentication Process'
  },
  'services.faq_title': {
    nl: 'Veelgestelde Vragen',
    en: 'Frequently Asked Questions'
  },
  'services.need_different': {
    nl: 'Iets Anders Nodig?',
    en: 'Need Something Different?'
  },
  'services.custom_service_desc': {
    nl: 'Heb je kaarten ter waarde van meer dan €10.000 of heb je een aangepaste service nodig? Neem contact met ons op voor gepersonaliseerde prijzen.',
    en: 'Have cards worth more than €10,000 or need a custom service? Contact us for personalized pricing and white-glove service options.'
  },
  'services.contact_custom': {
    nl: 'Contact voor Aangepaste Prijzen',
    en: 'Contact for Custom Pricing'
  },

  // Submit Page
  'submit.page_title': {
    nl: 'Pokémon Kaarten Insturen voor Grading',
    en: 'Submit Pokemon Cards for Grading'
  },
  'submit.hero_title': {
    nl: 'Stuur je Pokémon Kaarten In',
    en: 'Submit Your Pokemon Cards'
  },
  'submit.hero_desc': {
    nl: 'Begin het proces om je waardevolle Pokémon kaarten professioneel te laten graderen door onze gecertificeerde experts.',
    en: 'Start the process to have your valuable Pokemon cards professionally graded by our certified experts.'
  },
  'submit.step_1': {
    nl: 'Stap 1: Kaart Informatie',
    en: 'Step 1: Card Information'
  },
  'submit.step_2': {
    nl: 'Stap 2: Service Selectie',
    en: 'Step 2: Service Selection'
  },
  'submit.step_3': {
    nl: 'Stap 3: Verzending',
    en: 'Step 3: Shipping'
  },
  'submit.step_4': {
    nl: 'Stap 4: Bevestiging',
    en: 'Step 4: Confirmation'
  },

  // Track Page
  'track.page_title': {
    nl: 'Volg je Grading Bestelling',
    en: 'Track Your Grading Order'
  },
  'track.hero_title': {
    nl: 'Volg je Bestelling',
    en: 'Track Your Order'
  },
  'track.hero_desc': {
    nl: 'Voer je bestelling ID in om de status van je Pokémon kaarten grading te bekijken.',
    en: 'Enter your order ID to check the status of your Pokemon card grading submission.'
  },
  'track.order_id': {
    nl: 'Bestelling ID',
    en: 'Order ID'
  },
  'track.search': {
    nl: 'Zoeken',
    en: 'Search'
  },
  'track.status': {
    nl: 'Status',
    en: 'Status'
  },

  // About Page
  'about.page_title': {
    nl: 'Over PokeGrade Nederland',
    en: 'About PokeGrade Netherlands'
  },
  'about.hero_title': {
    nl: 'Over PokeGrade Nederland',
    en: 'About PokeGrade Netherlands'
  },
  'about.hero_desc': {
    nl: 'Ontdek het verhaal achter Nederland\'s vertrouwde Pokémon kaarten grading service en ons toegewijde team van experts.',
    en: 'Discover the story behind Netherlands\' trusted Pokemon card grading service and our dedicated team of experts.'
  },
  'about.our_story': {
    nl: 'Ons Verhaal',
    en: 'Our Story'
  },
  'about.our_mission': {
    nl: 'Onze Missie',
    en: 'Our Mission'
  },
  'about.our_team': {
    nl: 'Ons Team',
    en: 'Our Team'
  },

  // Contact Page
  'contact.page_title': {
    nl: 'Neem Contact Op',
    en: 'Contact Us'
  },
  'contact.hero_title': {
    nl: 'Neem Contact Op',
    en: 'Contact Us'
  },
  'contact.hero_desc': {
    nl: 'Heb je vragen over onze grading services? Neem contact met ons op en we helpen je graag verder.',
    en: 'Have questions about our grading services? Contact us and we\'ll be happy to help you.'
  },
  'contact.get_in_touch': {
    nl: 'Neem Contact Op',
    en: 'Get in Touch'
  },
  'contact.message': {
    nl: 'Bericht',
    en: 'Message'
  },
  'contact.send_message': {
    nl: 'Verstuur Bericht',
    en: 'Send Message'
  },
  'contact.our_office': {
    nl: 'Ons Kantoor',
    en: 'Our Office'
  },
  'contact.visit_us': {
    nl: 'Bezoek Ons',
    en: 'Visit Us'
  },

  // Form Labels
  'form.first_name': {
    nl: 'Voornaam',
    en: 'First Name'
  },
  'form.last_name': {
    nl: 'Achternaam',
    en: 'Last Name'
  },
  'form.card_name': {
    nl: 'Kaart Naam',
    en: 'Card Name'
  },
  'form.card_set': {
    nl: 'Set',
    en: 'Set'
  },
  'form.card_number': {
    nl: 'Kaart Nummer',
    en: 'Card Number'
  },
  'form.estimated_value': {
    nl: 'Geschatte Waarde',
    en: 'Estimated Value'
  },
  'form.service_tier': {
    nl: 'Service Niveau',
    en: 'Service Tier'
  },
  'form.address': {
    nl: 'Adres',
    en: 'Address'
  },
  'form.city': {
    nl: 'Stad',
    en: 'City'
  },
  'form.postal_code': {
    nl: 'Postcode',
    en: 'Postal Code'
  },
  'form.country': {
    nl: 'Land',
    en: 'Country'
  },

  // PG Lookup Page
  'lookup.page_title': {
    nl: 'PG ID Lookup - Pokémon Kaart Zoeken',
    en: 'PG ID Lookup - Pokemon Card Search'
  },
  'lookup.hero_title': {
    nl: 'Zoek je Pokémon Kaart',
    en: 'Find Your Pokemon Card'
  },
  'lookup.hero_desc': {
    nl: 'Voer je PokeGrade ID in om alle informatie van je gegraded kaart te bekijken.',
    en: 'Enter your PokeGrade ID to view all information about your graded card.'
  },
  'lookup.pg_id_label': {
    nl: 'PokeGrade ID',
    en: 'PokeGrade ID'
  },
  'lookup.pg_id_placeholder': {
    nl: 'Bijv. PG-20250906-001',
    en: 'e.g. PG-20250906-001'
  },
  'lookup.search_button': {
    nl: 'Kaart Opzoeken',
    en: 'Search Card'
  },
  'lookup.card_info': {
    nl: 'Kaart Informatie',
    en: 'Card Information'
  },
  'lookup.grade': {
    nl: 'Grade',
    en: 'Grade'
  },
  'lookup.date_graded': {
    nl: 'Datum Gegraded',
    en: 'Date Graded'
  },
  'lookup.card_name': {
    nl: 'Kaart Naam',
    en: 'Card Name'
  },
  'lookup.set_name': {
    nl: 'Set Naam',
    en: 'Set Name'
  },
  'lookup.year': {
    nl: 'Jaar',
    en: 'Year'
  },
  'lookup.language': {
    nl: 'Taal',
    en: 'Language'
  },
  'lookup.pokemon_number': {
    nl: 'Pokémon Nummer',
    en: 'Pokemon Number'
  },
  'lookup.subgrades': {
    nl: 'Subgrades',
    en: 'Subgrades'
  },
  'lookup.centering': {
    nl: 'Centrering',
    en: 'Centering'
  },
  'lookup.corners': {
    nl: 'Hoeken',
    en: 'Corners'
  },
  'lookup.edges': {
    nl: 'Randen',
    en: 'Edges'
  },
  'lookup.surface': {
    nl: 'Oppervlak',
    en: 'Surface'
  },
  'lookup.verified': {
    nl: 'Geverifieerd',
    en: 'Verified'
  },
  'lookup.not_found': {
    nl: 'Kaart niet gevonden',
    en: 'Card not found'
  },
  'lookup.not_found_desc': {
    nl: 'De ingevoerde PokeGrade ID kon niet worden gevonden. Controleer het ID en probeer opnieuw.',
    en: 'The entered PokeGrade ID could not be found. Please check the ID and try again.'
  },
  'lookup.error': {
    nl: 'Er is een fout opgetreden',
    en: 'An error occurred'
  },
  'lookup.error_desc': {
    nl: 'Er is een fout opgetreden bij het ophalen van de kaartinformatie. Probeer het later opnieuw.',
    en: 'An error occurred while retrieving the card information. Please try again later.'
  },
  'lookup.invalid_id': {
    nl: 'Ongeldig ID formaat',
    en: 'Invalid ID format'
  },
  'lookup.invalid_id_desc': {
    nl: 'Het PokeGrade ID moet het formaat PG-YYYYMMDD-XXX hebben.',
    en: 'The PokeGrade ID must have the format PG-YYYYMMDD-XXX.'
  },
  'lookup.try_again': {
    nl: 'Probeer Opnieuw',
    en: 'Try Again'
  },
  'lookup.qr_section': {
    nl: 'Of scan de QR code',
    en: 'Or scan the QR code'
  },
  'lookup.scan_qr': {
    nl: 'QR Code Scannen',
    en: 'Scan QR Code'
  }
};

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('nl'); // Default to Dutch

  // Load language preference from localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('pokegrade-language') as Language;
    if (savedLanguage && (savedLanguage === 'nl' || savedLanguage === 'en')) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Save language preference to localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('pokegrade-language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    const translation = translations[key as keyof typeof translations];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[language] || key;
  };

  return (
    <LanguageContext.Provider 
      value={{ 
        language, 
        setLanguage: handleSetLanguage, 
        t 
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
