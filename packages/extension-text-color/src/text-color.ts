import {
  getMarkAttributes,
  Mark,
  mergeAttributes,
} from '@tiptap/core'

export interface TextStyleOptions {
  HTMLAttributes: Record<string, any>,
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    textColor: {
      /**
       * Remove spans without inline style attributes.
       */
      removeEmptyTextStyle: () => ReturnType,
    }
  }
}

export const TextColor = Mark.create<TextStyleOptions>({
  name: 'textColor',
  addOptions() {
    return {
      HTMLAttributes: {},
    }
  },
  parseHTML() {
    return [
      {

      },
      {
        tag: 'color',
        getAttrs: element => {
          const hasStyles = (element as HTMLElement).hasAttribute('style')

          if (!hasStyles) {
            return false
          }
          return {}
        },
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return ['color', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
  },
  addCommands() {
    return {
      removeEmptyTextStyle: () => ({ state, commands }) => {
        const attributes = getMarkAttributes(state, this.type)
        const hasStyles = Object.entries(attributes).some(([, value]) => !!value)

        if (hasStyles) {
          return true
        }

        return commands.unsetMark(this.name)
      },
    }
  },

})
