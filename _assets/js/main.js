$(document).ready(function () {

    var text = $('.post-field').text(),
        words = text.split(' ').length,
        wpm = 200,
        time = (words / wpm) * 60,
        minutes = Math.floor(time / 60),
        seconds = Math.floor(time - minutes * 60),
        content = '';

    if (seconds > 0) {
        content = '<span title="' + words + ' words">' + minutes + ' mins and ' + seconds + ' secs</span>';
    } else {
        content = '<span title="' + words + ' words">' + minutes + ' minute</span>';
    }
    $('#readingtime').html(content);

    $(".post-field img").each(function () {
        if ($(this).attr("alt"))
            $(this).wrap('<figure class="post-image"></figure>')
                .after('<figcaption>' + $(this).attr("alt") + '</figcaption>');
    });

    $('#signup').submit(function () {
        // update user interface
        $('#response').html('Adding email address...');

        // Prepare query string and send AJAX request
        $.ajax({
            url: 'http://daker.us7.list-manage.com/subscribe/post-json?u=ebd280d4e0da7cce97bd7a8ad&id=327b2cec50&c=?',
            data: $(this).serialize(),
            type: 'GET',
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            error: function (err) {
                $('#response').html('<span style="color:#cc181e;">Could not connect to the registration server.</span>');
                $('#response').fadeIn();
            },
            success: function (data) {
                if (data.result != "success") {
                    $('#response').html('<span style="color:#cc181e;">' + data.msg + '</span>');
                    $('#response').fadeIn();
                } else {
                    $('#response').html('Almost finished... We need to confirm your email address.<br />To complete the subscription process, please click the link in the email we just sent you.');
                    $('#response').fadeIn();
                }
            }
        });

        return false;
    });
});