window.addEventListener('DOMContentLoaded', ()=>{
	document
	.querySelectorAll('#osusume li')
	.forEach((li)=>{
		const p = document.createElement('p');
		li.appendChild(p);
		pullMeta(p);
	});
});