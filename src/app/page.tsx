"use client"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ConverterSection } from "@/components/convertor-section"
import { TabSection } from "@/components/tab-section"

export default function Home() {
  const { theme, setTheme } = useTheme()

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">JSON ↔ JS Converter</h1>
          <Button variant="outline" size="icon" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </div>

        <ConverterSection />

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

        <TabSection />
      </div>
    </main>
  )
}
