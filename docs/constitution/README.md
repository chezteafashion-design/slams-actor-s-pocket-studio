# SLAMS Constitution

**mrahmostudios presents — SLAMS, The Actor's Pocket Studio.**

This folder is the governing specification for SLAMS. Every implementation prompt must conform to it. Where a mockup and this constitution disagree, the constitution wins (see 01 §9).

| # | Document | Source |
| --- | --- | --- |
| 01 | [Product architecture](01-product-architecture.md) | Hand-written |
| 02 | [Route registry](02-route-registry.md) | Generated from `src/domain/constitution.ts` |
| 03 | [47-page functional coverage matrix](03-page-coverage-matrix.md) | Generated from `src/domain/constitution.ts` |
| 04 | [Component architecture](04-component-architecture.md) | Hand-written |
| 05 | [Data architecture](05-data-architecture.md) | Hand-written |
| 06 | [User journey map](06-user-journeys.md) | Hand-written |
| 07 | [Feature dependency map](07-feature-dependencies.md) | Hand-written |
| 08 | [Development roadmap](08-development-roadmap.md) | Hand-written |
| 09 | [Acceptance criteria](09-acceptance-criteria.md) | Hand-written |
| 10 | [Risk register](10-risk-register.md) | Hand-written |

To change pages, routes, systems or signature experiences: edit `src/domain/constitution.ts`, run `bun scripts/generate-constitution-docs.ts`, run `bunx vitest run`. The test suite fails if the generated documents drift from the registry.
