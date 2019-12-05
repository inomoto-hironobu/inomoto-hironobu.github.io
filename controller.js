window.addEventListener('load', function() {
	$('[role=\'tabpanel\']')
	.filter(function() {
		return checkid(this);
	})
	.each(function() {
		$(this).addClass('show');
		if($('#アイデア').has(this)) {
			$('#mainlist > .active').toggleClass('active');
			$('#アイデア-tab').toggleClass('active');
			$('#ホーム').toggleClass('active').toggleClass('show');
			$('#アイデア').toggleClass('active').toggleClass('show');
		}
	});
});

function checkid(e) {
	return decodeURI(location.hash.substring(1)) == $(e).attr('id');
}