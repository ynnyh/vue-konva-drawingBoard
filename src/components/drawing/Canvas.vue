<template>
  <div class="canvas-container" ref="container">
    <v-stage
      ref="stage"
      :config="configKonva"
      @mousedown="handleMouseDown"
      @mousemove="handleMouseMove"
      @mouseup="handleMouseUp"
      @click="handleClick"
    >
      <v-layer
        ref="layer"
        draggable="true"
        @dragmove="onLayerDragMove"
        @dragend="onLayerDragEnd"
      >
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
          @dragend="handleShapeDragEnd"
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
          @dragend="handleShapeDragEnd"
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
          @dragend="handleShapeDragEnd"
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
          @dragend="handleShapeDragEnd"
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
          @dragend="handleShapeDragEnd"
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
          @dragend="handleShapeDragEnd"
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
          @dragend="handleShapeDragEnd"
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
          @dragend="handleShapeDragEnd"
        ></v-text>
        <v-image
          v-for="image in images"
          :key="image.name"
          :config="{
            x: image.x,
            y: image.y,
            image: image.imageEl,
            width: image.width,
            height: image.height,
            name: image.name,
            scaleX: image.scaleX,
            scaleY: image.scaleY,
            draggable: image.draggable,
          }"
          @dragend="handleShapeDragEnd"
        ></v-image>
        <v-line
          v-for="bezier in beziers"
          :key="bezier.name"
          :config="{
            points: bezier.points,
            stroke: bezier.stroke || '#000',
            strokeWidth: bezier.strokeWidth || 2,
            lineCap: 'round',
            lineJoin: 'round',
            name: bezier.name,
            scaleX: bezier.scaleX,
            scaleY: bezier.scaleY,
            draggable: bezier.draggable,
            bezier: true,
          }"
          @dragend="handleShapeDragEnd"
        ></v-line>
        <v-line
          v-for="path in paths"
          :key="path.name"
          :config="{
            points: path.points,
            stroke: path.stroke || '#000',
            strokeWidth: path.strokeWidth || 2,
            lineCap: 'round',
            lineJoin: 'round',
            closed: true,
            name: path.name,
            scaleX: path.scaleX,
            scaleY: path.scaleY,
            draggable: path.draggable,
          }"
          @dragend="handleShapeDragEnd"
        ></v-line>
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
  </div>
</template>

<script>
import Konva from 'konva'
import { delShape, drawByDown, setAttr } from '../../utils/utils'

let x1, y1, x2, y2
let transformerNode = ''
const GUIDELINE_OFFSET = 5

