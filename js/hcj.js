/**
 * 
 */

function html() {
	$("#html > textarea").text();
}

function displaySample() {
	var sample = document.getElementById("sample-css");
	var displaySampleElem = document.getElementById("display-sample");
	displaySampleElem.appendChild(document.createTextNode(sample.firstChild.nodeValue));
}

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