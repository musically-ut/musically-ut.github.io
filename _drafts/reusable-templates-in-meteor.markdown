---
layout: post
title: Reusable templates in Meteor
---

Meteor templates aren't _really_ reusable (at least uptil version `0.7.0.1`).

A [question on Stackoverflow](http://stackoverflow.com/questions/21711402/edit-in-place-meteor-view-without-using-session) started me thinking about what behavior I would ideally want to have. I had run into the same problem before and had satisfied myself by thinking that using `Session` to save UI state would suffice in that case. However, coming from MVC frameworks (AngularJS and EmberJS), it just felt _wrong_ to save UI state in a global-_ish_ store as primitive values such that it'll be available everywhere else in the app.

So I went looking for a solution.

## Using the source

Where else should one fish for best practises than in the examples provided by the core team itself?

I looked at the [source code](https://github.com/meteor/meteor) for `accounts-ui` package and I found this:

```
var KEY_PREFIX = "Meteor.loginButtons.";

// ...

Accounts._loginButtonsSession = {
  set: function(key, value) {
    // ...

    this._set(key, value);
  },

  _set: function(key, value) {
    Session.set(KEY_PREFIX + key, value);
  },
  // ...
};
```

So ... they were also using `Session` with a `KEY_PREFIX` and hoping that noone will overwrite their values accidentally.

But what if I want to use two instances of `loginButtons` on my page? Then they will inadvertantly end up sharing UI state (and `#login-button` _id_ as well, but that is a templating/HTML issue).

Hence, this is a bad example to follow if we want to have _reusable templates_.

As the old zen saying goes:

> Do not do as the masters did, but ...

## Seek what the masters sought

I know how `Deps.Dependency` worked and I knew that `Templates` run in a `reactive` environment. Armed with this, I just need:

 1. Create a dependency per `template instance`
 2. Make a `helper` depend on it.
 3. 
 
 
 `Session` is the only obstacle we need to overcome.