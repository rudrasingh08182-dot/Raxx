---
type: concept
title: Variance and Standard Deviation of Random Variables
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: solved-example
tags:
- PROBABILITY
- Maths
- variance
- class12
- probability
- probability-distribution
- standard-deviation
- random-variable
---

The non-negative number $\sigma_x = \sqrt{\text{Var}(X)} = \sqrt{\sum_{i=1}^{n} (x_i - \mu)^2 p(x_i)}$ is called the standard deviation of the random variable $X$.

Another formula to find the variance of a random variable:
We know that, $\text{Var}(X) = \sum_{i=1}^{n} (x_i - \mu)^2 p(x_i)$
$= \sum_{i=1}^{n} (x_i^2 - 2x_i\mu + \mu^2) p(x_i)$
$= \sum_{i=1}^{n} x_i^2 p(x_i) - 2\mu \sum_{i=1}^{n} x_i p(x_i) + \mu^2 \sum_{i=1}^{n} p(x_i)$
Since $\sum p(x_i) = 1$ and $\mu = \sum x_i p(x_i)$:
$= \sum_{i=1}^{n} x_i^2 p(x_i) - 2\mu(\mu) + \mu^2(1)$
$= \sum_{i=1}^{n} x_i^2 p(x_i) - \mu^2$
Or $\text{Var}(X) = E(X^2) - [E(X)]^2$, where $E(X^2) = \sum_{i=1}^{n} x_i^2 p(x_i)$.

**Example 28:** Find the variance of the number obtained on a throw of an unbiased die.
**Solution:** The sample space of the experiment is $S = \{1, 2, 3, 4, 5, 6\}$. Let $X$ denote the number obtained on the throw. Then $X$ is a random variable which can take values 1, 2, 3, 4, 5, or 6. Also $P(1) = P(2) = P(3) = P(4) = P(5) = P(6) = \frac{1}{6}$.

Therefore, the probability distribution of $X$ is:

| X | 1 | 2 | 3 | 4 | 5 | 6 |
|---|---|---|---|---|---|---|
| P(X) | 1/6 | 1/6 | 1/6 | 1/6 | 1/6 | 1/6 |

Now $E(X) = \sum x_i p(x_i) = \frac{1}{6}(1+2+3+4+5+6) = \frac{21}{6} = \frac{7}{2}$.
Also $E(X^2) = \sum x_i^2 p(x_i) = \frac{1}{6}(1^2+2^2+3^2+4^2+5^2+6^2) = \frac{1+4+9+16+25+36}{6} = \frac{91}{6}$.
Thus, $\text{Var}(X) = E(X^2) - (E(X))^2 = \frac{91}{6} - (\frac{7}{2})^2 = \frac{91}{6} - \frac{49}{4} = \frac{182-147}{12} = \frac{35}{12}$.

**Example 29:** Two cards are drawn simultaneously (or successively without replacement) from a well-shuffled pack of 52 cards. Find the mean, variance and standard deviation of the number of kings.
**Solution:** Let $X$ denote the number of kings in a draw of two cards. $X$ is a random variable which can assume the values 0, 1 or 2.
Now $P(X = 0) = P(\text{no king}) = \frac{^{48}C_2}{^{52}C_2} = \frac{48 \times 47}{52 \times 51} = \frac{188}{221}$.
$P(X = 1) = P(\text{one king and one non-king}) = \frac{^4C_1 \times ^{48}C_1}{^{52}C_2} = \frac{4 \times 48}{1326} = \frac{32}{221}$.
