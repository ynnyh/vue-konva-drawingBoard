# Vue-Konva 绘图板 - 优化与开发计划

本文档详细规划了项目的优化方向和后续开发计划，按优先级和阶段进行划分。

---

## 一、代码优化计划

### 1.1 架构重构（高优先级）

#### 问题分析
当前 [Konva.vue](file:///workspace/src/views/Konva.vue) 文件超过 1400 行代码，职责过于集中，不利于维护和扩展。

#### 优化方案

```
src/
├── components/
│   ├── drawing/
│   │   ├── ToolBar.vue          # 左侧工具栏
│   │   ├── PropertyPanel.vue    # 右侧属性面板
│   │   ├── Canvas.vue           # 画布组件
│   │   └── ShapeRenderer.vue    # 图形渲染器
│   └── common/
│       ├── ColorPicker.vue      # 颜色选择器封装
│       └── NumberInput.vue      # 数字输入封装
├── mixins/
│   ├── drawing.js               # 绘图逻辑混入
│   ├── selection.js             # 选择逻辑混入
│   └── keyboard.js              # 键盘事件混入
├── hooks/                       # 组合式 API（如升级 Vue 3）
│   ├── useDrawing.js
│   ├── useSelection.js
│   └── useExport.js
└── constants/
    ├── shapes.js                # 图形类型常量
    └── shortcuts.js             # 快捷键常量
```

#### 实施步骤
1. 提取 ToolBar 组件
2. 提取 PropertyPanel 组件
3. 提取 Canvas 组件
4. 创建 mixins 分离逻辑
5. 重构主页面组合各组件

---

### 1.2 状态管理优化（中优先级）

#### 问题分析
当前 Vuex Store 使用率低，图形数据分散在组件内部。

#### 优化方案

```javascript
// store/modules/shapes.js
export default {
  namespaced: true,
  state: {
    shapes: {
      rects: [],
      circles: [],
      triangles: [],
      pentagons: [],
      hexagons: [],
      arcs: [],
      lines: [],
      texts: []
    },
    selectedIds: [],
    currentTool: 'arrow'
  },
  mutations: {
    ADD_SHAPE(state, { type, shape }) { ... },
    UPDATE_SHAPE(state, { id, updates }) { ... },
    DELETE_SHAPES(state, ids) { ... },
    SET_SELECTION(state, ids) { ... },
    SET_TOOL(state, tool) { ... }
  },
  actions: {
    // 撤销/重做支持
    saveHistory({ commit, state }) { ... },
    undo({ commit }) { ... },
    redo({ commit }) { ... }
  }
}
```

---

### 1.3 性能优化（中优先级）

#### 优化点

| 优化项 | 当前问题 | 解决方案 |
|--------|---------|---------|
| 图形渲染 | 频繁全量渲染 | 使用 `batchDraw()` 替代 `draw()` |
| 事件处理 | 频繁触发重绘 | 添加节流/防抖 |
| 数据响应 | 大量响应式数据 | 非关键数据使用 `Object.freeze()` |
| 图形数量 | 无上限 | 添加虚拟化/分页 |

#### 代码示例

```javascript
import { throttle } from 'lodash-es'

export default {
  methods: {
    handleMouseMove: throttle(function(e) {
      // 原有逻辑
    }, 16)
  }
}
```

---

### 1.4 代码规范优化（低优先级）

- [ ] 添加 ESLint 规则配置
- [ ] 添加 Prettier 格式化配置
- [ ] 添加 Git Hooks (husky + lint-staged)
- [ ] 添加单元测试框架

---

## 二、功能开发计划

### 阶段一：核心功能完善（优先级：高）

#### 2.1 撤销/重做功能 ⭐⭐⭐

**需求描述**：支持 Ctrl+Z 撤销、Ctrl+Y 重做操作

**技术方案**：
```javascript
// store/modules/history.js
export default {
  state: {
    history: [],
    historyIndex: -1,
    maxHistory: 50
  },
  mutations: {
    PUSH_HISTORY(state, snapshot) {
      state.history = state.history.slice(0, state.historyIndex + 1)
      state.history.push(snapshot)
      if (state.history.length > state.maxHistory) {
        state.history.shift()
      }
      state.historyIndex = state.history.length - 1
    },
    UNDO(state) {
      if (state.historyIndex > 0) {
        state.historyIndex--
        return state.history[state.historyIndex]
      }
    },
    REDO(state) {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++
        return state.history[state.historyIndex]
      }
    }
  }
}
```

**实施步骤**：
1. 创建 history 模块
2. 在每次操作后保存快照
3. 实现快捷键监听
4. 添加 UI 按钮

---

#### 2.2 Mac 快捷键兼容 ⭐⭐⭐

**需求描述**：支持 Mac 系统的 Cmd 键操作

**技术方案**：
```javascript
const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0
const metaKey = isMac ? 'metaKey' : 'ctrlKey'

// 使用
if (e[metaKey] && e.key === 'z') {
  // 撤销操作
}
```

---

#### 2.3 画布边界检测 ⭐⭐

**需求描述**：防止图形被拖出画布可视区域

**技术方案**：
```javascript
// 在 dragmove 事件中限制边界
handleDragMove(e) {
  const node = e.target
  const stage = this.$refs.stage.getNode()
  const box = node.getClientRect()
  
  // 边界约束
  if (box.x < 0) node.x(node.x() - box.x)
  if (box.y < 0) node.y(node.y() - box.y)
  if (box.x + box.width > stage.width()) {
    node.x(stage.width() - box.width - (box.x - node.x()))
  }
  if (box.y + box.height > stage.height()) {
    node.y(stage.height() - box.height - (box.y - node.y()))
  }
}
```

---

### 阶段二：高级绘图功能（优先级：中）

#### 2.4 贝塞尔曲线 ⭐⭐⭐

**需求描述**：支持绘制二次/三次贝塞尔曲线

**技术方案**：
```javascript
// 使用 Konva.Line 配合 bezier 属性
{
  points: [startX, startY, cpX, cpY, endX, endY],
  bezier: true,
  stroke: '#000',
  strokeWidth: 1
}
```

**UI 设计**：
- 添加贝塞尔曲线工具按钮
- 绘制时显示控制点
- 支持拖拽调整控制点

---

#### 2.5 Path 路径绘制（套索工具）⭐⭐

**需求描述**：自由绘制闭合路径

**技术方案**：
```javascript
// 绘制完成后自动闭合
finishPath() {
  const points = this.currentPath.points
  if (points.length >= 4) {
    // 闭合路径
    points.push(points[0], points[1])
  }
}
```

---

#### 2.6 图片导入 ⭐⭐

**需求描述**：支持导入图片到画布

**技术方案**：
```javascript
importImage(file) {
  const reader = new FileReader()
  reader.onload = (e) => {
    const img = new Image()
    img.onload = () => {
      this.images.push({
        image: img,
        x: 100,
        y: 100,
        width: img.width,
        height: img.height,
        name: 'image-' + guid()
      })
    }
    img.src = e.target.result
  }
  reader.readAsDataURL(file)
}
```

---

#### 2.7 元素 Z-Index 控制 ⭐

**需求描述**：调整图形的层叠顺序

**UI 设计**：
- 添加"置顶"、"置底"、"上移一层"、"下移一层"按钮
- 或在属性面板添加层级滑块

---

#### 2.8 Group 组合功能 ⭐

**需求描述**：将多个图形组合成一个整体

**技术方案**：
```javascript
groupShapes(ids) {
  const group = new Konva.Group()
  ids.forEach(id => {
    const shape = this.findShape(id)
    group.add(shape)
  })
  this.layer.add(group)
}
```

---

### 阶段三：用户体验增强（优先级：低）

#### 2.9 鹰眼功能 ⭐

**需求描述**：显示画布缩略图，支持快速定位

**技术方案**：
- 创建缩略图 Stage
- 同步主画布内容
- 添加视口指示器

---

#### 2.10 线条端点样式 ⭐

**需求描述**：支持设置线条两端的样式（圆头、方头、箭头等）

**属性面板新增**：
- 端点样式选择器
- 连接点样式选择器

---

## 三、技术债务处理

### 3.1 Vue 2 -> Vue 3 升级

**升级理由**：
- 更好的 TypeScript 支持
- Composition API 更适合复杂逻辑
- 更优的性能表现

**升级步骤**：
1. 升级依赖版本
2. 使用 Vue 3 迁移构建版本
3. 逐步替换 Options API 为 Composition API
4. 更新相关库版本

---

### 3.2 TypeScript 支持

**目标**：添加类型定义，提高代码可维护性

```typescript
interface Shape {
  name: string
  x: number
  y: number
  draggable: boolean
  scaleX: number
  scaleY: number
  rotation: number
}

interface RectShape extends Shape {
  width: number
  height: number
}
```

---

### 3.3 单元测试

**测试框架选择**：Jest + Vue Test Utils

**测试覆盖目标**：
- 工具函数 100% 覆盖
- 组件核心逻辑 80% 覆盖

---

## 四、开发里程碑

### Milestone 1: 代码重构 (v0.2.0)
- [ ] 组件拆分
- [ ] Vuex 状态管理优化
- [ ] 撤销/重做功能
- [ ] Mac 快捷键兼容

### Milestone 2: 功能增强 (v0.3.0)
- [ ] 贝塞尔曲线
- [ ] 图片导入
- [ ] 画布边界检测
- [ ] Z-Index 控制

### Milestone 3: 体验优化 (v0.4.0)
- [ ] Group 组合
- [ ] 鹰眼功能
- [ ] 线条端点样式
- [ ] Path 路径绘制

### Milestone 4: 技术升级 (v1.0.0)
- [ ] Vue 3 升级
- [ ] TypeScript 支持
- [ ] 单元测试
- [ ] 文档完善

---

## 五、建议的开发顺序

基于当前项目状态，建议按以下顺序逐步完善：

```
第一步：Mac 快捷键兼容（快速修复，影响用户体验）
    ↓
第二步：撤销/重做功能（核心功能，影响使用体验）
    ↓
第三步：组件拆分重构（为后续开发打基础）
    ↓
第四步：画布边界检测（提升可用性）
    ↓
第五步：图片导入（高频需求功能）
    ↓
第六步：贝塞尔曲线（高级绘图需求）
    ↓
后续：根据实际需求继续迭代
```

---

**文档版本**: 1.0  
**更新时间**: 2026-04-01
