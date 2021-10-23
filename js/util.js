const ns = {
	'xhtml' : 'http://www.w3.org/1999/xhtml',
	'mathml': 'http://www.w3.org/1998/Math/MathML'
};
const nsResolver = function nsResolver(prefix) {
	return ns[prefix] || null;
};
/**
	target
*/
function pullMeta(target) {
	let parent = target.parentElement;
	const a = document.evaluate('xhtml:*[1]/xhtml:a', parent, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE , null).singleNodeValue;
	pullMetaWith(target, a);
}
/**
	target
*/
function pullMetaWith(target,link) {
	axios
	.get(link.getAttribute('href'), {responseType:'document'})
	.then((res)=>{
		const description = res.data.evaluate('//xhtml:meta[@name=\'description\']/@content', res.data, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		target.appendChild(document.createTextNode(description));
		target.appendChild(document.createElement('br'));
		const modified = '【更新日：'+res.data.evaluate('//xhtml:meta[@name=\'modified\']/@content', res.data, nsResolver, XPathResult.STRING_TYPE , null).stringValue+'】';
		target.appendChild(document.createTextNode(modified));
		const texts = res.data.evaluate('//xhtml:article//text()', res.data, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
		let content = '';
		for(let v = texts.iterateNext(); v != null; v = texts.iterateNext()) {
			content = content + v.nodeValue;
		}
		target.appendChild(document.createElement('br'));
		target.appendChild(document.createTextNode('【文字数：'+content.length+'】'));
	});
}
function pullMetaAfter(target,link) {
	axios
	.get(link.getAttribute('href'), {responseType:'document'})
	.then((res)=>{
		const description = res.data.evaluate('//xhtml:meta[@name=\'description\']/@content', res.data, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		const modified = '【更新日：'+res.data.evaluate('//xhtml:meta[@name=\'modified\']/@content', res.data, nsResolver, XPathResult.STRING_TYPE , null).stringValue+'】';
		const texts = res.data.evaluate('//xhtml:article//text()', res.data, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
		let content = '';
		for(let v = texts.iterateNext(); v != null; v = texts.iterateNext()) {
			content = content + v.nodeValue;
		}
		const textsize = '【文字数：'+content.length+'】';
		target.parentNode.insertBefore(document.createTextNode('('+description+modified+textsize+')'),target.nextSibling);
	});
}
