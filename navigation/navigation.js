/*! https://github.com/naradesign/util/tree/gh-pages/navigation | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
	"use strict";

	var navigationArr = [], // 페이지에 존재하는 모든 네비게이션 선택자를 담을 배열.
		$navigationAll; // 페이지에 존재하는 모든 네비게이션 요소.

	$.fn.navigation = function ( direction ) { // 'hor' 또는 'ver' 키워드를 인자로 받는다.
		navigationArr.push( this.selector ); // 모든 선택자 종류 .gnb, .lnb ...
		$navigationAll = $( navigationArr.join() ); // 이 플러그인 메서드를 사용한 모든 요소를 jQuery 선택자로 담는다.
		var $navigation = $(this); // 네비게이션 요소.

		// 올바른 인자를 넣지 않으면 실행하지 않는다.
		if ( direction !== 'hor' && direction !== 'ver' ) {
			return false;
		} else if ( direction === 'hor' ) { // 수평 메뉴에 ._hor 클래스 세팅.
			$navigation.addClass('_hor');
		} else if ( direction === 'ver' ) { // 수직 메뉴에 ._ver 클래스 세팅.
			$navigation.addClass('_ver');
		}

		// 서브메뉴 있는 탭메뉴에 ._sub클 래스 세팅.
		$navigation.each(function () {
			var $this = $(this);
			$this.find('a+ul').length && $this.addClass('_sub');
		});

		// 메뉴 초기화 및 하이라이팅.
		var mark = function () {
			// 페이지 URL 업데이트 이후 location.href 값을 취해야 하기 때문에 setTimeout 으로 지연한다.
			setTimeout(function () {
				// 페이지에 존재하는 모든 네비게이션 링크를 업데이트.
				$navigationAll.find('a').each(function () {
					var $anchor = $(this);
					$anchor.html( $anchor.text() ).parent('li').removeClass('active');
					location.href.indexOf( $anchor.attr('href') ) > -1 && $anchor.wrapInner('<strong>').parentsUntil('nav', 'li').addClass('active');
				});
			}, 0);
		};
		mark();

		// 앵커 클릭으로 초기화.
		$navigation.on('click', 'a', function ( e ) {
			location.href.indexOf( $(this).attr('href') ) > -1 ? e.preventDefault() : mark();
		});

		// 수평 서브메뉴 롤오버.
		$navigation.filter('._hor._sub')
			.on('mouseenter', '>ul>li', function () {
				$(this).addClass('active').siblings('li').removeClass('active');
			})
			.on('mouseleave', mark)
			.on('focus', '>ul>li>a', function () {
				$(this).parent('li').trigger('mouseenter');
			})
			.on('focusout', function(){
				var $this = $(this);
				setTimeout( function () {
					$this.find(':focus').length === 0 && mark();
				}, 0);
			});

		// 수직 서브메뉴 클릭.
		$navigation.filter('._ver._sub').on('click', '>ul>li>a', function ( e ) {
			var $anchor = $(this),
				$next_ul = $anchor.next('ul'),
				$parent_li = $anchor.parent('li');
			if ( $next_ul.is(':hidden') ) {
				e.preventDefault();
				setTimeout(function () { // mark 함수 실행 이후 실행해야 한다.
					$next_ul.slideDown(200, function () {
						$parent_li.addClass('active');
					});
					$parent_li.siblings('li').find('>ul').slideUp(200, function () {
						$(this).parent('li').removeClass('active');
					});
				}, 0);
			}
		});
		return this;
	};
}(jQuery));
