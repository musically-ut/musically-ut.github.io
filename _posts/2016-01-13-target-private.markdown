---
layout: post
title: 'target="_private" proposal for W3C'
date: '2016-01-15 15:40:40'
---

I made a proposal to the W3C about adding a new browsing context named `_private`, in league with `_blank` and `_new`, to pop open a certain link in a private mode (if you use Firefox) or in Incognito mode (if you are using Chrome).

I am including my e-mails and the responses here in the order that I got them to maintain the history of whatever happens about that proposal in a sequential coherent manner. I am going to omit unnecessary details and keep it the sequential order with only the inline quotes. The recipient in all cases was the [WebAppSec WG](mailto:public-webappsec@w3.org).


----

**From:** Utkarsh Upadhyay <musically.ut@gmail.com>

Hi all,

Most browsers now have a private browsing mode, which offer similar features, i.e. browsing history is not recorded, cookies are not saved, localstorage is flushed when the context ends, and some other forms of isolation.

I think it would make sense to formalize such a browsing context and allow a webpage to specify that the "target" for an `<a>` link is "_private", so that the page opens in private mode. I can imagine several use-cases for this, ranging from aggregator sites offering a privacy preserving browsing mode to developers using it for maintaining two sessions on apps they are developing. For example, Reddit may offer a mode in which all NSFW links automatically open in private mode. Several browser extensions/addons (including one by me) have been developed to "work-around" this problem and I think that the browser itself is the best place to remedy the issue.

Does this make sense or are there better alternatives/previous proposals which deal with this?

I had initially posted this here: <https://github.com/whatwg/html/issues/493> and Anne recommended running it by this mailing list to see if there is any interest in it.

Thanks!

~
ut

----

**From:** Richard Barnes <rbarnes@mozilla.com>

This seems like an OK idea.  It certainly seems better-formed than previous approaches.  As Utkarsh points out, there are already addons that support this feature, and Firefox and Chrome both have "Open in new private window" if you right-click.


----

**From:** Patrick Toomey <patrick.toomey@github.com>

I don't dislike the idea, but I wonder if it is as trivial as it seems. For example, do any browsers currently support a per-window private mode? With Chrome, it seems like the current implementation supports two contexts, incognito and non-incognito. For example, let's say I do the following:

* open a private mode window with "New incognito window"
* visit a site (say www.somesite.com)
* login

If I then go back to my non-incognito window and open a new private mode window using "New incognito window", the new window seems to have the same context as my first incognito window. If I go back to www.somesite.com, my cookies are shared and I am currently logged in. 

It seems as though, if one is going to allow a third-party site to initiate opening of a private-mode window, it might be better to force a new browsing context, with nothing shared with any existing private mode windows. That sounds doable, and possibly even trivial. But, it does seem like those kinds of things would have to be more fully fleshed out. 

----

**From:** timeless <timeless@gmail.com>

> I don't dislike the idea, but I wonder if it is as trivial as it seems. For
> example, do any browsers currently support a per-window private mode?

I believe Chrome is pretty close to being able to do it, since afaict,
it supports multiple active user profiles.

> With
> Chrome, it seems like the current implementation supports two contexts,
> incognito and non-incognito. For example, let's say I do the following:
>
> * open a private mode window with "New incognito window"
> * visit a site (say www.somesite.com)
> * login
>
> If I then go back to my non-incognito window and open a new private mode
> window using "New incognito window", the new window seems to have the same
> context as my first incognito window. If I go back to www.somesite.com, my
> cookies are shared and I am currently logged in.

Yeah, the current system means that an evil site could figure out that
you're using incognito and link the two (normal, incognito) if we
don't do what you propose. Although, technically most sites could just
assume that two clients w/ the same ip and general browser shape are
probably the same even if credentials don't match...

> It seems as though, if one is going to allow a third-party site to initiate
> opening of a private-mode window, it might be better to force a new browsing
> context, with nothing shared with any existing private mode windows. That
> sounds doable, and possibly even trivial. But, it does seem like those kinds
> of things would have to be more fully fleshed out.


The UX will not be fun to design. Because you then have to explain
visually to a user that this private window isn't connected to that
private window.

I'm not opposed to this feature, just warning about the problems that
it entails...

----

**From:** Patrick Toomey <patrick.toomey@github.com>

> Yeah, the current system means that an evil site could figure out that
you're using incognito and link the two (normal, incognito) if we
don't do what you propose. Although, technically most sites could just
assume that two clients w/ the same ip and general browser shape are
probably the same even if credentials don't match...

