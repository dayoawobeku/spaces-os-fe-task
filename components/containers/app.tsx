"use client";

import { useState } from "react";

import { NewsletterManagementContainer } from "./management-container";
import { NewsletterEditorContainer } from "./editor-container";

type AppMode = "list" | "create" | "edit" | "preview";

interface AppState {
  mode: AppMode;
  selectedNewsletterId?: string;
}

export function NewsletterApp() {
  const [appState, setAppState] = useState<AppState>({ mode: "list" });

  const handleCreateNew = () => {
    setAppState({ mode: "create" });
  };

  const handleEdit = (id: string) => {
    setAppState({ mode: "edit", selectedNewsletterId: id });
  };

  const handlePreview = (id: string) => {
    setAppState({ mode: "preview", selectedNewsletterId: id });
  };

  const handleBack = () => {
    setAppState({ mode: "list" });
  };

  switch (appState.mode) {
    case "create":
      return <NewsletterEditorContainer onBack={handleBack} />;

    case "edit":
      return (
        <NewsletterEditorContainer
          newsletterId={appState.selectedNewsletterId}
          onBack={handleBack}
        />
      );

    case "preview":
      return (
        <NewsletterEditorContainer
          newsletterId={appState.selectedNewsletterId}
          onBack={handleBack}
        />
      );

    case "list":
    default:
      return (
        <NewsletterManagementContainer
          onCreateNew={handleCreateNew}
          onEdit={handleEdit}
          onPreview={handlePreview}
        />
      );
  }
}
