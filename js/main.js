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
	
});


