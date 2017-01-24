/**
 * 
 */

function html() {
	$("#html > textarea").text();
}

function displaySample() {
	var sample = document.getElementById("sample-css");
	var displaySample = document.getElementById("display-sample");
	displaySample.appendChild(document.createTextNode(sample.firstChild.nodeValue));
}
window.addEventListener("load",function() {
	displaySample();
});
function loadSvg(target, url) {
	$.ajax({
		type: "GET",
		dataType: "xml",
		url: url,
		success: function(data) {
			console.log(data);
			console.log(data.documentElement);
			$(target).empty().append($(data.documentElement));
		}
	});
}