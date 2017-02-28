var app;
window.addEventListener("load", function() {
	jQuery("#namespace").text(document.documentElement.namespaceURI);
	console.log(document);
	if(jQuery("#innerHTML").get()[0].hasOwnProperty("innerHTML")) {
		console.log("innerHTML");
	}
	
	jQuery("#no-namespace-svg-namespace").text(jQuery("#no-namespace-svg").get()[0].namespaceURI);
	jQuery("#having-namespace-svg-namespace").text(jQuery("#having-namespace-svg").get()[0].namespaceURI);
	
	var s = jQuery("#having-namespace-svg").get()[0].namespaceURI;
	console.log(jQuery("#having-namespace-svg").get()[0].namespaceURI);
});
