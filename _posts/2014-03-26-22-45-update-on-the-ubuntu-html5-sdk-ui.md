---
layout: post.html
title: Update on the Ubuntu HTML5 SDK UI
tags: [ubuntu, ubuntuplanet]
---
As you may know HTML5 apps are first class citizens on Ubuntu, to acheive that the Ubuntu plateform provides a set of APIs and UI elements like the QML SDK, in this post i'll provide some updates on the HTML5 UI elements.

![Ubuntu loves HTML5](/assets/posts/ubuntu-html5.png)

<script type="text/javascript" src="https://apis.google.com/js/plusone.js"></script>

## Ubuntu Shape
The actual implementation is using an image as background with the pseudo class :after which is very limited the design team have suggested that we used a simple CSS border-radius for now, a proposal made by [Stuart Langridge][1].

## Swipe To delete
Last week-end i had to seat and work on this missing feature, it's still a work in progress since i need to finished the design of the API and how it should be declared.

<div class="g-post" data-href="https://plus.google.com/101694416703170881163/posts/auBU41xRHnB"></div>

## i18n
The first proposal was based on JSON files, but we thought that this will need a lot of work to be consistent with Launchpad translation infrastructure.

The HTML translation is done by using :

- data-i18n-translate : this is used to collect all the strings that needs be translated used by JavaScript and used for pot generation

```html
<h1 data-i18n-translate>Good Morning</h1>
```

- data-i18n-args : JSON data used to replace variables in the string, it only supports one level so far

```html
<h1 data-i18n-translate data-i18n-args='{ "user": "daker" }'>Good Morning {{ user }}</h1>
```

- data-i18n-plural : This is the plural string, here [Kyle][1] suggested that we hardcode the "n" counter used to determine if the string will be plural or not to "num", so the dev have to passe the "num" in the data-i18n-args instead of a proper data-i18n-n.

```html
<h1 data-i18n-translate data-i18n-plural="I have {{ num }} {{ brand }} cars" data-i18n-args='{ "num": "1", "brand": "Mercedes" }'>I have a {{ brand }} car</h1>
```

<div class="g-post" data-href="https://plus.google.com/101694416703170881163/posts/DpgEVUdcQJd"></div>

<div class="g-post" data-href="https://plus.google.com/101694416703170881163/posts/AY3k3BYbCSS"></div>

For the JS API, we will provide tree functions ```i18n.tr``` and ```i18n.dtr``` like in QML and a function to do string replacement ```i18n.strargs``` :

* tr(text);
* tr(singular, plural, int n);
* dtr(domain, text);
* dtr(domain, singular, plural, n);

```js
i18n.tr('Good Morning');
i18n.strargs(i18n.tr('Good Morning {{ user }}'), '{ "user": "daker" }'));
i18n.strargs(i18n.tr('I have a {{ brand }} car', 'I have {{ num }} {{ brand }} cars', '1'), '{ "num": "1", "brand": "Mercedes" }'));
```

## Grid Layout
I have tried to use the flexbox technique to provide a simple implementation of a grid layout by using data attributes :

* data-role="row" : To define a row
* data-role="column" : To define a column
* data-align="top, bottom, center" : To define the vertical alignment
* data-role="column" + data-offset="[10, 20, 25, 33, 34, 50, 66, 67, 75, 80, 90]" : To define the offset of the column
* data-role="column" + data-size="[10, 20, 25, 33, 34, 50, 66, 67, 75, 80, 90]" : To define the size of the column

If you want to helps us by contributing, by fixing [bugs][2] or share your opinions ping me "daker" or "alex-abreu" on #ubuntu-webapps channel on freenode.

[0]: https://plus.google.com/u/0/+StuartLangridge/posts
[1]: https://plus.google.com/u/0/+KyleNitzsche/posts
[2]: https://bugs.launchpad.net/ubuntu-html5-theme
