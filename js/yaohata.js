const x = new XFacade()
.ns({
	'xhtml' : 'http://www.w3.org/1999/xhtml',
	'mathml': 'http://www.w3.org/1998/Math/MathML'
})

window.addEventListener('DOMContentLoaded', ()=>{
	if(window.innerWidth > 750) {
		const result = x.dom(document)
		.uarray("//ul[contains(@class,'collapse')]")
		.forEach((e)=>{
			e.classList.toggle("show");
		});
	}
	
	fetch(document.URL)
	.then((response)=>response.text())
	.then((text) => {
		const contents = new DOMParser().parseFromString(text,'application/xml');
		console.log(x);
		const modified = x.dom(contents).text('//xhtml:meta[@name=\'created\']/@content');;
		if(modified){
			document
			.querySelector('#created')
			.replaceWith(document.createTextNode(modified));
		}
	});
});


