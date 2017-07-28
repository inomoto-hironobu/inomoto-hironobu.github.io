/**
 * 
 */

function html() {
	$("#html > textarea").text();
}

function displaySample() {
	var sample = document.getElementById("sample-css");
	var displaySampleElem = document.getElementById("display-sample");
	displaySampleElem.appendChild(document.createTextNode(sample.firstChild.nodeValue));
}
function createImage(target, src) {
	$(target).append('<img src="' + location.href + src + '"' + $(target).textContent + '">');
}
function loadXml(target, url) {
	console.log(target);
	$.ajax({
		type: "GET",
		dataType: "xml",
		url: url,
		success: function (data) {
			console.log(data.documentElement);
			$(target).empty().append($(data.documentElement));
		}
	});
}



var application;
Vue.component("test", {
	template: "<li>test</test>"
});
Vue.component("todo-item", {
	props: ['todo'],
	template: "<li>{{todo.text}}</li>"
});
var hcjapp;
var svgapp;
window.addEventListener("load", function () {
	jQuery.ajax({
		type: "GET",
		dataType: "json",
		url: "data/json/doc.json",
		success: function (data) {
			console.log(data);
			function create(doc, elem) {
				console.log(elem);
				var ul = jQuery('<ul></ul>');
				elem.append(ul);
				for (var i = 0; i < doc.length; i++) {
					var item = doc[i];
					if (item instanceof Array) {
						var li = jQuery('<li>' + i + '</li>');
						ul.append(li);
						create(item, li);
					} else if (item instanceof Object) {
						var li = jQuery('<li></li>');
						var title = data['title'];
						li.text(title);
						li.append($('<div>' + title + '</div>').attr("v-on:click", "load"));
						ul.append(li);
					} else {
						console.log(item);
					}
				}
			}
			create(data, jQuery("#contents"));
			hcjapp = hcjapp();
		},
		error: function (data) {
			console.log(data);
		}
	});
});
function hcjapp() {
	let hcjapp = new Vue({
		el: "#hcjapp",
		data: {

		},
		watch: {},
		computed: {},
		methods: {
			load: function (event) {
				console.log(event);
				if (event.target.nodeName === 'CODE') {
					console.log(event.target.textContent);
					jQuery.ajax({
						type: "GET",
						dataType: "xml",
						url: event.target.textContent,
						success: function (data) {
							var html = $(data);
							jQuery("#document")
								.empty()
								.append($("h1")
									.append(html.find("meta[property='og:title']").attr("content")))
								.append($("p")
									.append(html.find("meta[property='og:description']").attr("content")))
								.append($(data).find("main > *"));
							jQuery("#sidebox").empty().append($(data).find("aside > *"));
						},
						error: function (data) {
							console.warn(data);
						}
					});
				}
			},
			loadMarkdown: function() {
				var target = $("#markdown_content");

                $.ajax({
                    url: target[0].attributes["src"].value,
                }).success(function(data){
                    target.append(marked(data));
                }).error(function(data){
                    target.append("This content failed to load.");
                });

			},
			done: function (event) {
				console.log(event);
			},
			store: function (event) {
				console.log("stored");
				localStorage.setItem("stored", this.stored);
			}
		}
	});
	return hcjapp;
}

function arg(arg) {
	application.message = arg;
}

function ogp() {

}