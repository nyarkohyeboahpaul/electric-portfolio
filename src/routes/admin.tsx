import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin")({
  // Marker route so /admin/* children resolve. Each child page guards itself
  // via AdminGate (client-side) so SSR/build remains static.
  component: () => <Outlet />,
  // Redirect bare /admin handled by /admin/index.tsx
});
