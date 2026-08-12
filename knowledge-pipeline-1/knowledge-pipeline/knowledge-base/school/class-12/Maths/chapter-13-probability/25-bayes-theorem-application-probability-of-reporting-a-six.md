---
type: concept
title: 'Bayes'' Theorem Application: Probability of Reporting a Six'
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: solved-example
tags:
- PROBABILITY
- Maths
- math-problems
- class12
- bayes-theorem
- conditional-probability
- probability
---

### Example 21
A man is known to speak truth 3 out of 4 times. He throws a die and reports that it is a six. Find the probability that it is actually a six.

**Solution:**
Let $E$ be the event that the man reports that six occurs in the throwing of the die and let $S_1$ be the event that six occurs and $S_2$ be the event that six does not occur.

Then $P(S_1) = \text{Probability that six occurs} = \frac{1}{6}$

$P(S_2) = \text{Probability that six does not occur} = \frac{5}{6}$

$P(E|S_1) = \text{Probability that the man reports that six occurs when six has actually occurred on the die}$
$= \text{Probability that the man speaks the truth} = \frac{3}{4}$

$P(E|S_2) = \text{Probability that the man reports that six occurs when six has not actually occurred on the die}$
$= \text{Probability that the man does not speak the truth} = 1 - \frac{3}{4} = \frac{1}{4}$

Thus, by Bayes' theorem, we get:
$P(S_1|E) = \text{Probability that the report of the man that six has occurred is actually a six}$
$= \frac{P(S_1)P(E|S_1)}{P(S_1)P(E|S_1) + P(S_2)P(E|S_2)}$
$= \frac{\frac{1}{6} \times \frac{3}{4}}{(\frac{1}{6} \times \frac{3}{4}) + (\frac{5}{6} \times \frac{1}{4})} = \frac{\frac{3}{24}}{\frac{3}{24} + \frac{5}{24}} = \frac{3}{8}$

Hence, the required probability is $\frac{3}{8}$.

### EXERCISE 13.3
1. An urn contains 5 red and 5 black balls. A ball is drawn at random, its colour is noted and is returned to the urn. Moreover, 2 additional balls of the colour drawn are put in the urn and then a ball is drawn at random. What is the probability that the second ball is red?
