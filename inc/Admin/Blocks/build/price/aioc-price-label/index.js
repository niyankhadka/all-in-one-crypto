/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/price/aioc-price-label/aioc-price-settings.js":
/*!***********************************************************!*\
  !*** ./src/price/aioc-price-label/aioc-price-settings.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AiocPriceSettings": () => (/* binding */ AiocPriceSettings)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_6__);

/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */








/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
class AiocPriceSettings extends _wordpress_element__WEBPACK_IMPORTED_MODULE_0__.Component {
  constructor(props) {
    super(props);
    this.state = {
      coinsData: [],
      coinsLoading: true
    };
  }
  componentDidMount() {
    this.isStillMounted = true;
    this.runApiFetch();
  }
  runApiFetch() {
    this.fetchRequest = _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_5___default()({
      path: 'aioc/v1/cryptoprice/nasl/all'
    }).then(coinsData => {
      if (this.isStillMounted) {
        this.setState({
          coinsData: (0,lodash__WEBPACK_IMPORTED_MODULE_6__.isEmpty)(coinsData) ? [] : coinsData,
          coinsLoading: false
        });
      }
    }).catch(() => {
      if (this.isStillMounted) {
        this.setState({
          coinsData: [],
          coinsLoading: false
        });
      }
    });
  }
  componentWillUnmount() {
    this.isStillMounted = false;
  }
  getPanelBody() {
    const {
      attributes,
      setAttributes
    } = this.props;
    const {
      selectedCoins
    } = attributes;
    const {
      coinsData
    } = this.state;
    const {
      coinsLoading
    } = this.state;
    let coinNamesArray = [];
    let coinValuesArray = [];
    if (coinsData !== null) {
      coinNamesArray = Object.values(coinsData).map(coinsList => coinsList.name);
      coinValuesArray = selectedCoins.map(selectedSlug => {
        let wantedCoin = coinsData.find(coinsList => {
          return coinsList.slug === selectedSlug;
        });
        if (wantedCoin === undefined || !wantedCoin) {
          return false;
        }
        return wantedCoin.name;
      });
    }
    const onSelectCoins = selectedCoins => {
      // Build array of selected coins.
      let selectedCoinsArray = [];
      selectedCoins.map(coinName => {
        const matchingCoin = coinsData.find(coinsList => {
          return coinsList.name === coinName;
        });
        if (matchingCoin !== undefined) {
          selectedCoinsArray.push(matchingCoin.slug);
        }
      });
      setAttributes({
        selectedCoins: selectedCoinsArray
      });
    };
    return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('General Settings'),
      initialOpen: true
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, coinsLoading ? (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null) : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.FormTokenField, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Select Coins'),
      placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Type Coin Name'),
      value: coinValuesArray,
      suggestions: coinNamesArray,
      maxSuggestions: 20,
      onChange: onSelectCoins
    })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, "This is row 1.1.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Design Settings'),
      initialOpen: false
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Color Settings')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, "This is row 1.0."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, "This is row 1.1.")), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelBody, {
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__.__)('Typography Settings')
    }, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, "This is row 2.0."), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.PanelRow, null, "This is row 2.1."))));
  }
  render() {
    return this.getPanelBody();
  }
}

/***/ }),

/***/ "./src/price/aioc-price-label/edit.js":
/*!********************************************!*\
  !*** ./src/price/aioc-price-label/edit.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Edit)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/data */ "@wordpress/data");
/* harmony import */ var _wordpress_data__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_data__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _aioc_price_settings__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./aioc-price-settings */ "./src/price/aioc-price-label/aioc-price-settings.js");
/* harmony import */ var _editor_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./editor.scss */ "./src/price/aioc-price-label/editor.scss");

/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */







/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */


