import { __ } from "@wordpress/i18n";

const variations = [
    {
        name: "aioc-price-label",
        title: __("Crypto Price Label"),
        description: __("Crypto Price Chart Description"),
        icon: "palmtree",
        innerBlocks: [
            [
                "all-in-one-crypto/aioc-price-label"
            ]
        ],
        scope: ["block"],
    },
    {
        name: "aioc-price-chart",
        title: __("Crypto Price Chart"),
        description: __("Crypto Price Chart Description"),
        icon: "palmtree",
        // isDefault: true,
        innerBlocks: [
            [
                "all-in-one-crypto/aioc-price-chart"
            ]
        ],
        scope: ["block"],
    },
];
    
export default variations;