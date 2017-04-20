if (window.File && window.FileReader && window.FileList && window.Blob) {
  // Great success! All the File APIs are supported.
} else {
  alert('The File APIs are not fully supported in this browser.');
}
window.addEventListener("load", function() {
	document.getElementById("fileapi").addEventListener("change", function (evt) {
		console.log("test");
		console.log(evt);
	},false);
},false);