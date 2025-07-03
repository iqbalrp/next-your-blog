import type EditorJS from "@editorjs/editorjs";
export default class FontSizeInlineTool {
  static isInline = true
  static title = "Font size"
  static sanitize = {
    span: {
      style: true,
    },
  }

  private api: EditorJS.API;
  private selectEl!: HTMLSelectElement
  private currentSize = "16px"

  constructor({ api }: { api:  EditorJS.API }) {
    this.api = api
  }

  render() {
    const wrapper = document.createElement("div")
    wrapper.classList.add("cdx-inline-tool")

    this.selectEl = document.createElement("select")
    this.selectEl.classList.add("text-xs", "rounded", "px-1", "bg-white")
    this.selectEl.setAttribute("contenteditable", "false")

    const sizes = ["12px", "14px", "16px", "18px", "20px", "24px", "32px"]
    sizes.forEach(size => {
      const option = document.createElement("option")
      option.value = size
      option.textContent = size
      this.selectEl.appendChild(option)
    })

    // set value awal (persistent)
    this.selectEl.value = this.currentSize

    this.selectEl.addEventListener("change", () => {
      const size = this.selectEl.value
      this.currentSize = size

      const selection = window.getSelection()
      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)

      // Bungkus teks dengan span berukuran sesuai
      const contents = range.extractContents()
      const span = document.createElement("span")
      span.style.fontSize = size
      span.appendChild(contents)
      range.insertNode(span)

      // Optional: move cursor ke setelah node
      range.setStartAfter(span)
      range.collapse(true)
      selection.removeAllRanges()
      selection.addRange(range)
    })

    wrapper.appendChild(this.selectEl)
    return wrapper
  }

  checkState(selection: Selection) {
    if (!selection || selection.rangeCount === 0) return
    const anchor = selection.anchorNode
    if (!anchor) return

    const parent = anchor.parentElement
    if (!parent) return

    const style = window.getComputedStyle(parent)
    const detected = style.fontSize
    if (detected) {
      this.selectEl.value = detected
      this.currentSize = detected
    }
  }
}
