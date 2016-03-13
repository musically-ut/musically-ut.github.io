---
layout: post
title: 'Internet Calendars'
date: '2016-03-11'
---

I had a simple task to do a few days ago.

There was a calendar with about 50 events which were in Pacific Time Zone.
All I had to do was to change the timezone of the events to Central European Time and export it to a pdf.

The original calendar was on Google Calendar. So I tried doing it there, but no dice.
Google doesn't allow one to change the timezone of a calendar as a whole and on changing the timezone from Calendar settings, it will change the time the event is scheduled at to preserve the original time in the original timezone.

So an event which happened on 0900 in Pacific time would change to happen on 0200 in Central European time (+1 day).

No problem, I thought, I'll just export it to `.ics` format and then use better suited tool to change the time-zone. The [RFC for `.ics`](https://tools.ietf.org/html/rfc5545) was written in 1998, it possibly cannot be so difficult to modify by hand.

So I opened the `.ics` to see a helpful field right up on the top:

{% highlight ics %}
BEGIN:VCALENDAR
PRODID:-//Google Inc//Google Calendar 70.9054//EN
VERSION:2.0
CALSCALE:GREGORIAN
METHOD:PUBLISH
...
X-WR-TIMEZONE:America/Los_Angeles
X-WR-CALDESC:
BEGIN:VEVENT
...
{% endhighlight %}

Changing the `America/Los_Angeles` to `Europe/Berlin` should do the trick.

So I tried doing that and tried importing the calendar back into Google Calendar only to find that it didn't have any effect.

I experimented a little more: importing it into Evolution, Thunderbird (lightening) and iCalendar but to no avail (I managed to cause a crash in iCalendar).
None of these offered an easy way of changing the time-zone either.

A little more digging around in the `.ics` file showed this:

{% highlight ics %}
BEGIN:VEVENT
DTSTART:20160518T123000Z
DTEND:20160518T140000Z
DTSTAMP:20160308T164055Z
...
END:VEVENT
{% endhighlight %}

Aha! The times are all exported as [UTC times instead of as floating local times](https://tools.ietf.org/html/rfc5545#section-3.3.5).
This should be easy to fix. 

So I checked out [<span class="devicons devicons-github_badge"></span>
tpope/vim-speeddating](https://github.com/tpope/vim-speeddating), but after a brief test, it was clear that
ISO formatted dates were outside scope of the plugin.

So I checked out a [few](https://github.com/mozilla-comm/ical.js/)
[libraries](https://www.npmjs.com/package/ical) to parse iCalendar files and
found that either they were difficult to understand (output was a list with nested lists) or
didn't support full serialization/deserialization.

So I got fed up, confirmed that the file was whitespace sensitive and hacked a solution
for offsetting the timezone which doesn't depend on any parsing:

 - [<span class="devicons devicons-github_badge"></span> musically-ut/ical-timezone-changer](https://github.com/musically-ut/ical-timezone-changer)

----

Now that I have more time, I perhaps should have used [icalendar
module](http://icalendar.readthedocs.org/en/latest/api.html#module-icalendar.cal).
If anyone ends up using it and runs into problems, I'll rewrite it based on
that library.

