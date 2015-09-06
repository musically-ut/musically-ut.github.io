---
layout: post
title: Meteor and Bower
date: '2014-12-02 01:57:51'
permalink: /meteor-and-bower/
---

**TD;DR**: Use the following in your `.bowerrc`:

{% highlight json %}
{
  "directory": ".defs"
}
{% endhighlight %}

This way, Meteor will not build the files inside the folder (because the name starts with a period). Then symlink the relevant CSS/HTML/Javascript files into your project at a place where they will be picked up by Meteor, like `bower_component` folder.

----


[Meteor](http://meteor.com) is a framework for making Web Apps. Meteor has its own package management, i.e. [Atmosphere](https://atmospherejs.com/).

[Bower](http://bower.io) is a package manager for Web Apps [which has some nice features](http://css-tricks.com/whats-great-bower/). Usually, the packages on Atmosphere should suffice for Meteor apps.

However, there sometimes are packages which are not available on Atmosphere but are available via Bower. Actually, any git repository can be installed and updated via Bower. Though it would be nice to release a new package on Atmosphere, but it is best [to pick your battles](http://zef.me/4235/pick-your-battles/); if you want to build something fast, then one shouldn't be taking detours. Also, packages like [meteor-typescript-libs](https://github.com/meteor-typescript/meteor-typescript-libs) and [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped), which are helper files for compiling Typescript files, are not well suited to be Meteor packages.

The default directory `bower` installs its components in is `bower_component/` at the root of your project. The problem with using this folder is that it will be picked up by Meteor which try to utilize all the HTML, CSS and Javascript (and possibly other files too) inside those folders. Usually there is a single file which is what we wish to include in our Meteor app. Hence, we will install the bower components in a `.folder`. Meteor does not pick up files which are in a folder whose name starts with a period.

Now to actually get the file to be picked up by Meteor, just include a symbolic link from the `.folder` to a place where Meteor will pick it up.

The symbolic linking problem could be automated, but not until [the Bower team can decided the format of specifying the `main` file](https://github.com/bower/bower/issues/935).
