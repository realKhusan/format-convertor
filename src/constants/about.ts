import { Code, FileJson } from "lucide-react";

export const aboutInfo = {
  features: [
    { label: "Support for 5+ data formats", color: "bg-green-500" },
    { label: "Real-time conversion", color: "bg-blue-500" },
    { label: "Line numbers for better readability", color: "bg-purple-500" },
    { label: "Dark and light theme support", color: "bg-orange-500" },
    { label: "Copy to clipboard functionality", color: "bg-red-500" },
  ],
  supportedFormats: [
    { label: "JSON", icon: FileJson, color: "text-yellow-500" },
    { label: "JavaScript", icon: Code, color: "text-blue-500" },
    { label: "TypeScript", icon: Code, color: "text-blue-600" },
    { label: "CSV", icon: FileJson, color: "text-green-500" },
    { label: "YAML", icon: FileJson, color: "text-purple-500" },
  ],
};
