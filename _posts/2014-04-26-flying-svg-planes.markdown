---
layout: post
title: Flying SVG planes
date: '2014-04-26 21:18:34'
permalink: /flying-svg-planes/
---

In the latest revamp of the [Swiss Air website](http://swiss.com/ch/en), they introduced an interesting _loading_ animation. It involved a bunch of planes flying around some text:

![Swiss air loading animation](/content/images/2014/Apr/Screenshot_2014_04_18_16_58_29.png)

I thought it would be fun to implement that using SVG and CSS3 animation.

<p data-height="357" data-theme-id="5887" data-slug-hash="zbnJx" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/musically_ut/pen/zbnJx/'>Flying SVG+CSS3 planes</a> by Utkarsh Upadhyay (<a href='http://codepen.io/musically_ut'>@musically_ut</a>) on <a href='http://codepen.io'>CodePen</a>.</p>
<script async src="//codepen.io/assets/embed/ei.js"></script>

#### Compatibility

*Linux*:  Chrome 29.0 <span style="color: red">✘</span> , 
Firefox 28.0 <span style="color: springgreen">✔</span>
*Mac OS*: Chrome 34.0 <span style="color: orange">✔</span>, Firefox 29.0 <span style="color: springgreen">✔</span>

## Getting started

First step was getting a plane on the screen. I wrote just one half of the plane in SVG and mirrored it to get the other half:

{% highlight html %}
<svg viewBox="-5 -5 10 10" width="200" height="200">
	<path d="M 0,-5 
             A 1,1 0 0 1 1,-4 
             L 1,-1 5,1 5,2 1,1 1,3 2,4 2,5 0,4"></path>

	<path transform="scale(-1, 1)"
		  d="M 0,-5 
             A 1,1 0 0 1 1,-4 
             L1,-1 5,1 5,2 1,1 1,3 2,4 2,5 0,4"></path>
</svg>
{% endhighlight %}

<p data-height="268" data-theme-id="0" data-slug-hash="vwAye" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/musically_ut/pen/vwAye/'>A single plane skeleton</a> by Utkarsh Upadhyay (<a href='http://codepen.io/musically_ut'>@musically_ut</a>) on <a href='http://codepen.io'>CodePen</a>.</p>

## Improving the SVG for reuse

It is easy to see that there is a bit of repetition in there and SVG provides `use` and `symbol` tags just to take care of this repetition:

{% highlight html %}
<svg width="300" height="300">
  <defs>
    <path id="svg-half-plane"
          d=" M 0,-5
              A 1,1 0 0 1 1,-4
              L 1,-1 5,1 5,2 1,1 1,3 2,4 2,5 0,4"
          ></path>

    <symbol viewBox="0 0 10 10" id="svg-plane" overflow="visible">
      <use xlink:href="#svg-half-plane"></use>
      <use xlink:href="#svg-half-plane" transform="scale(-1, 1)"></use>
    </g>
  </defs>
  <g>
    <use xlink:href="#svg-plane" x="100" y="100" width="50" height="50"></use>
  </g>
</svg>
{% endhighlight %}

This is more DRY and easier to reuse.

## CSS3 animations + SVG

The basic animation is easy:

 1. Change the angle of rotation from `0deg` to `360deg`, and,
 2. Change the opacity of the planes from `1` to `0.5` to `1`.

So this should have been enough (modulo the browser prefixes):

{% highlight css %}
@keyframes flyaround {
  0% {
      transform : rotateX(0deg) translateZ(140px);
      opacity   : 1.0;
  }

  50% {
      transform : rotateX(180deg) translateZ(140px);
      opacity   : 0.5;
  }

  100% {
      transform : rotateX(360deg) translateZ(140px);
      opacity   : 1.0;
  }
}
{% endhighlight %}

### However

I had stepped into the dicey world of CSS3 animations mixed with SVG and had to put up with certain browser shenanigans.

It seems that Chrome `34.0.1847.131` on Mac does not support `z` axis movements on a `use` element while the containing `g` element has a `perspective` set on it. (Cannot find an official bug report for this, though.)

Hence, to simulate the nearing and furthering of planes, I had to introduce _scale3d(0.5, 0.5, 0.5)_, but, thankfully, only for Chrome:

{% highlight css %}
@keyframes flyaround {
  0% {
      transform  : rotateX(0deg) translateZ(140px) scale3d(1, 1, 1);
      opacity    : 1.0;
  }

  50% {
      /* This line is different for -webkit! */
      -webkit-transform : rotateX(180deg) translateZ(140px) scale3d(0.5, 0.5, 0.5);
      transform  : rotateX(180deg) translateZ(140px) scale3d(1, 1, 1);
      opacity    : 0.5;
  }

  100% {
      transform  : rotateX(360deg) translateZ(140px) scale3d(1, 1, 1);
      opacity    : 1.0;
  }
}
{% endhighlight %}

The problem with this, however, is that `-webkit` does not respect the z-ordering of the planes. Hence, sometimes, when the planes overlap each other with the one at the bottom appears to be on top.

This is one of the reasons that I chose to change the `opacity` (instead of the `fill`) and `scale` of the plane further away so that the erroneous overlapping becomes less noticeable. However, when we put some text at `z=0`, the Webkit version is no longer going to work with the text either always atop other planes or below them.

Firefox, on the other hand, handles `z` indexes without any problem.

<p data-height="357" data-theme-id="5887" data-slug-hash="zbnJx" data-default-tab="result" class='codepen'>See the Pen <a href='http://codepen.io/musically_ut/pen/zbnJx/'>Flying SVG+CSS3 planes</a> by Utkarsh Upadhyay (<a href='http://codepen.io/musically_ut'>@musically_ut</a>) on <a href='http://codepen.io'>CodePen</a>.</p>


