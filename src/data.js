// ─── Review Themes ────────────────────────────────────────────────────────────
export const THEMES = [
  {
    id: "tracking",
    label: "Tracking, ETA or pickup time wrong",
    reviews2024_26: 7,
    reviewsAllYears: 13,
    helpfulVotes: 331,
    color: "bg-rose-500",
    colorDark: "bg-rose-400",
    textColor: "text-rose-700 dark:text-rose-300",
    bgColor: "bg-rose-50 dark:bg-rose-950/40",
    borderColor: "border-rose-200 dark:border-rose-800",
  },
  {
    id: "crashes",
    label: "Crashes, slow loads, app will not open",
    reviews2024_26: 7,
    reviewsAllYears: 13,
    helpfulVotes: 189,
    color: "bg-orange-500",
    colorDark: "bg-orange-400",
    textColor: "text-orange-700 dark:text-orange-300",
    bgColor: "bg-orange-50 dark:bg-orange-950/40",
    borderColor: "border-orange-200 dark:border-orange-800",
  },
  {
    id: "booking",
    label: "Booking and screen confusion",
    reviews2024_26: 6,
    reviewsAllYears: 17,
    helpfulVotes: 174,
    color: "bg-yellow-500",
    colorDark: "bg-yellow-400",
    textColor: "text-yellow-700 dark:text-yellow-300",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/40",
    borderColor: "border-yellow-200 dark:border-yellow-800",
  },
  {
    id: "noshow",
    label: "No-show surprises",
    reviews2024_26: 4,
    reviewsAllYears: 4,
    helpfulVotes: 50,
    color: "bg-purple-500",
    colorDark: "bg-purple-400",
    textColor: "text-purple-700 dark:text-purple-300",
    bgColor: "bg-purple-50 dark:bg-purple-950/40",
    borderColor: "border-purple-200 dark:border-purple-800",
  },
  {
    id: "login",
    label: "Login, OTP, forced logout",
    reviews2024_26: 3,
    reviewsAllYears: 4,
    helpfulVotes: 72,
    color: "bg-blue-500",
    colorDark: "bg-blue-400",
    textColor: "text-blue-700 dark:text-blue-300",
    bgColor: "bg-blue-50 dark:bg-blue-950/40",
    borderColor: "border-blue-200 dark:border-blue-800",
  },
  {
    id: "notifications",
    label: "Notifications late or missing",
    reviews2024_26: 3,
    reviewsAllYears: 4,
    helpfulVotes: 47,
    color: "bg-cyan-500",
    colorDark: "bg-cyan-400",
    textColor: "text-cyan-700 dark:text-cyan-300",
    bgColor: "bg-cyan-50 dark:bg-cyan-950/40",
    borderColor: "border-cyan-200 dark:border-cyan-800",
  },
  {
    id: "support",
    label: "Support or helpdesk unreachable",
    reviews2024_26: 3,
    reviewsAllYears: 8,
    helpfulVotes: 76,
    color: "bg-teal-500",
    colorDark: "bg-teal-400",
    textColor: "text-teal-700 dark:text-teal-300",
    bgColor: "bg-teal-50 dark:bg-teal-950/40",
    borderColor: "border-teal-200 dark:border-teal-800",
  },
  {
    id: "driver",
    label: "Cannot reach the driver",
    reviews2024_26: 2,
    reviewsAllYears: 5,
    helpfulVotes: 90,
    color: "bg-indigo-500",
    colorDark: "bg-indigo-400",
    textColor: "text-indigo-700 dark:text-indigo-300",
    bgColor: "bg-indigo-50 dark:bg-indigo-950/40",
    borderColor: "border-indigo-200 dark:border-indigo-800",
  },
];

