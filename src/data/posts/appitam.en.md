# AppITAM: Real-Time Student Tools

> Every student at ITAM asked the same question at 7:58 AM: "Is the shuttle still coming?"

AppITAM is a web app I built for students at the Instituto Tecnológico Autónomo de México (ITAM). It lets students plan their class schedules and track the campus shuttle in real time.

## The Problem

ITAM's campus is connected to several neighborhoods by a free shuttle service. The shuttle runs on a schedule, but that schedule was only available as a PDF on an intranet page that loaded slowly. Students would refresh a WhatsApp group hoping someone had posted an update.

For schedule planning, the official system was functional but frustrating — no visual layout, no conflict detection, no way to share your schedule with friends.

Both problems had the same root cause: the information existed but wasn't accessible.

## The Stack

**Vue.js + Vuetify** made sense for a data-dense university tool. Vuetify's data tables, time pickers, and dialog components handled the UI heavy lifting. The Material Design language also felt familiar to students already using Google products.

**Firebase** handled the real-time shuttle tracking. Each shuttle stop has a GPS sensor that writes its location to Firestore. The app subscribes to that data and renders the current position on a map with an `onSnapshot` listener:

```js
onSnapshot(doc(db, 'shuttle', 'current'), (snapshot) => {
  const { lat, lng, nextStop, eta } = snapshot.data()
  updateMapMarker(lat, lng)
  showETA(nextStop, eta)
})
```

Update latency is under a second.

## Schedule Builder

The schedule planning feature was more complex than it looks. The core challenge: detect conflicts between classes that share time slots, including labs that run on alternating weeks.

The algorithm runs on every change to the selected courses:

1. Expand each course into its individual time blocks (day + start + end)
2. For each pair of blocks, check if their intervals overlap
3. If they do, mark both courses as conflicting and block the "Add" action

The user's schedule is stored in Firestore so it persists across devices. The shareable link encodes the course selection as a URL-safe string, making it easy to compare schedules with friends.

## CI/CD with GitHub Actions

Every push to `main` triggers:

1. Linting (`eslint`)
2. Unit tests (`vitest`)
3. Build (`vite build`)
4. Deploy to Firebase Hosting

The whole pipeline runs in under two minutes, which meant we could push fixes for shuttle data or schedule bugs within minutes of a report.

## Usage

The shuttle tracker was the dominant use case — students would open the app at a bus stop and leave it open until the shuttle arrived. The most requested feature was push notifications for delays. We never shipped it; real-time location on the map turned out to be enough.

## What I'd Do Differently

**Build mobile first.** Most usage happened on phones at bus stops. We designed for desktop and retrofitted the mobile layout — it shows.

**Extract the real-time logic early.** The Firestore `onSnapshot` code was copy-pasted across three components before we pulled it into a composable.

**Write tests before shipping the conflict algorithm.** Some edge cases in the time-overlap logic only surfaced because a student hit them in production.

---

AppITAM is live at [appitam.org](https://appitam.org). If you're a student at ITAM, it's free.
