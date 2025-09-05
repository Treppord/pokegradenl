import React from 'react';
import { clsx } from 'clsx';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
  hover?: boolean;
}

export function Card({ 
  children, 
  className, 
  padding = 'md', 
  hover = true 
}: CardProps) {
  const baseClasses = 'bg-white dark:bg-neutral-800 rounded-xl shadow-card transition-shadow duration-300';
  const hoverClasses = hover ? 'hover:shadow-card-hover' : '';
  
  const paddingClasses = {
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div className={clsx(baseClasses, hoverClasses, paddingClasses[padding], className)}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={clsx('mb-4', className)}>
      {children}
    </div>
  );
}

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function CardTitle({ children, className }: CardTitleProps) {
  return (
    <h3 className={clsx('text-xl font-semibold text-neutral-900 dark:text-white', className)}>
      {children}
    </h3>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={clsx('text-neutral-600 dark:text-neutral-300', className)}>
      {children}
    </div>
  );
}

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function CardFooter({ children, className }: CardFooterProps) {
  return (
    <div className={clsx('mt-6 pt-4 border-t border-neutral-100 dark:border-neutral-700', className)}>
      {children}
    </div>
  );
}
