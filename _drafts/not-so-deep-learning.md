---
layout: post
title: 'Toy models for deep learning'
---

<script type="text/javascript" async
  src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS_SVG"></script>

Deep Learning recently has been able to pull off some amazing feats, beating
the benchmarks easily and has been adopted into the main-stream products quickly.

While working on a [recurrent neural network](http://www.kdd.org/kdd2016/subtopic/view/recurrent-temporal-point-process), I ran into several problems while trying to get the model to work with a relatively simple model. We did manage to make it work with a custom backend, but the process reminded me how I used to learn things.

What I would have liked to have are very simple models for which I _knew_ what the solution is and then see if the libraries and the frameworks I employed were indeed doing what I was asking of them. 

However, there are two primary issues with classical models used in Deep Learning:

  - The solution is usually not unique, thanks to the non-convex nature of most networks.
  - The number of parameters is very large.

So why not fix these two problems using toy examples?

For example, consider the following dataset:

# Hand fitted parameters



## Dense one layer feed-forward network

{% highlight python %}
x1, x2 = np.random.rand(100000, 2), np.random.rand(100000, 2)
y = x1 + 2 * x2
{% endhighlight %}

This model ought to be represented as \\(y = [x_1; x_2] \cdot W\\).

\\(W\\) should have 8 parameters:

$$ 
W = 
\left(
\begin{array}{cc}
  1 & 0 \\
  0 & 2 \\
  1 & 0 \\
  0 & 2
\end{array} 
\right)
$$


Solution:

{% highlight python %}
X1, X2 = Input(shape=(2,), name="X1"), Input(shape=(2,), name="X2")
Y = Dense(2, bias=False, name="Y")(merge([X1, X2], mode='concat', name="[X1, X2]"))
model = Model(input=[X1, X2], output=Y, name="y = x1 + 2*x2")
{% endhighlight %}


## Recurrent neural network


Consider the following hand created model:

$$y_t = -0.5 y_t + x_t$$

This can be represented using Neural networks as the following:

$$h_t = W h_{t-1} + U x_t + b$$ 

Where:

$$
\begin{align}
  W &=& -0.5 \\
  U &=& 1.0  \\
  b &=& 0.0
\end{align}
$$





