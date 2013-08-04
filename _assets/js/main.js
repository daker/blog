$(document).ready(function () {

    var text = $('.post-field').text(),
        words = text.split(' ').length,
        wpm = 200,
        time = (words / wpm) * 60,
        minutes = Math.floor(time / 60),
        seconds = Math.floor(time - minutes * 60),
        content,
        posts,
        monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],
        exp,
        title,
        summary,
        link,
        pubDate,
        day,
        month,
        year,
        date,
        wrapper;

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


    $.ajax({
        url: '/feed.xml',
        dataType: 'xml',
        type: 'GET',
        success: function (xml) {
            posts = xml;
        },
        error: function () {
            console.log("I am sorry, But I can't fetch the RSS feed");
        }
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

    $(window).hashchange(function () {
        var keyword = location.hash.replace(/^#/, '');
        $(".posts").empty();

        $(posts).find('entry').each(function () {
            title = $(this).find("title").text();
            content = $(this).find("content").text();
            exp = new RegExp(keyword, "gi");

            if (title.match(exp) || content.match(exp)) {
                summary = $(this).find("summary").text();
                link = $(this).find("link").attr('href');
                pubDate = new Date($(this).find("updated").text());
                day = pubDate.getDate();
                month = monthNames[pubDate.getMonth()];
                year = pubDate.getFullYear();
                date = month + ' ' + day + ', ' + year;
                link = '<header class="post-header"><h1 itemprop="name headline" class="post-title"><a href="' + link + '">' + title + '</a></h1><time datetime="' + pubDate + '">' + date + '</time></header>';
                content = '<div class="post-content"><div class="post-content-inner"><div class="post-field body">' + summary + '</div></div></div>';
                wrapper = '<article class="post" itemscope itemtype="http://schema.org/BlogPosting">' + link + content + '</article>';
                $(".posts").append($(wrapper));
            }
        });

    });

    $('#q').keypress(function (e) {
        if (e.which == 13) {
            $(".posts").empty();
            var keyword = $(this).val();
            $(posts).find('entry').each(function () {
                title = $(this).find("title").text();
                content = $(this).find("content").text();
                exp = new RegExp(keyword, "gi");

                if (title.match(exp) || content.match(exp)) {
                    summary = $(this).find("summary").text();
                    link = $(this).find("link").attr('href');
                    pubDate = new Date($(this).find("updated").text());
                    day = pubDate.getDate();
                    month = monthNames[pubDate.getMonth()];
                    year = pubDate.getFullYear();
                    date = month + ' ' + day + ', ' + year;
                    link = '<header class="post-header"><h1 itemprop="name headline" class="post-title"><a href="' + link + '">' + title + '</a></h1><time datetime="' + pubDate + '">' + date + '</time></header>';
                    content = '<div class="post-content"><div class="post-content-inner"><div class="post-field body">' + summary + '</div></div></div>';
                    wrapper = '<article class="post" itemscope itemtype="http://schema.org/BlogPosting">' + link + content + '</article>';
                    $(".posts").append($(wrapper));
                }
            });
            e.preventDefault();
        }

    });

});