<!--
 * @Author: 月魂
 * @Date: 2021-01-08 14:20:20
 * @LastEditTime: 2021-01-21 16:08:40
 * @LastEditors: 月魂
 * @Description: 
 * @FilePath: \vue-konva-drawingBoard\README.md
-->
# vue-konva-drawingBoard

## How to use it
```
// 1. download
git clone xxxx
// 2. install
yarn or npm install
// 3. run
yarn serve or npm run serve
```
### todo
1. 文字在普通箭头选中下无法修改(需确认复现，暂时没有复现)
2. 前进、回退功能(要考虑性能问题，是否进行反复重绘，若把name作为键，每次选中进行指定重绘) ★★★
3. 元素移动时粘性刻度提示（低优先级）(已实现)
4. 贝塞尔曲线 ★★★
5. path路径绘制 ★★ (套索工具，在结束绘制时自动闭合图形，应该是必要的？？？)
6. 元素z-index设置，可以用来控制堆叠元素的优先级
7. group组合，可以将一些元素拼为一个组
8. 需要加入画布边界检测，不允许将图形拖出画布
9. 图片导入
10. 鹰眼

### 属性栏
1. 线条可选两端样式

### bug
1. 不兼容mac快捷键

### 建议
1. 图形上不能直接创建另一个图形(这个是设计的不允许在图形上进行创建，否则在拖拽和生成元素之间会发生矛盾)


