/*! https://github.com/naradesign/integer-with-commas.js | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";

    // 정수 입력 시 콤마 삽입.
    $.fn.integerWithCommas = function( eventName ){ // keyup, focusout 등을 인자로 받는다.
        var selector = this.selector; // 이 함수를 적용할 선택자.
        $(document).off(eventName, selector).on( eventName, selector, function ( event ) {
            var $this = $(event.target),
                contextValue = $this.context.value;
            contextValue.length > 3 && $this.val( contextValue.replace(/\D|^0|^\s/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',') );
            // 숫자 아니거나, 0으로 시작하거나, 공백으로 시작하면 해당 문자를 삭제.
            // 숫자 세 자리가 연속으로 등장하는 경우 앞 부분 경계 지점에 콤마 삽입.
        });
        $(selector).each(function () {
            this.value.length > 3 && $(this).trigger( eventName ); // 이미 값이 입력된 인풋이 존재하는 경우 실행.
        });
    };

}(jQuery));
