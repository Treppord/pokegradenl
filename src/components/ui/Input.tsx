import React, { forwardRef } from 'react';
import { clsx } from 'clsx';

interface InputProps {
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  error?: string;
  helperText?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  placeholder,
  type = 'text',
  error,
  helperText,
  className,
  required = false,
  disabled = false,
  value,
  onChange,
}, ref) => {
  const inputClasses = clsx(
    'input-field',
    {
      'border-error focus:ring-error': error,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-primary-500 dark:text-dark-gradient-start ml-1">*</span>}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        placeholder={placeholder}
        className={inputClasses}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
      />
      {error && (
        <p className="mt-2 text-sm text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

interface TextareaProps {
  label?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(({
  label,
  placeholder,
  error,
  helperText,
  className,
  required = false,
  disabled = false,
  rows = 4,
  value,
  onChange,
}, ref) => {
  const textareaClasses = clsx(
    'input-field resize-vertical',
    {
      'border-error focus:ring-error': error,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-primary-500 dark:text-dark-gradient-start ml-1">*</span>}
        </label>
      )}
      <textarea
        ref={ref}
        placeholder={placeholder}
        className={textareaClasses}
        required={required}
        disabled={disabled}
        rows={rows}
        value={value}
        onChange={onChange}
      />
      {error && (
        <p className="mt-2 text-sm text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
});

Textarea.displayName = 'Textarea';

interface SelectProps {
  label?: string;
  options: { value: string; label: string }[];
  error?: string;
  helperText?: string;
  className?: string;
  required?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  placeholder?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  label,
  options,
  error,
  helperText,
  className,
  required = false,
  disabled = false,
  value,
  onChange,
  placeholder,
}, ref) => {
  const selectClasses = clsx(
    'input-field appearance-none',
    {
      'border-error focus:ring-error': error,
      'opacity-50 cursor-not-allowed': disabled,
    },
    className
  );

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">
          {label}
          {required && <span className="text-primary-500 dark:text-dark-gradient-start ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          ref={ref}
          className={selectClasses}
          required={required}
          disabled={disabled}
          value={value}
          onChange={onChange}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-neutral-700 dark:text-neutral-300">
          <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
          </svg>
        </div>
      </div>
      {error && (
        <p className="mt-2 text-sm text-error">{error}</p>
      )}
      {helperText && !error && (
        <p className="mt-2 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
});

Select.displayName = 'Select';
