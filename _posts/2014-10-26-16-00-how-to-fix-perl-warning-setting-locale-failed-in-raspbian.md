---
layout: post.html
title: How to fix Perl warning setting locale failed on Raspbian
tags: [raspberrypi]
---
Last week i was trying to make my Raspberry Pi work again, and while reinstalling and upgrading Raspbian OS packages i run into an issue where a perl waring is displayed.

![Raspberry Pi Logo](/assets/posts/rpi-logo.png)

The warning message apprears during the installation packages(invoking Perl) and it's due to missing locales being set not :

```shell
[...]
perl: warning: Setting locale failed.
perl: warning: Please check that your locale settings:
        LANGUAGE = (unset),
        LC_ALL = (unset),
        LC_TIME = "fr_FR.UTF-8",
        LC_MONETARY = "fr_FR.UTF-8",
        LC_ADDRESS = "fr_FR.UTF-8",
        LC_TELEPHONE = "fr_FR.UTF-8",
        LC_NAME = "fr_FR.UTF-8",
        LC_MEASUREMENT = "fr_FR.UTF-8",
        LC_IDENTIFICATION = "fr_FR.UTF-8",
        LC_NUMERIC = "fr_FR.UTF-8",
        LC_PAPER = "fr_FR.UTF-8",
        LANG = "en_GB.UTF-8"
    are supported and installed on your system.
perl: warning: Falling back to the standard locale ("C").
locale: Cannot set LC_ALL to default locale: No such file or directory
```

## Solution
You can fix the issue by setting the locale can be set en_US.UTF-8 for example:

```shell
$ export LANGUAGE=en_US.UTF-8
$ export LANG=en_US.UTF-8
$ export LC_ALL=en_US.UTF-8
$ locale-gen en_US.UTF-8
$ dpkg-reconfigure locales
```

Once you run the last command a dialog will appear to let you choose the desired locale.