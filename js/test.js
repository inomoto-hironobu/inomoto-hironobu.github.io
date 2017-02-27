
moment = require("./moment.js");

var now = moment();
console.log(now.unix());
console.log(now.unix() < now.add(1,"hours").unix());