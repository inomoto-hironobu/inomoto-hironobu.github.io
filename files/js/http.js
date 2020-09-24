window.addEventListener('load', function(e) {
	var m = new Date(document.lastModified);
	var 年月日 = m.getFullYear() + "年" + (m.getMonth() + 1) + "月" + (m.getDate()) + "日"; 
	document
		.getElementById('modified')
		.appendChild(document.createTextNode(年月日));
});