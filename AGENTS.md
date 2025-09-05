# PokeGrade Nederland - AI Agent Instructions

This document provides essential information for AI agents working on this project.

## 🏗️ Project Structure

```
pokegradenl/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx         # Root layout with metadata
│   │   ├── page.tsx           # Home page
│   │   ├── services/          # Grading services page
│   │   ├── submit/            # Multi-step submission form
│   │   ├── track/             # Order tracking
│   │   ├── about/             # Company information
│   │   ├── contact/           # Contact form & FAQ
│   │   └── dashboard/         # User dashboard (placeholder)
│   ├── components/
│   │   ├── layout/            # Layout components (Navbar, Footer, Logo)
│   │   └── ui/                # Reusable UI components (Button, Card, Input)
│   ├── hooks/                 # Custom React hooks for API integration
│   ├── services/              # API service layer for Golang backend
│   ├── types/                 # TypeScript interfaces and types
│   ├── utils/                 # Utility functions
│   └── styles/               # Global CSS and Tailwind config
├── public/                   # Static assets
├── tailwind.config.js       # Tailwind CSS configuration
├── next.config.js          # Next.js configuration
├── package.json            # Dependencies and scripts
└── tsconfig.json          # TypeScript configuration
```

## 🚀 Development Commands

### Essential Commands
```bash
npm run dev      # Start development server (localhost:3000)
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint for code quality
```

### Type Checking
```bash
npx tsc --noEmit  # Type check without emitting files
```

## 🎨 Design System

### Brand Colors (Tailwind Classes)
- **Primary Red**: `bg-primary-500`, `text-primary-500` (#dc3545)
- **Secondary Blue**: `bg-secondary-500`, `text-secondary-500` (#3b82f6)
- **Success Green**: `bg-success`, `text-success` (#10b981)
- **Warning**: `bg-warning`, `text-warning` (#f59e0b)
- **Error**: `bg-error`, `text-error` (#ef4444)

### Component Classes
- **Container**: `container-custom` (max-width with responsive padding)
- **Button Primary**: `btn-primary`
- **Button Secondary**: `btn-secondary`
- **Button Outline**: `btn-outline`
- **Input Field**: `input-field`
- **Card**: `card`

### Typography
- **Headings**: Use `font-heading` class (Poppins font)
- **Body**: Default Inter font
- **Text Gradient**: `text-gradient` class for hero text

## 🔧 Component Usage Patterns

### Layout Structure
```tsx
import { Layout } from '@/components/layout/Layout';

export default function PageName() {
  return (
    <Layout>
      {/* Page content */}
    </Layout>
  );
}
```

### UI Components
```tsx
import { Button } from '@/components/ui/Button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Input, Textarea, Select } from '@/components/ui/Input';

// Button variants: 'primary' | 'secondary' | 'outline' | 'ghost'
// Button sizes: 'sm' | 'md' | 'lg'
<Button variant="primary" size="lg" loading={isLoading}>
  Submit Cards
</Button>

// Card structure
<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content here
  </CardContent>
</Card>
```

### API Hooks
```tsx
import { useAuth } from '@/hooks/useAuth';
import { useSubmissions } from '@/hooks/useSubmissions';

// Authentication
const { user, login, logout, loading } = useAuth();

// Submissions
const { submissions, createSubmission, loading } = useSubmissions();
```

## 📡 API Integration

### Service Layer Structure
- **authService**: User authentication and management
- **submissionService**: Card submissions and tracking
- **contactService**: Contact forms and content management

### API Response Format
```typescript
interface APIResponse<T> {
  data: T;
  message: string;
  success: boolean;
  timestamp: string;
}
```

### Environment Variables
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

## 🎯 Code Style Guidelines

### File Naming
- **Components**: PascalCase (e.g., `Navbar.tsx`, `Button.tsx`)
- **Pages**: lowercase (e.g., `page.tsx`, `layout.tsx`)
- **Hooks**: camelCase starting with 'use' (e.g., `useAuth.ts`)
- **Services**: camelCase ending with 'Service' (e.g., `authService.ts`)

### Import Order
1. React and Next.js imports
2. Third-party libraries
3. Internal components and utilities
4. Type imports

```tsx
import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import type { User } from '@/types';
```

### Component Structure
```tsx
'use client'; // Only for client components

import React from 'react';
import type { ComponentProps } from '@/types';

interface Props extends ComponentProps {
  // Component-specific props
}

export function ComponentName({ prop1, prop2 }: Props) {
  // Component logic

  return (
    <div className="component-classes">
      {/* Component JSX */}
    </div>
  );
}
```

## 🔍 Testing Patterns

### Mock Data Locations
- **Track Page**: Mock tracking data in component state
- **Dashboard**: Mock user and submission data
- **Services**: Service tiers defined in component

### Development Testing
```bash
# Test form submissions (currently shows success messages)
# Test navigation between all pages
# Test responsive design at different screen sizes
# Verify TypeScript compilation: npx tsc --noEmit
```

## 🚨 Common Gotchas

### Next.js App Router
- Use `'use client'` directive for client-side interactivity
- Metadata exports only work in server components
- Layout components wrap all child pages

### Tailwind CSS
- Use `container-custom` instead of default `container`
- Brand colors are in custom palette (primary-*, secondary-*)
- Mobile-first responsive classes (`sm:`, `md:`, `lg:`)

### TypeScript
- All API responses should use `APIResponse<T>` wrapper
- Import types with `type` keyword when possible
- Use proper component prop typing with interfaces

## 🎯 Feature Implementation Guidelines

### Adding New Pages
1. Create page component in `src/app/[route]/page.tsx`
2. Add metadata export for SEO
3. Use Layout wrapper component
4. Add navigation link in Navbar component
5. Update Footer links if needed

### Adding New Components
1. Create in appropriate directory (`ui/` for reusable, `layout/` for layout)
2. Export from index file if creating component library
3. Use consistent TypeScript interfaces
4. Follow existing styling patterns

### API Integration
1. Add service functions in appropriate service file
2. Create custom hook for data management
3. Add TypeScript interfaces in `types/index.ts`
4. Handle loading states and errors consistently

## 🔄 State Management

### Current Approach
- React useState and useEffect for component state
- Custom hooks for API state management
- LocalStorage for authentication tokens
- No global state management library (Redux, Zustand) currently used

### Authentication State
- Managed by useAuth hook
- JWT tokens stored in localStorage
- User data persisted across sessions
- Automatic token refresh handling

## 📱 Responsive Design

### Breakpoint Strategy
- Mobile-first CSS classes
- Key breakpoints: `sm:768px`, `md:1024px`, `lg:1280px`
- Test at: 375px (mobile), 768px (tablet), 1440px (desktop)

### Component Responsiveness
- Use grid classes: `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Responsive spacing: `py-8 lg:py-12`
- Responsive typography: `text-xl lg:text-2xl`

---

This document should be updated as the project evolves. Always check the latest version before making significant changes.
