import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { SCHOOLS } from "@/domain/constitution";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches the public Conservatory directory and every registered school shell", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    expect(router.matchRoutes("/schools").at(-1)?.routeId).not.toBe(rootRouteId);
    for (const school of SCHOOLS) {
      expect(router.matchRoutes(`/schools/${school.slug}`).at(-1)?.routeId).not.toBe(rootRouteId);
    }
  });
});
