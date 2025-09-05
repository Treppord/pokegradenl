'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { Logo } from './Logo';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Grading Services', href: '/services' },
  { name: 'Submit Cards', href: '/submit' },
  { name: 'Track Order', href: '/track' },
  { name: 'About Us', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo variant="png" className="h-8 w-auto" priority />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`font-medium transition-colors duration-200 ${
                isActive(item.href)
                  ? 'text-primary-500 border-b-2 border-primary-500 pb-1'
                  : 'text-neutral-600 hover:text-primary-500'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <button className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200">
            Login
          </button>
          <Link href="/submit" className="btn-primary">
            Submit Cards
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-neutral-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 z-50 ${
          mobileMenuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Logo variant="png" className="h-8 w-auto" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-neutral-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-neutral-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      isActive(item.href)
                        ? 'bg-primary-50 text-primary-500'
                        : 'text-neutral-900 hover:bg-neutral-50'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4">
                <button className="text-neutral-600 hover:text-primary-500 font-semibold transition-colors duration-200">
                  Login
                </button>
                <Link 
                  href="/submit" 
                  className="btn-primary w-full text-center block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Submit Cards
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
