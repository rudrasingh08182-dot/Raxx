---
type: concept
title: Binomial Distribution Concepts and Solved Example
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
- probability
- statistics
- binomial-distribution
---

The distribution of the number of successes $X$ can be written as:

| $X$ | $0$ | $1$ | $2$ | ... | $x$ | ... | $n$ |
|---|---|---|---|---|---|---|---|
| $P(X)$ | $^nC_0 q^n$ | $^nC_1 q^{n-1} p^1$ | $^nC_2 q^{n-2} p^2$ | ... | $^nC_x q^{n-x} p^x$ | ... | $^nC_n p^n$ |

The above probability distribution is known as binomial distribution with parameters $n$ and $p$, because for given values of $n$ and $p$, we can find the complete probability distribution.

The probability of $x$ successes $P(X = x)$ is also denoted by $P(x)$ and is given by:
$P(x) = ^nC_x q^{n-x} p^x$, $x = 0, 1, ..., n$. ($q = 1 - p$)

This $P(x)$ is called the probability function of the binomial distribution.
A binomial distribution with $n$-Bernoulli trials and probability of success in each trial as $p$, is denoted by $B(n, p)$.

Let us now take up some examples.

**Example 31:** If a fair coin is tossed 10 times, find the probability of
(i) exactly six heads
(ii) at least six heads
(iii) at most six heads

**Solution:** The repeated tosses of a coin are Bernoulli trials. Let $X$ denote the number of heads in an experiment of 10 trials.
Clearly, $X$ has the binomial distribution with $n = 10$ and $p = \frac{1}{2}$.
Therefore $P(X = x) = ^nC_x q^{n-x} p^x$, $x = 0, 1, 2, ..., n$.
Here $n = 10$, $p = \frac{1}{2}$, $q = 1 - p = \frac{1}{2}$.
Therefore $P(X = x) = ^{10}C_x (\frac{1}{2})^{10-x} (\frac{1}{2})^x = ^{10}C_x (\frac{1}{2})^{10}$.

Now (i) $P(X = 6) = ^{10}C_6 (\frac{1}{2})^{10} = \frac{10!}{6! 4!} \times \frac{1}{1024} = \frac{105}{512}$.

(ii) $P(\text{at least six heads}) = P(X \ge 6)$
$= P(X = 6) + P(X = 7) + P(X = 8) + P(X = 9) + P(X = 10)$
