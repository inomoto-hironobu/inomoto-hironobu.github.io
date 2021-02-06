window.addEventListener('DOMContentLoaded', ()=>{
	document
	.querySelectorAll('#indexes tr:not(.th)')
	.forEach((tr)=>{
		tr.querySelector('td');
		let td = document.createElement('td');
		let button = document.createElement('button');
		button.appendChild(document.createTextNode('詳しく見る'));
		button.setAttribute('onclick', 'pull(this);');
		td.appendChild(button);
		tr.appendChild(td);
	});
});
function nsResolver(prefix) {
  var ns = {
    'xhtml' : 'http://www.w3.org/1999/xhtml',
    'mathml': 'http://www.w3.org/1998/Math/MathML'
  };
  return ns[prefix] || null;
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
		let description = res.data.evaluate('/xhtml:html/xhtml:head/xhtml:meta[@name=\'description\']/@content', res.data, nsResolver, XPathResult.STRING_TYPE, null);
		td.appendChild(document.createTextNode(description.stringValue));
	});                                                         
}