// ─── Roadmap Cards ─────────────────────────────────────────────────────────────
export const ROADMAP_ITEMS = [
  {
    id: "rm-1",
    title: `Make "where is my cab" trustworthy in the pickup window`,
    priority: "P0",
    themes: ["tracking", "driver"],
    evidence: `Tracking ETA is wrong tied for the most cited complaint (7 of 22 recent, 331 helpful votes). Reviews describe the map freezing, ETA jumping by 20+ min seconds before pickup, and drivers calling from a different location entirely.`,
    whatToBuild: [
      `Stream driver GPS at 10 s intervals during last 2 km and the 15 min before ETA.`,
      `Add a "Location updated X s ago" indicator that turns amber >30 s and red >60 s.`,
      `Surface driver call and helpdesk CTA on the active-trip card without leaving the map screen.`,
      `Fallback: if GPS stale >90 s, auto-show a "We lost the driver location — tap to call" banner.`,
    ],
    howToMeasure: `ETA accuracy within 3 min at 15 min out (P90). Stale-location events < 5 % of trips.`,
    relatedFix: 1,
  },
  {
    id: "rm-2",
    title: "Stop shipping regressions",
    priority: "P0",
    themes: ["crashes", "login"],
    evidence: `"Crashes, slow loads, app will not open" tied at 7 of 22 recent reviews. Multiple reviews mention bugs introduced by updates — the app worked fine until the last release.`,
    whatToBuild: [
      `Add a crash-rate gate to CI: block release if crash-free sessions < 99.5 %.`,
      `Automated smoke tests for: launch, login, cab booking, OTP entry, active-trip map.`,
      `Canary rollout at 5 % to 20 % to 100 % with auto-rollback on crash spike.`,
      `In-app forced-update flow that shows release notes before update prompt.`,
    ],
    howToMeasure: `Crash-free sessions at or above 99.5 %. Forced logouts during active trips = 0. Play Store 1-star crash spike at or below 1 % of new reviews post-release.`,
    relatedFix: 2,
  },
  {
    id: "rm-3",
    title: "Never lock someone out while a cab is waiting",
    priority: "P1",
    themes: ["login", "booking"],
    evidence: `Login, OTP, forced logout: 3 of 22 recent. Reviews describe being logged out mid-trip, OTP not arriving for 5+ min, and company policy silently disabling the app. The pickup context makes this catastrophic.`,
    whatToBuild: [
      `Extend session tokens for at least the active-trip duration; never expire during a trip.`,
      `OTP fallback: if SMS fails >60 s, auto-offer WhatsApp or email OTP.`,
      `When a company policy disables a feature, show "Disabled by your company" + "Message transport desk" button with a pre-filled message.`,
      `Guest-light mode: show booked-cab details (vehicle, OTP) without requiring re-login.`,
    ],
    howToMeasure: `Zero forced logouts during active trips. OTP delivery < 30 s (P95). "Company disabled" bounce rate drops to < 1 %.`,
    relatedFix: 3,
  },
  {
    id: "rm-4",
    title: "Remove the surprise from No-show",
    priority: "P1",
    themes: ["noshow", "notifications"],
    evidence: `No-show surprises: 4 of 22 recent. Reviewers describe being fined or marked absent with no warning, often because a notification never arrived or was received after the cab left.`,
    whatToBuild: [
      `Push + in-app "Cab arriving in 5 min" with deep link to trip screen.`,
      `"Confirm boarding or tell us you are late" prompt 1 min after ETA.`,
      `If no boarding confirmation, delay no-show mark for 3 min and call driver.`,
      `No-show dispute flow in-app: one tap, photo optional, resolved in 4 h or less.`,
    ],
    howToMeasure: `No-show disputes per 1,000 trips. Notification delivery rate at or above 99 %. Boarding confirmation rate above 80 %.`,
    relatedFix: 4,
  },
  {
    id: "rm-5",
    title: "Show company-set rules, and answer people",
    priority: "P2",
    themes: ["support", "booking", "noshow"],
    evidence: `Support or helpdesk unreachable: 3 of 22 recent, 8 of 40 all years. Reviews mention being unable to cancel a late cab, not knowing who to call, and receiving no reply to 1-star reviews.`,
    whatToBuild: [
      `Help centre tab: search company-specific rules (pickup window, cancellation policy).`,
      `In-app chat widget connected to transport desk (not generic bot).`,
      `Reply queue dashboard for transport coordinators to respond to Play Store reviews.`,
      `Reply within 72 h target: template system for common complaints (see Reply Helper).`,
    ],
    howToMeasure: `Play Store reply rate within 72 h at or above 80 %. Support ticket close time P90 at or below 4 h. Review rating improvement after coordinated reply campaign.`,
    relatedFix: 5,
  },
];

