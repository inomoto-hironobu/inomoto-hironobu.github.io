const parser = new DOMParser();
let dom;
window.addEventListener("DOMContentLoaded",(e)=>{

    document.getElementById("toggle").addEventListener("click",(e)=>{
        document
        .querySelectorAll(".test")
        .forEach((e)=>{
            e
            .classList
            .toggle("active");
        });
    });
    document.getElementById("fetch").addEventListener("click",(e)=>{
        const val = document.getElementById("file").value;
        fetch(val)
        .then((response)=>response.text())
        .then((data)=>{
            const type = document.getElementById("type").value;
            dom = parser.parseFromString(data,type);
        });
    });
    
});