/*! https://github.com/naradesign/util/tree/gh-pages/tabmenu | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";

    $.fn.tabmenu = function () {
        var uri = location.href.replace(location.origin, ''); // 오리진을 제외한 URL '/index.html?search#hash'
        $(this.selector).find('a').each(function () { // .tab 메뉴 내부의 모든 a 요소를 순회.
            var $this = $(this),
                thisHref = $this.attr('href');
            uri.indexOf( thisHref ) > -1 && $this.parents('li').addClass('active').end().wrapInner('<strong>').find('>strong').attr('data-href', thisHref).unwrap('a');
            // a 요소의 href값과 uri가 일치하면 모든 조상 li 요소에 active 클래스 추가. strong요소를 넣고 thisHref값을 data 속성에 넣은 후 부모 a 요소는 제거.
        });
        return this;
    };

}(jQuery));
