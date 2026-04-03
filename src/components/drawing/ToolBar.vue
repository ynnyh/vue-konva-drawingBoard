<template>
  <div class="leftPart">
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="箭头"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'arrow' ? '#f20' : '',
          }"
          @click="changeArrowType('arrow')"
        >
          <use xlink:href="#icon-arrow"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="三角形"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'triangle' ? '#f20' : '',
          }"
          @click="changeArrowType('triangle')"
        >
          <use xlink:href="#icon-triangle"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="四边形"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'rect' ? '#f20' : '',
          }"
          @click="changeArrowType('rect')"
        >
          <use xlink:href="#icon-rect"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="五边形"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'pentagon' ? '#f20' : '',
          }"
          @click="changeArrowType('pentagon')"
        >
          <use xlink:href="#icon-pentagon"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="六边形"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'hexagon' ? '#f20' : '',
          }"
          @click="changeArrowType('hexagon')"
        >
          <use xlink:href="#icon-hexagon"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="椭圆"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'circle' ? '#f20' : '',
          }"
          @click="changeArrowType('circle')"
        >
          <use xlink:href="#icon-circle"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="弧形"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'arc' ? '#f20' : '',
          }"
          @click="changeArrowType('arc')"
        >
          <use xlink:href="#icon-arc"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="铅笔"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'line' ? '#f20' : '',
          }"
          @click="changeArrowType('line')"
        >
          <use xlink:href="#icon-pencil"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="文字"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'text' ? '#f20' : '',
          }"
          @click="changeArrowType('text')"
        >
          <use xlink:href="#icon-text"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="导入图片"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'image' ? '#f20' : '',
          }"
          @click="triggerImageUpload"
        >
          <use xlink:href="#icon-image"></use>
        </svg>
      </el-tooltip>
      <input
        ref="imageInput"
        type="file"
        accept="image/*"
        style="display: none"
        @change="handleImageSelect"
      />
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="贝塞尔曲线"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'bezier' ? '#f20' : '',
          }"
          @click="changeArrowType('bezier')"
        >
          <use xlink:href="#icon-bezier"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="路径绘制"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          v-bind:style="{
            color: arrowType === 'path' ? '#f20' : '',
          }"
          @click="changeArrowType('path')"
        >
          <use xlink:href="#icon-path"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="组合"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          @click="handleGroup"
        >
          <use xlink:href="#icon-group"></use>
        </svg>
      </el-tooltip>
    </div>
    <div class="tool-row">
      <el-tooltip
        class="item"
        effect="dark"
        content="取消组合"
        placement="right"
      >
        <svg
          class="icon"
          aria-hidden="true"
          style="font-size: 36px; cursor: pointer"
          @click="handleUngroup"
        >
          <use xlink:href="#icon-ungroup"></use>
        </svg>
      </el-tooltip>
    </div>
  </div>
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
        // 清空 input，允许重复选择同一文件
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
  width: 60px;
  min-width: 60px;
  height: 100%;
  background: #f5f5f5;
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
}

.tool-row {
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  transition: color 0.3s ease;
}
</style>