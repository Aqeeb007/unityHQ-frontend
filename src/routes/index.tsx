// no public routes here; only protected routes

import { RootLayout } from "@/components/layout";

export const routes = [
  {
    path: "/:workspaceId/dashboard",
    element: (
      <RootLayout>
        <div>Dashboard</div>
      </RootLayout>
    ),
  },
  {
    path: "/:workspaceId/workspaces",
    element: (
      <RootLayout>
        <div>Workspaces</div>
      </RootLayout>
    ),
  },
  {
    path: "/:workspaceId/settings",
    element: (
      <RootLayout>
        <div>Settings</div>
      </RootLayout>
    ),
  },
];
