import { Eye, Edit, Trash2, Calendar, FileText } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { NewsletterListItem } from "@/lib/types";

interface NewsletterListProps {
  newsletters: NewsletterListItem[];
  onPreview: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

function StatusBadge({ status }: { status: NewsletterListItem["status"] }) {
  const getStatusConfig = (status: NewsletterListItem["status"]) => {
    switch (status) {
      case "draft":
        return { label: "Draft", className: "bg-gray-100 text-gray-800" };
      case "scheduled":
        return { label: "Scheduled", className: "bg-blue-100 text-blue-800" };
      case "sent":
        return { label: "Sent", className: "bg-green-100 text-green-800" };
      default:
        return { label: status, className: "bg-gray-100 text-gray-800" };
    }
  };

  const { label, className } = getStatusConfig(status);

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
        className
      )}
    >
      {label}
    </span>
  );
}

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
};

export function NewsletterList({
  newsletters,
  onPreview,
  onEdit,
  onDelete,
}: NewsletterListProps) {
  if (newsletters.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Newsletters</CardTitle>
          <CardDescription>Manage your newsletter campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No newsletters yet
            </h3>
            <p className="text-gray-500 mb-4">
              Create your first newsletter to get started.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Newsletters</CardTitle>
        <CardDescription>
          Manage your newsletter campaigns ({newsletters.length} total)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {newsletters.map((newsletter) => (
            <div
              key={newsletter.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="font-medium text-gray-900 truncate">
                    {newsletter.subject || "Untitled Newsletter"}
                  </h3>
                  <StatusBadge status={newsletter.status} />
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span>Created: {formatDate(newsletter.createdAt)}</span>
                  <span>Updated: {formatDate(newsletter.updatedAt)}</span>
                  {newsletter.scheduledAt && (
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Scheduled: {formatDate(newsletter.scheduledAt)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onPreview(newsletter.id)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(newsletter.id)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(newsletter.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
