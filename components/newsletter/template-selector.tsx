import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmailTemplate } from "@/lib/types";
import { cn } from "@/lib/utils";
import { EMAIL_TEMPLATES } from "@/lib/email-templates";
import { TemplateThumbnail } from "./template-thumbnail";

interface TemplateSelectorProps {
  selectedTemplateId: string;
  onTemplateSelect: (templateId: string) => void;
}

export function TemplateSelector({
  selectedTemplateId,
  onTemplateSelect,
}: TemplateSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Template</CardTitle>
        <CardDescription>
          Select a template layout for your newsletter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {EMAIL_TEMPLATES.map((template: EmailTemplate) => (
            <div
              key={template.id}
              className={cn(
                "border rounded-lg p-4 cursor-pointer transition-all",
                selectedTemplateId === template.id
                  ? "border-blue-500 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-200 hover:border-gray-300"
              )}
              onClick={() => onTemplateSelect(template.id)}
            >
              <div className="mb-3">
                <TemplateThumbnail templateId={template.id} />
              </div>
              <h3 className="font-semibold text-sm mb-1">{template.name}</h3>
              <p className="text-xs text-gray-600">{template.description}</p>
              {selectedTemplateId === template.id && (
                <div className="mt-2">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    Selected
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
