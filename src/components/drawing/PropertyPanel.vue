<template>
  <el-aside width="16%" class="rightPart">
    <el-button type="primary" @click="handleExport" class="export"
      >导出图片</el-button
    >

    <h3>属性栏</h3>
    <el-row
      v-show="selectedShapeName.split('-')[0] === 'rect'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">宽度</span>
      </el-col>
      <el-col :span="17">
        <el-input-number
          v-model="attr.width"
          :min="0"
          :precision="0"
          @change="(value) => handleChange(value, 'width')"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] === 'rect'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">高度</span>
      </el-col>
      <el-col :span="17">
        <el-input-number
          v-model="attr.height"
          :min="0"
          :precision="0"
          @change="(value) => handleChange(value, 'height')"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row
      class="attr-row"
      v-show="
        selectedShapeName.split('-')[0] === 'triangle' ||
        selectedShapeName.split('-')[0] === 'pentagon' ||
        selectedShapeName.split('-')[0] === 'hexagon'
      "
    >
      <el-col :span="6">
        <span class="attr">半径</span>
      </el-col>
      <el-col :span="17">
        <el-input-number
          v-model="attr.radius"
          :min="0"
          :precision="0"
          @change="(value) => handleChange(value, 'radius')"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] === 'arc'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">内半径</span>
      </el-col>
      <el-col :span="17">
        <el-input-number
          v-model="attr.innerRadius"
          :min="0"
          :precision="0"
          @change="(value) => handleChange(value, 'innerRadius')"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] === 'arc'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">外半径</span>
      </el-col>
      <el-col :span="17">
        <el-input-number
          v-model="attr.outerRadius"
          :min="0"
          :precision="0"
          @change="(value) => handleChange(value, 'outerRadius')"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] === 'arc'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">角度</span>
      </el-col>
      <el-col :span="17"
        ><el-slider
          :min="-180"
          :max="180"
          v-model="attr.angle"
          @change="(value) => handleChange(value, 'angle')"
        ></el-slider
      ></el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] === 'circle'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">X半径</span>
      </el-col>
      <el-col :span="17">
        <el-input-number
          v-model="attr.radiusX"
          :min="0"
          :precision="0"
          @change="(value) => handleChange(value, 'radiusX')"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] === 'circle'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">Y半径</span>
      </el-col>
      <el-col :span="17">
        <el-input-number
          v-model="attr.radiusY"
          :min="0"
          :precision="0"
          @change="(value) => handleChange(value, 'radiusY')"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] === 'text'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">字号</span>
      </el-col>
      <el-col :span="17">
        <el-input-number
          v-model="attr.fontSize"
          :min="12"
          :precision="0"
          @change="(value) => handleChange(value, 'fontSize')"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] === 'text'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">字体</span>
      </el-col>
      <el-col :span="17">
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
      </el-col>
    </el-row>
    <el-row class="attr-row">
      <el-col :span="6">
        <span class="attr">描边</span>
      </el-col>
      <el-col :span="17">
        <el-switch
          :disabled="selectedShapeName === ''"
          style="height: 36px; float: left"
          v-model="attr.strokeEnabled"
          active-text="开"
          inactive-text="关"
          @change="(value) => handleChange(value, 'strokeEnabled')"
        ></el-switch>
      </el-col>
    </el-row>
    <el-row class="attr-row">
      <el-col :span="6">
        <span class="attr">描边宽度</span>
      </el-col>
      <el-col :span="17">
        <el-input-number
          :disabled="selectedShapeName === ''"
          v-model="attr.strokeWidth"
          :min="0"
          :precision="0"
          @change="(value) => handleChange(value, 'strokeWidth')"
        ></el-input-number>
      </el-col>
    </el-row>
    <el-row class="attr-row">
      <el-col :span="6">
        <span class="attr">描边颜色</span>
      </el-col>
      <el-col :span="6">
        <el-color-picker
          :disabled="selectedShapeName === ''"
          v-model="attr.stroke"
          @change="(value) => handleChange(value, 'stroke')"
        ></el-color-picker>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] !== 'line'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">填充</span>
      </el-col>
      <el-col :span="17">
        <el-switch
          :disabled="selectedShapeName === ''"
          style="height: 36px; float: left"
          v-model="attr.fillEnabled"
          active-text="开"
          inactive-text="关"
          @change="(value) => handleChange(value, 'fillEnabled')"
        ></el-switch>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] !== 'line'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">填充颜色</span>
      </el-col>
      <el-col :span="6">
        <el-color-picker
          :disabled="selectedShapeName === ''"
          v-model="attr.fill"
          @change="(value) => handleChange(value, 'fill')"
        ></el-color-picker>
      </el-col>
    </el-row>
    <el-row
      v-show="selectedShapeName.split('-')[0] !== 'line'"
      class="attr-row"
    >
      <el-col :span="6">
        <span class="attr">旋转</span>
      </el-col>
      <el-col :span="17">
        <el-slider
          :disabled="selectedShapeName === ''"
          :min="-180"
          :max="180"
          v-model="attr.rotate"
          @change="(value) => handleChange(value, 'rotation')"
        ></el-slider>
      </el-col>
    </el-row>
    <el-row class="attr-row">
      <el-col :span="6">
        <span class="attr">拖拽</span>
      </el-col>
      <el-col :span="17">
        <el-switch
          :disabled="selectedShapeName === ''"
          style="height: 36px; float: left"
          v-model="attr.draggable"
          active-text="开"
          inactive-text="关"
          @change="(value) => handleChange(value, 'draggable')"
        ></el-switch>
      </el-col>
    </el-row>
    <el-row v-show="selectedShapeName !== ''" class="attr-row">
      <el-col :span="24">
        <span class="attr">层级调整</span>
      </el-col>
    </el-row>
    <el-row v-show="selectedShapeName !== ''" class="attr-row">
      <el-col :span="24">
        <el-button-group>
          <el-button size="small" @click="moveToTop">置顶</el-button>
          <el-button size="small" @click="moveUp">上移</el-button>
          <el-button size="small" @click="moveDown">下移</el-button>
          <el-button size="small" @click="moveToBottom">置底</el-button>
        </el-button-group>
      </el-col>
    </el-row>
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
  position: relative;
  padding-right: 8px;
  .attr {
    line-height: 40px;
  }
  .attr-row {
    margin-bottom: 8px;
  }
  .export {
    position: absolute;
    bottom: 16px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>