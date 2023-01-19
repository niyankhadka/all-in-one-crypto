<?php

echo "All in One Crypto Plugin CPT";
?>

<div class="crypto-affix">
    <div class="cryptoboxes" id="mcw-100" data-realtime="on">
        <a href="https://test.etailnepal.com/currencies/bitcoin" class="mcw-link mcw-label mcw-label-1 mcw-midnight-theme mcw-stretch mcw-rounded invert-act">
            <div class="mcw-label-dn1-head">
                <div class="mcw-card-head">
                    <div>
                        <img alt="bitcoin" src="https://assets.coingecko.com/coins/images/1/thumb/bitcoin.png" height="25">
                        <p>Bitcoin (BTC)</p>
                    </div>
                </div>
            </div>
            <div class="mcw-label-dn1-body">
                <b data-price="16724.32" data-live-price="bitcoin" data-rate="1.000268" data-currency="USD" class="" data-timeout="1671302707901">
                    <b class="fiat-symbol">$</b> 
                    <span>16,728.80</span>
                </b>
            </div>
        </a>
        <a href="https://test.etailnepal.com/currencies/ethereum" class="mcw-link mcw-label mcw-label-1 mcw-midnight-theme mcw-stretch mcw-rounded invert-act">
            <div class="mcw-label-dn1-head">
                <div class="mcw-card-head">
                    <div>
                        <img alt="ethereum" src="https://assets.coingecko.com/coins/images/279/thumb/ethereum.png" height="25" class="invertable">
                        <p>Ethereum (ETH)</p>
                    </div>
                </div>
            </div>
            <div class="mcw-label-dn1-body">
                <b data-price="1179.69" data-live-price="ethereum" data-rate="1.000268" data-currency="USD" class="" data-timeout="1671302709839">
                    <b class="fiat-symbol">$</b> 
                    <span>1,180.01</span>
                </b>
            </div>
        </a>
    </div>        
</div>
<?php
function ccpwp_get_allCoins(){
	
	$cache_name = 'ccpw-all-gecko-coins';
	$api_url = "https://api.blocksera.com/v1/tickers";

	$cache = get_transient( $cache_name );

	if( $cache!='' || !empty( $cache ) ){
		return $cache;
	}

	$request = wp_remote_get($api_url, array('timeout' => 120, 'sslverify' => false));
    if (is_wp_error($request)) {
        return 'false from request'; // Bail early
    }
    $body = wp_remote_retrieve_body($request);
    
	$response = json_decode($body);

    debug( $response );
	
	if (!empty($data)) {

        $btc_price = $data[0]->current_price;

        $values = [];

        foreach ($data as $coin) {
            if (!($coin->market_cap === null || $coin->market_cap_rank === null)) {
                $coin->price_btc = $coin->current_price / $btc_price;
                $coin->image = strpos($coin->image, 'coingecko.com') ? strtok($coin->image, '?') : MCW_URL . 'assets/public/img/missing.png';
                $values[] = array($coin->name, strtoupper($coin->symbol), $coin->id, $coin->image, $coin->market_cap_rank, floatval($coin->current_price), floatval($coin->price_btc), floatval($coin->total_volume), floatval($coin->market_cap), floatval($coin->high_24h), floatval($coin->low_24h), floatval($coin->circulating_supply), floatval($coin->total_supply), floatval($coin->ath), strtotime($coin->ath_date), floatval($coin->price_change_24h), floatval($coin->price_change_percentage_1h), floatval($coin->price_change_percentage_24h), floatval($coin->price_change_percentage_7d), floatval($coin->price_change_percentage_30d), gmdate("Y-m-d H:i:s"));
            }
        }

        // $values = array_chunk($values, 100, true);

        // foreach ($values as $chunk) {
        //     $placeholder = "(%s, %s, %s, %s, %d, %0.14f, %0.8f, %0.2f, %0.2f, %0.10f, %0.10f, %0.2f, %0.2f, %0.10f, %d, %0.10f, %0.2f, %0.2f, %0.2f, %0.2f, %s)";
        //     $query = "INSERT IGNORE INTO `{$this->tablename}` (`name`, `symbol`, `slug`, `img`, `rank`, `price_usd`, `price_btc`, `volume_usd_24h`, `market_cap_usd`, `high_24h`, `low_24h`, `available_supply`, `total_supply`, `ath`, `ath_date`, `price_change_24h`, `percent_change_1h`, `percent_change_24h`, `percent_change_7d`, `percent_change_30d`, `weekly_expire`) VALUES ";
        //     $query .= implode(", ", array_fill(0, count($chunk), $placeholder));
        //     $this->wpdb->query($this->wpdb->prepare($query, call_user_func_array('array_merge', $chunk)));
        // }
        // set_transient('mcw-datatime', time());
    }

}

function get_currencies() {

    $request = wp_remote_get('https://api.blocksera.com/v1/exrates');

    if (is_wp_error($request) || wp_remote_retrieve_response_code($request) != 200) {
        return false;
    }

    $body = wp_remote_retrieve_body($request);
    $exrates = apply_filters('block_exrates', json_decode($body));

    $response = json_decode($body);

    debug( $response );

    if (!empty($exrates)) {
        set_transient('mcw-currencies', $exrates, DAY_IN_SECONDS);
    }

    return $exrates;
}
get_currencies();
