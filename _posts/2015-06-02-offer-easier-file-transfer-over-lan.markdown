---
layout: post
title: 'offer: Easier file transfer over LAN'
date: '2015-06-02 14:47:36'
permalink: /offer-easier-file-transfer-over-lan/
---

Often when I have to transfer a file from my laptop to a device connected to the same LAN, the fastest way is to start a `python -m SimpleHTTPServer` (or `python3 -m http.server`), in the folder on my laptop and point the other device's browser to the IP address of my laptop and the name of the file.

This usually works out fine, until the file I am trying to transfer has a long and complicated name like `nojs-tracking-mouse-_1342097761_demo_package.zip` in a folder which contains thousands of files. I wrote [`offer`](https://github.com/musically-ut/offer) as a quick python script to allow hosting _just one_ file on port `80` (if allowed) or port `8000`:

{% highlight bash %}
> $ sudo offer ~/tmp/c5s5/S5.WD1.0000.C5.items
Serving file /Users/musically_ut/tmp/c5s5/S5.WD1.0000.C5.items on 0.0.0.0:80 ...
Download the file by pointing the browser on the remote machine to:
    	139.19.143.107
Press Ctrl-C to stop hosting.
139.19.143.87 - - [02/Jun/2015 16:42:27] "GET / HTTP/1.1" 200 -
139.19.143.87 - - [02/Jun/2015 16:42:47] "GET / HTTP/1.1" 200 -
^C
Keyboard interrupt received, exiting.
{% endhighlight %}

Available on Github: <span class="devicons devicons-github_badge"></span>[musically-ut/offer](https://github.com/musically-ut/offer)
