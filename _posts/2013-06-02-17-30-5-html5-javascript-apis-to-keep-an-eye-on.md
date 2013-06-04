---
layout: post.html
title: 5 HTML5 Javascript APIs to keep an eye on
tags: [html5, javascript]
---
In my [last post][0], i have talked about HTML5 APIs, so thought it will also interesting to write about some new <strike>old</strike> Javasript APIs. Since CSS has been improving over the time and today you can achieve what was only done with Javascript with CSS only, on the other side Javascript have to improve and follow the evolution, so today Javascript can do a lot of things, like accessing hardware(camera, microphone, gamepad, GPU), accessing the filesystem and websocket.

## Battery Status API
The [Battery Status API][1] allows any webpage to inspect the state of the device's (Laptop, phone or tablet) battery through javascript :

``` js
var battery = navigator.battery || navigator.webkitBattery || navigator.mozBattery

console.log("Battery charging: ", battery.charging); // true
console.log("Battery level: ", battery.level); // 0.58
console.log("Battery discharging time: ", battery.dischargingTime);
```
As you can see you need to do more checks to make your code cross-browser compatible, i have done some researches and i have found [battery.js][3] a tiny wrapper for the Battery Status API :

``` js
if(Battery.isSupported()) {
    // Get the battery status
    var status = Battery.getStatus();
    console.log('Level: ' + Math.floor(status.level * 100) + '%'); // 30%
    console.log('Charging: ' + status.charging);                   // true
    console.log('Time until charged: ' + status.chargingTime);     // 3600 (seconds) or Infinity
    console.log('Battery time left: ' + status.dischargingTime);   // 3600 (seconds) or Infinity

    // Register a handler to get notified when battery status changes
    Battery.onUpdate = function(status) {
        console.log(status); // {level, charging, chargingTime, dischargingTime}
    };
}
```
<div class="browser-support">
    <dfn title="firefox"><div>16.0</div></dfn>
    <dfn title="chrome"><div>19</div></dfn>
    <dfn title="opera" class="unsupported"><div>—</div></dfn>
    <dfn title="ie" class="unsupported"><div>—</div></dfn>
    <dfn title="safari" class="unsupported"><div>—</div></dfn>
</div>

## Gamepad API

Gamepad API allows you to connect your console gamepad into your computer and use it for browser based games. With the increase in popularity of HTML5 games this API will have a prominent future.

``` js
navigator.gamepads = navigator.webkitGamepads || navigator.MozGamepads;

var requestAnimationFrame = window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame;
var cancelAnimationFrame = window.webkitCancelAnimationFrame ||
                           window.MozCancelAnimationFrame;

var controllers = {}; // Stash connected controllers.
var reqId = null;

function onConnected(e) {
    controllers[e.gamepad.index] = e.gamepad;
    runAnimation();
}

function onDisconnected(e) {
    delete controllers[e.gamepad.index];
    cancelAnimationFrame(reqId);
}

window.addEventListener('webkitgamepadconnected', onConnected, false);
window.addEventListener('webkitgamepaddisconnected', onDisconnected, false);

window.addEventListener('MozGamepadDisconnected', onDisconnected, false);
window.addEventListener('MozGamepadConnected', onConnected, false);
```
Source : [The Edge of HTML5][12]

<div class="browser-support">
    <dfn title="firefox"><div>3.6</div></dfn>
    <dfn title="chrome"><div>21</div></dfn>
    <dfn title="opera" class="unsupported"><div>—</div></dfn>
    <dfn title="ie" class="unsupported"><div>—</div></dfn>
    <dfn title="safari" class="unsupported"><div>—</div></dfn>
</div>

There is a library called [gamepadjs][9], which will let you use this API very easily.

## Device Orientation API

Using device orientation, you can determine the orientation of the device as well as gather information about its movement (alpha, beta and gamma).

![Source html5rocks.com](/assets/posts/deviceorientation.png)


``` js
if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(event) {
        var a = event.alpha,
            b = event.beta,
            g = event.gamma;
        console.log('Orientation - Alpha: ' + a + ', Beta: '+ b + ', Gamma: ' + g);
    }, false);
} else {
    console.log('This device does not support deviceorientation');
}
```

<div class="browser-support">
    <dfn title="firefox" class="unsupported"><div>—</div></dfn>
    <dfn title="chrome"><div>7.0</div></dfn>
    <dfn title="opera"><div>15.0</div></dfn>
    <dfn title="ie" class="unsupported"><div>—</div></dfn>
    <dfn title="safari" class="unsupported"><div>—</div></dfn>
</div>

To use this feature your device must have gyroscope capabilities, more about browser support can be found on [caniuse.com][4].


## Geolocation API

The [Geolocation API][6] lets you share your location with trusted web sites. The latitude and longitude are available to JavaScript on the page, which in turn can send it back to the remote web server and do fancy location-aware things like finding local businesses or showing your location on a map, it can be also used for "geo-tagging" user's content like photos.

```js
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
        var lat = position.coords.latitude,
            lon = position.coords.longitude;
        console.log('Geolocation - Latitude: '+ lat +', Longitude: '+ lon);
    });
}
else {
    console.log('Geolocation is not supported for this Browser/OS version yet.');
}
```

<div class="browser-support">
    <dfn title="firefox"><div>3.5</div></dfn>
    <dfn title="chrome"><div>5.0</div></dfn>
    <dfn title="opera"><div>10.6</div></dfn>
    <dfn title="ie"><div>9.0</div></dfn>
    <dfn title="safari"><div>5.0</div></dfn>
</div>

More about browser support can be found on [caniuse.com][5].

## Page Visibility API

The [Page Visibility API][7] let's you determine if your page is visible or not, when you minimise the page or move to another tab, a visibilitychange event is triggered, this can be very useful if you are a game developer this will allow you to pause the game when the user change the page.

```js
document.addEventListener('visibilitychange', function(e) {
    console.log('hidden:' + document.hidden,
              'state:' + document.visibilityState)
}, false);
```

<div class="browser-support">
    <dfn title="firefox"><div>10.0</div></dfn>
    <dfn title="chrome"><div>14.0</div></dfn>
    <dfn title="opera"><div>12.1</div></dfn>
    <dfn title="ie"><div>10.0</div></dfn>
    <dfn title="safari" class="unsupported"><div>—</div></dfn>
</div>

More about browser support can be found on [caniuse.com][8].

Let me know your thoughts in the comments below, also you can discuss, upvote this post over at [Hacker News][10].

[0]: http://daker.me/2013/05/5-html5-features-you-need-to-know.html
[1]: http://www.w3.org/TR/battery-status/
[3]: https://github.com/pstadler/battery.js/
[2]: https://github.com/sgraham/gamepad.js/
[4]: http://caniuse.com/deviceorientation
[5]: http://caniuse.com/geolocation
[6]: http://dev.w3.org/geo/api/
[7]: http://www.w3.org/TR/page-visibility/
[8]: http://caniuse.com/pagevisibility
[9]: http://www.gamepadjs.com/
[10]: https://news.ycombinator.com/item?id=5809719
[12]: https://html5-demos.appspot.com/static/html5-therealbleedingedge/template/index.html#27