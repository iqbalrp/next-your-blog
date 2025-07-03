"use client"

import { useState, KeyboardEvent } from "react"

interface TagInputProps {
  label?: string
  placeholder?: string
  maxTags?: number
  onChange?: (tags: string[]) => void
}

export default function TagInput({
  label = "Tags",
  placeholder = "Enter your tags",
  maxTags = 10,
  onChange,
}: TagInputProps) {
  const [tags, setTags] = useState<string[]>([])
  const [input, setInput] = useState("")

  const addTag = (tag: string) => {
    const cleaned = tag.trim()
    if (
      !cleaned ||
      tags.includes(cleaned) ||
      tags.length >= maxTags
    ) return

    const updated = [...tags, cleaned]
    setTags(updated)
    onChange?.(updated)
    setInput("")
  }

  const removeTag = (tag: string) => {
    const updated = tags.filter(t => t !== tag)
    setTags(updated)
    onChange?.(updated)
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault()
      addTag(input)
    } else if (e.key === "Backspace" && input === "") {
      removeTag(tags[tags.length - 1])
    }
  }

  return (
    <div className="flex flex-col gap-1">

      <div className="flex flex-wrap items-center gap-2 py-2 px-4 border border-neutral-300 rounded-xl min-h-[48px]">
        {tags.map(tag => (
          <div
            key={tag}
            className="flex items-center gap-1 text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-blue-500 hover:text-blue-700"
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          placeholder={placeholder}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          className="flex-1 min-w-[100px] border-none outline-none text-sm"
        />
      </div>
    </div>
  )
}
