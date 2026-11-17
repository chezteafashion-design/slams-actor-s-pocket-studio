import { createFileRoute } from "@tanstack/react-router";
import { profileQuery, settingsQuery } from "@/features/account/queries";
import { OfficeDesk } from "@/features/office/OfficeDesk";

export const Route = createFileRoute("/_authenticated/")({
  head: () => ({
    meta: [
      { title: "The Office — SLAMS, The Actor's Pocket Studio" },
      { name: "description", content: "Step into the coach's office: train in eight acting schools, rehearse living scenes, prepare for work and get unstuck." },
      { property: "og:title", content: "The Office — SLAMS, The Actor's Pocket Studio" },
      { property: "og:description", content: "mrahmostudios presents SLAMS. Train, rehearse, work and get unstuck — with a coach who is not your cheerleader." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  loader: ({ context }) =>
    Promise.all([
      context.queryClient.ensureQueryData(profileQuery(context.user.id)),
      context.queryClient.ensureQueryData(settingsQuery(context.user.id)),
    ]),
  component: OfficePage,
});

function OfficePage() {
  const { user } = Route.useRouteContext();
  return <OfficeDesk userId={user.id} />;
}
