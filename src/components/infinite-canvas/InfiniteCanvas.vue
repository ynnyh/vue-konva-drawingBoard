<template>
  <div class="infinite-canvas-container" ref="container" @wheel="handleWheel" @mousedown="handleMouseDown" @mousemove="handleMouseMove" @mouseup="handleMouseUp" @keydown="handleKeyDown" @keyup="handleKeyUp">
    <canvas ref="canvas"></canvas>
    <!-- 平移提示 -->
    <div v-if="showPanHint" class="pan-hint">
      <span>按住空格键 + 拖拽鼠标来平移画布</span>
    </div>
    <!-- 缩放控制 -->
    <div class="zoom-controls">
      <button @click="zoomIn" class="zoom-btn">+</button>
      <div class="zoom-level">{{ Math.round(scale * 100) }}%</div>
      <button @click="zoomOut" class="zoom-btn">-</button>
      <button @click="resetView" class="reset-btn">⌂</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfiniteCanvas',
  data() {
    return {
      isDrawing: false,
      isPanning: false,
      isSpacePressed: false,
      showPanHint: false,
      scale: 1,
      translateX: 0,
      translateY: 0,
      lastMousePos: { x: 0, y: 0 },
      startPos: { x: 0, y: 0 },
      currentPath: null,
      paths: [],
      currentTool: 'draw', // 'draw' or 'erase'
      strokeWidth: 5,
      strokeColor: '#000000',
      canvasWidth: 0,
      canvasHeight: 0,
      // 撤销/重做
      undoStack: [],
      redoStack: [],
      maxUndoSteps: 10
    }
  },
  mounted() {
    this.initCanvas()
    window.addEventListener('resize', this.handleResize)
    // 全局监听键盘事件，确保空格键在任何地方都能触发
    window.addEventListener('keydown', this.handleKeyDown)
    window.addEventListener('keyup', this.handleKeyUp)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    window.removeEventListener('keydown', this.handleKeyDown)
    window.removeEventListener('keyup', this.handleKeyUp)
  },
  methods: {
    initCanvas() {
      const container = this.$refs.container
      const canvas = this.$refs.canvas
      
      this.canvasWidth = container.clientWidth
      this.canvasHeight = container.clientHeight
      
      canvas.width = this.canvasWidth
      canvas.height = this.canvasHeight
      
      this.draw()
    },
    handleResize() {
      this.initCanvas()
    },
    draw() {
      const canvas = this.$refs.canvas
      const ctx = canvas.getContext('2d')
      
      // 清空画布
      ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight)
      
      // 应用变换
      ctx.save()
      ctx.translate(this.translateX, this.translateY)
      ctx.scale(this.scale, this.scale)
      
      // 绘制网格
      this.drawGrid(ctx)
      
      // 绘制所有路径
      this.paths.forEach(path => {
        this.drawPath(ctx, path)
      })
      
      // 绘制当前路径
      if (this.currentPath) {
        this.drawPath(ctx, this.currentPath)
      }
      
      ctx.restore()
    },
    drawGrid(ctx) {
      const gridSize = 20
      const width = this.canvasWidth / this.scale
      const height = this.canvasHeight / this.scale
      
      ctx.strokeStyle = '#e0e0e0'
      ctx.lineWidth = 1
      
      // 计算网格的起始位置，确保网格能够跟随平移
      const offsetX = this.translateX / this.scale
      const offsetY = this.translateY / this.scale
      const startX = Math.floor(offsetX / gridSize) * gridSize
      const startY = Math.floor(offsetY / gridSize) * gridSize
      
      // 扩展绘制范围，确保足够大的网格覆盖区域
      const gridCount = 20 // 绘制更多网格，确保拖拽后仍能看到
      const extendedWidth = width + gridSize * gridCount
      const extendedHeight = height + gridSize * gridCount
      
      // 绘制垂直线
      for (let x = startX - gridSize * gridCount; x < startX + extendedWidth; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, startY - gridSize * gridCount)
        ctx.lineTo(x, startY + extendedHeight)
        ctx.stroke()
      }
      
      // 绘制水平线
      for (let y = startY - gridSize * gridCount; y < startY + extendedHeight; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(startX - gridSize * gridCount, y)
        ctx.lineTo(startX + extendedWidth, y)
        ctx.stroke()
      }
    },
    drawPath(ctx, path) {
      if (path.points.length < 2) return
      
      if (path.type === 'erase') {
        ctx.globalCompositeOperation = 'destination-out'
        ctx.strokeStyle = '#000000'
        ctx.lineWidth = path.strokeWidth
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
      } else {
        ctx.globalCompositeOperation = 'source-over'
        ctx.strokeStyle = path.strokeColor
        ctx.lineWidth = path.strokeWidth
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
      }
      
      ctx.beginPath()
      ctx.moveTo(path.points[0], path.points[1])
      
      for (let i = 2; i < path.points.length; i += 2) {
        ctx.lineTo(path.points[i], path.points[i + 1])
      }
      
      ctx.stroke()
      ctx.globalCompositeOperation = 'source-over'
    },
    handleKeyDown(e) {
      if (e.key === ' ') {
        e.preventDefault()
        this.isSpacePressed = true
        this.showPanHint = true
        this.$refs.container.style.cursor = 'grab'
      }
    },
    handleKeyUp(e) {
      if (e.key === ' ') {
        this.isSpacePressed = false
        this.showPanHint = false
        this.$refs.container.style.cursor = 'default'
      }
    },
    handleMouseDown(e) {
      // 平移功能
      if (this.isSpacePressed || e.button === 1) {
        e.preventDefault()
        this.isPanning = true
        this.lastMousePos = {
          x: e.clientX,
          y: e.clientY
        }
        this.$refs.container.style.cursor = 'grabbing'
        return
      }
      
      // 绘制功能
      if (e.button === 0) {
        const rect = this.$refs.canvas.getBoundingClientRect()
        const x = (e.clientX - rect.left - this.translateX) / this.scale
        const y = (e.clientY - rect.top - this.translateY) / this.scale
        
        this.isDrawing = true
        this.startPos = { x, y }
        
        this.currentPath = {
          points: [x, y],
          strokeColor: this.strokeColor,
          strokeWidth: this.strokeWidth,
          type: this.currentTool
        }
      }
    },
    handleMouseMove(e) {
      // 平移逻辑
      if (this.isPanning) {
        e.preventDefault()
        const deltaX = e.clientX - this.lastMousePos.x
        const deltaY = e.clientY - this.lastMousePos.y
        
        this.translateX += deltaX
        this.translateY += deltaY
        
        this.lastMousePos = {
          x: e.clientX,
          y: e.clientY
        }
        
        this.draw()
        return
      }
      
      // 绘制逻辑
      if (this.isDrawing && this.currentPath) {
        const rect = this.$refs.canvas.getBoundingClientRect()
        const x = (e.clientX - rect.left - this.translateX) / this.scale
        const y = (e.clientY - rect.top - this.translateY) / this.scale
        
        this.currentPath.points.push(x, y)
        this.draw()
      }
    },
    handleMouseUp(e) {
      // 结束平移
      if (this.isPanning) {
        this.isPanning = false
        this.$refs.container.style.cursor = this.isSpacePressed ? 'grab' : 'default'
        return
      }
      
      // 结束绘制
      if (this.isDrawing && this.currentPath) {
        this.paths.push(this.currentPath)
        this.currentPath = null
        this.isDrawing = false
        this.draw()
        // 保存状态快照
        this.saveSnapshot()
      }
    },
    handleWheel(e) {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -0.1 : 0.1
      const newScale = Math.max(0.1, Math.min(5, this.scale * (1 + delta)))
      
      if (newScale !== this.scale) {
        const rect = this.$refs.canvas.getBoundingClientRect()
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        
        // 计算鼠标在世界坐标系中的位置
        const worldX = (mouseX - this.translateX) / this.scale
        const worldY = (mouseY - this.translateY) / this.scale
        
        // 更新缩放
        this.scale = newScale
        
        // 调整平移，使鼠标位置保持不变
        this.translateX = mouseX - worldX * this.scale
        this.translateY = mouseY - worldY * this.scale
        
        this.draw()
      }
    },
    zoomIn() {
      const newScale = Math.min(5, this.scale * 1.2)
      if (newScale !== this.scale) {
        this.scale = newScale
        this.draw()
      }
    },
    zoomOut() {
      const newScale = Math.max(0.1, this.scale / 1.2)
      if (newScale !== this.scale) {
        this.scale = newScale
        this.draw()
      }
    },
    resetView() {
      this.scale = 1
      this.translateX = 0
      this.translateY = 0
      this.draw()
    },
    setTool(tool) {
      this.currentTool = tool
    },
    setStrokeWidth(width) {
      this.strokeWidth = width
    },
    setStrokeColor(color) {
      this.strokeColor = color
    },
    // 保存状态快照
    saveSnapshot() {
      // 深拷贝当前路径状态
      const snapshot = {
        paths: JSON.parse(JSON.stringify(this.paths))
      }
      
      // 压入撤销栈
      this.undoStack.push(snapshot)
      
      // 限制撤销步数
      if (this.undoStack.length > this.maxUndoSteps) {
        this.undoStack.shift()
      }
      
      // 清空重做栈
      this.redoStack = []
    },
    // 撤销
    undo() {
      if (this.undoStack.length > 0) {
        // 保存当前状态到重做栈
        const currentSnapshot = {
          paths: JSON.parse(JSON.stringify(this.paths))
        }
        this.redoStack.push(currentSnapshot)
        
        // 从撤销栈弹出并恢复状态
        const snapshot = this.undoStack.pop()
        this.paths = snapshot.paths
        this.draw()
      }
    },
    // 重做
    redo() {
      if (this.redoStack.length > 0) {
        // 保存当前状态到撤销栈
        const currentSnapshot = {
          paths: JSON.parse(JSON.stringify(this.paths))
        }
        this.undoStack.push(currentSnapshot)
        
        // 从重做栈弹出并恢复状态
        const snapshot = this.redoStack.pop()
        this.paths = snapshot.paths
        this.draw()
      }
    }
  }
}
</script>

<style scoped>
.infinite-canvas-container {
  flex: 1;
  height: 100%;
  overflow: hidden;
  background: white;
  position: relative;
}

canvas {
  display: block;
  width: 100%;
  height: 100%;
  cursor: crosshair;
}

.pan-hint {
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 12px;
  z-index: 1000;
  animation: fadeInOut 2s ease-in-out;
}

.zoom-controls {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 5px;
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.zoom-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.zoom-btn:hover {
  background: #f5f5f5;
}

.zoom-level {
  text-align: center;
  font-size: 12px;
  color: #666;
  margin: 5px 0;
}

.reset-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  background: white;
  cursor: pointer;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.reset-btn:hover {
  background: #f5f5f5;
}

@keyframes fadeInOut {
  0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
  20% { opacity: 1; transform: translateX(-50%) translateY(0); }
  80% { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
}
</style>