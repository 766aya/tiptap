import { Bold, BoldOptions } from '@766aya/extension-bold'
import { Color, ColorOptions } from '@766aya/extension-color'
import { Document } from '@766aya/extension-document'
import { Italic, ItalicOptions } from '@766aya/extension-italic'
import { Size, SizeOptions } from '@766aya/extension-size'
import { TextColor } from '@766aya/extension-text-color'
import { TextSize } from '@766aya/extension-text-size'
import { Extension } from '@tiptap/core'
import { Dropcursor, DropcursorOptions } from '@tiptap/extension-dropcursor'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import { History, HistoryOptions } from '@tiptap/extension-history'
import { Paragraph, ParagraphOptions } from '@tiptap/extension-paragraph'
import { Text } from '@tiptap/extension-text'

export interface UnityKitOptions {
  bold: Partial<BoldOptions> | false,
  document: false,
  dropcursor: Partial<DropcursorOptions> | false,
  gapcursor: false,
  history: Partial<HistoryOptions> | false,
  italic: Partial<ItalicOptions> | false,
  color: Partial<ColorOptions> | false,
  size: Partial<SizeOptions> | false,
  paragraph: Partial<ParagraphOptions> | false,
  text: false,
  textColor: false,
  textSize: false,
}

export const UnityKit = Extension.create<UnityKitOptions>({
  name: 'unityKit',
  addExtensions() {
    const extensions = []

    if (this.options.textColor !== false) {
      extensions.push(TextColor.configure(this.options?.textColor))
    }
    if (this.options.textSize !== false) {
      extensions.push(TextSize.configure(this.options?.textSize))
    }

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold))
    }

    if (this.options.document !== false) {
      extensions.push(Document.configure(this.options?.document))
    }

    if (this.options.dropcursor !== false) {
      extensions.push(Dropcursor.configure(this.options?.dropcursor))
    }

    if (this.options.gapcursor !== false) {
      extensions.push(Gapcursor.configure(this.options?.gapcursor))
    }

    if (this.options.history !== false) {
      extensions.push(History.configure(this.options?.history))
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic))
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text))
    }

    if (this.options.color !== false) {
      extensions.push(Color.configure(this.options?.color))
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph))
    }

    if (this.options.size !== false) {
      extensions.push(Size.configure(this.options?.size))
    }
    return extensions
  },
})
