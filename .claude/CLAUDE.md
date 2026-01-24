# YourGPapp Patient Portal

## Project Overview

This is the **YourGP Patient Portal** - a mobile-first web application that enables patients to manage their healthcare interactions with YourGP practices.

**Pillar 3 Initiative**: This app is a Patient Experience tool within the YourGP Operating System's four-pillar framework. It delivers on the promise that "patients receive the care enabled by upstream pillars" by providing convenient digital access to appointments, prescriptions, test results, and referrals.

**Status**: Proof of concept with mock data. Designed for future integration with Best Practice clinical software.

## Tech Stack

| Layer | Technology |
|-------|------------|
| Markup | HTML5 (semantic) |
| Styling | CSS3 with Custom Properties |
| Logic | Vanilla JavaScript (ES6+) |
| State | localStorage |
| Build | None (direct browser execution) |

**No frameworks or external libraries.** Keep it vanilla.

## File Structure

```
YourGPapp/
├── docs/                    # Application code (served to browser)
│   ├── index.html          # Landing page
│   ├── css/
│   │   ├── variables.css   # Design tokens
│   │   ├── base.css        # Reset, typography
│   │   ├── components.css  # UI components
│   │   ├── layout.css      # App shell, navigation
│   │   └── styles.css      # Main entry (imports all)
│   ├── js/
│   │   ├── app.js          # Shared utilities
│   │   └── [feature].js    # Feature-specific modules
│   └── pages/              # All HTML pages
│
├── wireframes/             # Design specifications (markdown)
│   └── *.md                # Feature specs with ASCII wireframes
│
└── .claude/
    └── CLAUDE.md           # This file
```

## Coding Conventions

### File Naming
- **Lowercase with hyphens**: `appointment-detail.html`, `prescription-request.html`
- **Multi-step flows**: `appointments-book-step1.html` through `step4.html`
- **Feature prefix**: Related pages share common prefix

### JavaScript
- **Module Pattern** for feature code:
  ```javascript
  const FeatureModule = (function() {
    // Private
    const STORAGE_KEY = 'yourgp_feature_data';
    function privateFunction() { ... }

    // Public API
    return { publicMethod };
  })();
  ```
- **Shared utilities** in `app.js` (navigation, date formatting, toasts)
- **localStorage keys**: Always prefix with `yourgp_`
- **Initialization**: Use `DOMContentLoaded` event

### CSS
- **All design tokens in `variables.css`** - never hardcode colors/spacing
- **Component classes**: `.btn-*`, `.card-*`, `.list-item-*`
- **BEM-like modifiers**: `.btn-primary`, `.badge-success`
- **No inline styles** - use utility classes or component CSS

### HTML
- **Consistent page structure**:
  ```html
  <div class="app">
    <header class="header">...</header>
    <main class="main">...</main>
    <nav class="bottom-nav">...</nav>
  </div>
  ```
- **Section pattern**:
  ```html
  <div class="section">
    <div class="section-header">
      <h2 class="section-title">TITLE</h2>
      <a href="#" class="section-action">Action</a>
    </div>
    <!-- Content -->
  </div>
  ```

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `--color-primary` | #32373c | Buttons, headers, key text |
| `--color-success` | #22c55e | Confirmations, positive states |
| `--color-warning` | #f59e0b | Alerts, pending states |
| `--color-error` | #ef4444 | Errors, destructive actions |
| `--color-info` | #3b82f6 | Information, links |

### Spacing
8px base unit: `--space-1` (4px) through `--space-8` (64px)

### Typography
- System font stack (no custom fonts)
- Scale: 12px to 28px via `--font-size-*` tokens

### Layout
- **Max width**: 600px content area
- **Bottom navigation**: 5 items, 64px height, fixed position
- **Touch targets**: Minimum 44px for accessibility

## Core Features

1. **Authentication** - 3-step registration with identity verification
2. **Dashboard** - Upcoming appointments, quick actions, activity feed
3. **Appointments** - View, book (4-step flow), cancel, reschedule
4. **Prescriptions** - View medications, request repeats (with restrictions)
5. **Test Results** - Lab results and imaging, filtered by type
6. **Referrals** - View referral letters, request new referrals
7. **Video Consultation** - Complete telehealth flow with check-in, call, payment, and feedback

## Anti-Patterns to Avoid

| Don't | Why |
|-------|-----|
| Add external frameworks/libraries | Keep the stack simple and dependency-free |
| Use inline styles | All styling through CSS classes and variables |
| Create backend dependencies | Mock data until API integration is ready |
| Break mobile-first approach | Primary target is mobile browsers |
| Ignore wireframe specifications | `/wireframes` folder contains approved designs |
| Hardcode colors or spacing | Use CSS custom properties from `variables.css` |
| Skip localStorage prefix | All keys must start with `yourgp_` |

## API Integration

> **TODO**: Add Best Practice API documentation here when available.

### Planned Integration Points
- Patient identity verification (registration)
- Appointment fetching and booking
- Prescription history and repeat requests
- Test results retrieval
- Referral letter access

### Mock Data Locations
- Appointments: `js/appointments.js` → `MOCK_APPOINTMENTS`
- Prescriptions: `js/prescriptions.js` → `DEMO_MEDICATIONS`
- Patient data: Inline constants in page scripts

## Australian Healthcare Context

- **Privacy Act 1988**: Patient data must be handled per Australian privacy principles
- **Data Residency**: Production must store data in Australia
- **Medicare**: Future integration may involve MBS item numbers
- **ACT Location**: YourGP operates in the Australian Capital Territory

## Reference Documents

- **Wireframes**: See `/wireframes/` for detailed feature specifications
- **Design System**: See `/wireframes/07-navigation-and-design-system.md`
- **Parent Framework**: See `../.claude/CLAUDE.md` for four-pillar context
