import { debounce } from '../../utils.js'
import './index.scss'
import variables from './index.scss'

// 通过监听iframe的resize事件实现监听el的变化
function resize(el, cb) {
  // 将监听的iframe元素插入到被监听的对象中
  var iframe = document.createElement('iframe')
  iframe.setAttribute('class', variables.classname)
  el.appendChild(iframe)

  // 记录当前元素的宽高
  var oldWidth = el.offsetWidth
  var oldHeight = el.offsetHeight

  function sizeChange() {
    var width = el.offsetWidth
    var height = el.offsetHeight
    if (width !== oldWidth || height !== oldHeight) {
      cb({
        width,
        height
      }, {
        width: oldWidth,
        height: oldHeight
      })
      oldWidth = width
      oldHeight = height
    }
  }

  iframe.contentWindow.onresize = debounce(sizeChange, 20)
}

export default {
  inserted(el) {
    var thumb = el.querySelector('.is-vertical .el-scrollbar__thumb')
    var wrap = el.querySelector('.el-scrollbar__wrap')
    resize(wrap, (val, oldVal) => {
      var height = val.height
      var oldHeight = oldVal.height
      thumb.style.height = height / oldHeight * parseFloat(thumb.style.height) + '%'
      thumb.style.transform = `translateY(${wrap.scrollTop / wrap.offsetHeight * 100}%)`
    })
  }
}