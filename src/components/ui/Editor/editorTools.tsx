// lib/utils/editorTools.ts
import Header from "@editorjs/header";
// import Paragraph from "@editorjs/paragraph"
import List from "@editorjs/list";
import Checklist from "@editorjs/checklist";
import Quote from "@editorjs/quote";
import Warning from "@editorjs/warning";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Marker from "@editorjs/marker";
import Code from "@editorjs/code";
import Table from "@editorjs/table";
import Embed from "@editorjs/embed";
import LinkTool from "@editorjs/link";
import ImageTool from "@editorjs/image";
import Paragraph from "editorjs-paragraph-with-alignment";
// import Title from "title-editorjs";
import FontSizeInlineTool from "./FontSizeInlineTool";
export const EDITOR_TOOLS = {
  header: { class: Header, inlineToolbar: true },
  fontSize: FontSizeInlineTool,
  paragraph: {
    class: Paragraph,
    inlineToolbar:true,
    config: {
      placeholder: "Enter your content",
      preserveBlank: true,
    },
  },
  list: { class: List, inlineToolbar: true },
//   title: { class: Title, inlineToolbar: true },
  checklist: { class: Checklist, inlineToolbar: true },
  quote: { class: Quote, inlineToolbar: true },
  warning: { class: Warning, inlineToolbar: true },
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
        byFile: "/api/upload", // ← Ganti sesuai handler kamu
        byUrl: "/api/fetch-url",
      },
    },
  },
};
