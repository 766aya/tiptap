<template>
  <div class="app-content">
    <div v-if="editor" class="toolbar">
      <button
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        加粗
      </button>
      <button
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        倾斜
      </button>
      <input type="color" v-model="color">
      <button @click="editor.chain().focus().setColor(color).run()" :class="{ 'is-active': editor.isActive('textColor') }">
        设置颜色
      </button>
      <button @click="editor.chain().focus().unsetColor().run()">
        清除颜色
      </button>
      <input type="number" v-model="fontSize">
      <button @click="editor.chain().focus().setSize(fontSize).run()">
        调整字号
      </button>
      <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
        撤销
      </button>
      <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
        还原
      </button>
    </div>
    <EditorContent class="editor" :editor="editor" />
  </div>
</template>

<script lang="ts" setup>
import UnityKit from '@tiptap/unity-kit'
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, onMounted, ref } from 'vue'

const color = ref()
const fontSize = ref(1)

const editor = new Editor({
  extensions: [UnityKit],
  parseOptions: {},
  content: '1<b>23</b><i>45</i><color>67</color><color style="--color: #ff0000">89</color>01',
})

window.editor = editor

onMounted(() => {
  console.log(editor)
})

onBeforeUnmount(() => {
  editor.destroy()
})
</script>

<style lang="scss">
body {
  margin: 0;
}

* {
  box-sizing: border-box;
}

.app-content {
  display: flex;
  flex-direction: column;
  padding: 10px;
  height: 100vh;
  overflow: hidden;

  .toolbar {
    display: flex;
    background-color: #333333;
    padding: 10px;
    column-gap: 10px;
  }

  .editor {
    width: 100%;
    flex: 1;
    border: 1px solid #000000;
    overflow: hidden;
    display: flex;
    > .ProseMirror {
      width: 100%;
      min-height: 100%;
      display: inline-block;
      outline: none;
      padding: 10px;
      p {
        margin: 0;
      }

      size {
        font-size: calc(var(--size, 1) * 16px);
      }

      color {
        color: var(--color, #000000);
      }
    }
  }
}
</style>
