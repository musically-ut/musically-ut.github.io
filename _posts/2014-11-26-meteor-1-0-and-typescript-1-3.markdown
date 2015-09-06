---
layout: post
title: Meteor 1.0 and Typescript 1.3
date: '2014-11-26 22:22:42'
permalink: /meteor-1-0-and-typescript-1-3/
---

So I started a new project and I wanted to use [Meteor](https://www.meteor.com/) as the framework and [Typescript](http://www.typescriptlang.org/) as the language in place of Javascript.

This is how I currently use them together:

 1. Open three terminals
 2. Run `tsc --out client/main.js client/main.ts --watch` in the first.
 3. Run `tsc --out server/main.js server/main.ts --watch` in the second.
 4. Run `meteor run` in the third.
 
To start working on your own project, fork [`meteor-typescript-seed`](https://github.com/musically-ut/meteor-typescript-seed) and follow the instructions.
 
### Why this?

My first attempt was to use the Meteor package [meteor-typescript-compiler](https://github.com/meteor-typescript/meteor-typescript-compiler). However, it turns out that it still uses Typescript `1.0` and is slow in compilation.

It depends on the npm package [ts-compiler](https://github.com/jedmao/ts-compiler) which depends on [typescript-api](https://github.com/jedmao/typescript-api), which fetches and mangles the `tsc.js` file to export the Typescript package. The mangling does not work for version `1.3`.

I tried to fix that, taking inspiration from the [grunt-ts](https://www.npmjs.org/package/grunt-ts)'s monkey patching.

Also, I forked [meteor-typescript-compiler](https://github.com/meteor-typescript/meteor-typescript-compiler) so that I could cut out the intermediate packages and do the Typescript mangling in the meteor package itself. Ironically, I struggled with [some](https://github.com/meteor/meteor/pull/3180) [issues](https://github.com/meteor/meteor/pull/3157) with Meteor's erroneous error reporting.

It turns out that the `vm.runInThisContext` trick to eval `tsc.js`, which `grunt-ts` uses, does not work while working from inside Meteor because `require` is not defined in Meteor's context. Hence, the magic/mangling needs to happen in a separate `npm` package.

Curioser and curioser.

With that hope, I [upgraded](https://github.com/theblacksmith/typescript-compiler/pull/3) a differnt typescript compiler: [typescript-compiler](https://github.com/theblacksmith/typescript-compiler/) to Typescript 1.3, hoping to use this as the npm package to use in `meteor-typescript-compiler` instead of `ts-compiler`. 

However, it turned out that Meteor's build system would make it very difficult for types in one file to depend on types defined in another file. If I changed a file on which several others files depended for type-checking, the decendants will not be recompiled, thanks to caching employed by `meteor-typescript-compiler`. The alternate was to compile each file separately each time anything changed. So, that was a no-go, in the end.

Also, I discovered, thanks to [Tomas](https://caurea.org/) that Typescript will gladly do the task of watching dependent files which were referenced using `<reference path="./file/path.ts" />` syntax. That was the time I decided to take this path.

I will look into integrating Typescript in the build system again after the Typescript team releases a stable API for their compiler.
