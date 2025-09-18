"use client";

import { useEffect, useState, useCallback, useRef } from "react";

import { render } from "@react-email/render";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Newsletter } from "@/lib/types";
import { getTemplateById } from "@/lib/email-templates";

interface EmailPreviewProps {
  newsletter: Newsletter;
}

export function EmailPreview({ newsletter }: EmailPreviewProps) {
  const [htmlContent, setHtmlContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  const generatePreview = useCallback(async () => {
    setIsUpdating(true);
    try {
      const template = getTemplateById(newsletter.templateId);
      if (!template) {
        setHtmlContent("<p>Template not found</p>");
        return;
      }

      const hasContent = newsletter.subject || newsletter.sections.length > 0;

      if (!hasContent) {
        const placeholderNewsletter = {
          ...newsletter,
          subject: newsletter.subject || "Welcome to Our Newsletter",
          sections:
            newsletter.sections.length > 0
              ? newsletter.sections
              : [
                  {
                    id: "placeholder-1",
                    type: "text" as const,
                    content:
                      "# Welcome to Your Newsletter!\n\nThis is a **sample newsletter** with *markdown formatting*. You can:\n\n- Add **bold** and *italic* text\n- Create [links](https://example.com)\n- Use headers and lists\n- Add images and buttons\n\nStart editing to see your content here!",
                    order: 0,
                    metadata: {},
                  },
                  {
                    id: "placeholder-2",
                    type: "button" as const,
                    content: "Get Started",
                    order: 1,
                    metadata: {
                      buttonText: "Get Started",
                      buttonUrl: "https://example.com",
                    },
                  },
                ],
        };

        const TemplateComponent = template.component;
        const html = render(
          <TemplateComponent newsletter={placeholderNewsletter} />
        );
        setHtmlContent(html);
      } else {
        const TemplateComponent = template.component;
        const html = render(<TemplateComponent newsletter={newsletter} />);
        setHtmlContent(html);
      }
    } catch (error) {
      console.error("Error rendering email preview:", error);
      setHtmlContent("<p>Error rendering preview</p>");
    } finally {
      setIsLoading(false);
      setIsUpdating(false);
    }
  }, [newsletter]);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      generatePreview();
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [generatePreview]);

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Live Preview</CardTitle>
          <CardDescription>Loading preview...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Live Preview
          {isUpdating && (
            <div className="flex items-center text-sm text-gray-500">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-400 mr-2"></div>
              Updating...
            </div>
          )}
        </CardTitle>
        <CardDescription>
          See how your newsletter will look to recipients
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="border rounded-lg overflow-hidden bg-white relative">
          {isUpdating && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-blue-200 z-10">
              <div className="h-full bg-blue-500 animate-pulse"></div>
            </div>
          )}
          <div className="max-h-[600px] overflow-y-auto">
            <iframe
              srcDoc={htmlContent}
              className="w-full min-h-[500px] border-0"
              title="Email Preview"
              style={{
                transform: "scale(0.9)",
                transformOrigin: "top left",
                width: "111%",
                height: "111%",
                background: "transparent",
              }}
            />
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Preview is scaled to fit. Actual email will render at full size.
        </div>
      </CardContent>
    </Card>
  );
}
