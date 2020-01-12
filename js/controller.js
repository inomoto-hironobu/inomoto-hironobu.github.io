window.addEventListener('DOMContentLoaded', function() {
	$('#accordion > article')
	.filter(function() {
		return checkid(this);
	})
	.each(function() {
		if($('#アイデア').has(this)) {
			var tabpanel = $(this).find('[role=\'tabpanel\']');
			tabpanel.addClass('show');
			console.log(tabpanel);
			//console.log(tabpanel.attr('class'));
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