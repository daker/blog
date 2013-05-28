---
layout: post.html
title: 5 Sublime Text 2 packages to enhance your frontend development workflow
tags: [sublimetext]
---
Sublime Text 2 is a lightweight, cross platform, blazing fast text editor with chrome-like tabs and split window layouts, it works for both web development and software development.

Sublime Text has got a wide range of open source plugins with a massive community of plugin developers.

![Sublime Text 2](/assets/posts/sublime.png)

For my frontend development workflow i use some plugins with a specific user settings and sure the wonderfull [Soda theme][0] by [Ian Hill][1], so here’s [my settings file][2]:

``` json
{
    "auto_complete": false,
    "caret_style": "phase",
    "close_windows_when_empty": false,
    "color_scheme": "Packages/Tomorrow Color Schemes/Tomorrow-Night.tmTheme",
    "draw_white_space": "all",
    "find_selected_text": true,
    "fold_buttons": false,
    "folder_exclude_patterns":
    [
        ".svn",
        ".git",
        ".hg",
        "CVS",
        "_build",
        "dist",
        "build",
        "site"
    ],
    "font_face": "Ubuntu Mono",
    "font_options":
    [
        "subpixel_antialias"
    ],
    "font_size": 12.0,
    "highlight_line": true,
    "ignored_packages":
    [
        "Vintage"
    ],
    "rulers":
    [
        72,
        79
    ],
    "theme": "Soda Dark.sublime-theme",
    "translate_tabs_to_spaces": true,
    "trim_trailing_white_space_on_save": true
}

```

## Package Control

[Package Control][3] is one of my favorite plugins, it allows users to manage packages very easily, with one shortcut you have access to a long list of plugins available to install and update is automaticly handled. To install it open the console View->Show Console, then paste the following code :

``` python
import urllib2,os; pf='Package Control.sublime-package'; ipp=sublime.installed_packages_path(); os.makedirs(ipp) if not os.path.exists(ipp) else None; urllib2.install_opener(urllib2.build_opener(urllib2.ProxyHandler())); open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('http://sublime.wbond.net/'+pf.replace(' ','%20')).read()); print('Please restart Sublime Text to finish installation')
```

To use it simply invoke the command palette using ctrl+shift+p or ⌘+shift+p then type "install" :

![Sublime Text 2 command palette](/assets/posts/sublime-palette.png)

## Sublime Linter

[Sublime Linter][4] is the Swiss knife of code linting, it highlights potential errors in your code depending on the language you are using.

## LiveReload

[LiveReload][5] can help you to save a lot time, you don't need to hit refresh in your browser each time you want to test, everything will be done automatically when you save your file.

## Prefixr

[Prefixr][6] runs your CSS through the [Prefixr][7] API to make it Cross-Browser.

## Sidebar Enhancements

[Sidebar Enhancements][8] Makes the sidebar more user friendly and improves its usability by adding more options to it. You can delete files and open files using certain programs like Photoshop. giving you more options on new files, moving files, copying files and opening files in another program.

## Emmet

[Emmet (ex Zen Coding)][9] - With this plugin you will see the "Valentino Rossi" on you, this will bring hight-speed development process in your HTML and CSS.

## Bonus

Here are some useful Keyboard shortcuts to remember :

*   ctrl+d Select the next occurrence of the selected word
*   ctrl+k, ctrl+b - Toggle the sidebar
*   f11 - Toggle Full Screen
*   shift+f11 - Toggle Distraction Free (this one is my **favorite**)
*   alt+. - Close Tag
*   ctrl+p - Show the go to overlay panel
*   ctrl+shift+p - Show the command overlay panel
*   ctrl+alt+p - Show the project selector panel
*   ctrl+r - Show the go to overlay panel default to method selector
*   ctrl+g - Show the go to overlay panel default to go to line selector
*   ctrl+; - Show the go to overlay panel default to variable selector
*   ctrl+shift+up - Swap with the line above
*   ctrl+shift+down - Swap with the line below
*   ctrl+/ - Toggle a comment
*   ctrl+shift+/ - Toggle a comment block
*   ctrl+shift+d - Duplicate a line
*   ctrl+` - Display console panel
*   ctrl+space - Auto complete the current selected snippet

I hope this will help you with your development workflow, let me know your thoughts and what plugins you use in the comments below.

You can discuss, upvote this post over at [Hacker News][10] or on [/r/webdev][11].

[0]: https://github.com/buymeasoda/soda-theme
[1]: https://github.com/buymeasoda
[2]: https://gist.github.com/daker/5665850
[3]: http://wbond.net/sublime_packages/package_control/
[4]: https://github.com/SublimeLinter/SublimeLinter
[5]: https://github.com/dz0ny/LiveReload-sublimetext2
[6]: http://wbond.net/sublime_packages/prefixr
[7]: http://prefixr.com/
[8]: https://github.com/titoBouzout/SideBarEnhancements
[9]: https://github.com/sergeche/emmet-sublime
[10]: https://news.ycombinator.com/item?id=5783364
[11]: http://www.reddit.com/r/webdev/comments/1f8anb/5_sublime_text_2_packages_to_enhance_your/