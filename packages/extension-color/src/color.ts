import '@766aya/extension-text-color'

import { Extension } from '@tiptap/core'

export type ColorOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    color: {
      /**
       * Set the text color
       */
      setColor: (color: string) => ReturnType,
      /**
       * Unset the text color
       */
      unsetColor: () => ReturnType,
    }
  }
}

export const Color = Extension.create<ColorOptions>({
  name: 'color',
  addOptions() {
    return {
      types: ['textColor'],
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          color: {
            default: null,
            parseHTML: element => {
              return element.style.getPropertyValue('--color')?.replace(/['"]+/g, '')
            },
            renderHTML: attributes => {
              if (!attributes.color) {
                return {}
              }
              return {
                style: `--color: ${attributes.color}`,
              }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setColor: color => ({ chain }) => {
        return chain()
          .setMark('textColor', { color })
          .run()
      },
      unsetColor: () => ({ chain }) => {
        return chain()
          .setMark('textColor', { color: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
