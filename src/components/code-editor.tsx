"use client"

import type React from "react"
import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface CodeEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  readOnly?: boolean
  className?: string
}

export function CodeEditor({
  value,
  onChange,
  placeholder = "Enter your code here...",
  readOnly = false,
  className,
}: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const lineNumbersRef = useRef<HTMLDivElement>(null)

  const lines = value.split("\n")
  const lineCount = Math.max(lines.length, 1)

  useEffect(() => {
    if (lineNumbersRef.current && textareaRef.current) {
      const textarea = textareaRef.current
      const lineNumbers = lineNumbersRef.current

      const syncScroll = () => {
        lineNumbers.scrollTop = textarea.scrollTop
      }

      textarea.addEventListener("scroll", syncScroll)
      return () => textarea.removeEventListener("scroll", syncScroll)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!readOnly) {
      onChange(e.target.value)
    }
  }

  return (
    <div className={cn("relative border border-border rounded-md overflow-hidden bg-background", className)}>
      <div className="flex">
        {/* Line Numbers */}
        <div
          ref={lineNumbersRef}
          className="flex-shrink-0 w-12 bg-muted/50 border-r border-border overflow-hidden h-[300px]"
        >
          <div className="py-3 px-2 text-xs text-muted-foreground font-mono leading-5">
            {Array.from({ length: lineCount }, (_, i) => (
              <div key={i + 1} className="text-right">
                {i + 1}
              </div>
            ))}
          </div>
        </div>

        {/* Code Area */}
        <div className="flex-1 relative h-[300px]">
          <textarea
            ref={textareaRef}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            readOnly={readOnly}
            className={cn(
              "w-full h-[300px] p-3 bg-transparent border-none outline-none resize-none font-mono text-sm leading-5",
              "placeholder:text-muted-foreground",
              readOnly && "cursor-default",
            )}
            style={{
              overflow: "auto",
              whiteSpace: "pre",
              wordWrap: "normal",
            }}
            spellCheck={false}
          />

          {/* Placeholder when empty */}
          {!value && !readOnly && (
            <div className="absolute top-3 left-3 text-muted-foreground text-sm font-mono pointer-events-none">
              {placeholder}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
