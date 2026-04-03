<template>
  <el-aside width="280px" class="rightPart">
    <div class="property-panel-container">
      <div class="panel-header">
        <div class="header-icon">🎨</div>
        <h3 class="panel-title">属性面板</h3>
      </div>
      
      <div class="panel-content">
        <div v-if="!selectedShapeName" class="empty-state">
          <div class="empty-icon">👆</div>
          <p class="empty-text">请选择一个图形</p>
          <p class="empty-desc">在画布上点击或框选图形来编辑属性</p>
        </div>
        
        <div v-else class="properties-wrapper">
          <div class="section-divider">
            <span class="divider-text">基础属性</span>
            <div class="divider-line"></div>
          </div>
          
          <div class="property-group">
            <div v-if="shapeType === 'rect'" class="property-item">
              <div class="property-label">
                <span class="label-icon">📏</span>
                宽度
              </div>
              <el-input-number
                v-model="attr.width"
                :min="0"
                :precision="0"
                @change="(value) => handleChange(value, 'width')"
                size="small"
                class="property-input"
              ></el-input-number>
            </div>
            
            <div v-if="shapeType === 'rect'" class="property-item">
              <div class="property-label">
                <span class="label-icon">📐</span>
                高度
              </div>
              <el-input-number
                v-model="attr.height"
                :min="0"
                :precision="0"
                @change="(value) => handleChange(value, 'height')"
                size="small"
                class="property-input"
              ></el-input-number>
            </div>
            
            <div v-if="isPolygon" class="property-item">
              <div class="property-label">
                <span class="label-icon">⭕</span>
                半径
              </div>
              <el-input-number
                v-model="attr.radius"
                :min="0"
                :precision="0"
                @change="(value) => handleChange(value, 'radius')"
                size="small"
                class="property-input"
              ></el-input-number>
            </div>
            
            <div v-if="shapeType === 'arc'" class="property-item">
              <div class="property-label">
                <span class="label-icon">🔘</span>
                内半径
              </div>
              <el-input-number
                v-model="attr.innerRadius"
                :min="0"
                :precision="0"
                @change="(value) => handleChange(value, 'innerRadius')"
                size="small"
                class="property-input"
              ></el-input-number>
            </div>
            
            <div v-if="shapeType === 'arc'" class="property-item">
              <div class="property-label">
                <span class="label-icon">🔵</span>
                外半径
              </div>
              <el-input-number
                v-model="attr.outerRadius"
                :min="0"
                :precision="0"
                @change="(value) => handleChange(value, 'outerRadius')"
                size="small"
                class="property-input"
              ></el-input-number>
            </div>
            
            <div v-if="shapeType === 'arc'" class="property-item">
              <div class="property-label">
                <span class="label-icon">🔄</span>
                角度
              </div>
              <el-slider
                :min="-180"
                :max="180"
                v-model="attr.angle"
                @change="(value) => handleChange(value, 'angle')"
                size="small"
                class="property-slider"
              ></el-slider>
            </div>
            
            <div v-if="shapeType === 'circle'" class="property-item">
              <div class="property-label">
                <span class="label-icon">↔️</span>
                X半径
              </div>
              <el-input-number
                v-model="attr.radiusX"
                :min="0"
                :precision="0"
                @change="(value) => handleChange(value, 'radiusX')"
                size="small"
                class="property-input"
              ></el-input-number>
            </div>
            
            <div v-if="shapeType === 'circle'" class="property-item">
              <div class="property-label">
                <span class="label-icon">↕️</span>
                Y半径
              </div>
              <el-input-number
                v-model="attr.radiusY"
                :min="0"
                :precision="0"
                @change="(value) => handleChange(value, 'radiusY')"
                size="small"
                class="property-input"
              ></el-input-number>
            </div>
            
            <div v-if="shapeType === 'text'" class="property-item">
              <div class="property-label">
                <span class="label-icon">🔤</span>
                字号
              </div>
              <el-input-number
                v-model="attr.fontSize"
                :min="12"
                :max="200"
                :precision="0"
                @change="(value) => handleChange(value, 'fontSize')"
                size="small"
                class="property-input"
              ></el-input-number>
            </div>
            
            <div v-if="shapeType === 'text'" class="property-item">
              <div class="property-label">
                <span class="label-icon">✍️</span>
                字体
              </div>
              <el-select
                v-model="attr.fontFamily"
                placeholder="选择字体"
                @change="(value) => handleChange(value, 'fontFamily')"
                size="small"
                class="property-select"
              >
                <el-option
                  v-for="item in fontFamily"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          
          <div class="section-divider">
            <span class="divider-text">样式属性</span>
            <div class="divider-line"></div>
          </div>
          
          <div class="property-group">
            <div class="property-item">
              <div class="property-label">
                <span class="label-icon">✏️</span>
                描边
              </div>
              <el-switch
                v-model="attr.strokeEnabled"
                @change="(value) => handleChange(value, 'strokeEnabled')"
                size="small"
                active-color="#6366f1"
                inactive-color="#e2e8f0"
              ></el-switch>
            </div>
            
            <div class="property-item" v-if="attr.strokeEnabled">
              <div class="property-label">
                <span class="label-icon">📏</span>
                描边宽度
              </div>
              <el-input-number
                v-model="attr.strokeWidth"
                :min="0"
                :max="20"
                :precision="0"
                @change="(value) => handleChange(value, 'strokeWidth')"
                size="small"
                class="property-input"
              ></el-input-number>
            </div>
            
            <div class="property-item" v-if="attr.strokeEnabled">
              <div class="property-label">
                <span class="label-icon">🎨</span>
                描边颜色
              </div>
              <el-color-picker
                v-model="attr.stroke"
                @change="(value) => handleChange(value, 'stroke')"
                size="small"
                class="property-color"
              ></el-color-picker>
            </div>
            
            <div class="property-item" v-if="shapeType !== 'line'">
              <div class="property-label">
                <span class="label-icon">🪣</span>
                填充
              </div>
              <el-switch
                v-model="attr.fillEnabled"
                @change="(value) => handleChange(value, 'fillEnabled')"
                size="small"
                active-color="#6366f1"
                inactive-color="#e2e8f0"
              ></el-switch>
            </div>
            
            <div class="property-item" v-if="shapeType !== 'line' && attr.fillEnabled">
              <div class="property-label">
                <span class="label-icon">🌈</span>
                填充颜色
              </div>
              <el-color-picker
                v-model="attr.fill"
                @change="(value) => handleChange(value, 'fill')"
                size="small"
                class="property-color"
              ></el-color-picker>
            </div>
            
            <div class="property-item" v-if="shapeType !== 'line'">
              <div class="property-label">
                <span class="label-icon">🔃</span>
                旋转
              </div>
              <el-slider
                :min="-180"
                :max="180"
                v-model="attr.rotate"
                @change="(value) => handleChange(value, 'rotation')"
                size="small"
                class="property-slider"
              ></el-slider>
            </div>
            
            <div class="property-item">
              <div class="property-label">
                <span class="label-icon">✋</span>
                拖拽
              </div>
              <el-switch
                v-model="attr.draggable"
                @change="(value) => handleChange(value, 'draggable')"
                size="small"
                active-color="#6366f1"
                inactive-color="#e2e8f0"
              ></el-switch>
            </div>
          </div>
          
          <div class="section-divider">
            <span class="divider-text">层级控制</span>
            <div class="divider-line"></div>
          </div>
          
          <div class="z-index-controls">
            <el-button @click="moveToTop" class="z-btn z-btn-top">
              <span class="btn-icon">⬆️</span>
              置顶
            </el-button>
            <el-button @click="moveUp" class="z-btn z-btn-up">
              <span class="btn-icon">🔼</span>
              上移
            </el-button>
            <el-button @click="moveDown" class="z-btn z-btn-down">
              <span class="btn-icon">🔽</span>
              下移
            </el-button>
            <el-button @click="moveToBottom" class="z-btn z-btn-bottom">
              <span class="btn-icon">⬇️</span>
              置底
            </el-button>
          </div>
        </div>
      </div>
      
      <div class="panel-footer">
        <el-button type="primary" @click="handleExport" class="export-btn">
          <span class="export-icon">💾</span>
          导出图片
        </el-button>
      </div>
    </div>
  </el-aside>
