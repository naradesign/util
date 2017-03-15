/*! https://github.com/naradesign/util/tree/gh-pages/maxlength | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";
    // 입력된 문자 수를 표시하고 입력 최댓값을 제한.
    var maxlengthChecker = function(){
        function check( event ) {
            var $this = $(this),
                $output = $this.next('output'),
                maxVal = 1 * $this.attr('maxlength') || $this.data('maxlength'), // 허용 최댓값.
                isNotType = [9,16,17,18,19,20,21,25,27,33,34,35,36,37,38,39,40,45,91,92,93,112,113,114,115,116,117,118,119,120,121,122,123,144,145]; // 문자 입력 아닌 키

            // textarea 이면 data-maxlength 속성을 이용해야 한다.
            // Chrome, Opera 에서는 textarea 줄 바꿈을 \r\n 두 개 문자열로 처리하기 때문에 maxlength 최댓값에 도달하기 전에 문자 입력이 제한되는 버그가 있다.
            // 따라서 textarea 요소에서는 maxlength 속성을 지우고 data-maxlength 속성으로 처리한다. 그리고 IE 8은 textarea 요소에서 maxlength 속성을 지원하지 않는다.
            $this.is('textarea') && $this.attr('data-maxlength', maxVal).removeAttr('maxlength');

            $output.text('( ' + $this.val().length + '/' + maxVal + ' )'); // 아웃풋 초기화.
            if ( $.inArray( event.keyCode, isNotType ) < 0 ) { // 문자 입력을 시도한 것이었다면...
                $this.off('keyup').one( 'keyup', function() { // 타이핑 이후.
                    var afterValue = $this.val(),
                        afterLength = afterValue.length;
                    afterLength > maxVal && ( afterLength = maxVal ); // 최댓값 보다 높은 값을 표시하지 않는다.
                    $output.text( '( ' + afterLength + '/' + maxVal + ' )' ); // 아웃풋 업데이트.
                    if ( afterValue.length > maxVal ) { // 초과 입력을 시도할 때 알럿을 띄우거나 초과 입력을 차단.
                        $this.blur().focus().val( afterValue.substr(0, maxVal) ).addClass('_not_valid'); // blur 후 다시 focus 하는 이유는 초과 입력 시 IE 8이 afterValue 값을 잘못 채워넣는 버그 때문.
                        setTimeout( function(){
                            $this.removeClass('_not_valid');
                        }, 1500);
                    }
                });
            }
        }
        $('output').prev('[maxlength]').addClass('_max_checker'); // maxlength 속성과 함께 output 요소가 뒤따르는 경우에만 클래스 추가.
        $(document).off( 'keydown', '._max_checker', check ).on( 'keydown', '._max_checker', check ); // 이벤트 바인딩.
        $( '._max_checker' ).trigger( 'keydown' ); // 초기값 설정 위한 트리거.
    };
    maxlengthChecker();
}(jQuery));
