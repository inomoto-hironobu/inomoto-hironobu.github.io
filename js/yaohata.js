window.addEventListener('DOMContentLoaded', ()=>{
	if(window.innerWidth > 750) {
		const r = SaxonJS.XPath.evaluate("//ul[contains(@class,'collapse')]",document,{
			xpathDefaultNamespace:"http://www.w3.org/1999/xhtml",
			resultForm:"array"
		}).forEach((e)=>{
			e.classList.toggle("show");
		});
	}
	
	fetch(document.URL)
	.then((response)=>response.text())
	.then((text) => {
		const contents = new DOMParser().parseFromString(text,'application/xml');
		SaxonJS.XPath.evaluate('//meta[@name=\'created\']/@content',document,{
			xpathDefaultNamespace:"http://www.w3.org/1999/xhtml",
			resultForm:"array"
		}).forEach((e)=>{
			document
			.querySelector('#created')
			.replaceWith(document.createTextNode(e));
		});
	});
});


