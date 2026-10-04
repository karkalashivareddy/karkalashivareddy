# Profile design system

## Design philosophy

Present the profile as an engineering control room: a calm, graphite workspace where system boundaries, data flow, project scope, and evidence are easier to scan than decorative effects. Visuals explain how a project is connected; project text states what is implemented and where its limits are.

The visual standard is restraint and clarity. The reference review looked at [Sreekar Reddy's profile](https://github.com/esreekarreddy/esreekarreddy) and [br413's engineering profile](https://github.com/br413/br413) for concise identity, project prioritization, source paths, and architecture as evidence. GitHub's [profile guidance](https://docs.github.com/en/account-and-profile/tutorials/using-your-github-profile-to-enhance-your-resume) reinforces concise project overviews and discoverable repository links. These references informed the information hierarchy only; their wording, layout, and visual assets are not reused. Generic badge walls, live counters, and templates were excluded.

## Information architecture

1. Custom identity hero and primary navigation
2. Engineering identity and working principles
3. Three flagship systems in descending signal order
4. Product/data work and clearly labeled coursework
5. Algorithm practice
6. Evidence-backed engineering stack
7. Learning direction
8. Contact links and closing visual

The first scan should answer who Shiva is and what his strongest systems are. Deeper readers can follow source and architecture links into project repositories.

## Visual tokens

| Token | Value | Use |
| --- | --- | --- |
| Graphite / base | `#070A0F` | Main SVG background |
| Graphite / panel | `#0B1017` | Hero and footer panels |
| Graphite / raised | `#10161F` | Diagram nodes |
| Steel / border | `#253140` | Dividers and node outlines |
| Steel / text | `#A9B7C8` | Supporting copy |
| Ice / primary | `#E6F3FA` | Main labels and identity |
| Cyan / active | `#22D3EE` | Data flow and emphasis |
| Violet / secondary | `#A78BFA` | Algorithm/ML accents only |
| Green / semantic | `#22C55E` | Verified paths and success only |
| Amber / semantic | `#F59E0B` | Events/signals only |

Dominant palette is graphite, steel, and cyan. Each project diagram uses only the semantic accents needed by its domain.

## Typography, spacing, and borders

SVG assets specify `Inter, Segoe UI, Arial, sans-serif` with `IBM Plex Mono, SFMono-Regular, Consolas, monospace` for IDs and micro-labels. README body uses native GitHub Markdown typography. SVG layouts use consistent insets, clear heading/body contrast, 1px steel borders, and rounded corners sparingly. No externally hosted fonts are required.

## Asset map

| Path | Purpose |
| --- | --- |
| `assets/hero/engineering-hero.svg` | Responsive identity and domain map |
| `assets/projects/caps-system-map.svg` | Process engine to event/API to observatory |
| `assets/projects/forgesense-industrial-map.svg` | Synthetic telemetry, services, storage, ML, views |
| `assets/projects/loginsight-algorithm-flow.svg` | Dataset, executable analysis, trace, interface |
| `assets/projects/pharmastock-data-flow.svg` | React client, transaction API, and MongoDB replica-set boundary |
| `assets/projects/portfolio-interface.svg` | Portfolio routes, typed content, and integrations |
| `assets/footer/engineering-footer.svg` | Quiet closing mark and build loop |

All SVGs are self-contained, share the same tokens, and use a `viewBox` so Markdown display can scale them to available width.

## Project hierarchy

- **Tier 1 / Flagship engineering:** CAPS, ForgeSense, LogInsight.
- **Tier 2 / Product and data engineering:** PharmaStock, personal portfolio.
- **Tier 3 / Coursework and practice:** OSSP, DSA2, Hospital Bed Dashboard, Timetable Generator, FWD.

The first project is an implemented process observatory; the similarly named GitHub repository must be used as the source link. It is no longer described as only an abstract. Its procfs sampling is scoped to a tracked child; the profile does not imply descendant-process observation.

## Animation and GitHub constraints

The profile uses static SVG diagrams. GitHub documents that SVGs render but do not support inline scripting or animation in this context, so no motion is needed for the essential narrative. Motion would add compatibility and accessibility uncertainty without improving the evidence. No scripts, iframes, remote font dependencies, counters, or tracking images are used.

## Accessibility

- Each diagram is accompanied by descriptive Markdown alt text.
- Key facts remain in Markdown if images are unavailable.
- Meaning is conveyed with labels and flow direction as well as color.
- Text contrast is high against the dark SVG panels.
- Diagrams avoid tiny terminal-like copy and decorative animation.

## Performance

Seven small hand-authored SVG files are referenced once each. They contain no embedded bitmap, external resource, filter-heavy effects, or runtime dependencies. Markdown remains readable without the graphics.

## GitHub rendering limits

GitHub sanitizes rendered Markdown and does not provide a general web runtime. SVG sizing is controlled through the responsive `viewBox` and width attribute; arbitrary CSS breakpoints and scripts are not relied upon. Native Markdown anchors and repository paths are used for navigation.

## Content truth policy

Describe only work supported by the current project repositories. Distinguish working code from prototypes, simulations, and coursework. Never infer deployment, production data, test totals, coverage, adoption, performance, or expertise from a technology name. If the project documentation identifies a limit, the profile preserves that limit.
