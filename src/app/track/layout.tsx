import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Track Your Submission',
  description: 'Track the progress of your Pokémon card grading submission. Get real-time updates on authentication, grading, and shipping status.',
  keywords: ['track pokemon cards', 'grading progress', 'submission tracking', 'order status', 'pokemon card tracking'],
};

export default function TrackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
