window.addEventListener('DOMContentLoaded', ()=>{
	document
	.querySelectorAll('#indexes tr:not(.th)')
	.forEach((tr)=>{
		let td = document.createElement('td');
		tr.appendChild(td);
		const a = document.evaluate('xhtml:*[1]/xhtml:a', tr, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE , null).singleNodeValue;
		pullMeta(a, function(info) {
			td.appendChild(document.createTextNode(info.description));
			td.appendChild(document.createElement('br'));
			td.appendChild(document.createTextNode('【更新日：'+info.modified+'】'));
			td.appendChild(document.createElement('br'));
			td.appendChild(document.createTextNode('【文字数：'+info.contentLength+'】'));
			const pageTypeResult = info.document.evaluate('/xhtml:html/xhtml:head/xhtml:meta[@name=\'pagetype\']/@content', info.document, nsResolver, XPathResult.FIRST_ORDERED_NODE_TYPE , null);
			console.log(pageTypeResult);
			if(pageTypeResult.singleNodeValue !== null && pageTypeResult.singleNodeValue.nodeValue === 'index') {
				const indexesCount = info.document.evaluate('count(//xhtml:table[@id=\'indexes\']/xhtml:tr)', info.document, nsResolver, XPathResult.NUMBER_TYPE , null).numberValue;
				console.log(indexesCount);
				td.appendChild(document.createElement('br'));
				td.appendChild(document.createTextNode('【記事数：'+indexesCount+'】'));
			}
		});
	});
});