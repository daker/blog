---
layout: post.html
title: How I Did Make The Ubuntu HTML5 Range Slider
tags: [ubuntutouch, ubuntuplanet]
---
Last week while i was attending the [Canonical Client Sprint][0] in Malta, i start looking into re-lifting some components like the CheckBox/Switch and the Slider, so in this post i'll explain how i did implement the new the Slider.

![Ubuntu HTML5 Slider](https://lh4.googleusercontent.com/-OsoN55QFLxg/U5Mf5pZcTcI/AAAAAAAADBk/anOEUUCKFXA/w426-h584/out-7.gif)

The first thing that needs be done is to remove the default styles using ```-webkit-appearance: none```.

```css
input[type=range] {
  -webkit-appearance: none;
}
```

Now we can start adding our CSS styles, Webkit/Blink provides an easy way to style the thumb using the pseudo class ```::-webkit-slider-thumb``` but first we need to remove the defaul styles.

```css
input[type=range] {
    -webkit-appearance: none;
    background: linear-gradient(to right, rgba(175, 175, 175, 0.3) 0%, rgba(175, 175, 175, 0.3) 100%);
    background-position: center;
    background-size: 99% 4px;
    background-repeat: no-repeat;
    -webkit-appearance: none;
    width: auto;
    height: 36px;
    border-radius: 1px;
    overflow: hidden;
    margin-top: 5px;
    margin-bottom: 5px;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
}
```

<iframe width="100%" height="300" src="http://jsfiddle.net/daker/f3Kzw/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>

Now let's style the thumb :

```css
input[type=range]::-webkit-slider-thumb {
  -webkit-box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2);
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.2);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  background-color: #fff;
  pointer-events: none;
  border-radius: 3px;
  width: 16px;
  height: 16px;
  position: relative;
}
```

<iframe width="100%" height="300" src="http://jsfiddle.net/daker/f3Kzw/2/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>

At this point we are still missing the oragne fill color, unfortunatly Webkit/Blink doesn't provide any pseudo class to style this area like IE does, so i have tried to combine the pseudo class ```::-webkit-slider-thumb``` and ```:before``` to create this effect.

```css
input[type=range]::-webkit-slider-thumb:before {
  position: absolute;
  top: 6px;
  left: -2000px;
  width: 2000px;
  height: 4px;
  background: #dd4814;
  content: ' ';
}
```

<iframe width="100%" height="300" src="http://jsfiddle.net/daker/f3Kzw/1/embedded/result,css,html" allowfullscreen="allowfullscreen"></iframe>


[0]: http://daker.me/2014/05/canonical-sprint-in-malta.html
