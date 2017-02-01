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

function loadSvg(target, url) {
	$.ajax({
		type: "GET",
		dataType: "xml",
		url: url,
		success: function(data) {
			console.log(data);
			console.log(data.documentElement);
			$(target).empty().append($(data.documentElement));
		}
	});
}

var hcjapp = new Vue({
    el:"#hcjapp",
    data: {
        
    },
    methods: {
		load: function(event) {
			console.log(event);
			if(event.srcElement.nodeName === 'CODE') {
				console.log(event.srcElement.textContent);
				jQuery.ajax({
					type:"GET",
					dataType:"xml",
					url: event.srcElement.textContent,
					success: function(data) {
						
						jQuery("#document").empty().append($(data).find("main > *"));
						console.log();
					},
					error: function() {

					}
				});
			}
		}
    }
});

var application;
Vue.component("test",{
	template: "<li>test</test>"
});
Vue.component("todo-item",{
	props: ['todo'],
	template: "<li>{{todo.text}}</li>"
});

window.addEventListener("load",function() {
	jQuery("#contents code").each(function(i,code) {
		console.log(i);
		console.log(code);
		console.log(code.parentNode);
		jQuery.ajax({
			type: "GET",
			dataType: "xml",
			url: code.textContent,
			success: function(data) {
				var meta = {
					title: null,
					description: null,
				};
				$(data.documentElement).find("meta[property]").each(function(i,d) {
					console.log(i);
					console.log(d);

					switch(d.getAttribute("property")) {
						case "og:title":
						meta.title = d.getAttribute("content");
						break;
					}
				});
				jQuery(code.parentNode).before('<span>' + meta.title + '</span>',code);
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
				{text:"vuejs"},
				{text:"typescript"},
				{text:"cssframework"}
			],
			stored: "",
			model: "model"
		},
		methods: {
			log: function(e) {
				console.log(e);
			},
			done: function(event) {
            	console.log(event);
        	},
        	store: function(event) {
        		console.log("store");
            	localStorage.setItem("stored", this.stored);
        	},
			reverseMessage: function() {
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