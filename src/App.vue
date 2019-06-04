<template>
  <div id="app">
    <div class="container">
      <el-scrollbar style="height: 100%" ref="scroll" v-el-scrollbar-resize>
        <ul>
          <li
            v-for="(item, idx) in list"
            :key="idx"
          >{{item}}</li>
        </ul>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
// 该指令可以解决 el-scrollbara resize bug
import ElScrollbarResize from './directives/el-scrollbar-resize/index'

export default {
  name: 'app',
  computed: {
    list() {
      return Array.from({length: 20}).map((item, idx) => `item ${idx}`)
    }
  },
  directives: {
    ElScrollbarResize
  }
}
</script>

<style>
* {
  margin: 0;
}
html, body {
  height: 100%;
}
#app {
  height: 100%;
  text-align: center;
  color: #2c3e50;
}
.container {
  position: fixed;
  width: 300px;
  left: 0;
  top: 0;
  bottom: 0;
  outline: 1px solid #eee;
}
div.el-scrollbar__wrap {
  overflow-x: hidden;
}
ul {
  padding: 0;
  height: 100%;
}
li {
  list-style-type: none;
  line-height: 30px;
}
</style>
