---
layout: post
title: 'Power consumption of common USB devices'
date: '2016-08-27'
---

I recently bought a USB Safety Tester off Amazon and have been plugging it into various chargers/ports trying to figure out how much power each thing uses. I, or someone else, might find this information useful in the future, say for a back of an envelope calculation. So I've decided to record them.
I'll try to include as many details as I think are relevant.

## Disclaimer

The numbers presented here might be very very off and if you rely on them for making any important decisions, then bad things (like the dinosaur stampede of 120,322,876 B.C, in which, I played no part) may happen.
Be responsible, do your own experiments.

## LG Nexus 4 smartphone

This is related to the [experiment I did with Nexus 4]({% post_url 2016-06-01-cyanogen %}). 
I have it plugged to a standard wall charger with a long (cheap) cable.
The mobile phone drew:

 - `0.09 - 0.12A`, at,
 - `5.1 - 5.0V`.

So a phone, which has its display, Bluetooth, WiFi turned on 24/7, but with no SIM card, draws about `0.5 - 0.6 Watts` of power.

## XBox 360 Wired afterglow controller

I was playing [Lovers in a Dangerous Spacetime](http://store.steampowered.com/app/252110/), which doesn't use the force feedback just as much.
It drew:

 - `0.01 - 0.04A`, at,
 - `5.17V`.

So this uses `0.2 Watts` of power.

With all the LEDs turned on, it draws:

 - `0.08 - 0.10A`, at,
 - `5.16V`.

Hence, with the LEDs, it uses nearly `0.5 Watts` of power.

Additionally, with force-feedback turned on at full-throttle, it draws:

 - `0.18A`, at,
 - `5.16V`.

Total power consumption was nearly `0.9 Watts`.


