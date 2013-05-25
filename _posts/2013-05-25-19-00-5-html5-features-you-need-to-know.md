---
layout: post.html
title: 5 HTML5 Features you need to know
tags: [html5]
---
HTML5 has been around for a while now, it introduces lots of new and exciting new JavaScript and HTML APIs for both mobile and desktop, so in this post you will discover some HTML5 features that will enhance your web apps and will save you a lot of time.

![HTML5 logo](/assets/posts/html5-logo.png)

## DNS Prefetching

DNS hostname resolution is one of the issues that can make any website slow. Modern browsers start to be very smart when it comes to DNS resolution, they try to resolve domain names then cache them before the user tries to follow any link on the webpage.

With the dns-prefetch feature you are allowed to manually control this operation by telling the browser which domain names to resolve :

``` html
<link rel="dns-prefetch" href="//fonts.googleapis.com">
<link rel="dns-prefetch" href="//google-analytics.com">
<link rel="dns-prefetch" href="//www.google-analytics.com">
<link rel="dns-prefetch" href="//platform.twitter.com">
```

## Link Prefetching

Link prefetching allows developers to specify pages or assets they want to silently preload once the page load, like loading the first search resulat :

``` html
<link rel="prefetch" href="http://daker.me/2013/05/hello-world.html" />
<link rel="prefetch" href="http://daker.me/assets/images/avatar.png" />
```

Combined with the pre-rendering feature will make your website even more faster, the browser will fetch and render the entire next page on the background and show it only when the user click on the link :

<iframe width="780" height="439" src="https://www.youtube.com/embed/_Jn93FDx9oI" frameborder="0" allowfullscreen></iframe>

## Download Attribute

The HTML5 download attribute allows developers to force a file to download rather than go to that specific page, you no longer need to rely on server side code to do that :

``` html
<a href="download_pdf.php?id=15" download="myfile.pdf">Download PDF</a>
```

## Regular Expressions

I know you'll fall in love with this feature, no more js or a server side code to check if the user's input is a valid email or url adress, with the pattern attribute you can use regular expressions directly :

``` html
<input type="email" pattern="[^ @]*@[^ @]*" value="">
```

## Datalist Element

Datalist element is a litle big addition, no more use of jQuery plugins for autocomplete inputs combined with a server side code that hit the database on each user keystroke :

``` html
<form action="form.php" method="post">
    <input list="cars" name="cars" >
    <datalist id="cars">
        <option value="Volvo">
        <option value="BMW">
        <option value="Bugatti">
        <option value="Cadillac">
        <option value="Chevrolet">
        <option value="Chrysler">
    </datalist>
    <input type="submit" />
</form>
```

I hope this will help you save time and enhance you coding skills, let me know your thoughts in the comments below.
