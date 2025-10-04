import { useGetWorkspaces } from "../api/useGetWorkspaces";
import { WorkspaceCard } from "../components/WorkspaceCard";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import type { TWorkspaces } from "../api/useGetWorkspaces";
import { useModalStore } from "@/features/workspaces/stores";
import { CreateWorkSpaceModal } from "@/features/workspaces/components/createWorkSpaceModal";

const WorkspacePage = () => {
  const { data: workspaces, isLoading, error } = useGetWorkspaces();
  const [searchTerm, setSearchTerm] = useState("");
  const { openModal } = useModalStore();

  const filteredWorkspaces =
    workspaces?.data?.filter((workspace: TWorkspaces) =>
      workspace.name.toLowerCase().includes(searchTerm.toLowerCase())
    ) || [];

  const handleSelectWorkspace = (workspace: TWorkspaces) => {
    // Navigate to workspace or handle selection
    console.log("Selecting workspace:", workspace.id);
  };

  const handleEditWorkspace = (workspace: TWorkspaces) => {
    // Handle edit workspace
    console.log("Editing workspace:", workspace.id);
  };

  const handleDeleteWorkspace = (workspace: TWorkspaces) => {
    // Handle delete workspace
    console.log("Deleting workspace:", workspace.id);
  };

  if (error) {
    return (
      <div>
        <div className="text-center py-12">
          <h2 className="text-2xl font-semibold text-destructive mb-2">
            Error Loading Workspaces
          </h2>
          <p className="text-muted-foreground">
            There was an error loading your workspaces. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Workspaces</h1>
          <p className="text-muted-foreground">
            Manage and organize your projects and teams
          </p>
        </div>
        <Button onClick={openModal}>
          <Plus className="h-4 w-4 mr-2" />
          Create Workspace
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search workspaces..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="h-48 bg-card border rounded-xl animate-pulse"
            />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && filteredWorkspaces.length === 0 && !searchTerm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Plus className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No workspaces yet</h2>
          <p className="text-muted-foreground mb-6 max-w-md mx-auto">
            Get started by creating your first workspace to organize your
            projects and collaborate with your team.
          </p>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Your First Workspace
          </Button>
        </div>
      )}

      {/* No Search Results */}
      {!isLoading && filteredWorkspaces.length === 0 && searchTerm && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
            <Search className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">No results found</h2>
          <p className="text-muted-foreground">
            No workspaces match your search for "{searchTerm}"
          </p>
        </div>
      )}

      {/* Workspaces Grid */}
      {!isLoading && filteredWorkspaces.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkspaces.map((workspace: TWorkspaces) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onSelect={handleSelectWorkspace}
              onEdit={handleEditWorkspace}
              onDelete={handleDeleteWorkspace}
            />
          ))}
        </div>
      )}

      {/* Results Count */}
      {!isLoading && filteredWorkspaces.length > 0 && (
        <div className="text-center text-sm text-muted-foreground">
          Showing {filteredWorkspaces.length} of {workspaces?.length || 0}{" "}
          workspaces
        </div>
      )}

      <CreateWorkSpaceModal />
    </div>
  );
};

export default WorkspacePage;
