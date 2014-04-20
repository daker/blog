---
layout: post.html
title: 4 CSS Tricks for Vertical Alignment
tags: [css]
---
There are a few different techniques to vertically centre objects with CSS, in this post i’ll show you four ways to do it.

![Box Model](/assets/posts/box-model.png)

## display: table-cell
The first trick is by using ```display: table``` for the parent of the element you want to center, then your element will behave like a table cell by using ```display: table-cell```.
<iframe width="100%" height="300" src="http://jsfiddle.net/daker/cx6MG/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>

## line-height
This technique only works if you have a single line text, by setting the ```line-height``` will make in the middle of the parent div.
<iframe width="100%" height="300" src="http://jsfiddle.net/daker/5NhNX/1/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>

## CSS3 transform
With this technique we use the CSS property transform which is usally used for rotating and scaling elements, but it ca be also used to translate them vertically.
<iframe width="100%" height="300" src="http://jsfiddle.net/daker/dYdLn/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>

## Flex Box
Flex Box is a layout mode providing for the arrangement of elements on a page.
<iframe width="100%" height="300" src="http://jsfiddle.net/daker/z58kQ/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>
