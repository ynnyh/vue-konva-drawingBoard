<!--
 * @Author: 月魂
 * @Date: 2021-01-08 14:20:20
 * @LastEditTime: 2021-01-11 10:42:32
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
2. 导出功能 ★
3. 铅笔工具，在按住shift情况下可以画出直线
4. 箭头工具 ★
5. 前进、回退功能(要考虑性能问题，是否进行反复重绘，若把name作为键，每次选中进行指定重绘) ★★★
6. 右侧属性栏展示修改(优先级第一) ★★★★★
7. 元素移动时粘性刻度提示（低优先级）
8. 贝塞尔曲线 ★★★
9. path路径绘制 ★★
10. 可以导出
11. 橡皮擦 (考虑是否需要擦除功能，暂不提供)
12. 选中元素按住del键可以进行删除操作 ★★★★★


### 属性栏
1. 在data中设立全局属性，将所有元素的全部属性记录，无论共有属性还是独特属性，每次修改时先清空全局属性在进行读取
2. 只在选中单个元素时展示右侧属性栏
3. 根据选中元素的类型展示不同的属性并进行操作

