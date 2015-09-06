---
layout: post
title: Setting up Kate
date: '2014-07-07 21:58:15'
permalink: /Setting-up-Kate/
---

I just set up [Kate](http://kate-editor.org/) for my pet side-project [Chanslate](https://github.com/musically-ut/chanslate) so that other people wishing to contribute have an easy time.

It took me only a few minutes and it is delightfully easy to use.

### Make a _project_

I [just dropped](https://github.com/musically-ut/chanslate/commit/f393234877403b9ee017e8de1f04b2d9d3def08b) a `.kateproject` file in the root folder with the following content:

{% highlight json %}
{
  "name": "Chanslate",
  "files": [ { "git": 1 } ]
}
{% endhighlight %}

And we were good to go.

You can use [_svn_ or _hg_ too](http://kate-editor.org/2012/11/02/using-the-projects-plugin-in-kate/).

### Setting up Kate

Open the settings: _Settings menu_ → _Configure Kate_.

Then I set up the following:

#### `git` can change files while editing

![Warn about external changes to files](/content/images/2014/Jul/kate-general-config.png)

#### Get autocomplete

![Enable Ctags](/content/images/2014/Jul/kate-plugins-conf.png)

#### Whitespace safety

![Show trailing whitespaces](/content/images/2014/Jul/kate-appearance-conf.png)

![Use only spaces, no tabs](/content/images/2014/Jul/kate-editing-indent-conf.png)

![Remove white spaces on save](/content/images/2014/Jul/kate-open-save-conf.png)

### Optional goodies

#### `vi` mode

![Vi mode in Kate](/content/images/2014/Jul/kate-vi-mode.png)

#### Solarized color scheme

![Solarized colors in Kate](/content/images/2014/Jul/kate-solarized.png)


## Final view

![Kate in action](/content/images/2014/Jul/kate-in-action.png)
