---
layout: detail_tmp
title: JavaScript常用函数集合
intro: 以下是个人收藏及个人编写的代码，仅供大家参考。
categories: JavaScript
keyword: JavaScript常用函数
author: H君
show_type: image
show_intro: /res/img/page/img12.jpg
tags: [JavaScript]
---


# JavaScript常用函数集合


`JavaScript`

--- 

> 以下是个人收藏及个人编写的代码，仅供大家参考：

    /**
     * 获取url参数值
     * @param  {string} name [参数名称]
     */
    function getQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.slice(1).match(reg);
        return r != null ? unescape(r[2]) : null;
    }

    /**
     * 匹配终端
     */
    function browser() {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    /**
     * cookies操作 
     */
    var cookies = {
        //设置cookies
        set: function(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else var expires = "";
            document.cookie = name + "=" + value + expires + "; path=/";
        },

        //获取cookies
        get: function(name) {
            var nameEQ = name + "=";
            var ca = document.cookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
            }
            return null;
        },

        //清除cookies
        erase: function(name) {
            this.set(name, "", -1);
        }
    }

    /**
     * 获取屏幕横屏、竖屏
     */
    function orient() {
        var orientation;
        if (window.orientation == 90 || window.orientation == -90) {
            //ipad、iphone竖屏；Andriod横屏
            orientation = 'landscape';
        } else if (window.orientation == 0 || window.orientation == 180) {
            //ipad、iphone横屏；Andriod竖屏
            orientation = 'portrait';
        }
        return orientation;
    }


    /**
     * 合并对象
     */
    function extend(to, from) {
        for (var key in from) {
            to[key] = from[key];
        }
        return to;
    }

    /**
     *  判断是否存在class
     */
    function hasClass(obj, cls) {
        return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    }

    /**
     *  添加class
     */
    function addClass(obj, cls) {
        if (!hasClass(obj, cls)) obj.className += " " + cls;
    }

    /**
     *  移除class
     */
    function removeClass(obj, cls) {
        if (hasClass(obj, cls)) {
            var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            obj.className = obj.className.replace(reg, ' ');
        }
    }

    /**
     *  获取兄弟元素
     */
    function sibling(elem) {
        var obj = [],
            elemArr = elem.parentNode.children;

        for (var i = 0; i < elemArr.length; i++) {
            if (elemArr[i] != elem) {
                obj.push(elemArr[i]);
            }
        }
        return obj;
    }

    /**
     *  获取前一个兄弟节点
     */
    function prevSibling(node) {
        var tempFirst = node.parentNode.firstChild;
        if (node == tempFirst) return null;
        var tempObj = node.previousSibling;
        while (tempObj.nodeType != 1 && tempObj.previousSibling != null) {
            tempObj = tempObj.previousSibling;
        }
        return (tempObj.nodeType == 1) ? tempObj : null;
    }

    /**
     *  获取下一个兄弟节点
     */
    function nextSibling(node) {
        var tempLast = node.parentNode.lastChild;
        if (node == tempLast) return null;
        var tempObj = node.nextSibling;
        while (tempObj.nodeType != 1 && tempObj.nextSibling != null) {
            tempObj = tempObj.nextSibling;
        }
        return (tempObj.nodeType == 1) ? tempObj : null;
    }

    /**
     * 滚动加载数据
     * @param  {[string]}  distance  [底部距离]
     * @param  {[number]}  thisPage  [当前页]
     * @param  {[number]}  totalPage [总页数]
     * @param  {[Boolean]} isLoad    [是否加载完成]
     */
    function distanceScroll(distance, thisPage, totalPage, isLoad) {
        var scrollTop = document.body.scrollTop,
            docHeight = document.body.clientHeight,
            screenHeight = window.screen.availHeight;
        differ = scrollTop > docHeight - screenHeight - distance;
        if (differ && isLoad && thisPage <= totalPage) {
            isLoad = !isLoad;
            vm.getList(thisPage);
        }
    }

    /**
     * 格式化金额
     * @param  {[number]}  number  [要格式化的数字]
     * @param  {[number]}  decimals  [保留几位小数]
     * @param  {[string]}  dec_point [小数点符号]
     * @param  {[string]} thousands_sep    [千分位符号]
     */
    function numberFormat(number, decimals, dec_point, thousands_sep) {

        number = (number + '').replace(/[^0-9+-Ee.]/g, '');
        var n = !isFinite(+number) ? 0 : +number,
            prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
            sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
            dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
            s = '',
            toFixedFix = function(n, prec) {
                var k = Math.pow(10, prec);
                return '' + Math.ceil(n * k) / k;
            };

        s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
        var re = /(-?\d+)(\d{3})/;
        while (re.test(s[0])) {
            s[0] = s[0].replace(re, "$1" + sep + "$2");
        }

        if ((s[1] || '').length < prec) {
            s[1] = s[1] || '';
            s[1] += new Array(prec - s[1].length + 1).join('0');
        }
        return s.join(dec);
    }


    /**
     * 判断是否为微信内核
     */
    function isWeiXin() {
        var ua = window.navigator.userAgent.toLowerCase()
        ua.match(/MicroMessenger/i) == 'micromessenger' ?
            return true: return false
    }

    /**
     * 倒计时
     * @param  {[number]}  count  [秒数]
     * @param  {[string]}  fmtStr  [倒计时文字]
     * @param  {[string]}  endStr [结束后文字]
     * countDown(60, '#{count} s', '重新获取')
     */
    function countDown(count, fmtStr, endStr) {

        var _self = this,
            _count = count || 60,
            _fmtStr = fmtStr || '#{count}s',
            _endStr = endStr || '获取验证码',
            _interval = null;
        var currentTarget = event.currentTarget;
        currentTarget.innerHTML = _fmtStr.replace('#{count}', _count);
        _interval = setInterval(function() {
            _count--;
            if (_count == 0) {
                currentTarget.innerHTML = _endStr;
                currentTarget.classList.remove('disabled');
                clearInterval(_interval);
            } else {
                currentTarget.innerHTML = _fmtStr.replace('#{count}', _count);
            }
        }, 1000);
    }
