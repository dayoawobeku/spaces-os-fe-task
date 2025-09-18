"use client";

import { useState, useEffect } from "react";

import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Newsletter, NewsletterSection, NewsletterStatus } from "@/lib/types";
import { getNewsletter, saveNewsletter, generateId } from "@/lib/storage";
import { getDefaultTemplate } from "@/lib/email-templates";

import { NewsletterMetadataForm } from "../newsletter/metadata-form";
import { TemplateSelector } from "../newsletter/template-selector";
import { SectionEditor } from "../newsletter/section-editor";
import { EmailPreview } from "../newsletter/email-preview";
import { NewsletterActions } from "../newsletter/actions";

interface NewsletterEditorContainerProps {
  newsletterId?: string;
  onBack: () => void;
}

export function NewsletterEditorContainer({
  newsletterId,
  onBack,
}: NewsletterEditorContainerProps) {
  const [newsletter, setNewsletter] = useState<Newsletter>(() => {
    if (newsletterId) {
      const existing = getNewsletter(newsletterId);
      if (existing) return existing;
    }

    const defaultTemplate = getDefaultTemplate();
    return {
      id: generateId(),
      subject: "",
      sections: [],
      templateId: defaultTemplate.id,
      status: "draft",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  });

  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const autoSave = setTimeout(() => {
      if (newsletter.subject || newsletter.sections.length > 0) {
        const updatedNewsletter = {
          ...newsletter,
          updatedAt: new Date(),
        };
        saveNewsletter(updatedNewsletter);
        setNewsletter(updatedNewsletter);
      }
    }, 2000);

    return () => clearTimeout(autoSave);
  }, [newsletter.subject, newsletter.sections, newsletter.templateId]);

  const handleSubjectChange = (subject: string) => {
    setNewsletter((prev) => ({ ...prev, subject }));
  };

  const handleTemplateChange = (templateId: string) => {
    setNewsletter((prev) => ({ ...prev, templateId }));
  };

  const handleSectionsChange = (sections: NewsletterSection[]) => {
    setNewsletter((prev) => ({ ...prev, sections }));
  };

  const handleSave = async (status: NewsletterStatus, scheduledAt?: Date) => {
    setIsSaving(true);

    try {
      const updatedNewsletter = {
        ...newsletter,
        status,
        scheduledAt,
        updatedAt: new Date(),
      };

      saveNewsletter(updatedNewsletter);
      setNewsletter(updatedNewsletter);
    } catch (error) {
      console.error("Error saving newsletter:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <Button variant="ghost" onClick={onBack}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Newsletters
            </Button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {newsletterId ? "Edit Newsletter" : "Create Newsletter"}
          </h1>
          <p className="text-gray-600 mt-2">
            Design and customize your email newsletter campaign
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <NewsletterMetadataForm
              subject={newsletter.subject}
              onSubjectChange={handleSubjectChange}
            />

            <TemplateSelector
              selectedTemplateId={newsletter.templateId}
              onTemplateSelect={handleTemplateChange}
            />

            <SectionEditor
              sections={newsletter.sections}
              onSectionsChange={handleSectionsChange}
            />

            <NewsletterActions
              newsletter={newsletter}
              onSave={handleSave}
              isSaving={isSaving}
            />
          </div>

          <div className="lg:sticky lg:top-8 lg:h-fit">
            <EmailPreview newsletter={newsletter} />
          </div>
        </div>
      </div>
    </div>
  );
}
