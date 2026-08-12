---
type: concept
title: Properties of Conditional Probability and Examples
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: concept
tags:
- PROBABILITY
- Maths
- class12
- conditional-probability
- mathematics
- disjoint-events
- probability-theory
---

In particular, if $A$ and $B$ are disjoint events, then $P((A \cup B)|F) = P(A|F) + P(B|F)$.

We have:
$P((A \cup B)|F) = \frac{P((A \cup B) \cap F)}{P(F)}$
$= \frac{P((A \cap F) \cup (B \cap F))}{P(F)}$ (by distributive law of union of sets over intersection)
$= \frac{P(A \cap F) + P(B \cap F) - P(A \cap B \cap F)}{P(F)}$
$= \frac{P(A \cap F)}{P(F)} + \frac{P(B \cap F)}{P(F)} - \frac{P((A \cap B) \cap F)}{P(F)}$
$= P(A|F) + P(B|F) - P((A \cap B)|F)$

When $A$ and $B$ are disjoint events, then $P((A \cap B)|F) = 0$.
$\Rightarrow P((A \cup B)|F) = P(A|F) + P(B|F)$

**Property 3:** $P(E'|F) = 1 - P(E|F)$
From Property 1, we know that $P(S|F) = 1$
$\Rightarrow P(E \cup E' |F) = 1$ (since $S = E \cup E'$)
$\Rightarrow P(E|F) + P(E' |F) = 1$ (since $E$ and $E'$ are disjoint events)
Thus, $P(E'|F) = 1 - P(E|F)$

Let us now take up some examples.

**Example 1:** If $P(A) = \frac{7}{13}$, $P(B) = \frac{9}{13}$ and $P(A \cap B) = \frac{4}{13}$, evaluate $P(A|B)$.
**Solution:** We have
$P(A|B) = \frac{P(A \cap B)}{P(B)} = \frac{4/13}{9/13} = \frac{4}{9}$

**Example 2:** A family has two children. What is the probability that both the children are boys given that at least one of them is a boy?
