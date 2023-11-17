---
layout: post
title: Closed AI versus Open AI
date: "2023-11-17"
permalink: /closed-ai-open-ai/
---

My predictions about the future of AI development all the way to AGI.

## Assumptions

1.  More breakthroughs beyond LLMs will be needed to achieve AGI.
2.  We will need extremely large models (~trillions of parameters) for close-to-AGI performance across domains.
3.  We will be able to distill large models to arrive at domain-specific smaller models.

## Consequences

1.  The research breakthroughs necessary for the next level towards AGI will not be open-sourced.
    - These breakthroughs will be very very valuable to the ones who make them. Since such a breakthrough will likely also need a large number of experiments and large scale validation, it will need immense resources.
    - Even if they are bound to leak, they will likely be licensed (patented?) such that other big orgs will find it legally difficult to make use of the breakthrough themselves.
       * This may give the Open Source models a gap, but no startup will be able to capitalize on it make it big legally.
       * Building on them as a platform will still work. More about the Hyperscalers later.
    - The datasets needed for creating larger and larger models will start getting locked up behind increasingly expensive APIs. We are already seeing this with X (i.e. Twitter), Reddit, StackOverflow, etc. Open Source models will not be able to purchase this data in order to build larger models.
2.  The market will become dumbbell-shaped with Open Source models competing with Closed Source models at the edges, and large monolithic close-to-AGI models running on a handful of clouds.
    - The models which run on devices will have a large diversity as startups will be able to distill smaller models from Open Source models or from weights of extremely large models released with restrictive licenses.
    - On the other hand, we'll have gigantic models which need very large infrastructure to run and will boast of cross-domain close-to-AGI intelligence.
    - No Open Source first company will be able to develop the infrastructure large enough to run those kind of models, except for the Hyperscalers of today: Google, Meta, Azure, AWS, maybe IBM and a handful of other large corps.

## Conclusion

So the best play right now for independent small developers is to:

1.  The HyperScalers of today will gain the most.
    - Align yourself financially with them.
    - Get employed by them.
2.  Learn how to distill models to get them to run on edge devices with focus on:
    - Faster responses.
    - Higher privacy.
    - Better access to device local data.
    - Compute efficiency.
