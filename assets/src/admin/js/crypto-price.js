(function( $ ) {
	'use strict';

	/**
	 * All of the code for your admin-facing JavaScript source
	 * should reside in this file.
	 *
	 * Note: It has been assumed you will write jQuery code here, so the
	 * $ function reference has been prepared for usage within the scope
	 * of this function.
	 *
	 * This enables you to define handlers, for when the DOM is ready:
	 *
	 * $(function() {
	 *
	 * });
	 *
	 * When the window is loaded:
	 *
	 * $( window ).load(function() {
	 *
	 * });
	 *
	 * ...and/or other possibilities.
	 *
	 * Ideally, it is not considered best practise to attach more than a
	 * single DOM-ready or window-load handler for a particular page.
	 * Although scripts in the WordPress core, Plugins and Themes may be
	 * practising this, we should strive to set a better example in our own work.
	 */

	 $(document).ready(function() {

        let checkBtn = document.querySelector(".aoic-price-button");

		if( checkBtn ) {

			let copyText = document.querySelector(".aioc-price-shortcode");

			copyText.querySelector("button").addEventListener("click", function () {

				var clipboard = new ClipboardJS('.aoic-price-button');
	
				clipboard.on('success', function (e) {
					// console.info('Action:', e.action);
					// console.info('Text:', e.text);
					// console.info('Trigger:', e.trigger);
	
					copyText.classList.add("active");
					window.getSelection().removeAllRanges();
					setTimeout(function () {
						copyText.classList.remove("active");
					}, 2500);
				});
		
				clipboard.on('error', function (e) {
					console.log(e);
				});
	
			});
		}

	});

})( jQuery );
