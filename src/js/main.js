const fs = require("fs");
const jsdom = require("jsdom").jsdom;
const $ = require("jquery");
console.log("test");
fs.readFile("src/doc.json", function (err, data) {
	"use strict";
	console.log(err);
	console.log(data);
	console.log(String(data));
	let doc = JSON.parse(data);
	console.log(doc);
	let cSummary = create(doc);
	console.log(cSummary);
	//fs.write("data/json/doc.json");
});
function create(doc) {
	"use strict";
	console.log(doc);
	let arr = [];
	for (var i = 0; i < doc.length; i++) {
		if (typeof doc[i] === "string") {
			let obj = {};
			obj.url = doc[i];
			let data = fs.readFileSync(doc[i],"utf-8");
			console.log(data.toString());
			var title = $(new JSDOM(data.toString())).filter("title").text();
			obj.title = title;
			arr.push(obj);
			return arr;
		} else if (doc[i] instanceof Array) {
			arr.push(create(doc[i]));
		} else {
			console.log(doc[i]);
		}
	}
	return arr;
}