/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
function Edit(props) {
  const {
    attributes,
    setAttributes
  } = props;
  const {
    title
  } = (0,_wordpress_data__WEBPACK_IMPORTED_MODULE_3__.useSelect)(select => {
    var _select$getSite;
    return (_select$getSite = select('core').getSite()) !== null && _select$getSite !== void 0 ? _select$getSite : {};
  });
  return (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.InspectorControls, null, (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_aioc_price_settings__WEBPACK_IMPORTED_MODULE_5__.AiocPriceSettings, {
    attributes: props.attributes,
    setAttributes: props.setAttributes
  })), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", (0,_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_2__.useBlockProps)(), (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)("span", null, title !== null && title !== void 0 ? title : (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createElement)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, null))));
}

// class BlockEdit extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			list: [],
// 			loading: true
// 		}
// 	}

// 	componentDidMount() {
// 		this.runApiFetch();
// 	}

// 	runApiFetch() {
// 		wp.apiFetch({
// 			path: 'aioc/v1/cryptoprice/nasl/all',
// 		}).then(data => {
// 			this.setState({
// 				list: data,
// 				loading: false
// 			});
// 		});
// 	}

// 	render() {

// 		const { attributes, setAttributes } = this.props;
// 		const {
// 			selectedCoins,
// 		} = attributes;

// 		let coinNames = [];
// 		let coinValues = [];
// 		let allCoinsData = this.state.list;

// 		if( this.state.loading == false ) {

// 			if ( allCoinsData !== null ) {

// 				coinNames = Object.values(allCoinsData).map( ( coinsList ) => coinsList.name );
// 				// coinNames = new Map(Object.entries(this.state.list));
// 				// posts.map( ( post ) => post.title.raw )

// 				// console.log(coinNames);

// 				coinValues = selectedCoins.map( ( selectedSlug ) => {
// 					let wantedCoin = allCoinsData.find( ( coinsList ) => {
// 						return coinsList.slug === selectedSlug;
// 				 	});

// 					if ( wantedCoin === undefined || ! wantedCoin ) {
// 						return false;
// 					}
// 					return wantedCoin.name;
// 				});
// 				// console.log(coinValues);
// 			}

// 		}

// 		return(
// 			<div>
// 				{this.state.loading ? (
// 					<Spinner />
// 				) : (
// 					<FormTokenField
// 						// label='Posts'
// 						placeholder={ __( 'Type Coin Name' ) }
// 						value={ coinValues }
// 						suggestions={ coinNames }
// 						maxSuggestions={ 20 }
// 						onChange={ ( selectedCoins ) => {
// 							// Build array of selected posts.
// 							let selectedCoinsArray = [];
// 							selectedCoins.map(
// 								( coinName ) => {
// 									const matchingCoin = allCoinsData.find( ( coinsList ) => {
// 										return coinsList.name === coinName;

// 									} );
// 									if ( matchingCoin !== undefined ) {
// 										selectedCoinsArray.push( matchingCoin.slug );
// 									}
// 								}
// 							)

// 							setAttributes( { selectedCoins: selectedCoinsArray } );
// 						} }
// 					/>
// 					// <p>Data is ready</p>
// 				)}
// 			</div>
// 		);

// 	}
// }

// const { isUndefined, pickBy } = lodash;

// class PostEditComponent extends Component {
// 	constructor() {
// 		super( ...arguments );
// 	}

// 	componentDidMount() {
// 		this.isStillMounted = true;
// 	}

// 	componentWillUnmount() {
// 		this.isStillMounted = false;
// 	}

// 	render() {
// 		const { attributes, setAttributes, posts } = this.props;

// 		const {
// 			selectedPosts,
// 		} = attributes;

// 		let postNames = [];
// 		let postsFieldValue = [];
// 		if ( posts !== null ) {
// 			postNames = posts.map( ( post ) => post.title.raw );

// 			postsFieldValue = selectedPosts.map( ( postId ) => {
// 				let wantedPost = posts.find( ( post ) => {
// 					return post.id === postId;
// 				} );
// 				if ( wantedPost === undefined || ! wantedPost ) {
// 					return false;
// 				}
// 				return wantedPost.title.raw;
// 			} );
// 		}

