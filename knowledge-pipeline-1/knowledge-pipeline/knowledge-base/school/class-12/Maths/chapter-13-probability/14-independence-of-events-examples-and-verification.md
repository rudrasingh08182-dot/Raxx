---
type: concept
title: 'Independence of Events: Examples and Verification'
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: solved-example
tags:
- PROBABILITY
- Maths
- sample-space
- class12
- probability
- mathematics
- independent-events
---

If at least one of the above is not true for three given events, we say that the events are not independent.

**Example 10:** A die is thrown. If $E$ is the event ‘the number appearing is a multiple of 3’ and $F$ be the event ‘the number appearing is even’ then find whether $E$ and $F$ are independent?

**Solution:** We know that the sample space is $S = \{1, 2, 3, 4, 5, 6\}$.
Now $E = \{3, 6\}$, $F = \{2, 4, 6\}$ and $E \cap F = \{6\}$.
Then $P(E) = \frac{2}{6} = \frac{1}{3}$, $P(F) = \frac{3}{6} = \frac{1}{2}$ and $P(E \cap F) = \frac{1}{6}$.
Clearly $P(E \cap F) = P(E) \cdot P(F)$.
Hence $E$ and $F$ are independent events.

**Example 11:** An unbiased die is thrown twice. Let the event $A$ be ‘odd number on the first throw’ and $B$ the event ‘odd number on the second throw’. Check the independence of the events $A$ and $B$.

**Solution:** If all the 36 elementary events of the experiment are considered to be equally likely, we have:
$P(A) = \frac{18}{36} = \frac{1}{2}$ and $P(B) = \frac{18}{36} = \frac{1}{2}$.
Also $P(A \cap B) = P(\text{odd number on both throws}) = \frac{9}{36} = \frac{1}{4}$.
Now $P(A) \cdot P(B) = \frac{1}{2} \times \frac{1}{2} = \frac{1}{4}$.
Clearly $P(A \cap B) = P(A) \times P(B)$.
Thus, $A$ and $B$ are independent events.

**Example 12:** Three coins are tossed simultaneously. Consider the event $E$ ‘three heads or three tails’, $F$ ‘at least two heads’ and $G$ ‘at most two heads’. Of the pairs $(E, F)$, $(E, G)$ and $(F, G)$, which are independent? which are dependent?

**Solution:** The sample space of the experiment is given by:
$S = \{HHH, HHT, HTH, THH, HTT, THT, TTH, TTT\}$
Clearly $E = \{HHH, TTT\}$, $F = \{HHH, HHT, HTH, THH\}$
