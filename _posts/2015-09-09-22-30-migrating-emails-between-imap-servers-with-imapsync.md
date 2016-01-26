---
layout: post.html
title: Migrating emails between IMAP servers with Imapsync
tags: [imapsync]
---
Migrating accounts can be a hard task if you are hosting your mails in a shared hosting. Imapsync is a one way synchronisation tool which can migrate mails from one account in a server to another account in another server with a simple command.

![Imapsync logo](/assets/posts/imapsync.png)

## Instaling Imapsync
You need to manually install ```imapsync``` by grabbing the code from the github repo

``` shell
$ git clone https://github.com/imapsync/imapsync.git
```

Before you start compiling, you need to make sure all the dependencies are installed

``` shell
$ sudo apt-get install libauthen-ntlm-perl libcrypt-ssleay-perl libdigest-hmac-perl libfile-copy-recursive-perl libio-compress-perl libio-socket-inet6-perl libio-socket-ssl-perl libio-tee-perl libmail-imapclient-perl libmodule-scandeps-perl libnet-ssleay-perl libpar-packer-perl libterm-readkey-perl libtest-pod-perl libtest-simple-perl libunicode-string-perl liburi-perl
$ sudo cpan Data::Uniqid
```

Now let's compile & install

``` shell
$ cd imapsync
$ sudo make install
```
and now let's start the migration

``` shell
$ imapsync --host1 $HOST1 --user1 $EMAIL --password1 '' --tls1 -port1 $PORT1 -authmech1 PLAIN --host2 $HOST2 --user2 $EMAIL --password2 '' --tls2 -port2 $PORT2 --reconnectretry1 1 --reconnectretry2 1 --useheader 'Message-Id' --skipsize
```

Migrating accounts can take longer depending on their size.
