---
layout: post.html
title: Flashing LOLin V3 NodeMCU firmware
tags: [iot]
---
A few months ago, i did bought a chinese version of NodeMCU named LOLin V3, it's not version of 3 of NodeMCU, it's using CH340G chip which is the TTL to USB converter made by a chinese manufacture instead of the FTDI. After using for few times, it's stopped working.

![LOLin V3](/assets/posts/lolin/board.jpg)

## Install the esptool
We need to download and install the ```esptool``` that will help us the new flash the new firmware

```sh
$ git clone https://github.com/themadinventor/esptool.git
$ cd esptool
$ python setup.py install
```

## Downloading the firmware
You can grab the latest .bin version of the firmware from the [github][0] repo, or use [nodemcu-build][1] to build a custom firmware.

## Flashing the firmware
First, you need to know is the USB port where the board is plugged, open the commandline, then use the esptool to flash the new firmware :

```sh
$ python esptool.py --port /dev/ttyUSB0 --baud 9600 write_flash --flash_mode qio --flash_size 32m --flash_freq 40m 0x00000 nodemcu_float_0.9.6-dev_20150704.bin
esptool.py v1.0.2-dev
Connecting...
Running Cesanta flasher stub...
Flash params set to 0x0040
Writing 450560 @ 0x0... 450560 (100 %)
Wrote 450560 bytes at 0x0 in 19.5 seconds (184.5 kbit/s)...
Leaving...
```

Once the flashing is done, just open ```ESPlorer```, set the USB port and the baud speed then hit ```Open``` :

![ESPlorer](/assets/posts/lolin/esplorer.jpg)

[0]: https://github.com/nodemcu/nodemcu-firmware/releases
[1]: https://nodemcu-build.com