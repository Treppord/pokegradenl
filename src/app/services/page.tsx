import type { Metadata } from 'next';
import ServicesClient from './ServicesClient';

export const metadata: Metadata = {
  title: 'PSA Grading Nederland & Pokémon Kaarten Grading Kosten | PokeGrade Services',
  description: 'Professional Pokémon kaarten grading service Nederland. PSA grading alternative met snelle doorlooptijd. Grading kosten vanaf €15. Beckett grading Nederland. Pokemon card grading cost Netherlands explained.',
  keywords: [
    // Dutch keywords
    'PSA grading Nederland',
    'Beckett grading Nederland', 
    'Pokémon kaarten grading kosten',
    'Pokémon kaarten grading prijzen',
    'TCG grading service Nederland',
    'Pokemon kaarten authenticatie kosten',
    'Pokémon grading Amsterdam',
    'Pokemon grading Rotterdam',
    'Pokemon grading Utrecht',
    // English keywords  
    'PSA grading Netherlands',
    'Beckett grading Netherlands',
    'Pokemon card grading cost Netherlands',
    'Pokemon card grading prices NL',
    'Pokemon card authentication Netherlands',
    'professional card grading Netherlands',
    'Pokemon grading service Amsterdam',
    'TCG grading Netherlands pricing',
  ],
  openGraph: {
    title: 'PSA Grading Nederland & Pokemon Card Grading Cost Netherlands',
    description: 'Professional Pokémon card grading services with transparent pricing. PSA alternative with fast turnaround times from €15 per card.',
    url: '/services',
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
