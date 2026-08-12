---
type: concept
title: Bayes' Theorem and Binomial Distribution Mean Calculation
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: solved-example
tags:
- PROBABILITY
- bernoulli-trials
- Maths
- class12
- bayes-theorem
- probability
- mean-calculation
- binomial-distribution
---

### Bayes' Theorem Application

**Solution**
Let $A, E_1, E_2, E_3$ and $E_4$ be the events as defined below:
$A$: a black ball is selected
$E_1$: box I is selected
$E_2$: box II is selected
$E_3$: box III is selected
$E_4$: box IV is selected

Since the boxes are chosen at random, therefore $P(E_1) = P(E_2) = P(E_3) = P(E_4) = \frac{1}{4}$.

Also $P(A|E_1) = \frac{3}{18}$, $P(A|E_2) = \frac{2}{8}$, $P(A|E_3) = \frac{1}{7}$ and $P(A|E_4) = \frac{4}{13}$.

$P(\text{box III is selected, given that the drawn ball is black}) = P(E_3|A)$. By Bayes' theorem,

$P(E_3|A) = \frac{P(E_3)P(A|E_3)}{P(E_1)P(A|E_1) + P(E_2)P(A|E_2) + P(E_3)P(A|E_3) + P(E_4)P(A|E_4)}$

$= \frac{\frac{1}{4} \cdot \frac{1}{7}}{\frac{1}{4} \cdot \frac{3}{18} + \frac{1}{4} \cdot \frac{2}{8} + \frac{1}{4} \cdot \frac{1}{7} + \frac{1}{4} \cdot \frac{4}{13}} = \frac{1/28}{1/24 + 1/16 + 1/28 + 1/13} \approx 0.1651$

---

### Example 34: Mean of Binomial Distribution
**Find the mean of the Binomial distribution $B(4, 1/3)$.**

**Solution**
Let $X$ be the random variable whose probability distribution is $B(4, 1/3)$.
Here $n = 4$, $p = 1/3$ and $q = 1 - 1/3 = 2/3$.
We know that $P(X = x) = {}^4C_x (1/3)^x (2/3)^{4-x}$, $x = 0, 1, 2, 3, 4$.

i.e., the distribution of $X$ is:

| $x_i$ | $P(x_i)$ | $x_i P(x_i)$ |
| :--- | :--- | :--- |
| 0 | ${}^4C_0 (2/3)^4$ | 0 |
| 1 | ${}^4C_1 (1/3)^1 (2/3)^3$ | $1 \cdot {}^4C_1 (1/3)^1 (2/3)^3$ |
| 2 | ${}^4C_2 (1/3)^2 (2/3)^2$ | $2 \cdot {}^4C_2 (1/3)^2 (2/3)^2$ |
| 3 | ${}^4C_3 (1/3)^3 (2/3)^1$ | $3 \cdot {}^4C_3 (1/3)^3 (2/3)^1$ |
| 4 | ${}^4C_4 (1/3)^4$ | $4 \cdot {}^4C_4 (1/3)^4$ |

Now Mean ($\mu$) = $\sum_{i=1}^{4} x_i P(x_i) = 0 + 1 \cdot {}^4C_1 (1/3)^1 (2/3)^3 + 2 \cdot {}^4C_2 (1/3)^2 (2/3)^2 + 3 \cdot {}^4C_3 (1/3)^3 (2/3)^1 + 4 \cdot {}^4C_4 (1/3)^4$

$= \frac{32 + 48 + 24 + 4}{81} = \frac{108}{81} = \frac{4}{3}$

---

### Example 35: Minimum Trials for Probability
**The probability of a shooter hitting a target is 3/4. How many minimum number of times must he/she fire so that the probability of hitting the target at least once is more than 0.99?**

**Solution**
Let the shooter fire $n$ times. Obviously, $n$ fires are $n$ Bernoulli trials. In each trial, $p = \text{probability of hitting the target} = 3/4$ and $q = \text{probability of not hitting the target} = 1/4$. Then $P(X = x) = {}^nC_x (3/4)^x (1/4)^{n-x}$.

Now, given that,
$P(\text{hitting the target at least once}) > 0.99$
i.e., $P(X \ge 1) > 0.99$
