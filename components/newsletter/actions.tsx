import { useState } from "react";

import {
  Save,
  Calendar as CalendarIcon,
  Send,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newsletter, NewsletterStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

interface NewsletterActionsProps {
  newsletter: Newsletter;
  onSave: (status: NewsletterStatus, scheduledAt?: Date) => void;
  isSaving?: boolean;
}

export function NewsletterActions({
  newsletter,
  onSave,
  isSaving = false,
}: NewsletterActionsProps) {
  const [scheduleDate, setScheduleDate] = useState<Date | undefined>(undefined);
  const [scheduleTime, setScheduleTime] = useState("");
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const handleSaveDraft = () => {
    onSave("draft");
  };

  const handleSchedule = () => {
    if (scheduleDate && scheduleTime) {
      const dateString = scheduleDate.toISOString().split("T")[0];
      const scheduledAt = new Date(`${dateString}T${scheduleTime}`);
      onSave("scheduled", scheduledAt);
    }
  };

  const handleSend = () => {
    onSave("sent");
  };

  const isScheduleValid = scheduleDate && scheduleTime;
  const scheduledDateTime = isScheduleValid
    ? new Date(`${scheduleDate.toISOString().split("T")[0]}T${scheduleTime}`)
    : null;
  const isScheduleDateFuture =
    scheduledDateTime && scheduledDateTime > new Date();

  const hasSubject = newsletter.subject.trim().length > 0;
  const hasContent = newsletter.sections.length > 0;
  const canSend = hasSubject && hasContent;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Actions</CardTitle>
        <CardDescription>
          Save as draft, schedule for later, or send immediately
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between p-4 border rounded-lg">
          <div>
            <h3 className="font-medium">Save as Draft</h3>
            <p className="text-sm text-gray-500">
              Save your progress and continue editing later
            </p>
          </div>
          <Button
            onClick={handleSaveDraft}
            disabled={isSaving}
            variant="outline"
          >
            <Save className="h-4 w-4 mr-2" />
            Save Draft
          </Button>
        </div>

        <div className="p-4 border rounded-lg space-y-4">
          <div>
            <h3 className="font-medium">Schedule Newsletter</h3>
            <p className="text-sm text-gray-500">
              Set a specific date and time to send your newsletter
            </p>
          </div>

          <div className="flex gap-4">
            <div className="flex flex-col gap-3">
              <Label htmlFor="date-picker" className="px-1">
                Date
              </Label>
              <Popover open={datePickerOpen} onOpenChange={setDatePickerOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker"
                    className="w-40 justify-between font-normal"
                  >
                    {scheduleDate
                      ? scheduleDate.toLocaleDateString()
                      : "Select date"}
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="start"
                >
                  <Calendar
                    mode="single"
                    selected={scheduleDate}
                    captionLayout="dropdown"
                    onSelect={(date) => {
                      setScheduleDate(date);
                      setDatePickerOpen(false);
                    }}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex flex-col gap-3">
              <Label htmlFor="time-picker" className="px-1">
                Time
              </Label>
              <Input
                type="time"
                id="time-picker"
                step="1"
                value={scheduleTime}
                onChange={(e) => setScheduleTime(e.target.value)}
                className="w-32 bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
              />
            </div>
          </div>

          {isScheduleValid && !isScheduleDateFuture && (
            <div className="text-sm text-red-600">
              Please select a future date and time.
            </div>
          )}

          <Button
            onClick={handleSchedule}
            disabled={!isScheduleValid || !isScheduleDateFuture || isSaving}
            className="w-full"
          >
            <CalendarIcon className="h-4 w-4 mr-2" />
            Schedule Newsletter
          </Button>
        </div>

        <div className="p-4 border rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="font-medium">Send Immediately</h3>
              <p className="text-sm text-gray-500">
                Send your newsletter to all subscribers right now
              </p>
            </div>
            <Button onClick={handleSend} disabled={isSaving || !canSend}>
              <Send className="h-4 w-4 mr-2" />
              Send Now
            </Button>
          </div>

          {!canSend && (
            <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
              <p className="font-medium mb-1">Required before sending:</p>
              <ul className="text-xs space-y-1">
                {!hasSubject && <li>• Add a subject line</li>}
                {!hasContent && <li>• Add at least one content section</li>}
              </ul>
            </div>
          )}
        </div>

        {newsletter.status !== "draft" && (
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Status:</span>
              <span
                className={cn(
                  "text-sm px-2 py-1 rounded-full",
                  newsletter.status === "scheduled"
                    ? "bg-blue-100 text-blue-800"
                    : newsletter.status === "sent"
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-800"
                )}
              >
                {newsletter.status.charAt(0).toUpperCase() +
                  newsletter.status.slice(1)}
              </span>
            </div>
            {newsletter.scheduledAt && newsletter.status === "scheduled" && (
              <div className="text-sm text-gray-600 mt-2">
                Scheduled for:{" "}
                {new Intl.DateTimeFormat("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                }).format(newsletter.scheduledAt)}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
