(function() {
    "use strict";
    var lac = {};
    lac.toQWERTY = function(text, decode) {
        var map = {
            a: 'q', b: 'w', c: 'e',
            d: 'r', e: 't', f: 'y',
            g: 'u', h: 'i', i: 'o',
            j: 'p', k: 'a', l: 's',
            m: 'd', n: 'f', o: 'g',
            p: 'h', q: 'j', r: 'k',
            s: 'l', t: 'z', u: 'x',
            v: 'c', w: 'v', x: 'b',
            y: 'n', z: 'm'
        };
        if(decode) {
            map = (function() {
                var tmp = {};
                var k;
                for(k in map) {
                    if(!map.hasOwnProperty(k)) continue;
                    tmp[map[k]] = k;
                }
                return tmp;
            })();
        }
        return text.split('').filter(function(v) {
            return map.hasOwnProperty(v.toLowerCase());
        }).map(function(v) {
            return map[v.toLowerCase()].toUpperCase();
        }).join('');
    };

    lac.rotate = function(text, rotation) {
        var bound = 0x10000;
        rotation = parseInt(rotation) % bound;
        if(rotation === 0) return text;
        return String.fromCharCode.apply(null,
            text.split('').map(function(v) {
                return (v.charCodeAt() + rotation + bound) % bound;
            })
        );
    };

    lac.kR = function(text, key, reverse) {
        var bound = 0x10000;
        return String.fromCharCode.apply(null,
            text.split('').map(function(v, i) {
                var rotation = key[i % key.length].charCodeAt();
                if(reverse) rotation = -rotation;
                return (v.charCodeAt() + rotation + bound) % bound;
            })
        );
    };

    window.lac = lac;
})();

var obj = {
		key: "feasdfea", 
		ÇÑÊØÒ: ["alien","#9590a4"],
		ËÈÍÜÔÙÊ: ["eclipse","#dcd7d2"],
        ÌÑÐÔØ: ["float", "#ded6d1"],
		ÒÔÃæØØÔÔÏÙÚ: ["lobstrosity","#b86649"],
		ÚÚÏáÉÒ: ["tunnel","#393633"],
		"È×ÐâÏÙØÇØÛÉØÊ": ["shawshank","#393633"]
};


function getProperty(propertyName) {
    return obj[propertyName];
};

