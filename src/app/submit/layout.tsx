import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit Cards for Grading',
  description: 'Submit your Pokémon cards for professional grading. Choose from Value, Standard, or Premium service levels with competitive pricing and fast turnaround times.',
  keywords: ['pokemon card submission', 'card grading form', 'pokemon grading service', 'submit cards', 'pokemon authentication'],
};

export default function SubmitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
