var fs = require("fs");
fs.readFile("../src/doc.json",function(err, data) {
	console.log(data);
	var doc = JSON.parse(data);
	console.log(doc);
	//fs.write("data/json/doc.json");
});