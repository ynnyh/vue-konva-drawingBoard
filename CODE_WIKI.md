# Vue-Konva 绘图板项目 Code Wiki

## 1. 项目概述

**项目名称**：vue-konva-drawingBoard  
**项目类型**：基于 Vue.js 的图形绘图应用  
**主要功能**：提供一个功能丰富的在线绘图工具，支持多种几何图形绘制、编辑和导出

## 2. 技术栈

| 技术/库 | 版本 | 用途 |
|---------|------|------|
| Vue.js | ^2.6.11 | 前端框架 |
| Konva | ^7.2.2 | Canvas 图形库 |
| vue-konva | ^2.1.6 | Vue.js 的 Konva 绑定库 |
| Element UI | ^2.14.1 | UI 组件库 |
| Vue Router | ^3.2.0 | 路由管理 |
| Vuex | ^3.4.0 | 状态管理 |
| Less | ^3.0.4 | CSS 预处理器 |

## 3. 项目结构

```
/workspace/
├── public/                    # 静态资源
│   ├── favicon.ico           # 网站图标
│   └── index.html            # 入口 HTML
├── src/                       # 源代码
│   ├── assets/               # 资源文件
│   │   ├── common.less       # 公共样式
│   │   ├── iconfont.js       # 图标字体
│   │   └── logo.png          # 项目 logo
│   ├── components/           # 通用组件
│   │   └── HelloWorld.vue    # 示例组件
│   ├── router/               # 路由配置
│   │   └── index.js          # 路由主文件
│   ├── store/                # Vuex 状态管理
│   │   ├── actions.js        # Actions 定义
│   │   ├── getters.js        # Getters 定义
│   │   ├── index.js          # Store 主文件
│   │   └── mutations.js      # Mutations 定义
│   ├── utils/                # 工具函数
│   │   └── utils.js          # 核心工具函数
│   ├── views/                # 页面组件
│   │   └── Konva.vue         # 绘图板主页面
│   ├── App.vue               # 根组件
│   └── main.js               # 应用入口
├── babel.config.js           # Babel 配置
├── package.json              # 项目依赖配置
├── vue.config.js             # Vue CLI 配置
├── yarn.lock                 # Yarn 依赖锁定
└── README.md                 # 项目说明
```

## 4. 主要模块职责

### 4.1 入口模块 ([main.js](file:///workspace/src/main.js))
- **职责**：初始化 Vue 应用，配置全局插件和样式
- **主要任务**：
  - 注册 VueKonva 插件
  - 注册 Element UI 组件库
  - 配置全局样式和图标字体
  - 挂载应用到 DOM

### 4.2 路由模块 ([router/index.js](file:///workspace/src/router/index.js))
- **职责**：管理应用路由
- **主要任务**：配置根路由 `/` 指向绘图板页面

