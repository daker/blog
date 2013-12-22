---
layout: post.html
title: Introduction to Web Components, the Next Generation Markup
tags: [webcomponents]
---
Web Components enables frontend developers to create custom and reusable HTML tags, it's the latest bleeding-edge web technologies being developed, the project is led by the Chrome dev team and aims to solve a simple problem: Building Web applications is more complicated than it used to be. Worse, it's more complicated than it should be.

![Web Components](/assets/posts/webcomponents.png)

## HTML Templates

A template provides a method for declaring document fragments in HTML, it contains a chunks of markup that can be used later. The ```template``` element is not rendered but parsed, which means that scripts aren't processed, css and images aren't downloaded, it's completly hidden from the document object, so for ex you can't access the ```.comment-text``` element using ```document.querySelector```.

```html
<template id="commentTemplate">
    <img src=""> <!-- dynamically populate at runtime -->
    <div class="comment-text"></div> <!-- dynamically populate at runtime -->
</template>
```

<iframe width="100%" height="300" src="http://jsfiddle.net/daker/m85DN/embedded/result,css,html,js" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

## Custom Elements
The W3C defines it as follows :
> custom elements let authors define their own elements, including new presentation and API, that can be used in HTML documents

This means you will be able to create new HTML elements and extend the existing DOM objects with new ones. The name of any custom element must contain a dash (-) :

```html
<element name="x-foo-bar" constructor="XFooBar">
...
</element>
```
and use it like this ```<x-foo-bar>Test</x-foo-bar>```

## Shadow DOM
Browser vendors have been using Shadow DOM for quite awhile now to build their own components. These components are built using HTML and CSS, but you cannot see how thesee elements are made up on the dev tools simply because they use the Shadow DOM , ex : ```<video>```, ```<textarea>```, ```<input type="date">```, ```<input type="time">```

> Shadow DOM gives us markup encapsulation, style boundaries, and exposes (to web developers) the same mechanics browsers vendors have been using to implement their internal UI. — Eric Bidelman

![Date & time input](/assets/posts/input-date-time.png)

## HTML Imports
HTML Imports is similar way to how we load CSS stylesheets, it's a new type of link tag which allow developers to import and use HTML code from a url, after importing the page you need to use some Javascript code to manipulate it and inject your code :

```html
<link rel="import" href="/import/page-to-import.html">
```

Here is an example :

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <title>HTML Imports</title>
        <link rel="import" href="/import.html">
    </head>
    <body>
        <p>Hello World!</p>
        <script>
            var link = document.querySelector('link[rel=import]'),
                content = link.import.querySelector('#page-content');
            document.body.appendChild(content.cloneNode(true));
        </script>
    </body>
</html>
```
```html
<!-- import.html -->
<div id="page-content">
    <p>This is the content of the imported page.</p>
</div>
```
One thing you should keep in mind that thoses APIs are still in developement so don't exepect a full support rightnow, Chrome/ium have implemented some of them but you'll need to enable them in ```about://flags```