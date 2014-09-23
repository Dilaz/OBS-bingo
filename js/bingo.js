jQuery(document).ready(function($) {
	// Remove nojs from body to display the content
	$('body').removeClass('nojs');

	// Function & trigger to resize the boxes
	function resizeBoxes() {
		$('.bingo-row > span').each(function() {
			// Height == width
			$(this).height($(this).width());
		});
	};
	$(window).resize(resizeBoxes);
	// Resize on startup
	resizeBoxes();

});
