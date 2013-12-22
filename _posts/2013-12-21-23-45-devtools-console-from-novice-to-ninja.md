---
layout: post.html
title: Devtools Console, from Novice to Ninja
tags: [javascript, console, ubuntuplanet]
---
The [JavaScript][0] console is a powerful tool that allows developers debug their code using functions provided by the Console API and a shell prompt where they can enter commands and interact with the document object.

![JavaScript Console](/assets/posts/jsconsole/console.png)

## Filters

There are different buttons allowing you to filter the display of messages logged to the console:

* All — Shows all console output.
* Errors — Only show output from console.error()
* Warnings — Only show output from console.warn()
* Logs — Only show output from console.log(), console.info() and console.debug().
* Debug — Only show output from console.timeEnd() and other console output.

![Filters](/assets/posts/jsconsole/filters.png)

## Errors and warnings

* console.info : Writes a message to the console with the visual "info" icon and color coding and a hyperlink to the line where it was called.
* console.warn : Writes a message to the console with the visual "warning" icon and color coding and a hyperlink to the line where it was called.
* console.debug : Writes a message to the console, including a hyperlink to the line where it was called.
* console.error : Writes a message to the console with the visual "error" icon and color coding and a hyperlink to the line where it was called.

![Logging](/assets/posts/jsconsole/logging.png)

## console.dir[xml]

```console.dir(object)``` prints an interactive listing of all properties of the object, while ```console.dirxml(node)``` prints the XML source tree of an element.

![JavaScript Console](/assets/posts/jsconsole/dir.png)

## Assertions

Tests that an expression is true using ```console.assert```. If not, it will write a message to the console and throw an exception.

```sh
var x=0;
console.assert((x == 1), "assert message: x != 1");
```

## Grouping output

```console.group``` allows you to group the message or log in Console tab. If you have some many logs in your code, you can probably divide your log into small group or subgroup

```js
var user = "jsmith", authenticated = false;
console.group("Authentication phase");
console.log("Authenticating user '%s'", user);
// authentication code here...
if (!authenticated) {
    console.log("User '%s' not authenticated.", user)
}
console.groupEnd();
```

You also do nested grouping :

```js
var user = "jsmith", authenticated = true, authorized = true;
// Top-level group
console.group("Authenticating user '%s'", user);
if (authenticated) {
    console.log("User '%s' was authenticated", user);
    // Start nested group
    console.group("Authorizing user '%s'", user);
    if (authorized) {
        console.log("User '%s' was authorized.", user);
    }
    // End nested group
    console.groupEnd();
}
// End top-level group
console.groupEnd();
console.log("A group-less log trace.");
```

![Nested Grouping](/assets/posts/jsconsole/nested.png)

## Logging Array Data

```console.table()``` is a very handy fonction to display Array object

```js
var langs = [
    { name: "JavaScript", extension: ".js" },
    { name: "HTML", extension: ".html" },
    { name: "CoffeeScript", extension: ".coffee" },
    { name: "SASS", extension: ".sass" }
];

console.table(langs);
```

![JavaScript Console](/assets/posts/jsconsole/table.png)

## Measuring Execution time

To mesure how long something it takes to execute a set of instructions :

```js
var i, t = "";

// Start
console.time("OPNAME");

for (i = 1; i <= 100; i++)
    t += i;

// Stop
console.timeEnd("OPNAME");
```

## Tracing

```console.trace()``` prints the stacktrace of JavaScript execution at the point where it was called.

```js
function F(v) {
    return K(v + 1);
}

function K(v) {
    return Y(v + 2);
}

function Y(v) {
    console.trace();
};

F(5);
```
![Console Trace](/assets/posts/jsconsole/trace.png)

## Shortcuts

* ```Ctrl + Shift + J``` : Open the Chrome/ium Console
* ```Ctrl+l``` : Clear the console

## References

* [Firebug Wiki][1]
* [Chrome DevTools documentation][2]

[0]: http://daker.me/2013/06/5-html5-javascript-apis-to-keep-an-eye-on.html
[1]: http://getfirebug.com/wiki/index.php/Console_Panel
[2]: https://developers.google.com/chrome-developer-tools/docs/javascript-debugging#console-assert
