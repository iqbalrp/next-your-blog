// lib/editorTools.ts

import Header from "@editorjs/header"
import Paragraph from "@editorjs/paragraph"
import List from "@editorjs/list"
import Checklist from "@editorjs/checklist"
import Quote from "@editorjs/quote"
import Warning from "@editorjs/warning"
import Delimiter from "@editorjs/delimiter"
import InlineCode from "@editorjs/inline-code"
import Marker from "@editorjs/marker"
import Code from "@editorjs/code"
import Table from "@editorjs/table"
import Embed from "@editorjs/embed"
import LinkTool from "@editorjs/link"
import ImageTool from "@editorjs/image"

export const EDITOR_TOOLS = {
  header: Header,
  paragraph: Paragraph,
  list: List,
  checklist: Checklist,
  quote: Quote,
  warning: Warning,
  delimiter: Delimiter,
  inlineCode: InlineCode,
  marker: Marker,
  code: Code,
  table: Table,
  embed: Embed,
  linkTool: LinkTool,
  image: {
    class: ImageTool,
    config: {
      endpoints: {
        byFile: "/api/upload", // Ganti sesuai backend kamu
        byUrl: "/api/fetch-url",
      },
    },
  },
}
