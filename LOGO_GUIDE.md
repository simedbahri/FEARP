# FEARP Logo Guide

This document describes all available logo variations for the FEARP website.

## 📁 Available Logo Files

### Main Logos (Full Brand)
- **`logo.svg`** - Full logo for light mode (default)
- **`logo-dark.svg`** - Full logo for dark mode
- **Location**: `/public/assets/`

### Simple/Minimalist Logos
- **`logo-simple.svg`** - Clean, minimalist version (light mode)
- **`logo-simple-dark.svg`** - Clean, minimalist version (dark mode)
- **Location**: `/public/assets/`
- **Use Case**: When you need a cleaner, less decorative look

### Icon-Only Logos (Mobile)
- **`logo-icon.svg`** - Icon-only version for mobile (light mode)
- **`logo-icon-dark.svg`** - Icon-only version for mobile (dark mode)
- **Location**: `/public/assets/`
- **Use Case**: Mobile navigation, favicon, social media profiles

### Modern/Decorative Logos
- **`logo-modern.svg`** - Modern version with rounded corners and gradients (light mode)
- **`logo-modern-dark.svg`** - Modern version with rounded corners and gradients (dark mode)
- **Location**: `/public/assets/`
- **Use Case**: When you want a more contemporary, stylish look

### Favicon
- **`favicon.svg`** - Browser tab icon (32x32)
- **Location**: `/public/favicon.svg` and `/public/assets/favicon.svg`
- **Use Case**: Browser tabs, bookmarks

## 🎨 Design Elements

### Colors
- **Primary Pink**: `#F9A8D4` (brand-dark-pink)
- **Light Pink**: `#FCE7F3` (brand-pink)
- **Gold Accent**: `#FBBF24` (brand-gold)
- **Text Color (Light)**: `#4B5563` (brand-text)
- **Text Color (Dark)**: `#F3F4F6` (light gray)

### Typography
- **Font**: Lora (serif)
- **Weight**: 700 (bold)
- **Letter Spacing**: 0.5-1.5px

### Icon Elements
- **F Letter**: Stylized "F" representing FEARP
- **Sparkle/Star**: Gold accent symbolizing inspiration
- **Gradients**: Smooth color transitions for modern look
- **Decorative Elements**: Dots, lines, and shapes for visual interest

## 📱 Responsive Usage

The Header component automatically switches between:
- **Desktop**: Full logo (`logo.svg` or `logo-dark.svg`)
- **Mobile**: Icon-only (`logo-icon.svg` or `logo-icon-dark.svg`)

This is handled via CSS classes:
```tsx
<img src={logoSrc} alt="Fearp Logo" className="h-10 hidden md:block" />
<img src={iconSrc} alt="Fearp Logo" className="h-10 block md:hidden" />
```

## 🔄 Dark Mode Support

All logos have dark mode versions that automatically switch based on the theme:
- Light mode logos use darker text colors
- Dark mode logos use lighter text colors with enhanced contrast
- Gradients are adjusted for better visibility in dark mode

## 📐 Sizing Guidelines

### Recommended Sizes
- **Header Logo**: `h-10` (40px height) - Auto-width
- **Favicon**: 32x32px
- **Icon-Only**: 50x50px
- **Social Media**: 512x512px (can be generated from SVG)

### Scaling
All logos are SVG format, so they scale perfectly at any size without quality loss.

## 🎯 Usage Recommendations

### When to Use Each Version

1. **Full Logo** (`logo.svg`)
   - Main website header
   - About page
   - Footer
   - Email signatures

2. **Simple Logo** (`logo-simple.svg`)
   - Print materials
   - Small spaces
   - When minimalism is preferred

3. **Icon-Only** (`logo-icon.svg`)
   - Mobile navigation
   - App icons
   - Social media profile pictures
   - Favicon

4. **Modern Logo** (`logo-modern.svg`)
   - Marketing materials
   - Presentations
   - When you want a contemporary feel

## 🔧 Customization

To switch between logo versions, update `components/Header.tsx`:

```tsx
// For simple version
const logoSrc = theme === 'dark' ? '/assets/logo-simple-dark.svg' : '/assets/logo-simple.svg';

// For modern version
const logoSrc = theme === 'dark' ? '/assets/logo-modern-dark.svg' : '/assets/logo-modern.svg';
```

## 📝 File Structure

```
public/
├── favicon.svg                    # Browser favicon
└── assets/
    ├── logo.svg                   # Main logo (light)
    ├── logo-dark.svg              # Main logo (dark)
    ├── logo-simple.svg            # Simple logo (light)
    ├── logo-simple-dark.svg       # Simple logo (dark)
    ├── logo-icon.svg              # Icon only (light)
    ├── logo-icon-dark.svg         # Icon only (dark)
    ├── logo-modern.svg            # Modern logo (light)
    ├── logo-modern-dark.svg       # Modern logo (dark)
    └── favicon.svg                # Favicon copy
```

## 🎨 Brand Guidelines

### Do's ✅
- Use the appropriate logo for the context (full vs icon)
- Maintain aspect ratio when resizing
- Use dark mode versions in dark mode
- Keep sufficient spacing around the logo

### Don'ts ❌
- Don't stretch or distort the logo
- Don't change the colors
- Don't add effects that obscure the logo
- Don't use light mode logo on dark backgrounds

## 🔗 Integration

The logos are automatically integrated into:
- **Header Component**: Responsive logo switching
- **Favicon**: Browser tab icon
- **Dark Mode**: Automatic theme-based switching

All logos are optimized SVG files for fast loading and perfect scaling.

