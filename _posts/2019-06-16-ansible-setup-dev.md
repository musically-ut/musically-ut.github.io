---
layout: post
title: 'Setting development machines quickly'
date: '2019-06-16'
---

I've noticed that it is becoming increasingly rare for me to working on my local machine, and it will continue being less and less relevant what my local machine is as long as I can connect to a remote server through.

## A short history of dev setups

As a web-developer at Better AG 2012-2015, most of our development happened on dev machines (which were all Macbooks) but then the deployment environment was linux and it was a miracle (and the skill of the dev-ops team) that we were able to seamlessly move from dev to production without issues most of the time.

However, since I've started research in machine learning (2015-now), most of heavy lifting happens on cloud servers.
In case of the Max Planck Institute for Software Systems, these are beefy 48 core + 1.5 Tb RAM machines (called brain servers) or 32 core + 500 Gb RAM machines (called pinky servers).

However, during my time here, I've never had trouble setting up my development environment because of a strategic decision which the dev-ops team here took: that of putting the `$HOME` for all users on the NFS.
This meant that whatever (user-local) environment I setup on my local workstation (a 4 CPU, 8 Gb RAM machine), would seamlessly be replicated on the servers.
This was great, I didn't have to think much about how to install the `node_modes` or copy over `virtualenv`.
This comes at a small cost that the local operations on the workstations are a little slow (as all disk I/O happens over LAN), but because the LAN connection is very good, it is seldom an issue.

The connection is so good, that [Supriya](https://github.com/supriya-pandhre), an intern with [our group](https://learning.mpi-sws.org), took this a step further and ran [PyCharm](https://www.jetbrains.com/pycharm/) with X-forwarding on the brain servers themselves, without any noticeable issues.


## End of Devnnocence?

However, this solution of sharing the home folder across machines is not a feasible solution and it still ends up requiring a lot from the local machine.

This problem of quickly setting up dev environments becomes relevant when dev machines change quickly. I've started working on a web-app which I intend to host on a remote machine finally. Since the app would require a DB, I tried setting up docker on my MacBook, but I ran into some issues and my MacBook slowed to a near crawl with MongoDB and Redis running in their respective containers. Hence, I decided to spin up a remote server and to move my dev setup there.

I remember [werehamster](https://twitter.com/werehamster) using [Boxen](https://github.com/boxen) to setup his MacBooks, and I wanted something similar but for servers I spin up on [Vultr](https://vultr.com), [DigitalOcean](https://digitalocean.com), [AWS](https://aws.com), or [Google cloud](https://cloud.google.com).
Hence, I did not want to use a platform specific solution (like AWS images, or start-up scripts which assume a shell/OS).
I remembered [puppet](https://puppet.com/) being a pain to work with because it required all remote machines to run a puppet daemon.
Then I remembered [ansible](https://www.ansible.com).

So, after a few hours as I spun up bigger and bigger machines to be able to `yarn build` my little web-app, I also tweaked and perfected my _ansible-playbook_ and put it on GitHub for good measure: <span class="devicons devicons-github_badge"></span>[musically-ut/ansible-setup-dev](https://github.com/musically-ut/ansible-setup-dev).

It is a relatively simple script which does the following:

 1. Create a user (default: `musicallyut`) on the remote machine and ensure that the user can `sudo` without any passwords.
 2. Copy over the ssh key to allow me to log into the remote machine easily (no access via passwords).
 3. Install various packages on the remote machine: `git`, `vim`, `tmux`, `htop`, etc.
 4. Copy over all the dotfiles to the remote machine, and setup [`z`](https://github.com/rupa/z).
 5. Install the `vim` plugins using `vim-plug`.
 6. Install <span class="devicons devicons-github_badge"></span>[`powerline-fonts`](https://github.com/powerline/fonts) on the machine.
 7. Set up `nvm` and install Node version 12.
 8. Download `miniconda3` and extract it.
 

I deliberately avoided using [ansible-galaxy](https://galaxy.ansible.com/) because I wanted to control each command which is run on the remote machine and do it just as if I would have run it. I do not want accidental overwriting of paths or configs, and I did not need anything particularly complicated anyway.

So far, I am quite happy with the setup. The playbook is OS and platform agnostic, and is easy to tweak.

## Dockerize everything?

An alternate solution which I have not tried yet is to go _full container_, i.e., installing only docker on the remote machine and then creating a `DOCKERFILE` which exposed ports. However, I've not seen that approach work very well yet. If you do use that approach, [do let me know](https://twitter.com/musically_ut).
