---
layout: post.html
title: How to Integrate Slack with Launchpad
tags: [launchpad, ubuntuplanet]
---
Slack is a great platform for team communication, it is a collection of chat rooms, both public and private. It helps confine all your team communications to one place. Slack also provides an API to let you interacte with it, so i have to decided to write a simple app using Flask to integrate Slack with Launchpad using its new webhooks feature.

![Launchpad & Slack logos](/assets/posts/slack/lp_slack.png)

## Deploying to Heroku
You can check the full steps in the [README][0] file

```sh
$ git clone git@github.com:daker/launchpad-slack.git
$ cd launchpad-slack
$ heroku create
$ git push heroku master
$ heroku open
```
Once installed and everything is configured, things will start working like a charm :

![Slack chat](/assets/posts/slack/mr.png)
![Slack Slash command](/assets/posts/slack/bug.png)

## Contributing
Of course of you can contribute fixes and improvements, how to do it ? easy :

*   Fork it
*   Create your feature branch (`git checkout -b my-new-feature`)
*   Commit your changes (`git commit -am 'Add some feature'`)
*   Push to the branch (`git push origin my-new-feature`)
*   Create new Pull Request

[0]: https://github.com/daker/launchpad-slack/blob/master/README.md