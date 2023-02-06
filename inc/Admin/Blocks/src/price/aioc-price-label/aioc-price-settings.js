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
	SelectControl
 } from '@wordpress/components';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { isEmpty } from 'lodash';

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
export class AiocPriceSettings extends Component {

	constructor( props ) {
		super( props );
		this.state = {
			coinsData: [],
			coinsLoading: true,
			ratesData: [],
			ratesLoading: true
		};
	}
 
	componentDidMount() {
		this.isStillMounted = true;
		this.runApiCoinPriceFetch();
		this.runApiFiatRateFetch();
	}
 
	runApiCoinPriceFetch() {
		this.fetchRequest = apiFetch( {
			path: 'aioc/v1/cryptoprice/query=nasl/slug=all' 
		} )
		.then( ( coinsData ) => {
			if( this.isStillMounted ) {
				this.setState( {
					coinsData: isEmpty( coinsData )
						? []
						: coinsData,
					coinsLoading: false
				} );
			}
		} )
		.catch( () => {
			if ( this.isStillMounted ) {
				this.setState( { 
					coinsData: [],
					coinsLoading: false
				} );
			}
		} );
	}

	runApiFiatRateFetch() {
		this.fetchRequest = apiFetch( {
			path: 'aioc/v1/fiatrate/currency=all'
		} )
		.then( ( ratesData ) => {
			if( this.isStillMounted ) {
				this.setState( {
					ratesData: isEmpty( ratesData )
						? []
						: ratesData,
					ratesLoading: false
				} );
			}
		} )
		.catch( () => {
			if ( this.isStillMounted ) {
				this.setState( { 
					ratesData: [],
					ratesLoading: false
				} );
			}
		} );
	}

	componentWillUnmount() {
		this.isStillMounted = false;
	}
 
	render() {

		const { attributes, setAttributes } = this.props;
		const {
			selectedCoins,
			selectedCurrencies,
			className
		} = attributes;
		const { coinsData } = this.state;
		const { coinsLoading } = this.state;

		let coinNamesArray = [];
		let coinValuesArray = [];

		if( coinsData !== null ) {
			coinNamesArray = Object.values( coinsData ).map( ( coinsList ) => coinsList.name );
			coinValuesArray = selectedCoins.map( ( selectedSlug ) => {
				let wantedCoin = coinsData.find( ( coinsList ) => {
					return coinsList.slug === selectedSlug;
				});

				if ( wantedCoin === undefined || !wantedCoin ) {
					return false;
				}
				return wantedCoin.name;
			} );
		}

		const onSelectCoins = ( selectedCoins ) => {
			// Build array of selected coins.
			let selectedCoinsArray = [];
			selectedCoins.map(
				( coinName ) => {
					const matchingCoin = coinsData.find( ( coinsList ) => {
						return coinsList.name === coinName;

					} );
					if( matchingCoin !== undefined ) {
						selectedCoinsArray.push( matchingCoin.slug );
					}
				}
			)
			setAttributes( { selectedCoins: selectedCoinsArray } );
		};

		const { ratesData } = this.state;
		const { ratesLoading } = this.state;

		let ratesDataArray = [];
		let rateNamesArray = [];
		let rateValuesArray = [];

		if( ratesData !== null ) {
			ratesDataArray = Object.entries( ratesData );
			rateNamesArray = ratesDataArray.map( ( ratesList ) => ratesList[0] );
			rateValuesArray = selectedCurrencies.map( ( selectedCurrency ) => {
				let wantedRate = ratesDataArray.find( ( ratesList ) => {
					return ratesList[0] === selectedCurrency;
				});

				if ( wantedRate === undefined || !wantedRate ) {
					return false;
				}
				return wantedRate[0];
			} );
		}

		const onSelectRates = ( selectedCurrencies ) => {
			let selectedRatesArray = [];
			selectedCurrencies.map(
				( rateName ) => {
					const matchingRate = ratesDataArray.find( ( ratesList ) => {
						return ratesList[0] === rateName;

					} );
					if( matchingRate !== undefined ) {
						selectedRatesArray.push( matchingRate[0] );
					}
				}
			)
			setAttributes( { selectedCurrencies: selectedRatesArray } );
		};

		// const onSelectCurrency = ( selectedCurrency ) => {
		// 	setAttributes( { selectedCurrency: selectedCurrency } );
		// };

		// const MySelectControl = () => {
		
		// 	return (
		// 		<SelectControl
		// 			label="Size"
		// 			value={ selectedCurrency }
		// 			options={ [
		// 				{ label: 'Big', value: '100%' },
		// 				{ label: 'Medium', value: '50%' },
		// 				{ label: 'Small', value: '25%' },
		// 			] }
		// 			onChange={ onSelectCurrency }
		// 			__nextHasNoMarginBottom
		// 		/>
		// 	);
		// };

		const panelBody = (
			<PanelBody title={ __( 'General Settings' ) } initialOpen={ true }>
				<PanelRow>
					{ coinsLoading ? (
						<Spinner />
					) : (
						<FormTokenField
							label={ __( 'Select Coins' ) }
							placeholder={ __( 'Type Coin Name' ) }
							value={ coinValuesArray }
							suggestions={ coinNamesArray }
							maxSuggestions={ 20 }
							onChange={ onSelectCoins }
						/>
					) }
				</PanelRow>
				<PanelRow>
					{ ratesLoading ? (
						<Spinner />
					) : (
						<FormTokenField
							label={ __( 'Select Currency' ) }
							placeholder={ __( 'Type Currency' ) }
							value={ rateValuesArray }
							suggestions={ rateNamesArray }
							maxSuggestions={ 20 }
							onChange={ onSelectRates }
						/>
					) }
				</PanelRow>
				{ className === 'is-style-fill' && (
					<PanelRow>
						This is row 1.1.0
					</PanelRow>
				) }
				{ className === 'is-style-outline' && (
					<PanelRow>
						This is row 1.1.1
					</PanelRow>
				) }
			</PanelBody>
		);

		return(
			<div>
                { panelBody }
			</div>
		);
	}
}