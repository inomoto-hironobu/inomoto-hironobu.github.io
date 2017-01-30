var app = new Vue({
    el:"#app",
    data: {
        message: "message",
        seen: true,
        stored: ""
    },
    methods: {
        done: function(event) {
            console.log(event);
        },
        store: function(event) {
        	console.log("store");
            localStorage.setItem("store", this.store);
        }
    }
});