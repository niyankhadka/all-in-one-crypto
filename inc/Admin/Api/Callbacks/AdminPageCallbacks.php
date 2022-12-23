<?php 

/**
 * Callbacks function defined for admin section
 *
 * @link       https://github.com/niyankhadka/
 * @since      1.0.0
 *
 * @package    All-In-One Crypto
 */

namespace Inc\Admin\Api\Callbacks;

use \Inc\Admin\Base\BaseController;

class AdminPageCallbacks extends BaseController
{

    public function adminDashboard() {

        return require_once $this->plugin_path . 'templates/admin/dashboard.php';
    }

    public function adminCryptoPrice() {

        return require_once $this->plugin_path . 'templates/admin/crypto-price.php';
    }

}