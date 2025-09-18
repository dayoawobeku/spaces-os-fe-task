export interface NewsletterSection {
  id: string;
  type: "text" | "image" | "button" | "divider";
  content: string;
  order: number;
  metadata?: {
    imageUrl?: string;
    imageAlt?: string;
    buttonUrl?: string;
    buttonText?: string;
  };
}

export interface Newsletter {
  id: string;
  subject: string;
  sections: NewsletterSection[];
  templateId: string;
  status: "draft" | "scheduled" | "sent";
  createdAt: Date;
  updatedAt: Date;
  scheduledAt?: Date;
}

export interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  component: React.ComponentType<{ newsletter: Newsletter }>;
}

export interface NewsletterFormData {
  subject: string;
  templateId: string;
  sections: NewsletterSection[];
}

export type NewsletterStatus = "draft" | "scheduled" | "sent";

export interface NewsletterListItem {
  id: string;
  subject: string;
  status: NewsletterStatus;
  createdAt: Date;
  updatedAt: Date;
  scheduledAt?: Date;
}
