<template>
	<section>
<p>Hello World.</p>

<div id="hcj">
<svg id="svg" xmlns="http://www.w3.org/2000/svg" width="800">
    <path>
    	<animate attributeName="d"
             dur="2s"
             to="M0,10 l 50,50 l 7,70z"/>
    	<animate attributeName="d"
             dur="2s"
             to="M0,0 l 10,10 l 33,100z"/>
        <animate attributeName="d"
             repeatCount="indefinite"
             dur="2s"
             to="M50,50 l 10,10 l 33,100z"/>
     </path>
</svg>
</div>
<div id="svgapp">
<div>{{row}}</div>
<input type="text" v-model="row"/><input type="text" v-model="col"/>
<table id="paths" style="border-collapse:collapse">
<thead style="border: solid 3px blue"><tr><th>列</th><th v-for="(dvalue,i) in dvalues"><input v-model="dvalues[i]"/></th></tr></thead>
<tbody style="border: solid 3px red"><tr v-for="(pathd,pi) in pathArr"><td>{{pi}}</td><td v-for="(value,vi) in pathd"><input v-model="pathArr[pi][vi]"/></td></tr></tbody>
</table>
<button v-on:click="table">table</button><button v-on:click="create">create</button><button onclick="save();">save</button><input id="csvload" type="file"/>
<div><button v-on:click="changeTable">列追加</button><button v-on:click="changeTable">列削除</button><button v-on:click="changeTable">行追加</button><button v-on:click="changeTable">行削除</button></div>
</div>
<p><svg id="sample" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
     <circle cx="50" cy="50" r="100" ></circle>
     <path d="M 200,0 200,400 z" stroke="black" stroke-width="1"/>
     <path d="M 0,200 400,200 z" stroke="black" stroke-width="1"/>
     </svg></p>
     <p><img src="files/svg/wireframe.svg" width="400" height="100" /></p>
     <p><object data="files/svg/icon.svg" type="image/svg+xml" width="100" height="100">sample</object></p>
     <p><button onclick="loadXml(this.parentNode,'svg/sample.svg');">xml</button></p>
</section>
</template>
<script>
export default {
	
}
var svgapp;
window.addEventListener("load", function () {
	svgapp = new Vue({
		el:"#svgapp",
		data: {
			pathArr: [
				["11,11","33,33","44,44,55,55","111,111,111,111"],
				["11,11","33,33","4,44,5,55","111,11,111,11"],
				["50,50","10,10","33,100,5,55","4,44,5,55"]
			],
			dvalues:["M","l","c","c"],
			col: 10,
			row: 10,
			file: "",
			currentRoute: window.location.pathname
		},
		methods: {
			inv: function() {
				console.log(this.pathArr);
			},
			create: function() {
				const svgns = "http://www.w3.org/2000/svg";
				var path = jQuery(document.createElementNS(svgns,"path")).attr("stroke","blue");
				var d;
				for(var i = 0;i < this.pathArr.length; i++) {
					var dv = "";
					console.log(this.pathArr);
					for(var j = 0 ;j <this.pathArr[i].length; j++) {
						dv += this.dvalues[j] + this.pathArr[i][j];
					}
					console.log(dv);
					dv += "z";
					
					path.append(jQuery(document.createElementNS(svgns,"animate")).attr("attributeName","d").attr("to",dv).attr("dur","2s").attr("repeatCount","indefinite"));
				}
				console.log(path);
				jQuery("#svg").empty().append(path);
			},
			changeTable: function(e) {
				switch(e.target.textContent) {
				case "列追加":
					this.pathArr.push(this.pathArr[this.pathArr.length - 1]);
					break;
				case "列削除":
					break;
				case "行追加":
					
					break;
				case "行削除":
					this.pathArr.length = this.pathArr.length - 1;
					break;
				}
				console.log(this.pathArr);
			},
			reflect: function() {
			},
			table: function() {
				var dvs = [];
				for(var i = 0; i < this.col; i++) {
					if(!this.dvalues[i]) {
						dvs.push("");
					} else {
						dvs[i] = this.dvalues[i];
					}
				}
				this.dvalues = dvs;
				var arr = [];
				for(var i = 0; i < this.row; i++) {
					var points = []
					
					for(var j = 0; j < this.col; j++) {
						if(Boolean(this.pathArr[i]))
							points.push(this.pathArr[i][j]);
						else
							points.push("");
					}
					arr.push(points);
				}
				this.pathArr = arr;
			},
			file: function(e) {
				console.log(e);
				var reader = new FileReader()
				reader.onload = d => {
					console.log(d);
					console.log(reader.result);
				};
				var t = reader.readAsText(e.target.files[0]);
				console.log(t);
			},
			save: function() {
				
			}
		}
	});
})

jQuery("#csvload").change(e => {
	var reader = new FileReader()
	console.log(e);
	var file = e.target.files[0];
	reader.onload = function() {
	};
	reader.readAsText(file)
});
</script>