<?php
/**
 * All of the parameters passed to the function where this file is being required are accessible in this scope:
 *
 * @param array    $attributes     The array of attributes for this block.
 * @param string   $content        Rendered block output. ie. <InnerBlocks.Content />.
 * @param WP_Block $block_instance The instance of the WP_Block class that represents the block being rendered.
 *
 * @package gutenberg-examples
 */

?>
<!-- <p <?php //echo wp_kses_data( get_block_wrapper_attributes() ); ?>> -->
	<?php
	// if ( isset( $attributes['message'] ) ) {
	// 	/**
	// 	 * The wp_kses_post function is used to ensure any HTML that is not allowed in a post will be escaped.
	// 	 *
	// 	 * @see https://developer.wordpress.org/reference/functions/wp_kses_post/
	// 	 * @see https://developer.wordpress.org/themes/theme-security/data-sanitization-escaping/#escaping-securing-output
	// 	 */
	// 	echo wp_kses_post( $attributes['message'] . get_bloginfo( 'name' ) );
	// }
	?>
<!-- </p> -->
<div <?php echo wp_kses_data( get_block_wrapper_attributes() ); ?> data-realtime="on">
		
		<div class="aioc-price-label-style-box">
			<div class="aioc-price-label-head">
				<img alt="bitcoin" src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" />
				<p class="aioc-price-label-coin-details">
					<span class="coin-name">Bitcoin</span> 
					<span class="coin-symbol">(BTC)</span>
				</p>
			</div>
			<div class="aioc-price-label-body">
				<p class="aioc-price-label-price-details" data-price="16724.32" data-live-price="bitcoin" data-rate="1.000268" data-currency="USD" data-timeout="1671302707901">
					<span class="fiat-symbol">$</span> 
					<span class="fiat-price">16,728.80</span>
				</p>
			</div>
		</div>

</div>