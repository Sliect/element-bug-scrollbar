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
    var thumbHor = el.querySelector('.is-horizontal .el-scrollbar__thumb')
    var wrap = el.querySelector('.el-scrollbar__wrap')
    resize(wrap, (val, oldVal) => {
      var width = val.width
      var height = val.height
      var oldWidth = oldVal.width
      var oldHeight = oldVal.height
      var wrapOffsetWidth = wrap.offsetWidth
      var wrapOffsetHeight = wrap.offsetHeight
      var wrapScrollWidth = wrap.scrollWidth
      var wrapScrollHeight = wrap.scrollHeight
      // 新的滚动条高度，值为百分之
      // 处理滚动条从无到有的过度，防止出现NaN
      var thumbWidth = width / oldWidth * parseFloat(thumbHor.style.width || '0')
      var thumbHeight = height / oldHeight * parseFloat(thumb.style.height || '0')
      // 从有滚动条到无滚动条
      var widthPer = thumbWidth >= 100 ? '0' : thumbWidth + '%'
      var heightPer = thumbHeight >= 100 ? '0' : thumbHeight + '%'
      // 从无滚动条到有滚动条
      if (wrapOffsetWidth < wrapScrollWidth) {
        widthPer = wrapOffsetWidth / wrapScrollWidth * 100 + '%'
      }
      if (wrapOffsetHeight < wrapScrollHeight) {
        heightPer = wrapOffsetHeight / wrapScrollHeight * 100 + '%'
      }
      thumbHor.style.width = widthPer
      thumb.style.height = heightPer
      thumbHor.style.transform = `translateX(${wrap.scrollLeft / wrapOffsetWidth * 100}%)`
      thumb.style.transform = `translateY(${wrap.scrollTop / wrapOffsetHeight * 100}%)`
    })
  }
}