import { Extension } from '@tiptap/core'

export type SizeOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    size: {
      /**
       * Set the text size
       */
      setSize: (size: number) => ReturnType,
      /**
       * Unset the text size
       */
      unsetSize: () => ReturnType,
    }
  }
}

export const Size = Extension.create<SizeOptions>({
  name: 'size',
  addOptions() {
    return {
      types: ['textSize'],
    }
  },
  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          size: {
            default: null,
            parseHTML: element => {
              return element.style.fontSize?.replace(/['"]+/g, '')
            },
            renderHTML: attributes => {
              if (!attributes.size) {
                return {}
              }
              return {
                style: `--size: ${attributes.size}`,
              }
            },
          },
        },
      },
    ]
  },
  addCommands() {
    return {
      setSize: size => ({ chain }) => {
        return chain()
          .setMark('textSize', { size })
          .run()
      },
      unsetSize: () => ({ chain }) => {
        return chain()
          .setMark('textSize', { size: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
