import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { SCHOOLS } from "@/domain/constitution";
import { StatusBadge } from "@/components/slams/StatusBadge";
import { getPage } from "@/domain/constitution";

const directoryStatus = getPage("conservatory")?.status ?? "planned";

export function SchoolDirectory() {
  const [query, setQuery] = useState("");
  const visibleSchools = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase();
    if (!normalized) return SCHOOLS;
    return SCHOOLS.filter((school) =>
      `${school.name} ${school.focus}`.toLocaleLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <div className="space-y-5">
      <div className="space-y-3">
        <StatusBadge status={directoryStatus}>Phase 2 · in development</StatusBadge>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Eight distinct approaches to the actor&apos;s craft. Explore each school&apos;s focus;
          curriculum and progression will open as they are authored and verified.
        </p>
      </div>

      <label className="relative block">
        <span className="sr-only">Search schools by name or focus</span>
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          placeholder="Find a school or area of focus"
          className="min-h-11 w-full rounded-md border border-border bg-secondary/40 py-2 pl-10 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-ring"
        />
      </label>

      <p className="font-label text-[11px] text-muted-foreground" aria-live="polite">
        {visibleSchools.length} of {SCHOOLS.length} schools
      </p>

      {visibleSchools.length > 0 ? (
        <ol className="grid gap-3">
          {visibleSchools.map((school) => (
            <li key={school.slug}>
              <Link
                to="/schools/$schoolSlug"
                params={{ schoolSlug: school.slug }}
                className="group flex min-h-28 items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-brass/60 hover:bg-secondary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Explore ${school.name}: ${school.focus}`}
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-sm border border-brass/50 bg-brass/10 font-label text-sm text-brass">
                  {String(school.order).padStart(2, "0")}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="font-display text-xl leading-tight text-foreground group-hover:text-brass">
                    {school.name}
                  </span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                    {school.focus}
                  </span>
                </span>
                <span className="sr-only">Open school overview</span>
              </Link>
            </li>
          ))}
        </ol>
      ) : (
        <div className="rounded-lg border border-dashed border-border px-4 py-6 text-center">
          <p className="font-display text-xl text-foreground">No school matches that search</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try a technique, school name, or a broader term.
          </p>
        </div>
      )}

      <p className="border-t border-border pt-4 text-xs leading-relaxed text-muted-foreground">
        SLAMS is an independent training project. School names identify acting approaches and do not
        imply endorsement or affiliation.
      </p>
    </div>
  );
}
