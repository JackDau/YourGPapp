# Your GP Patient Portal - Navigation & Design System

## Bottom Navigation Bar

The bottom navigation provides persistent access to the four core MVP features plus an overflow menu.

### Structure

```
┌─────────────────────────────────────────────────────────┐
│                                                         │
│    🏠          📅          💊          📋          ⋯     │
│   Home       Appts      Scripts    Results      More    │
│    ●                                                    │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### Navigation Items

| Order | Icon | Label | Screen | Badge |
|-------|------|-------|--------|-------|
| 1 | 🏠 | Home | Dashboard | Notification count |
| 2 | 📅 | Appts | Appointments list | Upcoming count |
| 3 | 💊 | Scripts | Prescriptions | Action needed |
| 4 | 📋 | Results | Test Results | New results count |
| 5 | ⋯ | More | Overflow menu | Has notifications |

### "More" Overflow Menu

```
┌─────────────────────────────────────────┐
│                                         │
│        ┌───────────────────────┐        │
│        │                       │        │
│        │  📄  Referrals        │        │
│        │                       │        │
│        │  🔔  Reminders        │        │
│        │                       │        │
│        │  👨‍👩‍👧  Family Members   │        │
│        │                       │        │
│        │  ⚙️  Settings          │        │
│        │                       │        │
│        │  ❓  Help & Support    │        │
│        │                       │        │
│        └───────────────────────┘        │
│                                         │
├─────────────────────────────────────────┤
│   🏠       📅       💊       📋      [●] │
│  Home    Appts   Scripts  Results   More │
└─────────────────────────────────────────┘
```

### Badge Indicators

```
┌───────────────────────────────────────────────────┐
│                                                   │
│    🏠          📅          💊          📋         ⋯│
│   [3]                     [!]        [2]        [●]│
│   Home       Appts      Scripts    Results     More│
│                                                   │
└───────────────────────────────────────────────────┘

[3] = Number badge (notifications)
[!] = Alert badge (action needed)
[2] = Number badge (new items)
[●] = Dot badge (has items in submenu)
```

---

## Design System

### Color Palette

#### Primary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Charcoal | #32373c | 50, 55, 60 | Primary buttons, text, headers |
| White | #ffffff | 255, 255, 255 | Backgrounds, button text |
| Black | #000000 | 0, 0, 0 | Body text, headings |

#### Secondary Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Gray 100 | #f7f7f7 | 247, 247, 247 | Page backgrounds |
| Gray 200 | #e5e5e5 | 229, 229, 229 | Dividers, borders |
| Gray 400 | #a3a3a3 | 163, 163, 163 | Placeholder text |
| Gray 600 | #666666 | 102, 102, 102 | Secondary text |

#### Semantic Colors
| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Success | #22c55e | 34, 197, 94 | Success states, confirmations |
| Warning | #f59e0b | 245, 158, 11 | Warnings, expiring items |
| Error | #ef4444 | 239, 68, 68 | Errors, critical alerts |
| Info | #3b82f6 | 59, 130, 246 | Information, new items |

### Typography

#### Font Family
```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
             Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',
             sans-serif;
```

#### Type Scale
| Name | Size | Weight | Line Height | Usage |
|------|------|--------|-------------|-------|
| H1 | 28px | 700 | 1.2 | Page titles |
| H2 | 24px | 600 | 1.3 | Section headers |
| H3 | 20px | 600 | 1.4 | Card titles |
| Body | 16px | 400 | 1.5 | Body text |
| Body Small | 14px | 400 | 1.5 | Secondary text |
| Caption | 12px | 400 | 1.4 | Labels, timestamps |
| Button | 16px | 600 | 1 | Button text |

### Spacing System

Using an 8px base unit:

| Token | Value | Usage |
|-------|-------|-------|
| space-1 | 4px | Tight spacing |
| space-2 | 8px | Default small |
| space-3 | 12px | Medium small |
| space-4 | 16px | Default |
| space-5 | 24px | Medium |
| space-6 | 32px | Large |
| space-7 | 48px | Extra large |
| space-8 | 64px | Section spacing |

### Border Radius

| Token | Value | Usage |
|-------|-------|-------|
| radius-sm | 4px | Small elements |
| radius-md | 8px | Cards, inputs |
| radius-lg | 12px | Modals, large cards |
| radius-xl | 16px | Feature cards |
| radius-full | 9999px | Pills, avatars |

### Shadows

```css
/* Card shadow */
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1),
            0 1px 2px rgba(0, 0, 0, 0.06);

