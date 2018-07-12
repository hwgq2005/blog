---
layout: detail_tmp
title: 解决异步请求多次嵌套问题
intro: 这里有几种方法仅供大家参考。
categories: JavaScript
keyword: 异步请求
author: H君
show_type: image
show_intro: /res/img/page/img13.jpg
tags: [JavaScript]
---


# 解决异步请求多次嵌套问题


`JavaScript`

--- 

    例子1：

    let num = 1;
    function ajax1(){
        getJSON('/data.json1', 'get', '',function(data){
            check();
        });
    }
    function ajax2(){
        getJSON('/data.json2', 'get', '',function(data){
            check();
        });
    }
    function ajax3(){
        getJSON('/data.json3', 'get', '',function(data){
            check();
        });
    }
    function ajax4(){
        getJSON('/data.json4', 'get', '',function(data){
            check();
        });
    }
    ...
    function check(){
       num++;
       eval('ajax'+num)();
    }
    ajax1();

    例子2：

    let promise1 = new Promise(function(resolve, reject) {
      vm.$http.get('/data.json1').then(function (response) {
        if(/**成功**/){
          resolve('success')
        }else{
          reject('error')
        }
      })
    });

    let promise2 = new Promise(function(resolve, reject) {
      vm.$http.get('/data.json2').then(function (response) {
        if(/**成功**/){
          resolve('success')
        }else{
          reject('error')
        }
      })
    });

    Promise.all([promise1, promise2]).then(function(value) {
      // 成功返回值
    }).catch(function(){
      // 报错
    })

    例子3：

    //包装Promise
    function requestA(){
        return new Promise(function(resolve,reject){
            if(/**成功**/){
              resolve('success')
            }else{
              reject('error')
            }
        });
    }

    function requestB(){
        return new Promise(function(resolve,reject){
            if(/**成功**/){
              resolve('success')
            }else{
              reject('error')
            }
        });
    }

    async function request() {
        try{
            const a = await requestA();
            const b = await requestB();
            return [a,b];
        }catch(e){
            console.log(e);
        }
    }
    // 调用
    request().then(function(value){
        console.log(value)
    })

