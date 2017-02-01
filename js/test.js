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
        },
        load: function() {
            jQuery.ajax({
                type: "GET",
                dataType: "xml",
                url: this.html,
                success: function(data) {
                    var v = jQuery(data.documentElement).find("meta");
                    console.log(v);
                },
                error: function(error,e) {
                    console.log(e);
                    console.warn(error);
                }
            });
        }
    }
});