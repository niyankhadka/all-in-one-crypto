<?php
use \Inc\Admin\Api\SettingsApi;
?>

<div class="aioc-wrap">
	<h2 class="title"><?php esc_html_e( 'Welcome to All-In-One Crypto (AIOC) Dashboard!', 'all-in-one-crypto' ); ?></h2>
	<?php settings_errors(); ?>
	<form class="form" method="post" action="options.php">

		<?php 
		settings_fields( 'all_in_one_crypto_settings_group' );
		SettingsApi::do_settings_sections_custom( 'all_in_one_crypto' );
		?>

		<div class="aioc-link-container">
			<input name="submit" type="submit" value="Save" class="button aioc-button" />
		</div>
	</form>

</div>