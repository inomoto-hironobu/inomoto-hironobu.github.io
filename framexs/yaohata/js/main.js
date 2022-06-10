window.addEventListener('DOMContentLoaded', ()=>{
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
		const a = document.evaluate('xhtml:*[1]/xhtml:a', li, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE , null).singleNodeValue;
		pullMeta(a.getAttribute('href'), function(info) {
			p.appendChild(document.createTextNode(info.description));
			p.appendChild(document.createElement('br'));
			p.appendChild(document.createTextNode('【更新日：'+info.modified+'】'));
			p.appendChild(document.createElement('br'));
			p.appendChild(document.createTextNode('【文字数：'+info.contentLength+'】'));
		},function(error) {
			p.appendChild(document.createTextNode(error));
			console.log(error);
		});
	});
	
	document
	.querySelectorAll('a.preload')
	.forEach((a)=>{
		console.log(a.getAttribute('href'));
		const href = new URL(a.getAttribute('href'),window.location);
		const windoworigin = new URL(window.location).origin;
		if(href.origin === windoworigin) {
			pullMeta(a.getAttribute('href'),function(info) {
				a.parentNode.insertBefore(document.createTextNode('（'+info.description+'【更新日：'+info.modified+'】'+'【文字数：'+info.contentLength+'】）'),a.nextSibling);
			});
			a.parentNode.insertBefore(a, a.nextSibling);
		}		
	});
	
	const githubHistoryElement = document.getElementById('github-history');
	if(githubHistoryElement != null) {
		const githubHistoryLink = document
		.createElement('a');
		githubHistoryLink.setAttribute('href','https://github.com/inomoto-hironobu/inomoto-hironobu.github.io/commits/master/'+window.location.pathname);
		githubHistoryLink.setAttribute('target','_blank');
		githubHistoryLink.appendChild(document.createTextNode('ファイルの変更履歴'));
		githubHistoryElement.appendChild(githubHistoryLink);
	}
	
	document
	.querySelectorAll('*[data-url]')
	.forEach((link)=>{
		const url = link.dataset.url;
		let card = document.getElementById('link-template').content.cloneNode(true);
		pullMeta(url,function(info){
			card.querySelector('.card-title').textContent=info.title;
			card.querySelector('.card-text').textContent=info.description;
			card.querySelector('.card-subtitle').textContent=info.modified+' 更新/'+info.contentLength+' 文字';
			card.querySelector('a').setAttribute('href',url);
			link.replaceWith(card);
		});
	});
	
	/*data-source属性を持つ要素はソースコードを参照する者であるとして、
	所定のソースコードを呼び出し表示する
	*/
	document
	.querySelectorAll('*[data-source]')
	.forEach((link)=>{
		const title = link.dataset.sourceTitle;
		const type = link.dataset.sourceType;
		const url = link.dataset.source;
		let container = document.getElementById('source-template').content.firstElementChild.cloneNode(true);
		axios
		.get(url, {responseType:'text'})
		.then(res=>{
			container.setAttribute('id', title);
			container.querySelector('.caption').textContent=title;
			const code = contianer.querySelector('code');
			code.innerHTML=hljs.highlight(res.data, {language: type}).value;
			link.replaceWith(container);
		});
	});

	document
	.querySelectorAll('*[data-table-setting]')
	.forEach((table)=>{

	});
});


