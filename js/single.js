var app = new Vue({
    el:"#app",
    data: {
        message: "message",
        seen: true,
        store: ""
    },
    methods: {
        done: function(event) {
            console.log(event);
        },
        store: function(event) {
            localStorage.setItem("store", this.store);
        }
    }
});