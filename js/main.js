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
	jQuery("#contents code").each(function (i, code) {
		code.setAttribute("v-on:click", "load");
		switch (code) {
			case "":break;
		}
		
	});
	hcjapp = hcjapp();
	jQuery("#contents code").each(function (i, code) {
		code.setAttribute("v-on:click", "load");
		switch (code) {
			case "":break;
		}
		jQuery.ajax({
			type: "GET",
			dataType: "xml",
			url: code.textContent,
			success: function (data) {
				let item = jQuery(code).parent();
				$(data.documentElement).find("meta[property='og:title']").each(function (i, d) {
					item
						.append($('<div>' + d.getAttribute("content") + '</div>'))
						.append($("<div></div>").append(code));
				});
			}
		});
	});
	console.log("test");

});
function hcjapp() {
	let hcjapp = new Vue({
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