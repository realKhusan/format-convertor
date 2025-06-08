export const examples = [
  {
    id: "1",
    title: "JSON to TypeScript",
    desc: "Convert JSON objects to TypeScript interfaces",
    codes: [
      {
        id: "1",
        title: "Input (JSON):",
        color: "text-green-600 dark:text-green-400",
        code: `{
  "name": "John Doe",
  "age": 30,
  "isActive": true,
  "skills": ["JavaScript", "TypeScript"]
}`,
      },
      {
        id: "2",
        title: "Output (TypeScript):",
        color: "text-blue-600 dark:text-blue-400",
        code: `interface Root {
  name: string;
  age: number;
  isActive: boolean;
  skills: string[];
}`,
      },
    ],
  },
  {
    id: "2",
    title: "JavaScript to JSON",
    desc: "Convert JS objects to clean JSON format",
    codes: [
      {
        id: "1",
        title: "Input (JavaScript):",
        color: "text-green-600 dark:text-green-400",
        code: `const user = {
  name: "Alice",
  email: "alice@example.com",
  preferences: {
    theme: "dark",
    notifications: true
  }
};`,
      },
      {
        id: "2",
        title: "Output (JSON):",
        color: "text-blue-600 dark:text-blue-400",
        code: `{
  "name": "Alice",
  "email": "alice@example.com",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}`,
      },
    ],
  },
  {
    id: "3",
    title: "CSV to JSON",
    desc: "Transform CSV data into JSON arrays",
    codes: [
      {
        id: "1",
        title: "Input (CSV):",
        color: "text-green-600 dark:text-green-400",
        code: `name,age,city
John,25,New York
Jane,30,Los Angeles`,
      },
      {
        id: "2",
        title: "Output (JSON):",
        color: "text-blue-600 dark:text-blue-400",
        code: `[
  {
    "name": "John",
    "age": "25",
    "city": "New York"
  },
  {
    "name": "Jane",
    "age": "30",
    "city": "Los Angeles"
  }
]`,
      },
    ],
  },
  {
    id: "4",
    title: "JSON to YAML",
    desc: "Convert JSON to human-readable YAML",
    codes: [
      {
        id: "1",
        title: "Input (JSON):",
        color: "text-green-600 dark:text-green-400",
        code: `{
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "myapp"
  }
}`,
      },
      {
        id: "2",
        title: "Output (YAML):",
        color: "text-blue-600 dark:text-blue-400",
        code: `database:
  host: localhost
  port: 5432
  name: myapp`,
      },
    ],
  },
];
