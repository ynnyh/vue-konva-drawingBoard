# Vue-Konva 绘图板 (Drawing Board)

[![在线预览](https://img.shields.io/badge/在线预览-GitHub%20Pages-brightgreen?style=for-the-badge)](https://ynnyh.github.io/drawingBoard/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

一个基于 Vue.js 和 Konva.js 构建的功能丰富的在线绘图工具，支持多种几何图形绘制、编辑和导出。

**👉 [点击这里在线体验](https://ynnyh.github.io/drawingBoard/)**

## 项目特性

- 支持多种图形绘制：矩形、椭圆、三角形、五边形、六边形、弧形、自由线条、文字
- 图形选择与变换：支持单选和多选，可进行缩放、旋转、拖拽
- 属性编辑：实时修改图形的描边、填充、旋转角度等属性
- 智能对齐：元素移动时自动显示辅助对齐线
- 图片导出：支持将画布导出为 PNG 图片
- 键盘快捷键：支持 Delete 键删除选中图形

## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| Vue.js | ^2.6.11 | 渐进式 JavaScript 框架 |
| Konva.js | ^7.2.2 | HTML5 Canvas 库 |
| vue-konva | ^2.1.6 | Vue 的 Konva 绑定 |
| Element UI | ^2.14.1 | Vue UI 组件库 |
| Vue Router | ^3.2.0 | 路由管理 |
| Vuex | ^3.4.0 | 状态管理 |
| Less | ^3.0.4 | CSS 预处理器 |

## 项目结构

```
src/
├── assets/           # 静态资源（样式、图标、图片）
├── components/       # 公共组件
├── router/           # 路由配置
├── store/            # Vuex 状态管理
│   ├── index.js      # Store 主文件
│   ├── actions.js    # 异步操作
│   ├── mutations.js  # 状态修改
│   └── getters.js    # 状态获取
├── utils/            # 工具函数
├── views/            # 页面组件
│   └── Konva.vue     # 绘图板主页面
├── App.vue           # 根组件
└── main.js           # 应用入口
```

## 快速开始

### 环境要求

- Node.js >= 12.x
- npm >= 6.x 或 yarn >= 1.x

### 安装依赖

```bash
# 使用 yarn
yarn install

# 使用 npm
npm install
```

### 开发模式

```bash
# 使用 yarn
yarn serve

# 使用 npm
npm run serve
```

访问 http://localhost:8080 查看应用。

### 生产构建

```bash
# 使用 yarn
yarn build

# 使用 npm
npm run build
```

### 代码检查

```bash
# 使用 yarn
yarn lint

# 使用 npm
npm run lint
```

## 使用指南

### 绘图工具

| 工具 | 快捷操作 | 说明 |
|------|---------|------|
| 箭头 | 默认 | 选择、移动、变换图形 |
| 矩形 | 按住 Shift 绘制正方形 | 绘制矩形 |
| 椭圆 | 按住 Shift 绘制正圆 | 绘制椭圆 |
| 三角形 | - | 绘制正三角形 |
| 五边形 | - | 绘制正五边形 |
| 六边形 | - | 绘制正六边形 |
| 弧形 | - | 绘制弧形 |
| 铅笔 | - | 自由绘制路径 |
| 文字 | 双击编辑 | 添加文字 |

### 快捷键

| 快捷键 | 功能 |
|--------|------|
| Delete | 删除选中图形 |
| Shift + 拖拽 | 约束比例（矩形/椭圆） |
| Ctrl/Cmd + 点击 | 多选图形 |

### 属性编辑

选中图形后，可在右侧属性栏修改：
- 尺寸（宽度、高度、半径等）
- 描边（开关、宽度、颜色）
- 填充（开关、颜色）
- 旋转角度
- 是否可拖拽

## 已知问题

- [ ] 不兼容 Mac 快捷键

## 开发计划

详见 [DEVELOPMENT_PLAN.md](./DEVELOPMENT_PLAN.md)

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证。

## 作者

月魂

---

**项目版本**: 0.1.0  
**最后更新**: 2021-01-21
