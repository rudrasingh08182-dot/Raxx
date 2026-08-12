---
type: concept
title: Derivation of Binomial Distribution for Bernoulli Trials
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
- mathematics
- binomial-distribution
---

574 MATHEMATICS

$= P(S)P(S)P(F) + P(S)P(F)P(S) + P(F)P(S)P(S)$
$= p \cdot p \cdot q + p \cdot q \cdot p + q \cdot p \cdot p = 3p^2q$
and $P(X = 3) = P(\text{three successes}) = P({SSS})$
$= P(S) \cdot P(S) \cdot P(S) = p^3$

Thus, the probability distribution of $X$ is:

| X | 0 | 1 | 2 | 3 |
|---|---|---|---|---|
| $P(X)$ | $q^3$ | $3q^2p$ | $3qp^2$ | $p^3$ |

Also, the binomial expansion of $(q + p)^3$ is:
$q^3 + 3q^2p + 3qp^2 + p^3$

Note that the probabilities of 0, 1, 2 or 3 successes are respectively the 1st, 2nd, 3rd and 4th term in the expansion of $(q + p)^3$.

Also, since $q + p = 1$, it follows that the sum of these probabilities, as expected, is 1.

Thus, we may conclude that in an experiment of $n$-Bernoulli trials, the probabilities of 0, 1, 2, ..., $n$ successes can be obtained as 1st, 2nd, ..., $(n + 1)$th terms in the expansion of $(q + p)^n$. To prove this assertion (result), let us find the probability of $x$-successes in an experiment of $n$-Bernoulli trials.

Clearly, in case of $x$ successes ($S$), there will be $(n - x)$ failures ($F$).
Now, $x$ successes ($S$) and $(n - x)$ failures ($F$) can be obtained in $\frac{n!}{x!(n-x)!}$ ways.

In each of these ways, the probability of $x$ successes and $(n - x)$ failures is:
$= P(x \text{ successes}) \cdot P(n-x \text{ failures})$
$= [P(S) \cdot P(S) \dots P(S) \text{ ($x$ times)}] \cdot [P(F) \cdot P(F) \dots P(F) \text{ ($n-x$ times)}] = p^x q^{n-x}$

Thus, the probability of $x$ successes in $n$-Bernoulli trials is $\frac{n!}{x!(n-x)!} p^x q^{n-x}$ or $^nC_x p^x q^{n-x}$.

Thus $P(x \text{ successes}) = ^nC_x p^x q^{n-x}$, $x = 0, 1, 2, ..., n$ ($q = 1 - p$).

Clearly, $P(x \text{ successes})$, i.e., $^nC_x p^x q^{n-x}$ is the $(x + 1)$th term in the binomial expansion of $(q + p)^n$.

Thus, the probability distribution of the number of successes in an experiment consisting of $n$ Bernoulli trials may be obtained by the binomial expansion of $(q + p)^n$. Hence, this.
