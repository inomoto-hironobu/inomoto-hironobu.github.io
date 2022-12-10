const parser = new DOMParser();

const {createApp} = Vue;

const app = createApp({
    data() {
      return {
        message: 'Hello Vue!',
        xpath:null,
        text:null,
        obj:null,
        appobj:JSON.parse(window.localStorage.getItem("xpathapp")) || [],
        newkey:null,
        itemname:null
      }
    },
    methods:{
        evaluate() {
            switch(this.type){
                case "json":
                    this.obj = JSON.parse(this.text);
                    break;
                case "xml":
                    this.obj = parser.parseFromString(this.text,"application/xml");
                    break;
                case "html":
                    this.obj = parser.parseFromString(this.text,"text/html");
                    break;
                case "string":
                    this.obj = this.text;
                    break;
                case "null":
                    this.obj = null;
                    break;
                default:
                    console.error("error");
            }
            console.log(this.obj);
            dataset = SaxonJS.XPath.evaluate(this.xpath,this.obj);
            console.log(dataset);
        },
        store(){
            this.appobj.push({
                name:this.newkey,
                text:this.text,
                xpath:this.xpath});
            window.localStorage.setItem("xpathapp",JSON.stringify(this.appobj));
            console.log(window.localStorage.getItem("xpathapp"));
        },
        remove(){
            console.log(this.appobj);
            this.appobj = this.appobj.filter((i)=>{
                return i.name && i.name != this.itemname;
            });
            
            console.log(this.appobj);
        },
        pick(){}
    }
  });
window.addEventListener("DOMContentLoaded",(e)=>{
    
    app.mount('#app');
});