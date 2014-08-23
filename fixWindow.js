/*
    fixWindow.js
    version 0.0.1
    
    Provides a function to toggle scrolling ability to scroll the window.

    Copyright 2014 Josh Bambrick
    http://joshbambrick.com/

    Github
    http://github.com/joshbambrick/fixWindow
    
    Licensed under the MIT license:
    http://www.opensource.org/licenses/mit-license.php

*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(this.$);
    }
}(function ($) {
    $.fixWindow = (function () {
        var previousHtmlOverflowY,
            previousBodyMarginRight,
            scrollBarWidth,
            $html = $('html'), $body = $('body'),
            getScrollbarWidth = function () {
                var $outer, widthNoScroll = 100, widthWithScroll;

                if (scrollBarWidth != null) return scrollBarWidth;

                // create outer div, set its width and force scrollbar (must append to body)
                $outer = $('<div>').css({visibility: 'hidden', width: widthNoScroll, overflow: 'scroll'}).appendTo('body');

                // add innerdiv and get its width (smaller due to the scrollbar)
                widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();

                $outer.remove();

                return (scrollBarWidth = widthNoScroll - widthWithScroll);
            };

        return function (enable) {
            // may be undefined
            if (enable !== false) {
                previousHtmlOverflowY = $html.css('overflow');
                previousBodyMarginRight = $html.css('marginRight');

                $html.css({overflowY: 'hidden'});
                $body.css({marginRight: getScrollbarWidth()});
            } else {
                $html.css({overflowY: previousHtmlOverflowY != null ? previousHtmlOverflowY : ''});
                $body.css({marginRight: previousBodyMarginRight != null ? previousBodyMarginRight : ''});
            }
        };
    })();
}));