// ─── Sample Reviews ────────────────────────────────────────────────────────────
export const SAMPLE_REVIEWS = [
  {
    id: "r-001",
    date: "2026-03-12",
    stars: 1,
    helpfulVotes: 47,
    themes: ["tracking", "driver"],
    text: `The cab location was frozen on the map for the entire last 10 minutes of the journey. I had no idea where the driver was and couldn't call him because the call button was greyed out. Ended up standing in the rain for 25 extra minutes. Totally unacceptable for a work commute app.`,
    year: 2026,
  },
  {
    id: "r-002",
    date: "2026-01-08",
    stars: 1,
    helpfulVotes: 38,
    themes: ["crashes"],
    text: `After the January update the app just crashes on startup every single time. Reinstalled three times, cleared cache, nothing works. My colleagues are facing the same issue. We're missing our cabs because the app won't open. Please roll back the update.`,
    year: 2026,
  },
  {
    id: "r-003",
    date: "2025-11-20",
    stars: 2,
    helpfulVotes: 29,
    themes: ["login"],
    text: `Got logged out while my cab was literally outside waiting. The OTP took 8 minutes to arrive via SMS. By the time I got back in the app the driver had marked me no-show. Lost half a day's worth of taxi credits because of a bug.`,
    year: 2025,
  },
  {
    id: "r-004",
    date: "2025-09-05",
    stars: 1,
    helpfulVotes: 55,
    themes: ["noshow", "notifications"],
    text: `Marked as no-show but I was waiting at the pickup point for 20 minutes. Got zero notification that the cab had arrived. No warning, no call from driver, just a fine on my account. This has happened three times now and support is completely unreachable.`,
    year: 2025,
  },
  {
    id: "r-005",
    date: "2025-07-14",
    stars: 2,
    helpfulVotes: 22,
    themes: ["booking", "support"],
    text: `The booking screen is impossible to navigate. Half the buttons are greyed out with no explanation. When I asked support why I can't book return trips, they said "contact your company admin" but gave me no admin details. The app shows rules set by company but doesn't tell you what those rules are.`,
    year: 2025,
  },
  {
    id: "r-006",
    date: "2025-04-02",
    stars: 1,
    helpfulVotes: 41,
    themes: ["tracking"],
    text: `ETA said 3 minutes for the last 20 minutes of the journey. The driver called me from an entirely different road. The in-app map was completely wrong. I nearly missed an important client meeting. How is this possible in 2025?`,
    year: 2025,
  },
  {
    id: "r-007",
    date: "2024-12-18",
    stars: 2,
    helpfulVotes: 31,
    themes: ["driver", "support"],
    text: `The call driver button never works when I need it most — right before pickup. It just opens a loading spinner that never resolves. Have to use my personal number to call the driver which defeats the whole purpose of the app.`,
    year: 2024,
  },
  {
    id: "r-008",
    date: "2024-10-07",
    stars: 1,
    helpfulVotes: 63,
    themes: ["crashes", "login"],
    text: `Two problems in one update: (1) app crashes every time I switch from map to booking tab, (2) the app randomly logs me out. On a Monday morning this combo meant I missed my cab entirely. My IT team says it's a known bug with no fix date.`,
    year: 2024,
  },
  {
    id: "r-009",
    date: "2024-08-22",
    stars: 3,
    helpfulVotes: 15,
    themes: ["booking"],
    text: `App is okay but the booking flow is confusing. There are three different screens to confirm a ride and it's unclear which one is final. I've accidentally cancelled rides by pressing what I thought was a "back" button. Needs a cleaner UX.`,
    year: 2024,
  },
  {
    id: "r-010",
    date: "2024-06-11",
    stars: 1,
    helpfulVotes: 28,
    themes: ["notifications", "noshow"],
    text: `Cab arrived and I never got a single notification. No push, no SMS, nothing. Looked up from my desk 5 minutes later and saw the driver had already left and I was marked no-show. This app is worse than no app at all.`,
    year: 2024,
  },
  {
    id: "r-011",
    date: "2024-03-30",
    stars: 2,
    helpfulVotes: 19,
    themes: ["support"],
    text: `Tried to reach the helpdesk after a billing dispute. The in-app chat shows a bot that can only answer FAQs. The email listed in the app bounces. The phone number rings forever. There is literally no way to talk to a human. Shocking.`,
    year: 2024,
  },
  {
    id: "r-012",
    date: "2023-11-05",
    stars: 1,
    helpfulVotes: 44,
    themes: ["tracking", "driver"],
    text: `Tracking is a joke. Driver location jumps around the city randomly. Showed him 1 km away for 15 minutes then suddenly he was behind me. He had been there the whole time. I waved down a random car thinking it was mine. App is deeply unreliable.`,
    year: 2023,
  },
  {
    id: "r-013",
    date: "2023-08-14",
    stars: 2,
    helpfulVotes: 17,
    themes: ["login"],
    text: `Every time my phone restarts I have to log in again and the OTP never arrives in under 3 minutes. For a cab app where timing is everything this is a critical flaw. Should at least keep me logged in on a trusted device.`,
    year: 2023,
  },
  {
    id: "r-014",
    date: "2023-05-22",
    stars: 1,
    helpfulVotes: 36,
    themes: ["crashes"],
    text: `The app loads a blank white screen. Has been like this for 4 days. Tried on two different phones, same issue. My whole team is unable to use it. This is embarrassing for a corporate transport solution.`,
    year: 2023,
  },
  {
    id: "r-015",
    date: "2022-12-01",
    stars: 1,
    helpfulVotes: 52,
    themes: ["booking", "support"],
    text: `Company admin set some restriction that prevents me from booking cabs after 9 PM. Fine, but the app just shows an error with no explanation. I had no idea why it wasn't working until a colleague told me about the restriction. Why can't the app just say that?`,
    year: 2022,
  },
];

