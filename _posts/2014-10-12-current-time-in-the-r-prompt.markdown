---
layout: post
title: Current time in the R prompt
date: '2014-10-12 15:26:10'
permalink: /current-time-in-the-r-prompt/
---

**Update**: [Prof. Duncan Temple Lang](http://www.stat.ucdavis.edu/~duncan/), one of the core developers of R, actually [gave a simpler way](https://stat.ethz.ch/pipermail/r-devel/2014-October/069922.html) of achieving the same thing:

{% highlight r %}
invisible(addTaskCallback(function(...) { 
                 options(prompt = format(Sys.time(), "[%H:%M:%S] >"))
                 TRUE
                 }))

{% endhighlight %}


That almost subsumes the functionality of this package, with one minor shortcoming:

> The only difference is that when you hit return at the prompt with no expression,
> the prompt doesn't change (since there was no task).

----

I wrote a small plugin for R which can include the current time in the R prompt. It can be found [on github](https://github.com/musically-ut/extPrompt).

To use it, run the following commands on R console:

{% highlight r %}
# If needed:
# install.packages('devtools')
library(devtools)
install_github('musically-ut/extPrompt')
library(extPrompt)
{% endhighlight %}

I often find myself accidentally starting a R command without realizing how long it will take to execute. Only after the command has been running for **some arbitrary time** do I realise that I should have at least wrapped it inside a `system.time` to get an idea of how long it takes to run.

This plugin solves the problem by prepending the approximate start time in form of time-stamps to each command. Now by merely looking at the time-stamps on the R console, one can make a good estimate of the running-times of each command.
