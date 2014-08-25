$(document).ready(function () {

    var content,
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

    var userAgent = navigator.userAgent.toString().toLowerCase();
    if(userAgent.indexOf("ubuntu; mobile") > -1 | userAgent.indexOf("ubuntu; tablet") > -1) {
        alert("Oh! it appears that you are running Ubuntu Touch, maybe you'll be interested in using my radio streaming app, just go to the Dash search for 'Rad.io' and enjoy your favorite radio station :]");
    }

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

    $(window).hashchange(function () {
        var keyword = location.hash.replace(/^#/, '');

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
        $(".posts").empty();

        $(posts).find('entry').each(function () {
            title = $(this).find("title").text();
            content = $(this).find("content").text();
            exp = new RegExp(keyword, "gi");

            if (title.match(exp) || content.match(exp)) {
                summary = $(this).find("summary").text();
                url = $(this).find("link").attr('href');
                pubDate = new Date($(this).find("updated").text());
                day = pubDate.getDate();
                month = monthNames[pubDate.getMonth()];
                year = pubDate.getFullYear();
                date = month + ' ' + day + ', ' + year;
                link = '<header class="post-header"><h2 itemprop="name headline" class="post-title"><a href="' + url + '">' + title + '</a></h2><time class="post-meta-pubdate" datetime="' + pubDate + '">' + date + '</time></header>';
                content = '<div class="post-content"><div class="post-content-inner"><div class="post-field body">' + summary + ' <a class="post-more" href="'+ url +'">Continue Reading</a></div></div></div>';
                wrapper = '<article class="post" itemscope itemtype="http://schema.org/BlogPosting">' + link + content + '</article>';
                $(".posts").append($(wrapper));
            }
        });

    });

    $('#q').keypress(function (e) {
        if (e.which == 13) {
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
            $(".posts").empty();
            var keyword = $(this).val();
            $(posts).find('entry').each(function () {
                title = $(this).find("title").text();
                content = $(this).find("content").text();
                exp = new RegExp(keyword, "gi");

                if (title.match(exp) || content.match(exp)) {
                    summary = $(this).find("summary").text();
                    url = $(this).find("link").attr('href');
                    pubDate = new Date($(this).find("updated").text());
                    day = pubDate.getDate();
                    month = monthNames[pubDate.getMonth()];
                    year = pubDate.getFullYear();
                    date = month + ' ' + day + ', ' + year;
                    link = '<header class="post-header"><h2 itemprop="name headline" class="post-title"><a href="' + url + '">' + title + '</a></h2><time class="post-meta-pubdate" datetime="' + pubDate + '">' + date + '</time></header>';
                    content = '<div class="post-content"><div class="post-content-inner"><div class="post-field body">' + summary + ' <a class="post-more" href="'+ url +'">Continue Reading</a></div></div></div>';
                    wrapper = '<article class="post" itemscope itemtype="http://schema.org/BlogPosting">' + link + content + '</article>';
                    $(".posts").append($(wrapper));
                }
            });
            e.preventDefault();
        }
    });
});