---
layout: post
title: Workflow with data
date: '2015-11-11 17:37:40'
---

As a part of working on large data projects, I have settled into a kind of
workflow and I started wondering where I can improve it.

### Step 0: ETL

I get the data and convert it to a form I can read it in. Since I have 1.5 Tb RAM
machines at my disposal (re: [MPI-SWS](https://www.mpi-sws.org)), this
translates to SQLite for most datasets of ~ 500Gb size. My favourite tools for
the job are [csv2sqlite](https://github.com/rgrp/csv2sqlite) and [some other
related scripts](https://github.com/Networks-Learning/datasets2sqlite).

Most of the scripts work on compressed versions (_i.e._ `gzip` or `bz2`) of the
raw data files.

### Step 1: Exploration

I start by loading the data up on an [Jupyter](https://jupyter.org/) notebook. This means
loading the whole data into memory as a [Pandas DataFrame](http://pandas.pydata.org/).

Then I explore the data a bit with [matplotlib](http://matplotlib.org/).

### Step 2: Modeling

The task of modelling slowly takes form with preprocessing, sub-setting,
model creation, model testing, and finally with running the models.

Depending on the kind of model, there may be other steps involved here. For
example, figuring out the cross-validation strategy or creation of
synthetic-data.

#### Step 2.1: Subsetting, Preprocessing and Model Creation

These go hand in hand because the model dictates what the intermediate
results look like. The sub-setting of data is done to make the testing of
models feasible, such that everything can be done in-memory

At some point, it becomes apparent at various points that some pre-processing
can save a bunch of time.

Here, I like to save data in `mat` form and usually as [sparse
arrays](http://docs.scipy.org/doc/scipy/reference/sparse.html) because the
format is interoperable between MATLAB and Python.

**This precludes the possibility of using [recipy](https://github.com/recipy/recipy) since
[it does not work with `scipy.io`](https://github.com/recipy/recipy/issues/82).**

However, if I move to `pickle` or even `np.savetxt`, I can reap the benefits of
the library. This is something I can try to improve.

#### Step 2.2: Testing the model

At this point, the methodology changes a bit.

I move all the code the model needs to run to one single Jupyter cell, save it
to a file and then make it configurable using
[argparse](https://docs.python.org/3/library/argparse.html).

Then I invoke the file from Jupyter using the 
[`%run -i`](http://docs.scipy.org/doc/scipy/reference/sparse.html) magic
command.

This gives me the best part of two worlds. Placing code in a file is good for
version control and for sharing the script with others collaborators. However,
the script still has all the variables in the global scope and the `%run -i`
lets me import those the current Jupyter session, inspect them and figure out
what the internal state of the program was at the point of exit (either though
an exception or normally).

**Hence, using a persistence framework like
[sacred](https://github.com/IDSIA/sacred) is out of the question since I
explicitly want all the local variables available in Jupyter for debugging
while `sacred` requires the code inside a function.**

Here, to persist data, I use [seqfile](https://github.com/musically-ut/seqfile)
which lets me save files from different processes and even different clusters
on an NFS without worrying about losing data.

Moreover, since I run the script usually with `%run -i`, I usually don't have
to read the data from the disk again and can carry straight to the Results phase.
Nevertheless, if I have to to look at a previous experiment's results, I only
have to load the last file saved by `seqfile` and look into it.

One thing I usually do run into is that reading local variables from a file
clobbers some variables that I have already declared in the Jupyter
notebook and if I restart the kernel and run only some blocks, I usually
lose track of which declared. A Notebook extension which lists all variables
in the current global environment (like the Workspace pane in MATLAB) 
would help me here.

There is also the inverse problem of having undefined variables in the script
which are conveniently supplied by the Jupyter notebook when it is run
from inside a Notebook. Using
[Syntastic](https://github.com/scrooloose/syntastic) helps with weeding out this
class of problems.


### Step 3: Results

Finally, to analyse and process the results, I again rely on the Jupyter
notebook, albeit a new one. The new notebook only runs the scripts as `%time
%run -i script.py --args` in individual cells and receives the results loaded
in a local variable. Plotting is again done using [`seaborn`
](http://stanford.edu/~mwaskom/software/seaborn/) and the results are saved as
`pdf` or `eps` figures.

