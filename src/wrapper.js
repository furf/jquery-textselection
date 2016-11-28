/*!
 * jQuery TextSelection v@VERSION
 * https://github.com/jhorowitz-firedrum/jquery-textselection
 * Copyright David Furfero and other contributors
 * Released under the GPL-3.0 license
 * Date: @DATE
 */
window = ( typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {} );
document = window.document || {};

; ( function ( factory, global ) {
    if ( typeof require === "function" && typeof exports === "object" && typeof module === "object" ) {

        // CommonJS
        factory( require( "jquery" ) );
    } else if ( typeof define === "function" && define.amd ) {

        // AMD
        define( [ "jquery" ], factory );
    } else {

        // Normal script tag
        factory( global.jQuery );
    }
}( function ( $ ) {
    "use strict";

// @CODE
// build.js inserts compiled code here

}, window ) );