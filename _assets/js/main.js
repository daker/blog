$(document).ready(function(){

    var text = $('.post-field').text(),
        words = text.split(' ').length,
        wpm = 200,
        time = (words / wpm) * 60,
        minutes = Math.floor(time / 60),
        seconds = Math.floor(time - minutes * 60),
        content = '';

    if (seconds > 0) {
        content = '<span title="'+ words +' words">' + minutes + ' mins and ' + seconds + ' secs</span>';
    }
    else {
        content = '<span title="'+ words +' words">' + minutes+ '</span>';;
    }
    $('#readingtime').html(content);

    $(".post-field img").each(function() {
        if($(this).attr("alt"))
            $(this).wrap('<figure class="post-image"></figure>')
                .after('<figcaption>'+$(this).attr("alt")+'</figcaption>');
    });
})