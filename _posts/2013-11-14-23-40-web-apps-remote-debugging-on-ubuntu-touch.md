---
layout: post.html
title: Web Apps Remote Debugging on Ubuntu Touch
tags: [utouchdev, ubuntuplanet]
---
If you are writing Web Apps for [Ubuntu Touch][0], you might want to test them directly on the phone using the Ubuntu browser, this can be done by remotely debugging web pages using the built-in DevTools, which allow you to inspect, debug, and analyze the on-device experience with the full suite of tools you're used to.

![Ubuntu Browser](/assets/posts/utouch/3.png)

The phablet-team PPA has the tools and dependencies for 12.04, 12.10, 13.04 and 13.10 to get everything setup:

```sh
$ sudo add-apt-repository ppa:phablet-team/tools
$ sudo apt-get update
$ sudo apt-get install phablet-tools android-tools-adb android-tools-fastboot
```

Plug the device via the USB cable, then run the following commands to connect to it through ADB

```sh
$ adb shell
```
Switch to the phablet user :

```sh
$ sudo -u phablet -i
```

Take a note of your phone IP adresse :

```sh
$ ifconfig wlan0 | grep 'inet addr' | cut -d: -f2 | awk '{print $1}'
```

Once done launch the webbrowser app using :

```sh
$ upstart-app-launch webbrowser-app --inspector
```

A browser instance will launch on the phone, point to URL of your webapp then access the Devtools with your Chrome/ium browser by opening ```http://$YOUR-PHONE-IP:9221```

![DevTools](/assets/posts/utouch/4.png)

The built-in Devtools is a bit old & slow so i am using the hosted version : ```https://chrome-devtools-frontend.appspot.com/static/30.0.1599.118/devtools.html?ws=$YOUR-PHONE-IP:9221/devtools/page/$PAGE-ID```, you can get the page id from ```http://$YOUR-PHONE-IP:9221/pagelist.json```

[0]: http://www.ubuntu.com/phone/install