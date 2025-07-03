"use client"

import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from "react"
import { EDITOR_TOOLS } from "./editorTools"

const EditorClient = forwardRef((_, editorRef) => {
  const localRef = useRef<any>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return

    const init = async () => {
      const EditorJS = (await import("@editorjs/editorjs")).default

      const editor = new EditorJS({
        holder: "editorjs",
        tools: EDITOR_TOOLS,
        autofocus: true,
        onReady() {
          localRef.current = editor
        },
      })
    }

    init()

    return () => {
      if (localRef.current?.destroy) {
        localRef.current.destroy()
        localRef.current = null
      }
    }
  }, [isMounted])

  // expose ref ke luar
  useImperativeHandle(editorRef, () => ({
    save: async () => {
      if (!localRef.current) throw new Error("Editor belum siap")
      return await localRef.current.save()
    },
  }))

  return <div id="editorjs" className="min-h-[300px] w-full border py-4 rounded-[8px] border-neutral-300 bg-white" />
})

EditorClient.displayName = "EditorClient"
export default EditorClient
