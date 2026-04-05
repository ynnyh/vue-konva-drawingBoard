<template>
  <div class="infinite-toolbar">
    <div class="toolbar-header">
      <h3>绘图工具</h3>
    </div>
    <div class="toolbar-content">
      <div class="tool-group">
        <button 
          v-for="tool in tools" 
          :key="tool.id"
          :class="['tool-btn', { active: currentTool === tool.id }]"
          @click="selectTool(tool.id)"
          :title="tool.name"
        >
          <span class="tool-icon">{{ tool.icon }}</span>
          <span class="tool-name">{{ tool.name }}</span>
        </button>
      </div>
      <div class="tool-group">
        <div class="tool-property">
          <label>线条宽度</label>
          <input 
            type="range" 
            min="1" 
            max="20" 
            v-model.number="strokeWidth"
            @change="updateStrokeWidth"
          >
          <span>{{ strokeWidth }}px</span>
        </div>
        <div class="tool-property">
          <label>线条颜色</label>
          <input 
            type="color" 
            v-model="strokeColor"
            @change="updateStrokeColor"
          >
        </div>
      </div>
      <div class="tool-group">
        <button @click="undo" class="action-btn">
          <span class="btn-icon">↶</span>
          撤销
        </button>
        <button @click="redo" class="action-btn">
          <span class="btn-icon">↷</span>
          重做
        </button>
        <button @click="clearCanvas" class="action-btn danger">
          <span class="btn-icon">🗑️</span>
          清空画布
        </button>
        <button @click="exportCanvas" class="action-btn">
          <span class="btn-icon">💾</span>
          导出
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'InfiniteToolBar',
  data() {
    return {
      currentTool: 'draw',
      strokeWidth: 5,
      strokeColor: '#000000',
      tools: [
        { id: 'draw', name: '绘制', icon: '✏️' },
        { id: 'erase', name: '擦除', icon: '🧽' }
      ]
    }
  },
  methods: {
    selectTool(toolId) {
      this.currentTool = toolId
      this.$emit('tool-change', toolId)
    },
    updateStrokeWidth() {
      this.$emit('stroke-width-change', this.strokeWidth)
    },
    updateStrokeColor() {
      this.$emit('stroke-color-change', this.strokeColor)
    },
    clearCanvas() {
      if (confirm('确定要清空画布吗？')) {
        this.$emit('clear-canvas')
      }
    },
    exportCanvas() {
      this.$emit('export-canvas')
    },
    undo() {
      this.$emit('undo')
    },
    redo() {
      this.$emit('redo')
    }
  }
}
</script>

<style scoped>
.infinite-toolbar {
  width: 200px;
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.08);
  height: 100%;
  overflow: hidden;
  border-right: 1px solid #e2e8f0;
}

.toolbar-header {
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  text-align: center;
}

.toolbar-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: white;
  letter-spacing: 1px;
}

.toolbar-content {
  padding: 20px;
}

.tool-group {
  margin-bottom: 30px;
}

.tool-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.tool-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.tool-btn.active {
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
}

.tool-icon {
  font-size: 18px;
  margin-right: 10px;
}

.tool-name {
  font-weight: 500;
}

.tool-property {
  margin-bottom: 15px;
}

.tool-property label {
  display: block;
  font-size: 13px;
  font-weight: 500;
  color: #475569;
  margin-bottom: 6px;
}

.tool-property input[type="range"] {
  width: 100%;
  margin-bottom: 5px;
}

.tool-property input[type="color"] {
  width: 100%;
  height: 30px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  cursor: pointer;
}

.tool-property span {
  font-size: 12px;
  color: #64748b;
  display: block;
  text-align: right;
}

.action-btn {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
  margin-bottom: 8px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
}

.action-btn:hover {
  background: #f8fafc;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.action-btn.danger {
  border-color: #ef4444;
  color: #ef4444;
}

.action-btn.danger:hover {
  background: #fef2f2;
  border-color: #dc2626;
}

.btn-icon {
  font-size: 16px;
  margin-right: 8px;
}
</style>