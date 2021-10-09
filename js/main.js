window.addEventListener('DOMContentLoaded', ()=>{
	console.log(window);
	if(window.innerWidth > 750) {
		
		document
		.querySelectorAll('aside details')
		.forEach((details)=>{
			details.setAttribute('open', '');
		});
	}
	document
	.querySelectorAll('.article-list li')
	.forEach((li)=>{
		const p = document.createElement('p');
		li.appendChild(p);
		pullMeta(p);
	});

});