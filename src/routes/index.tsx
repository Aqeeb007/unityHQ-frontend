// no public routes here; only protected routes

import { RootLayout } from "@/components/layout";

export const routes = [
  {
    path: "/dashboard",
    element: (
      <RootLayout>
        <div>Dashboard</div>
      </RootLayout>
    ),
  },
  {
    path: "/workspaces",
    element: (
      <RootLayout>
        <div>Workspaces</div>
      </RootLayout>
    ),
  },
  {
    path: "/settings",
    element: (
      <RootLayout>
        <div>Settings</div>
      </RootLayout>
    ),
  },
];
