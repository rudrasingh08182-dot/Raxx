---
type: concept
title: Introduction to Binomial Distribution and Bernoulli Trials
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
- random-variables
- statistics
- binomial-distribution
---

### Probability

(ii) When the drawing is done without replacement, the probability of success (i.e., red ball) in the first trial is $\frac{7}{16}$, in the 2nd trial is $\frac{6}{15}$ if the first ball drawn is red or $\frac{7}{15}$ if the first ball drawn is black and so on. Clearly, the probability of success is not the same for all trials; hence, the trials are not Bernoulli trials.

### 13.7.2 Binomial distribution

Consider the experiment of tossing a coin in which each trial results in success (say, heads) or failure (tails). Let S and F denote respectively success and failure in each trial. Suppose we are interested in finding the ways in which we have one success in six trials.

Clearly, six different cases are there as listed below:
SFFFFF, FSFFFF, FFSFFF, FFFSFF, FFFFSF, FFFFFS.

Similarly, two successes and four failures can have $\frac{6!}{4! 2!}$ combinations. It will be a lengthy job to list all of these ways. Therefore, calculation of probabilities of 0, 1, 2, ..., n number of successes may be lengthy and time-consuming. To avoid the lengthy calculations and listing of all the possible cases, for the probabilities of number of successes in n-Bernoulli trials, a formula is derived. For this purpose, let us take the experiment made up of three Bernoulli trials with probabilities $p$ and $q = 1 - p$ for success and failure respectively in each trial. The sample space of the experiment is the set:
$S = \{SSS, SSF, SFS, FSS, SFF, FSF, FFS, FFF\}$

The number of successes is a random variable $X$ and can take values 0, 1, 2, or 3. The probability distribution of the number of successes is as below:

$P(X = 0) = P(\text{no success})$
$= P(\{FFF\}) = P(F) P(F) P(F)$
$= q \cdot q \cdot q = q^3$ (since the trials are independent)

$P(X = 1) = P(\text{one success})$
$= P(\{SFF, FSF, FFS\})$
$= P(\{SFF\}) + P(\{FSF\}) + P(\{FFS\})$
$= P(S) P(F) P(F) + P(F) P(S) P(F) + P(F) P(F) P(S)$
$= p \cdot q \cdot q + q \cdot p \cdot q + q \cdot q \cdot p = 3pq^2$

$P(X = 2) = P(\text{two successes})$
$= P(\{SSF, SFS, FSS\})$
$= P(\{SSF\}) + P(\{SFS\}) + P(\{FSS\})$
