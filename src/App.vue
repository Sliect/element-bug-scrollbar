<template>
  <div id="app">
    <div class="container">
      <el-scrollbar style="height: 100%" ref="scroll">
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
import { debounce } from './utils.js'

export default {
  name: 'app',
  computed: {
    list() {
      return Array.from({length: 200}).map((item, idx) => `item ${idx}`)
    }
  },
  mounted() {
    // 去掉注释可见解决效果
    // var el = this.$refs.scroll.$el
    // var thumb = el.querySelector('.is-vertical .el-scrollbar__thumb')
    // var wrap = el.querySelector('.el-scrollbar__wrap')
    // this.resize(wrap, (val, oldVal) => {
    //   var height = val.height
    //   var oldHeight = oldVal.height
    //   thumb.style.height = height / oldHeight * parseFloat(thumb.style.height) + '%'
    //   thumb.style.transform = `translateY(${wrap.scrollTop / wrap.offsetHeight * 100}%)`
    // })
  },
  methods: {
    // 通过监听iframe的resize事件
    resize(el, cb) {
      // 将监听的iframe元素插入到被监听的对象中
      var iframe = document.createElement('iframe')
      iframe.setAttribute('class', 'size-watch')
      el.appendChild(iframe)

      // 记录当前元素的宽高
      var oldWidth = el.offsetWidth
      var oldHeight = el.offsetHeight

      function sizeChange() {
        var width = el.offsetWidth
        var height = el.offsetHeight
        if (width !== oldWidth || height !== oldHeight) {
          cb({ width, height }, { width: oldWidth, height: oldHeight })
          oldWidth = width
          oldHeight = height
        }
      }

      iframe.contentWindow.onresize = debounce(sizeChange, 20)
    }
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

.size-watch {
  width: 100%;
  height: 100%;
  position: absolute;
  visibility:hidden;
  margin: 0;
  padding: 0;
  border: 0;
}
</style>
