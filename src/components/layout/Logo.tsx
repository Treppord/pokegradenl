import React from 'react';
import Image from 'next/image';

interface LogoProps {
  className?: string;
  variant?: 'png' | 'svg';
  alt?: string;
  priority?: boolean;
}

export function Logo({ 
  className = 'h-8 w-8', 
  variant = 'svg',
  alt = 'PokeGrade Nederland Logo',
  priority = false
}: LogoProps) {
  if (variant === 'png') {
    return (
      <div className={`${className} relative flex items-center justify-center`}>
        <Image
          src="/assets/img/logo.png"
          alt={alt}
          width={1056}
          height={156}
          className="object-contain w-full h-full"
          priority={priority}
        />
      </div>
    );
  }

  // SVG variant
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg
        viewBox="0 0 40 40"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
        role="img"
        aria-label={alt}
      >
        {/* Outer circle */}
        <circle
          cx="20"
          cy="20"
          r="18"
          fill="currentColor"
          className="text-primary-500"
        />
        
        {/* Inner white circle */}
        <circle
          cx="20"
          cy="20"
          r="14"
          fill="white"
        />
        
        {/* Magnifying glass lens */}
        <circle
          cx="18"
          cy="18"
          r="8"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          className="text-secondary-500"
        />
        
        {/* Magnifying glass handle */}
        <line
          x1="24"
          y1="24"
          x2="28"
          y2="28"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="text-secondary-500"
        />
        
        {/* Central dot for precision */}
        <circle
          cx="18"
          cy="18"
          r="2"
          fill="currentColor"
          className="text-primary-500"
        />
      </svg>
    </div>
  );
}
