---
layout: post
title: 'Spacebars: Meteor templating'
date: '2014-02-15 15:40:40'
---

`Spacebars` is an adaptation of `Handlebars` templating which is used by `meteor`. Since EmberJS and AngularJS use Handlebars-like templating, I was on a comfortable footing here, but after reading the hidden `README.md` in the Meteor docs, I discovered some new things.

#### Order of resolution

Template helpers take priority over the data context when it comes to resolving references in the template:

{% highlight javascript %}
var data = { bar: "Goodbye" }; // Will be injected
Template.foo.bar = function () { return "Hello"; }
{% endhighlight %}

and

{% highlight html %}
{% raw %}
<template name="foo">
  {{bar}} World!
</template>

<template name="baz">
  {{> foo data}}
</template>
{% endraw %}
{% endhighlight %}

will result in `Hello World!`.

#### Constructing data contexts on the fly

Template data can be created _on the fly_ while inserting a template using `keyword` arguments:

{% highlight html %}
{% raw %}
{{> foo bar=data.theOtherBar }}
{% endraw %}
{% endhighlight %}

would pass `{ bar: data.theOtherBar }` as the data context to the `foo` template.

However, if positional and keyword arguments are mixed, then the first positional argument will be _called_ using the other arguments:

{% highlight html %}
{% raw %}
{{> foo bar baz=data.theOtherBar }}
{% endraw %}
{% endhighlight %}

will actually try to invoke `bar({ baz : data.theOtherBar })` and pass the result as a data context to `foo`.

#### Dynamic attributes

This works:

{% highlight javascript %}
Template.foo.attrs = {
    checked: "",
    'data-name': "panic-code"
}
{% endhighlight %}

and:
{% highlight html+handlebars %}
{% raw %}
<template name="foo">
  <input class="danger" {{attrs}} />
</template>
{% endraw %}
{% endhighlight %}

However, it doesn't _merge_ attribute values, so we cannot build a list of classes using {% raw %}`<input {{attrs1}} {{attrs2}} ... />`{% endraw %}.

#### Block tags inside attributes

This works:

{% highlight html+handlebars %}
{% raw %}
<input class="{{#if done}}done{{else}}notdone{{/if}}" />
{% endraw %}
{% endhighlight %}

#### Interchangable functions an properties

Spacebars automatically executes functions in the template. Hence, {% raw %}`{{foo.bar}}` could mean `{{foo().bar}}`, `{{foo.bar()}}`, `{{foo().bar()}}` or `{{foo.bar}}` depending on the values of `foo` and `bar`{% endraw %}.
