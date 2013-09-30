---
layout: post.html
title: Automate Your Dev Environment With Vagrant
tags: [vagrant, ubuntuplanet]
---
I started feeling the need of automating my developement environments when i started contributing to several django projects run by the community, each project uses a different django version and several dependencies, thoses dependencies can be found or not on the Ubuntu version i use for my daily work. Vagrant is a great tool for those situations, it allow you to create and manage custom virtual environments to your needs using automated configuration technologies such as Chef, Puppet and Shell scripts.

![Vagrant](/assets/posts/vagrant/vagrant.jpg)

# Installing Vagrant

Vagrant works with VirtualBox, and support [Vmware Fusion][0] and AWS via plugins

## Install Virtualbox

```sh
$ sudo apt-get install virtualbox
```

## Install Vagrant

```sh
$ sudo apt-get install vagrant
```

Make sure Vagrant is installed correctly

```sh
$ vagrant --version
Vagrant version 1.2.0
```

# Get your first VM up and running

1.  start a vagrant config file in an empty project folder. this will create ```Vagrantfile```

    ```sh
    $ mkdir project
    $ cd project
    $ vagrant init
    ```

2.  edit ```Vagrantfile``` to add the boxname

    ```ruby
    Vagrant::Config.run do |config|
        config.vm.box = "devserver"
    end
    ```

3.  add a base image or box to quickly clone a virtual machine. this will create a folder .vagrant with an ubuntu box

    ```sh
    $ vagrant box add devserver http://files.vagrantup.com/precise32.box
    ```

4. then you are ready to go

    ```sh
    $ vagrant up
    [default] Importing base box 'precise32'...
    [default] Matching MAC address for NAT networking...
    [default] Clearing any previously set forwarded ports...
    [default] Forwarding ports...
    [default] -- 22 => 2222 (adapter 1)
    [default] Creating shared folders metadata...
    [default] Clearing any previously set network interfaces...
    [default] Booting VM...
    [default] Waiting for VM to boot. This can take a few minutes.
    [default] VM booted and ready for use!
    [default] Mounting shared folders...
    [default] -- v-root: /vagrant
    [...]
    ```

Wait for the command to finish, then you will have a VM ready for you to connect. the VM can be accessed via SSH:

```sh
$ vagrant ssh
```

# Provisioning

Vagrant allow you to use different Provisioners to easily setup your VM with everything it needs to run your project :

* Chef Solo
* Chef Server
* Puppet Standalone
* Puppet Server
* Shell

I do prefer Puppet for provisioning, because it's easy and it allow you to easily create a manifest to control the package, file or service with a few lines of code.

Here is the ```Vagrantfile``` i use, i needed to forward the port 8000 because i want to access the webapp using my browser, i also increased the memory of the VM to 1GB, and made the project folder accessible to the VM :

```ruby
# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |ltp|

    ltp.vm.box = "ltp-devserver"
    ltp.vm.box_url = "http://files.vagrantup.com/precise32.box"
    ltp.vm.forward_port 8000, 8000
    ltp.vm.network :hostonly, "33.33.33.10"
    ltp.vm.customize ["modifyvm", :id, "--memory", 1024]

    ltp.ssh.max_tries = 50
    ltp.ssh.timeout = 300

    ltp.vm.share_folder("v-root", "/home/vagrant/ltp", ".")

    ltp.vm.provision :puppet do |puppet|
        puppet.manifests_path = "puppet/manifests"
        puppet.manifest_file  = "vagrant.pp"
    end
end
```

here one of the classes i use on my dev environement :

```sh
class init {

    group { "puppet":
        ensure => "present",
    }

    # Let's update the system
    exec { "update-apt":
        command => "sudo apt-get update",
    }

    # Let's install the dependecies
    package {
        ["python", "python-dev", "libjs-jquery", "libjs-jquery-ui", "iso-codes", "gettext", "python-pip", "bzr"]:
        ensure => installed,
        require => Exec['update-apt'] # The system update needs to run first
    }

    # Let's install the project dependecies from pip
    exec { "pip-install-requirements":
        command => "sudo /usr/bin/pip install -r $PROJ_DIR/requirements.txt",
        tries => 2,
        timeout => 600, # Too long, but this can take awhile
        require => Package['python-pip', 'python-dev'], # The package dependecies needs to run first
        logoutput => on_failure,
    }

}
```

