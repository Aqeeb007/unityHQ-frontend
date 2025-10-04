import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  useGetWorkspaces,
  type TWorkspaces,
} from "@/features/workspaces/api/useGetWorkspaces";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import {
  ChevronsUpDown,
  LayoutDashboard,
  Settings,
  Workflow,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarItem = {
  name: string;
  path: string;
  icon: LucideIcon;
};

const sidebarRoutes: SidebarItem[] = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Workspaces", path: "/workspaces", icon: Workflow },
  { name: "Settings", path: "/settings", icon: Settings },
];

export const Sidebar = () => {
  const { data: workspaces, isLoading: isLoadingWorkspaces } =
    useGetWorkspaces();
  return (
    <aside className="h-[calc(100vh-68px)] w-72 rounded-2xl border border-white/10 bg-[#0F172B] text-slate-300 shadow-xl">
      <div className="flex items-center gap-2 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex justify-between w-full">
            <div className="flex items-center justify-center">
              <Workflow className="mr-2 size-5" />
              {isLoadingWorkspaces
                ? "Loading..."
                : workspaces && workspaces.length > 0
                ? workspaces[0].name
                : "No Workspaces"}
            </div>
            <ChevronsUpDown className="ml-auto" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-64 bg-[#0F172B]">
            <DropdownMenuLabel>Workspaces</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {workspaces && workspaces.data.length > 0 ? (
              workspaces.data.map((workspace: TWorkspaces) => (
                <DropdownMenuItem key={workspace.id}>
                  {workspace.name}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem disabled>No Workspaces</DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <nav className="px-2">
        <ul className="space-y-1">
          {sidebarRoutes.map((route) => {
            const Icon = route.icon;
            return (
              <li key={route.name}>
                <NavLink
                  to={route.path}
                  className={({ isActive }) =>
                    cn(
                      "group flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors",
                      "hover:bg-white/5 hover:text-white",
                      isActive && "bg-white/10 text-white"
                    )
                  }
                >
                  <Icon className="size-5 shrink-0" strokeWidth={1.75} />
                  <span className="truncate">{route.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};
