<!--
 * @Author: 月魂
 * @Date: 2020-12-30 13:49:59
 * @LastEditTime: 2021-01-18 15:34:12
 * @LastEditors: 月魂
 * @Description: 
 * @FilePath: \vue-konva-drawingBoard\src\views\Konva.vue
-->
<template>
  <div class="root">
    <textarea
      ref="textArea"
      style="display: none"
      @keydown="handleKeyDown"
      @blur="handleBlur"
    ></textarea>
    <el-container>
      <el-container>
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
                    color: this.arrowType === 'arrow' ? '#f20' : '',
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
                    color: this.arrowType === 'triangle' ? '#f20' : '',
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
                    color: this.arrowType === 'rect' ? '#f20' : '',
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
                    color: this.arrowType === 'pentagon' ? '#f20' : '',
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
                    color: this.arrowType === 'hexagon' ? '#f20' : '',
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
                    color: this.arrowType === 'circle' ? '#f20' : '',
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
                    color: this.arrowType === 'arc' ? '#f20' : '',
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
                    color: this.arrowType === 'line' ? '#f20' : '',
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
                    color: this.arrowType === 'text' ? '#f20' : '',
                  }"
                  @click="changeArrowType('text')"
                >
                  <use xlink:href="#icon-text"></use>
                </svg>
              </el-tooltip>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <v-stage
            ref="stage"
            :config="configKonva"
            @mousedown="handleMouseDown"
            @mousemove="handleMouseMove"
            @mouseup="handleMouseUp"
            @click="handleClick"
          >
            <v-layer>
              <v-rect
                v-for="rect in rects"
                :key="rect.name"
                :config="{
                  x: Math.min(rect.x, rect.x + rect.width),
                  y: Math.min(rect.y, rect.y + rect.height),
                  width: Math.abs(rect.width),
                  height: Math.abs(rect.height),
                  fillEnable: false,
                  strokeEnabled: true,
                  stroke: '#000',
                  strokeWidth: 1,
                  name: rect.name,
                  id: 'rect',
                  scaleX: rect.scaleX,
                  scaleY: rect.scaleY,
                  draggable: rect.draggable,
                }"
              >
              </v-rect>
              <v-ellipse
                v-for="cir in circles"
                :key="cir.name"
                :config="{
                  x: cir.x,
                  y: cir.y,
                  radiusX: Math.abs(cir.radiusX),
                  radiusY: Math.abs(cir.radiusY),
                  strokeEnabled: true,
                  stroke: '#000',
                  strokeWidth: 1,
                  name: cir.name,
                  scaleX: cir.scaleX,
                  scaleY: cir.scaleY,
                  draggable: cir.draggable,
                  fillEnable: false,
                }"
              ></v-ellipse>
              <v-regular-polygon
                v-for="triangle in triangles"
                :key="triangle.name"
                :config="{
                  x: triangle.x,
                  y: triangle.y,
                  sides: 3,
                  radius: Math.abs(triangle.radius),
                  strokeEnabled: true,
                  strokeWidth: 1,
                  stroke: '#000',
                  name: triangle.name,
                  scaleX: triangle.scaleX,
                  scaleY: triangle.scaleY,
                  draggable: triangle.draggable,
                  fillEnable: false,
                }"
              ></v-regular-polygon>
              <v-regular-polygon
                v-for="pentagon in pentagons"
                :key="pentagon.name"
                :config="{
                  x: pentagon.x,
                  y: pentagon.y,
                  sides: 5,
                  radius: Math.abs(pentagon.radius),
                  strokeEnabled: true,
                  strokeWidth: 1,
                  stroke: '#000',
                  name: pentagon.name,
                  scaleX: pentagon.scaleX,
                  scaleY: pentagon.scaleY,
                  draggable: pentagon.draggable,
                  fillEnable: false,
                }"
              ></v-regular-polygon>
              <v-regular-polygon
                v-for="hexagon in hexagons"
                :key="hexagon.name"
                :config="{
                  x: hexagon.x,
                  y: hexagon.y,
                  sides: 6,
                  radius: Math.abs(hexagon.radius),
                  strokeEnabled: true,
                  strokeWidth: 1,
                  stroke: '#000',
                  name: hexagon.name,
                  scaleX: hexagon.scaleX,
                  scaleY: hexagon.scaleY,
                  draggable: hexagon.draggable,
                  fillEnable: false,
                }"
              ></v-regular-polygon>
              <v-arc
                v-for="arc in arcs"
                :key="arc.name"
                :config="{
                  x: arc.x,
                  y: arc.y,
                  innerRadius: Math.abs(arc.innerRadius),
                  outerRadius: Math.abs(arc.outerRadius),
                  angle: arc.angle,
                  name: arc.name,
                  scaleX: arc.scaleX,
                  scaleY: arc.scaleY,
                  draggable: arc.draggable,
                  strokeEnabled: true,
                  strokeWidth: 1,
                  stroke: '#000',
                  fillEnable: false,
                }"
              ></v-arc>
              <v-line
                v-for="line in lines"
                :key="line.name"
                :config="{
                  points: line.points,
                  offset: line.offset,
                  name: line.name,
                  strokeEnabled: true,
                  strokeWidth: 1,
                  stroke: '#000',
                  lineCap: 'round',
                  lineJoin: 'round',
                  scaleX: line.scaleX,
                  scaleY: line.scaleY,
                  draggable: line.draggable,
                }"
              ></v-line>
              <v-text
                v-for="text in texts"
                :key="text.name"
                @dblclick="editText"
                :config="{
                  x: text.x,
                  y: text.y,
                  offset: text.offset,
                  text: 'hello world',
                  fontSize: Math.abs(text.fontSize),
                  fontFamily: 'Arial',
                  name: text.name,
                  strokeEnabled: false,
                  fill: '#000',
                  fillEnabled: true,
                  scaleX: text.scaleX,
                  scaleY: text.scaleY,
                  draggable: text.draggable,
                }"
              ></v-text>
              <v-rect
                :config="{
                  ...this.rectBox,
                  stroke: '#1D83FF',
                  strokeWidth: 0.8,
                  fill: 'rgba(29, 131, 255, .2)',
                  listening: false,
                  id: 'selectBox',
                }"
                ref="rectBox"
              ></v-rect>
              <v-transformer ref="transformer" />
            </v-layer>
          </v-stage>
        </el-main>
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
        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Konva from 'konva'
