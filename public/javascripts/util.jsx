"use strict";

export default class Util {
    /**
     * arrayBufferToBase64
     *
     * @param {ArrayBuffer} buffer
     * @return {String}
     */
    arrayBufferToBase64( buffer ) {
        let binary = ''
        let bytes = new Uint8Array( buffer )
        let len = bytes.byteLength;
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] )
        }
        return window.btoa( binary );
    }
}