// ─── Reply Templates ────────────────────────────────────────────────────────────
export const REPLY_TEMPLATES = {
  tracking: {
    theme: "Tracking, ETA or pickup time wrong",
    template: `Hi [Reviewer name],

Thank you for taking the time to share this — we're sorry the live tracking let you down at exactly the moment it mattered most.

What we know: GPS location updates can stale during heavy network congestion, and our ETA model doesn't always account for last-minute route changes by the driver.

What we're doing: We are rolling out sub-10-second GPS refresh during the final 2 km and adding a visible "location updated X seconds ago" indicator so you can see immediately when tracking has fallen behind. We're also building an automatic fallback that surfaces the driver's direct number the moment location goes stale for more than 90 seconds.

Until that update reaches your device: if tracking freezes, tap [Driver Name] → Call in the trip screen, or contact your transport desk at [Transport Desk Number / transport@company.com].

We'd like to make this right — could you DM us your trip date and time so we can investigate the specific segment?

– MoveInSync Product Team`,
  },
  crashes: {
    theme: "Crashes, slow loads, app will not open",
    template: `Hi [Reviewer name],

We're really sorry — an app that crashes before your cab arrives is worse than no app at all, and we take that seriously.

What we know: A regression introduced in v[X.X] causes a crash on startup for some devices running Android [version]. Our engineering team has reproduced and fixed the issue.

What we're doing: v[X.X.1] with the fix is in review on the Play Store and should reach you within 48 hours. We've also added a crash-rate gate to our release pipeline so this class of regression is automatically blocked from shipping.

Immediate workaround: Force-stop the app, clear cache (Settings → Apps → MoveInSync → Clear Cache), then reopen. If the crash persists, please send your Android version and device model to [support email] and we'll escalate.

Thank you for flagging this — your review helped us catch it faster.

– MoveInSync Product Team`,
  },
  booking: {
    theme: "Booking and screen confusion",
    template: `Hi [Reviewer name],

Thank you for the honest feedback — a confusing booking flow is a design failure on our part, not a user error.

What we know: Multiple steps in the booking confirmation flow use similar button labels, making it easy to accidentally cancel rather than confirm a ride.

What we're doing: We are redesigning the confirmation screens to use distinct labels ("Confirm Ride" vs "Cancel"), adding a 5-second undo window after cancellation, and showing company-set restrictions inline with a plain-English explanation instead of a generic error code.

In the meantime, the safest path is: tap "Book" → wait for the green confirmation banner → screenshot it as proof. If you accidentally cancelled, your transport desk can usually reverse a same-day cancellation: [Transport Desk Number].

We'd love to learn more about which specific step confused you — a reply here or a DM would help us prioritise the right fix.

– MoveInSync Product Team`,
  },
  noshow: {
    theme: "No-show surprises",
    template: `Hi [Reviewer name],

We're sorry you were penalised for a no-show when you were ready and waiting — that's a failure of our notification and confirmation system, not yours.

What we know: Push notifications can be delayed by device battery-optimisation settings, and we currently mark no-show too quickly without confirmation from the rider.

What we're doing: We are adding a boarding confirmation prompt 1 minute after ETA ("Confirm boarding or tell us you're running late"), delaying the no-show mark by 3 minutes, and building a one-tap dispute flow so you can challenge a no-show directly in the app within 15 minutes.

To dispute this no-show now: contact your transport desk at [Transport Desk Number / transport@company.com] with your trip date and time — they can reverse the penalty. We'll follow up within 4 hours on working days.

Thank you for the detailed report; it's directly shaping the fix we're shipping.

– MoveInSync Product Team`,
  },
  login: {
    theme: "Login, OTP, forced logout",
    template: `Hi [Reviewer name],

Being logged out while your cab is outside is one of the worst experiences our app can create — we're sorry this happened to you.

What we know: Session tokens expire on a fixed schedule that doesn't account for whether a trip is in progress. OTP delivery via SMS can lag 3–8 minutes on some carrier routes.

What we're doing: We are extending session tokens for the full duration of any active trip (no mid-trip logouts), adding WhatsApp and email as OTP fallbacks when SMS takes more than 60 seconds, and building a lightweight view of your booked-cab details that stays accessible even without re-authentication.

Until those changes ship: if you're locked out with a cab waiting, call your transport desk at [Transport Desk Number] — they can confirm the OTP over the phone.

Please DM us your trip ID so we can investigate whether the no-show mark can be reversed.

– MoveInSync Product Team`,
  },
  notifications: {
    theme: "Notifications late or missing",
    template: `Hi [Reviewer name],

A missing arrival notification is a silent failure — you don't know it happened until it's too late. We're sorry the system let you down.

What we know: Android battery optimisation and some OEM "battery saver" modes kill background processes that deliver our push notifications. We also don't have a fallback for when push fails.

What we're doing: We are adding an SMS fallback for cab-arriving notifications (sent when push has not been opened in 60 seconds), building an in-app notification log so you can always check the timeline, and adding a setup wizard that requests the correct notification permissions on first launch.

Quick fix: go to Settings → Apps → MoveInSync → Battery → set to "Unrestricted". Also turn off any battery-saver mode from your phone manufacturer's settings.

Thank you for reporting this — each data point helps us build the fallback system correctly.

– MoveInSync Product Team`,
  },
  support: {
    theme: "Support or helpdesk unreachable",
    template: `Hi [Reviewer name],

"No way to reach a human" is a product failure, not a process gap — we hear you and we're sorry.

What we know: Our in-app chat currently routes to a limited FAQ bot, and the contact details listed in some versions of the app are outdated.

What we're doing: We are replacing the bot with a direct link to your company's transport desk (with your company name pre-filled), adding a reply-within-4-hours SLA for in-app tickets, and publishing updated contact information in the Help section.

Right now, your fastest route to a human is: [Transport Desk Number] (weekdays 7 AM – 9 PM) or [transport@company.com]. Quote your trip ID in the subject line for fastest resolution.

We will follow up on your specific issue — could you share your trip date or account email via DM?

– MoveInSync Product Team`,
  },
  driver: {
    theme: "Cannot reach the driver",
    template: `Hi [Reviewer name],

The "call driver" button failing right before pickup is about the worst time for a technical glitch. We're sorry this happened.

What we know: The masked-call bridging service occasionally times out under high concurrent load (especially peak morning hours), causing the call button to show a spinner that never resolves.

What we're doing: We are adding a retry mechanism with direct dial as fallback (after 3 failed bridge attempts), increasing bridge capacity for morning and evening peak hours, and ensuring the driver's masked number is always visible as a tap-to-call link even if the bridge fails.

Immediate workaround: tap the three-dot menu → "Trip details" → you'll see an alternate contact option. Or contact your transport desk at [Transport Desk Number] and they can patch you through.

Thank you for the specific detail in your review — it pinpointed exactly which part of the call flow was breaking.

– MoveInSync Product Team`,
  },
};

