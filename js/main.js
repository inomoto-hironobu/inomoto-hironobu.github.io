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
	$(target).append('<img src="' + location.href + src + '"' + $(target).textContent+'">');
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

window.addEventListener("load", function () {
	
	var hcjapp = new Vue({
		el: "#hcjapp",
		data: {

		},
		methods: {
			load: function (event) {
				console.log(event);
				if (event.srcElement.nodeName === 'CODE') {
					console.log(event.srcElement.textContent);
					jQuery.ajax({
						type: "GET",
						dataType: "xml",
						url: event.srcElement.textContent,
						success: function (data) {
							jQuery("#document").empty().append($(data).find("main > *"));
							jQuery("#sidebox").empty().append($(data).find("aside > *"));
						},
						error: function (data) {
							console.warn(data);
						}
					});
				}
			}
		}
	});
	jQuery("#contents code").each(function (i, code) {
		jQuery.ajax({
			type: "GET",
			dataType: "xml",
			url: code.textContent,
			success: function (data) {
				var meta = {
					title: null,
					description: null,
				};
				$(data.documentElement).find("meta[property]").each(function (i, d) {
					switch (d.getAttribute("property")) {
						case "og:title":
							meta.title = d.getAttribute("content");
							break;
						case "og:description":
							meta.description = d.getAttribute("content");
					}
				});
				jQuery(code.parentNode).before('<span>' + meta.title + " : " + meta.description + '</span>', code);
			}
		});
	});
});

function newApp() {
	application = new Vue({
		el: "#app",
		data: {
			message: "message",
			seen: true,
			todos: [
				{ text: "vuejs" },
				{ text: "typescript" },
				{ text: "cssframework" }
			],
			stored: "",
			model: "model"
		},
		methods: {
			log: function (e) {
				console.log(e);
			},
			done: function (event) {
				console.log(event);
			},
			store: function (event) {
				console.log("store");
				localStorage.setItem("stored", this.stored);
			},
			reverseMessage: function () {
				console.log(e);
				this.message = this.message.split("").reverse().join("");
			}
		},
		watch: {},
		compute: {}
	});
}
function arg(arg) {
	application.message = arg;
}
function ogp() {

}