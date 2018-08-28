# 函数

## 运动函数

 参数1  要运动的元素 ， 参数2  要运动到的位置。

```js
function move(element, target) {
    clearInterval(element.timer);//清除旧的定时器，保证匀速运动，防止加速效果
    element.timer = setInterval(function () {
      //1 获取元素当前位置 使用offsetLeft属性
      var current = element.offsetLeft;
      //2 设置步长
      var step = 17;
      //根据当前位置和目标位置的大小关系进行判断
      step = target > current ? step : -step;
      //5 运动条件设置
      //检测当前位置和目标位置之间的距离，如果满足一个step的距离，可以运动，否则直接运动到目标位置，结束
      if (Math.abs(target - current) > Math.abs(step)) {
        //3 设置运动公式:元素位置(新) = 元素位置(旧) + 步长;
        current = current + step;
        //4 设置给元素的left值运动
        element.style.left = current + "px";
      } else {
        //6 让element直接运动到目标位置，再清除定时器
        element.style.left = target + "px";
        clearInterval(element.timer);
      }
    }, 20);
  }
```



# html的默认样式

## 清除手机端 a标签点击高亮

```css
/* 手机手机端取出 a标签点击高亮 */

    -webkit-tap-highlight-color: transparent;
```

## img样式问题

```css
img {
    /* 解决基线对齐问题 */
    vertical-align: middle;
    /* 解决旧版本的ie 图片默认边框 */
    border: 0 none; 
    outline: none;
}
```



## a标签

### 清除a标签默认样式 

```css
a {
    /* 清除a标签默认样式 */
    text-decoration: none;
}
```

## 清除浮动 

```css
/* 双伪元素清除浮动 */
.clearfix:before,
.clearfix:after {
    content: "";
    display: table;
}

.clearfix:after {
    clear: both;
}

.clearfix {
    *zoom: 1;
}
```

## 去除文字倾斜

```css
/* 去除文字倾斜 */
    font-style: normal;
```

## 清除input标签默认样式

```css
input {
    /* 清除input默认样式 */
    outline: none;
    border: none;
}
```

## 内减模型

```
 /* 内减盒模型 */
    box-sizing: border-box;
```

## 文本实现（...）

```css
/* 实现(...)*/
//强制在一行显示
white-space:nowrap
//溢出隐藏
overflow:hidden
//显示...
text-overflow:ellipsis

```

## 表格边框合并

```css
/*表格边框合并*/
border-collapse；

```



## 移动滚动顺滑

```css
//在移动端让区域滚动更加顺滑 在模拟器中看不到效果 需要在真机中查看
 -webkit-overflow-scrolling: touch;
```

## rem Js部分

```js
/*
REM
 window.onresize = function () {
        var current =  document.documentElement.clientWidth; // 获取屏幕可视区域的宽度
        document.documentElement.style.fontSize = current * 100 / 640 + 'px'; 将计算好的 字体大小设置给html
    }
    //因为js垃圾回收机制 函数执行完成立即销毁， 所以将函数 内部执行的代码再次执行一遍
    var current =  document.documentElement.clientWidth;
    document.documentElement.style.fontSize = current * 100 / 640 + 'px';
*/
```

