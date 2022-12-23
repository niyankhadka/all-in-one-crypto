/**
 * WordPress components that create the necessary UI elements for the block
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-components/
 */
import { 
	PanelBody,
	PanelRow,
	Spinner
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
			<span> { title ?? <Spinner /> }</span>
		</p>
	);
}