export default {
  name: 'Canvas',
  props: {
    arrowType: {
      type: String,
      default: 'arrow'
    },
    rects: {
      type: Array,
      default: () => []
    },
    circles: {
      type: Array,
      default: () => []
    },
    triangles: {
      type: Array,
      default: () => []
    },
    pentagons: {
      type: Array,
      default: () => []
    },
    hexagons: {
      type: Array,
      default: () => []
    },
    arcs: {
      type: Array,
      default: () => []
    },
    lines: {
      type: Array,
      default: () => []
    },
    texts: {
      type: Array,
      default: () => []
    },
    images: {
      type: Array,
      default: () => []
    },
    beziers: {
      type: Array,
      default: () => []
    },
    paths: {
      type: Array,
      default: () => []
    },
    groups: {
      type: Array,
      default: () => []
    },
    selectedShapeName: {
      type: String,
      default: ''
    },
    attr: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      isDrawing: false,
      down: false,
      configKonva: {
        width: 800,
        height: 600
      },
      rectBox: {
        visible: false,
        width: 0,
        height: 0,
        x: 0,
        y: 0,
      },
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize)
    this.$nextTick(() => {
      this.updateCanvasSize()
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize() {
      this.updateCanvasSize()
      this.$forceUpdate()
    },
    updateCanvasSize() {
      if (this.$refs.container) {
        this.configKonva.width = this.$refs.container.clientWidth
        this.configKonva.height = this.$refs.container.clientHeight || window.innerHeight
      }
    },
    handleMouseDown(e) {
      if (this.arrowType === 'arrow') {
        if (e.target !== e.target.getStage()) return
        this.down = true
        this.isDrawing = true
        if (e.target === e.target.getStage()) {
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
          transformerNode = this.$refs.transformer.getNode()
          transformerNode.getLayer().draw()
          return
        }
      } else {
        this.down = true
        this.isDrawing = true
        const pos = this.$refs.stage.getNode().getPointerPosition()
        this.$emit('draw-start', pos, this.arrowType)
      }
    },
    handleMouseMove(e) {
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
      } else {
        const pos = this.$refs.stage.getNode().getPointerPosition()
        this.$emit('draw-move', pos, this.arrowType, e.evt.shiftKey)
      }
    },
    handleMouseUp() {
      this.isDrawing = false
      this.down = false
      if (this.arrowType === 'arrow') {
        if (!this.rectBox.visible) return
        setTimeout(() => {
          this.rectBox.visible = false
          transformerNode.getLayer().batchDraw()
        })
        const shapes = this.$refs.stage.getNode().find(node => {
          if (node.getClassName() === 'Ellipse' || node.id() === 'rect' || node.getClassName() === 'RegularPolygon' || node.getClassName() === 'Arc' || node.getClassName() === 'Line' || node.getClassName() === 'Text' || node.getClassName() === 'Image') return true
        }).toArray()
        const box = this.$refs.rectBox.getNode().getClientRect()
        const selected = shapes.filter((shape) =>
          Konva.Util.haveIntersection(box, shape.getClientRect())
        )
        if (selected.length === 1) {
          const selectedName = selected[0].name()
          const attrs = selected[0].getAttrs()
          const type = selectedName.split('-')[0]
          const newAttr = setAttr(type, attrs, this.attr)
          this.$emit('select-shape', selectedName, newAttr)
        } else {
          this.$emit('select-shape', '', {})
        }
        transformerNode.nodes(selected)
        transformerNode.getLayer().batchDraw()
      } else {
        this.$emit('draw-end')
      }
    },
    handleClick(e) {
      if (this.arrowType === 'arrow') {
        transformerNode = this.$refs.transformer.getNode()
        if (this.rectBox.visible) return
        if (e.target === e.target.getStage()) {
          this.$emit('select-shape', '', {})
          transformerNode.nodes([])
          transformerNode.getLayer().draw()
          return
        }
        if (e.target.id() === 'rect' || e.target.getClassName() === 'Ellipse' || e.target.getClassName() === 'RegularPolygon' || e.target.getClassName() === 'Arc' || e.target.getClassName() === 'Line' || e.target.getClassName() === 'Text' || e.target.getClassName() === 'Image') {
          const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey
          const isSelected = transformerNode.nodes().indexOf(e.target) >= 0
          if (!metaPressed && !isSelected) {
            const selectedName = e.target.name()
            const attrs = e.target.getAttrs()
            const type = selectedName.split('-')[0]
            const newAttr = setAttr(type, attrs, this.attr)
            this.$emit('select-shape', selectedName, newAttr)
            transformerNode.nodes([e.target])
          } else if (metaPressed && isSelected) {
            const nodes = transformerNode.nodes().slice()
            nodes.splice(nodes.indexOf(e.target), 1)
            if (nodes.length === 1) {
              const selectedName = nodes[0].name()
              const attrs = nodes[0].getAttrs()
              const type = selectedName.split('-')[0]
              const newAttr = setAttr(type, attrs, this.attr)
              this.$emit('select-shape', selectedName, newAttr)
            } else {
              this.$emit('select-shape', '', {})
            }
            transformerNode.nodes(nodes)
          } else if (metaPressed && !isSelected) {
            const nodes = transformerNode.nodes().concat([e.target])
            if (nodes.length === 1) {
              const selectedName = nodes[0].name()
              const attrs = nodes[0].getAttrs()
              const type = selectedName.split('-')[0]
              const newAttr = setAttr(type, attrs, this.attr)
              this.$emit('select-shape', selectedName, newAttr)
            } else {
              this.$emit('select-shape', '', {})
            }
            transformerNode.nodes(nodes)
          }
          transformerNode.getLayer().draw()
        }
      }
    },
    editText(e) {
      e.target.hide()
      if (!transformerNode) {
        transformerNode = this.$refs.transformer.getNode()
      }
      const selectedName = e.target.name()
      const attrs = e.target.getAttrs()
      const type = selectedName.split('-')[0]
      const newAttr = setAttr(type, attrs, this.attr)
      this.$emit('select-shape', selectedName, newAttr)
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
      this.$emit('edit-text', e.target, areaPosition, offset)
    },
    onLayerDragMove(e) {
      const layer = this.$refs.layer.getNode()
      layer.find('.guid-line').destroy()
      const lineGuideStops = this.getLineGuideStops(e.target)
      const itemBounds = this.getObjectSnappingEdges(e.target)
      const guides = this.getGuides(lineGuideStops, itemBounds)
      if (!guides.length) {
        return
      }
      this.drawGuides(guides)
    },
    getLineGuideStops(skipShape) {
      const stage = this.$refs.stage.getNode()
      let vertical = [0, stage.width() / 2, stage.width()]
      let horizontal = [0, stage.height() / 2, stage.height()]
      stage.find('Rect, Ellipse, RegularPolygon, Line, Arc, Text, Image').forEach((guideItem) => {
        if (guideItem === skipShape) {
          return
        }
        const box = guideItem.getClientRect()
        vertical.push([box.x, box.x + box.width, box.x + box.width / 2])
        horizontal.push([box.y, box.y + box.height, box.y + box.height / 2])
      })
      return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat(),
      }
    },
    getObjectSnappingEdges(node) {
      const box = node.getClientRect()
      const absPos = node.absolutePosition()

      return {
        vertical: [
          {
            guide: Math.round(box.x),
            offset: Math.round(absPos.x - box.x),
            snap: 'start',
          },
          {
            guide: Math.round(box.x + box.width / 2),
            offset: Math.round(absPos.x - box.x - box.width / 2),
            snap: 'center',
          },
          {
            guide: Math.round(box.x + box.width),
            offset: Math.round(absPos.x - box.x - box.width),
            snap: 'end',
          },
        ],
        horizontal: [
          {
            guide: Math.round(box.y),
            offset: Math.round(absPos.y - box.y),
            snap: 'start',
          },
          {
            guide: Math.round(box.y + box.height / 2),
            offset: Math.round(absPos.y - box.y - box.height / 2),
            snap: 'center',
          },
          {
            guide: Math.round(box.y + box.height),
            offset: Math.round(absPos.y - box.y - box.height),
            snap: 'end',
          },
        ],
      }
    },
    checkBounds(node) {
      const stage = this.$refs.stage.getNode()
      const box = node.getClientRect()
      const pos = node.position()
      
      let newX = pos.x
      let newY = pos.y
      
      if (box.x < 0) {
        newX = newX - box.x
      }
      if (box.y < 0) {
        newY = newY - box.y
      }
      if (box.x + box.width > stage.width()) {
        newX = stage.width() - box.width - (box.x - pos.x)
      }
      if (box.y + box.height > stage.height()) {
        newY = stage.height() - box.height - (box.y - pos.y)
      }
      
      if (newX !== pos.x || newY !== pos.y) {
        node.position({ x: newX, y: newY })
        return true
      }
      return false
    },
    getGuides(lineGuideStops, itemBounds) {
      let resultV = []
      let resultH = []

      lineGuideStops.vertical.forEach((lineGuide) => {
        itemBounds.vertical.forEach((itemBound) => {
          const diff = Math.abs(lineGuide - itemBound.guide)
          if (diff < GUIDELINE_OFFSET) {
            resultV.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset,
            })
          }
        })
      })

      lineGuideStops.horizontal.forEach((lineGuide) => {
        itemBounds.horizontal.forEach((itemBound) => {
          const diff = Math.abs(lineGuide - itemBound.guide)
          if (diff < GUIDELINE_OFFSET) {
            resultH.push({
              lineGuide: lineGuide,
              diff: diff,
              snap: itemBound.snap,
              offset: itemBound.offset,
            })
          }
        })
      })

      let guides = []
      const minV = resultV.sort((a, b) => a.diff - b.diff)[0]
      const minH = resultH.sort((a, b) => a.diff - b.diff)[0]
      if (minV) {
        guides.push({
          lineGuide: minV.lineGuide,
          offset: minV.offset,
          orientation: 'V',
          snap: minV.snap,
        })
      }
      if (minH) {
        guides.push({
          lineGuide: minH.lineGuide,
          offset: minH.offset,
          orientation: 'H',
          snap: minH.snap,
        })
      }
      return guides
    },
    drawGuides(guides) {
      const layer = this.$refs.layer.getNode()
      guides.forEach((lg) => {
        if (lg.orientation === 'H') {
          const line = new Konva.Line({
            points: [-6000, 0, 6000, 0],
            stroke: 'rgb(0, 161, 255)',
            strokeWidth: 1,
            name: 'guid-line',
            dash: [4, 6],
          })
          layer.add(line)
          line.absolutePosition({
            x: 0,
            y: lg.lineGuide,
          })
          layer.batchDraw()
        } else if (lg.orientation === 'V') {
          const line = new Konva.Line({
            points: [0, -6000, 0, 6000],
            stroke: 'rgb(0, 161, 255)',
            strokeWidth: 1,
            name: 'guid-line',
            dash: [4, 6],
          })
          layer.add(line)
          line.absolutePosition({
            x: lg.lineGuide,
            y: 0,
          })
          layer.batchDraw()
        }
      })
    },
    onLayerDragEnd() {
      const layer = this.$refs.layer.getNode()
      layer.find('.guid-line').destroy()
      layer.batchDraw()
    },
    handleShapeDragEnd(e) {
      const node = e.target
      const boundsChanged = this.checkBounds(node)
      if (boundsChanged) {
        node.getLayer().batchDraw()
        this.$emit('shape-moved', node)
      }
    },
    getStage() {
      return this.$refs.stage.getNode()
    },
    getTransformer() {
      return this.$refs.transformer.getNode()
    }
  }
}
</script>

<style lang="less" scoped>
.canvas-container {
  width: 100%;
  height: 100%;
  background: #fff;
}
</style>
