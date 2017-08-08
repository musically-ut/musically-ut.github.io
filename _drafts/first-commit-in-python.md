---
layout: post
title: 'First commit to CPython: What the `timedelta` was that?'
date: '2017-07-29 15:40:40'
---

So I recently got my first commit merged into <span class="devicons devicons-github_badge"></span>[python/CPython](https://github.com/python/cpython), the canonical Python implementation. If all goes well, then it will very likely be included in Python 3.7 which is due to be released in a few months at the time of writing. 

This is not the [first time I've contributed](https://github.com/search?utf8=%E2%9C%93&q=is%3Apr+author%3Amusically-ut&type=) to an OSS project. However, I think this is by far the most impactful, albeit small, contribution I've made in terms of people who are likely to use it.

## The problem

Let's say you typed the following on your favourite Python REPL:

{% highlight python %}
from datetime import datetime as D
D.fromtimestamp(1390953543.1) - D.fromtimestamp(1121871596)
# datetime.timedelta(3114, 28747, 100000)
{% endhighlight %}

Quick, can you guess what the three numbers `3114`, `28747`, `100000` stand for?

Maybe you know this, maybe you've used `datetime.timedelta` so often that the meaning of the numbers is obvious to you.
However, it is more likely that you, [like Guido](https://marc.info/?l=python-dev&m=145066335824146&w=2), will make a mistake.

The proposal was to change the `repr`esentation which is output to the following:

{% highlight python %}
datetime.timedelta(days=3114, seconds=28747, microseconds=100000)
{% endhighlight %}

This is what my [pull request](https://github.com/python/cpython/pull/1493) changed.

Sounds fairly simple, right?

## Technical issues

The first problem was that `datetime` module is implemented both as a Python module (the pure implementation) as well as a C module (the fast implementation).

 - datetime exists both as a Python as well as a C module.
 - Haypo on core-mentorship was very helpful and I got to know of PEP XYZ.
 - It turned out that the Python version was not being tested, fixed that as a separate PR.
 - Memory leaks!
 - Broke the build bots.
 - The fix had a bug (running tests in triplicate).
 - Fixed that bug, but the build bots were still broken.
 - First person whose commit was reverted due to build bot failures! Was one of the required things for the Core-developers! :D
 - That problem was fixed by disabling extensive testing of the datetime module.
 - In the meanwhile, people were opposed to it because of the increased size of the repr and wanted more features (like factoring out the 
 - Finally Haypo made a judgement call and merged the pull request!
 - But oops! Rebase artifacts!

## Conclusion

So what did I learn from here?

I've been interested in contributing to OSS ever since I was in college (I still remember my first patch to Octave). It was messy to send patches around and merging fixes in. 
The contribution process has been made much simpler, thanks to the presence of GitHub. 
The entire process lasted for more than 2 months and was rather very messy. 
It would have been much messier if it wasn't for GitHub's familiar UI.
