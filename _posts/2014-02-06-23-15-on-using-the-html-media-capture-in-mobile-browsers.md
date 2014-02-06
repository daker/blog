---
layout: post.html
title: On Using The HTML Media Capture in mobile browsers
tags: [html5]
---
Media Capture is one of the most interesting [features][0] in HTML5, especially for mobile devices, it allows you to access the camera and the microphone of the device. HTML Media Capture simply extends the ```<input>``` element with a capture attribute.

>The capture attribute is a boolean attribute that, if specified, indicates that the capture of media directly from the device's environment using a media capture mechanism is preferred.

The element can capture :

* An image
* A video sequence
* An audio sequence

## Capture image
To capture an image you need to set the ```accept="image/*"``` and the ```capture``` attributes, on the implementation on Chrome for Android is quite differente from to Firefox and Opera, Chrome opens the camera directly while the others opens a menu to select from diffrentes sources.

```html
<input type="file" accept="image/*" capture>
```

![](/assets/posts/media-capture/image-firefox.png) ![](/assets/posts/media-capture/image-chrome1.png) ![](/assets/posts/media-capture/image-chrome2.png)

## Capture video
To capture a video, ```accept="video/*"``` should be also set, same behaviour will happen for Chrome and Firefox.

```html
<input type="file" accept="video/*" capture>
```

![](/assets/posts/media-capture/video-firefox.png) ![](/assets/posts/media-capture/video-chrome1.png) ![](/assets/posts/media-capture/video-chrome2.png)

## Capture audio
To capture an audio sequence, you need to set ```audio/*``` as a value for the ```accept``` attribute, which will open the audio recorder application.

```html
<input type="file" accept="audio/*" capture>
```

![](/assets/posts/media-capture/audio-firefox.png) ![](/assets/posts/media-capture/audio-chrome1.png) ![](/assets/posts/media-capture/audio-chrome2.png)

I hope you'll like this post and you'll start using the HTML Media Capture in your webapps.

[0]: http://daker.me/2013/05/5-html5-features-you-need-to-know.html