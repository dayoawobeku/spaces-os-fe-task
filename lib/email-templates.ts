import { SimpleTemplate } from "@/components/email-templates/simple-template";
import { ModernTemplate } from "@/components/email-templates/modern-template";
import { NewsletterTemplate } from "@/components/email-templates/newsletter-template";

import { EmailTemplate } from "./types";

export const EMAIL_TEMPLATES: EmailTemplate[] = [
  {
    id: "simple",
    name: "Simple & Clean",
    description:
      "A clean, minimal template perfect for text-focused newsletters",
    component: SimpleTemplate,
  },
  {
    id: "modern",
    name: "Modern Gradient",
    description:
      "Eye-catching template with gradient header and modern styling",
    component: ModernTemplate,
  },
  {
    id: "newsletter",
    name: "Professional Newsletter",
    description:
      "Professional layout with header, structured content, and footer",
    component: NewsletterTemplate,
  },
];

export const getTemplateById = (id: string): EmailTemplate | undefined => {
  return EMAIL_TEMPLATES.find((template) => template.id === id);
};

export const getDefaultTemplate = (): EmailTemplate => {
  return EMAIL_TEMPLATES[0];
};
