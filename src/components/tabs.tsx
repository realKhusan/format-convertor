import React from 'react'
import { examples } from "@/constants/examples"
import { howToUseSteps } from "@/constants/how-to-use"
import { cn } from "@/lib/utils"
import { aboutInfo } from "@/constants/about"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, BookOpen, HelpCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

function TabsSection() {
    return (
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
                                {howToUseSteps.map((step) => (
                                    <div key={step.id} className="flex items-start gap-3">
                                        <div
                                            className={cn("flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium", step.color.bg, step.color.text)}
                                        >
                                            {step.id}
                                        </div>
                                        <div>
                                            <h3 className="font-medium">{step.title}</h3>
                                            <p className="text-sm text-muted-foreground">{step.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="examples" className="mt-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {examples.map((item) => (
                            <Card key={item.id}>
                                <CardHeader>
                                    <CardTitle className="text-lg">{item.title}</CardTitle>
                                    <CardDescription>{item.desc}</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {item.codes.map((codeBlock) => (
                                            <div key={codeBlock.id}>
                                                <h4 className={cn("text-sm font-medium mb-2", codeBlock.color)}>
                                                    {codeBlock.title}
                                                </h4>
                                                <pre className="bg-muted p-3 rounded-md text-sm overflow-x-auto">
                                                    {codeBlock.code}
                                                </pre>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="about" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className={"h-5 w-5 text-purple-500"} />
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
                                            {aboutInfo.features.map((feature, index) => (
                                                <li key={index} className="flex items-center gap-2">
                                                    <div className={`h-2 w-2 ${feature.color} rounded-full`} />
                                                    {feature.label}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Privacy</h3>
                                        <p className="text-sm text-muted-foreground">All conversions happen locally in your browser. Your data never leaves your device, ensuring complete privacy and security.</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Supported Formats</h3>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            {aboutInfo.supportedFormats.map((item, index) => (
                                                <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                                                    <item.icon className={`h-4 w-4 ${item.color}`} />
                                                    {item.label}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">Technology</h3>
                                        <p className="text-sm text-muted-foreground">Built with Next.js, React, and TypeScript. Uses modern web technologies for fast, reliable data conversion.</p>
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

export default TabsSection
