---
layout: post
title: 'Artificial Latency: A How To'
date: '2014-06-29 13:29:18'
permalink: /Artificial-Latency-A-How-To/
---

So you have a client side app written in javascript and you are [worried about latency](https://www.igvita.com/2015/01/26/resilient-networking/). This latency is inevitable and can arise in loading assets as well as in AJAX calls. Now you have taken care of those situations and have written your app to behave gracefully in those waiting periods.

# The problem

However, how do you test the behavior of your app in these cases when all you have is blazing fast access to the Internet?

We would want the test to be easy to turn on an off. 

> Ideally, it would be as simple as changing only the source code of the app (the HTML or the `apiPrefix`) and reloading the browser.

## The setup

Your development setup probably looks like this:

![Original architecture](/content/images/2014/Jun/No-delay-situation.svg)

In the normal _no-artificial-delay_ situation, your app is served by a _Local Webserver_:

![Requests made from the app](/content/images/2014/Jun/No-delay-working.svg)

The _Local Backend_ might be merged with the _Local WebServer_ (like in _Rails_ or _Jetty_) or it could be running separately (as depicted). The backend may be running locally or the web-server may be proxying requests to a sandbox backend hosted on the Internet. Optionally, your app may load some assets from the internet directly.

## The remote assets

Loading of those assets is relatively easy to delay and test.

![Delay proxy for remote server](/content/images/2014/Jun/With-delay-remote.svg)

> You can use a delay proxy by replacing the URL of your resource `http://remote.com/asset.png` by `http://deelay.me/5000/http://remote.com/asset.png` 

<span style="color: grey; font-size: 0.8em;">* Note the double `ee` in `deelay`.</span>

[Deelay.me](http://deelay.me) is an delay proxy which will redirect the browser to the original URL after sufficient delay.

However, _Deelay.me_ has some short-comings. You cannot access resources over `https` and it does not set the correct CORS headers. I am working on a project [receive-in](https://github.com/musically-ut/receive-in) to address these issues.

**Update**: It turns out that what I was trying to do via CORS header is [explicitly not allowed in the spec](http://stackoverflow.com/questions/24135854/why-does-cors-specification-not-allow-redirects). However, the spec _may_ allow this behavior if a compelling use-case comes up.

## The local assets

You can take a similar approach here.

![Delay proxy for remote and local assets](/content/images/2014/Jun/With-delay-local-remote.svg)

I would recommend running [OpenResty](http://openresty.org/) (configured `--with-luajit`). Then you can configure your `nginx` to delay all paths with the prefix `/delay/([0-9]+)/` with the following `location` block:

{% highlight nginx %}
location ~ ^/delay/(?<delay>[0-9]+)/(?<oldUri>.*)$ {
    rewrite_by_lua '
        ngx.sleep(ngx.var.delay / 1000);
        ngx.req.set_uri("/"..ngx.var.oldUri);
    ';

    proxy_pass http://localhost:8000; # Your server
}
{% endhighlight %}

> Now, you will be able to introduce a _5 sec_ delay by replacing an API call to `/api/user/1` by `/delay/5000/api/user/1`.

**Hack:** You can make this work for remote servers too if you edit the `hosts` file and redirect request to the Internet to your local machine.

## Other solutions

If you do not want to go through the trouble of installing _OpenResty_ and running a local webserver, then one of the following solutions may work for you.

### The backend

If you are running your backend locally, then you can delay individual requests on your backend itself:

![Delay requests on the backend](/content/images/2014/Jun/With-delay-local-server.svg)

If you are developing an integrated web-server + backend application, then this might be the easiest option for you. However, the server may not allow you to easily add latency while serving files from the HDD.

### The network interface

If you are on _linux_ then you can slow down your [`lo` connection](http://stackoverflow.com/a/14759494/987185). However, but this slows down everything, which may be too much if you want to test how delay affects _one_ request.

On `Mac OSX`, there is a [Network Link Conditioner tool](http://nshipster.com/network-link-conditioner/) which can slow down the connection for you. It can simulate 3G, WiFi, high latency DNS, etc. connections as well, which can be great to assess the behavior of your app on those networks. However, this too slows all the connections, which is not what we want while testing for the slow response for certain requests.

### Delay in the local-webserver

Often the _Local WebServer_ will allow usage of some middleware to delay the requests:

![Delay the proxy](/content/images/2014/Jun/With-delay-proxy-server-remote.svg)

#### Grunt

If you are using [`grunt`](http://gruntjs.com/) as part of your workflow and using `grunt-contrib-connect` or `grunt-express` to serve your app, then you can use [`grunt-connect-delay`](https://www.npmjs.org/package/grunt-connect-delay) to delay your requests by _5 secs_ by prefixing them with `/delay/5000/`. I have written an [example app](https://github.com/musically-ut/grunt-connect-delay-example) while using it.

For an example of how the plugin can be of use, have you ever thought what would happen if your fonts loaded very slowly?

<div class="text-centered">

    <iframe width="560" height="315" src="//www.youtube.com/embed/FA7t_9fS_xw?rel=0" frameborder="0" allowfullscreen></iframe>

    <iframe width="560" height="315" src="//www.youtube.com/embed/DGylKoMIfM8?rel=0" frameborder="0" allowfullscreen></iframe>

    <iframe width="560" height="315" src="//www.youtube.com/embed/gX9vmcoX4Jo?rel=0" frameborder="0" allowfullscreen></iframe>
</div>

## Other resources

If there are delays, then you should always give users a sense of progress. These resources will help you do that:

 - [PaceJS](http://github.hubspot.com/pace/docs/welcome/): For indicating loading of the whole page.
 - [Ladda](http://lab.hakim.se/ladda/): For showing loading indicators on those buttons.
 - [Offline](http://github.hubspot.com/offline/docs/welcome/): If the Internet dies on you, you should still fail gracefully.
