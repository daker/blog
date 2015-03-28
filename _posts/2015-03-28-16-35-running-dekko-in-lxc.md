---
layout: post.html
title: Running Dekko in LXC
tags: [ubuntuplanet, oxide, lxc]
---
I was approached by [Daniel Chapman][0] to help with the new message view in Dekko(Ubuntu Touch email client) which uses Oxide Webview to render the message details. Dekko is using the new Ubuntu SDK 1.1 which is not present in the LTS version 14.04, we have tried to make it run but it was impossible.

![LXC logo](/assets/posts/dekko/lxc-logo.png)

## Setup LXC
To have a clear idea on how LXC works and how to setup your environment make sure you check [Nekhelesh's post][1],

## Unpriviledged container
To run Dekko we need to create an unpriviledged container using Utopic 14.10, and let's name it ```utopicdev``` :

``` shell
$ lxc-create --template download --name utopicdev -- --dist ubuntu --release utopic --arch i386
$ sudo chown -R 1000:1000 ~/.local/share/lxc/utopicdev/rootfs/home/ubuntu
```

## Running the container
So at this point i had some issues with cgmanager :

``` shell
$ lxc-start -n utopicdev
lxc_container: cgmanager.c: lxc_cgmanager_create: 299 call to cgmanager_create_sync failed: invalid request
lxc_container: cgmanager.c: lxc_cgmanager_create: 301 Failed to create hugetlb:utopicdev
lxc_container: cgmanager.c: cgm_create: 646 Error creating cgroup hugetlb:utopicdev
lxc_container: start.c: lxc_spawn: 861 failed creating cgroups
lxc_container: start.c: __lxc_start: 1080 failed to spawn 'utopicdev'
lxc_container: lxc_start.c: main: 342 The container failed to start.
lxc_container: lxc_start.c: main: 346 Additional information can be obtained by setting the --logfile and --logpriority options.
```

I fixed it by restarting my machine only, now let's run it in daemon mode :

``` shell
$ lxc-start -n utopicdev -d
```

## Using the container

``` shell
$ lxc-attach --clear-env -n utopicdev -- sudo -u ubuntu -i env DISPLAY=$DISPLAY /home/ubuntu/dekko/__build/dekko
```

When trying to run it you get the following error :

``` shell
$ lxc-attach --clear-env -n utopicdev -- sudo -u ubuntu -i env DISPLAY=$DISPLAY /home/ubuntu/dekko/__build/dekko
Cannot chdir into /proc/ directory: Permission denied
[0325/151501:ERROR:setuid_sandbox_client.cc(195)] Failed to read from chroot pipe: Not a directory
[0325/151501:FATAL:zygote_main_linux.cc(549)] Check failed: EnterSuidSandbox(setuid_sandbox, post_fork_parent_callback). Failed to enter setuid sandbox
```

You get this error is because dekko is using Oxide to render message view which uses setuid sandbox, using ```OXIDE_DISABLE_SETUID_SANDBOX=1``` we can disable it since the LXC container already provides the isolation.

``` shell
$ lxc-attach --clear-env -n utopicdev -- sudo -u ubuntu -i env DISPLAY=$DISPLAY OXIDE_DISABLE_SETUID_SANDBOX=1 /home/ubuntu/dekko/__build/dekko
```

![Dekko running in Ubuntu 14.04](/assets/posts/dekko/dekko.jpg)

Note that i am running the compiled version, so you need to install the SDK and compile dekko first.

[0]: https://plus.google.com/114760723716576457396/about
[1]: http://nik90.com/fiddling-around-with-lxc-containers/