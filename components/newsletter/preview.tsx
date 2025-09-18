import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newsletter } from "@/lib/types";
import { getTemplateById } from "@/lib/email-templates";

interface NewsletterPreviewProps {
  newsletter: Newsletter;
}

export function NewsletterPreview({ newsletter }: NewsletterPreviewProps) {
  const template = getTemplateById(newsletter.templateId);

  if (!template) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
          <CardDescription>Template not found</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            <p>Selected template could not be loaded.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const TemplateComponent = template.component;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Live Preview</CardTitle>
        <CardDescription>
          See how your newsletter will look to recipients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden bg-white">
          <div className="max-h-[600px] overflow-y-auto">
            <div className="transform scale-90 origin-top-left w-[111%]">
              <TemplateComponent newsletter={newsletter} />
            </div>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Preview is scaled to fit. Actual email will render at full size.
        </div>
      </CardContent>
    </Card>
  );
}