/* Elevated shadow (hover, modals) */
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1),
            0 2px 4px rgba(0, 0, 0, 0.06);

/* Modal shadow */
box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1),
            0 4px 6px rgba(0, 0, 0, 0.05);
```

---

## Component Library

### Buttons

#### Primary Button
```
┌─────────────────────────────────────┐
│                                     │
│          BUTTON TEXT                │
│                                     │
└─────────────────────────────────────┘

Background: #32373c
Text: #ffffff
Border-radius: 8px
Padding: 16px 24px
Font-weight: 600
```

#### Secondary Button
```
┌─────────────────────────────────────┐
│                                     │
│          BUTTON TEXT                │
│                                     │
└─────────────────────────────────────┘

Background: transparent
Border: 2px solid #32373c
Text: #32373c
```

#### Text Button
```
          BUTTON TEXT

Background: transparent
Text: #32373c
Underline on hover
```

#### Button States
| State | Background | Text | Border |
|-------|------------|------|--------|
| Default | #32373c | #ffffff | none |
| Hover | #1f2326 | #ffffff | none |
| Active | #0f1113 | #ffffff | none |
| Disabled | #e5e5e5 | #a3a3a3 | none |
| Loading | #32373c | spinner | none |

### Input Fields

```
┌─────────────────────────────────────┐
│  Label                              │
├─────────────────────────────────────┤
│                                     │
│  Placeholder text                   │
│                                     │
└─────────────────────────────────────┘

Border: 1px solid #e5e5e5
Border-radius: 8px
Padding: 12px 16px
Focus border: 2px solid #32373c
```

#### Input States
```
Default:    ─────────────────
            Border: #e5e5e5

Focus:      ━━━━━━━━━━━━━━━━━
            Border: #32373c (2px)

Error:      ─────────────────
            Border: #ef4444
            + Error message below

Success:    ─────────────────
            Border: #22c55e
            + Check icon
```

### Cards

#### Standard Card
```
┌───────────────────────────────────────┐
│                                       │
│  Card Title                           │
│  Secondary text                       │
│                                       │
│  Card content goes here with any      │
│  relevant information displayed.      │
│                                       │
│                              [Action] │
└───────────────────────────────────────┘

Background: #ffffff
Border: 1px solid #e5e5e5
Border-radius: 12px
Padding: 16px
Shadow: card shadow
```

#### Interactive Card (tap/click)
```
Same as standard, but:
- Cursor: pointer
- Hover: elevated shadow
- Active: scale(0.98)
- Arrow icon on right →
```

### List Items

```
┌───────────────────────────────────────┐
│  🔵 Primary text                      │
│     Secondary text                    │
│     Tertiary text              →      │
└───────────────────────────────────────┘

Padding: 16px
Border-bottom: 1px solid #e5e5e5
Tap target: entire row
```

### Badges

```
Notification badge:  [3]
- Background: #ef4444
- Text: #ffffff
- Border-radius: full
- Min-width: 20px

Status badge:  ● Active
- Dot color: semantic color
- Text: 12px

Alert badge:  ⚠️
- Icon only
- Color: #f59e0b
```

### Bottom Sheet / Modal

```
┌─────────────────────────────────────────┐
│  ────────────                           │  ← drag handle
│                                         │
│  Sheet Title                         ✕  │
│                                         │
│  ─────────────────────────────────────  │
│                                         │
│  Content area with scrollable           │
│  content if needed.                     │
│                                         │
│                                         │
│     ┌─────────────────────────────┐     │
│     │      PRIMARY ACTION         │     │
│     └─────────────────────────────┘     │
│                                         │
│     ┌─────────────────────────────┐     │
│     │      SECONDARY ACTION       │     │
│     └─────────────────────────────┘     │
│                                         │
└─────────────────────────────────────────┘

