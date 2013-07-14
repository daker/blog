---
layout: post.html
title: Testing your responsive design with PhantomJS
tags: [nodejs, phantomjs]
---

User testing is an important aspect of the development process of any project, headless browsers can be great for automating and testing web pages programmatically, PhantomJS is a headless WebKit with JavaScript API, which mean that the rendered web pages are never actually displayed, just because PhantomJS is a browser but without a GUI.

![PhantomJS](/assets/posts/phantomjs.png)

## Installation

### Ubuntu
```sh
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo npm install -g phantomjs
```

### Mac OSX

```sh
$ brew install node
$ curl http://npmjs.org/install.sh | sh
$ npm install -g phantomjs
```

Now you should now have PhantomJS installed, you check that by running :
```$ phantomjs --version```

PhantomJS is very powerfull tool, it lets you manipulate pages, access page settings(prevent loading images, prevent running Javascript), accessing the filesystem, running Javascript and you can capture webpage, it can be coupled with other testing frameworks(like QUnitJS)

## Testing your responsive design
PhantomJS can capture the content of any webpage in PNG, JPEG, GIF or PDF file, it let's you set the viewport size, the zoom factor, the user-agent and more usefull stuff.

```js
/*
    requires: phantomjs, async
    usage: phantomjs capture.js
*/
var async = require('async'),
    sizes = [
        [320, 480],
        [320, 568],
        [600, 1024],
        [1024, 768],
        [1280, 800],
        [1440, 900]
    ];

function capture(sizes, callback) {
    var page = require('webpage').create();
    page.viewportSize = {
        width: sizes[0],
        height: sizes[1]
    };
    page.zoomFactor = 1;
    page.open('http://daker.me', function (status) {
        var filename = sizes[0] + 'x' + sizes[1] + '.png';
        page.render('./screenshots/' + filename);
        page.close();
        callback.apply();
    });
}

async.eachSeries(sizes, capture, function (e) {
    if (e) console.log(e);
    console.log('done!');
    phantom.exit();
});
```

I have coupled PhantomJS with [async.js][0] so i can take multiple screenshots, now all you need to do is to run ```phantomjs capture.js``` from the commandline, the good part is that PhantomJS will capture all the page not only the viewport.

![Responsive Design Screenshots](/assets/posts/phantomjs-demo.png)

**UPDATE 14/07/2013** : The script also works with [SlimerJS][1], SlimerJS similar to PhantomJs, except that it runs Gecko, the browser engine of Mozilla Firefox, instead of Webkit.

<blockquote class="twitter-tweet"><p>Testing your <a href="https://twitter.com/search?q=%23responsivedesign&amp;src=hash">#responsivedesign</a>? Take this script for PhantomJS and run it with SlimerJS <a href="http://t.co/wyqiIJustE">http://t.co/wyqiIJustE</a> by <a href="https://twitter.com/AdnaneBelmadiaf">@AdnaneBelmadiaf</a></p>&mdash; SlimerJS (@slimerjs) <a href="https://twitter.com/slimerjs/statuses/356172141277888513">July 13, 2013</a></blockquote>
<script async src="//platform.twitter.com/widgets.js" charset="utf-8"></script>

[0]: https://github.com/caolan/async
[1]: http://slimerjs.org/