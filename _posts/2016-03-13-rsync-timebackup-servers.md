---
layout: post
title: 'rsync-time-backup from a server'
date: '2016-03-13'
---

I maintain a server, where I run the Twitter bot
[@first_tmrs_only](https://twitter.com/first_tmrs_only),
[Chanslate](https://chanslate.in) and keep my private Git repos, using
[gitolite](http://gitolite.com/gitolite/index.html).

Until recently, I used the Digital Ocean's backup service, which takes snap
shots of the whole drive, but would have added a cost to my monthly bill and
the service is triggered when DO deems that sufficient changes have happened on
the drive.

I'd rather have a backup process I have more control over.

Plus, I have been using [<span class="devicons devicons-github"></span>
laurent22/rsync-time-backup](https://github.com/laurent22/rsync-time-backup)
for a while to keep my local laptops backed up and the option of remote backup
was [recently added to the
program](https://github.com/laurent22/rsync-time-backup/pull/29#issuecomment-154806736).
So I was itching to try it out.


## SSH from server to local machine

However, only the backup *destination* could be remote, not the source. So the
script had to be run on the server and the destination had to be a disk connected
to my laptop (the one I was SSH-ing from).

My router is notoriously difficult to set up to allow port forwarding and I
didn't want to open up my laptop to random SSH attempts on the wild internet.
So I decided to use `RemotePortForwarding`. There were a few hoops I had to
jump through, though.

{% highlight bash %}
# Starting the SSH connection with RemotePortForwarding
ssh -R 2000:localhost:22 augustus
{% endhighlight %}

Then I tested it:

{% highlight bash %}
# On the remote machine
ssh -p 2000 musically_ut@localhost
{% endhighlight %}

It prompted me for my password and it worked!

### Making SSH easier

However, having the machine prompt me for a password each time it ran a command
on my local machine was not going to work (`ssh` is called several times during
the operation to test for markers, old backups, etc.). Hence, I generated
an SSH key pair on the remote server:

{% highlight bash %}
# On the remote machine
mkdir -p ~/.ssh
ssh-keygen -p -f ~/.ssh/id_rsa
{% endhighlight %}

Then I copied the `id_rsa.pub`, which was also generated on the server, to my
local computer's `~/.ssh/authorized_keys`. However, since I was going to run
the backup command with a `sudo`, I had to move the `id_rsa` to the `root`
account.

Now, running SSH commands on my local computer didn't need me to enter a
password on the remote machine and the SSH port will be exposed only during the
duration of my connection to the server.

## What to backup

Then to prepare the exclude file, I took inspiration from [a Digital Ocean blog post](https://www.digitalocean.com/community/tutorials/how-to-downgrade-digitalocean-droplets) and wrote the following in `augustus-backup-exclude-file`:

{% highlight gitignore %}
/dev/*
/proc/*
/sys/*
/tmp/*
/run/*
/mnt/*
/media/*
/lost+found
{% endhighlight %}

I erred on the side of safety, backing up my entire config along with the
binaries.

## `rsync-time-machine`

Now before I could checkout the [<span class="devicons devicons-github"></span>
laurent22/rsync-time-backup](https://github.com/laurent22/rsync-time-backup),
thanks to [<span class="devicons devicons-github"></span>
musically-ut/lovely-forks](https://github.com/musically-ut/lovely-forks), I noticed
[<span class="devicons devicons-github"></span> eaut/rsync-time-machine](https://github.com/eaut/rsync-time-machine)
was a [flamey fork](https://github.com/musically-ut/lovely-forks/issues/13) and
decided to check it out.

It turned out that `eaut` had built on top of `rsync-time-backup` and had added
features which were going to be necessary for me to use it, i.e. specifying a
custom port to SSH to: `-p 2000`. Hence, I checked it out on the remote machine.

## The backup

This was the command I finally ran on the remote machine:

{% highlight bash %}
# Command to backup / to a USB drive called `Serenity` on my laptop
sudo time ./rsync_tmbackup.sh --ssh-opt '-p2000' \
  backup / musically_ut@localhost:/Volumes/Serenity/backups/ \
  ~/augustus-backup-exclude-file
{% endhighlight %}

The first run is expected to last a rather long time as the whole server is
backed up.

### Tips

To make things a little more comfortable for myself, I slipped the following
into my `~/.ssh/config`:

{% highlight ssh %}
Host augustus
     RemoteForward 2000 localhost:22
     ...
{% endhighlight %}

Now I have a way to SSH back to my local machine every time I SSH into my
server `augustus`.


