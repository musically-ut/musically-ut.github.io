---
layout: post
title: Software development is hard but
date: '2014-04-17 17:00:13'
permalink: /Software-development-is-hard-but/
---

that is a lame excuse to deliver half hearted products.

The case in point is the [My Vodafone (India) android app](https://play.google.com/store/apps/details?id=com.mventus.selfcare.activity).

At the time of writing, if you press the button `My Requests` after opening the app, you are greeted with this which looks like a debug alert put in to test a codepath:

<div style="text-align: center">
<img src="/content/images/2014/Apr/Screenshot_2014_04_17_15_37_24.png" alt="Screen shot of Vodaphone App's My Request screen">
</div>

On clicking `Ok`, the app returns to the home pane instead of the `My Requests` pane.

I used to be fairly tolerant of these mistakes. I have seen my share of these, [as I am sure have you](http://thedailywtf.com/Series/Error_0x27_d.aspx) but I have tried to smile and say:

> No use in complaining about things you cannot do anything about.

or 

> The rest of the app works rather well, so I can ignore this minor infarction.

(except that the rest of the app also had bugs).

That attitude helped me sail through years of badly made Windows app (oh, the custom application installers!).

*After I have started to work on such user facing applications myself, I have found that I have become **less** tolerant.*

Somethings just looks like shoddy engineering to me now and they make me mad.

This is not the only problem with the app, the reviews on the [app's page](https://play.google.com/store/apps/details?id=com.mventus.selfcare.activity) detail more bugs which I encountered.

At times like these, I feel that unless we, the users, start complaining *loudly*, things will not change.

----

### Actually ...

It makes me feel bad. 

I would never want to ship such a software and I am under constant stress that I accidentally will. After all, I am working with [Javascript](https://www.destroyallsoftware.com/talks/wat‎).

I guess I am mad because that is what I now _expect_ my customers to react when they see that something does not *just work*. I *want* every programmer to suffer as much as I would were this bug present in my app. I perhaps get mad because I suspect that they will not. I'll admit that it is a very ego-centric view of the problem.

At times like these, software engineering feels like a [navel-gazing industry](http://www.jwz.org/blog/2011/11/watch-a-vc-use-my-name-to-sell-a-con/).

----

### So now what ...

I guess the solution is to make it easier to write software which is correct by construction.

I am convinced that having static types is a Good Thing (TM).

As long as a script is less than 100 lines of code, Python is going to beat the socks off any other language when it comes to ease of implementation. However, as soon as the script starts to grow into *software*, Python's dynamic types very soon become difficult to manage.
 
Thankfully, at [Better](http://better.com/), we use Haskell for the backend. So that's that.

On the front-end side, Javascript is going to stay with us for a long time. So it is going to boil down to [test](http://stackoverflow.com/questions/300855/javascript-unit-test-tools-for-tdd), [test](https://browserling.com/), [test](http://www.browserstack.com/).

In my experience, moving to [Typescript](https://typescript.codeplex.com/) helps a lot. [Dart](https://www.dartlang.org/) also looks promising. 

----


I don't know whether this will help catch the problem I mentioned at the start. I haven't done much Android work, but I am sure this problem would have been noticeable even on the most basic form of *testing*, i.e. using the app. 

I don't think that this rant is going to prevent me from flaring up the next time I see an eff-up. However, the hope is that if developers start using better tools, we'll see fewer of those.

*Fingers crossed.*
