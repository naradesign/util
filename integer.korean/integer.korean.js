/*! https://github.com/naradesign/integer.korean/ | Copyright (c) 2017 ChanMyeong Jeong | Under the MIT license. */
;(function($){
    "use strict";

    // 금액 입력 시 우측 요소에 한글 금액 출력. maxlength 또는 최대 9,999,999,999 까지만 입력 가능.
    $.fn.integerKorean = function ( comma ) {
        var invalidInteger = /\D+|^0+/g;
        // 콤마를 추가할 때 사용하는 변수.
        var validRegex,
            addCommas;
        if ( comma ) {
            validRegex = /^[1-9](\d{1,2})?(,\d{3})*$/; // 유효한 정수 정규식.
            addCommas = function ( originValue ) { // 유효한 정수로 만든 다음 콤마를 추가해서 반환.
                return originValue.replace(invalidInteger, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',');
            };
        }
        // 한글을 추가할 때 사용하는 변수.
        var koreanUnitArr = [' ', '십', '백', '천', '만', '십', '백', '천', '억', '십']; // 입력받을 금액 단위가 99억보다 더 큰 경우에 이곳에 원소를 추가해야 한다.
        var digitToKorean = function ( digitValueStr ) {
            return digitValueStr // 숫자를 한글로 변환 후 배열에 담는다.
                .replace(/0/g, '영')
                .replace(/1/g, '일')
                .replace(/2/g, '이')
                .replace(/3/g, '삼')
                .replace(/4/g, '사')
                .replace(/5/g, '오')
                .replace(/6/g, '육')
                .replace(/7/g, '칠')
                .replace(/8/g, '팔')
                .replace(/9/g, '구')
                .split('');
        };
        var addKoreanUnit = function ( koreanValueArr ) { // 한글 배열에 십백천만억 단위를 붙여 새 배열 생성.
            return koreanValueArr.reverse().map(function (currentValue, index) {
                return currentValue + ( !!koreanUnitArr[index] && koreanUnitArr[index] );
            });
        };
        var removeGarbage = function ( outputValueArr ) { // 불필요한 문자를 제거한다.
            return outputValueArr.reverse().join('')
                .replace(/영\s|영십|영백|영천/g, '')
                .replace(/영억/g, '억')
                .replace(/영만/g, '만')
                .replace(/일십/g, '십')
                .replace(/일천/g, '천')
                .replace(/일백/g, '백')
                .replace(/억만/g, '억');
        };
        $(this.selector).each(function () {
            var $this = $(this),
                maxlength = $this.attr('maxlength')*1;
            var toKorean = function ( originValue ) {
                var digitValueStr = originValue.replace(/\D/g, ''), // 정수만 담기.
                    koreanValueArr = digitToKorean(digitValueStr), // 정수를 한글로 변환 후 배열에 담기.
                    outputValueArr = addKoreanUnit(koreanValueArr), // 한글 배열에 십백천만억 단위를 추가한 새 배열 생성.
                    outputValueStr = removeGarbage(outputValueArr); // 최종 출력할 문자열.
                $this.next().text( outputValueStr );
            };
            var inputUpdate = function () { // 인풋 업데이트.
                $this.on('keyup', function ( event ) {
                    var thisVal = event.target.value;
                    if ( !comma && invalidInteger.test(thisVal) ) { // 정수 아닌 값은 받지 않는다.
                        thisVal = thisVal.replace(invalidInteger, '');
                        $this.val(thisVal);
                    }
                    toKorean(thisVal); // 한글 출력.
                    !!comma && !!thisVal.length && !validRegex.test(thisVal) && $this.val( addCommas(thisVal) ); // 콤마 추가.
                    if ( (!comma && thisVal.length > maxlength) || (!!comma && event.target.value.length > maxlength) ) { // maxlength 보다 높은 금액을 잘라내 버린다.
                        $this.val( event.target.value.substr(0, maxlength) );
                        return false;
                    }
                }).trigger('keyup');
            };
            var textUpdate = function () { // 텍스트 업데이트.
                var thisText = $this.text();
                if ( !comma && invalidInteger.test(thisText) ) {
                    thisText = thisText.replace(invalidInteger, ''); // 정수 아닌 값은 받지 않는다.
                    $this.text(thisText);
                }
                !!thisText.length && toKorean(thisText);
                !!comma && !!thisText.length && !validRegex.test(thisText) && $this.text( addCommas(thisText) );
            };
            $this.is('input') ? inputUpdate() : textUpdate(); // 인풋인지 여부에 따라 다른 함수 실행.
        });
        return this;
    };

}(jQuery));
