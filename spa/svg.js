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
				switch(e.srcElement.textContent) {
				case "列追加":
					this.pathArr.push(this.pathArr[this.pathArr.length - 1]);
					break;
				case "列削除":
					break;
				case "行追加":
					break;
				case "行削除":
					break;
				}
				console.log(e);
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