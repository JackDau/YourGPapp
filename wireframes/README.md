# Your GP Patient Portal - Wireframes

This directory contains the wireframes and design specifications for the Your GP Patient Portal proof of concept.

## Document Index

| File | Description |
|------|-------------|
| [01-login-registration.md](01-login-registration.md) | Login, registration, and identity verification flows |
| [02-dashboard.md](02-dashboard.md) | Main dashboard/home screen with quick actions |
| [03-appointments.md](03-appointments.md) | Appointment booking, management, and rescheduling |
| [04-prescriptions.md](04-prescriptions.md) | Prescription management and repeat requests |
| [05-test-results.md](05-test-results.md) | Lab results and imaging with trend visualization |
| [06-referrals.md](06-referrals.md) | Referral letters and correspondence out |
| [07-navigation-and-design-system.md](07-navigation-and-design-system.md) | Navigation structure, colors, typography, components |

## MVP Features (Priority Order)

1. **Appointments** - Book standard/long appointments and telehealth
2. **Prescriptions** - View and request repeat scripts
3. **Test Results** - Lab results and imaging
4. **Referrals** - View referral letters (correspondence out)

## Key Design Decisions

### User Authentication
- Self-registration with verification against Best Practice database
- Match on: First name, Last name, DOB, Email
- Password with 2FA via mobile

### Navigation Pattern
- Bottom navigation bar (mobile-first)
- 5 items: Home, Appts, Scripts, Results, More
- Side navigation on desktop

### Design Inspiration
- **One Medical**: Clean, intuitive interface and booking flow
- **Evercare**: Practical service representation

### Brand Colors
- Primary: Charcoal (#32373c)
- Background: White (#ffffff)
- Text: Black (#000000)

## Future Phases

### Phase 2
- Vaccination records
- Correspondence in (specialist letters)

### Phase 3
- Reminders system (appointments, medications, vaccinations, custom)
- Family member/dependent access (children under 16)
- Push notifications

## Technical Notes

- Integrates with Best Practice Software (API + SQL)
- Data must remain in Australia
- Complies with Privacy Act 1988 / Australian Privacy Principles
- Proof of concept hosted on GitHub
