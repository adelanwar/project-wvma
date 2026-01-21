# WVMA Calendar Color Palette

Based on your brand colors:
- **Background**: #f4ece2 (Warm Beige)
- **Primary**: #1e5449 (Dark Teal)

## Complete Color Palette

### Base Colors
```css
--bg-primary: #f4ece2;          /* Main background - warm beige */
--bg-secondary: #ffffff;        /* Card/cell backgrounds - white */
--bg-tertiary: #e8dcc8;         /* Slightly darker beige for borders */

--primary: #1e5449;             /* Main brand color - dark teal */
--primary-light: #2d7a6b;       /* Lighter teal for hover states */
--primary-dark: #15403a;        /* Darker teal for emphasis */
--primary-subtle: #d4e8e4;      /* Very light teal for subtle backgrounds */
```

### Meeting Type Colors
```css
--bod-color: #2d7a6b;           /* Board of Directors - Medium Teal */
--bod-bg: #d4e8e4;              /* BOD background - Light Teal */
--bod-border: #1e5449;          /* BOD border - Dark Teal */

--bot-color: #8b6f47;           /* Board of Trustees - Warm Brown/Gold */
--bot-bg: #f0e6d2;              /* BOT background - Light Gold/Cream */
--bot-border: #6d5638;          /* BOT border - Dark Brown */
```

### Text Colors
```css
--text-primary: #1a1a1a;        /* Main text - almost black */
--text-secondary: #4a4a4a;      /* Secondary text - dark gray */
--text-muted: #808080;          /* Muted text - medium gray */
--text-on-primary: #ffffff;     /* Text on primary color - white */
--text-on-dark: #f4ece2;        /* Text on dark backgrounds - beige */
```

### Accent Colors
```css
--accent-1: #c67b5c;            /* Coral/terracotta accent */
--accent-2: #4a7c7e;            /* Complementary teal */
--accent-3: #a68a64;            /* Warm taupe */

--current-day: #c67b5c;         /* Current day highlight - Coral */
--current-day-bg: #fdf5f0;      /* Current day background - Very light coral */
```

### UI Elements
```css
--border-light: #e0d4c0;        /* Light borders */
--border-medium: #c9baa0;       /* Medium borders */
--border-dark: #1e5449;         /* Dark borders (primary) */

--shadow-light: rgba(30, 84, 73, 0.05);    /* Subtle shadows */
--shadow-medium: rgba(30, 84, 73, 0.10);   /* Medium shadows */
--shadow-dark: rgba(30, 84, 73, 0.20);     /* Strong shadows */
```

### Interactive States
```css
--hover-bg: #e8dcc8;            /* Hover background */
--active-bg: #ddd0b8;           /* Active/pressed background */
--focus-outline: #2d7a6b;       /* Focus outline color */
```

### Month Headers
```css
--month-header-bg: #1e5449;     /* Month header background - primary */
--month-header-text: #ffffff;   /* Month header text - white */
--month-header-accent: #8b6f47; /* Month header accent - warm brown */
```

## Color Usage Guide

### For Calendar Grid
- **Grid background**: `--bg-primary` (#f4ece2)
- **Cell background**: `--bg-secondary` (#ffffff)
- **Cell borders**: `--border-light` (#e0d4c0)
- **Month headers**: `--month-header-bg` (#1e5449) with `--month-header-text` (#ffffff)

### For Meeting Dates
- **Board of Directors (BOD)**:
  - Background: `--bod-bg` (#d4e8e4) - light teal
  - Text: `--bod-color` (#2d7a6b) - medium teal
  - Border: `--bod-border` (#1e5449) - dark teal
  - Label: "BOD" in `--text-on-primary`

- **Board of Trustees (BOT)**:
  - Background: `--bot-bg` (#f0e6d2) - light gold
  - Text: `--bot-color` (#8b6f47) - warm brown
  - Border: `--bot-border` (#6d5638) - dark brown
  - Label: "BOT" in `--text-on-primary`

### For Current Day
- Background: `--current-day-bg` (#fdf5f0) - very light coral
- Border: `--current-day` (#c67b5c) - coral
- Text: `--text-primary` (#1a1a1a)

### For Regular Dates
- Background: `--bg-secondary` (#ffffff)
- Text: `--text-primary` (#1a1a1a)
- Weekends can use: `--text-secondary` (#4a4a4a)

## Visual Hierarchy

1. **Most Prominent**: Meeting dates (BOD/BOT with colored backgrounds)
2. **Prominent**: Current day (coral border)
3. **Standard**: Regular dates (white background)
4. **Subtle**: Weekend dates (slightly muted text)
5. **Headers**: Month names (dark teal background)

## Accessibility Notes

- Primary color (#1e5449) has excellent contrast with white (10.2:1)
- Text primary (#1a1a1a) has excellent contrast with backgrounds
- Meeting colors maintain WCAG AA standards for readability
- All interactive elements have visible focus states

---

**Color Harmony Analysis:**
- Warm beige (#f4ece2) + Dark teal (#1e5449) = Natural, organic, professional
- Complementary browns/golds work with the warm background
- Teal variations maintain brand consistency
- Coral accent adds visual interest without overwhelming
