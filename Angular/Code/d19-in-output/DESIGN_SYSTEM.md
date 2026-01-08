# Global Design System - d19-in-output

This document describes the global CSS variables and design principles used to maintain visual consistency throughout the application.

## CSS Variable Structure

All variables are defined in `src/styles.css` and can be used in any component.

### Primary Colors

```css
--color-primary: #4f46e5; /* Main Blue */
--color-primary-light: #6366f1; /* Light Blue */
--color-primary-dark: #4338ca; /* Dark Blue */
--color-primary-hover: rgba(...); /* Semitransparent Hover */
```

### Secondary Colors

```css
--color-secondary: #06b6d4; /* Main Cyan */
--color-secondary-light: #22d3ee; /* Light Cyan */
--color-secondary-dark: #0891b2; /* Dark Cyan */
--color-secondary-hover: rgba(...); /* Semitransparent Hover */
```

### Neutral Colors

```css
--color-dark: #0f172a; /* Primary Text */
--color-gray-700: #374151; /* Secondary Text */
--color-gray-500: #6b7280; /* Disabled Text */
--color-gray-200: #f3f4f6; /* Light Background */
--color-gray-100: #f9fafb; /* Very Light Background */
--color-white: #ffffff; /* White */
--color-border: #e6e9ee; /* Borders */
--color-bg-light: #f8fafc; /* Default Background */
```

### Status Colors

```css
--color-success: #10b981; /* Green - Success */
--color-warning: #f59e0b; /* Amber - Warning */
--color-error: #ef4444; /* Red - Error */
--color-info: #3b82f6; /* Blue - Info */
```

### Gradients

```css
--gradient-primary: linear-gradient(90deg, #4f46e5, #06b6d4)
--gradient-primary-reverse: linear-gradient(90deg, #06b6d4, #4f46e5)
--gradient-vertical: linear-gradient(180deg, #4f46e5, #667eea)

```

## Spacing

Use these variables for padding, margin, and gap:

```css
--spacing-xs: 0.25rem; /* 4px */
--spacing-sm: 0.5rem; /* 8px */
--spacing-md: 1rem; /* 16px */
--spacing-lg: 1.5rem; /* 24px */
--spacing-xl: 2rem; /* 32px */
--spacing-2xl: 2.5rem; /* 40px */
--spacing-3xl: 3rem; /* 48px */
```

## Font Sizes

```css
--font-size-xs: 0.7rem; /* 11px */
--font-size-sm: 0.75rem; /* 12px */
--font-size-base: 0.875rem; /* 14px */
--font-size-md: 1rem; /* 16px */
--font-size-lg: 1.125rem; /* 18px */
--font-size-xl: 1.25rem; /* 20px */
--font-size-2xl: 1.5rem; /* 24px */
--font-size-3xl: 2rem; /* 32px */
```

## Font Weights

```css
--font-weight-normal: 400; /* Normal body text */
--font-weight-medium: 500; /* Highlighted text */
--font-weight-semibold: 600; /* Headings */
--font-weight-bold: 700; /* Main headings */
```

## Border Radius

```css
--radius-sm: 4px; /* Small elements */
--radius-md: 6px; /* Medium elements */
--radius-lg: 8px; /* Buttons and cards */
--radius-xl: 12px; /* Large containers */
--radius-full: 9999px; /* Circular elements */
```

## Shadows

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05); /* Subtle */
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.1); /* Normal */
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.15); /* Elevated */
--shadow-xl: 0 10px 40px rgba(0, 0, 0, 0.1); /* Very elevated */
```

## Transitions

```css
--transition-fast: 0.2s ease; /* Fast interactions */
--transition-base: 0.3s ease; /* Standard transitions */
--transition-slow: 0.5s ease; /* Smooth animations */
```

## Accessibility

```css
--min-touch-height: 44px; /* Minimum touch target height (mobile) */
--min-touch-height-sm: 36px; /* Small buttons */
--min-touch-height-xs: 32px; /* Very small elements */
```

## Usage Examples

### In a TypeScript/HTML component

```html
<button class="btn-primary">Send</button>
```

### In a CSS file

```css
.my-component {
  padding: var(--spacing-md);
  background: var(--color-primary);
  color: var(--color-white);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-md);
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-base);
}

.my-component:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-lg);
}
```

## Screen Breakpoints

- **Mobile**: < 480px
- **Small Mobile**: 480px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px - 1200px
- **Large Desktop**: > 1200px

Always use `clamp()` for responsive font sizes and spacing:

```css
padding: clamp(var(--spacing-sm), 2vw, var(--spacing-lg));
font-size: clamp(var(--font-size-md), 2vw, var(--font-size-lg));
```

## Design Principles

1. **Consistency**: Always use variables instead of hardcoded values.
2. **Responsiveness**: Use `clamp()` for fluid scaling.
3. **Accessibility**: Respect `--min-touch-height` for interactive elements.
4. **Structure**: Maintain visual hierarchy with consistent sizes and weights.
5. **Spacing**: Use multiples of `--spacing-md` to maintain visual rhythm.

## Creating New Components

When creating a new component, follow this pattern:

```css
.component {
  /* Outer spacing */
  padding: var(--spacing-md);
  margin: var(--spacing-md);
  gap: var(--spacing-sm);

  /* Colors */
  background: var(--color-bg-light);
  color: var(--color-dark);
  border: 1px solid var(--color-border);

  /* Shape */
  border-radius: var(--radius-lg);

  /* Shadow */
  box-shadow: var(--shadow-md);

  /* Typography */
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-normal);

  /* Animation */
  transition: all var(--transition-base);
}

.component:hover {
  background: var(--color-gray-200);
  box-shadow: var(--shadow-lg);
}

/* Responsive */
@media screen and (max-width: 768px) {
  .component {
    padding: var(--spacing-sm);
  }
}
```
