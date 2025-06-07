"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Copy, FileJson, Code, BookOpen, HelpCircle } from "lucide-react"
import { convertFormat } from "@/lib/converter"
import { CodeEditor } from "@/components/code-editor"
import { ModeToggle } from "@/components/theme-toggle"

export default function Home() {
  const [inputFormat, setInputFormat] = useState("json")
  const [outputFormat, setOutputFormat] = useState("typescript")
  const [inputValue, setInputValue] = useState("")
  const [outputValue, setOutputValue] = useState("")
  const [error, setError] = useState<string | null>(null)

  const handleConvert = () => {
    try {
      setError(null)
      const result = convertFormat(inputValue, inputFormat, outputFormat)
      setOutputValue(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred during conversion")
      setOutputValue("")
    }
  }

  const formatTypes = [
    { id: "1", value: "json", label: "JSON" },
    { id: "2", value: "javascript", label: "JavaScript Object" },
    { id: "3", value: "typescript", label: "TypeScript Interface" },
    { id: "4", value: "csv", label: "CSV" },
    { id: "5", value: "yaml", label: "YAML" },
  ]

  const copyToClipboard = () => {
    navigator.clipboard.writeText(outputValue)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Format Converter</h1>
          <ModeToggle />
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Input
              </CardTitle>
              <CardDescription>Paste your data in the selected format</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={inputFormat} onValueChange={setInputFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select input format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formatTypes.map(formatType =>
                      <SelectItem key={formatType.id} value={formatType.value}>
                        {formatType.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
                <CodeEditor
                  value={inputValue}
                  onChange={setInputValue}
                  placeholder={`Enter your ${inputFormat} data here...`}
                  language={inputFormat}
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileJson className="h-5 w-5" />
                Output
              </CardTitle>
              <CardDescription>Converted data will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Select value={outputFormat} onValueChange={setOutputFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select output format" />
                  </SelectTrigger>
                  <SelectContent>
                    {formatTypes.map(formatType =>
                      <SelectItem key={formatType.id} value={formatType.value}>
                        {formatType.label}
                      </SelectItem>)}
                  </SelectContent>
                </Select>

                {error && (
                  <Alert variant="destructive" className="mb-4">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <CodeEditor value={outputValue} onChange={() => { }} readOnly language={outputFormat} />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button onClick={handleConvert} className="gap-2">
                <FileJson className="h-4 w-4" />
                Convert
              </Button>
              <Button variant="outline" onClick={copyToClipboard} disabled={!outputValue} className="gap-2">
                <Copy className="h-4 w-4" />
                Copy
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          Created by <span className="font-medium">Format Converter Team</span>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="usage" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="usage" className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                How to Use
              </TabsTrigger>
              <TabsTrigger value="examples" className="flex items-center gap-2">
                <Code className="h-4 w-4" />
                Examples
              </TabsTrigger>
              <TabsTrigger value="about" className="flex items-center gap-2">
                <BookOpen className="h-4 w-4" />
                About
              </TabsTrigger>
            </TabsList>

            <TabsContent value="usage" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="h-5 w-5 text-blue-500" />
                    How to Use Format Converter
                  </CardTitle>
                  <CardDescription>
                    Follow these simple steps to convert your data between different formats
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-sm font-medium dark:bg-blue-900 dark:text-blue-300">
                          1
                        </div>
                        <div>
                          <h3 className="font-medium">Select Input Format</h3>
                          <p className="text-sm text-muted-foreground">Choose the format of your source data</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 text-sm font-medium dark:bg-green-900 dark:text-green-300">
                          2
                        </div>
                        <div>
                          <h3 className="font-medium">Paste Your Data</h3>
                          <p className="text-sm text-muted-foreground">Enter or paste your data in the input editor</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-100 text-orange-600 text-sm font-medium dark:bg-orange-900 dark:text-orange-300">
                          3
                        </div>
                        <div>
                          <h3 className="font-medium">Choose Output Format</h3>
                          <p className="text-sm text-muted-foreground">Select your desired output format</p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-100 text-purple-600 text-sm font-medium dark:bg-purple-900 dark:text-purple-300">
                          4
                        </div>
                        <div>
                          <h3 className="font-medium">Convert</h3>
                          <p className="text-sm text-muted-foreground">
                            Click the Convert button to transform your data
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 text-sm font-medium dark:bg-red-900 dark:text-red-300">
                          5
                        </div>
                        <div>
                          <h3 className="font-medium">Copy Result</h3>
                          <p className="text-sm text-muted-foreground">Copy the converted data to your clipboard</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="examples" className="mt-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">JSON to TypeScript</CardTitle>
                    <CardDescription>Convert JSON objects to TypeScript interfaces</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Input (JSON):</h4>
                        <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                          {`{
               "name": "John Doe",
                   "age": 30,
              "isActive": true,
            "skills": ["JavaScript", "TypeScript"]
                    }`}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                          Output (TypeScript):
                        </h4>
                        <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                          {`interface Root {
  name: string;
  age: number;
  isActive: boolean;
  skills: string[];
}`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">JavaScript to JSON</CardTitle>
                    <CardDescription>Convert JS objects to clean JSON format</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                          Input (JavaScript):
                        </h4>
                        <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                          {`const user = {
  name: "Alice",
  email: "alice@example.com",
  preferences: {
    theme: "dark",
    notifications: true
  }
};`}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Output (JSON):</h4>
                        <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                          {`{
  "name": "Alice",
  "email": "alice@example.com",
  "preferences": {
    "theme": "dark",
    "notifications": true
  }
}`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">CSV to JSON</CardTitle>
                    <CardDescription>Transform CSV data into JSON arrays</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Input (CSV):</h4>
                        <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                          {`name,age,city
John,25,New York
Jane,30,Los Angeles`}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Output (JSON):</h4>
                        <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                          {`[
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
]`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">JSON to YAML</CardTitle>
                    <CardDescription>Convert JSON to human-readable YAML</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">Input (JSON):</h4>
                        <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                          {`{
  "database": {
    "host": "localhost",
    "port": 5432,
    "name": "myapp"
  }
}`}
                        </pre>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">Output (YAML):</h4>
                        <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                          {`database:
  host: localhost
  port: 5432
  name: myapp`}
                        </pre>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-purple-500" />
                    About Format Converter
                  </CardTitle>
                  <CardDescription>A powerful tool for converting between different data formats</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Features</h3>
                        <ul className="space-y-2 text-sm">
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                            Support for 5+ data formats
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                            Real-time conversion
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                            Line numbers for better readability
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-orange-500 rounded-full"></div>
                            Dark and light theme support
                          </li>
                          <li className="flex items-center gap-2">
                            <div className="h-2 w-2 bg-red-500 rounded-full"></div>
                            Copy to clipboard functionality
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Privacy</h3>
                        <p className="text-sm text-muted-foreground">
                          All conversions happen locally in your browser. Your data never leaves your device, ensuring
                          complete privacy and security.
                        </p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Supported Formats</h3>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div className="flex items-center gap-2 p-2 bg-muted rounded">
                            <FileJson className="h-4 w-4 text-yellow-500" />
                            JSON
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-muted rounded">
                            <Code className="h-4 w-4 text-blue-500" />
                            JavaScript
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-muted rounded">
                            <Code className="h-4 w-4 text-blue-600" />
                            TypeScript
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-muted rounded">
                            <FileJson className="h-4 w-4 text-green-500" />
                            CSV
                          </div>
                          <div className="flex items-center gap-2 p-2 bg-muted rounded">
                            <FileJson className="h-4 w-4 text-purple-500" />
                            YAML
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg mb-2">Technology</h3>
                        <p className="text-sm text-muted-foreground">
                          Built with Next.js, React, and TypeScript. Uses modern web technologies for fast, reliable
                          data conversion.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </main>
  )
}
