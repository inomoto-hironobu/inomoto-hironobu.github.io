const def = {
    data() {
        return {
            objects:[{id:"test",x:200,y:200}],
            paths:[{id:"test",d:"M20,20 L40,40"}]
        };
    },
    computed:{
        
    },
    mounted() {

    },
    methods:{
        add_object(){},
        add_def(){}
    }
};

let app;

const def2 = {
    data() {
        return {
            xy:{x:0,y:0},
            path:{
                d:""
            }
        };
    },
    computed:{
        
    },
    mounted() {

    },
    methods:{
        add_object(){},
        add_def(){}
    }
}

let vm2;
window.addEventListener('DOMContentLoaded',()=>{
    let app2;
    app = Vue.createApp(def);
    app.mount("#app");
    
    app2 = Vue.createApp(def2);
    vm2 = app2.mount("#app2");

    

    const svg = document.getElementById("t");
    console.log(svg);
    svg.addEventListener("mousemove",e=>{
        vm2.xy.x = e.offsetX;
        vm2.xy.y = e.offsetY;
    });
    svg.addEventListener("click",e=>{
        console.log(this);
        console.log(e);
    });
    svg.addEventListener("mouseover",e=>{
        console.log(e);

    });
    svg.addEventListener("mouseenter",e=>{
        console.log(e);
    });

    console.log('end');
});

