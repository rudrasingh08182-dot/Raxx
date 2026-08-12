---
type: concept
title: Theorem of Total Probability and Bayes' Theorem
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: concept
tags:
- PROBABILITY
- Maths
- class12
- bayes-theorem
- conditional-probability
- probability
- mathematics
- total-probability
---

### Theorem of Total Probability

Therefore, $P(A) = P(E_1)P(A|E_1) + P(E_2)P(A|E_2) + ... + P(E_n)P(A|E_n)$

or $P(A) = \sum_{j=1}^{n} P(E_j)P(A|E_j)$

**Example 15:** A person has undertaken a construction job. The probabilities are 0.65 that there will be strike, 0.80 that the construction job will be completed on time if there is no strike, and 0.32 that the construction job will be completed on time if there is a strike. Determine the probability that the construction job will be completed on time.

**Solution:** Let $A$ be the event that the construction job will be completed on time, and $B$ be the event that there will be a strike. We have to find $P(A)$.

We have:
$P(B) = 0.65$, $P(\text{no strike}) = P(B') = 1 - P(B) = 1 - 0.65 = 0.35$
$P(A|B) = 0.32$, $P(A|B') = 0.80$

Since events $B$ and $B'$ form a partition of the sample space $S$, therefore, by theorem on total probability, we have:
$P(A) = P(B)P(A|B) + P(B')P(A|B')$
$= 0.65 \times 0.32 + 0.35 \times 0.8$
$= 0.208 + 0.28 = 0.488$

Thus, the probability that the construction job will be completed in time is 0.488.

We shall now state and prove the Bayes' theorem.

### Bayes’ Theorem
If $E_1, E_2, ..., E_n$ are $n$ non-empty events which constitute a partition of sample space $S$, i.e., $E_1, E_2, ..., E_n$ are pairwise disjoint and $E_1 \cup E_2 \cup ... \cup E_n = S$ and $A$ is any event of nonzero probability, then:

$P(E_i|A) = \frac{P(E_i)P(A|E_i)}{\sum_{j=1}^{n} P(E_j)P(A|E_j)}$ for any $i = 1, 2, 3, ..., n$

**Proof:** By formula of conditional probability, we know that:
$P(E_i|A) = \frac{P(A \cap E_i)}{P(A)}$
$= \frac{P(E_i)P(A|E_i)}{P(A)}$ (by multiplication rule of probability)
$= \frac{P(E_i)P(A|E_i)}{\sum_{j=1}^{n} P(E_j)P(A|E_j)}$ (by the result of theorem of total probability)
