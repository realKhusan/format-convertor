"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle, BookOpen } from "lucide-react"
import { examplesData, featuresData, supportedFormats, tabsData, usageSteps } from "@/constants/tab-section"

export function TabSection() {
    return (
        <div className="mt-12">
            <Tabs defaultValue="usage" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                    {tabsData.map((tab) => (
                        <TabsTrigger key={tab.id} value={tab.id} className="flex items-center gap-2">
                            <tab.icon className="h-4 w-4" />
                            {tab.label}
                        </TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="usage" className="mt-6">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <HelpCircle className="h-5 w-5 text-blue-500" />
                                How to Use JSON ↔ JS Converter
                            </CardTitle>
                            <CardDescription>Simple steps to convert between JSON and JavaScript objects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                {[0, 1].map((colIndex) => (
                                    <div key={colIndex} className="space-y-4">
                                        {usageSteps
                                            .filter((_, index) => index % 2 === colIndex)
                                            .map((step) => (
                                                <div key={step.number} className="flex items-start gap-3">
                                                    <div
                                                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-${step.color}-100 text-${step.color}-600 text-sm font-medium dark:bg-${step.color}-900 dark:text-${step.color}-300`}
                                                    >
                                                        {step.number}
                                                    </div>
                                                    <div>
                                                        <h3 className="font-medium">{step.title}</h3>
                                                        <p className="text-sm text-muted-foreground">{step.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="examples" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {examplesData.map((example, index) => (
                            <Card key={index} className="border-border">
                                <CardHeader>
                                    <CardTitle className="text-lg">{example.title}</CardTitle>
                                    <CardDescription>{example.description}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="text-sm font-medium text-green-600 dark:text-green-400 mb-2">
                                                {example.input.label}
                                            </h4>
                                            <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto border">{example.input.code}</pre>
                                        </div>
                                        <div>
                                            <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
                                                {example.output.label}
                                            </h4>
                                            <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto border">
                                                {example.output.code}
                                            </pre>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="about" className="mt-6">
                    <Card className="border-border">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-purple-500" />
                                About JSON ↔ JS Converter
                            </CardTitle>
                            <CardDescription>A simple tool for converting between JSON and JavaScript objects</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6 md:grid-cols-2">
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Features</h3>
                                        <ul className="space-y-2 text-sm">
                                            {featuresData.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <div className={`h-2 w-2 bg-${feature.color}-500 rounded-full`}></div>
                                                    {feature.title}
                                                </li>
                                            ))}
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
                                        <div className="grid grid-cols-1 gap-2 text-sm">
                                            {supportedFormats.map((format, index) => (
                                                <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded border">
                                                    <format.icon className={`h-4 w-4 text-${format.color}-500`} />
                                                    {format.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Technology</h3>
                                        <p className="text-sm text-muted-foreground">
                                            Built with Next.js, React, and TypeScript. Simple and fast conversion between JSON and JavaScript
                                            object formats.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
