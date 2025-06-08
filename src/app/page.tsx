"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Copy, FileJson, Code } from "lucide-react"
import { convertFormat } from "@/lib/converter"
import { CodeEditor } from "@/components/code-editor"
import { ModeToggle } from "@/components/theme-toggle"
import TabsSection from "@/components/tabs"

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
          Created by{" "}
          <a
            href="https://github.com/realKhusan"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline hover:text-primary"
          >
            realKhusan
          </a>
        </div>
        <TabsSection />
      </div>
    </main >
  )
}
