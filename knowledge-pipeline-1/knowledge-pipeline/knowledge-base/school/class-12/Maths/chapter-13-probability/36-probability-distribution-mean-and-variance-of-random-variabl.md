---
type: concept
title: Probability Distribution, Mean, and Variance of Random Variables
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: concept
tags:
- PROBABILITY
- Maths
- mean
- variance
- class12
- probability-distribution
- random-variable
- statistics
---

### Probability Distribution of Sum of Two Dice

$P(X = 9) = P(\{(3,6), (4,5), (5,4), (6,3)\}) = \frac{4}{36}$

$P(X = 10) = P(\{(4,6), (5,5), (6,4)\}) = \frac{3}{36}$

$P(X = 11) = P(\{(5,6), (6,5)\}) = \frac{2}{36}$

$P(X = 12) = P(\{(6,6)\}) = \frac{1}{36}$

The probability distribution of X is:

| X or x | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| P(X) or $p_i$ | $\frac{1}{36}$ | $\frac{2}{36}$ | $\frac{3}{36}$ | $\frac{4}{36}$ | $\frac{5}{36}$ | $\frac{6}{36}$ | $\frac{5}{36}$ | $\frac{4}{36}$ | $\frac{3}{36}$ | $\frac{2}{36}$ | $\frac{1}{36}$ |

Therefore,

$\mu = E(X) = \sum_{i=1}^{n} x_i p_i = (2 \times \frac{1}{36}) + (3 \times \frac{2}{36}) + (4 \times \frac{3}{36}) + (5 \times \frac{4}{36}) + (6 \times \frac{5}{36}) + (7 \times \frac{6}{36}) + (8 \times \frac{5}{36}) + (9 \times \frac{4}{36}) + (10 \times \frac{3}{36}) + (11 \times \frac{2}{36}) + (12 \times \frac{1}{36})$

$= \frac{2 + 6 + 12 + 20 + 30 + 42 + 40 + 36 + 30 + 22 + 12}{36} = \frac{252}{36} = 7$

Thus, the mean of the sum of the numbers that appear on throwing two fair dice is 7.

### 13.6.3 Variance of a random variable

The mean of a random variable does not give us information about the variability in the values of the random variable. In fact, if the variance is small, then the values of the random variable are close to the mean. Also random variables with different probability distributions can have equal means, as shown in the following distributions of X and Y.

| X | 1 | 2 | 3 | 4 |
| :--- | :--- | :--- | :--- | :--- |
| P(X) | $\frac{1}{8}$ | $\frac{2}{8}$ | $\frac{3}{8}$ | $\frac{2}{8}$ |

| Y | -1 | 0 | 4 | 5 | 6 |
| :--- | :--- | :--- | :--- | :--- | :--- |
| P(Y) | $\frac{1}{8}$ | $\frac{2}{8}$ | $\frac{3}{8}$ | $\frac{1}{8}$ | $\frac{1}{8}$ |

Clearly $E(X) = (1 \times \frac{1}{8}) + (2 \times \frac{2}{8}) + (3 \times \frac{3}{8}) + (4 \times \frac{2}{8}) = \frac{1+4+9+8}{8} = \frac{22}{8} = 2.75$

and $E(Y) = (-1 \times \frac{1}{8}) + (0 \times \frac{2}{8}) + (4 \times \frac{3}{8}) + (5 \times \frac{1}{8}) + (6 \times \frac{1}{8}) = \frac{-1+0+12+5+6}{8} = \frac{22}{8} = 2.75$

The variables X and Y are different, however their means are same. It is also easily observable from the diagrammatic representation of these distributions (Fig 13.5).

To distinguish X from Y, we require a measure of the extent to which the values of the random variables spread out. In Statistics, we have studied that the variance is a measure of the spread or scatter in data. Likewise, the variability or spread in the values of a random variable may be measured by variance.

**Definition 7** Let X be a random variable whose possible values $x_1, x_2, ..., x_n$ occur with probabilities $p(x_1), p(x_2), ..., p(x_n)$ respectively. Let $\mu = E(X)$ be the mean of X. The variance of X, denoted by $Var(X)$ or $\sigma_x^2$ is defined as:

$\sigma_x^2 = Var(X) = \sum_{i=1}^{n} (x_i - \mu)^2 p(x_i)$

or equivalently $\sigma_x^2 = E(X - \mu)^2$
