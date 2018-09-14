/*! https://github.com/naradesign/util/tree/gh-pages/animation.toggle | Copyright (c) 2018 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    'use strict';

    // 애니메이션을 "toggle", "show", "hide" 하기 위한 함수.
    $.fn.animation = function( obj, callback ){

        if ( typeof obj !== "object" ) { // 객체가 아닌 경우 객체로 변환.
            obj = {};
        }

        const actionType    = obj.actionType;
        const liveClass     = obj.liveClass;
        const showClass     = obj.showClass;
        const hideClass     = obj.hideClass;
        const isLive        = this.hasClass(liveClass);

        // 보여주기.
        const show = () => {
            this.addClass(liveClass + ' ' + showClass);
        };

        // 감추기.
        const hide = () => {
            this.addClass(liveClass + ' ' + hideClass);
        };

        // 토글.
        const toggle = () => {
            isLive ? hide.call(this) : show.call(this);
        };

        this.each(() => {
            // actionType 인자에 따라 필요한 기능 실행.
            if ( actionType === 'show' && !isLive) {
                show.call(this);
            } else if ( actionType === 'hide' && isLive) {
                hide.call(this);
            } else if ( !actionType ) {
                toggle.call(this);
            }

            // 애니메이션 종료 후 클래스 처리.
            this.one('animationend webkitAnimationEnd', () => {
                this.hasClass(showClass) ? this.removeClass(showClass) : this.removeClass(liveClass + ' ' + hideClass);
                typeof callback === 'function' && callback.call(this);
            })
        });

        return this;

    };

}(jQuery));
