---
type: concept
title: Probability Distribution and Mean of a Random Variable
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
- mean-calculation
- mathematics
- random-variable
- statistics
---

### Example 26
Let $X$ denote the number of hours you study during a randomly selected school day. The probability that $X$ can take the values $x$, has the following form, where $k$ is some unknown constant.

$P(X = x) = \begin{cases} 0.1, & \text{if } x = 0 \\ kx, & \text{if } x = 1 \text{ or } 2 \\ k(5-x), & \text{if } x = 3 \text{ or } 4 \\ 0, & \text{otherwise} \end{cases}$

(a) Find the value of $k$.
(b) What is the probability that you study at least two hours? Exactly two hours? At most two hours?

**Solution**
The probability distribution of $X$ is:

| $X$ | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| $P(X)$ | 0.1 | $k$ | $2k$ | $2k$ | $k$ |

(a) We know that $\sum_{i=1}^{n} p_i = 1$.
Therefore, $0.1 + k + 2k + 2k + k = 1$
i.e., $6k = 0.9$ (derived from $0.1 + 6k = 1$)
$k = 0.15$

(b) $P(\text{you study at least two hours}) = P(X \ge 2)$
$= P(X = 2) + P(X = 3) + P(X = 4)$
$= 2k + 2k + k = 5k = 5 \times 0.15 = 0.75$

$P(\text{you study exactly two hours}) = P(X = 2)$
$= 2k = 2 \times 0.15 = 0.3$

$P(\text{you study at most two hours}) = P(X \le 2)$
$= P(X = 0) + P(X = 1) + P(X = 2)$
$= 0.1 + k + 2k = 0.1 + 3k = 0.1 + 3 \times 0.15$
$= 0.55$

### 13.6.2 Mean of a random variable
In many problems, it is desirable to describe some feature of the random variable by means of a single number that can be computed from its probability distribution. Few such numbers are mean, median and mode. In this section, we shall discuss mean only.

Mean is a measure of location or central tendency in the sense that it roughly locates a middle or average value of the random variable.
