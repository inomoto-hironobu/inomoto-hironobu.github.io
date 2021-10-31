
window.addEventListener('DOMContentLoaded', function() {
	document
	.querySelectorAll('main a[href]')
	.forEach((a)=>{
		
		console.log(a.getAttribute('href'));
		const href = new URL(a.getAttribute('href'),window.location);
		const windoworigin = new URL(window.location).origin;
		if(href.origin === windoworigin) {
			const button = document.createElement('button');
			button.appendChild(document.createTextNode('情報を見る'));
			button.onclick = function() {
				pullMeta(a,function(info) {
					button.parentNode.insertBefore(document.createTextNode('('+info.description+'【更新日：'+info.modified+'】'+'【文字数：'+info.contentLength+'】)'),button.nextSibling);
				})
				button.style.display = 'none';
			};
			a.parentNode.insertBefore(button, a.nextSibling);
		}		
	});
});