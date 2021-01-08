<!--
 * @Author: 月魂
 * @Date: 2020-12-24 10:51:41
 * @LastEditTime: 2020-12-31 15:11:58
 * @LastEditors: 月魂
 * @Description: In User Settings Edit
 * @FilePath: \demo\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="less">
html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
// 调整编辑器侧边操作栏样式
.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 64px;
  padding-top: 36px;
}

.el-main {
  padding: 0 !important;
}
</style>