// 		return(
// 			<div>
// 				<FormTokenField
// 					label='Posts'
// 					value={ postsFieldValue }
// 					suggestions={ postNames }
// 					maxSuggestions={ 20 }
// 					onChange={ ( selectedPosts ) => {
// 						// Build array of selected posts.
// 						let selectedPostsArray = [];
// 						selectedPosts.map(
// 							( postName ) => {
// 								const matchingPost = posts.find( ( post ) => {
// 									return post.title.raw === postName;

// 								} );
// 								if ( matchingPost !== undefined ) {
// 									selectedPostsArray.push( matchingPost.id );
// 								}
// 							}
// 						)

// 						setAttributes( { selectedPosts: selectedPostsArray } );
// 					} }
// 				/>
// 			</div>
// 		)
// 	}
// }

// function MyComponent() {

//     const [ error, setError ]       = useState( null );
//     const [ mypost, setPost ]       = useState( null );
//     const [ isLoaded, setIsLoaded ] = useState( false );

// 	apiFetch( { path: 'aioc/v1/cryptoprice/nasl/all' } ).then(
// 		( result ) => {
// 			setIsLoaded( true );
// 			setPost( result );
// 		},
// 		( error ) => {
// 			setIsLoaded( true );
// 			setError( error );
// 		}
// 	);

//     if ( error ) {
//         return <p>ERROR: { error.message }</p>;
//     } else if ( ! isLoaded ) {
//         return <Spinner />;
//     } else if ( mypost ) {
//         return <h3>Post loaded!</h3>;
//     }
//     return <p>No such post</p>;
// }

// function MyComponents() {
//     const { mypost, isLoading } = useSelect( ( select ) => {
//         const args = [ 'aioc/v1/cryptoprice/nasl/all' ];

//         return {
//             mypost: select( 'core' ).getEntityRecord( ...args ),
//             isLoading: select( 'core/data' ).isResolving( 'core', 'getEntityRecord', args )
//         };
//     } );

// 	console.log(mypost);
// 	console.log(isLoading);

//     if ( isLoading ) {
//         return <p>Loading post..</p>;
//     } else if ( mypost ) {
//         return <h3>Post loaded!</h3>;
//     }
//     return <p>No such post</p>;
// }

// const coins = [
// 	{"name":"Bitcoin","slug":"bitcoin"},
// 	{"name":"Ethereum","slug":"ethereum"},
// 	{"name":"Tether","slug":"tether"},
// 	{"name":"BNB","slug":"bnb"},
// 	{"name":"USD Coin","slug":"usd-coin"},
// 	{"name":"XRP","slug":"xrp"},
// 	{"name":"Binance USD","slug":"binance-usd"},
// 	{"name":"Cardano","slug":"cardano"},
// 	{"name":"Dogecoin","slug":"dogecoin"},
// 	{"name":"Polygon","slug":"matic-network"}
// ];

// const MyFormTokenField = () => {
// 	const [ selectedContinents, setSelectedCoins ] = useState( [] );

// 	return (
// 		<FormTokenField
// 			value={ attributes.selectedCoins }
// 			suggestions={ coins }
// 			onChange={ ( selectedCoins ) => setSelectedCoins( selectedCoins ) }
// 		/>
// 	);
// };

/***/ }),

/***/ "./src/price/aioc-price-label/index.js":
/*!*********************************************!*\
  !*** ./src/price/aioc-price-label/index.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/blocks */ "@wordpress/blocks");
/* harmony import */ var _wordpress_blocks__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./style.scss */ "./src/price/aioc-price-label/style.scss");
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./edit */ "./src/price/aioc-price-label/edit.js");
/* harmony import */ var _block_json__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./block.json */ "./src/price/aioc-price-label/block.json");
/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */


/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */

// import './editor.scss';

/**
 * Internal dependencies
 */

