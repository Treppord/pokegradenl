import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your PokeGrade submissions, track orders, view certificates, and update your account settings from your personal dashboard.',
  keywords: ['user dashboard', 'submission management', 'track orders', 'account settings', 'grading certificates'],
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
