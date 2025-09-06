"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Logo } from "./Logo";
import { LoginModal } from "@/components/ui/LoginModal";
import { useAuth } from "@/hooks/useAuth";
import { LanguageToggle } from "@/components/ui/LanguageToggle";
import { useLanguage } from "@/contexts/LanguageContext";

// Navigation will be dynamically generated with translations

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useLanguage();

  // Dynamic navigation with translations
  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.services'), href: "/services" },
    { name: t('nav.submit'), href: "/submit" },
    { name: t('nav.track'), href: "/track" },
    { name: t('nav.lookup'), href: "/lookup" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = async () => {
    await logout();
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container-custom flex items-center justify-between py-4">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Logo variant="png" className="h-16 w-auto" priority />
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
                  ? "text-primary-500 border-b-2 border-primary-500 pb-1"
                  : "text-neutral-600 hover:text-primary-500"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center space-x-4">
          <LanguageToggle />
          {isAuthenticated ? (
            <>
              <span className="text-sm text-gray-600">
                Welcome, {user?.firstName || user?.email}
              </span>
              <Link href="/dashboard" className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200">
                Dashboard
              </Link>
              <button 
                onClick={handleLogout}
                className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <button 
              onClick={() => setLoginModalOpen(true)}
              className="text-neutral-600 hover:text-primary-500 font-medium transition-colors duration-200"
            >
              Login
            </button>
          )}
          <Link href="/submit" className="btn-primary">
            {isAuthenticated ? "Submit Cards" : "Get Started"}
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
          mobileMenuOpen ? "block" : "hidden"
        }`}
      >
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-neutral-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <Logo variant="png" className="h-16 w-auto" />
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
                        ? "bg-primary-50 text-primary-500"
                        : "text-neutral-900 hover:bg-neutral-50"
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6 space-y-4">
                <div className="px-3 pb-4">
                  <LanguageToggle />
                </div>
                {isAuthenticated ? (
                  <>
                    <div className="text-sm text-gray-600 px-3">
                      Welcome, {user?.firstName || user?.email}
                    </div>
                    <Link
                      href="/dashboard"
                      className="text-neutral-600 hover:text-primary-500 font-semibold transition-colors duration-200 block px-3 py-2"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="text-neutral-600 hover:text-primary-500 font-semibold transition-colors duration-200 block px-3 py-2 w-full text-left"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => {
                      setLoginModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="text-neutral-600 hover:text-primary-500 font-semibold transition-colors duration-200 block px-3 py-2"
                  >
                    Login
                  </button>
                )}
                <Link
                  href="/submit"
                  className="btn-primary w-full text-center block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {isAuthenticated ? "Submit Cards" : "Get Started"}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal 
        isOpen={loginModalOpen} 
        onClose={() => setLoginModalOpen(false)} 
        onSuccess={() => setLoginModalOpen(false)}
      />
    </header>
  );
}
