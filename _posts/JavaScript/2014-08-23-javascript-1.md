---
layout: detail_tmp
title: 如何高效获取尾部字符串
intro: 高效获取尾部字符串
categories: JavaScript
keyword: JavaScript,高效获取尾部字符串
author: H君
show_type: image
show_intro: /res/img/page/img1.jpg
tags: [JavaScript]
---

#如何高效获取尾部字符串# 

`JavaScript`

--- 

![git,github](../res/img/page/img1.jpg)

这个比较简单，直接上代码吧：

    <script type="text/javascript">
        var getType=function(fileName){
                return fileName.split(".").pop();
            }

        //例1
        var fileName1 = "photo.jpg";
        var getType1 = getType(fileName1);  // 获取值 jpg   
        alert(getType1);

        //例2
        var fileName2 = "main.js";
        var getType2 = getType(fileName2);   // 获取值 js
        alert(getType2);
    </script>
