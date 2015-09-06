---
layout: post
title: Tips and Tricks
date: '2015-01-04 22:00:45'
permalink: /Tip-and-Tricks/
---

A collection of random tid-bits I come across during my everyday life which I cannot keep organized anywhere else.

#### Vim tab completion is slow

This happens if the autocompletion has to search through a large file you once opened but have since closed (`SuperTab` does that, for example).

Close such `buffer` by first viewing their number via `:ls` and then `:bwipeout <number-of-buffer>`.

#### Convert `epoch` to TIMESTAMP for PostgreSQL

{% highlight sql %}
SELECT TIMESTAMP 'epoch' + 1373252173850 * INTERVAL '1 millisecond'
{% endhighlight %}

#### `hash` index on PostgresSQL take too long to create

I think if there are a lot of repeated values in a column, the `hash` index takes too long to create because of collisions. It is better to use the default `btree` indexes in those cases.

#### Different prompt when on a remote machine

I often have to [_recall_ instead of _recognize_](http://www-personal.umich.edu/~itm/688/wk8%20-%20Psychology%20and%20Design/designing%20with%20the%20mind%20in%20mind/science-12.pdf) whether I am on a remote machine or a local machine because I have the same `.bashrc` on both machines.

This snippet in my `.bashrc` includes (in bright red color) a string in my bash prompt warning me if I am on a remote machine:

{% highlight bash %}
SESSION_TYPE=local
if [ -n "$SSH_CLIENT" ] || [ -n "$SSH_TTY" ]; then
  SESSION_TYPE=remote/ssh
else
  case $(ps -o comm= -p $PPID) in
    sshd|*/sshd) SESSION_TYPE=remote/ssh;;
  esac
fi

if [ "$SESSION_TYPE" != "local" ]; then
    PS1="${PS1::-2}[\033[01;31m\](ssh session)\[\033[00m\]$ ";
fi
{% endhighlight %}

#### Naming screens

[Give names to screen sessions](http://aperiodic.net/screen/sessionnames) by pressing `Ctrl-a` followed by `:sessionname <name>`. Then the screen can be reattached thusly: `screen -r <name>`.
