---
layout: detail_tmp
title: RequireJS构建Angular项目。
intro: 以往经验来看，学习一门新的语言总少不了到处谷哥和度娘，大多零碎散乱，正是要开始构建一个项目时往往不知道从哪着手，所以规范化的开始建立第一个项目尤为重要，它能成为你的一个起点，从而避免让自己处于十字路口徒手抓脑的尴尬。
categories: Front-end development
keyword: angualr require 前端
author: EthanOrange
show_type: image
show_intro: /res/img/slides/angular-require.jpg
---


## RequireJS构建Angular项目 ##

使用angular也有一段时间了，空闲时间写篇总结，就当温故知新。

### How to start ###

以往经验来看，学习一门新的语言总少不了到处谷哥和度娘，大多零碎散乱，正是要开始构建一个项目时往往不知道从哪着手，所以规范化的开始建立第一个项目尤为重要，它能成为你的一个起点，从而避免让自己处于十字路口徒手抓脑的尴尬。

本篇文章主要侧重如何用requireJS构建Angular项目，所以关于angular的细节可能不太会深入，下面附上angularJS&requireJS官方文档。

	angularJS
    http://www.ngnice.com/
	requireJS
	http://requirejs.org/
	
### Step-1 ###
方便理解，通过配置AngularJS官方的Angular-RequireJS-Seed实例来构建第一个require&angular的项目:
	
	下载种子文件
	git clone https://github.com/tnajdek/angular-requirejs-seed.git

文件列表

	app/                    
	  app.css               
	  components/           
	    version/              
	      version.js                
	      version_test.js           
	      version-directive.js       
	      version-directive_test.js  
	      interpolate-filter.js      
	      interpolate-filter_test.js 
	  view1/               
	    view1.html            
	    view1.js              
	    view1_test.js         
	  view2/                
	    view2.html          
	    view2.js            
	    view2_test.js       
	  app.js                
	  index.html            
	  index-async.html      
	karma.conf.js       
	e2e-tests/            
	  protractor-conf.js    
	  scenarios.js          

安装相关依赖

	npm install

### Step-2 ###

安装完成之后，会增加一个依赖库文件和一个require-config.js，也就是一般应用的main.js——requireJS配置文件。

首先，RequireJS将会加载这份require-config.js，然后这份文件将会触发加工其他所有依赖的东西。

	/**
	 * 定义RequireJS配置
	*/
	require.config({
		paths: {
			angular: 'bower_components/angular/angular',
			angularRoute: 'bower_components/angular-route/angular-route',
			angularMocks: 'bower_components/angular-mocks/angular-mocks',
			text: 'bower_components/requirejs-text/text'
		},
		shim: {
			'angular' : {'exports' : 'angular'},
			'angularRoute': ['angular'],
			'angularMocks': {
				deps:['angular'],
				'exports':'angular.mock'
			}
		},
		priority: [
			"angular"
		],
		deps: window.__karma__ ? allTestFiles : [],
		callback: window.__karma__ ? window.__karma__.start : null,
		baseUrl: window.__karma__ ? '/base/app' : '',
	});
	
	//依赖 angular.js 和 app.js 模块
	require([
		'angular',
		'app'
		], function(angular, app) {
			var $html = angular.element(document.getElementsByTagName('html')[0]);
			angular.element().ready(function() {
				//注意：这不是Twitter Bootstrap，而是AngularJS bootstrap；
				//当DOM结构加载完成后，bootstrap方法将会命令AngularJS启动起来并继续执行
				angular.bootstrap(document, ['myApp']);
			});
		}
	);



然后定义一个app.js文件。这个文件定义了AngularJS应用，并且告诉它去依赖我们所定义的所有控制器、服务、过滤器及指令。

**注意：**对于每个控制器、服务、过滤器及指令，都有一个模块与之对应，因此，只要把这些模块定义成我们所依赖的东西就够了。