I was more thinking about maliciousness between browsing contexts. For example, while incognito mode doesn't seem explicitly designed for this, let's say I open up an new incognito mode window and visit www.supersecretsite.com and login. And, let's say there is some GET based XSS that can be triggered on that site. I would personally assume that there should be no way for a non-incognito window to initiate a request (particularly one that is using my incognito cookies) to my incognito window with the XSS payload. It feels as though the possibility of such a scenario violates a privacy expectation.

----

**From:** Joel Weinberger <jww@chromium.org>

Why is the current Firefox/Chrome approach of offering an "open in private window" menu choice not sufficient? It seems like it provides strictly more user control, and I don't really see a time when a site would know better than the user that it should be "private".

Which also raises the question of what "private" actually means. The Chrome guarantees are misunderstood commonly enough, and I suspect are not consistent with Firefox's guarantees. This feature would require formalizing these modes, and that seems tricky at best, since the user agents are not necessarily providing the same guarantees.

In any case, I'd like to better understand the use case of when a site knows that a link should be opened "privately" and it shouldn't be the users choice before we go too far down this path.


----

**From:** Crispin Cowan <crispin@microsoft.com>

Sorry, I don’t like it. The decision to go “in private” is the user’s, based on their particular social context of whether they want this browsing to be discoverable. The web site has no business telling the browser whether or not to preserve this browsing history.
 
Some examples:

 - Shopping for jewelry: not normally salacious, but one might want to do it in-private if shopping for a spouse’s surprise gift, and especially if one is shopping for a secret mistress’s gift.
 - Gay sites don’t need to be in-private at all if you are George Michael, but they really need to be in-private if you are Larry Craig.
 - I use my history a lot, and my wife does not care at all what sites I visit. I would be REALLY offended if a web site turned off my history for me.

 
The one counter-example I can think of is AshleyMadison.com which the typical user would just about always want to be in-private. Except for the journalists & such who investigated it after the scandal broke, and they would probably be annoyed at having their history blocked.
 
So, no thanks, don’t want to do that.

----

**From:** Utkarsh Upadhyay <musically.ut@gmail.com>

Thanks for the feedback and the lively discussion!

 > In any case, I'd like to better understand the use case of when a site knows that a link should be opened "privately" and it shouldn't be the users choice before we go too far down this path.

I haven't thought about it exhaustively but have accumulated a few use cases from the experience of developing an extension to help users with switching to incognito mode.

First use case was of websites knowing *risky clicks* and providing a _safe_ way to make sure that the user doesn't have to clean up after himself, i.e. NSFW links on their content. Reddit was an example I provided in my original mail but other news sites will probably also find use for it.

Second use case was being able to give users clearer instructions. An example of such a case I recently ran across was here: <https://support.google.com/accounts/answer/6160500?hl=en>

Relevant part of the page:

> Sign in to your Google Account on android.com/devicemanager. If you're helping a friend with their lost device, we recommend opening an incognito tab in Chrome and having them sign in to the Google Account they use on their mobile device.

Such instructions can be simplified by linking to the website with target="_private". Other links which may accidentally reveal personal information (think direct links to bank account balance page) can also be made save by setting target="_private".

Thirdly, and what prompted me to think of this proposal, was that opening an incognito window through an extension on Chrome is rather convoluted (uses background scripts) and fragile. It may not continue to work, for example, when https://developer.chrome.com/extensions/manifest/externally_connectable is enforced. In any case, the extension requires permissions to access _all_ data across _all_ websites, which already should be raising eyebrows. I'd rather have this provided by the site + the browser, both of which I trust more than a third party plugin.

Do these make sense?

> This feature would require formalizing these modes, and that seems tricky at best, since the user agents are not necessarily providing the same guarantees.

If several browsers are providing independent implementations of features which _sound_ similar, isn't this is a good time to standardize it, even if it takes a bit of effort?


~
ut


----

**From:** Joel Weinberger <jww@chromium.org>

They make sense, but I don't find them terribly convincing ;-) I've inlined some responses below.
--Joel

On Mon, Jan 11, 2016 at 3:03 PM Utkarsh Upadhyay <musically.ut@gmail.com> wrote:
Thanks for the feedback and the lively discussion!

 > In any case, I'd like to better understand the use case of when a site knows that a link should be opened "privately" and it shouldn't be the users choice before we go too far down this path.

I haven't thought about it exhaustively but have accumulated a few use cases from the experience of developing an extension to help users with switching to incognito mode.

First use case was of websites knowing *risky clicks* and providing a _safe_ way to make sure that the user doesn't have to clean up after himself, i.e. NSFW links on their content. Reddit was an example I provided in my original mail but other news sites will probably also find use for it.
It seems like the "right" thing to do is to mark the links as NSFW and let the user decide if they want them in their browsing history. Heck, some people might *want* that in their history for many reasons. Why effectively ban that for users who want it? 

