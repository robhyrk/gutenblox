import './two-column-block.view.scss';
import './two-column-block.editor.scss';

const {
    registerBlockType,
} = wp.blocks;

const { 
    InspectorControls,
    RichText,
    MediaUpload
} = wp.editor;

const { 
    Fragment 
} = wp.element

const {
    TextControl, 
    ToggleControl,
    RadioControl,
    Panel, 
    PanelBody, 
    PanelRow
} = wp.components

registerBlockType('guty/two-column-block', {
    title: 'Two-Column Block',
    icon: 'editor-table',
    category: 'common',

    supports: {
        align: true,
    },

    attributes: {
        bodyContent: {
            source: 'html',
            selector: '.desc'
        },
        heading: {
            source: 'html',
            selector: '.title' 
        },
        featImgUrl: {
            type: 'string',
            default: 'https://via.placeholder.com/300?text=Upload+Your+Image+Here'
        },
        iconImgUrl: {
            type: 'string',
            default: 'https://via.placeholder.com/300?text=Upload+Your+Image+Here'
        },
        toggle:{
            type: 'boolean'
        }
    },

    edit(props) {
        const { className, setAttributes } = props;
        const { attributes } = props;

        function changeBodyContent(changes) {
            setAttributes({
                bodyContent: changes
            })
        }

        function changeHeading(changes) {
            setAttributes({ heading: changes })
            console.log(attributes)
        }

        function selectImage(value) {
            setAttributes({
                featImgUrl: value.sizes.full.url,
            })
            
        }

        function selectIcon(value) {
            setAttributes({
                iconImgUrl: value.sizes.full.url,
            })
        }

        function toggle( value ) {
            console.log(value)
            setAttributes({ 
                aligned: value 
            });
        }

        return [
            <InspectorControls>
                <div style={{padding: '1em 0'}}>
		                <PanelBody>
                            <PanelRow>
                                <div><p>Select where the main image will be aligned.</p></div>
                            </PanelRow> 
                            <PanelRow> 
						        <RadioControl                            
                                    label='Alignment'
                                    onChange={toggle}
                                    options={ [
                                        { label: 'Left', value: 'left' },
                                        { label: 'Right', value: 'right' },
                                    ] }
                                    selected={!props.attributes.aligned ? 'left' : props.attributes.aligned}
                                />
                            </PanelRow> 
                        </PanelBody>
                </div>
            </InspectorControls>,
            <div className={className}>
                <div className="feat-img">
                    <MediaUpload
                        onSelect={selectImage}
                        render={ ({open}) => {
                            return <img
                                src={attributes.featImgUrl}
                                onClick={open}
                            />
                        }}
                    />
                </div>
                <div>
                    <RichText
                        tagName="h2"
                        className="title"
                        placeholder="Heading text"
                        value={attributes.heading}
                        onChange={changeHeading}
                    />
                </div>
                <div>
                    <RichText
                        tagName="div"
                        className="desc"
                        placeholder="Enter your text here"
                        value={attributes.bodyContent}
                        onChange={changeBodyContent}
                    />
                </div>
                <div className="icon-img">
                    <MediaUpload
                        onSelect={selectIcon}
                        render={ ({open}) => {
                            return <img
                                src={attributes.iconImgUrl}
                                onClick={open}
                            />
                        }}
                    />
                </div>
            </div>,
        ];
    },

    save(props) {
        const { attributes } = props
        const className = 'guty/two-column-block'; // For use with say, BEM
        

        return (
            <div className={attributes.aligned == 'left' ? 'align-left' : 'align-right'}>
            <div className="feat-img">
                <img src={attributes.featImgUrl}/>
            </div>
                <RichText.Content 
                    tagName="h2"
                    className="title" 
                    value={attributes.heading} 
                />
                <RichText.Content 
                    tagName="div"
                    className="desc" 
                    value={attributes.bodyContent} 
                />
            <div className="icon">
                <img src={attributes.iconImgUrl}/>
            </div>
        </div>
        );
    },
});