</template>

<script>
export default {
  name: 'PropertyPanel',
  props: {
    selectedShapeName: {
      type: String,
      default: ''
    },
    attr: {
      type: Object,
      default: () => ({
        width: 0,
        height: 0,
        radius: 0,
        radiusX: 0,
        radiusY: 0,
        innerRadius: 0,
        outerRadius: 0,
        angle: 0,
        rotate: 0,
        fontSize: 12,
        draggable: true,
        strokeEnabled: true,
        strokeWidth: 0,
        stroke: '',
        fillEnabled: true,
        fill: '',
        fontFamily: '',
      })
    }
  },
  computed: {
    shapeType() {
      return this.selectedShapeName.split('-')[0]
    },
    isPolygon() {
      return ['triangle', 'pentagon', 'hexagon'].includes(this.shapeType)
    }
  },
  data() {
    return {
      fontFamily: [
        {
          value: "'Arial'",
          label: '默认字体',
        },
        {
          value: "'SimSun'",
          label: '宋体',
        },
        {
          value: "'SimHei'",
          label: '黑体',
        },
        {
          value: "'Microsoft YaHei'",
          label: '微软雅黑',
        },
        {
          value: "'Microsoft JhengHei'",
          label: '微软正黑体',
        },
        {
          value: "'NSimSun'",
          label: '新宋体',
        },
        {
          value: "'PMingLiU'",
          label: '新细明体',
        },
        {
          value: "'MingLiU'",
          label: '细明体',
        },
        {
          value: "'DFKai-SB'",
          label: '标楷体',
        },
        {
          value: "'FangSong'",
          label: '仿宋',
        },
        {
          value: "'KaiTi'",
          label: '楷体',
        },
        {
          value: "'FangSong_GB2312'",
          label: '仿宋_GB2312',
        },
        {
          value: "'KaiTi_GB2312'",
          label: '楷体_GB2312'
        }
      ],
    }
  },
  methods: {
    handleChange(value, name) {
      this.$emit('change', value, name)
    },
    handleExport() {
      this.$emit('export')
    },
    moveToTop() {
      this.$emit('move-to-top')
    },
    moveUp() {
      this.$emit('move-up')
    },
    moveDown() {
      this.$emit('move-down')
    },
    moveToBottom() {
      this.$emit('move-to-bottom')
    }
  }
}
</script>