Second use case was being able to give users clearer instructions. An example of such a case I recently ran across was here: https://support.google.com/accounts/answer/6160500?hl=en

Relevant part of the page:

> Sign in to your Google Account on android.com/devicemanager. If you're helping a friend with their lost device, we recommend opening an incognito tab in Chrome and having them sign in to the Google Account they use on their mobile device.

Such instructions can be simplified by linking to the website with target="_private". Other links which may accidentally reveal personal information (think direct links to bank account balance page) can also be made save by setting target="_private".
The key word in that is "recommend". Again, there may be valid reasons for a user to *not* go into private browsing. 


Thirdly, and what prompted me to think of this proposal, was that opening an incognito window through an extension on Chrome is rather convoluted (uses background scripts) and fragile. It may not continue to work, for example, when https://developer.chrome.com/extensions/manifest/externally_connectable is enforced. In any case, the extension requires permissions to access _all_ data across _all_ websites, which already should be raising eyebrows. I'd rather have this provided by the site + the browser, both of which I trust more than a third party plugin.
That sounds more like a feature request for making it easier to get into private browsing mode. I think Chrome already does that by adding the "open in incognito" right-click menu item. 

----

**From:** Crispin Cowan <crispin@microsoft.com>

I know! How about letting the user specify that a bookmark should be opened in-private? … oh, right :P
 
I think this whole area causes more problems than it solves. I can clearly see the problems, much less clear on potential solutions, and really vague on the problem it is trying to solve.
 
----

**From:** Anne van Kesteren <annevk@annevk.nl>

On Tue, Jan 12, 2016 at 1:08 AM, Crispin Cowan <crispin@microsoft.com> wrote:
> I think this whole area causes more problems than it solves. I can clearly
> see the problems, much less clear on potential solutions, and really vague
> on the problem it is trying to solve.

It seems pretty clear to me. For some use cases, the website can offer
better UI than the browser. E.g., for most social media that relates
around sharing links, as OP suggested, the user could opt-in to
opening certain links in a "private mode". This is much more
discoverable than the equivalent feature in a browser and is also more
usable as you don't have to right-click, hold down a set of keys, or
some equivalent forgetful thing on your phone.

----

**From:** Utkarsh Upadhyay <musically.ut@gmail.com>

> I know! How about letting the user specify that a bookmark should be opened in-private? … oh, right :P

I understand that the comment was made to show that target="_private" will not solve all problems associated with opening links in private mode, but this set me thinking in another direction.
As Crispin's comment points out, bookmarking is also a feature common to all browsers and which is, AFAIK, not standardized (notwithstanding the link type="bookmark", which doesn't address this feature of browsers explicitly). 
I don't see any immediate benefit of standardizing it and I actually wouldn't support it without some very very good reasons.

However, the more I think about it, private mode browsing is the kind of feature which would really benefit from standardization: it would make the developers know what to expect and would make sure that users get the similar sort of guarantees across all conforming browsers.
In that spirit, I think a new named browsing context is a good way to introduce such a standardization and a way of opening it up to web developers.

~
ut

----

**From:** Crispin Cowan <crispin@microsoft.com>

My comment about bookmarks was a joke: the point of private browsing is to not leave tracks on your PC that you have browsed to a particular place. Having a bookmark on your PC for “naughty salacious things” is itself an obvious trace, and so defeats the purpose.
 
Let me put this another way: the _private proposal is an attack vector. It lets a malicious web site block the user’s browser from recording history data without the user’s consent. If someone were to ship such a feature in our browser, I would file a security bug to have it removed.

----

**From:** Utkarsh Upadhyay <musically.ut@gmail.com>

> Let me put this another way: the _private proposal is an attack vector. It lets a malicious web site block the user’s browser from recording history data without the user’s consent.

What if we ask the user for consent before opening each link or make the websites ask for user's permissions explicitly just like for media access? Would that mitigate the security risk?

~
ut

----

**From:** Joel Weinberger <jww@chromium.org>

That is now [sic] something Chrome would do, in part because we believe it wouldn't mitigate the risk. Users would become desnesitized and click through anyway, but even more importantly, there's no way to explain the attack in generally understandable terminology.

----

**From:** Crispin Cowan <crispin@microsoft.com>

I basically disbelieve the premise of the idea. Whether any particular web browsing should be privatized/not-logged is not the web site’s business, that is a user decision.
 
Regarding the prompt, I completely agree with Joel, that would become a nuisance prompt that users don’t understand, and quickly come to hate and ignore.
 
----

