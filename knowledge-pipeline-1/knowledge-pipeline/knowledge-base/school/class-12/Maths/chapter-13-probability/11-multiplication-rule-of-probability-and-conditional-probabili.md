---
type: concept
title: Multiplication Rule of Probability and Conditional Probability
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: concept
tags:
- PROBABILITY
- Maths
- multiplication-rule
- class12
- conditional-probability
- probability
- independent-events
- math-concepts
---

Now $P(E) = P(\text{black ball in first draw}) = \frac{10}{15}$.

Also given that the first ball drawn is black, i.e., event $E$ has occurred, now there are 9 black balls and five white balls left in the urn. Therefore, the probability that the second ball drawn is black, given that the ball in the first draw is black, is nothing but the conditional probability of $F$ given that $E$ has occurred.

i.e., $P(F|E) = \frac{9}{14}$.

By multiplication rule of probability, we have:
$P(E \cap F) = P(E) P(F|E) = \frac{10}{15} \times \frac{9}{14} = \frac{3}{7}$.

**Multiplication rule of probability for more than two events**
If $E$, $F$ and $G$ are three events of sample space, we have:
$P(E \cap F \cap G) = P(E) P(F|E) P(G|(E \cap F)) = P(E) P(F|E) P(G|EF)$.

Similarly, the multiplication rule of probability can be extended for four or more events.

The following example illustrates the extension of multiplication rule of probability for three events.

**Example 9:** Three cards are drawn successively, without replacement from a pack of 52 well-shuffled cards. What is the probability that first two cards are kings and the third card drawn is an ace?

**Solution:** Let $K$ denote the event that the card drawn is king and $A$ be the event that the card drawn is an ace. Clearly, we have to find $P(KKA)$.

Now $P(K) = \frac{4}{52}$.

Also, $P(K|K)$ is the probability of second king with the condition that one king has already been drawn. Now there are three kings in $(52 - 1) = 51$ cards.
Therefore, $P(K|K) = \frac{3}{51}$.

Lastly, $P(A|KK)$ is the probability of third drawn card to be an ace, with the condition that two kings have already been drawn. Now there are four aces in left 50 cards.
