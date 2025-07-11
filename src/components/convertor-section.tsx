"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, Copy, FileJson, Code, ArrowRightLeft } from "lucide-react"
import { CodeEditor } from "@/components/code-editor"
import { convertFormat } from "@/lib/converter"

export function ConverterSection() {
    const [inputValue, setInputValue] = useState("")
    const [outputValue, setOutputValue] = useState("")
    const [error, setError] = useState<string | null>(null)
    const [isJsonToJs, setIsJsonToJs] = useState(true) // true = JSON to JS, false = JS to JSON

    const handleConvert = () => {
        try {
            setError(null)
            const result = convertFormat(inputValue, isJsonToJs)
            setOutputValue(result)
        } catch (err) {
            setError(err instanceof Error ? err.message : "An error occurred during conversion")
            setOutputValue("")
        }
    }

    const copyToClipboard = () => {
        navigator.clipboard.writeText(outputValue)
    }

    const swapFormats = () => {
        setIsJsonToJs(!isJsonToJs)
        setInputValue(outputValue)
        setOutputValue(inputValue)
        setError(null)
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-center">
                <Button onClick={swapFormats} variant="outline" className="gap-2 bg-transparent">
                    <ArrowRightLeft className="h-4 w-4" />
                    {isJsonToJs ? "JSON → JavaScript" : "JavaScript → JSON"}
                </Button>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {isJsonToJs ? <FileJson className="h-5 w-5" /> : <Code className="h-5 w-5" />}
                            Input ({isJsonToJs ? "JSON" : "JavaScript"})
                        </CardTitle>
                        <CardDescription>Paste your {isJsonToJs ? "JSON" : "JavaScript object"} data here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <CodeEditor
                            value={inputValue}
                            onChange={setInputValue}
                            placeholder={`Enter your ${isJsonToJs ? "JSON" : "JavaScript object"} here...`}
                        />
                    </CardContent>
                </Card>

                <Card className="border-border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            {isJsonToJs ? <Code className="h-5 w-5" /> : <FileJson className="h-5 w-5" />}
                            Output ({isJsonToJs ? "JavaScript" : "JSON"})
                        </CardTitle>
                        <CardDescription>Converted {isJsonToJs ? "JavaScript object" : "JSON"} will appear here</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {error && (
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <CodeEditor value={outputValue} onChange={() => { }} readOnly />
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={handleConvert} className="gap-2">
                            <FileJson className="h-4 w-4" />
                            Convert
                        </Button>
                        <Button
                            variant="outline"
                            onClick={copyToClipboard}
                            disabled={!outputValue}
                            className="gap-2 bg-transparent"
                        >
                            <Copy className="h-4 w-4" />
                            Copy
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
    )
}
