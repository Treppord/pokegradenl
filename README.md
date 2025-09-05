# PokeGrade Nederland - Frontend

A professional, modern web application for PokeGrade Nederland, a Pokémon card grading service based in the Netherlands.

## 🚀 Features

- **Modern Stack**: Built with Next.js 14, React 18, TypeScript, and Tailwind CSS
- **Responsive Design**: Mobile-first approach with desktop enhancements
- **SEO Optimized**: Complete meta tags, OpenGraph, and structured data
- **Component Architecture**: Reusable, atomic components with consistent design
- **API Ready**: Complete service layer and hooks for Golang backend integration
- **Authentication Ready**: Placeholder auth system with user management
- **Real-time Tracking**: Order tracking with progress visualization
- **Multi-step Forms**: Complex submission workflow with validation

## 🏗️ Architecture

### Pages Structure
- **Home** (`/`) - Hero section, services overview, testimonials
- **Grading Services** (`/services`) - Detailed pricing and grading standards
- **Submit Cards** (`/submit`) - Multi-step submission form
- **Track Order** (`/track`) - Real-time order tracking
- **About Us** (`/about`) - Company story and team information
- **Contact & FAQ** (`/contact`) - Contact form and frequently asked questions
- **Dashboard** (`/dashboard`) - User account management (placeholder)

### Component Library
- **Layout Components**: Navbar, Footer, Layout wrapper
- **UI Components**: Button, Card, Input, Textarea, Select
- **Icons**: Heroicons integration for consistent iconography

### API Integration
- **Services Layer**: RESTful API client with authentication
- **Custom Hooks**: React hooks for data fetching and state management
- **Type Safety**: Complete TypeScript interfaces for all data structures

## 🎨 Design System

### Colors
- **Primary**: Professional red tones (#dc3545)
- **Secondary**: Complementary blue tones (#3b82f6)
- **Neutrals**: Gray scale for backgrounds and text
- **Semantic**: Success, warning, and error states

### Typography
- **Headings**: Poppins font family for impact
- **Body**: Inter font family for readability
- **Responsive**: Fluid typography scales with screen size

### Components
- **Cards**: Consistent shadow and border radius
- **Buttons**: Multiple variants (primary, secondary, outline, ghost)
- **Forms**: Standardized inputs with validation states
- **Icons**: Heroicons for consistent visual language

## 🛠️ Development

### Prerequisites
- Node.js 18.0 or higher
- npm, yarn, or pnpm

### Installation
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables
Create a `.env.local` file with:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8080/api/v1
```

### Development Commands
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 🔧 Backend Integration

### API Endpoints
The frontend is designed to integrate with a Golang backend via REST API:

```
GET    /api/v1/services/tiers           # Get service tiers and pricing
POST   /api/v1/submissions              # Create new submission
GET    /api/v1/submissions/:id          # Get submission details
GET    /api/v1/submissions/:id/track    # Track submission progress
POST   /api/v1/auth/login               # User authentication
POST   /api/v1/auth/register            # User registration
POST   /api/v1/contact/message          # Contact form submission
GET    /api/v1/content/faq              # Get FAQ items
```

### Service Layer
- **authService**: Authentication and user management
- **submissionService**: Card submission and tracking
- **contactService**: Contact forms and content

### Custom Hooks
- **useAuth**: Authentication state and methods
- **useSubmissions**: Submission management
- **useServiceTiers**: Service pricing data
- **useTrackSubmission**: Order tracking

### Data Types
Complete TypeScript interfaces for:
- User management and authentication
- Card and submission data structures
- API response formats
- Form validation schemas

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: 1024px+

### Mobile-First Approach
All components are designed mobile-first with progressive enhancement for larger screens.

## 🔐 Security

### Authentication
- JWT token-based authentication
- Secure token storage in localStorage
- Automatic token refresh handling
- Protected routes and API endpoints

### Form Security
- Client-side validation with server-side verification
- Input sanitization and validation
- CSRF protection ready
- Rate limiting integration points

## 🚀 Deployment

### Production Build
```bash
npm run build
```

### Environment Configuration
Set production environment variables:
- `NEXT_PUBLIC_API_URL`: Backend API URL
- `NEXTAUTH_SECRET`: NextJS authentication secret
- `NEXTAUTH_URL`: Application URL

### Static File Serving
Static assets should be served from `/public` directory including:
- Favicon and app icons
- OpenGraph images
- Logo and brand assets

## 🧪 Testing

### Component Testing
```bash
# Add your preferred testing framework
npm install --save-dev @testing-library/react jest
```

### API Testing
Mock data is provided for development and testing:
- Mock tracking data in `/track` page
- Sample submissions in dashboard
- Test form submissions

## 📋 TODO

- [ ] Implement actual authentication with NextAuth.js
- [ ] Add comprehensive form validation
- [ ] Implement real-time notifications
- [ ] Add image upload capabilities
- [ ] Create admin dashboard
- [ ] Add internationalization (Dutch/English)
- [ ] Implement comprehensive testing suite
- [ ] Add performance monitoring
- [ ] Create Storybook component documentation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is proprietary software for PokeGrade Nederland.

## 📞 Support

For development questions or support:
- Email: dev@pokegrade.nl
- Documentation: Check inline code comments
- Issues: Use the GitHub issue tracker

---

Built with ❤️ for the Pokémon collecting community in the Netherlands.
