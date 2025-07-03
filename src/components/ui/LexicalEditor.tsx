// components/LexicalEditor.tsx
import { LexicalComposer } from "@lexical/react/LexicalComposer"
import { RichTextPlugin } from "@lexical/react/LexicalRichTextPlugin"
import { ContentEditable } from "@lexical/react/LexicalContentEditable"
import { HistoryPlugin } from "@lexical/react/LexicalHistoryPlugin"
import { LexicalErrorBoundary } from "@lexical/react/LexicalErrorBoundary"

export default function LexicalEditor() {
  const config = {
    namespace: "MyEditor",
    theme: {}, // bisa kamu isi nanti
    onError: (error: Error) => console.error(error),
  }

  return (
    <LexicalComposer initialConfig={config}>
      <RichTextPlugin
        contentEditable={
          <ContentEditable className="border p-4 min-h-[300px] rounded bg-white" />
        }
        placeholder={<div className="text-gray-400">Tulis sesuatu...</div>}
        ErrorBoundary={LexicalErrorBoundary}
      />
      <HistoryPlugin />
    </LexicalComposer>
  )
}
