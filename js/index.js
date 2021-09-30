window.addEventListener('load', ()=>{
	document
	.querySelectorAll('#indexes tr:not(.th)')
	.forEach((tr)=>{
		let td = document.createElement('td');
		tr.appendChild(td);
		pullMetaFromTableData(td);
	});
});
const ns = {
	'xhtml' : 'http://www.w3.org/1999/xhtml',
	'mathml': 'http://www.w3.org/1998/Math/MathML'
};
const nsResolver = function nsResolver(prefix) {
	return ns[prefix] || null;
};
function pullMetaFromTableData(td) {
	let tr = td.parentElement;
	let a = tr.querySelector('td:first-child a');
	axios
	.get(a.getAttribute('href'), {responseType:'document'})
	.then((res)=>{
		const x = xpath(res.data,{
			'xhtml' : 'http://www.w3.org/1999/xhtml',
			'mathml': 'http://www.w3.org/1998/Math/MathML'
		});
		const description = res.data.evaluate('//xhtml:meta[@name=\'description\']/@content', res.data, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		td.appendChild(document.createTextNode(description));
		td.appendChild(document.createElement('br'));
		const modified = '【更新日：'+res.data.evaluate('//xhtml:meta[@name=\'modified\']/@content', res.data, nsResolver, XPathResult.STRING_TYPE , null).stringValue+'】';
		td.appendChild(document.createTextNode(modified));
		let content = x.iterate('//xhtml:article//text()', '', (v,r)=>{
			r += v.nodeValue;
			return r;
		});
		td.appendChild(document.createTextNode('【文字数：'+content.length+'】'));
	});
}
function pull(e) {
	let td = e.parentElement;
	td.removeChild(e);
	let tr = td
	.parentNode;
	let a = tr.querySelector('td:first-child a');
	axios
	.get(a.getAttribute('href'), {responseType:'document'})
	.then((res)=>{
		const x = xpath(res.data,{
			'xhtml' : 'http://www.w3.org/1999/xhtml',
			'mathml': 'http://www.w3.org/1998/Math/MathML'
		});
		td.appendChild(document.createTextNode(x.string('//xhtml:meta[@name=\'description\']/@content')));
		td.appendChild(document.createElement('br'));
		td.appendChild(document.createTextNode('【更新日：'+x.string('//xhtml:meta[@name=\'modified\']/@content')+'】'));
		let text = x.iterate('//xhtml:article//text()', '', (v,r)=>{
			r += v.nodeValue;
			return r;
		});
		td.appendChild(document.createTextNode('【文字数：'+text.length+'】'));
	});
}
function pullAll(e) {
	e.parentElement.removeChild(e);
	document
	.querySelectorAll('#indexes tr:not(.th)')
	.forEach((tr)=>{
		let button = tr.querySelector('td button');
		if(button) {
			pull(button);
		}
	});
}