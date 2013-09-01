---
layout: post.html
title: Adding Persona authentication to your django project
tags: [django, persona, ubuntuplanet]
---
[Persona][0] is a decentralized login system made by [Mozilla][3] that aims to eliminate site-specific passwords so you can log in with your existing email accounts without having to type in a password.

![Persona](/assets/posts/persona-mozilla.jpg)

## Installation
Mozilla provides a library called ```django-browserid``` that integrates Persona authentication into Django, so you can simply added to to your ```requirements.txt``` or just install via pip :

```sh
$ sudo pip install django-browserid
```

## Configuration
Once done you need to follow the following steps :

Add ```django-browserid``` to your ```INSTALLED_APPS```,

```python
INSTALLED_APPS = (
    # ...
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.staticfiles',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.admin',
    'django_browserid',
    # ...
)
```

Add the ```django_browserid``` authentication backend :

```python
AUTHENTICATION_BACKENDS = (
   # ...
   'django.contrib.auth.backends.ModelBackend', # required for admin
   'django_browserid.auth.BrowserIDBackend',
   # ...
)
```

Add the ```django_browserid``` context processor :

```python
TEMPLATE_CONTEXT_PROCESSORS = (
   # ...
   'django_browserid.context_processors.browserid',
   # ...
)
```

and finally you need to set your site url :

```python
SITE_URL = 'https://example.com'
```

I have created a working demo project on [github][1] to play with, you can still check the [docs][2] or comment here if it doesn't work for you.

[0]:https://www.mozilla.org/en-US/persona/
[1]:https://github.com/daker/django-persona-demo
[2]:http://django-browserid.readthedocs.org/en/v0.9/details/troubleshooting.html
[3]:https://www.mozilla.org/