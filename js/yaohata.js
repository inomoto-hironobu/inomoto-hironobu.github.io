ns = {
	'xhtml' : 'http://www.w3.org/1999/xhtml',
	'mathml': 'http://www.w3.org/1998/Math/MathML'
};
const nsResolver = function nsResolver(prefix) {
	return ns[prefix] || null;
};
/**
@param {string} link
@param {Function} consumer
description,modified,textLength
*/
function pullMeta(link, consumer, errorHandler) {
	fetch(link,{
		headers:{
			ContentType:"application/xhtml+xml"
		}
	})
	.then(res=>{
		return res.text();
	})
	.then(d=>{
		const parser = new DOMParser();
  		const data = parser.parseFromString(d, "application/xml");
		console.log(data);
		const info = {
			document:data,
			description:null,
			modified:null,
			contentLength:null,
			title:null
		};
		info.title = data.evaluate('//xhtml:title/text()', data, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		info.description = data.evaluate('//xhtml:meta[@name=\'description\']/@content', data, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		info.modified = data.evaluate('//xhtml:meta[@name=\'modified\']/@content', data, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		const texts = data.evaluate('//xhtml:article//text()', data, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
		let content = '';
		for(let v = texts.iterateNext(); v != null; v = texts.iterateNext()) {
			content = content + v.nodeValue;
		}
		info.contentLength = content.length;
		consumer(info);
	})
	.catch(error=>{
		if(errorHandler){
			errorHandler(error);
		} else {
			console.error(error);
		}
	});
}

class InternalQuote extends HTMLElement {
	constructor(){
		super();
		const path = this.getAttribute("path");
		const target = this.getAttribute("target");
		console.log(path);
		if(path != null && new URL(path, document.location).host == document.location.host) {
			console.log("yes");
		}
		const loading = document.getElementById('loading-template').content.firstElementChild.cloneNode(true);
		
		this.replaceWith(loading);
		
		pullMeta(path,function(info){
			
			const template = document.getElementById('quote-template').content.firstElementChild.cloneNode(true);
			template.querySelector('.target').replaceWith(info.document.getElementById(target));
			const a = template.querySelector('.citation a')
			a.textContent = info.title;
			a.setAttribute('href',path+"#"+target);
			loading.replaceWith(template);
		},function(error){
			let loaderror = document.getElementById('loaderror-template').content.firstElementChild;
			console.error(error);
			loading.replaceWith(loaderror);
		});
	}
}
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

	fetch(document.URL)
	.then((response)=>response.text())
	.then((text) => {
		const contents = new DOMParser().parseFromString(text,'application/xml');
		const modified = contents.evaluate('//xhtml:meta[@name=\'modified\']/@content',contents,nsResolver,XPathResult.STRING_TYPE).stringValue;
		if(modified){
			document
			.querySelector('#modified')
			.replaceWith(document.createTextNode(modified));
		}
	});
});


