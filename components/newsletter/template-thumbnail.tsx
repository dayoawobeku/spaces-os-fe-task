import { cn } from "@/lib/utils";

interface TemplateThumbnailProps {
  templateId: string;
  className?: string;
}

export function TemplateThumbnail({
  templateId,
  className = "",
}: TemplateThumbnailProps) {
  const renderThumbnail = () => {
    switch (templateId) {
      case "simple":
        return (
          <div className={cn("w-full h-full bg-gray-50 p-2", className)}>
            <div className="w-full h-full bg-white rounded border border-gray-200 p-2">
              <div className="h-3 bg-gray-300 rounded mb-2"></div>
              <div className="space-y-1">
                <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                <div className="h-1.5 bg-gray-200 rounded w-3/4"></div>
                <div className="h-1.5 bg-gray-200 rounded w-5/6"></div>
              </div>
              <div className="mt-2 h-2 bg-blue-400 rounded w-1/3"></div>
              <div className="mt-2 h-1 bg-gray-100 rounded w-1/2"></div>
            </div>
          </div>
        );

      case "modern":
        return (
          <div className={cn("w-full h-full bg-gray-50 p-2", className)}>
            <div className="w-full h-full bg-white rounded border border-gray-200 overflow-hidden">
              <div
                className="h-6 p-2"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <div className="h-2 bg-white/30 rounded w-2/3"></div>
              </div>
              <div className="p-2">
                <div className="space-y-1">
                  <div className="h-1.5 bg-gray-200 rounded w-full"></div>
                  <div className="h-1.5 bg-gray-200 rounded w-4/5"></div>
                </div>
                <div
                  className="mt-2 h-2 rounded w-1/3"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  }}
                ></div>
              </div>
            </div>
          </div>
        );

      case "newsletter":
        return (
          <div className={cn("w-full h-full bg-gray-50 p-2", className)}>
            <div className="w-full h-full bg-white rounded border border-gray-200 overflow-hidden">
              <div className="h-4 bg-gray-800 p-1">
                <div className="h-1.5 bg-gray-300 rounded w-1/3"></div>
              </div>
              <div className="p-2">
                <div className="h-2 bg-gray-600 rounded w-3/4 mb-2"></div>
                <div className="space-y-1">
                  <div className="h-1 bg-gray-200 rounded w-full"></div>
                  <div className="h-1 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-1 bg-gray-200 rounded w-4/5"></div>
                </div>
                <div className="mt-2 h-1.5 bg-blue-500 rounded w-1/4"></div>
              </div>
              <div className="absolute bottom-2 left-2 right-2">
                <div className="flex justify-between">
                  <div className="h-0.5 bg-gray-100 rounded w-1/4"></div>
                  <div className="h-0.5 bg-gray-100 rounded w-1/4"></div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div
            className={cn(
              "w-full h-full bg-gray-100 flex items-center justify-center",
              className
            )}
          >
            <span className="text-gray-500 text-xs">Preview</span>
          </div>
        );
    }
  };

  return (
    <div className="aspect-video bg-gray-100 rounded overflow-hidden relative">
      {renderThumbnail()}
    </div>
  );
}
