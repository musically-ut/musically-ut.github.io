---
layout: post
title: 'First commit to CPython: What the timedelta was that?'
date: '2017-09-07'
---

So I recently got my first commit merged into <span class="devicons devicons-github_badge"></span>[python/CPython](https://github.com/python/cpython), the canonical Python implementation. If all goes well, then it will very likely be included in Python 3.7 which is due to be released in a few months at the time of writing.

This is not the [first time I've contributed](https://github.com/search?utf8=%E2%9C%93&q=is%3Apr+author%3Amusically-ut&type=) to an OSS project. However, I think this is by far the most impactful, albeit small, contribution I've made in terms of people who are likely to use it.

## The problem

Let's say you typed the following on your favourite Python REPL:

{% highlight python %}
from datetime import datetime as D
D.fromtimestamp(1390953543.1) - D.fromtimestamp(1121871596)
# Output: datetime.timedelta(3114, 28747, 100000)
{% endhighlight %}

Can you guess what the three numbers `3114`, `28747`, `100000` stand for?

Maybe you know this because you've used `datetime.timedelta` so often that the meaning of the numbers is obvious to you.
However, it is more likely that you, [like Guido](https://marc.info/?l=python-dev&m=145066335824146&w=2), will make a mistake.

The proposal was to change the `repr`esentation of `timedelta`s to the following:

{% highlight python %}
datetime.timedelta(days=3114, seconds=28747, microseconds=100000)
{% endhighlight %}

This is what my [pull request](https://github.com/python/cpython/pull/1493) changed.

Sounds fairly simple, right?

## Technical issues

The first issue: `timedelta.repr` is explicitly described [in the documentation](https://docs.python.org/3/library/datetime.html#timedelta-objects) in some detail:

{% highlight python %}
repr(t):
Returns a string in the form datetime.timedelta(D[, S[, U]]), where D is negative for negative t.
{% endhighlight %}

> Not a problem, will update the documentation along the way.

The next problem was that `datetime` module is implemented both as a Python module (the pure implementation) as well as a C module (the fast implementation).
I was a little puzzled by this and Victor <span class="devicons devicons-github_badge"></span> [haypo](https://github.com/haypo) on the core-mentorship was very helpful in explaining the reasoning behind this (if you are curious, I'd encourage you to look at [PEP 399](https://www.python.org/dev/peps/pep-0399/)).

> Not a problem, will fix the implementation at both places.

During this process, I discovered that the Python implementation was [not being tested at all](https://github.com/python/cpython/pull/1493#discussion_r125096967) because of some gymnastics in creation of the test cases in `test_datetime.py`.

> Not a problem, will fix that first [in a separate PR](https://github.com/python/cpython/pull/2530).

That PR got merged in on July 2. :hurray: Now to rebase the original PR on .... wait.
Something weird happened. The tests started running alright, but they starting failing on the [buildbots](http://buildbot.python.org/all/waterfall)!

Ah, the tests on the Python version were enabled which took a whopping 20+ minutes to run on the buildbot machines and timed out, causing failures.

> Not a problem, will debug it.

Found the issue: some tests were running three times and [Serhiy](https://github.com/serhiy-storchaka) de-duplicated the tests [in a separate PR](https://github.com/python/cpython/pull/2534). That reduced the run-time significantly, but the tests still timed out.

Oh, well, tests are gonna test and there's nothing you can do ... 

However, a red buildbot is a problem and Victor [actually rolled back the PR](https://github.com/python/cpython/pull/2588) to make the buildbots green again as a part of a new policy: revert first, ask questions later. Incidentally, I was the first person to whose Pull Request this policy was applied.

Just like that, my first contribution to Python was reverted in less than 72 hours. :sad-trombone:

As a sidenote, Victor told me on the `#python-dev` IRC channel that breaking buildbots was an initiation step for core-developers and it was getting rather difficult to break them with tests succeeding locally. So I've got that going for me, which is nice.

After about a fortnight, a more permanent fix was decided upon: [running only a subset of tests on the buildbots](https://github.com/python/cpython/pull/2775).
The original PR hadn't remained static during this time either, there were [memory leaks](https://github.com/python/cpython/pull/1493#pullrequestreview-46615195)!

> Not a problem, will plumb them like me-a-Mario!

I had to get a little more used to the C-API of Python before I could write code with some confidence. The inbuilt Python reference checker proved to be indispensable.

> Finally, have to convince people that it is a good idea.

This turned out to be the [trickiest part](https://bugs.python.org/issue30302). Reasons some people were against it:

  - It increases the size of `repr`.
  - Could do with more features (like factoring out the negative sign).

> Err ... stalemate? 

Finally, Victor made a [judgement call](https://bugs.python.org/msg299152) and merged the changeset in! :hurray: again!

> But wait, there's more!

However, things were not quite over yet. During the re-basing of the branch over the one with the fix for the tests, I accidentally left an artifact in, which had to be cleared up in [yet another PR](https://github.com/python/cpython/pull/2891). Then I also wrote a [`WhatsNew` and a `Porting to Python 3.7` entry](https://github.com/python/cpython/pull/2929).

Finally, a few months after the PR, I noticed that there were still instances in the documentation with the old output and so I sheepishly made [another PR](https://github.com/python/cpython/pull/3687) to fix those. 

⋈

## Conclusion

So what did I learn from here?

I've been interested in contributing to OSS ever since I was in college (I still remember my first patch to Octave). It was messy to send patches around and merging fixes in. 
The contribution process has been made much simpler, thanks to the presence of GitHub. 
For this PR, the entire process lasted for more than 2 months and was rather involved (what with the bug-within-the-feature and the rollbacks and the judgement calls). 
It would have been much messier if it wasn't for GitHub's familiar UI.

However, I came out happy on the other side. The community was very very helpful and not once did the issue of me being a first time contributor come up. I too was excited about the process and ended up pestering people a tad bit too much, I think.

In the end, my take-away was that I perhaps should have led with changes in documentation instead of by changing code (the inline documentation for `datetime` on the REPL is still pretty terrible). That would probably have been easier to get through rather than getting people to agree on something which _may_ cause backwards compatibility issues.

But as they say:

> Doesn't matter, got merged.
