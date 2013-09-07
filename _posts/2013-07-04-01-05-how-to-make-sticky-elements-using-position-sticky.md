---
layout: post.html
title: How to make sticky elements using position sticky
tags: [css, webkit]
---

```position: sticky``` is a new CSS property that has [landed][0] in Webkit last year which will allow elements to stick to the viewport edge as you scroll past, unfortunately this hasn't been standardized yet but discussions are still going on.

# How does it work ?
By simply adding ```position: sticky```, you can tell an element to be ```position: relative``` until the user scrolls the item (or its parent) to be for ex 10px from the top, the actual way to achieve the same behaviour is by using Javascript :

<iframe width="100%" height="300" src="http://jsbin.com/omanut/2" allowfullscreen="allowfullscreen"></iframe>

and this is the CSS way:

```css
.sticky {
    position: -webkit-sticky;
    position: -moz-sticky;
    position: -ms-sticky;
    position: -o-sticky;
    position: sticky;
    top: 10px;
}
```

# How to enable it ?
The ```sticky``` value is still an experimental feature in Webkit, so you need to enable it in ```chrome://flags```, just Ctrl+F "Enable experimental WebKit features", then click enable.

![chrome://flags](/assets/posts/css-sticky.png)

# Demo

I have made a simple alphabetical contact list with sticky headers using HTML and CSS only!

<iframe width="100%" height="300" src="http://jsfiddle.net/daker/ecpTw/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>

<div class="browser-support">
    <dfn title="firefox" class="unsupported"><div>—</div></dfn>
    <dfn title="chrome"><div>23.0</div></dfn>
    <dfn title="opera" class="unsupported"><div>—</div></dfn>
    <dfn title="ie" class="unsupported"><div>—</div></dfn>
    <dfn title="safari"><div>7</div></dfn>
</div>

One thing you should remember is that this feature is just a proposal that can be standardized or not.

[0]: http://trac.webkit.org/changeset/126774