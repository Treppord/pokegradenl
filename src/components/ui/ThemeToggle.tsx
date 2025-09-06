'use client';

import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '@/hooks/useTheme';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex h-6 w-11 items-center rounded-full bg-neutral-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:bg-neutral-600"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label="Toggle dark mode"
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-1'
        }`}
      >
        <span className="absolute inset-0 flex h-full w-full items-center justify-center transition-opacity duration-200">
          {theme === 'dark' ? (
            <MoonIcon className="h-3 w-3 text-neutral-600" aria-hidden="true" />
          ) : (
            <SunIcon className="h-3 w-3 text-yellow-500" aria-hidden="true" />
          )}
        </span>
      </span>
    </button>
  );
}
