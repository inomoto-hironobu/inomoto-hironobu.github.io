var app = new Vue({
    el:"#app",
    data: {
        message: "message",
        seen: true,
        stored: localStorage.getItem("stored"),
        html: ""
    },
    methods: {
        done: function(event) {
            console.log(event);
        },
        store: function(event) {
        	console.log("stored");
            localStorage.setItem("stored", this.stored);
        }
    }
});