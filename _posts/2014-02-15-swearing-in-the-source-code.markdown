---
layout: post
title: Swearing in the source code
date: '2014-02-15 17:15:33'
---

Swear words should never make it to production, but I don't mind them _at most places_.

## Swearing in a Blogging platform

Case in point is [a line in the Ghost source code](https://github.com/TryGhost/Ghost/commit/983002cf796cda53d06b9da46ea5bf0a622c3d61).

This is the diff of the commit:

{% highlight diff %}
{% raw %}
 <section class="entry-preview-content">
       <div class="rendered-markdown">
-   {{!The content gets inserted in here, bitches!}}
+   {{!The content gets inserted in here, fuckers!}}
	</div>
 </section>
{% endraw %}
{% endhighlight %}

Whether it should be in the source code at all is a matter of taste. However, I think that it has been put at a **very** dangerous place: a `HTML template` file.

HTML files generated from it are served to your readers.

A single typo can send mal-formed comments to the browser and you will greet your readers with the subtle message `{ {!The content gets inserted in here, fuckers`. This [has happened before](http://www.elezea.com/2014/02/lorem-ipsum-gone-wrong/).

Please don't put swear words in your HTML template files, even in comments.

Even better, keep them limited to commit messages.

----

**PS:** Actually, this comment is in the file which is served to the editors and is fairly low risk unless the editor goes poking around the source code (like me). Nevertheless, the original point stands.
