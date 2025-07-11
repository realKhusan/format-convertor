import { HelpCircle, Code, BookOpen, FileJson } from "lucide-react";
// Data for tabs
export const tabsData = [
  {
    id: "usage",
    label: "How to Use",
    icon: HelpCircle,
  },
  {
    id: "examples",
    label: "Examples",
    icon: Code,
  },
  {
    id: "about",
    label: "About",
    icon: BookOpen,
  },
];

// Data for usage steps
export const usageSteps = [
  {
    number: 1,
    title: "Choose Direction",
    description: "Click the swap button to choose JSON→JS or JS→JSON",
    color: "blue",
  },
  {
    number: 2,
    title: "Paste Your Data",
    description: "Enter your JSON or JavaScript object in the input area",
    color: "green",
  },
  {
    number: 3,
    title: "Convert",
    description: "Click the Convert button to transform your data",
    color: "orange",
  },
  {
    number: 4,
    title: "Copy Result",
    description: "Copy the converted data to your clipboard",
    color: "purple",
  },
];

// Data for examples
export const examplesData = [
  {
    title: "JSON to JavaScript",
    description: "Convert JSON objects to JavaScript objects",
    input: {
      label: "Input (JSON):",
      code: `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "skills": ["JavaScript", "React"]
}`,
    },
    output: {
      label: "Output (JavaScript):",
      code: `const data = {
  name: "John Doe",
  age: 30,
  isActive: true,
  skills: ["JavaScript", "React"]
};`,
    },
  },
  {
    title: "JavaScript to JSON",
    description: "Convert JS objects to clean JSON format",
    input: {
      label: "Input (JavaScript):",
      code: `const user = {
  name: "Alice",
  email: "alice@example.com",
  preferences: {
    theme: "dark",
    notifications: true
  }
};`,
    },
    output: {
      label: "Output (JSON):",
      code: `{
  "name": "Alice",
  "email": "alice@example.com",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}`,
    },
  },
];

// Data for features
export const featuresData = [
  {
    title: "Bidirectional conversion (JSON ↔ JS)",
    color: "green",
  },
  {
    title: "Real-time conversion",
    color: "blue",
  },
  {
    title: "Line numbers for better readability",
    color: "purple",
  },
  {
    title: "Dark and light theme support",
    color: "orange",
  },
  {
    title: "Copy to clipboard functionality",
    color: "red",
  },
];

// Data for supported formats
export const supportedFormats = [
  {
    name: "JSON (JavaScript Object Notation)",
    icon: FileJson,
    color: "yellow",
  },
  {
    name: "JavaScript Objects",
    icon: Code,
    color: "blue",
  },
];
