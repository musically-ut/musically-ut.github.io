---
layout: post
title: Aiding Typescript's type inference
date: '2014-11-12 22:40:27'
permalink: /typescript-and-type-inference/
---

If you want Typescript to determine the type of your variables correctly, do not do:

{% highlight javascript %}
var myVar;
// Initialization code
myVar = new MyClass();
{% endhighlight %}

The type of `myVar` will be interpreted to be `any` instead of `MyClass`. Typescript will not complain about it but you'll not get any static type checking.

Instead, do:

{% highlight ts %}
var myVar : MyClass;
myVal = new MyClass();
{% endhighlight %}

or, if possible:

{% highlight ts %}
var myVar = new MyClass();
{% endhighlight %}
