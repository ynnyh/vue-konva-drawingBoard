<template>
  <el-aside width="260px" class="rightPart">
    <div class="property-panel-container">
      <h3 class="panel-title">属性面板</h3>
      
      <!-- 基础属性 -->
      <div class="panel-section">
        <h4 class="section-title">基础属性</h4>
        
        <!-- 矩形属性 -->
        <el-row v-show="selectedShapeName.split('-')[0] === 'rect'" class="attr-row">
          <el-col :span="8">
            <span class="attr-label">宽度</span>
          </el-col>
          <el-col :span="16">
            <el-input-number
              v-model="attr.width"
              :min="0"
              :precision="0"
              @change="(value) => handleChange(value, 'width')"
              size="small"
            ></el-input-number>
          </el-col>
        </el-row>
        
        <el-row v-show="selectedShapeName.split('-')[0] === 'rect'" class="attr-row">
          <el-col :span="8">
            <span class="attr-label">高度</span>
          </el-col>
          <el-col :span="16">
            <el-input-number
              v-model="attr.height"
              :min="0"
              :precision="0"
              @change="(value) => handleChange(value, 'height')"
              size="small"
            ></el-input-number>
          </el-col>
        </el-row>
        
        <!-- 多边形属性 -->
        <el-row
          class="attr-row"
          v-show="
            selectedShapeName.split('-')[0] === 'triangle' ||
            selectedShapeName.split('-')[0] === 'pentagon' ||
            selectedShapeName.split('-')[0] === 'hexagon'
          "
        >
          <el-col :span="8">
            <span class="attr-label">半径</span>
          </el-col>
          <el-col :span="16">
            <el-input-number
              v-model="attr.radius"
              :min="0"
              :precision="0"
              @change="(value) => handleChange(value, 'radius')"
              size="small"
            ></el-input-number>
          </el-col>
        </el-row>
        
        <!-- 弧形属性 -->
        <el-row v-show="selectedShapeName.split('-')[0] === 'arc'" class="attr-row">
          <el-col :span="8">
            <span class="attr-label">内半径</span>
          </el-col>
          <el-col :span="16">
            <el-input-number
              v-model="attr.innerRadius"
              :min="0"
              :precision="0"
              @change="(value) => handleChange(value, 'innerRadius')"
              size="small"
            ></el-input-number>
          </el-col>
        </el-row>
        
        <el-row v-show="selectedShapeName.split('-')[0] === 'arc'" class="attr-row">
          <el-col :span="8">
            <span class="attr-label">外半径</span>
          </el-col>
          <el-col :span="16">
            <el-input-number
              v-model="attr.outerRadius"
              :min="0"
              :precision="0"
              @change="(value) => handleChange(value, 'outerRadius')"
              size="small"
            ></el-input-number>
          </el-col>
        </el-row>
        
        <el-row v-show="selectedShapeName.split('-')[0] === 'arc'" class="attr-row">
          <el-col :span="8">
            <span class="attr-label">角度</span>
          </el-col>
          <el-col :span="16">
            <el-slider
              :min="-180"
              :max="180"
              v-model="attr.angle"
              @change="(value) => handleChange(value, 'angle')"
              size="small"
            ></el-slider>
          </el-col>
        </el-row>
        
        <!-- 椭圆属性 -->
        <el-row v-show="selectedShapeName.split('-')[0] === 'circle'" class="attr-row">
          <el-col :span="8">
            <span class="attr-label">X半径</span>
          </el-col>
          <el-col :span="16">
            <el-input-number
              v-model="attr.radiusX"
              :min="0"
              :precision="0"
              @change="(value) => handleChange(value, 'radiusX')"
              size="small"
            ></el-input-number>
          </el-col>
        </el-row>
        
        <el-row v-show="selectedShapeName.split('-')[0] === 'circle'" class="attr-row">
          <el-col :span="8">
            <span class="attr-label">Y半径</span>
          </el-col>
          <el-col :span="16">
            <el-input-number
              v-model="attr.radiusY"
              :min="0"
              :precision="0"
              @change="(value) => handleChange(value, 'radiusY')"
              size="small"
            ></el-input-number>
          </el-col>
        </el-row>
        
        <!-- 文字属性 -->
        <el-row v-show="selectedShapeName.split('-')[0] === 'text'" class="attr-row">
          <el-col :span="8">
            <span class="attr-label">字号</span>
          </el-col>
          <el-col :span="16">
            <el-input-number
              v-model="attr.fontSize"
              :min="12"
              :precision="0"
              @change="(value) => handleChange(value, 'fontSize')"
              size="small"
            ></el-input-number>
          </el-col>
        </el-row>
        
        <el-row v-show="selectedShapeName.split('-')[0] === 'text'" class="attr-row">
          <el-col :span="8">
            <span class="attr-label">字体</span>
          </el-col>
          <el-col :span="16">
            <el-select
              v-model="attr.fontFamily"
              placeholder="请选择字体"
              @change="(value) => handleChange(value, 'fontFamily')"
              size="small"
              style="width: 100%"
            >
              <el-option
                v-for="item in fontFamily"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-col>
        </el-row>
      </div>
      
      <!-- 样式属性 -->
      <div class="panel-section">
        <h4 class="section-title">样式属性</h4>
        
        <el-row class="attr-row">
          <el-col :span="8">
            <span class="attr-label">描边</span>
          </el-col>
          <el-col :span="16">
            <el-switch
              :disabled="selectedShapeName === ''"
              v-model="attr.strokeEnabled"
              active-text="开"
              inactive-text="关"
              @change="(value) => handleChange(value, 'strokeEnabled')"
              size="small"
            ></el-switch>
          </el-col>
        </el-row>
        
        <el-row class="attr-row">
          <el-col :span="8">
            <span class="attr-label">描边宽度</span>
          </el-col>
          <el-col :span="16">
            <el-input-number
              :disabled="selectedShapeName === ''"
              v-model="attr.strokeWidth"
              :min="0"
              :precision="0"
              @change="(value) => handleChange(value, 'strokeWidth')"
              size="small"
            ></el-input-number>
          </el-col>
        </el-row>
        
        <el-row class="attr-row">
          <el-col :span="8">
            <span class="attr-label">描边颜色</span>
          </el-col>
          <el-col :span="8">
            <el-color-picker
              :disabled="selectedShapeName === ''"
              v-model="attr.stroke"
              @change="(value) => handleChange(value, 'stroke')"
              size="small"
            ></el-color-picker>
          </el-col>
        </el-row>
        
        <el-row
          v-show="selectedShapeName.split('-')[0] !== 'line'"
          class="attr-row"
        >
          <el-col :span="8">
            <span class="attr-label">填充</span>
          </el-col>
          <el-col :span="16">
            <el-switch
              :disabled="selectedShapeName === ''"
              v-model="attr.fillEnabled"
              active-text="开"
              inactive-text="关"
              @change="(value) => handleChange(value, 'fillEnabled')"
              size="small"
            ></el-switch>
          </el-col>
        </el-row>
        
        <el-row
          v-show="selectedShapeName.split('-')[0] !== 'line'"
          class="attr-row"
        >
          <el-col :span="8">
            <span class="attr-label">填充颜色</span>
          </el-col>
          <el-col :span="8">
            <el-color-picker
              :disabled="selectedShapeName === ''"
              v-model="attr.fill"
              @change="(value) => handleChange(value, 'fill')"
              size="small"
            ></el-color-picker>
          </el-col>
        </el-row>
        
        <el-row
          v-show="selectedShapeName.split('-')[0] !== 'line'"
          class="attr-row"
        >
          <el-col :span="8">
            <span class="attr-label">旋转</span>
          </el-col>
          <el-col :span="16">
            <el-slider
              :disabled="selectedShapeName === ''"
              :min="-180"
              :max="180"
              v-model="attr.rotate"
              @change="(value) => handleChange(value, 'rotation')"
              size="small"
            ></el-slider>
          </el-col>
        </el-row>
        
        <el-row class="attr-row">
          <el-col :span="8">
            <span class="attr-label">拖拽</span>
          </el-col>
          <el-col :span="16">
            <el-switch
              :disabled="selectedShapeName === ''"
              v-model="attr.draggable"
              active-text="开"
              inactive-text="关"
              @change="(value) => handleChange(value, 'draggable')"
              size="small"
            ></el-switch>
          </el-col>
        </el-row>
      </div>
      
      <!-- 层级调整 -->
      <div v-show="selectedShapeName !== ''" class="panel-section">
        <h4 class="section-title">层级调整</h4>
        <el-button-group size="small" class="z-index-buttons">
          <el-button @click="moveToTop" type="primary" plain>置顶</el-button>
          <el-button @click="moveUp" type="info" plain>上移</el-button>
          <el-button @click="moveDown" type="info" plain>下移</el-button>
          <el-button @click="moveToBottom" type="primary" plain>置底</el-button>
        </el-button-group>
      </div>
      
      <!-- 导出按钮 -->
      <div class="panel-section">
        <el-button type="success" @click="handleExport" class="export-btn" size="medium">
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
  background: linear-gradient(135deg, #f0f4f8 0%, #e2e8f0 100%);
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
  height: 100vh;
  overflow-y: auto;
  
  .property-panel-container {
    padding: 20px;
  }
  
  .panel-title {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 2px solid #409EFF;
  }
  
  .panel-section {
    background: white;
    border-radius: 8px;
    padding: 15px;
    margin-bottom: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
  }
  
  .section-title {
    font-size: 14px;
    font-weight: 600;
    color: #666;
    margin-bottom: 15px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e8e8e8;
  }
  
  .attr-row {
    margin-bottom: 12px;
    align-items: center;
  }
  
  .attr-label {
    font-size: 13px;
    color: #666;
    font-weight: 500;
  }
  
  .z-index-buttons {
    width: 100%;
    display: flex;
    gap: 5px;
    
    .el-button {
      flex: 1;
    }
  }
  
  .export-btn {
    width: 100%;
    font-size: 14px;
    padding: 10px;
  }
}
</style>
