---
layout: post
title: Dollar family of gesture recognizers
date: '2015-10-03 21:24:40'
---

University of Washington has a project with the awesome name [dollar family of gesture recognizers](http://depts.washington.edu/aimgroup/proj/dollar/index.html).

They have demonstrations to go with their recognizers, but:

  - the JavaScript implementation they provided is a single JS file which pollutes the global namespace and cannot be used together with other
    recognizers they provide (e.g you cannot $1 and $P recognizers because the definition of `Point` class is different in both).
  - the demos do not work on touch devices D:

So I [wrapped it in bower](https://github.com/musically-ut/dollar-family) and
made a [demo](https://blog.musicallyut.in/dollar-family/) where you teach a $P
recognizer about Latin alphabets.

I was **amazed** by how quickly it learns and well it is able to generalize from
even a single example to categorizing cursive handwriting which barely looked
like the original templates.

 - [<span class="devicons devicons-github_badge"></span> musically-ut/dollar-family](https://github.com/musically-ut/dollar-family)
 - [<span class="fa fa-external-link"></span> blog.musicallyut.in/dollar-family/](https://blog.musicallyut.in/dollar-family/)
