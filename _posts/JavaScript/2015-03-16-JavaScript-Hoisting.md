---
layout: detail_tmp
title: JavaScript 声明提升
intro: JavaScript 声明提升(hoisting) 很容易忽略从而造成Bug
categories: JavaScript
keyword: JavaScript变量提升,JavaScript函数提升,JavaScript常见问题
author: li
show_type: image
show_intro: /res/img/page/JavaScript/JavaScript-hoisting.png
tags: [JavaScript]
---

#JavaScript 变量提升# 

>JavaScript Hoisting

--- 
>JavaScript 的历史原因决定JavaScript有许多问题，和让人容易忽略的地方。但都是重要的。

###1.  var 声明变量###

#### 声明提升(hoisting) ####
	
先看一段代码

	var v = 'hoisting';
	function test_hoisting(){
		console.log(v);
		var v = 'hoisted';
	}

结果是什么呢：`undefined`.
因为 `声明提升`的原因 以上代码 和下面的代码 同理。
	
	var v = 'hoisting';
	function test_hoisting(){
		var v;
		console.log(v);
		v = 'hoisted';
	}

function作用域里的变量 遮盖了上层作用域变量，声明又被提升 所以就会出现`undefined`

> `声明提升`:是JavaScript 所有声明默认的行为（包括`function`） 提升的范围就是当前作用域的顶部。
 JavaScript 只是提升声明，并不提升初始化。 

 再看下面的代码：

	
	
	
	var test_hoisting2 = 3;

	function test_hoisting2(){

	}
	console.log(typeof test_hoisting2);

结果是 `number`为什么？

之前说过`function` 也会提升。由于在 `JavaScript`中 `function`是一等公民，`function` 会先提升. 
**函数的声明 比 变量的声明 具有高的优先级。** 
所以 `function test_hoisting2` 优先提升，被 `var test_hoisting2`覆盖。

>关于变量提升的问题都大同小异，在实际开发中要避免这个特性，把变量定义在顶部。就会避免出现不必要的问题。  

在 Chrome 里有个奇怪的问题：

	console.log(typeof name);
	var name = "Chrome";
	console.log(typeof name); 

经过上面示例，我们期待的结果是 `undefined` `string`. 但是结果却都是 `string`.如果我们再试一次，将`name`换成 其他的 `name2` 就是我们预期的结果了.原因是 
**Chrome**
可能初始化 `name` 导致我们使用时，已经声明完成，所以就是`string`了  

----

###2. 关于函数提升###

	console.log(typeof foo);
	console.log(typeof bar);
	console.log(typeof add);
	//函数的声明
    function foo(){
        alert('foo');
    }
    //命名函数表达式
    var bar = function(){
        alert('bar');
    };
    // 函数表达式-匿名函数
    var add = function(a,b){
    return a+b;
	};

结果是`function` `undefined` `undefined` 因为 `foo()`是根据`function`提升的。
`foo()`被提升到了顶部且能正常运行，而bar()的定义并没有得到提升，
仅有它的声明被提升，所以，当执行bar()的时候显示结果为undefined而不是作为函数来使用。

----

一个方法总结声明`提升`

    var global = 'global';
    function foo(){alert(global);}

    function hoist(){
        console.log(typeof foo);//function
        console.log(typeof bar);//undefined
        console.log(typeof global);//undefined

        foo();//'undefined' global仅提升声明，并未提升初始化。
        bar();//TypeError: 'undefined' is not a function  
        var global = 'local';
        //变量foo以及实现者被提升
        function foo(){
            console.log(global);
        }

        //仅变量bar被提升，函数实现部分 并未被提升
        var bar = function(){
            alert(global);
        };
    }

    hoist(); 
