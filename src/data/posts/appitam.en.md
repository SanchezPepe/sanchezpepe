# Building AppITAM: Real-Time Student Tools

> Every student at ITAM asked the same question at 7:58 AM: "Is the shuttle still coming?"

AppITAM is a web app I built for students at the Instituto Tecnológico Autónomo de México (ITAM). It lets students plan their class schedules and track the campus shuttle in real time. What started as a weekend project turned into something thousands of students use daily.

## The Problem

ITAM's campus is connected to several neighborhoods by a free shuttle service. The shuttle runs on a schedule, but that schedule was only available as a PDF on an intranet page that loaded slowly. Students would refresh a WhatsApp group hoping someone had posted an update.

For schedule planning, the official system was functional but frustrating — no visual layout, no conflict detection, no way to share your schedule with friends.

Both problems had the same root cause: information existed, but it wasn't accessible.

## The Stack Decision

**Vue.js + Vuetify** was the obvious choice for a data-dense university tool. Vuetify's data table, time picker, and dialog components gave us a polished UI without designing everything from scratch. The Material Design language also felt familiar to students who use Google products daily.

**Firebase** handled the real-time shuttle tracking. Each shuttle stop has a GPS sensor that writes its location to Firestore. The app subscribes to that data and renders the current shuttle position on a map with a `onSnapshot` listener:

```js
onSnapshot(doc(db, 'shuttle', 'current'), (snapshot) => {
  const { lat, lng, nextStop, eta } = snapshot.data()
  updateMapMarker(lat, lng)
  showETA(nextStop, eta)
})
```

The update latency is under a second, which means students know almost immediately if the shuttle is running late.

## Schedule Builder

The schedule planning feature was more complex than it looks. The core challenge: detect conflicts between classes that share time slots, including labs that run on alternating weeks.

The algorithm runs on every change to the selected courses:

1. Expand each course into its individual time blocks (day + start + end)
2. For each pair of blocks, check if their intervals overlap
3. If they do, mark both courses as conflicting and block the "Add" action

We store the user's schedule in Firestore so it persists across devices. The shareable link feature encodes the course selection as a URL-safe string, making it easy to compare schedules with friends.

## CI/CD with GitHub Actions

Getting a reliable deployment pipeline set up early was one of the better decisions on this project. Every push to `main` triggers:

1. Linting (`eslint`)
2. Unit tests (`vitest`)
3. Build (`vite build`)
4. Deploy to Firebase Hosting

The whole pipeline runs in under two minutes. This meant we could ship fixes for shuttle data issues or schedule bugs within minutes of a report, which mattered a lot since students were actively depending on the app.

## Usage and Feedback

Within the first month, AppITAM had more daily active users than we expected. The shuttle tracker was the dominant use case — students would open the app at a bus stop and leave it open until the shuttle arrived.

The most requested feature was push notifications for shuttle delays. We never shipped it (real-time location on a map turned out to be enough), but it showed us that the problem we were solving was real.

## What I'd Do Differently

**Build the mobile experience first.** Most usage happened on phones at bus stops. We designed for desktop first and retrofitted the mobile layout, which always shows in the final product.

**Abstract the real-time layer earlier.** The Firestore `onSnapshot` logic was duplicated in three components before we extracted it into a composable. Extract early.

**Write the tests before the feature.** Some of the schedule conflict logic had subtle bugs that we only caught because a student reported them. A proper test suite for the time-overlap algorithm would have caught these before release.

---

AppITAM is live at [appitam.org](https://appitam.org). If you're a student at ITAM, it's free to use.
