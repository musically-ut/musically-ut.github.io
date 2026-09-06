---
layout: post
title: "The Mote in AI's Eye"
date: "2026-06-02"
canonical: https://blog.musicallyut.in/the-mote-in-ais-eye/
---

# The Mote in AI's Eye

In Niven and Pournelle's [*The Mote in God's Eye*](https://en.wikipedia.org/wiki/The_Mote_in_God%27s_Eye), the alien Moties have speciated into castes. The one I keep thinking about is the Engineer: brown-furred, limited speech, limited will, exquisite at its narrow craft. 
Give it raw material and a brief, and it will build you something bespoke. There is no Mote Walmart. Most things on Mote Prime are custom-made, and most things work, because the Engineer is genuinely a genius at the one thing it does.

I keep thinking about that Engineer when I watch a coding agent at work.

## Today's abstraction layer

AI agents currently meet the world at the level of *code*, or at least that is where they have [found product market fit](https://simonwillison.net/2026/May/27/product-market-fit/). 
Programming languages, APIs, files, function calls: these are (currently) the raw materials. The agent reads a brief from the Master (us) and crafts something bespoke from what it can find.

*Which level of abstraction does it stop at?* The Brown Motie picked somewhere between "raw ore" and "pre-fab module." It didn't smelt its own metals, but it also didn't grab off-the-shelf parts from a planetary supply chain. It worked at the level where bespoke output was natural.

For an AI agent today, that level is the programming language. I don't think it stays there.

## Two pulls on the abstraction layer

**Pull up.** Cheap code isn't necessarily cheap software. Even if tokens become almost free, establishing that the result works and is secure may remain expensive.

Software shops could spread that cost across many users by shipping maintained building blocks. An agent assembles them into something personal, instead of rebuilding and checking the foundations for every consumer. Brown Motie translated to software: commodity components at the bottom, bespoke artifact at the top.

**Push down.** But if AI is doing the writing, abstractions are no longer there for the human's benefit, instead they are there for the machine. The machine doesn't need them in the same way. It can hold a whole codebase in context. It can rewrite from scratch rather than reuse. It might, rightly (!), distrust code written by *other* AIs, refuse to build on it, prefer to work closer to the metal where behaviour is more predictable. This is what Karpathy [recently put in practice too](https://x.com/karpathy/status/2021633574089416993):

> "Use DeepWiki MCP and Github CLI to look at how torchao implements fp8 training. Is it possible to 'rip out' the functionality? Implement nanochat/fp8.py that has identical API but is fully self-contained"

At the limit, the AI doesn't trust the programming language itself and starts operating a layer below.

These pulls go in opposite directions and I'm not sure which wins.

## The jagged edge

The parallel debate in robotics is useful. The case for humanoid robots is that the world is designed for humans, i.e. door handles, stair heights, screwdriver grips, etc. Hence, a humanoid form factor slots in top-down without the world needing to change. 
The case for specialised robots like dishwashers, bartending units, vacuums, etc. is that you can solve a real problem *today* with bottom-up engineering, while general humanoid intelligence is still cooking.

In practice it's both, and which one shows up in your kitchen depends on the speed of development. 
Custom robots fill the gap while humanoids aren't ready. As humanoids improve, they absorb the easier tasks first, then the harder ones, smoothing back a *jagged edge* between custom and general-purpose machines in due course (read: as and when economically viable).

Software doesn't have a physical world to push against. Atoms aren't a constraint, integration is (mostly) an API call, and the development speed is set by how fast we can train better foundation models. 
So the jagged edge in software will move *much* faster. AI is flattening it, eating into off-the-shelf territory and pushing the edge of "what gets done bespoke" outward. Each model release moves the line.

Already, the software surface is changing radically to be more amenable to agents, e.g.:

 1. [Vercel Zero](https://zerolang.ai/) language for agents
 2. [Rodney](https://simonwillison.net/2026/Feb/10/showboat-and-rodney/#rodney-cli-browser-automation-designed-to-work-with-showboat ) built for token optimization and using a browser with minimal overhead
 3. [HF Cli is optimised for Agent usage](https://huggingface.co/blog/hf-cli-for-agents)

These are bottom surface coming up to meet the AI. 

On the other hand, there is [Mythos](https://www.anthropic.com/glasswing), which is finding bugs in existing software encouraging the AI to _not_ use the current components, but rather drill deeper down.


## Now what?

Off-the-shelf is how engineering knowledge accumulates. Libraries, patterns, and abstractions (even the bad ones) are how the discipline grows over time. Each generation builds on the last because the abstractions are *legible*.

If most software ends up freshly grown for each user from raw materials, where does the discipline live? Maybe in the weights. Maybe in skills and prompts and agent harnesses. 
Maybe in some implicit "model knows best" common law. But none of them are as inspectable, teachable, or debuggable as a library you can `git clone`. They live in the model, not in a repo you can read.

The Moties have exactly this problem, which is why Mote Prime has museums which were curated by sterile Masters, preserving technology so the next civilization can rebuild after the next collapse. 
They were not progressing past a ceiling but mostly just holding ground.

I would like to think we have a better option than museums-and-collapses. I'm just not sure what it looks like yet. 

One space to watch out would be [Moltbook](https://moltbook.com/). 
Maybe that is the place where the discipline will live on; though the `m/software` submolt is at the time of this writing sitting empty.
