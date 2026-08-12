---
type: concept
title: Multiplication Theorem on Probability and Conditional Probability
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: concept
tags:
- PROBABILITY
- multiplication-theorem
- Maths
- class12
- conditional-probability
- probability
- mathematics
- events
---

540 MATHEMATICS

17. If A and B are events such that $P(A|B) = P(B|A)$, then
(A) $A \subset B$ but $A \neq B$
(B) $A = B$
(C) $A \cap B = \phi$
(D) $P(A) = P(B)$

13.3 Multiplication Theorem on Probability
Let E and F be two events associated with a sample space S. Clearly, the set $E \cap F$ denotes the event that both E and F have occurred. In other words, $E \cap F$ denotes the simultaneous occurrence of the events E and F. The event $E \cap F$ is also written as EF. Very often we need to find the probability of the event EF. For example, in the experiment of drawing two cards one after the other, we may be interested in finding the probability of the event ‘a king and a queen’. The probability of event EF is obtained by using the conditional probability as obtained below:

We know that the conditional probability of event E given that F has occurred is denoted by $P(E|F)$ and is given by
$P(E|F) = \frac{P(E \cap F)}{P(F)}, P(F) \neq 0$

From this result, we can write
$P(E \cap F) = P(F) \cdot P(E|F) \dots (1)$

Also, we know that
$P(F|E) = \frac{P(F \cap E)}{P(E)}, P(E) \neq 0$

or $P(F|E) = \frac{P(E \cap F)}{P(E)}$ (since $E \cap F = F \cap E$)

Thus, $P(E \cap F) = P(E) \cdot P(F|E) \dots (2)$

Combining (1) and (2), we find that
$P(E \cap F) = P(E) P(F|E) = P(F) P(E|F)$ provided $P(E) \neq 0$ and $P(F) \neq 0$.

The above result is known as the multiplication rule of probability.

Let us now take up an example.

Example 8: An urn contains 10 black and 5 white balls. Two balls are drawn from the urn one after the other without replacement. What is the probability that both drawn balls are black?

Solution: Let E and F denote respectively the events that first and second ball drawn are black. We have to find $P(E \cap F)$ or $P(EF)$.
