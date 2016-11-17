---
layout: post
title: 'Explode out of your function'
date: '2016-11-17'
---

## Debugging with Jupyter

This had been bugging me for a long while. Jupyter (or IPython) has decent
support for debugging via the magic command `%debug`.

However, it does not quite _cut_ it for me. The problems with it are well known:

 - Cannot run code elsewhere without quitting `pdb` first.
 - Refreshing the notebook would leave you with a non-responsive kernel.
 - `gdb` like syntax, which can be conflict with variable names and introduces surprises.
 - Tab completion doesn't work.
 - Command recall (using arrow keys) doesn't work reliably, etc.

## Bring out the local variables

One of the most useful features of `%debug` is that it allows me to inspect the
current values of the local variables in each frame and I believe that information
itself would be sufficient for me to debug my problems.

## **Force** out the local variables

Hence, I wrote a quick Python function which will allow me to **explode** out of
my functions and will spill _all_ the local variables in my global namespace:

{% highlight python %}
import inspect as I

class Exploded(BaseException): pass

def explode():
  for k, v in I.currentframe.f_back.f_locals.items():
    globals()[k] = v

  raise Exploded()
{% endhighlight %}

To use it, consider the following:

{% highlight python %}
In [42]: def foo():
    ...:     a, b = 101, 42
    ...:     explode()
    ...:

In [43]: a, b = 1, 1  # Setting the global values here, not necessary

In [44]: foo()
---------------------------------------------------------------------------
Exploded                                  Traceback (most recent call last)
<ipython-input-44-624891b0d01a> in <module>()
----> 1 foo()

<ipython-input-34-d9d09911e62e> in foo()
      1 def foo():
      2     a, b = 101, 42
----> 3     explode()
      4

<ipython-input-41-eae3be1cadaa> in explode()
      3         globals()[k] = v
      4
----> 5     raise Exploded()

Exploded:

In [45]: a, b   # These are the local variables from `foo`
Out[45]: 101, 42

{% endhighlight %}

If this helps me out with my debugging as much as I think it will, I will release it as a simple Python package with some more bells and whistles.
