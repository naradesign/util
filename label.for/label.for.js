jQuery(function ($) {
    // :checkbox :radio 요소의 id와 인접 형제 label 요소의 for 속성을 맵핑해 줌.
    var labelFor = function(){
        $('input:checkbox, input:radio').each(function(){
            var $input = $(this),
                $label = $input.next('label'),
                originalValue = $input.attr('id'), // input 요소의 id 초기 값.
                newValue = 'i' + Math.round(Math.random() * 10000); // 0~9999 사이의 난수 생성.
            // input 요소에 id 속성이 없거나 값이 없을 때 양쪽 모두 새 값을 세팅.
            if( !$input.is('[id]') || !originalValue.length ){
                $input.attr('id', newValue);
                $label.attr('for', newValue);
            // input 요소에 id 값이 있지만 for 값과 일치하지 않을 때 id 값을 for 값으로 세팅.
            } else if ( originalValue !== $label.attr('for') ) {
                $label.attr('for', originalValue);
            }
        });
    };
    labelFor();
});
