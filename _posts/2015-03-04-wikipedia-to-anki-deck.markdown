---
layout: post
title: Wikipedia to Anki deck
date: '2015-03-04 11:18:37'
permalink: /Wikipedia-to-Anki-deck/
---

I looked at a list of [Collective nouns in English](http://en.wikipedia.org/wiki/List_of_English_terms_of_venery,_by_animal) and looked around for an [Anki deck](http://ankrisrs.net) to study them. However, I found none.

Hence, I set about making one for myself: [Collective nouns in English](https://ankiweb.net/shared/info/775128629).

These are the steps I took to do this. Note that I was doing these things with the express intention of making it a quick and dirty, run once and throw-away script. There probably are better ways to do it, and if you know one, [please tell me](https://twitter.com/musically_ut).

## Step 1: Extract data

I used [Google Spreadsheets](https://docs.google.com) for this task. It has a friendly `ImportHtml` function which can import almost any HTML table structure directly.

I did an import on `B2` on [this spreadsheet](https://docs.google.com/spreadsheets/d/1lPd17YHLT6r6yBIHb20h08v7Jtw9fD-huevD3VSqoIM/edit?usp=sharing).

{% highlight python %}
=ImportHtml("http://en.wikipedia.org/wiki/List_of_English_terms_of_venery,_by_animal", 
	    "table", 1)
{% endhighlight %}

Then I did a copy/paste-only-values to get rid of the Macro execution, did some Excel-fu with help from [Shreyes](http://programming-r-pro-bro.blogspot.in/) and I had a fully filled [CSV file](https://gist.github.com/musically-ut/850657404af148d74f19#file-input-csv) with the data.

## Step 2: Realize limitations

I wanted to create cloze deletion cards for each card. However, I noticed that there were several nouns possible for the same animal _and_ the same noun may be used for more than one animal. Hence, there would be an ambiguity about which animal/noun was the correct answer. Since Anki does not support multiple answers for a single gap in Cloze Deletions, I decided to add minimal _hints_ to the questions to remove ambiguity of which answer was needed.

One of the simplest ways of doing it was by leaving just enough characters in the prefix such that the answer was unambiguous.

For example, since a group of both _ducks_ and _dolphins_ can be called a _team_, the cloze deletion would read:

> **team** of **do[...]**

or 

> **team** of **du[...]**

To remove the ambiguity. The python code for finding such a suffix is simple:

{% highlight python %}
def minPrefixIdx(targetStr, strs):
    # Remove the targetStr from strs, if it is present
    strs = [ s for s in strs if s != targetStr ]
 
    # If there is only one string, then no prefix is needed
    if len(strs) == 0:
        return 0
 
    idx = 1
    while idx < len(targetStr):
        conflict = False
        for s in strs:
            # Target shares a prefix with another string
            if targetStr[0:idx] == s[0:idx]:
                conflict = True
                break
 
        if conflict:
            idx += 1
        else:
            return idx
 
    print >> sys.stderr, "Could not find a prefix: {0}, {1}".format(targetStr, str(strs))
 
    # One string was almost a prefix of another
    return None
{% endhighlight %}

However, in some cases, it is not possible without giving away the whole answer. For example, you can use either `tribe` or `trip` as a collective noun for goats. In this case, we will have to give **trip** as the hint if we want to disambiguate it from **tribe**. There were three such cases:

- **tribe/trip** of goats
- dole of **turtles/turtle doves**
- **rake/rag** of colts

These had to dropped from the deck.

## Step 3: Script it

I then wrote a [python script](https://gist.github.com/musically-ut/850657404af148d74f19#file-collective-deck-import-py) to do the menial tasks of reading the csv file, removing the crud (e.g. the single character alphabets) and outputting a single CSV file.

Then I opened Anki, and imported the file to create the deck:

![Anki import](/content/images/2015/03/Import.png)

The import work smoothly. I synced with AnkiWeb, and shared the deck.

### Conclusion

The entire process took about an hour of work. Almost half the time was spent figuring out which tool to use (I dabbled with `BeautifulSoup` before using Google spreadsheets) and the algorithm I wanted to use for disambiguation. Then another hour or so writing this blog post about it.
