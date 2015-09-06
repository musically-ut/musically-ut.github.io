---
layout: post
title: Hex colors which are English words
date: '2014-06-19 16:14:14'
permalink: /hex-colors-which-are-english-words/
---

Out of curiousity, I wanted to find out how many words of English are valid HTML colors.

The following one-liner (white-space introduced for clarity):

{% highlight bash %}
cat /usr/share/dict/words | 
    perl -E 'while(<>){ 
       chomp; 
       next if length($_) != 6; 
       say if m/^[a-f]+$/i; 
    }'
{% endhighlight %}

<div style="font-family: monospace; font-size: 150%; margin: 0 auto;">
<div style="margin: 0 auto;"><span style="color: #accede; background-color: #eee; padding: 0 1em;">accede</span> <span style="color: #accede; background-color: #111; padding: 0 1em;">accede</span> <span style="background-color: #accede; color: #111; padding: 0 1em;">accede</span> </div>
<div style="margin: 0 auto;"><span style="color: #bacaba; background-color: #eee; padding: 0 1em;">bacaba</span> <span style="color: #bacaba; background-color: #111; padding: 0 1em;">bacaba</span> <span style="background-color: #bacaba; color: #111; padding: 0 1em;">bacaba</span> </div>
<div style="margin: 0 auto;"><span style="color: #baccae; background-color: #eee; padding: 0 1em;">baccae</span> <span style="color: #baccae; background-color: #111; padding: 0 1em;">baccae</span> <span style="background-color: #baccae; color: #111; padding: 0 1em;">baccae</span> </div>
<div style="margin: 0 auto;"><span style="color: #beaded; background-color: #eee; padding: 0 1em;">beaded</span> <span style="color: #beaded; background-color: #111; padding: 0 1em;">beaded</span> <span style="background-color: #beaded; color: #111; padding: 0 1em;">beaded</span> </div>
<div style="margin: 0 auto;"><span style="color: #bedded; background-color: #eee; padding: 0 1em;">bedded</span> <span style="color: #bedded; background-color: #111; padding: 0 1em;">bedded</span> <span style="background-color: #bedded; color: #111; padding: 0 1em;">bedded</span> </div>
<div style="margin: 0 auto;"><span style="color: #bedead; background-color: #eee; padding: 0 1em;">bedead</span> <span style="color: #bedead; background-color: #111; padding: 0 1em;">bedead</span> <span style="background-color: #bedead; color: #111; padding: 0 1em;">bedead</span> </div>
<div style="margin: 0 auto;"><span style="color: #bedeaf; background-color: #eee; padding: 0 1em;">bedeaf</span> <span style="color: #bedeaf; background-color: #111; padding: 0 1em;">bedeaf</span> <span style="background-color: #bedeaf; color: #111; padding: 0 1em;">bedeaf</span> </div>
<div style="margin: 0 auto;"><span style="color: #decade; background-color: #eee; padding: 0 1em;">decade</span> <span style="color: #decade; background-color: #111; padding: 0 1em;">decade</span> <span style="background-color: #decade; color: #111; padding: 0 1em;">decade</span> </div>
<div style="margin: 0 auto;"><span style="color: #deface; background-color: #eee; padding: 0 1em;">deface</span> <span style="color: #deface; background-color: #111; padding: 0 1em;">deface</span> <span style="background-color: #deface; color: #111; padding: 0 1em;">deface</span> </div>
<div style="margin: 0 auto;"><span style="color: #efface; background-color: #eee; padding: 0 1em;">efface</span> <span style="color: #efface; background-color: #111; padding: 0 1em;">efface</span> <span style="background-color: #efface; color: #111; padding: 0 1em;">efface</span> </div>
<div style="margin: 0 auto;"><span style="color: #facade; background-color: #eee; padding: 0 1em;">facade</span> <span style="color: #facade; background-color: #111; padding: 0 1em;">facade</span> <span style="background-color: #facade; color: #111; padding: 0 1em;">facade</span> </div>
</div>

Most of the colors appear pastel because `[a-f]+` only allows for `(36.0 / 256) ** 3 ~ 0.3%` of all the colors. These are also the colors which are closest to white `ffffff`.

- `bacaba` is a South American fruit
- `baccae` is plural of `bacca`, also a kind of fruit
- `bedead` and `bedeaf` don't seem to have any meaning


----

#### Update

If you allow some [1337](http://en.wikipedia.org/wiki/Leet), then the number balloons to 817.

{% highlight bash %}
cat /usr/share/dict/words | 
    perl -E 'while(<>){ 
        chomp; 
        next if length($_) != 6;
        say if m/^[a-folist]+$/i;
    }' | 
    perl -E 'while(<>){ 
        chomp; 
        $a = $_;
        tr/olistOLIST/01157011570/;
        say "$_, $a"; 
    }'
{% endhighlight %}

