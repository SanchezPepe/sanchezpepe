# Raicen: A Cinema Gear Rental Platform

> Renting professional camera equipment in Mexico shouldn't require three phone calls, a spreadsheet, and a prayer.

Raicen is a platform for the Mexican film industry. Productions rent rather than own their gear — a camera body alone can run $50,000+ USD — but finding and booking equipment was still done through Instagram DMs and handshake deals. No central inventory, no availability calendar, no real booking flow. So we built one.

## The Problem

Rental houses existed, but the experience of browsing inventory, checking availability, and actually booking had no digital infrastructure behind it. The transaction was opaque and the tooling felt like 2005.

## Why Vue.js?

React was the obvious choice given the ecosystem, but I picked Vue.js for a few reasons:

- **Onboarding.** The other developers on the project had less frontend experience. Vue's single-file components and template syntax were easier to get productive with quickly.
- **Vuetify.** For a data-heavy app with lots of tables, forms, and dialogs, Material Design gave us a solid component baseline without designing everything from scratch.
- **Personal preference.** I'd worked with Vue before and like its reactivity model.

The team shipped features faster for it.

## The Backend: Firebase

We were a small team that needed real-time inventory availability, auth, file storage for equipment photos, and serverless functions for Stripe webhooks — without building any of it from scratch. Firebase covered all of that.

Firestore's real-time listeners made the availability calendar straightforward. When a rental is confirmed, every other user browsing that equipment sees the dates block out immediately — no polling, no stale state.

## Payments with Stripe

Stripe was the technically interesting part. The financial flow:

1. Customer selects equipment + dates
2. A **hold** is placed on their card at checkout
3. The rental house confirms the booking
4. The hold is captured and the transaction completes

We didn't want to charge customers before confirming the equipment was actually available, especially for multi-day bookings. Stripe's `PaymentIntent` API handles the hold-and-capture pattern well, but the webhook handling needed careful idempotency logic to avoid double-charging on retries.

## What I'd Do Differently

**Start with TypeScript.** We started in plain JavaScript and migrated midway through. Painful and avoidable.

**Design the data model before writing any queries.** We refactored the Firestore schema twice because the original structure didn't support the queries we needed. In Firestore, how you query determines how you structure — figure that out first.

**Take file uploads seriously upfront.** Equipment photos need resizing, compression, and CDN delivery. We handled it with Cloud Functions, but it added more complexity than expected.

---

The platform is live at [raicen.com](https://raicen.com). If you're in the Mexican film industry and need gear, give it a try.
