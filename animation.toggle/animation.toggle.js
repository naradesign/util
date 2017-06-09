/*! https://github.com/naradesign/util/tree/gh-pages/animation.toggle | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";

    // 애니메이션을 토글하기 위한 함수.
    $.fn.animation = function( action, option ){
        var $this = this,
            option = option || {},
            animateKeepClass = option.animateKeepClass || "ani-open",
            animateShowClass = option.animateShowClass || "ani-show",
            animateHideClass = option.animateHideClass || "ani-hide",
            animateTime = option.animateTime || 360;

        // 액션 인자를 생략했거나, "show" 또는 "hide" 아닌 경우 "toggle"으로 설정.
        if ( !action || action !== "show" && action !== "hide" ) {
            action = "toggle";
        }

        // 애니메이션 종료.
        var clear = function( $this, state ){
            setTimeout(function () {
                if ( state === "show" ) {
                    $this.removeClass(animateShowClass);
                } else if ( state === "hide" ) {
                    $this.removeClass(animateKeepClass + " " + animateHideClass);
                }
            }, animateTime);
        };

        // 보여주기.
        var show = function ($this) {
            $this.addClass(animateKeepClass + " " + animateShowClass);
            clear($this, "show");
        };

        // 감추기.
        var hide = function ($this) {
            $this.addClass(animateHideClass);
            clear($this, "hide");
        };

        // 토글.
        var toggle = function ($this) {
            // 타겟의 토글 클래스 상태에 따라 애니메이션 실행.
            !$this.hasClass(animateKeepClass) ? show($this) : hide($this);
        };

        // action 인자에 따라 필요한 기능 실행.
        this.each(function () {
            var $this = $(this);
            if ( action === "toggle" ) {
                toggle($this);
            } else if ( action === "show" ) {
                show($this);
            } else if ( action === "hide" ) {
                hide($this);
            }
        });

        return this;

    };

}(jQuery));
