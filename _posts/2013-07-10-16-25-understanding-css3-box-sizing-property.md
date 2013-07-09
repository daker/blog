---
layout: post.html
title: Understanding CSS3 box-sizing property
tags: [css3]
---
Each HTML element is represented as a rectangular box, it consists of margins, borders, padding, and the actual content. The default CSS box model used to calculate widths and heights of elements, the width/height of an element gives the width/height of the content of the box, excluding padding and border.

![Box Model](/assets/posts/box-model.png)

and they are calculated like this:

```Width = width + padding-left + padding-right + border-left + border-right```
```Height = height + padding-top + padding-bottom + border-top + border-bottom```

so if we take this as an example :

```css
.box {
    width: 300px;
    padding: 10px;
    border: 5px solid #e9573f;
    margin: 10px;
}
```
the width of the rendred box will be calculated like this :

```300px (width) + 20px (left + right padding) + 10px (left + right border) + 20px (left + right margin) = 350px```

which will give us a box with 350px width, so it case you have to change the width of the box to 270px width, this is where the box-sizing property comes to the rescue.

```box-sizing``` allows you to switch box models :

* content-box: This is the default style as specified by the W3C. The width and height properties are measured including only the content, but not the border, margin, or padding.

* border-box: The width and height properties include the padding and border, but not the margin. This is the box model used by IE when the document is in Quirks mode.

* padding-box : The width and height properties include the padding size, and do not include the border or margin (only in Firefox).

<iframe width="100%" height="300" src="http://jsfiddle.net/ZtLL8/1/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>

To save you time, you can apply it using the universal selector

```css
* {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
```

```box-sizing``` is pretty well supported but partially and i mean that only Firefox support the three models, the others browsers only support content-box and border-box since the padding-box value has been added to the spec very recently.

<div class="browser-support">
    <dfn title="firefox"><div>21.0</div></dfn>
    <dfn title="chrome"><div>26.0</div></dfn>
    <dfn title="opera"><div>15.0</div></dfn>
    <dfn title="ie"><div>8.0</div></dfn>
    <dfn title="safari"><div>5.1</div></dfn>
</div>