Background: #ffffff
Border-radius: 16px 16px 0 0 (top corners only)
Max-height: 90vh
Backdrop: rgba(0, 0, 0, 0.5)
```

### Toast Notifications

```
┌───────────────────────────────────────┐
│  ✓  Action completed successfully     │
└───────────────────────────────────────┘

Position: bottom center, above nav
Background: #32373c
Text: #ffffff
Border-radius: 8px
Auto-dismiss: 4 seconds
```

---

## Iconography

Using a consistent icon set (recommend: Heroicons, Phosphor, or Lucide)

### Navigation Icons
| Feature | Icon | Style |
|---------|------|-------|
| Home | House | Outline (inactive), Solid (active) |
| Appointments | Calendar | Outline/Solid |
| Prescriptions | Pill | Outline/Solid |
| Results | Clipboard/Document | Outline/Solid |
| More | Ellipsis horizontal | Outline |

### Action Icons
| Action | Icon |
|--------|------|
| Back | Arrow left |
| Forward/Details | Chevron right |
| Close | X |
| Add | Plus |
| Edit | Pencil |
| Delete | Trash |
| Download | Arrow down to line |
| Share | Share/Export |
| Call | Phone |
| Directions | Map pin |
| Settings | Cog/Gear |

### Status Icons
| Status | Icon | Color |
|--------|------|-------|
| Success | Check circle | #22c55e |
| Warning | Exclamation triangle | #f59e0b |
| Error | X circle | #ef4444 |
| Info | Information circle | #3b82f6 |
| Pending | Clock | #666666 |
| New | Circle filled | #3b82f6 |

---

## Responsive Breakpoints

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 640px | Single column, bottom nav |
| Tablet | 640px - 1024px | Adaptive, bottom nav |
| Desktop | > 1024px | Multi-column, side nav |

### Mobile Layout (Primary Focus)
- Single column content
- Bottom navigation bar (fixed)
- Full-width cards
- Touch-optimized tap targets (min 44px)

### Tablet Layout
- Two-column where appropriate
- Bottom navigation (can switch to side)
- Cards can be side-by-side

### Desktop Layout
- Side navigation (left)
- Multi-column dashboard
- Max content width: 1200px
- Centered layout

---

## Accessibility Guidelines

### Touch Targets
- Minimum size: 44x44px
- Spacing between targets: 8px minimum

### Color Contrast
- Text on backgrounds: minimum 4.5:1
- Large text: minimum 3:1
- Interactive elements: minimum 3:1

### Focus States
- Visible focus ring on all interactive elements
- Focus ring: 2px solid #32373c, 2px offset

### Screen Reader Support
- All images have alt text
- Form inputs have associated labels
- Error messages linked to inputs (aria-describedby)
- Page regions use landmark roles

### Motion
- Respect `prefers-reduced-motion`
- No auto-playing animations
- Transitions: max 200ms

---

## Loading States

### Skeleton Screens
```
┌───────────────────────────────────────┐
│  ░░░░░░░░░░░░░░░░                     │
│  ░░░░░░░░░░░░░░░░░░░░░░░░░░           │
│  ░░░░░░░░░░░░░                        │
└───────────────────────────────────────┘

Background: linear-gradient animation
Color: #e5e5e5 → #f7f7f7 → #e5e5e5
```

### Spinner
```
    ◐

Centered in container
Color: #32373c
Size: 24px (small), 32px (medium), 48px (large)
```

### Progress Indicator
```
Step progress:
● ──────── ○ ──────── ○

Loading bar:
┌━━━━━━━━━━━━░░░░░░░░░░░░░░░░░░┐
```

---

## Animation & Transitions

### Standard Transitions
```css
/* Default */
transition: all 150ms ease-in-out;

/* Slower (modals, sheets) */
transition: all 300ms ease-in-out;

/* Spring (cards, buttons) */
transition: transform 200ms cubic-bezier(0.34, 1.56, 0.64, 1);
```

### Common Animations
- Page transitions: Fade + slide (150ms)
- Modal entry: Fade + scale from 0.95 (200ms)
- Bottom sheet: Slide up (300ms)
- Toast: Slide up + fade (200ms)
- Card hover: Scale to 1.02 (150ms)
