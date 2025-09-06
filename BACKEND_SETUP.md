# Backend Authentication Setup Guide

This document provides step-by-step instructions for setting up the secure backend authentication system with Supabase and Google OAuth.

## 🔧 Prerequisites

1. **Supabase Project**: Create a new project at [supabase.com](https://supabase.com)
2. **Google OAuth App**: Set up OAuth 2.0 credentials in [Google Cloud Console](https://console.cloud.google.com)

## 🗄️ Database Setup

### 1. Run the Database Schema

1. Go to your Supabase dashboard → SQL Editor
2. Copy and run the SQL from `src/lib/database/schema.sql`
3. This will create:
   - `profiles` table for extended user data
   - `addresses` table for shipping/billing addresses
   - `submissions` table for card grading submissions
   - `cards` table for individual cards
   - `submission_cards` junction table
   - `tracking_events` table for order tracking
   - All necessary indexes and RLS policies

### 2. Enable Authentication Providers

1. Go to Authentication → Providers in Supabase dashboard
2. Enable Google OAuth:
   - Add your Google Client ID
   - Add your Google Client Secret
   - Set redirect URL: `https://your-project.supabase.co/auth/v1/callback`

## 🔑 Environment Configuration

### 1. Copy Environment Variables

```bash
cp .env.local .env.local.example  # Backup the template
```

### 2. Fill in Your Credentials

Update `.env.local` with your actual values:

```env
# Supabase Configuration (from your project settings)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Generate secure secrets (use: openssl rand -base64 32)
JWT_SECRET=your-32-character-secret-key-here
JWT_REFRESH_SECRET=your-32-character-refresh-secret-here

# Google OAuth (from Google Cloud Console)
GOOGLE_CLIENT_ID=123456789-abcdefghijk.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=GOCSPX-abcdefghijklmnop

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000  # Change for production
```

## 🌐 Google OAuth Setup

### 1. Create Google OAuth Application

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project or select existing
3. Enable the Google+ API
4. Go to Credentials → Create Credentials → OAuth 2.0 Client IDs
5. Choose "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/auth/callback` (development)
   - `https://your-domain.com/auth/callback` (production)
   - `https://your-project.supabase.co/auth/v1/callback` (Supabase)

### 2. Configure OAuth Consent Screen

1. Go to OAuth consent screen
2. Fill in required information
3. Add your domain to authorized domains
4. Add scopes: `email`, `profile`, `openid`

## 🔒 Security Features Implemented

### Row Level Security (RLS)
- Users can only access their own data
- Automatic user ID validation on all operations
- Secure profile and submission access

### Password Security
- Minimum 8 characters required
- Must include uppercase, lowercase, number, and special character
- Passwords are hashed using Supabase Auth (bcrypt)

### JWT Token Management
- Secure token storage and refresh
- Automatic session management
- Server-side token validation

### SQL Injection Protection
- All queries use parameterized statements
- Input sanitization on all user inputs
- Type-safe database operations

## 📡 API Endpoints

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/auth/google` - Initiate Google OAuth
- `GET /auth/callback` - OAuth callback handler

### Security Headers
All API responses include security headers:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

## 🧪 Testing the Setup

### 1. Start Development Server
```bash
npm run dev
```

### 2. Test Registration
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "SecurePass123!",
    "confirmPassword": "SecurePass123!"
  }'
```

### 3. Test Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass123!"
  }'
```

### 4. Test Google OAuth
Visit `http://localhost:3000` and click the "Sign in with Google" button.

## 🚀 Production Deployment

### 1. Environment Variables
Update all URLs to production domains:
- `NEXT_PUBLIC_SITE_URL`
- `NEXTAUTH_URL`
- Google OAuth redirect URIs

### 2. Security Checklist
- [ ] All secrets are properly secured
- [ ] HTTPS is enabled
- [ ] CORS is properly configured
- [ ] Rate limiting is implemented
- [ ] Database backups are configured

### 3. Supabase Production Settings
- [ ] Email templates are customized
- [ ] Email authentication is configured
- [ ] Rate limiting is enabled
- [ ] Database backups are scheduled

## 🔧 Troubleshooting

### Common Issues

**1. Google OAuth Redirect Mismatch**
- Verify redirect URIs match exactly in Google Console
- Check NEXTAUTH_URL environment variable

**2. Supabase Connection Issues**
- Verify project URL and API keys
- Check if RLS policies are correctly set up

**3. Database Schema Issues**
- Run the schema.sql file in correct order
- Verify all tables and policies are created

**4. Environment Variable Issues**
- Restart development server after changing .env.local
- Verify all required variables are set

### Debug Commands
```bash
# Check database connection
npm run db:test

# Verify environment variables
npm run env:check

# Test API endpoints
npm run test:auth
```

## 📚 Additional Resources

- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

## 🛡️ Security Best Practices

1. **Never commit secrets to version control**
2. **Use environment variables for all configuration**
3. **Implement proper error handling without exposing internals**
4. **Regularly update dependencies**
5. **Monitor authentication logs**
6. **Implement rate limiting in production**
7. **Use HTTPS in production**
8. **Validate all inputs on both client and server**

---

Your secure authentication backend is now ready! The system provides:
- ✅ User registration and login
- ✅ Google OAuth integration
- ✅ Secure password handling
- ✅ JWT token management
- ✅ Database security with RLS
- ✅ Input validation and sanitization
- ✅ Production-ready architecture
