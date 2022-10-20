class xFacade {
	constructor(node, ns) {
		this.node = node;
		this.nsResolver = function nsResolver(prefix) {
			return ns[prefix] || null;
		};
	}
    each(callback) {

    }
    path(xpath) {
        node.evaluate(xpath, node, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
        return this;
    }
	iterate(xpath) {
		result = node.evaluate(xpath, node, nsResolver, XPathResult.UNORDERED_NODE_ITERATOR_TYPE , null);
		let r = init;
		for(let v = result.iterateNext(); v != null; v = result.iterateNext()) {
			r = method(v, r);
		}
		return this;
	}
	single(xpath) {
		return node.evaluate(xpath, node, nsResolver, XPathResult.ANY_UNORDERED_NODE_TYPE , null).singleNodeValue;
	}
	string(xpath) {
		return node.evaluate(xpath, node, nsResolver, XPathResult.STRING_TYPE , null).stringValue;
	}
}