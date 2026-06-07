# Building Raicen: A Cinema Gear Rental Platform

> Renting professional camera equipment in Mexico shouldn't require three phone calls, a spreadsheet, and a prayer.

Raicen started as a real frustration. The film industry runs on rented gear — cameras, lenses, lighting rigs, grip equipment — yet finding and booking it was still done through Instagram DMs and handshake deals. There was no central, reliable platform for it. This is the story of how we built one.

## The Problem

Professional film productions rarely own the gear they use. A camera body alone can cost $50,000+ USD, so renting is the default. Rental houses exist, but the experience of browsing inventory, checking availability, and actually booking had zero digital infrastructure behind it.

We wanted to fix that. Specifically, we wanted to give both renters and rental houses a simple, trustworthy platform where the transaction was transparent and the experience didn't feel like 2005.

## Why Vue.js?

I had options. React was the obvious choice given the ecosystem, but I picked Vue.js for this project for a few reasons:

- **Gentler onboarding for the team.** The other developers on the project had less frontend experience. Vue's single-file components and template syntax were easier to reason about quickly.
- **Vuetify's material components.** For a data-heavy app with lots of tables, forms, and dialogs, Material Design gave us a solid component baseline.
- **Personal preference.** I had worked with Vue before and genuinely enjoy its reactivity model.

In hindsight, the tradeoffs were worth it. The team shipped features faster because of the lower cognitive overhead.

## The Backend: Firebase

Firebase was a pragmatic choice. We were a small team that needed:

- **Real-time inventory availability** without running our own websocket server
- **Authentication** without building it ourselves
- **Cloud Storage** for equipment photos
- **Serverless functions** for Stripe webhooks

Firestore's real-time listeners made the availability calendar surprisingly easy to implement. When a rental is confirmed, every other user browsing that equipment sees the dates block out immediately — no polling, no stale state.

## Payments with Stripe

Integrating Stripe was the hardest part. Not technically difficult, but it required thinking carefully about the financial flow:

1. Customer browses and selects equipment + dates
2. A **hold** is placed on their card at checkout
3. The rental house confirms the booking
4. The hold is captured and the transaction completes

The hold-and-capture pattern was important. We didn't want to charge customers before confirming that the equipment was actually available on their dates, especially for multi-day bookings.

Stripe's `PaymentIntent` API handles this well, but the webhook handling required careful idempotency logic to avoid double-charging on retry scenarios.

## What I Learned

A few things I'd do differently today:

**Start with TypeScript.** We started in plain JavaScript and migrated midway through. Every hour spent on that migration was painful and avoidable.

**Design the data model first.** We refactored the Firestore schema twice because the original structure didn't support the query patterns we needed. In Firestore, how you query determines how you structure — don't design the structure in isolation.

**Don't underestimate file uploads.** Equipment photos need to be resized, compressed, and served from a CDN. We handled this with Cloud Functions, but it added more complexity than expected.

---

The platform is live at [raicen.com](https://raicen.com). If you're in the Mexican film industry and need gear, give it a try.
