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
	
	const githubHistoryLink = document
	.createElement('a');
	githubHistoryLink.setAttribute('href','https://github.com/inomoto-hironobu/inomoto-hironobu.github.io/commits/master/'+window.location.pathname);
	githubHistoryLink.setAttribute('target','_blank');
	githubHistoryLink.appendChild(document.createTextNode('ファイルの変更履歴'));
	document
	.getElementById('github-history')
	.appendChild(githubHistoryLink);
	
	document
	.querySelectorAll('main a[href]')
	.forEach((a)=>{
		console.log(a.getAttribute('href'));
		const href = new URL(a.getAttribute('href'),window.location);
		const windoworigin = new URL(window.location).origin;
		if(href.origin === windoworigin) {
			const button = document.createElement('button');
			button.appendChild(document.createTextNode('情報を見る'));
			button.onclick = function() {
				pullMetaAfter(button,a);
				button.style.display = 'none';
			};
			a.parentNode.insertBefore(button, a.nextSibling);
		}		
	});
});


