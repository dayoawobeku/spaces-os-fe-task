"use client";

import { useState, useEffect } from "react";

import orderBy from "lodash/orderBy";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { NewsletterListItem } from "@/lib/types";
import { getNewslettersList, deleteNewsletter } from "@/lib/storage";

import { NewsletterList } from "../newsletter/list";

interface NewsletterManagementContainerProps {
  onCreateNew: () => void;
  onEdit: (id: string) => void;
  onPreview: (id: string) => void;
}

export function NewsletterManagementContainer({
  onCreateNew,
  onEdit,
  onPreview,
}: NewsletterManagementContainerProps) {
  const [newsletters, setNewsletters] = useState<NewsletterListItem[]>([]);

  useEffect(() => {
    loadNewsletters();
  }, []);

  const loadNewsletters = () => {
    const newslettersList = getNewslettersList();
    const sorted = orderBy(newslettersList, ["updatedAt"], ["desc"]);
    setNewsletters(sorted);
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this newsletter?")) {
      deleteNewsletter(id);
      loadNewsletters();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Newsletter Manager
              </h1>
              <p className="text-gray-600 mt-2">
                Create, manage, and send your email newsletters
              </p>
            </div>
            <Button onClick={onCreateNew}>
              <Plus className="h-4 w-4 mr-2" />
              Create Newsletter
            </Button>
          </div>
        </div>

        <NewsletterList
          newsletters={newsletters}
          onPreview={onPreview}
          onEdit={onEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