import { delShape, drawByDown, setAttr } from '../utils/utils'
const kWidth = document.body.clientWidth * 0.8
const kHeight = window.innerHeight
let x1, y1, x2, y2
let transformerNode = ''
export default {
  name: 'konva',
  data () {
    return {
      attr: {
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
      },
      isDrawing: false, // 判断是否绘制的字段
      arrowType: 'arrow', // 判断要绘制的图形
      down: false, // 检测鼠标是否按下
      configKonva: {
        width: kWidth,
        height: kHeight
      },
      rects: [],
      circles: [],
      triangles: [],
      pentagons: [],
      hexagons: [],
      arcs: [],
      lines: [],
      texts: [],
      selectedShapeName: '', // 点击选中的图形名称
      rectBox: { // 画布上矩形选择框
        visible: false,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
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
  mounted () {
    window.addEventListener('keydown', this.onKeyDown) // 此处可以参考下面click中如何获取到keyCode
    window.addEventListener('keyup', this.onKeyUp)
  },
  destroyed () {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keydown', this.onKeyUp)
  },
  methods: {
    onKeyDown (e) {
      if (e.keyCode === 46) {
        // 此处需同步删除data数组中的数据
        const nodes = transformerNode.nodes()
        nodes.map(item => {
          const name = item.getAttr('name')
          const shape = name.split('-')[0]
          switch (shape) {
            case 'rect':
              this.rects = delShape(name, this.rects)
              break
            case 'circle':
              this.circles = delShape(name, this.circles)
              break
            case 'triangle':
              this.triangles = delShape(name, this.triangles)
              break
            case 'pentagon':
              this.pentagons = delShape(name, this.pentagons)
              break
            case 'hexagon':
              this.hexagons = delShape(name, this.hexagons)
              break
            case 'arc':
              this.arcs = delShape(name, this.arcs)
              break
            case 'line':
              this.lines = delShape(name, this.lines)
              break
            case 'text':
              this.texts = delShape(name, this.texts)
              break
            default:
              return
          }
          item.destroy()
        })
        transformerNode.nodes([])
        transformerNode.getLayer().draw()
      }
    },
    onKeyUp (e) {
      e.preventDefault()
    },
    changeArrowType (type) { // 切换操作类型，可以是普通箭头，可以是形状生成工具
      this.arrowType = type
    },
    // updateTransformer () { // 寻找选中的元素
    //   transformerNode = this.$refs.transformer.getNode()
    //   const stage = transformerNode.getStage()
    //   const { selectedShapeName } = this
    //   const selectedNode = stage.findOne('.' + selectedShapeName)
    //   if (selectedNode === transformerNode.node()) return // 如果已被选中则不做操作
    //   if (selectedNode) {
    //     transformerNode.nodes([selectedNode])
    //   } else {
    //     transformerNode.nodes([])
    //   }
    //   transformerNode.getLayer().batchDraw()
    // },

    // 鼠标down
    handleMouseDown (e) {
      if (e.target !== e.target.getStage()) return
      this.down = true
      this.isDrawing = true
      if (this.arrowType === 'arrow') { // 如果是普通箭头则具有选择图形能力
        // 点击画布本身，清空选择框
        if (e.target === e.target.getStage()) {
          // 矩形选择框，批量选择图形
          x1 = this.$refs.stage.getNode().getPointerPosition().x
          y1 = this.$refs.stage.getNode().getPointerPosition().y
          x2 = this.$refs.stage.getNode().getPointerPosition().x
          y2 = this.$refs.stage.getNode().getPointerPosition().y

          this.rectBox = {
            visible: true,
            width: 0,
            height: 0,
            x: 0,
            y: 0,
          }
          // this.selectedShapeName = ''
          // this.updateTransformer()
          transformerNode = this.$refs.transformer.getNode()
          transformerNode.getLayer().draw()
          return
        }

        // 点击选中的图形，不做操作
        // const clickedOnTransformer = e.target.getParent().className === 'Transformer'
        // if (clickedOnTransformer) return
        // // 通过图形name精准定位
        // const name = e.target.name()
        // const shape = name.split('-')[0]
        // let item = ''
        // if (shape === 'rect') {
        //   item = this.rects.find(r => r.name === name)
        // } else if (shape === 'circle') {
        //   item = this.circles.find(r => r.name === name)
        // }
        // if (item) {
        //   this.selectedShapeName = name
        // } else {
        //   this.selectedShapeName = ''
        // }
        // this.updateTransformer()
      }
      const pos = this.$refs.stage.getNode().getPointerPosition()
      switch (this.arrowType) {
        case 'rect':
          this.rects = drawByDown(pos, this.rects, 'rect')
          break
        case 'circle':
          this.circles = drawByDown(pos, this.circles, 'circle')
          break
        case 'triangle':
          this.triangles = drawByDown(pos, this.triangles, 'triangle')
          break
        case 'pentagon':
          this.pentagons = drawByDown(pos, this.pentagons, 'pentagon')
          break
        case 'hexagon':
          this.hexagons = drawByDown(pos, this.hexagons, 'hexagon')
          break
        case 'arc':
          this.arcs = drawByDown(pos, this.arcs, 'arc')
          break
        case 'line':
          this.lines = drawByDown(pos, this.lines, 'line')
          break
        case 'text':
          this.texts = drawByDown(pos, this.texts, 'text')
          break
        default:
          return
      }
    },
    handleMouseMove (e) {
      if (!this.isDrawing) return
      if (this.arrowType === 'arrow') {
        if (!this.rectBox.visible) return
        x2 = this.$refs.stage.getNode().getPointerPosition().x
        y2 = this.$refs.stage.getNode().getPointerPosition().y
        this.rectBox = {
          x: Math.min(x1, x2),
          y: Math.min(y1, y2),
          width: Math.abs(x2 - x1),
          height: Math.abs(y2 - y1),
          visible: true,
        }
        transformerNode.getLayer().batchDraw()
      } else if (this.arrowType === 'rect') {
        const pos = this.$refs.stage.getNode().getPointerPosition()
        let currentRect = this.rects[this.rects.length - 1]
        if (e.evt.shiftKey) {
          // 如果此时按下shift键
          const width = pos.x - currentRect.x
          const height = pos.y - currentRect.y
          currentRect.width = currentRect.height = Math.min(width, height)
        } else {
          currentRect.width = pos.x - currentRect.x
          currentRect.height = pos.y - currentRect.y
        }
      } else if (this.arrowType === 'circle') {
        const pos = this.$refs.stage.getNode().getPointerPosition()
        let currentCircle = this.circles[this.circles.length - 1]
        if (e.evt.shiftKey) {
          const radius = Math.min((pos.x - currentCircle.x), (pos.y - currentCircle.y))
          const width = currentCircle.radiusX + radius
          const height = currentCircle.radiusY + radius
          currentCircle.radiusX = currentCircle.radiusY = Math.min(width, height)
          currentCircle.x = currentCircle.x + radius
          currentCircle.y = currentCircle.y + radius
        } else {
          currentCircle.radiusX = pos.x - currentCircle.x
          currentCircle.radiusY = pos.y - currentCircle.y
        }
      } else if (this.arrowType === 'triangle') {
        const pos = this.$refs.stage.getNode().getPointerPosition()
        let currentTriangle = this.triangles[this.triangles.length - 1]
        const radius = Math.min((pos.x - currentTriangle.x), (pos.y - currentTriangle.y))
        currentTriangle.radius = radius
      } else if (this.arrowType === 'pentagon') {
        const pos = this.$refs.stage.getNode().getPointerPosition()
        let currentPentagon = this.pentagons[this.pentagons.length - 1]
        const radius = Math.min((pos.x - currentPentagon.x), (pos.y - currentPentagon.y))
        currentPentagon.radius = radius
      } else if (this.arrowType === 'hexagon') {
        const pos = this.$refs.stage.getNode().getPointerPosition()
        let currentHexagon = this.hexagons[this.hexagons.length - 1]
        const radius = Math.min((pos.x - currentHexagon.x), (pos.y - currentHexagon.y))
        currentHexagon.radius = radius
      } else if (this.arrowType === 'arc') {
        const pos = this.$refs.stage.getNode().getPointerPosition()
        let currentArc = this.arcs[this.arcs.length - 1]
        const outerRadius = Math.sqrt(Math.pow((pos.x - currentArc.x), 2) + Math.pow((pos.y - currentArc.y), 2))
        const innerRadius = outerRadius / 2
        const diff_x = pos.x - currentArc.x
        const diff_y = pos.y - currentArc.y
        const angle = Math.atan2(diff_y, diff_x) * 180 / Math.PI
        currentArc.innerRadius = innerRadius
        currentArc.outerRadius = outerRadius
        currentArc.angle = angle
      } else if (this.arrowType === 'line') {
        const pos = this.$refs.stage.getNode().getPointerPosition()
        let currentLine = this.lines[this.lines.length - 1]
        if (e.evt.shiftKey) {
          currentLine.points = [currentLine.points[0], currentLine.points[1], pos.x, pos.y]
        } else {
          const newPoints = currentLine.points.concat([pos.x, pos.y])
          currentLine.points = newPoints
        }
      } else if (this.arrowType === 'text') {
        const pos = this.$refs.stage.getNode().getPointerPosition()
        let currentText = this.texts[this.texts.length - 1]
        currentText.fontSize = Math.max(pos.x - currentText.x, pos.y - currentText.y)
        const node = this.$refs.stage.getNode().findOne('.' + currentText.name)
        currentText.offset = {
          x: node.width() / 2,
          y: node.height() / 2
        }
      }

    },
    handleMouseUp () {
      this.isDrawing = false
      this.down = false
      // 在抬起鼠标的时候需要对矩形，线条和文字进行offset计算，设置旋转中心点
      if (this.arrowType === 'arrow') {
        if (!this.rectBox.visible) return
        setTimeout(() => {
          this.rectBox.visible = false
          transformerNode.getLayer().batchDraw()
        })
        // const rectShapes = this.$refs.stage.getNode().find('Rect').toArray()
        // const circleShapes = this.$refs.stage.getNode().find('Circle').toArray()
        // const shapes = rectShapes.concat(circleShapes)
        const shapes = this.$refs.stage.getNode().find(node => {
          if (node.getClassName() === 'Ellipse' || node.id() === 'rect' || node.getClassName() === 'RegularPolygon' || node.getClassName() === 'Arc' || node.getClassName() === 'Line' || node.getClassName() === 'Text') return true
        }).toArray() // 此处由于选择框四周有十个小矩形所以会影响判断，故而在生成矩形时需要添加标识，暂以id区分
        const box = this.$refs.rectBox.getNode().getClientRect()
        const selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect())
        )
        if (selected.length === 1) {
          this.selectedShapeName = selected[0].name() // 将选中的单个值name修改后需将右侧attr同步修改
          const attrs = selected[0].getAttrs()
          const type = selected[0].name().split('-')[0]
          this.attr = setAttr(type, attrs, this.attr)
        } else {
          this.selectedShapeName = ''
        }
        transformerNode.nodes(selected)
        transformerNode.getLayer().batchDraw()
      }
    },
    // 监听点击事件，可以判断单击图形
    handleClick (e) {
      if (this.arrowType === 'arrow') { // 如果是普通箭头则具有选择图形能力
        transformerNode = this.$refs.transformer.getNode()
        // 点击画布本身，清空选择框
        if (this.rectBox.visible) return
        if (e.target === e.target.getStage()) {
          this.selectedShapeName = ''
          transformerNode.nodes([])
          transformerNode.getLayer().draw()
          return
        }
        if (e.target.id() === 'rect' || e.target.getClassName() === 'Ellipse' || e.target.getClassName() === 'RegularPolygon' || e.target.getClassName() === 'Arc' || e.target.getClassName() === 'Line' || e.target.getClassName() === 'Text') { // 此处后期需要添加需要识别的图形
          const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
          const isSelected = transformerNode.nodes().indexOf(e.target) >= 0
          if (!metaPressed && !isSelected) {
            // if no key pressed and the node is not selected
            // select just one
            this.selectedShapeName = e.target.name()
            const attrs = e.target.getAttrs()
            const type = e.target.name().split('-')[0]
            this.attr = setAttr(type, attrs, this.attr)
            transformerNode.nodes([e.target])
          } else if (metaPressed && isSelected) { // 只在选中单个元素时提供右侧属性栏修改属性值
            // if we pressed keys and node was selected
            // we need to remove it from selection:
            const nodes = transformerNode.nodes().slice() // use slice to have new copy of array
            // remove node from array
            nodes.splice(nodes.indexOf(e.target), 1)
            if (nodes.length === 1) {
              this.selectedShapeName = nodes[0].name()
              const attrs = nodes[0].getAttrs()
              const type = nodes[0].name().split('-')[0]
              this.attr = setAttr(type, attrs, this.attr)
            } else {
              this.selectedShapeName = ''
            }
            transformerNode.nodes(nodes)
          } else if (metaPressed && !isSelected) { // 只在选中单个元素时提供右侧属性栏修改属性值
            // add the node into selection
            const nodes = transformerNode.nodes().concat([e.target])
            if (nodes.length === 1) {
              this.selectedShapeName = nodes[0].name()
              const attrs = nodes[0].getAttrs()
              const type = nodes[0].name().split('-')[0]
              this.attr = setAttr(type, attrs, this.attr)
            } else {
              this.selectedShapeName = ''
            }
            transformerNode.nodes(nodes)
          }
          transformerNode.getLayer().draw()
        }
      }
    },
    editText (e) {
      e.target.hide()
      if (!transformerNode) {
        // 如果没有切换至普通箭头则需要创建选择框
        transformerNode = this.$refs.transformer.getNode()
      }
      this.selectedShapeName = e.target.name() // 将选中的单个值name修改后需将右侧attr同步修改
      const attrs = e.target.getAttrs()
      const type = e.target.name().split('-')[0]
      this.attr = setAttr(type, attrs, this.attr)
      transformerNode.nodes([e.target])
      transformerNode.hide()
      transformerNode.getLayer().draw()
      const textPosition = e.target.absolutePosition()
      const stageBox = this.$refs.stage.getNode().container().getBoundingClientRect()
      const offset = e.target.getAttr('offset')
      const areaPosition = {
        x: stageBox.left + textPosition.x - offset.x,
        y: stageBox.top + textPosition.y - offset.y
      }
      const textArea = this.$refs.textArea
      textArea.style.display = 'block'
      textArea.value = e.target.text()
      textArea.style.position = 'absolute'
      textArea.style.top = areaPosition.y + 'px'
      textArea.style.left = areaPosition.x + 'px'
      textArea.style.width = e.target.width() - e.target.padding() * 2 + 'px'
      textArea.style.height = e.target.height() - e.target.padding() * 2 + 5 + 'px'
      textArea.style.fontSize = e.target.fontSize() + 'px'
      textArea.style.border = 'none'
      textArea.style.padding = '0px'
      textArea.style.margin = '0px'
      textArea.style.overflow = 'hidden'
      textArea.style.background = 'none'
      textArea.style.outline = 'none'
      textArea.style.resize = 'none'
      textArea.style.lineHeight = e.target.lineHeight()
      textArea.style.fontFamily = e.target.fontFamily()
      textArea.style.transformOrigin = 'left top'
      textArea.style.textAlign = e.target.align()
      textArea.style.color = e.target.fill()
      const rotation = e.target.rotation()
      let transform = ''
      if (rotation) {
        transform += 'rotateZ(' + rotation + 'deg)'
      }
      textArea.style.transform = transform
      // reset height
      textArea.style.height = 'auto'
      // after browsers resized it we can set actual value
      textArea.style.height = textArea.scrollHeight + 3 + 'px'
      textArea.focus()
    },
    // 多行文本keydown
    handleKeyDown (e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        const textNode = this.$refs.stage.getNode().findOne('.' + this.selectedShapeName)
        textNode.text(this.$refs.textArea.value)
        this.$refs.textArea.style.display = 'none'
        textNode.show()
        transformerNode.show()
        transformerNode.getLayer().draw()
      }
    },
    // textarea失去焦点
    handleBlur (e) {
      const textNode = this.$refs.stage.getNode().findOne('.' + this.selectedShapeName)
      textNode.text(e.target.value)
      e.target.style.display = 'none'
      textNode.show()
      transformerNode.show()
      transformerNode.getLayer().draw()
    },
    handleChange (value, name) { // 右侧属性值变更映射到图形上
      const node = this.$refs.stage.getNode().findOne('.' + this.selectedShapeName)
      const selectedShape = this.selectedShapeName.split('-')[0]
      if (selectedShape === 'rect' && name === 'rotation') {
        node.rotate(value)
      }
      if (name === 'fontFamily') {
        node.fontFamily(value)
      } else {
        node.setAttr(name, value)
      }
      transformerNode.getLayer().batchDraw()
    },
    // 导出图片
    handleExport () {
      const stage = this.$refs.stage.getNode()
      const url = stage.toDataURL({ pixelRatio: 3 })
      this.downloadURI(url, 'stage.png')
    },
    downloadURI (uri, name) {
      let link = document.createElement('a')
      link.download = name
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  },
}
</script>

<style lang="less" scoped>
.root {
  height: 100%;
  .leftPart {
    line-height: 56px;
  }
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
}
</style>