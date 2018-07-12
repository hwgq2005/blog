---
layout: detail_tmp
title: 前端开发规范
intro: 前端开发规范
categories: JavaScript
keyword: 前端开发规范
author: H君
show_type: image
show_intro: /res/img/page/img14.jepg
tags: [JavaScript]
---


# 前端开发规范


`JavaScript`

--- 

> 在多人协作的团队里，需要制定一套合理的规范，才会让开发更加方便、统一。这是我之前团队里制定的一个前端规范，现在跟大家分享一下，希望可以互相交流下。

[TOC]

### 一、命名规则

命名使用 `-` 号作为连接符

#### 1. 项目命名

    tronker, soffice, app-tronker, app-soffice

#### 2. 目录命名

    tronker, soffice, app-tronker, app-soffice

#### 3. 文件命名


- css 文件

    普通文件：
        
        app.css、my-home.css
        
    自定义插件：
        
        假设项目组 Tronker 使用 't-' 开头：t-form.css、t-page.css 等。
        假设项目组 Sofiice 使用 's-' 开头：s-form.css、s-page.css 等。

- js 文件

    普通文件：
        
        app.js、my-home.js
        
    自定义插件：
        
        假设项目组 Tronker 使用 't-' 开头：t-form.js、t-page.js 等。
        假设项目组 Tronker 使用 's-' 开头：s-form.js、s-page.js 等。

- html 文件

        .order.html、order-pay.html

注：其它文件也遵循以上规则。

### 二、HTML

#### 1. HTML5 Doctype

在页面开头使用这个简单地 doctype 来启用标准模式，使其在每个浏览器中尽可能一致的展现；虽然 doctype 不区分大小写，但是按照惯例，doctype 大写。

```
<!DOCTYPE html>
<html>
    ...
</html>
```

#### 2. lang 属性

根据 HTML5 规范：应在 html 标签上加上 lang 属性。这会给语音工具和翻译工具帮助，告诉它们应当怎么去发音和翻译。

```
<!DOCTYPE html>
<html lang="zh">
    ...
</html>
```

#### 3. 字符编码

通过声明一个明确的字符编码，让浏览器轻松、快速的确定适合网页内容的渲染方式，通常指定为'UTF-8'。

```
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
    </head>
    ...
</html>
```

#### 4. IE 渲染模式

用 `<meta>` 标签可以指定页面应该用什么版本的IE来渲染。

```
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    </head>
    ...
</html>
```
注：Edge 表示 IE 最新的版本模式，也可以等于 IE=9、IE=8 等。

#### 5. 引入 CSS、JS

根据 HTML5 规范, 通常在引入 CSS 和 JS 时不需要指明 `type` ，因为 `text/css` 和 `text/javascript` 分别是他们的默认值。

```
<!-- 一引入CSS -->
<link rel="stylesheet" href="order-pay.css">

<!-- 文档中 CSS -->
<style>
    ...
</style>

<!-- 引入JS -->
<script src="order-pay.js"></script>

<!-- 文档中 JS -->
<script>
    ...
</script>
```

#### 6. 属性顺序

属性应该按照特定的顺序出现以保证易读性。

- class
- id
- name
- data-*
- src, for, type, href, value , max-length, max, min, pattern
- placeholder, title, alt
- aria-*, role
- required, readonly, disabled

class 是为高可复用组件设计的，所以应处在第一位；
id 更加具体且应该尽量少使用，所以将它放在第二位。

```
<i class="icon icon-menu" id="menu" data-toggle="tooltip" title="菜单"></i>

<input class="form-control" type="text">

<img src="..." alt="...">
```

### 三、CSS

#### 1. 命名

使用减号拼接

```
/* not good */
.head__top{
    color: #ABCDEF;
    background-color: #001122;
}

/* good */
.head-top{
    color: #ABCDEF;
    background-color: #001122;
}

/* not good */
#headTop{
    color: #ABCDEF;
    background-color: #001122;
}

/* good */
#head-top{
    color: #ABCDEF;
    background-color: #001122;
}
```

