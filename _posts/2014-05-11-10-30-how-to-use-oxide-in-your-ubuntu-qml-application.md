---
layout: post.html
title: How to use Oxide in your Ubuntu QML application
tags: [ubuntutouch, ubuntu, ubuntuplanet, oxide]
---
Oxide is a Qt5/QML binding based on the Chromium Content API, it's intended to [replace qtwebkit][0] for the touch browser, webapps and the UbuntuWebView.

![The Ubuntu Browser app](/assets/posts/ubuntu-browser.png)

So what does Oxide provide for developers ? It does provide a good chunk a usefull functions :

* Basic navigation
* Incognito mode
* Multiple browser contexts
* User scripts
* Message API
* Dialog support
* Accelerated compositing

## WebView

To declare a Webview using Oxide you need to use to components, ```WebView``` from ```com.canonical.Oxide```

```js
import com.canonical.Oxide 1.0
[...]
WebView {
    id: webview
    width: parent.width
    height: parent.height

    Component.onCompleted: {
        url = "http://daker.me"
    }
}
```

The ```WebView``` comes with a ```preferences``` property which allows to set a list of attributes :

* allowFileAccessFromFileUrls (bool)
* allowScriptsToCloseWindows  (bool)
* allowUniversalAccessFromFileUrls (bool)
* appCacheEnabled (bool)
* canDisplayInsecureContent (bool)
* canRunInsecureContent (bool)
* caretBrowsingEnabled (bool)
* databasesEnabled (bool)
* defaultEncoding (QString)
* defaultFixedFontSize (uint)
* defaultFontSize (uint)
* fixedFontFamily (QString)
* hyperlinkAuditingEnabled (bool)
* javascriptCanAccessClipboard (bool)
* javascriptEnabled (bool)
* loadsImagesAutomatically (bool)
* localStorageEnabled (bool)
* minimumFontSize (uint)
* objectName (QString)
* passwordEchoEnabled (bool)
* remoteFontsEnabled(bool)
* sanSerifFontFamily (QString)
* serifFontFamily (QString)
* shrinksStandaloneImagesToFit (bool)
* standardFontFamily (QString)
* tabsToLinks (bool)
* textAreasAreResizable (bool)
* touchEnabled  (bool)

### Example

```js
import com.canonical.Oxide 1.0
[...]
WebView {
    id: webview
    width: parent.width
    height: parent.height

    Component.onCompleted: {
        url = "http://daker.me"
    }

    preferences.localStorageEnabled: true
    preferences.loadsImagesAutomatically: false
    preferences.passwordEchoEnabled: true
}
```


## WebContext

Oxide also provides a ```WebContext``` which allow to set other settings

* acceptLangs (QString)
* cachePath (QUrl)
* cookiePolicy (CookiePolicy)
* dataPath (QUrl)
* objectName (QString)
* popupBlockerEnabled (bool)
* product (QString)
* sessionCookieMode
* storageAccessPermissionDelegate
* userAgent (QString)
* userAgentOverrideDelegate
* userScripts

This example shows how you can use the ```WebContext``` to override the default UserAgent

### UserAgent

```js
import com.canonical.Oxide 1.0
[...]
WebContext {
    id: webcontext
    userAgent: "Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3"
}

WebView {
    id: webview
    width: parent.width
    height: parent.height

    context: webcontext

    Component.onCompleted: {
        url = "http://www.whatsmyuseragent.com"
    }
}
```

### networkRequestDelegate

You can also override the http request headers by using the ```networkRequestDelegate```, in this example i am adding a [Do Not Track][1] (DNT) an HTTP header field on the fly.

```js
import com.canonical.Oxide 1.0
[...]
WebContext {
    id: webcontext
    networkRequestDelegate: WebContextDelegateWorker {
        source: Qt.resolvedUrl("dnt.js")
    }
}

WebView {
    id: webview
    width: parent.width
    height: parent.height

    context: webcontext

    Component.onCompleted: {
        url = "http://www.browserleaks.com/donottrack"
    }
}
```

```js
/*
 dnt.js
 Made by Adnane Belmadiaf <daker AT ubuntu DOT com>
*/

exports.onBeforeSendHeaders = function(event) {
    event.setHeader("DNT", 1);
};
```

### UserScripts

Oxide supports Greasemonkey-style user scripts, here is an example to do some DOM manipulation.

```js
import com.canonical.Oxide 1.0
[...]
WebContext {
    id: webcontext
    userScripts: [
        UserScript {
            context: "oxide://"
            url: Qt.resolvedUrl("oxide_dom.js")
            incognitoEnabled: true
            matchAllFrames: true
        }
    ]
}

WebView {
    id: webview
    width: parent.width
    height: parent.height

    context: webcontext

    Component.onCompleted: {
        url = "http://www.ubuntu.com/"
    }
}
```

```js
// ==UserScript==
// @name           Dom Manipulation
// @namespace      http://daker.me
// @description    Oxide UserScript demo
// ==/UserScript==

function oxide_dom() {
    var div = document.createElement('div');
    div.innerHTML = '<h1>Content inserted using Oxide UserScript!</h1>';
    div.style.color = 'red';
    document.getElementById("nav-global").insertBefore(div);
}

window.addEventListener('load', oxide_dom, true);
```

### Message API

Oxide does also provide a message API, in this example the script will send a message to Oxide on every request.

```js
import com.canonical.Oxide 1.0
[...]
WebContext {
    id: webcontext
    networkRequestDelegate: WebContextDelegateWorker {
        source: Qt.resolvedUrl("message-api.js")
        onMessage: console.log("Message from Oxide : ", message.msg)
        Component.onCompleted: {
            sendMessage({ msg: 'ping' })
        }
    }
}

WebView {
    id: webview
    width: parent.width
    height: parent.height

    context: webcontext

    Component.onCompleted: {
        url = "http://www.ubuntu.com/"
    }
}
```

```js
/*
 message-api.js
 This script will send a message to Oxide on every request
*/
var response_msg = "";

oxide.onMessage = function(msg) {
    if ("msg" in msg) {
        if (msg["msg"] == 'ping') {
            response_msg = "pong";
        }
    }
};

exports.onBeforeSendHeaders = function(event) {
    oxide.sendMessage({msg: response_msg});
};
```


Sure you can still use the UbuntuWebView

[0]: http://www.chriscoulson.me.uk/blog/?p=196
[1]: https://en.wikipedia.org/wiki/Do_Not_Track