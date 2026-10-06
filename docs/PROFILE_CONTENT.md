# Profile content source of truth

## Identity

- Name: Karkala Shiva Reddy
- Short name: Shiva
- Academic identity: B.Tech Computer Science Engineering student
- Institution: KL University / Koneru Lakshmaiah Education Foundation
- Expected graduation: 2029
- Primary emphasis: Java, algorithms, systems programming, backend engineering, database engineering, distributed/real-time foundations, and applied ML

## Primary links

| Destination | URL | Verification state |
| --- | --- | --- |
| GitHub | <https://github.com/karkalashivareddy> | Public profile opened; all project repository destinations in the README returned matching canonical URLs from GitHub's API |
| LinkedIn | <https://www.linkedin.com/in/shiva-reddy-karkala-1a66b4397/> | LinkedIn returns HTTP 999 to automated requests, so reachability could not be confirmed by fetch; supplied URL retained |
| Codolio | <https://codolio.com/profile/2520030105> | Reachable (HTTP 200) on 2026-10-06 |
| Portfolio site | <https://portfolio-shiva-c677.vercel.app> | **Not public.** A direct fetch on 2026-10-06 returned HTTP 302 to `vercel.com/sso-api`, i.e. the deployment is behind Vercel single sign-on. It is therefore removed from the public profile and the repository is the only linked path. |
| Email | <mailto:karkalashivareddy@gmail.com> | Supplied public contact address |

### Coding profiles

These destinations are supplied by the account holder and are used in the README's algorithm-practice
links. Reachability as of 2026-10-06: CodeChef, GeeksforGeeks and HackerRank returned HTTP 200.
LeetCode and Codeforces returned HTTP 403 to an automated request, which is bot protection rather than a
definitive answer about the profile. No ratings, problem counts, or activity figures are claimed for any
of them.

| Platform | URL |
| --- | --- |
| LeetCode | <https://leetcode.com/u/KarkalaShivaReddy/> |
| CodeChef | <https://www.codechef.com/users/shivareddy_27> |
| Codeforces | <https://codeforces.com/profile/shiva_reddy_27> |
| GeeksforGeeks | <https://www.geeksforgeeks.org/user/shiva0327/> |
| HackerRank | <https://www.hackerrank.com/profile/karkalashivareddy> |

## Repository evidence and hierarchy

### Tier 1 — flagship engineering

1. **Command-Argument-Passing-System (CAPS):** implemented C11/POSIX process execution engine with a Fastify gateway and React observatory; the system exposes real child-process events, procfs measurements, signal controls, and replay. PID identity is guarded by kernel start time, and sampling is scoped to one tracked child rather than its descendants. Source, tests, web application, docs, and CI exist in the current checkout.
2. **ForgeSense Industrial Intelligence:** Spring Boot and FastAPI/scikit-learn services, synthetic telemetry producer, digital-twin/operations features, and Compose integration points for Kafka, PostgreSQL, Redis, Prometheus, and Grafana. The repository documents tests/CI and states that telemetry is synthetic and the project is not a production deployment.
3. **LogInsight Analyzer:** Java/Spring Boot algorithm service and React/TypeScript frontend; sample log inputs, analytics, selected trace playback, and benchmark views. The README documents backend verification and frontend build workflows, and says runtime data is in-memory with no database. Test counts are published here and in the project README because both were produced by running the suites, and each is re-checked by that repository's CI.

### Tier 2 — product and data engineering

- **PharmaStock / Database Systems:** React/Vite client plus an Express/Mongoose API over MongoDB replica-set transactions. Documented flows include FEFO allocation, API-side RBAC, purchase/sale/refund/adjustment workflows, and an audit trail. The project README describes unit/API/transaction tests, database verification, browser E2E, and CI. It documents demo authentication/storage limitations and replica-set requirements.
- **Portfolio:** Next.js/TypeScript application with typed project data, a Three.js/React Three Fiber scene, interaction and navigation components, and GitHub/Codolio links. The repository is the linked path for it; the previously supplied Vercel URL sits behind single sign-on and is not publicly reachable.

### Tier 3 — coursework and practice

- **OSSP:** C/Linux coursework with a mini shell and process/signal/IPC/file exercises. It is a collection, not a production shell.
- **DSA2:** Java AVL insertion, a linear product range scan, and matrix-based Prim MST. The warehouse folder does not contain a B+ tree implementation.
- **Hospital Bed Dashboard:** Express/MySQL static dashboard supports occupancy flows; the separate React prototype uses local/mock data.
- **Timetable Generator:** Python heuristic schedule generator with conflict checks and an optional validator; not an optimal solver.
- **FWD:** frontend and Java gate-pass coursework; authentication uses demo data and storage is local/file-based.

## Verified technology inventory

These technologies are evidenced in selected repositories: Java, C, Python, JavaScript, TypeScript, SQL; React, Next.js, Vite, Three.js; Spring Boot, FastAPI, Node.js, Express; REST, Server-Sent Events, WebSockets; MongoDB, PostgreSQL, MySQL, SQLite, Redis, Kafka; Linux/POSIX process APIs, signals, IPC, `/proc`; scikit-learn; Docker Compose, Maven, npm, GitHub Actions, JUnit, pytest, Node's test runner, browser E2E, Prometheus, and Grafana.

The profile does not imply expert proficiency. It states repository use and areas being deepened.

## Learning and engineering direction

The README describes ongoing direction as deeper backend design, testing, databases, observability, and exploration of distributed systems and applied ML in software systems. It does not present this as a live progress feed or claim those subjects are complete.

## Claims intentionally excluded

- Coverage percentages, and any performance figure not reproduced by a committed benchmark.
- Current contest ratings, platform problem counts, contribution streaks, repository counts, or GitHub statistics.
- Production users, deployments, scale, industrial/live data, model accuracy, or measured performance.
- Claim that PharmaStock has production deployment or production users.
- Claim that the Command Argument Passing System is only a plan or abstract.
- Expertise, mastery, or professional experience claims.
- Real-time `currently building` status that cannot be established from source control.

### Test counts are the one exception, and why

The README publishes suite sizes (C assertions, backend tests, frontend tests, E2E checks) for the four
flagship projects. These are included deliberately: each number came from executing that repository's own
test command, and each repository's CI re-runs the same suite on every push, so the claim is reproducible
rather than asserted. `scripts/validate-profile.mjs` therefore allows test counts while continuing to block
adoption counts, ratings, and accuracy or coverage percentages, which cannot be reproduced by running code.

## Pin recommendation

**Current pins (checked via the GitHub GraphQL API on 2026-10-06), in order:**
ForgeSense, LogInsight Analyzer, portfolio, PharmaStock / Database Systems, OSSP, DSA2.

CAPS is not currently pinned, which is the one real gap: it is the strongest repository here and it is the
project a reviewer should meet first.

**Pins cannot be changed programmatically.** GitHub's GraphQL schema exposes `pinIssue`, `unpinIssue`,
`pinIssueComment` and `pinEnvironment`, but there is **no `pinItem` / `unpinItem` mutation for repository
pins**. Pinning a repository is a browser-authenticated profile action with no API surface, so the order
below has to be set by hand in GitHub profile settings.

Target order: **1. CAPS**, **2. ForgeSense**, **3. LogInsight Analyzer**, **4. PharmaStock**, and leave the
remaining slots empty or filled only if a repository adds comparable signal (portfolio and OSSP are the
current candidates).

The README does not depend on pinning to present the correct order: it lists CAPS, ForgeSense, LogInsight and
PharmaStock as the four flagship projects in that order, so a visitor reading the profile sees the intended
hierarchy regardless of the pin state.
