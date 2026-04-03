<template>
  <div class="rightPart">
    <div class="panel-header">
      <div class="header-icon">🎨</div>
      <h2>属性面板</h2>
    </div>
    
    <div class="panel-content">
      <div v-if="!selectedShapeName" class="placeholder">
        <div class="placeholder-icon">👆</div>
        <h3>请选择一个图形</h3>
        <p>在画布上点击或框选图形来编辑属性</p>
      </div>
      
      <div v-else class="properties">
        <div v-show="selectedShapeName.split('-')[0] === 'rect'" class="attr-row">
          <span class="attr">宽度</span>
          <el-input-number
            v-model="attr.width"
            :min="0"
            :precision="0"
            @change="(value) => handleChange(value, 'width')"
          ></el-input-number>
        </div>
        <div v-show="selectedShapeName.split('-')[0] === 'rect'" class="attr-row">
          <span class="attr">高度</span>
          <el-input-number
            v-model="attr.height"
            :min="0"
            :precision="0"
            @change="(value) => handleChange(value, 'height')"
          ></el-input-number>
        </div>
        <div
          class="attr-row"
          v-show="
            selectedShapeName.split('-')[0] === 'triangle' ||
            selectedShapeName.split('-')[0] === 'pentagon' ||
            selectedShapeName.split('-')[0] === 'hexagon'
          "
        >
          <span class="attr">半径</span>
          <el-input-number
            v-model="attr.radius"
            :min="0"
            :precision="0"
            @change="(value) => handleChange(value, 'radius')"
          ></el-input-number>
        </div>
        <div v-show="selectedShapeName.split('-')[0] === 'arc'" class="attr-row">
          <span class="attr">内半径</span>
          <el-input-number
            v-model="attr.innerRadius"
            :min="0"
            :precision="0"
            @change="(value) => handleChange(value, 'innerRadius')"
          ></el-input-number>
        </div>
        <div v-show="selectedShapeName.split('-')[0] === 'arc'" class="attr-row">
          <span class="attr">外半径</span>
          <el-input-number
            v-model="attr.outerRadius"
            :min="0"
            :precision="0"
            @change="(value) => handleChange(value, 'outerRadius')"
          ></el-input-number>
        </div>
        <div v-show="selectedShapeName.split('-')[0] === 'arc'" class="attr-row">
          <span class="attr">角度</span>
          <el-slider
            :min="-180"
            :max="180"
            v-model="attr.angle"
            @change="(value) => handleChange(value, 'angle')"
          ></el-slider>
        </div>
        <div v-show="selectedShapeName.split('-')[0] === 'circle'" class="attr-row">
          <span class="attr">X半径</span>
          <el-input-number
            v-model="attr.radiusX"
            :min="0"
            :precision="0"
            @change="(value) => handleChange(value, 'radiusX')"
          ></el-input-number>
        </div>
        <div v-show="selectedShapeName.split('-')[0] === 'circle'" class="attr-row">
          <span class="attr">Y半径</span>
          <el-input-number
            v-model="attr.radiusY"
            :min="0"
            :precision="0"
            @change="(value) => handleChange(value, 'radiusY')"
          ></el-input-number>
        </div>
        <div v-show="selectedShapeName.split('-')[0] === 'text'" class="attr-row">
          <span class="attr">字号</span>
          <el-input-number
            v-model="attr.fontSize"
            :min="12"
            :precision="0"
            @change="(value) => handleChange(value, 'fontSize')"
          ></el-input-number>
        </div>
        <div v-show="selectedShapeName.split('-')[0] === 'text'" class="attr-row">
          <span class="attr">字体</span>
          <el-select
            v-model="attr.fontFamily"
            placeholder="请选择字体"
            @change="(value) => handleChange(value, 'fontFamily')"
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
        <div class="attr-row">
          <span class="attr">描边</span>
          <el-switch
            :disabled="selectedShapeName === ''"
            v-model="attr.strokeEnabled"
            active-text="开"
            inactive-text="关"
            @change="(value) => handleChange(value, 'strokeEnabled')"
          ></el-switch>
        </div>
        <div class="attr-row">
          <span class="attr">描边宽度</span>
          <el-input-number
            :disabled="selectedShapeName === ''"
            v-model="attr.strokeWidth"
            :min="0"
            :precision="0"
            @change="(value) => handleChange(value, 'strokeWidth')"
          ></el-input-number>
        </div>
        <div class="attr-row">
          <span class="attr">描边颜色</span>
          <el-color-picker
            :disabled="selectedShapeName === ''"
            v-model="attr.stroke"
            @change="(value) => handleChange(value, 'stroke')"
          ></el-color-picker>
        </div>
        <div v-show="selectedShapeName.split('-')[0] !== 'line'" class="attr-row">
          <span class="attr">填充</span>
          <el-switch
            :disabled="selectedShapeName === ''"
            v-model="attr.fillEnabled"
            active-text="开"
            inactive-text="关"
            @change="(value) => handleChange(value, 'fillEnabled')"
          ></el-switch>
        </div>
        <div v-show="selectedShapeName.split('-')[0] !== 'line'" class="attr-row">
          <span class="attr">填充颜色</span>
          <el-color-picker
            :disabled="selectedShapeName === ''"
            v-model="attr.fill"
            @change="(value) => handleChange(value, 'fill')"
          ></el-color-picker>
        </div>
        <div v-show="selectedShapeName.split('-')[0] !== 'line'" class="attr-row">
          <span class="attr">旋转</span>
          <el-slider
            :disabled="selectedShapeName === ''"
            :min="-180"
            :max="180"
            v-model="attr.rotate"
            @change="(value) => handleChange(value, 'rotation')"
          ></el-slider>
        </div>
        <div class="attr-row">
          <span class="attr">拖拽</span>
          <el-switch
            :disabled="selectedShapeName === ''"
            v-model="attr.draggable"
            active-text="开"
            inactive-text="关"
            @change="(value) => handleChange(value, 'draggable')"
          ></el-switch>
        </div>
        <div v-show="selectedShapeName !== ''" class="attr-row z-index-controls">
          <span class="attr">层级调整</span>
          <el-button-group>
            <el-button size="small" @click="moveToTop">置顶</el-button>
            <el-button size="small" @click="moveUp">上移</el-button>
            <el-button size="small" @click="moveDown">下移</el-button>
            <el-button size="small" @click="moveToBottom">置底</el-button>
          </el-button-group>
        </div>
      </div>
    </div>
    
    <div class="panel-footer">
      <el-button type="primary" @click="handleExport" class="export">
        💾 导出图片
      </el-button>
    </div>
  </div>
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
  width: 280px;
  min-width: 280px;
  height: 100%;
  background: white;
  border-left: 1px solid #e8e8e8;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 24px 20px;
  text-align: center;
  color: white;
}

.header-icon {
  font-size: 48px;
  margin-bottom: 12px;
}

.panel-header h2 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.panel-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #fafafa;
}

.placeholder {
  text-align: center;
  padding: 40px 20px;
}

.placeholder-icon {
  font-size: 64px;
  margin-bottom: 16px;
  opacity: 0.5;
}

.placeholder h3 {
  margin: 0 0 12px 0;
  font-size: 18px;
  color: #333;
}

.placeholder p {
  margin: 0;
  font-size: 14px;
  color: #999;
  line-height: 1.6;
}

.properties {
  .attr {
    line-height: 40px;
    font-weight: 500;
    color: #333;
    display: block;
    margin-bottom: 4px;
  }
  .attr-row {
    margin-bottom: 16px;
    padding: 12px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  }
  .attr-row:last-child {
    margin-bottom: 0;
  }
  .z-index-controls {
    .el-button-group {
      width: 100%;
      display: flex;
    }
    .el-button {
      flex: 1;
    }
  }
}

.panel-footer {
  padding: 20px;
  background: white;
  border-top: 1px solid #e8e8e8;
}

.export {
  width: 100%;
  height: 48px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 24px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(102, 126, 234, 0.4);
  }
}
</style>