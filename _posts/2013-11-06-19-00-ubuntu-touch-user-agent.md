---
layout: post.html
title: Ubuntu Touch User-Agent
tags: [utouchdev, ubuntuplanet]
---
With the launch of [Ubuntu Touch][0] v1.0, the OS now ships its own QtWebKit based browser which will be replaced by [Oxide][1] a Chromium-powered webview by 14.04. There has been a lot of [discussions][2] arround the user-agent because many large sites(Facebook, Google, Twitter, Yahoo etc..) are sniffing the UA(for iPhone or Android tokens) to serve the mobile version of the site.

Adding an Android or iPhone token will lead to unwanted behaviours, like showing ads for the Android app or even trying to open the Google Play app or the Youtube app. The browser now reports it in the following formats, depending on whether the device is a phone or a tablet, with the addition of an [override mechanism][3] that will override the UA on the fly and the site will serve us a proper mobile content.

![Facebook Android Ads](/assets/posts/utouch/1.png)

## Phone

```sh
Mozilla/5.0 (Ubuntu; Mobile) WebKit/537.21
```

## Tablet

```sh
Mozilla/5.0 (Ubuntu; Tablet) WebKit/537.21
```

## Pattern

```sh
Mozilla/5.0 (Ubuntu; $FormFactor) WebKit/$WebKitRev
```

You can also get it through JavaScript using the ```navigator.userAgent```

![Using the console](/assets/posts/utouch/2.png)

So if you are doing UA sniffing it's really better to look for "Mobile" rather than looking the OS identifier.

[0]: http://www.ubuntu.com/phone/install
[1]: https://launchpad.net/oxide
[2]: https://bugs.launchpad.net/webbrowser-app/+bug/1179596
[3]: https://bazaar.launchpad.net/~phablet-team/webbrowser-app/trunk/view/head:/src/Ubuntu/Components/Extras/Browser/ua-overrides.js