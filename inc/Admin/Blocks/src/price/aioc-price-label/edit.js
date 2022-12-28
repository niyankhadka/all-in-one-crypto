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

import apiFetch from '@wordpress/api-fetch';
import { useState, useEffect } from '@wordpress/element';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
 import './editor.scss';

 function MyComponent() {

    const [ error, setError ]       = useState( null );
    const [ mypost, setPost ]       = useState( null );
    const [ isLoaded, setIsLoaded ] = useState( false );

	apiFetch( { path: 'aioc/v1/cryptoprice' } ).then(
		( result ) => {
			setIsLoaded( true );
			setPost( result );
		},
		( error ) => {
			setIsLoaded( true );
			setError( error );
		}
	);

    if ( error ) {
        return <p>ERROR: { error.message }</p>;
    } else if ( ! isLoaded ) {
        return <Spinner />;
    } else if ( mypost ) {
        return <h3>Post loaded!</h3>;
    }
    return <p>No such post</p>;
}

function MyComponents() {
    const { mypost, isLoading } = useSelect( ( select ) => {
        const args = [ 'aioc/v1/cryptoprice' ];

        return {
            mypost: select( 'core' ).getEntityRecord( ...args ),
            isLoading: select( 'core/data' ).isResolving( 'core', 'getEntityRecord', args )
        };
    } );

	console.log(mypost);
	console.log(isLoading);

    if ( isLoading ) {
        return <p>Loading post..</p>;
    } else if ( mypost ) {
        return <h3>Post loaded!</h3>;
    }
    return <p>No such post</p>;
}

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
export default function Edit( { attributes, setAttributes } ) {

	const { title } = useSelect(
		( select ) => select( 'core' ).getSite() ?? {}
	);
	
	return (
		<p { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody title={ __( 'General Settings' ) }>
				</PanelBody>
				<PanelBody title={ __( 'Design Settings' ) }>
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
			</InspectorControls>
			<RichText
				tagName="span"
				value={ attributes.message }
				onChange={ ( val ) =>
					setAttributes( { message: val } )
				}
			/>
			<span> 
				{ title ?? <Spinner /> }
			</span>
			<MyComponents />
		</p>
	);
}












class BlockEdit extends Component {
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
			path: 'aioc/v1/cryptoprice',
		}).then(data => {
			this.setState({
				list: data,
				loading: false
			});
		});
	}
 
	render() {
		return(
			<div>
				{this.state.loading ? (
					<Spinner />
				) : (
					<p>Data is ready!</p>
				)}
			</div>
		);
 
	}
}
