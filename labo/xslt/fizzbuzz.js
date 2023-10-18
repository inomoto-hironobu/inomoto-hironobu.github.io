window.addEventListener("load", function() {
	console.log(xpath);
	const options = {
		stylesheetLocation: sefbase + arg.sef,
		//template要素はからのためcontentプロパティでDocumentFragmentを取得する
		sourceNode: template,
		stylesheetParams: arg.params,
		destination: "document"
	};
	SaxonJS.transform(options, "async")
	.then(d => {
		
	});
	console.log(dataset);
});
