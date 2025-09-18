import { useState } from "react";

import { HelpCircle, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function MarkdownHelp() {
  const [isOpen, setIsOpen] = useState(false);

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(true)}
        className="text-xs"
      >
        <HelpCircle className="h-3 w-3 mr-1" />
        Markdown Help
      </Button>
    );
  }

  return (
    <Card className="mt-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">Markdown Formatting Guide</CardTitle>
          <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
        <CardDescription className="text-xs">
          Use these markdown formats in your text sections
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="space-y-2">
            <div>
              <strong>Text Formatting:</strong>
              <div className="font-mono bg-gray-50 p-2 rounded mt-1">
                **Bold text**
                <br />
                *Italic text*
                <br />
                ***Bold and italic***
              </div>
            </div>

            <div>
              <strong>Headers:</strong>
              <div className="font-mono bg-gray-50 p-2 rounded mt-1">
                # Heading 1<br />
                ## Heading 2<br />
                ### Heading 3
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div>
              <strong>Links & Lists:</strong>
              <div className="font-mono bg-gray-50 p-2 rounded mt-1">
                [Link text](https://example.com)
                <br />
                <br />
                - Bullet point
                <br />
                - Another point
                <br />
                <br />
                1. Numbered list
                <br />
                2. Second item
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-800">
            💡 <strong>Pro tip:</strong> The preview updates automatically as
            you type. Try combining different formats for rich, engaging
            content!
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
