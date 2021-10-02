const ns = {
	'xhtml' : 'http://www.w3.org/1999/xhtml',
	'mathml': 'http://www.w3.org/1998/Math/MathML'
};
const nsResolver = function nsResolver(prefix) {
	return ns[prefix] || null;
};
function pullMeta(target, id) {
	let parent = target.parentElement;
	const a = document.evaluate('xhtml:*[1]/xhtml:a', parent, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE , null).singleNodeValue;
	console.log(a.getAttribute('href'));
	axios
	.get(a.getAttribute('href'), {responseType:'document'})
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
		target.appendChild(document.createTextNode('【文字数：'+content.length+'】'));
	});
}