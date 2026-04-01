<template>
  <el-aside width="4%" class="leftPart">
    <el-row>
      <el-col :span="24">
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
      </el-col>
      <el-col :span="24">
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
      </el-col>
      <el-col :span="24">
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
      </el-col>
      <el-col :span="24">
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
      </el-col>
      <el-col :span="24">
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
      </el-col>
      <el-col :span="24">
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
      </el-col>
      <el-col :span="24">
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
      </el-col>
      <el-col :span="24">
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
      </el-col>
      <el-col :span="24">
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
      </el-col>
    </el-row>
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
    }
  }
}
</script>

<style lang="less" scoped>
.leftPart {
  line-height: 56px;
}

.icon {
  transition: color 0.3s ease;
}
</style>