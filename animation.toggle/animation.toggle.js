/*! https://github.com/naradesign/util/tree/gh-pages/animation.toggle | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";

    // 애니메이션을 제어하기 위한 함수.
    var animationToggle = function( targetElement, option ){

        var $targetElement = typeof targetElement === "string" ? $(targetElement) : targetElement,
            option = option || {},
            toggleClass = option.toggleClass || "show",
            animateShowClass = option.animateShowClass || "ani-show",
            animateHideClass = option.animateHideClass || "ani-hide",
            animateTime = option.animateTime || 360;

        // 애니메이션 종료.
        var clear = function( state ){
            setTimeout(function () {
                if ( state === "show" ) {
                    $targetElement.removeClass(animateShowClass);
                } else if ( state === "hide" ) {
                    $targetElement.removeClass(toggleClass + " " + animateHideClass);
                }
            }, animateTime);
        };

        // 보여주기.
        var show = function () {
            $targetElement.addClass(toggleClass + " " + animateShowClass);
            clear("show");
        };

        // 감추기.
        var hide = function () {
            $targetElement.addClass(animateHideClass);
            clear("hide");
        };

        // 타겟의 토글 클래스 상태에 따라 애니메이션 실행.
        !$targetElement.hasClass(toggleClass) ? show() : hide();

    };

    window.animationToggle = animationToggle;

}(jQuery));
