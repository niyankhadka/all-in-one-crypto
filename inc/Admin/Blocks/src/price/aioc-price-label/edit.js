/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import { 
	PanelBody,
	PanelRow,
	Spinner,
	FormTokenField,
	Placeholder
 } from '@wordpress/components';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

import { useState } from '@wordpress/element';

import { AiocPriceSettings } from './aioc-price-settings';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
 import './editor.scss';

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
export default function Edit( props ) {

	const {
		attributes,
		setAttributes
	} = props;

	const {
		selectedCoins,
	} = attributes;

	const { title } = useSelect(
		( select ) => select( 'core' ).getSite() ?? {}
	);

	const hasSelectedCoins = !! selectedCoins?.length;
	const inspectorControls = (
		<InspectorControls>
			<AiocPriceSettings attributes={props.attributes} setAttributes={props.setAttributes}/>
		</InspectorControls>
	);

	const blockProps = useBlockProps( {
		className: {
			'is-grid': 'grid',
			'has-price': 'price' 
		}
	} );

	if ( ! hasSelectedCoins ) {
		return (
			<div { ...blockProps }>
				{ inspectorControls }
				<Placeholder label={ __( 'Crypto Price Label' ) }>
					{ ! Array.isArray( selectedCoins ) ? (
						<Spinner />
					) : (
						__( 'Please Select at least one coin.' )
					) }
				</Placeholder>
			</div>
		);
	}
	
	return (
		<div>
			{ inspectorControls }
			<div { ...blockProps } data-realtime="on">
				<div class="aioc-price-label-container">
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
				<div class="aioc-price-label-container">
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
		</div>
	);
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