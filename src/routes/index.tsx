// no public routes here; only protected routes

import { RootLayout } from "@/components/layout";
import WorkspacePage from "@/features/workspaces/pages/workspace";

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
        <WorkspacePage />
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
