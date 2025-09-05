'use client';

import React from 'react';
import { Layout } from '@/components/layout/Layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  UserIcon,
  DocumentTextIcon,
  ClockIcon,
  TrophyIcon,
  CogIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Mock user data - in production this would come from authentication context
const mockUser = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  memberSince: '2024-01-15',
  totalSubmissions: 12,
  activeSubmissions: 2,
  completedSubmissions: 10
};

const recentSubmissions = [
  {
    id: 'PG-2024-001234',
    status: 'processing',
    cardCount: 3,
    submittedAt: '2024-01-20',
    estimatedCompletion: '2024-02-05'
  },
  {
    id: 'PG-2024-001198',
    status: 'completed',
    cardCount: 5,
    submittedAt: '2024-01-10',
    completedAt: '2024-01-25'
  },
  {
    id: 'PG-2024-001156',
    status: 'shipped',
    cardCount: 2,
    submittedAt: '2024-01-05',
    shippedAt: '2024-01-22'
  }
];

const quickActions = [
  {
    title: 'Submit New Cards',
    description: 'Start a new grading submission',
    icon: PlusIcon,
    href: '/submit',
    color: 'bg-primary-500'
  },
  {
    title: 'Track Submission',
    description: 'Check the status of your orders',
    icon: ClockIcon,
    href: '/track',
    color: 'bg-secondary-500'
  },
  {
    title: 'View Certificates',
    description: 'Download grading certificates',
    icon: TrophyIcon,
    href: '#',
    color: 'bg-success'
  },
  {
    title: 'Account Settings',
    description: 'Manage your profile and preferences',
    icon: CogIcon,
    href: '#',
    color: 'bg-neutral-600'
  }
];

export default function DashboardPage() {
  return (
    <Layout>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl lg:text-3xl font-heading font-bold text-neutral-900 mb-2">
                Welcome back, {mockUser.name}
              </h1>
              <p className="text-neutral-600">
                Member since {new Date(mockUser.memberSince).toLocaleDateString()}
              </p>
            </div>
            <Link href="/submit">
              <Button>
                <PlusIcon className="h-5 w-5 mr-2" />
                Submit Cards
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <div className="container-custom py-12">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-primary-500 mb-2">
                {mockUser.totalSubmissions}
              </div>
              <p className="text-neutral-600">Total Submissions</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-warning mb-2">
                {mockUser.activeSubmissions}
              </div>
              <p className="text-neutral-600">In Progress</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="text-center py-6">
              <div className="text-3xl font-bold text-success mb-2">
                {mockUser.completedSubmissions}
              </div>
              <p className="text-neutral-600">Completed</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-neutral-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action) => (
              <Link key={action.title} href={action.href}>
                <Card className="h-full hover:shadow-card-hover transition-all duration-300 cursor-pointer group">
                  <CardContent className="text-center py-8">
                    <div className={`w-12 h-12 ${action.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-neutral-900 mb-2">
                      {action.title}
                    </h3>
                    <p className="text-sm text-neutral-600">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Submissions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <DocumentTextIcon className="h-6 w-6 mr-2" />
                Recent Submissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSubmissions.map((submission) => (
                  <div key={submission.id} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                    <div>
                      <h4 className="font-medium text-neutral-900">
                        {submission.id}
                      </h4>
                      <p className="text-sm text-neutral-600">
                        {submission.cardCount} cards • Submitted {new Date(submission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                        submission.status === 'completed' ? 'bg-success text-white' :
                        submission.status === 'processing' ? 'bg-warning text-white' :
                        submission.status === 'shipped' ? 'bg-secondary-500 text-white' :
                        'bg-neutral-500 text-white'
                      }`}>
                        {submission.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <Link href="/track">
                  <Button variant="outline" className="w-full">
                    View All Submissions
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Account Overview */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <UserIcon className="h-6 w-6 mr-2" />
                Account Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-neutral-600">Email</span>
                  <span className="font-medium">{mockUser.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Member Since</span>
                  <span className="font-medium">
                    {new Date(mockUser.memberSince).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Account Status</span>
                  <span className="font-medium text-success">Active</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-600">Preferred Service</span>
                  <span className="font-medium">Standard</span>
                </div>
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-100">
                <Button variant="outline" className="w-full">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Placeholder Notice */}
        <div className="mt-12">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="text-center py-8">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CogIcon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-blue-900 mb-2">
                Dashboard Under Development
              </h3>
              <p className="text-blue-700 max-w-2xl mx-auto">
                This dashboard is currently in development. Some features may not be fully functional yet. 
                We're working hard to provide you with a complete user experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}


