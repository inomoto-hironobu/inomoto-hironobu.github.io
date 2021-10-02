window.addEventListener('DOMContentLoaded', ()=>{
	document
	.querySelectorAll('#indexes tr:not(.th)')
	.forEach((tr)=>{
		let td = document.createElement('td');
		tr.appendChild(td);
		pullMeta(td);
	});
});