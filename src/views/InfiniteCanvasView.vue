<template>
  <div class="root">
    <div class="main-container">
      <InfiniteToolBar
        @tool-change="handleToolChange"
        @stroke-width-change="handleStrokeWidthChange"
        @stroke-color-change="handleStrokeColorChange"
        @clear-canvas="handleClearCanvas"
        @export-canvas="handleExportCanvas"
        @undo="handleUndo"
        @redo="handleRedo"
      />
      <InfiniteCanvas
        ref="canvas"
      />
    </div>
  </div>
</template>

<script>
import InfiniteToolBar from '../components/infinite-canvas/InfiniteToolBar.vue'
import InfiniteCanvas from '../components/infinite-canvas/InfiniteCanvas.vue'

export default {
  name: 'InfiniteCanvasView',
  components: {
    InfiniteToolBar,
    InfiniteCanvas
  },
  methods: {
    handleToolChange(toolId) {
      if (this.$refs.canvas) {
        this.$refs.canvas.setTool(toolId)
      }
    },
    handleStrokeWidthChange(width) {
      if (this.$refs.canvas) {
        this.$refs.canvas.setStrokeWidth(width)
      }
    },
    handleStrokeColorChange(color) {
      if (this.$refs.canvas) {
        this.$refs.canvas.setStrokeColor(color)
      }
    },
    handleClearCanvas() {
      if (this.$refs.canvas) {
        this.$refs.canvas.paths = []
        this.$refs.canvas.currentPath = null
        this.$refs.canvas.draw()
      }
    },
    handleExportCanvas() {
      if (this.$refs.canvas) {
        const canvas = this.$refs.canvas.$refs.canvas
        const dataURL = canvas.toDataURL('image/png')
        
        const link = document.createElement('a')
        link.download = 'infinite-canvas.png'
        link.href = dataURL
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
      }
    },
    handleUndo() {
      if (this.$refs.canvas) {
        this.$refs.canvas.undo()
      }
    },
    handleRedo() {
      if (this.$refs.canvas) {
        this.$refs.canvas.redo()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.root {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main-container {
  display: flex;
  flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
</style>