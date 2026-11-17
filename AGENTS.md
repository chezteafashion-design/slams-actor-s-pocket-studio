<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

## SLAMS project rules

- `src/domain/constitution.ts` is the single source of truth for pages, routes, nav tabs, schools, systems, engines, signature experiences, feature status and roadmap phases. Why: docs, nav, status UI and tests must never disagree.
- `docs/constitution/02-*.md` and `03-*.md` are generated: edit the registry, then run `bun scripts/generate-constitution-docs.ts`. A test fails when they drift. Why: the coverage matrix must match the code.
- Update a page's `status` in the registry when it ships; UI shows availability only via registry helpers (e.g. `availabilityOf`). Why: honest status is a product rule.
- Pure rules and engines live in `src/domain/` (no React, no I/O); feature UI in `src/features/<area>/`; SLAMS design-system components in `src/components/slams/`. Why: business logic stays testable and centralized.
- Curriculum and other authored content will be typed content-as-code in `src/content/` referenced by permanent IDs; user data lives in Lovable Cloud. Why: reviewable content, stable user history.
- The Office desk hotspots are % rectangles over the 941×1672 illustration in `src/features/office/desk.ts`; if the image changes, re-measure them. Why: positions are tied to that artwork.
- The app is dark-only; tokens and SLAMS utilities (`surface-paper`, `surface-brass`, `font-label`, `font-display`) live in `src/styles.css`. Why: one theatre-office design system.
