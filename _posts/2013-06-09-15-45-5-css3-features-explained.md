---
layout: post.html
title: 5 CSS3 features explained
tags: [css3]
---
CSS3 is one of the coolest new web technologies available to front-end developers right now, overtime we have seen so many features that generally were implemented via [JavaScript][0], can now be acheived with a few lines of CSS.
So in this post i will explain to you five features that will save you time and energy.

## Flexible boxes
The CSS3 Flexible Box, better known as Flexbox enables you to create complex layouts with only a few lines of code.
How many time you wanted to vertically center a div ? how many time you wanted to create a 3 columns layout with 2 fluid columns and one fixed ? here is how to do it — with CSS only

### Vertical centering of a div
<iframe width="100%" height="300" src="http://jsfiddle.net/daker/NnkHF/30/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>

### Fixed-Fluid-Fixed Layout
<iframe width="100%" height="300" src="http://jsfiddle.net/daker/GWZzd/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>

As you can see this will allow you to make other layouts(Fluid-Fluid-Fixed, Fluid-Fixed-Fixed, etc...), easy no ?

<div class="browser-support">
    <dfn title="firefox"><div>20.0</div></dfn>
    <dfn title="chrome"><div>26.0</div></dfn>
    <dfn title="opera"><div>12.1</div></dfn>
    <dfn title="ie"><div>10.0</div></dfn>
    <dfn title="safari"><div>5.1</div></dfn>
</div>

## :nth-child

:nth-child is a CSS pseudo-class which allows you to select elements with a formula ```:nth-child(n)```. The pseudo-class accepts an argument, n, which can be a keyword, a number or a number expression of the form an+b.

A good use case is displaying a zebra striping table without using extra CSS classes, JavaScript, or server-side code using the modulo, only CSS hein ?

<iframe width="100%" height="300" src="http://jsfiddle.net/daker/uc2Kv/embedded/result,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

There is also ```:nth-of-type``` it works the same way , except that it only considers element of the given type.

<div class="browser-support">
    <dfn title="firefox"><div>3.5</div></dfn>
    <dfn title="chrome"><div>4.0</div></dfn>
    <dfn title="opera"><div>9.5</div></dfn>
    <dfn title="ie"><div>9.0</div></dfn>
    <dfn title="safari"><div>3.2</div></dfn>
</div>

## CSS Hyphenation

The hyphens CSS property tells the browser how to go about splitting words to improve the layout of text when line-wrapping. On HTML, the language is determined by the lang attribute: browsers will hyphenate only if this attribute is present and if an appropriate hyphenation dictionary is available. On XML, the xml:lang attribute must be used.

Source [MDN][1].

<iframe width="100%" height="300" src="http://jsfiddle.net/daker/8w9bn/embedded/result,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>

NB: To see the result you need to try to resize the window of your demo.

<div class="browser-support">
    <dfn title="firefox"><div>6.0</div></dfn>
    <dfn title="chrome"><div>13.0</div></dfn>
    <dfn title="opera" class="unsupported"><div>—</div></dfn>
    <dfn title="ie"><div>10.0</div></dfn>
    <dfn title="safari"><div>5.1</div></dfn>
</div>


## CSS Filter Effects

Filters are a powerful tool, they can manipulate the appearance of any HTML element and can be stacked together to create unique effects and provide endless of possibilities, such as grayscale, sepia, saturation, opacity, and blurs. The ```filter``` property creates a hardware-accelerated effects using the GPU.

<iframe width="100%" height="300" src="http://jsfiddle.net/daker/qZdmS/embedded/result,css,html" allowfullscreen="allowfullscreen" frameborder="0"></iframe>


<div class="browser-support">
    <dfn title="firefox" class="unsupported"><div>—</div></dfn>
    <dfn title="chrome"><div>18.0</div></dfn>
    <dfn title="opera"><div>15.0</div></dfn>
    <dfn title="ie"  class="unsupported"><div>—</div></dfn>
    <dfn title="safari"><div>6.0</div></dfn>
</div>

## CSS3 Media Queries

CSS3 Media queries allow you to target CSS rules based on screen size, device-orientation or display-density, you can add expressions to media type to check for certain conditions, this is the technique used for the so called "Responsive design".

```css
/* The following CSS will apply if the viewing area is smaller than 600px. */
@media screen and (max-width: 600px) {
    .class {
        background: #ccc;
    }
}

/* The following CSS will apply if the viewing area is 700px wide or wider and the display is in landscape mode. */
@media screen and (min-width: 700px) and (orientation: landscape) {
    .class {
        background: #ccc;
    }
}
```

You can also apply css rules based on media types ```screen```, ```tv``` or ```handheld```, you can find the list [here][2]

<div class="browser-support">
    <dfn title="firefox"><div>20.0</div></dfn>
    <dfn title="chrome"><div>26.0</div></dfn>
    <dfn title="opera"><div>12.1</div></dfn>
    <dfn title="ie"><div>9.0</div></dfn>
    <dfn title="safari"><div>5.1</div></dfn>
</div>

Let me know your thoughts in the comments below, also you can discuss, upvote this post over at [Hacker News][3].

[0]: http://daker.me/2013/06/5-html5-javascript-apis-to-keep-an-eye-on.html
[1]: https://developer.mozilla.org/en-US/docs/Web/CSS/hyphens
[2]: http://www.w3.org/TR/CSS2/media.html#media-types
[3]: https://news.ycombinator.com/item?id=5849053