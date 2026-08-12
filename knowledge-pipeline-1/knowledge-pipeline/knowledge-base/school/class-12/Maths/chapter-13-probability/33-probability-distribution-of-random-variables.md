---
type: concept
title: Probability Distribution of Random Variables
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
- probability-distribution
- mathematics
- random-variable
- independent-events
---

### Probability Distribution of Random Variables

**Note:** If $x_i$ is one of the possible values of a random variable $X$, the statement $X = x_i$ is true only at some point(s) of the sample space. Hence, the probability that $X$ takes value $x_i$ is always nonzero, i.e., $P(X = x_i) \neq 0$.

Also, for all possible values of the random variable $X$, all elements of the sample space are covered. Hence, the sum of all the probabilities in a probability distribution must be one.

**Example 24:** Two cards are drawn successively with replacement from a well-shuffled deck of 52 cards. Find the probability distribution of the number of aces.

**Solution:** The number of aces is a random variable. Let it be denoted by $X$. Clearly, $X$ can take the values 0, 1, or 2.

Now, since the draws are done with replacement, therefore, the two draws form independent experiments.

Therefore, 
$P(X = 0) = P(\text{non-ace and non-ace}) = P(\text{non-ace}) \times P(\text{non-ace}) = \frac{48}{52} \times \frac{48}{52} = \frac{144}{169}$

$P(X = 1) = P(\text{ace and non-ace or non-ace and ace}) = P(\text{ace}) \cdot P(\text{non-ace}) + P(\text{non-ace}) \cdot P(\text{ace}) = \frac{4}{52} \times \frac{48}{52} + \frac{48}{52} \times \frac{4}{52} = \frac{24}{169} + \frac{24}{169} = \frac{48}{169}$

$P(X = 2) = P(\text{ace and ace}) = \frac{4}{52} \times \frac{4}{52} = \frac{1}{169}$

Thus, the required probability distribution is:

| $X$ | 0 | 1 | 2 |
|---|---|---|---|
| $P(X)$ | $\frac{144}{169}$ | $\frac{48}{169}$ | $\frac{1}{169}$ |

**Example 25:** Find the probability distribution of number of doublets in three throws of a pair of dice.

**Solution:** Let $X$ denote the number of doublets. Possible doublets are (1,1), (2,2), (3,3), (4,4), (5,5), (6,6). Clearly, $X$ can take the value 0, 1, 2, or 3.

Probability of getting a doublet = $\frac{6}{36} = \frac{1}{6}$
Probability of not getting a doublet = $1 - \frac{1}{6} = \frac{5}{6}$

Now,
$P(X = 0) = P(\text{no doublet}) = \frac{5}{6} \times \frac{5}{6} \times \frac{5}{6} = \frac{125}{216}$

$P(X = 1) = P(\text{one doublet and two non-doublets}) = 3 \times (\frac{1}{6} \times \frac{5}{6} \times \frac{5}{6}) = \frac{75}{216}$

$P(X = 2) = P(\text{two doublets and one non-doublet}) = 3 \times (\frac{1}{6} \times \frac{1}{6} \times \frac{5}{6}) = \frac{15}{216}$

$P(X = 3) = P(\text{three doublets}) = \frac{1}{6} \times \frac{1}{6} \times \frac{1}{6} = \frac{1}{216}$

Thus, the required probability distribution is:

| $X$ | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $P(X)$ | $\frac{125}{216}$ | $\frac{75}{216}$ | $\frac{15}{216}$ | $\frac{1}{216}$ |

**Verification:** Sum of the probabilities $\sum_{i=1}^{n} p_i = \frac{125+75+15+1}{216} = \frac{216}{216} = 1$
