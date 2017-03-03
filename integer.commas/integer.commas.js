/*! https://github.com/naradesign/integer.commas/ | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";

    // 인풋 또는 텍스트 값을 유효한 정수로 만든 후 콤마 삽입.
    $.fn.integerCommas = function(){
        var validRegex = /^[1-9](\d{1,2})?(,\d{3})*$/; // 유효한 정수 정규식.
        var addCommas = function ( originValue ) { // 유효한 정수로 만든 다음 콤마를 추가해서 반환.
            return originValue.replace(/\D+|^0+/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        };
        $(this.selector).each(function ( index ) {
            var $this = $(this);
            var inputUpdate = function () { // 인풋 업데이트.
                $this.on('keyup', function () {
                    var thisVal = $this.val();
                    !!thisVal.length && !validRegex.test(thisVal) && $this.val( addCommas(thisVal) );
                }).trigger('keyup');
            };
            var textUpdate = function () { // 텍스트 업데이트.
                var thisText = $this.text();
                !!thisText.length && !validRegex.test(thisText) && $this.text( addCommas(thisText) );
            };
            $this.is('input') ? inputUpdate() : textUpdate();
        });
    };

}(jQuery));