// ─── Metrics defaults ──────────────────────────────────────────────────────────
export const DEFAULT_METRICS = [
  {
    id: "m-1",
    label: "ETA accuracy within 3 min at 15 min out",
    unit: "%",
    target: "90",
    description: "Percentage of trips where predicted ETA at T-15 min is within 3 min of actual arrival.",
  },
  {
    id: "m-2",
    label: "Forced logouts during active trips",
    unit: "count",
    target: "0",
    description: "Any session expiry or forced re-authentication while a trip is in progress. Target is absolute zero.",
  },
  {
    id: "m-3",
    label: "No-show disputes per 1,000 trips",
    unit: "per 1K",
    target: "5",
    description: "Number of no-show marks contested by riders, per 1,000 completed trips.",
  },
  {
    id: "m-4",
    label: "Reply rate to 1-2 star reviews within 72 h",
    unit: "%",
    target: "80",
    description: "Percentage of 1-star and 2-star Play Store reviews that receive a public reply within 72 hours of posting.",
  },
  {
    id: "m-5",
    label: "Crash-free sessions",
    unit: "%",
    target: "99.5",
    description: "Sessions that complete without a crash or ANR. Gate this in CI to block a release that falls below target.",
  },
  {
    id: "m-6",
    label: "OTP delivery time P95",
    unit: "seconds",
    target: "30",
    description: "95th percentile time from OTP request to SMS delivery. Trigger WhatsApp or email fallback if this is breached.",
  },
];