文件列表中app.js代码:

	//app依赖于define([xxxx]相关模块
	define([
		'angular',
		'angularRoute',
		'view1/view1',
		'view2/view2'
	], function(angular, angularRoute, view1, view2) {
		//通过依赖 app返回了一个angularModul----myApp, myApp又依赖于angular的相关服务和模块，此例就是ngRoute myApp.view...
		return angular.module('myApp', [
			'ngRoute',
			'myApp.view1',
			'myApp.view2'
		]).
		//angular module的相关配置以及依赖
		config(['$routeProvider', function($routeProvider) {
			$routeProvider.otherwise({redirectTo: '/view1'});
		}]);
	});


 我们组织RequireJS依赖关系的方式会保证在Angular所依赖的内容加载并准备好之后，所有的东西才会运行。
 controllers/xx.js services/xxx.js里面都会定义一个AngularJS模块，并且对于每一个单独的控制器、指令、过滤器及服务，在声明的时候都会添加对应的模块依赖。

就像这样 xx.js

	define([
	'./my-ctrl-1',
	'./my-ctrl-2'
	], function () {});


你不需要define干了什么，只要理解 xx这个模块依赖于./my-ctrl-1和./my-ctrl-2这两个模块就行，至于怎么将它的对象传递过来,怎么找到的，requireJS自己会处理，这和angular和相似（angulr本身模块化程度就很高了）：

	angular.module('myApp', [  
	  'ngRoute',  
	]); 

例如这里的ngRoute,我需要知道ngRoute怎么来的,在哪里.只要有一个模块定义为ngRoute我就可以直接拿来用。

### Step-3 ###

再进一步看一下控制器和指令的定义：

version/version.js version/version-directive.js

	//version.js
	define(['angular', 'components/version/version-directive', 'components/version/interpolate-filter'],
	function(angular, versionDirective, interpolateFilter) {
		angular.module('myApp.version', [
		  'myApp.version.interpolate-filter',
		  'myApp.version.version-directive'
		])
		.value('version', '0.3');
	});

	//version-directive.js
	define(['angular', 'components/version/version-directive', 'components/version/interpolate-filter'],
	function(angular, versionDirective, interpolateFilter) {
		angular.module('myApp.version', [
		  'myApp.version.interpolate-filter',
		  'myApp.version.version-directive'
		])
		.value('version', '0.3');
	});


这些代码本身看着很繁琐，但是我们还是来仔细看一下正在发生什么事情：

RequireJS将会在文件两端添加一些东西，这些东西会说我的version.js文件会依赖模块声明文件version-directive.js。

然后这份文件就会使用插入了指令的模块去添加自已的指令声明。

**注意：**如果你有一个控制器，且这个控制器会从一个后台服务中拉取数据（例如RootConroller依赖于UserService，它被注入了UserService），这种情况下，你就必须确保在RequireJS中也定义了服务文件的依赖，示例如下：

	define(['controllers/controllers', 'services/services'], function(controllers) {
		 controllers.controller('RootController', ['$scope', 'UserService',
			 function($scope, UserService) {
			//做需要做的事情
			};
		}]);
	});

### Overview ###

在搭建项目开始首先遇到的一个问题,就是到底要不要引入requirejs或者seajs这类依赖管理的工具?

对于我来讲不管是requirejs的AMD还是seajs的CMD,从实现的角度上来讲都是做了同一个工作.在考虑一个Angular应用到底需不需要这种工具的时候,我也在网上看了很多人的说法.我总结一句就是,基本都和没说一样,也就是用不用随便,看情况.

那么我能有什么好的答案,其实我现在的答案就是:"可以不用".怎么说是可以不用呢,如果你不用requirejs也能满足项目的开发以及各种需求,那么就别用了.angular本身的模块已经做到了依赖注入,所以我们不需要通过requirejs进行异步加载也可以很好的用下去.

当然,如果你开发过程中发觉还是有些地方需要,那么也可以加上去.但是这里我的观点已经表明了:在不需要的情况下,不要用，单纯为了练习当然越多越好，毕竟经验才能摸索出合适的方向。
