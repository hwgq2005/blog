/**
 * 
 * @authors H君
 * @date    2016-01-28 14:16:01
 * @version $Id$
 */

$(function() {
	var searchVal = getQueryString('search'),
		searchC = $('#search-c');
	var post = {
		"list": [{ %
			for post in site.posts %
		} {
			"title": "{{post.title}}",
			"url": "{{site.url}}{{post.url}}",
			"date": "{{ post.date | date: " % Y - % m - % d " }}",
			"author": "{{post.author}}",
			"summary": "{{post.intro}}",
			"images": "{{site.baseurl}}{{post.show_intro}}"
		} { %
			if forloop.last == false %
		}, { % endif %
		} { % endfor %
		}]
	};
	var filterData = _.filter(post.list, function(elem) {
		var tit = elem.title.toLowerCase();
		return tit.match(searchVal.toLowerCase());
	});
	var _html = '';
	// _html='{% for post in site.posts %}<article><p>{{post.title}}</p></article>{% endfor %}';
	if (filterData.length != 0) {
		$.each(filterData, function(index, val) {
			_html += '<article>' + '<div class="post-image">' + '<div class="post-heading">' + '<h3><a  href="' + val.url + '">' + val.title + '</a></h3>' + '</div>' + '<img src="' + val.images + '" alt="' + val.summary + '" />' + '</div>' + '<p>' + val.summary + '</p>' + '<div class="bottom-article">' + '<ul class="meta-post">' + '<li><i class="icon-calendar"></i><a href="#">' + val.date + '</a></li>' + '<li><i class="icon-user"></i><a href="#">' + val.author + '</a></li>' + '</ul>' + '<a href="' + val.url + '"  class="pull-right">Continue reading <i class="icon-angle-right"></i></a>' + '</div>' + '</article>';
		});
	} else {
		_html = '<p style="text-align:center"><img src="/res/img/page/jekyll/open-source.png" style="width:300px;" alt="搜索无结果"></p><p style="text-align:center;margin-top:30px;"><strong style="">暂无结果</strong></p>';
	}
	searchC.html(_html);
})

function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]);
	return null;
}