You need to specify one manifest file in your Vagranfile, if you need to split it, you can use something like this :

```sh
$ tree
.
└── manifests
    ├── classes
    │   ├── init.pp
    │   └── ltp.pp
    └── vagrant.pp
```

I use ```vagrant.pp``` to define my project variables, and to make sure all the classes are executed in the order i want :

```sh
import "classes/*.pp"

$PROJ_DIR = "/home/vagrant/ltp"

Exec {
    path => "/usr/local/bin:/usr/bin:/usr/sbin:/sbin:/bin",
}

class dev {

    class {
        init: before => Class[ltp];
        ltp:;
    }
}

include dev
```

The ```ltp``` class is only used to run some ```django``` commands :

```sh
class ltp {

    file { "$PROJ_DIR/loco_directory/local_settings.py":
        ensure => file,
        source => "$PROJ_DIR/loco_directory/local_settings.py.sample",
        replace => false;
    }

    exec {
        "db_download":
            cwd => "$PROJ_DIR/loco_directory",
            command => "/usr/bin/wget http://people.ubuntu.com/~daker/ltp/ltp.db",
            creates => "$PROJ_DIR/loco_directory/ltp.db";
    }

    exec {
        "managepy_syncdb":
            cwd => "$PROJ_DIR/loco_directory",
            command => "/usr/bin/python manage.py syncdb --noinput",
    }

    exec {
        "managepy_migratedb":
            cwd => "$PROJ_DIR/loco_directory",
            command => "/usr/bin/python manage.py migrate",
    }
}
```

Now all i have to do is ```vagrant up``` and let Vagrant do all his magic tricks :

```sh
$ vagrant up
[default] Importing base box 'ltp-devserver'...
[default] Matching MAC address for NAT networking...
[default] Clearing any previously set forwarded ports...
[default] Forwarding ports...
[default] -- 22 => 2222 (adapter 1)
[default] -- 8000 => 8000 (adapter 1)
[default] Creating shared folders metadata...
[default] Clearing any previously set network interfaces...
[default] Preparing network interfaces based on configuration...
[default] Running any VM customizations...
[default] Booting VM...
[default] Waiting for VM to boot. This can take a few minutes.
[default] VM booted and ready for use!
[default] Configuring and enabling network interfaces...
[default] Mounting shared folders...
[default] -- v-root: /home/vagrant/ltp
[default] -- manifests: /tmp/vagrant-puppet/manifests
[default] Running provisioner: Vagrant::Provisioners::Puppet...
[default] Running Puppet with /tmp/vagrant-puppet/manifests/vagrant.pp...
stdin: is not a tty
warning: Could not retrieve fact fqdn

notice: /Stage[main]/Init/Exec[update-apt]/returns: executed successfully

notice: /Stage[main]/Init/Package[python-pip]/ensure: ensure changed 'purged' to 'present'

notice: /Stage[main]/Init/Package[bzr]/ensure: ensure changed 'purged' to 'present'

notice: /Stage[main]/Init/Package[libjs-jquery-ui]/ensure: ensure changed 'purged' to 'present'

notice: /Stage[main]/Init/Package[python-dev]/ensure: ensure changed 'purged' to 'present'

notice: /Stage[main]/Init/Exec[pip-install-requirements]/returns: executed successfully

notice: /Stage[main]/Init/Package[gettext]/ensure: ensure changed 'purged' to 'present'

notice: /Stage[main]/Ltp/File[/home/vagrant/ltp/loco_directory/local_settings.py]/ensure: defined content as '{md5}25234f94c80418dcb7cc59f3db2dd7f8'

notice: /Stage[main]/Ltp/Exec[db_download]/returns: executed successfully

notice: /Stage[main]/Ltp/Exec[managepy_syncdb]/returns: executed successfully

notice: /Stage[main]/Ltp/Exec[managepy_migratedb]/returns: executed successfully

notice: Finished catalog run in 811.47 seconds
```

After i started using Vagrant, my workflow imporved a lot i start focusing on writing code rather than resolving packages conflicts, i do use a VM for each bug fix/feature i need to work on, and once the fix is merged i simply delete the VM without thinking about breaking anything.

[NB]: Ubuntu now officially supports Vagrant, and provides [official Ubuntu boxes][1] for 12.04, 12.10, 13.04 and 13.10.

[0]: http://www.vagrantup.com/vmware
[1]: http://cloud-images.ubuntu.com/vagrant/