import { Extension } from '@tiptap/core'
import { Bold, BoldOptions } from '@tiptap/extension-bold'
import { Document } from '@tiptap/extension-document'
import { Dropcursor, DropcursorOptions } from '@tiptap/extension-dropcursor'
import { Gapcursor } from '@tiptap/extension-gapcursor'
import { History, HistoryOptions } from '@tiptap/extension-history'
import { Italic, ItalicOptions } from '@tiptap/extension-italic'
import { Text } from '@tiptap/extension-text'

export interface StarterKitOptions {
  bold: Partial<BoldOptions> | false,
  document: false,
  dropcursor: Partial<DropcursorOptions> | false,
  gapcursor: false,
  history: Partial<HistoryOptions> | false,
  italic: Partial<ItalicOptions> | false,
  text: false,
}

export const StarterKit = Extension.create<StarterKitOptions>({
  name: 'starterKit',

  addExtensions() {
    const extensions = []

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

    return extensions
  },
})
