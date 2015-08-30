---
layout: post
title: 'seqfile: Generate sequential filenames safely'
date: '2015-04-25 09:53:00'
---

Version control is great. However, it is something I have to actively think about. If I am writing code, I can find points when I have finished a task and am ready to commit it in. But I have a different frame of mind while doing exploratory model fitting.

## Saving the models and results

When I am playing with an idea, I'd rather spend those brain cycles on improving the model or tweaking parameters. And perhaps it is just me, but training models to fit data seems like a separate realm of thought, where version control _just doesn't seem to fit_. Checking in the models feels akin to adding binaries to the source control: a bit icky.

Also, these each of these models can take a long time to train. So I do want to at least persist them to disk; I have accidentally killed my share of Python processes and `screen`s with the model results still stores in variables.

[Pickling](http://pymotw.com/2/pickle/) takes care of the serialization. The only missing bit is coming up with filenames.


## Hardest problem in CS

[Naming things](http://martinfowler.com/bliki/TwoHardThings.html) is one of the two (or three?) hardest problems in Computer Science. 

These are the approaches that sprang to my mind:

#### Use a static file name

This means that only the most recent model is saved while all history is lost. This can also get tricky if you train different models in parallel (one model will _win_ in writing the file).

#### Use model parameters in the filename

This feels intuitive until you add/remove parameters and [noise in the filenames can come back to bite you](https://www.kaggle.com/forums/f/15/kaggle-forum/t/6473/checking-self-submissions-for-hash-collision/35553).

#### Use a GUID!

They are incomprehensible and noisy. Also, it is impossible to tell from the filename which files are the most recent ones.

#### Use the `pid`

`pid` can be reused and it stays the same during a single interactive session. Hence, the files get overwritten anyway. Moreover, there is no sense of sequence in the names here either.

## Endgame: seqfile

Finally, I wrote [seqfile](https://github.com/musically-ut/seqfile) to solve the problem for me. It is a python library which can generate sequential filenames from a template. It takes care to ensure that it succeeded in creating a file before returning it to the process to ensure no two processes accidentally end up writing to the same file. If used with `prefix` and `suffix` options, it is smart about jumping over gaps in the sequence. However, if the filenames are more nuanced, then a function can be supplied to generate the filenames as well.

{% highlight python %}
# pip install seqfile
# Assume files "./a.0.txt" and "./a.3.txt" exist.
>> import seqfile as S

# Providing prefix and suffix finds the next file in the sequence
# ignoring any gaps
>> S.findNextFile('.', prefix='a.', suffix='.txt')
'./a.4.txt'

# Providing a file name generator as fnameGen produces the first file
# which it was successful in creating.
>> S.findNextFile('.', fnameGen=lambda x: 'a.' + str(x) + '.txt')
'./a.1.txt'
{% endhighlight %}

The API was inspired by the [tempfile library](https://docs.python.org/2/library/tempfile.html#tempfile.mkstemp). 

At the end of my script, I use the following snippet: 

{% highlight python %}
# my_models.py
import seqfile as S
fName = S.findNextFile('.', prefix='mdl.', suffix='.cPickle', base=1)
print '*** Saving model to file: {}'.format(fName)
cPickle.dump(modelResultAndParams, file(fName, 'w'))
{% endhighlight %}

Thereafter, I keep changing the parameters code and re-running the analysis on _ipython_:

    In [42]: run -i my_models.py

This keeps saving my models as I tweak the parameters in the script, even if I run them in parallel across different screens.

The package is available on [PyPi](https://pypi.python.org/pypi/seqfile) and the source code is available on Github: [musically-ut/seqfile](https://github.com/musically-ut/seqfile). It has 100% test coverage and is verified to run on all major OSes.

<style>
  .inline-images img { 
        display: inline;
        position: static;
        transform: initial;
        -ms-transform: initial;
        -webkit-transform: initial;
  }
</style>

<div class="inline-images">
<a href="https://travis-ci.org/musically-ut/seqfile"><img src="https://api.travis-ci.org/musically-ut/seqfile.svg" alt="BuildStatus" title=""></a> <a href="https://ci.appveyor.com/project/musically-ut/seqfile"><img src="https://ci.appveyor.com/api/projects/status/6x28l2cgqupdjyue?svg=true" alt="BuildStatusWin" title=""></a> <a href="https://coveralls.io/r/musically-ut/seqfile?branch=master"><img src="https://coveralls.io/repos/musically-ut/seqfile/badge.svg?branch=master" alt="Coverage" title=""></a>
</div>

----

#### Caveat

The `O_CREAT | O_EXCL` trick used in this library to create files [_may_ fail on old Linux kernels while writing to NFS](http://stackoverflow.com/questions/3406712/open-o-creat-o-excl-on-nfs-in-linux).
