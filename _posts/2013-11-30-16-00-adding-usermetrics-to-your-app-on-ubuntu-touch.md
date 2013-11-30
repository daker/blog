---
layout: post.html
title: Adding UserMetrics to your app on Ubuntu Touch
tags: [utouchdev, ubuntuplanet]
---

The Welcome Screen infographic is one of the key components for the customization of the user experience on [Ubuntu Touch][0], beautiful visualisations of data from multiple sources, the ```UserMetrics``` is the responsible component for updating the infographic using QML.

![Welcome Screen](/assets/posts/utouch/5.png)

To use the ```UserMetrics``` QML module you need to install ```qtdeclarative5-usermetrics0.1``` package on the desktop :

```sh
$ sudo apt-get install qtdeclarative5-usermetrics0.1
```

# Apparmor Policy groups

Add the ```usermetrics``` to your apparmor file :

```json
{
    "policy_groups": [
        ...
        "usermetrics"
    ],
    "policy_version": 1.0
}
```

# QML

First you need to import the ```UserMetrics``` module :

```sh
import UserMetrics 0.1
```

Then create the metric(s) :

```sh
Metric {
    /* Set a unique ID for each metric object you use so you can access it in your QML code. */
    id: gameMetric

    /* Set a unique name for each metric object, this is used for the storage of the metric data. */
    name: "game-metrics"

    /* This is the format for the plural case. */
    format: "%1 missions completed today"

    /* This is the format for no data for the day. */
    emptyFormat: "0 missions completed today"

    /* This is the gettext domain used for the localisation, you can use the applicationName. */
    domain: "com.ubuntu.developer.daker.mygame"
}
```

The Metric component provides two methods :

— ```increment(double amount = 1.0)``` : You can use this method if you want to increment metric by a specific amount ex: gameMetric.increment(3) or gameMetric.increment() to increment the metric by 1.
— ```update(double value)``` : You can use this method if you want to reset the metric and set a specific amount ex: gameMetric.update(5)

The use of the Metric is not limited by the number.

[0]: http://www.ubuntu.com/phone/install