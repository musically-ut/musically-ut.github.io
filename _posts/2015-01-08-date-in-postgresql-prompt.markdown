---
layout: post
title: Current time in PostgreSQL prompt
date: '2015-01-08 12:12:27'
permalink: /date-in-postgresql-prompt/
---

I like having current time in my command prompts. It helps me keep track of how long a command has been running after I have become a little scared of losing all the progress the command has already made. It also allows for some cheap profiling.

To be able to do it in `R`, I created [a small extension](http://blog.musicallyut.in/current-time-in-the-r-prompt/) and doing it in [bash is easy](http://bneijt.nl/blog/post/add-a-timestamp-to-your-bash-prompt/).

It is somewhat easier than `R` but trickier than `bash` to do in the `psql`. It is possible because you can actually embed output of shell commands while expanding the `PROMPT1` variable! Since `date` is available on most systems, you can just execute it and embed the output of `date` into the prompt:


    \set PROMPT1 '%`date +%H:%M:%S` >'

----

Personally, I like to have a dash of color on my prompts. Hence, I have the following line in my `~/.psqlrc` file:

```
\set PROMPT1 '(%n@%M:%>) %[%033[00;33m%]%`date +%H:%M:%S`%[%033[00m%] [%[%033[01;31m%]%/%[%[%033[00m%]] > '
```
