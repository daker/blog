---
layout: post.html
title: 5 DevTools features to help you debug your WebApp
tags: [ubuntuplanet, ubuntu]
---
DevTools is a power tools than can developing Web easier, it has a lot of features some of them are still experimental and you need to enable them in the ```about://flags```.

![Devtools](/assets/posts/devtools/devtools.png)

# Breakpoints
Breakpoint are related to the JavaScript code, it let's you halt the JavaScript code execution and inspect the current environment. You can set them by simply going the "Source" tab, then select the JS file you want to debug , find the line you want to set a breakpoint on, then click the line number to apply a breakpoint :

![Javascript Breakpoints](/assets/posts/devtools/breakpoints.png)

The DevTools also supports conditional breakpoints.

# DOM Breakpoints
The DevTools can also be used to set breakpoints on the DOM elements direclty, just right click on the element you want to break on, then select the option you want :

![DOM Breakpoints](/assets/posts/devtools/dom-breakpoints.png)

# monitorEvents
The Devtools has a built function called ```monitorEvents```, it lets you monitor objects for mouse, key, touch or control events :

![monitorEvents](/assets/posts/devtools/monitorEvents.png)

# Pretty Print
Pretty Print is a handy feature for debugging minified JavaScript. Trying to to set a breakpoint when everything is on the same line is something impossible, clicking on the ```{}``` icon will make your Javascript code readable and easier to debug :

![Pretty Print - Before](/assets/posts/devtools/pprint-before.png)

![Pretty Print - After](/assets/posts/devtools/pprint-after.png)

# Remote Debugging
The Remote Debugger lets you connect Chrome/ium browser to the Chrome mobile browser so that you can use your desktop browser to debug all your tabs from your remote device :

![Remote Debugging](/assets/posts/devtools/remote-debugging.png)

and sure the DevTools still has a lot of features to cover from the ```Source``` to the ```Console``` Tab.