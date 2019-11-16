/**
 * Safelink jQuery plugin
 * @author          M ABD AZIZ ALFIAN
 * @version         1.1.0
 * @repository      https://github.com/aalfiann/safelink-jquery
 */
(function($){

    $.fn.Safelink = function(options) {

        var config = {
            encoded:'',
            paramName: 'safelink',
            timer: false,
            timer_first: 8,
            timer_second: 8,
            firstTimerText: 'Loading safelink:',
            secondTimerText: 'Scanning the link:',
            firstButtonText: 'Click Here !!!',
            secondButtonText: 'Get Link !!!'
        };

        if(options) config = $.extend({},config,options);

        var t1 = config.timer_first;
        var t2 = config.timer_second;

        var _crypto={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(a){var b="",d,e,f,g,h,j,k,l=0;for(a=_crypto._utf8_encode(a);l<a.length;)d=a.charCodeAt(l++),e=a.charCodeAt(l++),f=a.charCodeAt(l++),g=d>>2,h=(3&d)<<4|e>>4,j=(15&e)<<2|f>>6,k=63&f,isNaN(e)?j=k=64:isNaN(f)&&(k=64),b=b+this._keyStr.charAt(g)+this._keyStr.charAt(h)+this._keyStr.charAt(j)+this._keyStr.charAt(k);return b},decode:function(a){var d,e,f,g,h,j,k,b="",l=0;for(a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");l<a.length;)g=this._keyStr.indexOf(a.charAt(l++)),h=this._keyStr.indexOf(a.charAt(l++)),j=this._keyStr.indexOf(a.charAt(l++)),k=this._keyStr.indexOf(a.charAt(l++)),d=g<<2|h>>4,e=(15&h)<<4|j>>2,f=(3&j)<<6|k,b+=String.fromCharCode(d),64!=j&&(b+=String.fromCharCode(e)),64!=k&&(b+=String.fromCharCode(f));return b=_crypto._utf8_decode(b),b},_utf8_encode:function(a){a=a.replace(/\r\n/g,"\n");for(var e,b="",d=0;d<a.length;d++)e=a.charCodeAt(d),128>e?b+=String.fromCharCode(e):127<e&&2048>e?(b+=String.fromCharCode(192|e>>6),b+=String.fromCharCode(128|63&e)):(b+=String.fromCharCode(224|e>>12),b+=String.fromCharCode(128|63&e>>6),b+=String.fromCharCode(128|63&e));return b},_utf8_decode:function(a){for(var b="",d=0,e=c1=c2=0;d<a.length;)e=a.charCodeAt(d),128>e?(b+=String.fromCharCode(e),d++):191<e&&224>e?(c2=a.charCodeAt(d+1),b+=String.fromCharCode((31&e)<<6|63&c2),d+=2):(c2=a.charCodeAt(d+1),c3=a.charCodeAt(d+2),b+=String.fromCharCode((15&e)<<12|(63&c2)<<6|63&c3),d+=3);return b}};

        this.Crypto = _crypto;

        this.encode = function(value) {
            return this.Crypto.encode(value);
        };

        this.decode = function(value) {
            return this.Crypto.decode(value);
        };

        this.build = function(element,btnClass) {
            btnClass = (!$.trim(btnClass)) ? '' : btnClass;
            if($.trim(config.encoded)) {
                this._process(element,config.encoded,btnClass);
            } else {
                function parse_query_string(e){for(var o=e.replace("?","").split("&"),n={},t=0;t<o.length;t++){var d=o[t].split("="),p=decodeURIComponent(d[0]),r=decodeURIComponent(d[1]);if(void 0===n[p])n[p]=decodeURIComponent(r);else if("string"==typeof n[p]){var i=[n[p],decodeURIComponent(r)];n[p]=i}else n[p].push(decodeURIComponent(r))}return n}
                var link = parse_query_string(location.search)[config.paramName];
                if(link) {
                    this._process(element,link,btnClass);
                }
            }
        };

        this._process = function(element,encoded,btnClass) {
            var that = $(this);
            var that_el = $(element);
            var decoded = this.decode(encoded);
            if(config.timer) {
                function countDown1(){
                    t1--;
                    if(t1 > 0){
                        setTimeout(countDown1,1000);
                    }
                    if(t1==0){
                        that.html('');
                    } else {
                        that.html(config.firstTimerText+' '+t1);
                    }
                }
                function countDown2(){
                    t2--;
                    if(t2 > 0){
                        setTimeout(countDown2,1000);
                    }
                    if(t2==0){
                        that_el.html('');
                    } else {
                        that_el.html(config.secondTimerText+' '+t2);
                    }
                }
                setTimeout(countDown1,1000);
                setTimeout(function() {
                    that.append('<button id="_safelinkStart" class="'+btnClass+'">'+config.firstButtonText+'</button>');
                    $('#_safelinkStart').on('click', function() {
                        that.html('');
                        that_el.attr('tabindex','-1').css('outline','none').focus();
                        setTimeout(countDown2,1000);
                        setTimeout(function() {
                            that_el.append('<button id="_safelinkEnd" class="'+btnClass+'" onclick="location.href=\''+decoded+'\';">'+config.secondButtonText+'</button>');
                        },((config.timer_second + 2)*1000));
                    });
                },((config.timer_first + 2)*1000));
            } else {
                $(this).append('<button id="_safelinkStart" class="'+btnClass+'">'+config.firstButtonText+'</button>');
                $('#_safelinkStart').on('click', function() {
                    $(this).html('');
                    $(element).attr('tabindex','-1').css('outline','none').focus();
                    $(element).append('<button id="_safelinkEnd" class="'+btnClass+'" onclick="location.href=\''+decoded+'\';">'+config.secondButtonText+'</button>');
                });
            }
        }

        return this;
        
    };

})(jQuery);