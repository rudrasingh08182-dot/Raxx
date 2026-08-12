---
type: concept
title: Definition and Properties of Conditional Probability
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: concept
tags:
- PROBABILITY
- Maths
- sample-space
- class12
- conditional-probability
- probability
- mathematics
- events
---

### Conditional Probability

Thus, we can also write the conditional probability of E given that F has occurred as:

$P(E|F) = \frac{\text{Number of elementary events favourable to } E \cap F}{\text{Number of elementary events which are favourable to } F}$

$P(E|F) = \frac{n(E \cap F)}{n(F)}$

Dividing the numerator and the denominator by the total number of elementary events of the sample space, we see that $P(E|F)$ can also be written as:

$P(E|F) = \frac{\frac{n(E \cap F)}{n(S)}}{\frac{n(F)}{n(S)}} = \frac{P(E \cap F)}{P(F)}$ ... (1)

Note that (1) is valid only when $P(F) \neq 0$ i.e., $F \neq \phi$ (Why?)

Thus, we can define the conditional probability as follows:

**Definition 1:** If $E$ and $F$ are two events associated with the same sample space of a random experiment, the conditional probability of the event $E$ given that $F$ has occurred, i.e., $P(E|F)$ is given by:

$P(E|F) = \frac{P(E \cap F)}{P(F)}$ provided $P(F) \neq 0$

#### 13.2.1 Properties of conditional probability

Let $E$ and $F$ be events of a sample space $S$ of an experiment, then we have:

**Property 1:** $P(S | F) = P(F | F) = 1$

We know that:
$P(S|F) = \frac{P(S \cap F)}{P(F)} = \frac{P(F)}{P(F)} = 1$

Also $P(F|F) = \frac{P(F \cap F)}{P(F)} = \frac{P(F)}{P(F)} = 1$

Thus $P(S|F) = P(F|F) = 1$

**Property 2:** If $A$ and $B$ are any two events of a sample space $S$ and $F$ is an event of $S$ such that $P(F) \neq 0$, then:

$P((A \cup B) | F) = P(A|F) + P(B|F) – P((A \cap B)|F)$