### 4.3 状态管理模块 ([store/](file:///workspace/src/store/))
- **职责**：管理全局状态（目前仅用于存储 canvas 对象）
- **核心文件**：
  - [index.js](file:///workspace/src/store/index.js)：Store 主配置
  - [mutations.js](file:///workspace/src/store/mutations.js)：状态修改方法
  - [actions.js](file:///workspace/src/store/actions.js)：异步操作
  - [getters.js](file:///workspace/src/store/getters.js)：状态获取方法

### 4.4 绘图板主页面 ([views/Konva.vue](file:///workspace/src/views/Konva.vue))
- **职责**：核心绘图应用页面
- **主要功能**：
  - 左侧工具栏：提供图形绘制工具选择
  - 中间画布：绘图区域
  - 右侧属性栏：图形属性编辑和导出功能
  - 图形选择、编辑、删除
  - 图片导出

### 4.5 工具函数模块 ([utils/utils.js](file:///workspace/src/utils/utils.js))
- **职责**：提供绘图相关的工具函数
- **主要函数**：
  - `guid()`：生成唯一标识符
  - `delShape()`：删除图形
  - `drawByDown()`：初始化图形绘制
  - `setAttr()`：设置图形属性

## 5. 关键类与函数说明

### 5.1 工具函数 ([utils/utils.js](file:///workspace/src/utils/utils.js))

#### `guid()`
- **作用**：生成唯一标识符
- **返回值**：String - 符合 UUID 格式的字符串
- **用途**：为每个新绘制的图形生成唯一名称

#### `delShape(name, data)`
- **作用**：从数据数组中删除指定图形
- **参数**：
  - `name` (String)：图形的唯一名称
  - `data` (Array)：图形数据数组
- **返回值**：Array - 删除后的图形数据数组

#### `drawByDown(pos, data, type)`
- **作用**：在鼠标按下时初始化图形绘制
- **参数**：
  - `pos` (Object)：鼠标位置坐标 `{x, y}`
  - `data` (Array)：图形数据数组
  - `type` (String)：图形类型
- **返回值**：Array - 更新后的图形数据数组

#### `setAttr(type, params, data)`
- **作用**：根据图形类型设置属性
- **参数**：
  - `type` (String)：图形类型
  - `params` (Object)：图形自身参数
  - `data` (Object)：属性配置
- **返回值**：Object - 合并后的属性对象

### 5.2 绘图板页面 ([views/Konva.vue](file:///workspace/src/views/Konva.vue))

#### 数据属性
| 属性名 | 类型 | 描述 |
|--------|------|------|
| `arrowType` | String | 当前选中的绘图工具类型 |
| `isDrawing` | Boolean | 是否正在绘制 |
| `rects` | Array | 矩形数据数组 |
| `circles` | Array | 椭圆数据数组 |
| `triangles` | Array | 三角形数据数组 |
| `pentagons` | Array | 五边形数据数组 |
| `hexagons` | Array | 六边形数据数组 |
| `arcs` | Array | 弧形数据数组 |
| `lines` | Array | 线条数据数组 |
| `texts` | Array | 文字数据数组 |
| `selectedShapeName` | String | 当前选中的图形名称 |
| `attr` | Object | 属性栏配置对象 |

#### 核心方法

##### `changeArrowType(type)`
- **作用**：切换绘图工具类型
- **参数**：`type` (String) - 工具类型

##### `handleMouseDown(e)`
- **作用**：处理鼠标按下事件，开始绘制或选择
- **参数**：`e` (Event) - 鼠标事件对象

##### `handleMouseMove(e)`
- **作用**：处理鼠标移动事件，调整图形尺寸
- **参数**：`e` (Event) - 鼠标事件对象

##### `handleMouseUp()`
- **作用**：处理鼠标抬起事件，完成绘制或选择

##### `handleClick(e)`
- **作用**：处理点击事件，选择图形
- **参数**：`e` (Event) - 点击事件对象

##### `handleChange(value, name)`
- **作用**：处理属性栏变更，更新图形属性
- **参数**：
  - `value` (Any)：新的属性值
  - `name` (String)：属性名称

##### `handleExport()`
- **作用**：导出画布为图片

##### `editText(e)`
- **作用**：编辑文字图形内容
- **参数**：`e` (Event) - 事件对象

##### `onKeyDown(e)`
- **作用**：处理键盘事件，支持删除键删除图形
- **参数**：`e` (Event) - 键盘事件对象

##### 辅助对齐功能方法
- `getLineGuideStops()`：获取对齐参考线
- `getObjectSnappingEdges()`：获取对象吸附边
- `getGuides()`：查找对齐机会
- `drawGuides()`：绘制对齐线
- `onLayerDragMove()`：处理图层拖动移动
- `onLayerDragEnd()`：处理图层拖动结束

## 6. 支持的图形类型

| 图形类型 | 工具标识 | 描述 |
|---------|---------|------|
| 选择/箭头 | `arrow` | 选择、移动、变换图形 |
| 矩形 | `rect` | 绘制矩形，支持 Shift 键绘制正方形 |
| 椭圆 | `circle` | 绘制椭圆，支持 Shift 键绘制正圆 |
| 三角形 | `triangle` | 绘制正三角形 |
| 五边形 | `pentagon` | 绘制正五边形 |
| 六边形 | `hexagon` | 绘制正六边形 |
| 弧形 | `arc` | 绘制弧形 |
| 铅笔/线条 | `line` | 自由绘制路径 |
| 文字 | `text` | 添加文字 |

## 7. 项目运行方式

### 7.1 环境要求
- Node.js
- npm 或 yarn

### 7.2 安装依赖
```bash
# 使用 yarn
yarn install

# 使用 npm
npm install
```

### 7.3 开发模式运行
```bash
# 使用 yarn
yarn serve

# 使用 npm
npm run serve
```

### 7.4 生产环境构建
```bash
# 使用 yarn
yarn build

# 使用 npm
npm run build
```

### 7.5 代码检查
```bash
# 使用 yarn
yarn lint

# 使用 npm
npm run lint
```

## 8. 待实现功能 (Todo)

根据 [README.md](file:///workspace/README.md) 中的计划，以下是待实现功能：

1. ✅ 前进、回退功能（重要）
2. ✅ 元素移动时粘性刻度提示（已实现）
3. ⏳ 贝塞尔曲线（重要）
4. ⏳ Path 路径绘制（套索工具）
5. ⏳ 元素 z-index 设置
6. ⏳ Group 组合功能
7. ⏳ 画布边界检测
8. ⏳ 图片导入
9. ⏳ 鹰眼功能
10. ⏳ 线条两端样式选择

## 9. 已知问题 (Bug)

1. 不兼容 Mac 快捷键

## 10. 设计建议

1. 图形上不能直接创建另一个图形（设计限制，避免拖拽和生成元素的矛盾）

---

**文档生成时间**：2026-04-01  
**项目版本**：0.1.0
