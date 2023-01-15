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
import { useBlockProps, RichText, InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';

import { useState } from '@wordpress/element';

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
export class AiocPriceSettings extends Component {

	constructor(props) {
		super(props);
		this.state = {
			list: [],
			loading: true
		}
	}
 
	componentDidMount() {
		this.runApiFetch();
	}
 
	runApiFetch() {
		wp.apiFetch({
			path: 'aioc/v1/cryptoprice/nasl/all',
		}).then(data => {
			this.setState({
				list: data,
				loading: false
			});
		});
	}
 
	render() {

		const { attributes, setAttributes } = this.props;
		const {
			selectedCoins,
		} = attributes;

		let coinNames = [];
		let coinValues = [];
		let allCoinsData = this.state.list;

		if( this.state.loading == false ) {
			
			if ( allCoinsData !== null ) {
				
				coinNames = Object.values(allCoinsData).map( ( coinsList ) => coinsList.name );
				// coinNames = new Map(Object.entries(this.state.list));
				// posts.map( ( post ) => post.title.raw )

				// console.log(coinNames);

				coinValues = selectedCoins.map( ( selectedSlug ) => {
					let wantedCoin = allCoinsData.find( ( coinsList ) => {
						return coinsList.slug === selectedSlug;
				 	});

					if ( wantedCoin === undefined || ! wantedCoin ) {
						return false;
					}
					return wantedCoin.name;
				});
				// console.log(coinValues);
			}

		}

		

		return(
			<div>
                <PanelBody title={ __( 'General Settings' ) } initialOpen={ true }>
                    <PanelBody title={ __( 'Select Coins' ) }>
                        <PanelRow>
                            {this.state.loading ? (
                                <Spinner />
                            ) : (
                                <FormTokenField
                                    // label='Posts'
                                    placeholder={ __( 'Type Coin Name' ) }
                                    value={ coinValues }
                                    suggestions={ coinNames }
                                    maxSuggestions={ 20 }
                                    onChange={ ( selectedCoins ) => {
                                        // Build array of selected posts.
                                        let selectedCoinsArray = [];
                                        selectedCoins.map(
                                            ( coinName ) => {
                                                const matchingCoin = allCoinsData.find( ( coinsList ) => {
                                                    return coinsList.name === coinName;

                                                } );
                                                if ( matchingCoin !== undefined ) {
                                                    selectedCoinsArray.push( matchingCoin.slug );
                                                }
                                            }
                                        )

                                        setAttributes( { selectedCoins: selectedCoinsArray } );
                                    } }
                                />
                            ) }
                        </PanelRow>
                        <PanelRow>
                            This is row 1.1.
                        </PanelRow>
                    </PanelBody>
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
}