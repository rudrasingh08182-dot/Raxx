---
type: concept
title: Probability Distribution, Mean, Variance, and Exercise Problems
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
- mathematics-exercise
- probability-distribution
- mean-variance
- random-variable
---

and $P(X = 2) = P(\text{two kings}) = \frac{^4C_2}{^{52}C_2} = \frac{6}{1326} = \frac{1}{221}$

Thus, the probability distribution of $X$ is:

| X | 0 | 1 | 2 |
|---|---|---|---|
| P(X) | $\frac{188}{221}$ | $\frac{32}{221}$ | $\frac{1}{221}$ |

Now, Mean of $X = E(X) = \sum_{i=1}^{n} x_i p(x_i) = 0 \times \frac{188}{221} + 1 \times \frac{32}{221} + 2 \times \frac{1}{221} = \frac{34}{221}$

Also $E(X^2) = \sum_{i=1}^{n} x_i^2 p(x_i) = 0^2 \times \frac{188}{221} + 1^2 \times \frac{32}{221} + 2^2 \times \frac{1}{221} = \frac{36}{221}$

Now $Var(X) = E(X^2) - [E(X)]^2 = \frac{36}{221} - \left(\frac{34}{221}\right)^2 = \frac{6800}{48841}$

Therefore $\sigma_x = \sqrt{Var(X)} \approx 0.37$

### EXERCISE 13.4

1. State which of the following are not the probability distributions of a random variable. Give reasons for your answer.
(i) 
| X | 0 | 1 | 2 |
|---|---|---|---|
| P(X) | 0.4 | 0.4 | 0.2 |

(ii) 
| X | 0 | 1 | 2 | 3 | 4 |
|---|---|---|---|---|---|
| P(X) | 0.1 | 0.5 | 0.2 | -0.1 | 0.3 |

(iii) 
| Y | -1 | 0 | 1 |
|---|---|---|---|
| P(Y) | 0.6 | 0.1 | 0.2 |

(iv) 
| Z | 3 | 2 | 1 | 0 | -1 |
|---|---|---|---|---|---|
| P(Z) | 0.3 | 0.2 | 0.4 | 0.1 | 0.05 |

2. An urn contains 5 red and 2 black balls. Two balls are randomly drawn. Let $X$ represent the number of black balls. What are the possible values of $X$? Is $X$ a random variable?

3. Let $X$ represent the difference between the number of heads and the number of tails obtained when a coin is tossed 6 times. What are possible values of $X$?

4. Find the probability distribution of
(i) number of heads in two tosses of a coin.
(ii) number of tails in the simultaneous tosses of three coins.
(iii) number of heads in four tosses of a coin.

5. Find the probability distribution of the number of successes in two tosses of a die, where a success is defined as
(i) number greater than 4
(ii) six appears on at least one die

6. From a lot of 30 bulbs which include 6 defectives, a sample of 4 bulbs is drawn at random with replacement. Find the probability distribution of the number of defective bulbs.

7. A coin is biased so that the head is 3 times as likely to occur as tail. If the coin is tossed twice, find the probability distribution of number of tails.

8. A random variable $X$ has the following probability distribution:

| X | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| P(X) | 0 | $k$ | $2k$ | $2k$ | $3k$ | $k^2$ | $2k^2$ | $7k^2 + k$ |

Determine
(i) $k$ (ii) $P(X < 3)$
(iii) $P(X > 6)$ (iv) $P(0 < X < 3)$
