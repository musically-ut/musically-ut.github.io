---
layout: post
title: jQuery via bookmarklet
date: '2014-06-08 21:26:19'
---

I tinker often with external webpages and sometimes miss having jQuery available there. Then I use the following link as a bookmarklet, which just loads jQuery into the active page:

<a href="javascript:!function(){var s=document.createElement('script'); s.src='//code.jquery.com/jquery-1.11.0.min.js'; document.body.appendChild(s)}()"><button>Load jQuery</button></a>

Right click on the button above, add to your bookmarks and you'll never have to go on your explorations without jQuery on Chrome.

If you have a Bookmark Toolbar, then you can just click and drag there as well.

**Note:** Doesn't work on Firefox 29.

### How it works

It executes the following code on the active page:

{% highlight javascript %}
!function(){
    var s=document.createElement('script'); 
    s.src='//code.jquery.com/jquery-1.11.0.min.js'; 
    document.body.appendChild(s)
}()
{% endhighlight %}

This fetches and loads `jQuery` on the page.
