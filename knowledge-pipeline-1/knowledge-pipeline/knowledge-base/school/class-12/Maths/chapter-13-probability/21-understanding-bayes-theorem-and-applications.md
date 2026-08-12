---
type: concept
title: Understanding Bayes' Theorem and Applications
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
- bayes-theorem
- conditional-probability
- probability
- mathematics
- statistics
---

Remark: The following terminology is generally used when Bayes' theorem is applied.

The events $E_1, E_2, ..., E_n$ are called hypotheses.
The probability $P(E_i)$ is called the priori probability of the hypothesis $E_i$.
The conditional probability $P(E_i|A)$ is called a posteriori probability of the hypothesis $E_i$.

Bayes' theorem is also called the formula for the probability of "causes". Since the $E_i$'s are a partition of the sample space $S$, one and only one of the events $E_i$ occurs (i.e., one of the events $E_i$ must occur and only one can occur). Hence, the above formula gives us the probability of a particular $E_i$ (i.e., a "Cause"), given that the event $A$ has occurred.

The Bayes' theorem has its applications in a variety of situations, few of which are illustrated in the following examples.

**Example 16:** Bag I contains 3 red and 4 black balls while another Bag II contains 5 red and 6 black balls. One ball is drawn at random from one of the bags and it is found to be red. Find the probability that it was drawn from Bag II.

**Solution:** Let $E_1$ be the event of choosing the bag I, $E_2$ the event of choosing the bag II and $A$ be the event of drawing a red ball.
Then $P(E_1) = P(E_2) = \frac{1}{2}$.
Also $P(A|E_1) = P(\text{drawing a red ball from Bag I}) = \frac{3}{7}$ and $P(A|E_2) = P(\text{drawing a red ball from Bag II}) = \frac{5}{11}$.

Now, the probability of drawing a ball from Bag II, being given that it is red, is $P(E_2|A)$.
By using Bayes' theorem, we have:
$P(E_2|A) = \frac{P(E_2)P(A|E_2)}{P(E_1)P(A|E_1) + P(E_2)P(A|E_2)} = \frac{\frac{1}{2} \times \frac{5}{11}}{\frac{1}{2} \times \frac{3}{7} + \frac{1}{2} \times \frac{5}{11}} = \frac{35}{68}$

**Example 17:** Given three identical boxes I, II and III, each containing two coins. In box I, both coins are gold coins, in box II, both are silver coins and in the box III, there is one gold and one silver coin. A person chooses a box at random and takes out a coin. If the coin is of gold, what is the probability that the other coin in the box is also of gold?
