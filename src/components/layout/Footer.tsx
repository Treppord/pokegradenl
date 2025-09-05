import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';

const footerLinks = {
  services: [
    { name: 'Card Grading', href: '/services' },
    { name: 'Submit Cards', href: '/submit' },
    { name: 'Track Order', href: '/track' },
    { name: 'Pricing', href: '/services#pricing' },
  ],
  company: [
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/contact#faq' },
    { name: 'Terms & Conditions', href: '/terms' },
  ],
  support: [
    { name: 'Help Center', href: '/contact' },
    { name: 'Shipping Info', href: '/submit#shipping' },
    { name: 'Grading Standards', href: '/services#standards' },
    { name: 'Privacy Policy', href: '/privacy' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-neutral-900 dark:bg-dark-bg text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Logo variant="png" className="h-8 w-auto" />
            </div>
            <p className="text-neutral-400 mb-6 text-sm leading-relaxed">
              Professional Pokémon card grading service in the Netherlands. 
              Precision grading, passionately delivered.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors duration-200"
                aria-label="Facebook"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987c6.62 0 11.987-5.367 11.987-11.987C24.014 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.73-3.016-1.788L3.938 18.41l.002-.002l1.498-3.196C4.747 14.18 4.389 13.12 4.389 11.987c0-4.213 3.414-7.627 7.628-7.627s7.628 3.414 7.628 7.627c0 4.212-3.414 7.626-7.628 7.626l-3.568.375z"/>
                </svg>
              </a>
              <a 
                href="#" 
                className="text-neutral-400 hover:text-white transition-colors duration-200"
                aria-label="Twitter"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-neutral-400 text-sm">
              © 2024 PokeGrade Nederland. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link 
                href="/privacy" 
                className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Privacy Policy
              </Link>
              <Link 
                href="/terms" 
                className="text-neutral-400 hover:text-white transition-colors duration-200 text-sm"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
