<!--
 * @Author: 月魂
 * @Date: 2020-12-30 13:49:59
 * @LastEditTime: 2021-01-21 15:57:20
 * @LastEditors: 月魂
 * @Description: 
 * @FilePath: \vue-konva-drawingBoard\src\views\Konva.vue
-->
<template>
  <div class="root">
    <textarea
      ref="textArea"
      style="display: none"
      @keydown="handleTextKeyDown"
      @blur="handleTextBlur"
    ></textarea>
    <el-container>
      <el-container>
        <tool-bar
          :arrowType="arrowType"
          @change-arrow-type="changeArrowType"
          @import-image="handleImportImage"
        />
        <canvas
          :arrowType="arrowType"
          :rects="rects"
          :circles="circles"
          :triangles="triangles"
          :pentagons="pentagons"
          :hexagons="hexagons"
          :arcs="arcs"
          :lines="lines"
          :texts="texts"
          :images="images"
          :selectedShapeName="selectedShapeName"
          :attr="attr"
          @draw-start="handleDrawStart"
          @draw-move="handleDrawMove"
          @draw-end="handleDrawEnd"
          @select-shape="handleSelectShape"
          @edit-text="handleEditText"
          @shape-moved="handleShapeMoved"
          ref="canvas"
        />
        <property-panel
          :selectedShapeName="selectedShapeName"
          :attr="attr"
          @change="handlePropertyChange"
          @export="handleExport"
        />
      </el-container>
    </el-container>
  </div>
</template>

<script>
import ToolBar from '../components/drawing/ToolBar.vue'
import Canvas from '../components/drawing/Canvas.vue'
import PropertyPanel from '../components/drawing/PropertyPanel.vue'
import { drawByDown } from '../utils/utils'

