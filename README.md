# element-bug-scrollbar
外层包裹元素尺寸变化后，滑动轨道与期待不符

## 重现步骤
将指令注释可重现bug，添加指令可查看解决方案的效果

npm i & npm run serve

将滚动条滑倒底部,缩放浏览器

放大 el-scrollbar 元素的高度会导致滑块无法滚动到底部

缩小 el-scrollbar 元素的高度会导致滑块滑倒底部时部分不可见

![bug](./bug.gif)

## 解决方案
纵向滚动条
``` js
var wrap = document.querySelector('.el-scrollbar__wrap')
var thumb = document.querySelector('.el-scrollbar__thumb')
var percent = wrap.scrollTop / wrap.offsetHeight * 100 + '%'
// 通过 `translateY(${percent})` 来控制滑块的位置，但是缩放 wrap 并不会改变滑块的高度，所以才会导致该bug
// 解决办法也很简单，监听 wrap 的尺寸变化，获得 wrap 高度改变的比例，同比放大滑块高度并重新计算 transform 位置即可。
this.resize(wrap, (val, oldVal) => {
  var height = val.height
  var oldHeight = oldVal.height
  thumb.style.height = height / oldHeight * parseFloat(thumb.style.height) + '%'
  thumb.style.transform = `translateY(${wrap.scrollTop / wrap.offsetHeight * 100}%)`
})
```

横向滚动条添加元素时尺寸变化添加样式，注意子项必须也是inline-block样式
resize bug
``` css
.el-scrollbar__view {
  display: inline-block;
  min-width: 100%;
  white-space: nowrap;
}
```

### 修复滚动条高度不会随wrap的尺寸变化而变化
![mod](./mod.gif)

### 修复滚动条从无到有
![fix](./fix.gif)

### 修复滚动条从有到无
![fix2](./fix2.gif)
