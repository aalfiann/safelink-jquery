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

    it('config value', function() {
        $().Safelink({
            encoded:'123',
            firstButtonText: 'Click here bro!',
            secondButtonText: 'Continue to Link!'
        });
    });

    it('build will throws error if not in browser', function() {
        assert.throws(function(){
            $('#safelinker1').Safelink({
                firstButtonText: 'Click here bro!',
                secondButtonText: 'Continue to Link!'
            }).build('#safelinker2','btn');
        },Error);
    });
    
    it('build with direct encoded', function() {
        $('#safelinker1').Safelink({
            encoded:'123',
            firstButtonText: 'Click here bro!',
            secondButtonText: 'Continue to Link!'
        }).build('#safelinker2','btn');
    });

    it('build with timer', function() {
        $('#safelinker1').Safelink({
            encoded:'123',
            timer: true,
            firstButtonText: 'Click here bro!',
            secondButtonText: 'Continue to Link!'
        }).build('#safelinker2');
    });

    it('build with custom timer', function() {
        $('#safelinker1').Safelink({
            encoded:'123',
            timer: true,
            timer_first:1,
            timer_second:1,
            firstButtonText: 'Click here bro!',
            secondButtonText: 'Continue to Link!'
        }).build('#safelinker2');
    });

});