export default {
  name: 'konva',
  components: {
    ToolBar,
    Canvas,
    PropertyPanel
  },
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
      isDrawing: false,
      arrowType: 'arrow',
      down: false,
      rects: [],
      circles: [],
      triangles: [],
      pentagons: [],
      hexagons: [],
      arcs: [],
      lines: [],
      texts: [],
      images: [],
      selectedShapeName: '',
      // 撤销/重做历史
      history: [],
      historyIndex: -1,
      maxHistory: 50,
      currentTextNode: null
    }
  },
  mounted () {
    window.addEventListener('keydown', this.onKeyDown)
    window.addEventListener('keyup', this.onKeyUp)
  },
  destroyed () {
    window.removeEventListener('keydown', this.onKeyDown)
    window.removeEventListener('keydown', this.onKeyUp)
  },
  methods: {
    onKeyDown (e) {
      const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
      const metaKey = isMac ? e.metaKey : e.ctrlKey
      
      if (e.keyCode === 46) {
        const nodes = this.$refs.canvas.getTransformer().nodes()
        if (nodes.length > 0) {
          // 保存历史
          this.saveHistory()
          
          nodes.map(item => {
            const name = item.getAttr('name')
            const shape = name.split('-')[0]
            switch (shape) {
              case 'rect':
                this.rects = this.rects.filter(r => r.name !== name)
                break
              case 'circle':
                this.circles = this.circles.filter(r => r.name !== name)
                break
              case 'triangle':
                this.triangles = this.triangles.filter(r => r.name !== name)
                break
              case 'pentagon':
                this.pentagons = this.pentagons.filter(r => r.name !== name)
                break
              case 'hexagon':
                this.hexagons = this.hexagons.filter(r => r.name !== name)
                break
              case 'arc':
                this.arcs = this.arcs.filter(r => r.name !== name)
                break
              case 'line':
                this.lines = this.lines.filter(r => r.name !== name)
                break
              case 'text':
                this.texts = this.texts.filter(r => r.name !== name)
                break
              case 'image':
                this.images = this.images.filter(r => r.name !== name)
                break
              default:
                return
            }
            item.destroy()
          })
          this.$refs.canvas.getTransformer().nodes([])
          this.$refs.canvas.getTransformer().getLayer().draw()
          this.selectedShapeName = ''
        }
      } else if (metaKey && e.key === 'z' && !e.shiftKey) {
        // 撤销操作
        this.undo()
      } else if (metaKey && e.key === 'y') {
        // 重做操作
        this.redo()
      } else if (metaKey && e.key === 'z' && e.shiftKey) {
        // 重做操作 (Mac 上的 Shift+Cmd+Z)
        this.redo()
      }
    },
    onKeyUp (e) {
      e.preventDefault()
    },
    changeArrowType (type) {
      this.arrowType = type
    },
    handleDrawStart(pos, type) {
      switch (type) {
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
    handleDrawMove(pos, type, shiftKey) {
      if (type === 'rect') {
        let currentRect = this.rects[this.rects.length - 1]
        if (shiftKey) {
          const width = pos.x - currentRect.x
          const height = pos.y - currentRect.y
          currentRect.width = currentRect.height = Math.min(width, height)
        } else {
          currentRect.width = pos.x - currentRect.x
          currentRect.height = pos.y - currentRect.y
        }
      } else if (type === 'circle') {
        let currentCircle = this.circles[this.circles.length - 1]
        if (shiftKey) {
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
      } else if (type === 'triangle') {
        let currentTriangle = this.triangles[this.triangles.length - 1]
        const radius = Math.min((pos.x - currentTriangle.x), (pos.y - currentTriangle.y))
        currentTriangle.radius = radius
      } else if (type === 'pentagon') {
        let currentPentagon = this.pentagons[this.pentagons.length - 1]
        const radius = Math.min((pos.x - currentPentagon.x), (pos.y - currentPentagon.y))
        currentPentagon.radius = radius
      } else if (type === 'hexagon') {
        let currentHexagon = this.hexagons[this.hexagons.length - 1]
        const radius = Math.min((pos.x - currentHexagon.x), (pos.y - currentHexagon.y))
        currentHexagon.radius = radius
      } else if (type === 'arc') {
        let currentArc = this.arcs[this.arcs.length - 1]
        const outerRadius = Math.sqrt(Math.pow((pos.x - currentArc.x), 2) + Math.pow((pos.y - currentArc.y), 2))
        const innerRadius = outerRadius / 2
        const diff_x = pos.x - currentArc.x
        const diff_y = pos.y - currentArc.y
        const angle = Math.atan2(diff_y, diff_x) * 180 / Math.PI
        currentArc.innerRadius = innerRadius
        currentArc.outerRadius = outerRadius
        currentArc.angle = angle
      } else if (type === 'line') {
        let currentLine = this.lines[this.lines.length - 1]
        if (shiftKey) {
          currentLine.points = [currentLine.points[0], currentLine.points[1], pos.x, pos.y]
        } else {
          const newPoints = currentLine.points.concat([pos.x, pos.y])
          currentLine.points = newPoints
        }
      } else if (type === 'text') {
        let currentText = this.texts[this.texts.length - 1]
        currentText.fontSize = Math.max(pos.x - currentText.x, pos.y - currentText.y)
        const node = this.$refs.canvas.getStage().findOne('.' + currentText.name)
        currentText.offset = {
          x: node.width() / 2,
          y: node.height() / 2
        }
      }
    },
    handleDrawEnd() {
      this.saveHistory()
    },
    handleSelectShape(name, newAttr) {
      this.selectedShapeName = name
      this.attr = { ...this.attr, ...newAttr }
    },
    handleEditText(textNode, areaPosition, offset) {
      this.currentTextNode = textNode
      const textArea = this.$refs.textArea
      textArea.style.display = 'block'
      textArea.value = textNode.text()
      textArea.style.position = 'absolute'
      textArea.style.top = areaPosition.y + 'px'
      textArea.style.left = areaPosition.x + 'px'
      textArea.style.width = textNode.width() - textNode.padding() * 2 + 'px'
      textArea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px'
      textArea.style.fontSize = textNode.fontSize() + 'px'
      textArea.style.border = 'none'
      textArea.style.padding = '0px'
      textArea.style.margin = '0px'
      textArea.style.overflow = 'hidden'
      textArea.style.background = 'none'
      textArea.style.outline = 'none'
      textArea.style.resize = 'none'
      textArea.style.lineHeight = textNode.lineHeight()
      textArea.style.fontFamily = textNode.fontFamily()
      textArea.style.transformOrigin = 'left top'
      textArea.style.textAlign = textNode.align()
      textArea.style.color = textNode.fill()
      const rotation = textNode.rotation()
      let transform = ''
      if (rotation) {
        transform += 'rotateZ(' + rotation + 'deg)'
      }
      textArea.style.transform = transform
      textArea.style.height = 'auto'
      textArea.style.height = textArea.scrollHeight + 3 + 'px'
      textArea.focus()
    },
    handleTextKeyDown(e) {
      if (e.keyCode === 13 && !e.shiftKey) {
        this.saveHistory()
        this.currentTextNode.text(this.$refs.textArea.value)
        this.$refs.textArea.style.display = 'none'
        this.currentTextNode.show()
        this.$refs.canvas.getTransformer().show()
        this.$refs.canvas.getTransformer().getLayer().draw()
      }
    },
    handleTextBlur(e) {
      this.saveHistory()
      this.currentTextNode.text(e.target.value)
      e.target.style.display = 'none'
      this.currentTextNode.show()
      this.$refs.canvas.getTransformer().show()
      this.$refs.canvas.getTransformer().getLayer().draw()
    },
    handlePropertyChange(value, name) {
      this.saveHistory()
      const node = this.$refs.canvas.getStage().findOne('.' + this.selectedShapeName)
      const selectedShape = this.selectedShapeName.split('-')[0]
      if (selectedShape === 'rect' && name === 'rotation') {
        node.rotate(value)
      }
      if (name === 'fontFamily') {
        node.fontFamily(value)
      } else {
        node.setAttr(name, value)
      }
      this.$refs.canvas.getTransformer().getLayer().batchDraw()
    },
    handleExport() {
      const stage = this.$refs.canvas.getStage()
      const url = stage.toDataURL({ pixelRatio: 3 })
      this.downloadURI(url, 'stage.png')
    },
    downloadURI(uri, name) {
      let link = document.createElement('a')
      link.download = name
      link.href = uri
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    saveHistory() {
      const snapshot = {
        rects: JSON.parse(JSON.stringify(this.rects)),
        circles: JSON.parse(JSON.stringify(this.circles)),
        triangles: JSON.parse(JSON.stringify(this.triangles)),
        pentagons: JSON.parse(JSON.stringify(this.pentagons)),
        hexagons: JSON.parse(JSON.stringify(this.hexagons)),
        arcs: JSON.parse(JSON.stringify(this.arcs)),
        lines: JSON.parse(JSON.stringify(this.lines)),
        texts: JSON.parse(JSON.stringify(this.texts)),
        images: JSON.parse(JSON.stringify(this.images.map(img => ({
          x: img.x,
          y: img.y,
          width: img.width,
          height: img.height,
          name: img.name,
          scaleX: img.scaleX,
          scaleY: img.scaleY,
          draggable: img.draggable,
          src: img.src
        }))))
      }
      
      this.history = this.history.slice(0, this.historyIndex + 1)
      this.history.push(snapshot)
      
      if (this.history.length > this.maxHistory) {
        this.history.shift()
      }
      
      this.historyIndex = this.history.length - 1
    },
    undo() {
      if (this.historyIndex > 0) {
        this.historyIndex--
        const snapshot = this.history[this.historyIndex]
        this.restoreFromSnapshot(snapshot)
      }
    },
    redo() {
      if (this.historyIndex < this.history.length - 1) {
        this.historyIndex++
        const snapshot = this.history[this.historyIndex]
        this.restoreFromSnapshot(snapshot)
      }
    },
    restoreFromSnapshot(snapshot) {
      this.rects = snapshot.rects
      this.circles = snapshot.circles
      this.triangles = snapshot.triangles
      this.pentagons = snapshot.pentagons
      this.hexagons = snapshot.hexagons
      this.arcs = snapshot.arcs
      this.lines = snapshot.lines
      this.texts = snapshot.texts
      
      // 恢复图片需要重新加载
      this.images = []
      if (snapshot.images && snapshot.images.length > 0) {
        snapshot.images.forEach(imgData => {
          this.loadImageFromSrc(imgData.src, imgData)
        })
      }
      
      this.$refs.canvas.getTransformer().nodes([])
      this.selectedShapeName = ''
      
      if (this.$refs.canvas) {
        this.$refs.canvas.getTransformer().getLayer().batchDraw()
      }
    },
    // 处理图形移动事件（边界检测后）
    handleShapeMoved(node) {
      // 保存历史记录
      this.saveHistory()
    },
    // 处理图片导入
    handleImportImage(file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          // 计算图片尺寸，限制最大宽高
          const maxWidth = 400
          const maxHeight = 400
          let width = img.width
          let height = img.height
          
          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height)
            width = width * ratio
            height = height * ratio
          }
          
          // 创建图片对象
          const imageData = {
            imageEl: img,
            src: e.target.result,
            x: 100,
            y: 100,
            width: width,
            height: height,
            name: 'image-' + Date.now(),
            scaleX: 1,
            scaleY: 1,
            draggable: true
          }
          
          // 保存历史并添加图片
          this.images.push(imageData)
          this.saveHistory()
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(file)
    },
    // 从 src 加载图片（用于撤销/重做）
    loadImageFromSrc(src, imgData) {
      const img = new Image()
      img.onload = () => {
        const imageData = {
          ...imgData,
          imageEl: img
        }
        this.images.push(imageData)
      }
      img.src = src
    },

  },
}
</script>

<style lang="less" scoped>
.root {
  height: 100%;
}
</style>