// components/ui/Editor/Editor.tsx
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("./EditorClient"), { ssr: false })
export default Editor
