---
type: concept
title: Mean, Variance, and Bernoulli Trials in Probability
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: concept
tags:
- PROBABILITY
- bernoulli-trials
- Maths
- class12
- probability
- random-variable
- mean-variance
- binomial-distribution
---

Let $X$ be a random variable whose possible values $x_1, x_2, x_3, ..., x_n$ occur with probabilities $p_1, p_2, p_3, ..., p_n$ respectively. The mean of $X$, denoted by $\mu$, is the number $\mu = \sum_{i=1}^{n} x_i p_i$. The mean of a random variable $X$ is also called the expectation of $X$, denoted by $E(X)$.

Let $X$ be a random variable whose possible values $x_1, x_2, ..., x_n$ occur with probabilities $p(x_1), p(x_2), ..., p(x_n)$ respectively. Let $\mu = E(X)$ be the mean of $X$. The variance of $X$, denoted by $Var(X)$ or $\sigma_x^2$, is defined as $\sigma_x^2 = \sum_{i=1}^{n} (x_i - \mu)^2 p(x_i)$ or equivalently $\sigma_x^2 = E(X - \mu)^2$. The non-negative number $\sigma_x = \sqrt{Var(X)}$ is called the standard deviation of the random variable $X$.

$Var(X) = E(X^2) - [E(X)]^2$

Trials of a random experiment are called Bernoulli trials, if they satisfy the following conditions:
(i) There should be a finite number of trials.
(ii) The trials should be independent.
(iii) Each trial has exactly two outcomes: success or failure.
(iv) The probability of success remains the same in each trial.

For Binomial distribution $B(n, p)$, $P(X = x) = ^nC_x q^{n-x} p^x$, $x = 0, 1, ..., n$ ($q = 1 - p$).

**Historical Note**
The earliest indication on measurement of chances in game of dice appeared in 1477 in a commentary on Dante's Divine Comedy. A treatise on gambling named Liber de Ludo Alcae, by Geronimo Carden (1501-1576) was published posthumously in 1663. In this treatise, he gives the number of favourable cases for each event when two dice are thrown.
