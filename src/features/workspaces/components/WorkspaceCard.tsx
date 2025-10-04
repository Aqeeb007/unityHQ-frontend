import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Calendar, MoreVertical, Users } from "lucide-react";
import type { TWorkspaces } from "../api/useGetWorkspaces";

interface WorkspaceCardProps {
  workspace: TWorkspaces;
  onSelect?: (workspace: TWorkspaces) => void;
  onEdit?: (workspace: TWorkspaces) => void;
  onDelete?: (workspace: TWorkspaces) => void;
}

export const WorkspaceCard = ({
  workspace,
  onSelect,
  onEdit,
  onDelete,
}: WorkspaceCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer border-border/50 hover:border-border bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center">
              <span className="text-lg font-semibold text-primary">
                {workspace.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <CardTitle className="text-lg group-hover:text-primary transition-colors">
                {workspace.name}
              </CardTitle>
              <CardDescription className="text-xs">
                {workspace.description &&
                  `${workspace.description.slice(0, 50)}...`}
              </CardDescription>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              // Handle dropdown menu
            }}
          >
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Created: {formatDate(workspace.createdAt)}</span>
          </div>

          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="h-4 w-4 mr-2" />
            <span>Users: {workspace.orgId}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
