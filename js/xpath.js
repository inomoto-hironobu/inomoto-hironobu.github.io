const xpath = function(node, ns) {
	const nsResolver = function nsResolver(prefix) {
	  return ns[prefix] || null;
	};
	const obj = {
		iterate: function(xpath, init, consumer) {
			result = node.evaluate(xpath, node, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
			let r = init;
			for(let v = result.iterateNext(); v != null; v = result.iterateNext()) {
				r = consumer(v, r);
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