/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import { 
	PanelBody,
	PanelRow,
	Spinner,
	FormTokenField
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
			coinsLoading: true
		};
	}
 
	componentDidMount() {
		this.isStillMounted = true;
		this.runApiFetch();
	}
 
	runApiFetch() {
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

	componentWillUnmount() {
		this.isStillMounted = false;
	}

	getPanelBody() {
		const { attributes, setAttributes } = this.props;
		const {
			selectedCoins,
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

		return(
			<div>
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
						This is row 1.1.
					</PanelRow>
                </PanelBody>
                <PanelBody title={ __( 'Design Settings' ) } initialOpen={ false }>
                    <PanelBody title={ __( 'Color Settings' ) }>
                        <PanelRow>
                            This is row 1.0.
                        </PanelRow>
                        <PanelRow>
                            This is row 1.1.
                        </PanelRow>
                    </PanelBody>
                    <PanelBody title={ __( 'Typography Settings' ) }>
                        <PanelRow>
                            This is row 2.0.
                        </PanelRow>
                        <PanelRow>
                            This is row 2.1.
                        </PanelRow>
                    </PanelBody>
                </PanelBody>
			</div>
		);
	}
 
	render() {

		return(
			this.getPanelBody()
		);

	}
}