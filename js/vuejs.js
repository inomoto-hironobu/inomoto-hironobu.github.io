/**
 * 
 */
var application;
Vue.component("test",{
	template: "<li>test</test>"
});
Vue.component("todo-item",{
	props: ['todo'],
	template: "<li>{{todo.text}}</li>"
});
window.addEventListener("load",function() {
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
			model: "model"
		},
		methods: {
			log: function(e) {
				console.log(e);
			},
			reverseMessage: function() {
				console.log(e);
				this.message = this.message.split("").reverse().join("");
			}
		},
		watch: {},
		compute: {}
	});
});

function arg(arg) {
	application.message = arg;
}