<style lang="less" scoped>
.rightPart {
  background: linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%);
  box-shadow: -4px 0 20px rgba(0, 0, 0, 0.08);
  height: 100%;
  overflow: hidden;
  border-left: 1px solid #e2e8f0;
  
  .property-panel-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    background: linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  }
  
  .panel-header {
    padding: 24px 20px 20px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    text-align: center;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%);
      animation: shimmer 3s infinite;
    }
    
    .header-icon {
      font-size: 32px;
      margin-bottom: 8px;
      position: relative;
      z-index: 1;
    }
    
    .panel-title {
      font-size: 18px;
      font-weight: 700;
      color: white;
      margin: 0;
      letter-spacing: 1px;
      position: relative;
      z-index: 1;
      text-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
  }
  
  .panel-content {
    flex: 1;
    overflow-y: auto;
    padding: 20px;
    
    &::-webkit-scrollbar {
      width: 6px;
    }
    
    &::-webkit-scrollbar-track {
      background: #f1f5f9;
    }
    
    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
      
      &:hover {
        background: #94a3b8;
      }
    }
  }
  
  .empty-state {
    text-align: center;
    padding: 60px 20px;
    
    .empty-icon {
      font-size: 48px;
      margin-bottom: 16px;
      opacity: 0.6;
    }
    
    .empty-text {
      font-size: 16px;
      font-weight: 600;
      color: #475569;
      margin: 0 0 8px;
    }
    
    .empty-desc {
      font-size: 13px;
      color: #94a3b8;
      margin: 0;
      line-height: 1.6;
    }
  }
  
  .properties-wrapper {
    .section-divider {
      display: flex;
      align-items: center;
      margin: 24px 0 16px;
      
      .divider-text {
        font-size: 12px;
        font-weight: 600;
        color: #64748b;
        text-transform: uppercase;
        letter-spacing: 1px;
        padding-right: 12px;
        white-space: nowrap;
      }
      
      .divider-line {
        flex: 1;
        height: 1px;
        background: linear-gradient(90deg, #e2e8f0 0%, transparent 100%);
      }
    }
    
    .property-group {
      background: white;
      border-radius: 12px;
      padding: 16px;
      border: 1px solid #f1f5f9;
      box-shadow: 0 1px 3px rgba(0,0,0,0.04);
    }
    
    .property-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 16px;
      
      &:last-child {
        margin-bottom: 0;
      }
      
      .property-label {
        display: flex;
        align-items: center;
        font-size: 13px;
        font-weight: 500;
        color: #475569;
        
        .label-icon {
          margin-right: 8px;
          font-size: 14px;
        }
      }
      
      .property-input {
        width: 120px;
        
        :deep(.el-input__inner) {
          border-radius: 8px;
          border-color: #e2e8f0;
          
          &:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }
        }
      }
      
      .property-select {
        width: 120px;
        
        :deep(.el-input__inner) {
          border-radius: 8px;
          border-color: #e2e8f0;
          
          &:focus {
            border-color: #6366f1;
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
          }
        }
      }
      
      .property-slider {
        flex: 1;
        margin-left: 16px;
      }
      
      .property-color {
        :deep(.el-color-picker__trigger) {
          border-radius: 8px;
          border-color: #e2e8f0;
        }
      }
    }
    
    .z-index-controls {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      
      .z-btn {
        padding: 12px 16px;
        border-radius: 10px;
        border: 1px solid #e2e8f0;
        background: white;
        color: #475569;
        font-weight: 500;
        font-size: 13px;
        transition: all 0.2s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .btn-icon {
          margin-right: 6px;
          font-size: 14px;
        }
        
        &:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        
        &:active {
          transform: translateY(0);
        }
        
        &.z-btn-top {
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          color: white;
          border: none;
        }
        
        &.z-btn-bottom {
          background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%);
          color: white;
          border: none;
        }
      }
    }
  }
  
  .panel-footer {
    padding: 20px;
    background: white;
    border-top: 1px solid #f1f5f9;
    
    .export-btn {
      width: 100%;
      padding: 14px;
      border-radius: 12px;
      font-size: 15px;
      font-weight: 600;
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
      border: none;
      box-shadow: 0 4px 14px rgba(16, 185, 129, 0.3);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      
      .export-icon {
        margin-right: 8px;
        font-size: 18px;
      }
      
      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
      }
      
      &:active {
        transform: translateY(0);
      }
    }
  }
}

@keyframes shimmer {
  0%, 100% {
    transform: translate(-50%, -50%) rotate(0deg);
  }
  50% {
    transform: translate(-50%, -50%) rotate(180deg);
  }
}
</style>
