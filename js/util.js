const ns = {
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
	axios
	.get(link, {responseType:'document'})
	.then(res=>{
		const info = {
			document:res.data,
			description:null,
			modified:null,
			contentLength:null,
			title:null
		};
		info.title = res.data.evaluate('//xhtml:title/text()', res.data, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		info.description = res.data.evaluate('//xhtml:meta[@name=\'description\']/@content', res.data, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		info.modified = res.data.evaluate('//xhtml:meta[@name=\'modified\']/@content', res.data, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		const texts = res.data.evaluate('//xhtml:article//text()', res.data, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
		let content = '';
		for(let v = texts.iterateNext(); v != null; v = texts.iterateNext()) {
			content = content + v.nodeValue;
		}
		info.contentLength = content.length;
		consumer(info);
	})
	.catch(error=>{
		if(errorHandler){
			errorHandler(error.response);
		} else {
			console.error(error);
		}
	});
}
const xpathFacade = function(node, ns) {
	const nsResolver = function nsResolver(prefix) {
	  return ns[prefix] || null;
	};
	const obj = {
		iterate: function(xpath, init, method) {
			result = node.evaluate(xpath, node, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
			let r = init;
			for(let v = result.iterateNext(); v != null; v = result.iterateNext()) {
				r = method(v, r);
			}
			return r;
		},
		single: function(xpath) {
			return node.evaluate(xpath, node, nsResolver, XPathResult.ANY_UNORDERED_NODE_TYPE , null).singleNodeValue;
		},
		string: function(xpath) {
			return node.evaluate(xpath, node, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
		}
	};
	return obj;
};