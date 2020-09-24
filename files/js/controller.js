window.addEventListener('DOMContentLoaded', function() {
	
});
/**
 * 
 * @param {Node} target 
 * @param {*} value 
 */
function arialabel(target) {
	function exec(tabpanel) {
		var tab = document.getElementById(tabpanel.getAttribute('aria-labelledby'));
		applyDescendants(
			tabpanel.parentNode
			, function(node, v) {
				console.log(v.i + node);
				return v.i === 0 && node.nodeType === Node.ELEMENT_NODE && node.getAttribute('role') === 'tabpanel';
			}, function(tpchild, v) {
				console.log(v.i++ + tpchild);
				var jquery = $(tpchild);
				if(jquery.hasClass('active') || tabpanel === tpchild) {
					jquery.toggleClass('active');
				}
				if(jquery.hasClass('show') || tabpanel === tpchild) {
					jquery.toggleClass('show');
				}
				return v;
			}, {i:0}
		);
		return tab;
	}
	if(target.getAttribute('role') === 'tabpanel') {
		return exec(target, 0);
	} else {
		return applyAncestor(
			target
			, function(node) {
				return node.getAttribute('role') === 'tabpanel';
			}, function(tabpanel) {
				return exec(tabpanel);
			},
			null);
	}
    
}
function checkid(e) {
	return decodeURI(location.hash.substring(1)) == $(e).attr('id');
}