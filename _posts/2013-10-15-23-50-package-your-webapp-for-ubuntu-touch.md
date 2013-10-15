---
layout: post.html
title: Package your Webapp for Ubuntu Touch
tags: [utouchdev, ubuntuplanet]
---
Last week i discovered a HTML5 game called "[X-Type][0]", which is basically a free dual stick shooter with endless boss battles. Unfortunately this game does only work on iOS and Android and it does use the UA sniffing mechanism to serve both desktop and mobile versions, and using the Ubuntu Touch user-agent it will only serve the desktop version which will not work on the phone.

![X-Type running on Ubuntu Touch](/assets/posts/xtype/xtype.png)

First using the Qt Creator you have to create a "HTML5 Touch UI" project which will produce the following QML code :

```js
import QtQuick 2.0
import Ubuntu.Components 0.1
import QtWebKit 3.0

MainView {
    objectName: "mainView"
    applicationName: "com.ubuntu.developer.daker.x-type"
    automaticOrientation: true

    width: units.gu(100)
    height: units.gu(75)

    Flickable {
        id: webViewFlickable
        anchors.fill: parent

        WebView {
            id: webView
            anchors.fill: parent
            url: "http://phoboslab.org/xtype/"
        }
    }
}
```

The problem with using the QtWebKit Webview is that the device-pixel-ratio (DPR) is not set automatically causing the content of the Webview to not scale correctly, so you'll need to get the corresponding value for your device from the ```QTWEBKIT_DPR``` environment variable, there actually no way to read those variables using QML so you'll need to use some C++ code to read the ```QTWEBKIT_DPR``` and passe it to QML so the content of the WebView will scale accordingly.

The Ubuntu Touch Browser Plugin provides a component called ```UbuntuWebView```, it uses some kind of UA overrides to bypass the UA sniffing used to serve the mobile version of webapp(Gmail, G+, Facebook, Twitter, etc...) and changes the UA on the fly, unfortunately there was no way to set your own UA using the ```UbuntuWebView``` but now you can since this [bug #1237365][1] has been fixed.

Also with the ```UbuntuWebView``` the ```DPR``` weren't set automatically([bug #1237348][2]), it was also fixed and all those fixes has been shipped with image #96.

Here is the QML code i used to embed the "X-Type" game(Fullscreen) but first you need to install the browser plugin :

```sh
$ sudo apt-get install qtdeclarative5-ubuntu-ui-extras-browser-plugin
```

```js
import QtQuick 2.0
import Ubuntu.Components 0.1
import Ubuntu.Components.Extras.Browser 0.1


MainView {
    objectName: "mainView"
    applicationName: "com.ubuntu.developer.daker.x-type"
    //automaticOrientation: true

    width: units.gu(50)
    height: units.gu(75)

    UbuntuWebView {
        anchors.fill: parent
        url: "http://phoboslab.org/xtype/"
        /* This function is used to override the UA */
        function getUAString(url) {
            return "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3"
        }
    }
}
```

you need to create a manifest file ```manifest.json``` :

```json
{
    "description": "A Free HTML5 Dual Stick Shooter",
    "framework": "ubuntu-sdk-13.10",
    "architecture": "all",
    "hooks": {
        "x-type": {
            "apparmor": "x-type.json",
            "desktop": "x-type.desktop"
        }
    },
    "maintainer": "Adnane Belmadiaf <daker@ubuntu.com>",
    "name": "com.ubuntu.developer.daker.x-type",
    "title": "X-Type",
    "version": "0.4"
}
```

the security policy groups ```x-type.json```

```json
{
    "policy_groups": [
        "networking"
    ],
    "policy_version": 1
}
```

and a .desktop file :

```js
[Desktop Entry]
Name=x-type
Comment=A Free HTML5 Dual Stick Shooter
Exec=qmlscene $@ x-type.qml
Icon=./x-type.png
Terminal=false
Type=Application
X-Ubuntu-Touch=true
```

you need to add the icon and now all you have to do is to build the click package using ```click build .```and [upload][3] it to the store. I have also packaged another HTML5 game called [BytesJack][4] using the same method, the source code of both games can be found [here][5] and [here][6].

Happy hacking!

[0]: http://phoboslab.org/xtype/
[1]: https://bugs.launchpad.net/webbrowser-app/+bug/1237365
[2]: https://bugs.launchpad.net/webbrowser-app/+bug/1237348
[3]: https://myapps.developer.ubuntu.com/dev/click-apps/new/
[4]: http://heliom.github.io/bytesjack/
[5]: https://bazaar.launchpad.net/~daker/+junk/x-type/files
[6]: https://bazaar.launchpad.net/~daker/+junk/bytesjack/files