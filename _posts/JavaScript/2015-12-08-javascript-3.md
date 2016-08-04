---
layout: detail_tmp
title: AMD和CMD的区别
intro: AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。
categories: JavaScript
keyword: AMD、CMD、Requirejs、Seajs
author: H君
show_type: image
show_intro: /res/img/page/img7.jpg
tags: [JavaScript]
---

# AMD和CMD的区别

`AMD` `CMD`

--- 

![AMD、CMD](../res/img/page/img7.jpg) 

AMD 规范：[点击这里](https://github.com/amdjs/amdjs-api/wiki/AMD "AMD"){:target="_blank"}

CMD 规范：[点击这里](https://github.com/seajs/seajs/issues/242 "CMD"){:target="_blank"}

`AMD` 是 RequireJS 对模块定义的规范化产出。

`CMD` 是 SeaJS 对模块定义的规范化产出。

类似这些的还有很多...

这些规范都是为了`javascript`的模块化开发。

<br />

#### 模块化的好处主要由以下几点：


1.更好的分离

2.更好的代码组织方式

3.避免命名冲突

4.更好的依赖处理

<br />

#### AMD与CMD主要区别：

`AMD`推崇依赖前置，`CMD`推崇依赖就近。

AMD：

    //依赖需要提前
    define('a,b',function(a,b){
        doing...
    })

CMD:
    
    require(function(require, exports, module){
        //依赖可以就近
        var a=require('./a');
        doing...
        
        //依赖可以就近
        var b=require('./b')
        doing...
    })



