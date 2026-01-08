# Global Variables Guide - d19-in-output

## 📋 Summary

This Angular application uses a **Global Design System** implemented with **CSS Variables** to maintain visual consistency and streamline the development of new components.

## 🎨 System Structure

### 1. Variables Defined in `src/styles.css`

All global variables are centralized in a single file:

```css
:root {
  /* Colors, spacing, typography, shadows, etc. */
}
```

### 2. Components Using the Variables

- ✅ [navbar.css](https://www.google.com/search?q=src/app/components/navbar/navbar.css) - Top navigation
- ✅ [footer.css](https://www.google.com/search?q=src/app/components/footer/footer.css) - Footer
- ✅ [sidebar.css](https://www.google.com/search?q=src/app/components/sidebar/sidebar.css) - Side menu
- ✅ [home.css](https://www.google.com/search?q=src/app/components/home/home.css) - Home page
- ✅ [product-list.css](https://www.google.com/search?q=src/app/components/product-list/product-list.css) - Product list
- ✅ [product-card.component.css](https://www.google.com/search?q=src/app/components/product-card/product-card.component.css) - Product card
- ✅ [app.css](https://www.google.com/search?q=src/app/app.css) - Root component global styles

## 🚀 How to Use the Variables

### In a CSS file

Simply reference the variables using `var(--variable-name)`:

```css
.my-component {
  /* Colors */
  background: var(--color-primary);
  color: var(--color-white);

  /* Spacing */
  padding: var(--spacing-md);
  margin: var(--spacing-lg);
  gap: var(--spacing-sm);

  /* Typography */
  font-size: var(--font-size-md);
  font-weight: var(--font-weight-semibold);

  /* Shape */
  border-radius: var(--radius-lg);

  /* Shadow */
  box-shadow: var(--shadow-md);

  /* Animation */
  transition: all var(--transition-base);
}
```

### Responsiveness with `clamp()`

For responsive sizes and spacing, use `clamp()`:

```css
.my-component {
  /* Responsive font size */
  font-size: clamp(var(--font-size-base), 2vw, var(--font-size-lg));

  /* Responsive padding */
  padding: clamp(var(--spacing-sm), 3vw, var(--spacing-lg));
}
```

## 📚 Available Variables

### Main Colors

```css
--color-primary: #4f46e5        /* Blue */
--color-secondary: #06b6d4      /* Cyan */
--color-accent: #667eea         /* Accent */

```

### Neutral Colors

```css
--color-dark: #0f172a           /* Primary text */
--color-gray-700: #374151       /* Secondary text */
--color-gray-600: #4b5563
--color-gray-500: #6b7280
--color-gray-400: #d1d5db
--color-gray-300: #e5e7eb
--color-gray-200: #f3f4f6
--color-gray-100: #f9fafb
--color-white: #ffffff

```

### Spacing

```css
--spacing-xs: 0.25rem    /* 4px */
--spacing-sm: 0.5rem     /* 8px */
--spacing-md: 1rem       /* 16px */
--spacing-lg: 1.5rem     /* 24px */
--spacing-xl: 2rem       /* 32px */
--spacing-2xl: 2.5rem    /* 40px */
--spacing-3xl: 3rem      /* 48px */

```

### Font Sizes

```css
--font-size-xs: 0.7rem      /* 11px */
--font-size-sm: 0.75rem     /* 12px */
--font-size-base: 0.875rem  /* 14px */
--font-size-md: 1rem        /* 16px */
--font-size-lg: 1.125rem    /* 18px */
--font-size-xl: 1.25rem     /* 20px */
--font-size-2xl: 1.5rem     /* 24px */
--font-size-3xl: 2rem       /* 32px */

```

### More Variables

To view all available variables, open [DESIGN_SYSTEM.md](https://www.google.com/search?q=DESIGN_SYSTEM.md)

## 🛠️ Creating a New Component

Follow this pattern for new components:

### 1. HTML Structure

```html
<div class="my-component">
  <h2>Title</h2>
  <p>Description</p>
  <button class="btn-primary">Action</button>
</div>
```

### 2. CSS Structure

```css
.my-component {
  /* Container */
  padding: var(--spacing-md);
  background: var(--color-bg-light);
  border-radius: var(--radius-lg);

  /* Responsive spacing */
  padding: clamp(var(--spacing-sm), 2vw, var(--spacing-lg));
}

.my-component h2 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-dark);
  margin-bottom: var(--spacing-md);
}

.my-component p {
  font-size: var(--font-size-md);
  color: var(--color-gray-700);
  line-height: 1.6;
}

.btn-primary {
  background: var(--color-primary);
  color: var(--color-white);
  padding: var(--spacing-sm) var(--spacing-lg);
  border-radius: var(--radius-md);
  border: none;
  cursor: pointer;
  font-weight: var(--font-weight-medium);
  transition: all var(--transition-base);
  min-height: var(--min-touch-height-sm);
}

.btn-primary:hover {
  background: var(--color-primary-dark);
  box-shadow: var(--shadow-lg);
}

/* Responsive */
@media screen and (max-width: 768px) {
  .my-component {
    padding: var(--spacing-sm);
  }

  .my-component h2 {
    font-size: var(--font-size-lg);
  }
}
```

## 📱 Breakpoints

```plain
Mobile:           < 480px
Small Mobile:     480px - 768px
Tablet:           768px - 1024px
Desktop:          1024px - 1200px
Large Desktop:    > 1200px

```

## ✨ Practical Example

### Simple Component

```typescript
// my-feature.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-feature',
  standalone: true,
  template: `
    <section class="feature-container">
      <h2>My Feature</h2>
      <p>Feature description</p>
      <button class="btn-primary">Get Started</button>
    </section>
  `,
  styleUrl: './my-feature.css',
})
export class MyFeature {}
```

```css
/* my-feature.css */
.feature-container {
  padding: clamp(var(--spacing-md), 3vw, var(--spacing-xl));
  background: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-md);
  transition: all var(--transition-base);
}

.feature-container:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.feature-container h2 {
  font-size: clamp(var(--font-size-xl), 3vw, var(--font-size-2xl));
  color: var(--color-dark);
  margin-bottom: var(--spacing-md);
}

.feature-container p {
  font-size: var(--font-size-md);
  color: var(--color-gray-700);
  margin-bottom: var(--spacing-lg);
}

.btn-primary {
  background: var(--gradient-primary);
  color: var(--color-white);
  padding: var(--spacing-sm) var(--spacing-lg);
  border: none;
  border-radius: var(--radius-md);
  cursor: pointer;
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-base);
  min-height: var(--min-touch-height-sm);
}

.btn-primary:hover {
  box-shadow: var(--shadow-lg);
}

@media screen and (max-width: 768px) {
  .feature-container {
    padding: var(--spacing-md);
  }
}
```

## 🎯 Benefits

- ✅ **Consistency**: A single source of truth for all styles.
- ✅ **Maintainability**: Changing a color affects the entire application.
- ✅ **Scalability**: Easy to add new components.
- ✅ **Responsiveness**: System tested across all breakpoints.
- ✅ **Accessibility**: Minimum heights for touch interaction.
- ✅ **Performance**: Less duplicated CSS code.

## 📖 Full Documentation

For more details on all available variables, check [DESIGN_SYSTEM.md](https://www.google.com/search?q=DESIGN_SYSTEM.md)
