---
type: concept
title: Application of Bayes' Theorem in Probability Problems
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: solved-example
tags:
- PROBABILITY
- Maths
- class12
- bayes-theorem
- conditional-probability
- probability
- mathematics
---

P(E') = 1 – P(E) = 0.999

$P(A|E) = P(\text{Person tested as HIV+ive given that he/she is actually having HIV}) = 90\% = \frac{90}{100} = 0.9$

$P(A|E') = P(\text{Person tested as HIV+ive given that he/she is actually not having HIV}) = 1\% = \frac{1}{100} = 0.01$

Now, by Bayes' theorem:

$P(E|A) = \frac{P(E) P(A|E)}{P(E) P(A|E) + P(E') P(A|E')}$

$= \frac{0.001 \times 0.9}{0.001 \times 0.9 + 0.999 \times 0.01} = \frac{0.0009}{0.0009 + 0.00999} = \frac{0.0009}{0.01089} \approx 0.083$

Thus, the probability that a person selected at random is actually having HIV given that he/she is tested HIV+ive is 0.083.

**Example 19** In a factory which manufactures bolts, machines A, B and C manufacture respectively 25%, 35% and 40% of the bolts. Of their outputs, 5, 4 and 2 percent are respectively defective bolts. A bolt is drawn at random from the product and is found to be defective. What is the probability that it is manufactured by the machine B?

**Solution** Let events $B_1, B_2, B_3$ be the following:
$B_1$: the bolt is manufactured by machine A
$B_2$: the bolt is manufactured by machine B
$B_3$: the bolt is manufactured by machine C

Clearly, $B_1, B_2, B_3$ are mutually exclusive and exhaustive events and hence, they represent a partition of the sample space.

Let the event E be ‘the bolt is defective’. The event E occurs with $B_1$ or with $B_2$ or with $B_3$. Given that,
$P(B_1) = 25\% = 0.25, P(B_2) = 0.35$ and $P(B_3) = 0.40$

Again $P(E|B_1) = \text{Probability that the bolt drawn is defective given that it is manufactured by machine A} = 5\% = 0.05$

Similarly, $P(E|B_2) = 0.04, P(E|B_3) = 0.02$.
