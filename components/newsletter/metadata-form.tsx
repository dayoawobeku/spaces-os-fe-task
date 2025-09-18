import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface NewsletterMetadataFormProps {
  subject: string;
  onSubjectChange: (subject: string) => void;
}

export function NewsletterMetadataForm({
  subject,
  onSubjectChange,
}: NewsletterMetadataFormProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Newsletter Details</CardTitle>
        <CardDescription>
          Set up the basic information for your newsletter
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject Line</Label>
          <Input
            id="subject"
            type="text"
            placeholder="Enter newsletter subject..."
            value={subject}
            onChange={(e) => onSubjectChange(e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
}
