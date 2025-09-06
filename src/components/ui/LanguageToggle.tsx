'use client';

import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { GlobeAltIcon } from '@heroicons/react/24/outline';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'nl' ? 'en' : 'nl');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-neutral-100 hover:bg-neutral-200 transition-colors duration-200 text-neutral-700 hover:text-neutral-900"
      aria-label={`Switch to ${language === 'nl' ? 'English' : 'Dutch'}`}
    >
      <GlobeAltIcon className="h-5 w-5" />
      <span className="text-sm font-medium">
        {language === 'nl' ? (
          <>
            <span className="text-primary-600 font-semibold">NL</span>
            <span className="text-neutral-400 mx-1">/</span>
            <span>EN</span>
          </>
        ) : (
          <>
            <span>NL</span>
            <span className="text-neutral-400 mx-1">/</span>
            <span className="text-primary-600 font-semibold">EN</span>
          </>
        )}
      </span>
    </button>
  );
}
