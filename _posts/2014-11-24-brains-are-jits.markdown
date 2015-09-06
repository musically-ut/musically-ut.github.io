---
layout: post
title: Brains are JITs
date: '2014-11-24 06:47:11'
permalink: /brains-are-JITs/
---

[Nominolo](http://nominolo.blogspot.ch/) and I were talking about computations.

I postulated that humans were deplorably single threaded: unable to fork off threads to keep thinking on a certain idea (an idea from [Accelerando](http://www.antipope.org/charlie/blog-static/fiction/accelerando/accelerando-intro.html)). Nominolo said that it was obviously wrong because people _can_ chew gum and walk the dog at the same time.

Perhaps human consciousness ([System 2 thinking](http://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow#Two_systems)) is written in a single threaded language (like Javascript) but is running on a multi-core hardware and state of the art OS ([System 1 thinking](http://en.wikipedia.org/wiki/Thinking,_Fast_and_Slow#Two_systems))?

<div class="text-centered">
<img src="http://i.imgur.com/PXvlirq.jpg?1" alt="Thinking man">
</div>

### Just in time

Humans do get better at what they keep doing.

Hence, we can conclude that the language in which humans are coded has a [Just in time compiler (JIT)](http://en.wikipedia.org/wiki/Just-in-time_compilation). The compiler `interprets` the instructions at first, but when the same trace is executed several times, the code is compiled and the computation is offloaded to a separate thread.

<div class="text-centered">
  <img src="http://i.imgur.com/SRbNiHI.jpg?1" alt="Human brain">
</div>


### Not only software

But things are even better. Humans can even [_change their hardware_](http://en.wikipedia.org/wiki/Neuroplasticity) to become more efficient!

Perhaps that is the direction compilers will be taking soon?
