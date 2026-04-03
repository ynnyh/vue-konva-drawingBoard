<template>
  <el-aside width="60px" class="leftPart">
    <el-scrollbar style="height: 100%">
      <el-row :gutter="10" class="tool-bar-container">
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="选择工具"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'arrow' }"
              @click="changeArrowType('arrow')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-arrow"></use>
              </svg>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="三角形"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'triangle' }"
              @click="changeArrowType('triangle')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-triangle"></use>
              </svg>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="矩形"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'rect' }"
              @click="changeArrowType('rect')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-rect"></use>
              </svg>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="五边形"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'pentagon' }"
              @click="changeArrowType('pentagon')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pentagon"></use>
              </svg>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="六边形"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'hexagon' }"
              @click="changeArrowType('hexagon')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-hexagon"></use>
              </svg>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="椭圆"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'circle' }"
              @click="changeArrowType('circle')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-circle"></use>
              </svg>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="弧形"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'arc' }"
              @click="changeArrowType('arc')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-arc"></use>
              </svg>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="自由线条"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'line' }"
              @click="changeArrowType('line')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-pencil"></use>
              </svg>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="文字"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'text' }"
              @click="changeArrowType('text')"
            >
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-text"></use>
              </svg>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="导入图片"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'image' }"
              @click="triggerImageUpload"
            >
              <span class="icon-emoji">🖼️</span>
            </div>
          </el-tooltip>
          <input
            ref="imageInput"
            type="file"
            accept="image/*"
            style="display: none"
            @change="handleImageSelect"
          />
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="贝塞尔曲线"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'bezier' }"
              @click="changeArrowType('bezier')"
            >
              <span class="icon-emoji">〰️</span>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="路径绘制"
            placement="right"
          >
            <div
              class="tool-icon"
              :class="{ active: arrowType === 'path' }"
              @click="changeArrowType('path')"
            >
              <span class="icon-emoji">✏️</span>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="组合"
            placement="right"
          >
            <div class="tool-icon" @click="handleGroup">
              <span class="icon-emoji">📦</span>
            </div>
          </el-tooltip>
        </el-col>
        
        <el-col :span="24" class="tool-item">
          <el-tooltip
            class="item"
            effect="dark"
            content="取消组合"
            placement="right"
          >
            <div class="tool-icon" @click="handleUngroup">
              <span class="icon-emoji">📤</span>
            </div>
          </el-tooltip>
        </el-col>
      </el-row>
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {
  name: 'ToolBar',
  props: {
    arrowType: {
      type: String,
      default: 'arrow'
    }
  },
  methods: {
    changeArrowType(type) {
      this.$emit('change-arrow-type', type)
    },
    triggerImageUpload() {
      this.$refs.imageInput.click()
    },
    handleImageSelect(e) {
      const file = e.target.files[0]
      if (file) {
        this.$emit('import-image', file)
        e.target.value = ''
      }
    },
    handleGroup() {
      this.$emit('group-shapes')
    },
    handleUngroup() {
      this.$emit('ungroup-shapes')
    }
  }
}
</script>

<style lang="less" scoped>
.leftPart {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 20px 0;
  box-sizing: border-box;
  
  :deep(.el-scrollbar__wrap) {
    overflow-x: hidden;
  }
  
  .tool-bar-container {
    padding: 0 10px;
  }
  
  .tool-item {
    margin-bottom: 15px;
    text-align: center;
  }
  
  .tool-icon {
    width: 40px;
    height: 40px;
    border-radius: 8px;
    background: #ffffff;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    margin: 0 auto;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
      background: #f0f4f8;
    }
    
    &.active {
      background: #409EFF;
      color: white;
      box-shadow: 0 4px 8px rgba(64, 158, 255, 0.3);
      
      .icon, .icon-emoji {
        color: white !important;
      }
    }
    
    .icon {
      font-size: 24px;
      color: #444;
      transition: color 0.3s ease;
    }
    
    .icon-emoji {
      font-size: 20px;
      line-height: 1;
    }
  }
}
</style>
