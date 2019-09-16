<?php
/**
 * Plugin Name: Guten Blox Two-Column
 * Description: Custom Gutenburg Block for managing two-column layout.
 * Version: 2.0.0
 * Author: Rob Hyrkiel
 * Text Domain: gutenblox
 * Domain Path: /languages
 *
 * @package gutenblox
 */
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}
 
/**
 * Enqueue block JavaScript and CSS for the editor
 */
function gutenblox_plugin_editor_scripts() {
 
    // Enqueue block editor JS
    wp_register_script(
        'gutenblox/editor-scripts',
        plugins_url( '/assets/dist/build.js', __FILE__ ),
        [ 'wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-i18n' ],
        filemtime( plugin_dir_path( __FILE__ ) . '/assets/dist/build.js' ) 
    );
 
    // Enqueue block editor styles
    wp_register_style(
        'gutenblox/stylesheets',
        plugins_url( 'assets/dist/style.css', __FILE__ ),
        [ 'wp-edit-blocks' ],
        filemtime( plugin_dir_path( __FILE__ ) . 'assets/dist/style.css' ) 
    );

    register_block_type('gutenblox/block-library', array(
        'editor_script' => 'gutenblox/editor-scripts',
        'style' => 'gutenblox/stylesheets'   
    ));
 
}

// Hook the enqueue functions into the editor
add_action( 'init', 'gutenblox_plugin_editor_scripts' );

/**
 * Enqueue view scripts
 */
function gutenblox_plugin_view_scripts() {
    if ( is_admin() ) {
        return;
    }

    wp_enqueue_script(
		'gutenblox/view-scripts',
		plugins_url( '/assets/dist/build.view.js', __FILE__ ),
        array( 'wp-blocks', 'wp-element', 'react', 'react-dom' )
    );
}

add_action( 'enqueue_block_assets', 'gutenblox_plugin_view_scripts' );