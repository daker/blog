---
layout: post.html
title: How to use the Built-in Screen Recording in Android 4.4 KitKat
tags: [android, ubuntuplanet]
---
Android 4.4 KitKat now supports screen recording, it's only accessible via an ADB command on unrooted devices a. This featues is really a great way to create walkthroughs, tutorials for apps and also perfect for reporting bugs.

<video controls autoplay width="350" height="500">
  <source src="/assets/posts/android4.4/recording.mp4" type="video/mp4">
</video>

To start using it you need to install ADB, you can use the phablet-team PPA if you are using Ubuntu which has the tools and dependencies for 12.04, 12.10, 13.04 and 13.10 to get everything setup, if not you can download the Android SDK from the [Android developer site][0]

```sh
$ sudo add-apt-repository ppa:phablet-team/tools
$ sudo apt-get update
$ sudo apt-get install android-tools-adb
```
## Enable Developer Mode
* Go to the settings menu, and scroll down to "About phone." Tap on it.
* Scroll down to the bottom, where you see "Build number."
* Tap on it seven (7) times.

## Enable the USB debugging
Once done hit the Back button, youl'll see an new entry called "Developer Options" just above the "About phone." entry, tap on it, scroll down to the debugging section, then enable USB debugging, note that you’ve to confirm the security prompt on your device :

![USB debugging](/assets/posts/android4.4/usb-debugging.png)

![Security Question](/assets/posts/android4.4/usb-debugging2.png)

## Using the Screen Recording
Once done, you need to make sure that your device is listed & connected using :

```sh
$ adb devices
List of devices attached
xxxxxxxxxxxxxxxx  device
```
Then all you have to do is :

```sh
$ adb shell screenrecord /sdcard/recording.mp4 && adb pull /sdcard/recording.mp4
```
The default and maximum duration of a screenrecord is 3 minutes, you can use the ```--time-limit``` argument to set the limit you want, here all arguements you can set :

* --help : Displays a usage summary.
* --size <WIDTHxHEIGHT> : Sets the video size, for example: 1280x720. The default value is the device's main display resolution (if supported), 1280x720 if not. For best results, use a size supported by your device's Advanced Video Coding (AVC) encoder.
* --bit-rate <RATE> : Sets the video bit rate for the video, in megabits per second. The default value is 4Mbps. You can increase the bit rate to improve video quality or lower it for smaller movie files. The following example sets the recording bit rate to 6Mbps:
screenrecord --bit-rate 6000000 /sdcard/demo.mp4
* --time-limit <TIME> : Sets the maximum recording time, in seconds. The default and maximum value is 180 (3 minutes).
* --rotate : Rotates the output 90 degrees. This feature is experimental.
* --verbose : Displays log information on command line screen. If you do not set this option, the utility does not display any information while running.

[0]: https://developer.android.com/sdk/index.html