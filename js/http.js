window.addEventListener('load', function(e) {
	document
		.getElementById('modified')
		.appendChild(document.createTextNode(document.lastModified));
});