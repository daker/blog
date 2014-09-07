---
layout: post.html
title: Everything you need to know about HTML5 Video
tags: [html5]
---
The HTML5 built-in video support has come to a state where it starts to be adopted by the big players on a large scale(Youtube, Netflix). In this article i'll provide some details of HTML5 video element so you can start using it.

![Chromium HTML5 Video player](/assets/posts/html5-video/cover.jpg)

here is a basic declaration of HTML5 video player :

```html
<video src="videofile.ogg">
  Sorry, your browser doesn't support embedded videos,
  but don't worry, you can <a href="videofile.ogg">download it</a>
  and watch it with your favorite video player!
</video>
```

## Controls
The video element provides a boolean attribute ```control``` that makes the controls visible or not to the user.

```html
<video src="videofile.ogg" controls>
</video>
```

![Chrome](/assets/posts/html5-video/controls-chrome.png)

![Firefox](/assets/posts/html5-video/controls-ff.png)

![Safari](/assets/posts/html5-video/controls-safari.png)

## Poster
When you want to watch a video on the Web, normally a single frame of the video will display in order to provide a preview of its content. The ```poster``` attribute makes it easy to specify an image file.

```html
<video src="videofile.ogg" poster="poster.jpg" controls>
</video>
```

## Preload
The browser needs allowed to download a small chunk of the media to get the duration & the first frame, the ```preload``` attribute has the tree states to tell the browser what to do :

 * "none" does not buffer the file
 * "auto" buffers the media file
 * "metadata" loads enough to determine duration & the first fame

## Loop
When present, this attribute will tell the browser to seek back to the start of the media resource once the end is reached.

```html
<video src="videofile.ogg" poster="poster.jpg" controls loop>
</video>
```

## Sources
Multiple source files can be specified using the ```<source>``` element in order to provide video in different formats for different browsers. If you're providing source elements, there’s no need to specify a ```src``` for your video.

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogv" type="video/ogg">
</video>
```
More details about codecs & video type for each browser can be found [here][0]

## Subtitles
The video element allows you set subtitles in different languages using the ```track``` element.

```html
<video controls>
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogv" type="video/ogg">
    <track label="English" src="captions-en.vtt" kind="subtitles" srclang="en"></track>
    <track label="Deutsch" src="captions-de.vtt" kind="subtitles" srclang="de"></track>
    <track label="한국어 (Korean)" src="captions-ko.vtt" kind="subtitles" srclang="ko"></track>
    <track label="Português" src="captions-pt.vtt" kind="subtitles" srclang="pt"></track>
    <track label="Türkçe (Turkish)" src="captions-tr.vtt" kind="subtitles" srclang="tr"></track>
</video>
```
A detailed docs on the ```track``` element can be found on [MDN][1]

## oncanplay
The ```oncanplay``` attribute is very useful, it can be used to serve a fallback if the browser doesn't have capability to play HTML5 video

```html
<video controls oncanplay="handler()">
    <source src="video.mp4" type="video/mp4">
    <source src="video.webm" type="video/webm">
    <source src="video.ogv" type="video/ogg">
</video>
```

## JavaScript API
The video element can be controlled via a JavaScript API to do all kind of stuf that can be done via the GUI, here are some examples :

```javascript
var video = document.getElementsByTagName("video")[0];
/* Play the video */
video.play();
/* Set the volume to 50% */
video.volume = 0.5;
/* Pause the video */
video.pause();
/* Restart the video */
video.currentTime = 0;
```

Sure the list of APIs is long that can help you build your HTML5 video player, finally i hope that this small introduction will be helpfull for you.

[0]: https://developer.mozilla.org/en-US/docs/Web/HTML/Supported_media_formats
[1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/track