#### 2. 书写顺序

- 位置属性 (position, top, right, z-index, display, float 等)
- 大小 (width, height, padding, margin)
- 文字系列 (font, line-height, letter-spacing, color- text-align 等)
- 背景 (background, border 等)
- 其他 (animation, transition 等)

#### 3. 颜色简写

颜色16进制用小写字母
颜色16进制尽量用简写

```
/* not good */
.head-top{
    color: #ABCDEF;
    background-color: #001122;
}

/* good */
.head-top{
    color: #abcdef;
    background-color: #012;
}
```

### 四、JavaScript

#### 1. 命名

- 标准变量采用驼峰式命名
- 私有变量必须以“_”开头命名
- 构造函数首字母必须大写
- jQuery 对象必须以 “$” 开头命名

```
/* 基本变量 */
var thisIsMyName;

/* 私有变量 */
var _name = 'Jone';

/* 构造函数 */
function Person(name) {
    this.name = name;
}

/* jQuery对象 */
var $orderBox = $('body') ;
```

#### 2. 引号

最外层统一使用单引号

```
var _name = 'Jone',
    _html = '<div class="one"></div>';
```

#### 3. 注释

- 单行注释

```
if (action === 'set') {
    // 发送信息
    sendMsg();
}
```

- 多行注释

```
/* jQuery对象 */
var $orderBox = $('body') ;
```

- 文档注释

```
/** 
* 一个带参数的函数 
* @param {string}   type - 类型 
* @param {number} time - 毫秒
*/
function foo(type, time) {
    ...
}
```

### 五、SEO优化

SEO（Search Engine Optimization）就是搜索引擎优化，是指为了增加网页在搜索引擎自然搜索结果中的收录数量以及提升排序位置而做的优化行为。

#### 1. HTML标签权重分值排列

- 内部链接文字：10分
- 标题 title：10分
- 域名：7分
- H1，H2字号标题：5分
- 每段首句：5分
- 路径或文件名：4分
- 相似度（关键词堆积）：4分
- 每句开头：1.5分
- 加粗或斜体：1分
- 文本用法（内容）：1分
- title 属性：1分 （注意不是<title>， 是title属性， 比如a href=… title=”）
- alt 标记：0.5分
- Meta 描述（Description 属性）：0.5分
- Meta 关键词（Keywords 属性）：0.05分

#### 2. 优化方法

作为一名前端，我们不需要精通SEO，但我们需要去了解它。如何提升SEO的方法？

- 简化代码结构，更利于搜索引擎分析抓取有用内容

页面尽量采用 DIV+CSS，当然，表格展现模式用 table 还是比 div 方便很多的；所有 js、css 采用外联方式，图片采用 css 精灵，减少请求次数。

- 每个页面只能出现一次H1标签，H2 标签可以多次

    H1 权重很高，普遍认为仅次于 title，一般资讯详情页的标题、商品详情页的标题，都放在 H1 里。

- Meta标签的优化

    Title：突出重点，不出现重复关键字，关键字排前，每个页面的 title 都要不同。
    Description：把页面的内容概括在这里，长度要合理。
    Keywords：列表出几个关键字即可。

- 为图片添加 alt、title 描述

    ```
    <img src="images/logo.png" alt="logo" title="这是一个logo">
    ```

- 避免表格的嵌套

- 采用 web 标准进行网站重构

- FLASH 应用

    FLASH 由于不含文字信息，应尽量用于功能展示和广告，少用于网站栏目和页面。

- 尽少使用 iframe 框架

    搜索引擎不会抓取到 iframe 里的内容，重要内容不要放在框架中。

- 资讯的内部链接

    有助提高网站排名和 PR 值，例如相关资讯、推荐资讯等。
    
### 六、结尾

本规范可能写的不是很完善，如有写的不好或者缺少什么，欢迎提出。
作者：[hwgq2005](https://github.com/hwgq2005)