---
layout: post
title: "Levels of self-reflection for LLMs"
date: "2026-04-29"
---

An interesting thing happened while I was using the [Hermes Agent](https://github.com/NousResearch/hermes-agent)
for a few weeks. It is the first AI agent where the "closed learning loop"
feels real.

On 10th April 2026, I had written a skill called `concise-memories` which captured everything I had
learned about writing good memories for AI agents.

Then on 29th April (19 days later) Hermes ran its new **skill curator** for the
first time and it archived my `concise-memories` skill with the following message:

> *"Redundant with system prompt memory instructions."*

I dug into the Hermes Agent git history and found that on **April 19**, nine
days after I wrote the skill, this [change was made to the system
prompt](https://github.com/NousResearch/hermes-agent/commit/db60c9827):

```
+"Write memories as declarative facts, not instructions to yourself. "
+"'User prefers concise responses' ✓ — 'Always respond concisely' ✗. "
+"'Project uses pytest with xdist' ✓ — 'Run tests with pytest -n 4' ✗. "
+"Imperative phrasing gets re-read as a directive in later sessions and can "
+"cause repeated work or override the user's current request. Procedures and "
+"workflows belong in skills, not memory."
```

This got me thinking about _self-reflection_.

## LLMs and self-reflection

LLMs cannot [usually](https://transformer-circuits.pub/2025/introspection/)
self-reflect. If I fine-tune a model on coding tasks, then set its system prompt
to `you are a world-class novelist`, the model will not question it. It will not
notice the contradiction. It has no coherent self-model that spans its own
history.

Humans can do this. We reflect on our entire lives. We notice when our
self-concept conflicts with our behaviour, causing [cognitive dissonance](https://en.wikipedia.org/wiki/Cognitive_dissonance).

What Hermes did today is a small step in this direction, but a zag instead of a zig by changing the _harness_ instead of the _model_.
The system changed, not the _do-er_.


## Kinds of self-reflection

This leads us to speculate about the kind of self-reflections we can expect to see
and what that would parallel when it comes to humans.

The first few levels are about the *harness* around the model: state we keep outside the weights. The later ones require the *model* to look at itself.

### Level 0

There is no state, the model wakes up with each prompt, answers, and goes back to sleep.
The human equivalent might be [anterograde amnesia](https://en.wikipedia.org/wiki/Anterograde_amnesia), maybe?

### Level 1

The model has a persistent memory which is injected into the prompt whenever a session starts.
This is where Hermes arguably is at right now with the `MEMORY.md`.

I speculate that this might be rather closer to the human experience than it appears at first instance.
Humans' heuristics and pre-conceived notions about themselves feel eerily similar.

#### Level 1.5

This is when the model can run a search back over all previous conversations it has had (RAG).

This might be closer to humans looking back and reading their old journal entries and finding out who they were in the past and what they had said/done.


### Level 2

Getting access to the _amount_ (feeling?) of uncertainty by looking at the layer activations, e.g. the maximum/average level of entropy of various layers and some baseline entropy these layers have had. Or something simpler which indicates at token level what the uncertainty was.

This is similar to humans noticing their own confusion and the small hesitation which precedes their saying "I do not know".

#### Level 2.5

The model can be given access to the activations of the various layers and, if it has assimilated research about what layer activations _mean_ in various contexts, it can presumably extract the signs of uncertainty itself. 

In case of humans, it would mean having constant access to the fMRI images of one's own brain and being able to see/predict what the brain was intending to do.

### Level 3

Getting access to the raw weights inside the layers. We have no idea what we could do though there are ideas which are bubbling up with Learning Mechanics and Theory of Deep Learning.

There is no real equivalent of this with humans, yet. What would a human even do with raw access to their own neurons?


## Does self-reflection help?

If the levels above are real, the obvious question is whether forcing a higher level helps. Here is a setup that lets us test it.

I recently came across a paper which affords just the right setup for me to be able to test the effect of such self-reflections [To call or not to call: A Framework to Assess and Optimize LLM Tool Calling](https://arxiv.org/pdf/2605.00737). 

In one of the setups, the authors train a very simple interjection to determine whether to let the agent use a tool or not. This classifier sits outside the LLM itself, observes the activations of the network and forces tool-call based on its output. This seems to perform much better than the LLMs making a call by themselves. 

I think this setup can be extended by adding explicit markers of uncertainty in the `<thinking>[...]</thinking>` section of reasoning LLMs and then requesting the LLM to produce the final output `<|im_start|>[...]<|im_end|>` tokens. So we can replace the classifier which sat _outside_ the agent and use the agent itself (with augmented reasoning tokens) as the classifier. This would tell us whether forcing Level 2 self-reflection could reduce costs/improve accuracy of output, much in the same way as forcing tool-call does.

### Interjecting uncertainty

I have not found direct ways of calculating "uncertainty" of outputs in the literature: most of the literature has framed uncovering signals behind _hallucinations_ or _inaccuracies_, but most of the research is from the time the LLMs didn't portray thinking capabilities.

However, when it comes to reasoning models, we can judge the thoughts on their own merit, without requiring the final outputs, by looking at the activations. That is what self-reflection more realistically could be.

I think [Semantic Entropy Probes: Robust and Cheap Hallucination Detection in LLMs](https://arxiv.org/abs/2406.15927) could be a way of detecting the uncertainty in them.

I'm curious to see whether this helps. If the Hermes skill-curator is Level 1 self-reflection, this is what Level 2 would look like.


## References

1. Lindsey, J. (2025). ["Emergent Introspective Awareness in Large Language Models."](https://transformer-circuits.pub/2025/introspection/index.html) Anthropic Transformer Circuits Thread. Causal evidence that models can detect and report changes in their own internal activations via concept injection experiments.
2. Ji-An, L. et al. (2025). ["Language Models Are Capable of Metacognitive Monitoring and Control of Their Internal Activations."](https://arxiv.org/abs/2505.13763) arXiv:2505.13763. Direct evidence LLMs can monitor and regulate their own hidden states.
3. Ghasemabadi, A. & Niu, D. (2025). ["Can LLMs Predict Their Own Failures? Self-Awareness via Internal Circuits."](https://arxiv.org/abs/2512.20578) arXiv:2512.20578 (Gnosis). Lightweight mechanism that predicts generation correctness from hidden states and attention patterns.
4. Binder, F.J. et al. (2024). ["Looking Inward: Language Models Can Learn About Themselves by Introspection."](https://arxiv.org/abs/2410.13787) arXiv:2410.13787. Models fine-tuned to report facts about themselves that cannot be derived from training data alone.
