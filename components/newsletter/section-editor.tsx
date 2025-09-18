import sortBy from "lodash/sortBy";
import { Plus, Trash2, GripVertical, MoveUp, MoveDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NewsletterSection } from "@/lib/types";
import { MarkdownHelp } from "./markdown-help";

interface SectionEditorProps {
  sections: NewsletterSection[];
  onSectionsChange: (sections: NewsletterSection[]) => void;
}

function SectionTypeSelector({
  type,
  onChange,
}: {
  type: NewsletterSection["type"];
  onChange: (type: NewsletterSection["type"]) => void;
}) {
  const types = [
    { value: "text" as const, label: "Text" },
    { value: "image" as const, label: "Image" },
    { value: "button" as const, label: "Button" },
    { value: "divider" as const, label: "Divider" },
  ];

  return (
    <div className="flex gap-2">
      {types.map((t) => (
        <Button
          key={t.value}
          variant={type === t.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(t.value)}
        >
          {t.label}
        </Button>
      ))}
    </div>
  );
}

function SectionContentEditor({
  section,
  onChange,
}: {
  section: NewsletterSection;
  onChange: (section: NewsletterSection) => void;
}) {
  const updateSection = (updates: Partial<NewsletterSection>) => {
    onChange({ ...section, ...updates });
  };

  const updateMetadata = (updates: Partial<NewsletterSection["metadata"]>) => {
    onChange({
      ...section,
      metadata: { ...section.metadata, ...updates },
    });
  };

  switch (section.type) {
    case "text":
      return (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor={`content-${section.id}`}>
              Content (Markdown Supported)
            </Label>
            <div className="text-xs text-gray-500">
              <span className="mr-2">**bold**</span>
              <span className="mr-2">*italic*</span>
              <span>[link](url)</span>
            </div>
          </div>
          <Textarea
            id={`content-${section.id}`}
            placeholder="Enter your content with markdown formatting...&#10;&#10;Examples:&#10;**Bold text**&#10;*Italic text*&#10;[Link text](https://example.com)&#10;# Heading 1&#10;## Heading 2&#10;- Bullet point"
            value={section.content}
            onChange={(e) => updateSection({ content: e.target.value })}
            rows={6}
            className="font-mono text-sm"
          />
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>
              💡 Tip: Use markdown syntax for rich formatting. Preview updates
              automatically.
            </span>
          </div>
          <MarkdownHelp />
        </div>
      );

    case "image":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`image-url-${section.id}`}>Image URL</Label>
            <Input
              id={`image-url-${section.id}`}
              type="url"
              placeholder="https://example.com/image.jpg"
              value={section.metadata?.imageUrl || ""}
              onChange={(e) => updateMetadata({ imageUrl: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`image-alt-${section.id}`}>Alt Text</Label>
            <Input
              id={`image-alt-${section.id}`}
              type="text"
              placeholder="Describe the image..."
              value={section.metadata?.imageAlt || ""}
              onChange={(e) => updateMetadata({ imageAlt: e.target.value })}
            />
          </div>
        </div>
      );

    case "button":
      return (
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`button-text-${section.id}`}>Button Text</Label>
            <Input
              id={`button-text-${section.id}`}
              type="text"
              placeholder="Click me!"
              value={section.metadata?.buttonText || section.content}
              onChange={(e) => {
                updateSection({ content: e.target.value });
                updateMetadata({ buttonText: e.target.value });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`button-url-${section.id}`}>Button URL</Label>
            <Input
              id={`button-url-${section.id}`}
              type="url"
              placeholder="https://example.com"
              value={section.metadata?.buttonUrl || ""}
              onChange={(e) => updateMetadata({ buttonUrl: e.target.value })}
            />
          </div>
        </div>
      );

    case "divider":
      return (
        <div className="text-sm text-gray-500 italic">
          This section will render as a horizontal divider
        </div>
      );

    default:
      return null;
  }
}

export function SectionEditor({
  sections,
  onSectionsChange,
}: SectionEditorProps) {
  const addSection = () => {
    const newSection: NewsletterSection = {
      id: Math.random().toString(36).substr(2, 9),
      type: "text",
      content: "",
      order: sections.length,
      metadata: {},
    };
    onSectionsChange([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    const filtered = sections.filter((s) => s.id !== id);
    const reordered = filtered.map((s, index) => ({ ...s, order: index }));
    onSectionsChange(reordered);
  };

  const updateSection = (id: string, updatedSection: NewsletterSection) => {
    const updated = sections.map((s) => (s.id === id ? updatedSection : s));
    onSectionsChange(updated);
  };

  const moveSection = (id: string, direction: "up" | "down") => {
    const currentIndex = sections.findIndex((s) => s.id === id);
    if (
      (direction === "up" && currentIndex === 0) ||
      (direction === "down" && currentIndex === sections.length - 1)
    ) {
      return;
    }

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newSections = [...sections];
    [newSections[currentIndex], newSections[newIndex]] = [
      newSections[newIndex],
      newSections[currentIndex],
    ];

    const reordered = newSections.map((s, index) => ({ ...s, order: index }));
    onSectionsChange(reordered);
  };

  const sortedSections = sortBy(sections, ["order"]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Newsletter Content
          <Button onClick={addSection} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Section
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedSections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No sections yet. Click "Add Section" to get started.</p>
          </div>
        ) : (
          sortedSections.map((section, index) => (
            <Card key={section.id} className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">
                    Section {index + 1}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(section.id, "up")}
                    disabled={index === 0}
                  >
                    <MoveUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveSection(section.id, "down")}
                    disabled={index === sections.length - 1}
                  >
                    <MoveDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeSection(section.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label className="text-sm font-medium mb-2 block">
                    Section Type
                  </Label>
                  <SectionTypeSelector
                    type={section.type}
                    onChange={(type) =>
                      updateSection(section.id, { ...section, type })
                    }
                  />
                </div>

                <SectionContentEditor
                  section={section}
                  onChange={(updatedSection) =>
                    updateSection(section.id, updatedSection)
                  }
                />
              </div>
            </Card>
          ))
        )}
      </CardContent>
    </Card>
  );
}
