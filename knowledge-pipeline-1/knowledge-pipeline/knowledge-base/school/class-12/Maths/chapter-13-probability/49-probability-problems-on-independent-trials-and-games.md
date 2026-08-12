---
type: concept
title: Probability Problems on Independent Trials and Games
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
- probability
- independent-events
- geometric-series
---

Therefore, $1 - P(X = 0) > 0.99$
or $\left(\frac{3}{4}\right)^n < 0.01$ i.e., $\left(\frac{4}{3}\right)^n > \frac{1}{0.01} = 100$ ... (1)
The minimum value of $n$ to satisfy the inequality (1) is 4.
Thus, the shooter must fire 4 times.

**Example 36:** A and B throw a die alternatively till one of them gets a ‘6’ and wins the game. Find their respective probabilities of winning, if A starts first.

**Solution:** Let $S$ denote the success (getting a ‘6’) and $F$ denote the failure (not getting a ‘6’).
Thus, $P(S) = \frac{1}{6}$, $P(F) = \frac{5}{6}$.

$P(A \text{ wins in the first throw}) = P(S) = \frac{1}{6}$

A gets the third throw, when the first throw by A and second throw by B result into failures.
Therefore, $P(A \text{ wins in the 3rd throw}) = P(FFS) = P(F) \cdot P(F) \cdot P(S) = \frac{5}{6} \times \frac{5}{6} \times \frac{1}{6} = \left(\frac{5}{6}\right)^2 \times \frac{1}{6}$

$P(A \text{ wins in the 5th throw}) = P(FFFFS) = \left(\frac{5}{6}\right)^4 \times \frac{1}{6}$ and so on.

Hence, $P(A \text{ wins}) = \frac{1}{6} + \left(\frac{5}{6}\right)^2 \left(\frac{1}{6}\right) + \left(\frac{5}{6}\right)^4 \left(\frac{1}{6}\right) + ...$

$= \frac{\frac{1}{6}}{1 - \frac{25}{36}} = \frac{6}{11}$
