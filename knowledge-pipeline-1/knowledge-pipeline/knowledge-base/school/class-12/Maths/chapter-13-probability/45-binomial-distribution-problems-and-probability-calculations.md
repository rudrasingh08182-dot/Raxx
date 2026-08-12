---
type: concept
title: Binomial Distribution Problems and Probability Calculations
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
- mathematics
- binomial-distribution
---

576 MATHEMATICS

(iii) $P(\text{at most six heads}) = P(X \le 6)$
$= P(X = 0) + P(X = 1) + P(X = 2) + P(X = 3) + P(X = 4) + P(X = 5) + P(X = 6)$
$= \frac{848}{1024} = \frac{53}{64}$

**Example 32** Ten eggs are drawn successively with replacement from a lot containing 10% defective eggs. Find the probability that there is at least one defective egg.

**Solution** Let $X$ denote the number of defective eggs in the 10 eggs drawn. Since the drawing is done with replacement, the trials are Bernoulli trials. Clearly, $X$ has the binomial distribution with $n = 10$ and $p = \frac{10}{100} = \frac{1}{10}$.
Therefore $q = 1 - p = \frac{9}{10}$.
Now $P(\text{at least one defective egg}) = P(X \ge 1) = 1 - P(X = 0)$
$= 1 - \binom{10}{0} (\frac{9}{10})^{10} = 1 - (\frac{9}{10})^{10}$

**EXERCISE 13.5**
1. A die is thrown 6 times. If ‘getting an odd number’ is a success, what is the probability of
(i) 5 successes? (ii) at least 5 successes?
(iii) at most 5 successes?
