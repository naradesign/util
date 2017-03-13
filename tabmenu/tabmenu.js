/*! https://github.com/naradesign/util/tree/gh-pages/tabmenu | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";

    $.fn.tabmenu = function () {
        $(this).each(function () {
            var $tabmenu = $(this); // 선택한 탭 메뉴.
            // 서브메뉴 있는 탭메뉴에 클래스 추가.
            $tabmenu.find('a+ul').length && $tabmenu.addClass('_sub');
            // 메뉴 초기화 및 하이라이팅.
            var mark = function () {
                // 페이지 URL 업데이트 이후 location.href 값을 취해야 한다.
                setTimeout(function () {
                    $tabmenu.find('a').each(function () {
                        var $anchor = $(this);
                        $anchor.html( $anchor.text() ).parent('li').removeClass('active');
                        location.href.indexOf( $anchor.attr('href') ) > -1 && $anchor.wrapInner('<strong>').parentsUntil('nav', 'li').addClass('active');
                    });
                }, 0);
            };
            // 앵커 클릭으로 초기화.
            $tabmenu.on('click', 'a', mark).find('a').trigger('click');

            // 서브메뉴 롤오버 기능.
            var submenu = function () {
                $tabmenu
                    .on('mouseenter', '>ul>li', function () {
                        $(this).addClass('active').siblings('li').removeClass('active');
                    })
                    .on('mouseleave', mark)
                    .on('focus', '>ul>li>a', function () {
                        $(this).parent('li').trigger('mouseenter');
                    })
                    .on('focusout', function(){
                        setTimeout(function () {
                            $tabmenu.find(':focus').length === 0 && mark();
                        }, 0);
                    });
            };
            $tabmenu.hasClass('_sub') && submenu();
        });
        return this;
    };

}(jQuery));
