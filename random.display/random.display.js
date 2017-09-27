/*! https://github.com/naradesign/util/tree/gh-pages/random.display | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";

    $.fn.randomDisplay = function () {
        $(this.selector).each(function () {
            var $this = $(this),
                sum = $this.children().length;
            var pickOne = function () {
                $this.children().hide().eq( parseInt( Math.random()*sum ) ).show();
            };
            if ( sum > 1 ) {
                pickOne();
            }
        });
        return this;
    };

}(jQuery));
