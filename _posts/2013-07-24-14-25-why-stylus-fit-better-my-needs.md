---
layout: post.html
title: Why Stylus fit better my needs
tags: [stylus, nodejs]
---
Stylus is an expressive, dynamic, robust CSS pre-processor built on top of Node.js. LESS and Sass are both great, they try to stay as close as the original CSS syntax as possible to minimize the impact of having to learn a new language, but for me someone who cares about simplicity and readability, the syntax becomes an important part of the language or the framework.

![Stylus](/assets/posts/stylus.png)

# Installation

## Ubuntu
```sh
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs
$ sudo npm install -g stylus
```

## Mac OSX

```sh
$ brew install node
$ curl https://npmjs.org/install.sh | sh
$ npm install -g stylus
```

For me as someone who comes from a Python world, Stylus syntax strips away all the colons, semicolons, brackets and most parentheses from regular CSS script, which become like a python syntax, easy and dead simple.

```css
#container
    width 980px
    margin 0 auto
    background #ccc
    font 12px Helvetica, Arial, sans-serif
```

which produce the following CSS code

```css
#container {
    width: 980px;
    margin: 0 auto;
    background: #ccc;
    font: 12px Helvetica, Arial, sans-serif;
}
```

# Variables

Defining variables is simple, you don't need to use $ or @ like in Sass or LESS, the good part is that Stylus also support the $ so if you are coming from Sass your variables will remain functionnal.

```css
font-size = 14px
color = #ff0000

body
    font-family  Arial, sans-serif
    font-size font-size
    color color
```

Once compiled, you'll get the following CSS code

```css
body {
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #f00;
}
```
Did you noticed something ? the color has been compressed automatically.

# Mixins

Mixins are similar to functions, but used in a different way, a good example of a mixin is the border-radius property

```css
border-radius(n)
    -webkit-border-radius n
    -moz-border-radius n
    -ms-border-radius n
    -o-border-radius n
    border-radius n

#btn
    border-radius(3px) /* or just border-radius 3px */
    background #e9573f
```

The compiled version will be

```css
#btn {
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    -ms-border-radius: 3px;
    -o-border-radius: 3px;
    border-radius: 3px;
    background: #e9573f;
}
```
Handy for vendor-prefixed properties.

#Iteration

Stylus gives you the ablity to iterate expressions via for/in

```css
ul
    for row in 1 2 3 4 5
        li:nth-child({row})
            height: 10px * row
```

The CSS code will be

```css
ul li:nth-child(1) {
    height: 10px;
}

ul li:nth-child(2) {
    height: 20px;
}

ul li:nth-child(3) {
    height: 30px;
}

ul li:nth-child(4) {
    height: 40px;
}

ul li:nth-child(5) {
    height: 50px;
}
```

# Inheritance

Stylus provides a good inheritance mecanism

```css
.notice
    padding 10px
    border 1px solid #eee

.warning
    @extend .notice
    color #e2e21e
```

```css
.notice,
.warning {
    padding: 10px;
    border: 1px solid #eee;
}

.warning {
    color: #e2e21e;
}
```

# Error Reporting

Stylus has fantastic error reporting built-in for syntax, parse, and evaluation errors—complete with stack traces, line numbers, and filenames.

```css
.message
    padding 10px
    border 1px solid [#ccc]
```

The output will look something like this

```sh
$ stylus buggy-demo.styl

/usr/lib/node_modules/stylus/bin/stylus:530
              throw err;
                    ^
Error: t.styl:3
   1| .message
   2|     padding 10px
 > 3|     border 1px solid [#ccc]

cannot perform solid[(#ccc)]
    at ".message" (t.styl:NaN)
    at Ident.Node.operate (/usr/lib/node_modules/stylus/lib/nodes/node.js:189:13)
```

Stylus provides a detailed stack trace much like you would find in any decent language.

# Literal CSS

This the best part of Stylus, you can still use your CSS code using ```@css``` and it will work, how that will help you in your workflow? you'll be able to integrate Stylus progressivly in your project

```css
@css {
    body {
        font-family: Arial, sans-serif;
        font-size: 14px;
        color: #f00;
    }
}

#container
    width 980px
    margin 0 auto
    background #ccc
    font 12px Helvetica, Arial, sans-serif
```

the output will be

```css
body {
    font-family: Arial, sans-serif;
    font-size: 14px;
    color: #f00;
}

#container {
    width: 980px;
    margin: 0 auto;
    background: #ccc;
    font: 12px Helvetica, Arial, sans-serif;
}
```

# Conclusion

Stylus is certainly worth a try, and if you are a Compass guy, Stylus has an extension called [nib][0] that provides robust cross-browser CSS3 mixins. Sure there is more you can learn about Stylus and there is [docs][1] for that.

[0]: https://github.com/visionmedia/nib
[1]: http://learnboost.github.io/stylus/