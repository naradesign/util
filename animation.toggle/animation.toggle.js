/*! https://github.com/naradesign/util/tree/gh-pages/animation.toggle | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";

    // 애니메이션을 "toggle", "show", "hide" 하기 위한 함수.
    $.fn.animation = function( obj ){

        if ( typeof obj !== "object" ) { // 객체가 아닌 경우 객체로 변환.
            obj = {};
        }

        var toggleStr   = "toggle",
            action      = obj.action     || toggleStr,
            liveClass   = obj.liveClass  || "ani-live",
            showClass   = obj.showClass  || "ani-show",
            hideClass   = obj.hideClass  || "ani-hide";

        // 애니메이션 종료.
        var clear = function( $i, state ){
            setTimeout(function () {
                if ( state === 1 ) {
                    $i.removeClass(showClass);
                } else if ( state === 2 ) {
                    $i.removeClass(liveClass + " " + hideClass);
                }
            }, obj.time || 360 );
        };

        // 보여주기.
        var show = function ($i) {
            $i.addClass(liveClass + " " + showClass);
            clear($i, 1);
        };

        // 감추기.
        var hide = function ($i) {
            $i.addClass(hideClass);
            clear($i, 2);
        };

        // 토글.
        var toggle = function ($i) {
            // 타겟의 토글 클래스 상태에 따라 애니메이션 실행.
            !$i.hasClass(liveClass) ? show($i) : hide($i);
        };

        // action 인자에 따라 필요한 기능 실행.
        this.each(function () {
            var $i = $(this);
            if ( action === toggleStr ) {
                toggle($i);
            } else if ( action === "show" ) {
                show($i);
            } else if ( action === "hide" ) {
                hide($i);
            }
        });

        return this;

    };

}(jQuery));
