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
		const x = xpath(res.data,{
			'xhtml' : 'http://www.w3.org/1999/xhtml',
			'mathml': 'http://www.w3.org/1998/Math/MathML'
		});
		td.appendChild(document.createTextNode(x.string('//xhtml:meta[@name=\'description\']/@content')));
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