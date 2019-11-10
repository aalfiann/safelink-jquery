const assert = require('assert');
const { JSDOM } = require('jsdom');
const { window } = new JSDOM(`<!DOCTYPE html><head></head><body><div id="safelinker1"></div><div id="safelinker2"></div></body></html>`);

describe('jQuery safelink test', function() {

    $ = global.jQuery = require('jquery')(window);
    require('../src/safelink.js');

    it('keyStr standard', function() {
        assert.equal($().Safelink().Crypto._keyStr,'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=');
    });

    it('encode value', function() {
        assert.equal($().Safelink().encode('abcde'),'YWJjZGU=');
    });

    it('decode value', function() {
        assert.equal($().Safelink().decode('YWJjZGU='),'abcde');
    });

});