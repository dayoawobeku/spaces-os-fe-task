import { Newsletter, NewsletterListItem } from "./types";

const NEWSLETTERS_KEY = "newsletters";

export function getNewsletters(): Newsletter[] {
  if (typeof window === "undefined") return [];

  try {
    const stored = localStorage.getItem(NEWSLETTERS_KEY);
    if (!stored) return [];

    const newsletters = JSON.parse(stored);

    return newsletters.map(
      (
        newsletter: Newsletter & {
          createdAt: string;
          updatedAt: string;
          scheduledAt?: string;
        }
      ) => ({
        ...newsletter,
        createdAt: new Date(newsletter.createdAt),
        updatedAt: new Date(newsletter.updatedAt),
        scheduledAt: newsletter.scheduledAt
          ? new Date(newsletter.scheduledAt)
          : undefined,
      })
    );
  } catch (error) {
    console.error("Error loading newsletters from localStorage:", error);
    return [];
  }
}

export function saveNewsletter(newsletter: Newsletter): void {
  if (typeof window === "undefined") return;

  try {
    const newsletters = getNewsletters();
    const existingIndex = newsletters.findIndex((n) => n.id === newsletter.id);

    if (existingIndex >= 0) {
      newsletters[existingIndex] = newsletter;
    } else {
      newsletters.push(newsletter);
    }

    localStorage.setItem(NEWSLETTERS_KEY, JSON.stringify(newsletters));
  } catch (error) {
    console.error("Error saving newsletter to localStorage:", error);
  }
}

export function deleteNewsletter(id: string): void {
  if (typeof window === "undefined") return;

  try {
    const newsletters = getNewsletters();
    const filtered = newsletters.filter((n) => n.id !== id);
    localStorage.setItem(NEWSLETTERS_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error("Error deleting newsletter from localStorage:", error);
  }
}

export function getNewsletter(id: string): Newsletter | null {
  const newsletters = getNewsletters();
  return newsletters.find((n) => n.id === id) || null;
}

export function getNewslettersList(): NewsletterListItem[] {
  return getNewsletters().map((newsletter) => ({
    id: newsletter.id,
    subject: newsletter.subject,
    status: newsletter.status,
    createdAt: newsletter.createdAt,
    updatedAt: newsletter.updatedAt,
    scheduledAt: newsletter.scheduledAt,
  }));
}

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};
