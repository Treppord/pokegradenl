# Logo Setup Guide

This guide will help you add your actual logo files to the PokeGrade website.

## File Locations

### PNG Logo (Main Logo)
- **Location**: `/public/assets/img/logo.png`
- **Used for**: Main logo throughout the website
- **Recommended specs**:
  - Format: PNG with transparent background
  - Dimensions: 512x512px or 1024x1024px (square aspect ratio)
  - File size: Under 100KB for optimal loading
  - High resolution for crisp display on all devices

### SVG Logo (Vector Logo)
- **Location**: `/public/svg/logo.svg`
- **Used for**: Scalable vector version, fallback, and when SVG is specifically needed
- **Recommended specs**:
  - Format: SVG (scalable vector graphics)
  - Clean, optimized code
  - Embedded colors or currentColor for theming
  - Square viewBox (e.g., viewBox="0 0 100 100")

## How to Add Your Logo

### Step 1: Prepare Your Logo Files
1. **PNG Version**: Create a high-resolution PNG (512x512px or larger) with transparent background
2. **SVG Version**: Create or convert your logo to SVG format

### Step 2: Replace Placeholder Files
1. Copy your PNG logo to: `/public/assets/img/logo.png` (NOT in src/assets/)
2. Copy your SVG logo to: `/public/svg/logo.svg`
3. Remove the placeholder file: `/public/assets/img/logo-placeholder.txt`

**Important**: Files must be in the `public` directory, not `src/assets`, because Next.js only serves static files from the public folder.

### Step 3: Test Your Logo
```bash
# Start development server
npm run dev

# Visit http://localhost:3000 to see your logo
```

## Logo Usage in Code

The Logo component supports both PNG and SVG variants:

```tsx
// Use PNG version (default for main website)
<Logo variant="png" className="h-8 w-8" />

// Use SVG version (for cases requiring vector graphics)
<Logo variant="svg" className="h-8 w-8" />

// Custom sizing
<Logo variant="png" className="h-16 w-16" />
```

## Current Logo Usage

The website currently uses:
- **PNG logo** in navbar and footer
- **SVG logo** as fallback and in special cases
- Responsive sizing that works on all device sizes

## Troubleshooting

### Logo Not Appearing
1. Check file path is exactly: `/public/assets/img/logo.png`
2. Ensure file permissions allow reading
3. Restart development server after adding files
4. Check browser console for image loading errors

### Logo Size Issues
1. Ensure PNG is high resolution (512x512px minimum)
2. Use square aspect ratio for best results
3. Adjust className prop for different sizes

### Performance Issues
1. Optimize PNG file size (use tools like TinyPNG)
2. Ensure SVG is clean and optimized
3. Consider WebP format for even better performance

## Next.js Image Optimization

The PNG logo uses Next.js Image component which automatically:
- Optimizes file size and format
- Provides responsive loading
- Handles different screen densities
- Lazy loads when appropriate

Your logo files will be automatically optimized for web delivery.