// import save from './save';

const {
  name
} = _block_json__WEBPACK_IMPORTED_MODULE_3__;
const {
  example
} = _block_json__WEBPACK_IMPORTED_MODULE_3__;

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */
(0,_wordpress_blocks__WEBPACK_IMPORTED_MODULE_0__.registerBlockType)(name, {
  /**
   * Used to construct a preview for the block to be shown in the block inserter.
   */
  example,
  /**
   * @see ./edit.js
   */
  edit: _edit__WEBPACK_IMPORTED_MODULE_2__["default"]

  /**
   * Many examples use following for dynamic blocks: save: () => null
   * This is the default value in registerBlockType for the save property, so it has been omitted here.
   */

  // /**
  //  * @see ./save.js
  //  */
  // save,
});

/***/ }),

/***/ "./src/price/aioc-price-label/editor.scss":
/*!************************************************!*\
  !*** ./src/price/aioc-price-label/editor.scss ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./src/price/aioc-price-label/style.scss":
/*!***********************************************!*\
  !*** ./src/price/aioc-price-label/style.scss ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "lodash":
/*!*************************!*\
  !*** external "lodash" ***!
  \*************************/
/***/ ((module) => {

module.exports = window["lodash"];

/***/ }),

/***/ "@wordpress/api-fetch":
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
/***/ ((module) => {

module.exports = window["wp"]["apiFetch"];

/***/ }),

/***/ "@wordpress/block-editor":
/*!*************************************!*\
  !*** external ["wp","blockEditor"] ***!
  \*************************************/
/***/ ((module) => {

module.exports = window["wp"]["blockEditor"];

/***/ }),

/***/ "@wordpress/blocks":
/*!********************************!*\
  !*** external ["wp","blocks"] ***!
  \********************************/
/***/ ((module) => {

module.exports = window["wp"]["blocks"];

/***/ }),

/***/ "@wordpress/components":
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
/***/ ((module) => {

module.exports = window["wp"]["components"];

/***/ }),

/***/ "@wordpress/data":
/*!******************************!*\
  !*** external ["wp","data"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["data"];

/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/***/ ((module) => {

module.exports = window["wp"]["element"];

/***/ }),

/***/ "@wordpress/i18n":
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
/***/ ((module) => {

module.exports = window["wp"]["i18n"];

/***/ }),

/***/ "./src/price/aioc-price-label/block.json":
/*!***********************************************!*\
  !*** ./src/price/aioc-price-label/block.json ***!
  \***********************************************/
/***/ ((module) => {

module.exports = JSON.parse('{"$schema":"https://schemas.wp.org/trunk/block.json","apiVersion":2,"name":"all-in-one-crypto/aioc-price-label","version":"1.0.0","title":"Crypto Price Label","category":"all_in_one_crypto","icon":"feedback","description":"Use this to display crypto price in label format.","attributes":{"message":{"type":"string","source":"text","default":"","selector":"div"},"selectedCoins":{"type":"array","default":[]}},"example":{"attributes":{"message":"Example from price label!"}},"supports":{"html":false,"typography":{"fontSize":true,"lineHeight":true,"__experimentalFontFamily":true,"__experimentalFontStyle":true,"__experimentalFontWeight":true,"__experimentalLetterSpacing":true,"__experimentalTextTransform":true,"__experimentalTextDecoration":true,"__experimentalDefaultControls":{"fontSize":true,"fontAppearance":true,"textTransform":true}}},"textdomain":"aioc-price-label","editorScript":"file:./index.js","editorStyle":"file:./index.css","style":"file:./style-index.css"}');

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"price/aioc-price-label/index": 0,
/******/ 			"price/aioc-price-label/style-index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = globalThis["webpackChunkall_in_one_crypto"] = globalThis["webpackChunkall_in_one_crypto"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["price/aioc-price-label/style-index"], () => (__webpack_require__("./src/price/aioc-price-label/index.js")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map