---
type: concept
title: Partition of Sample Space and Theorem of Total Probability
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: concept
tags:
- PROBABILITY
- Maths
- sample-space
- class12
- probability
- mathematics
- partition
- total-probability-theorem
---

### Partition of Sample Space and Theorem of Total Probability

(b) $E_1 \cup E_2 \cup ... \cup E_n = S$ and
(c) $P(E_i) > 0$ for all $i = 1, 2, ..., n$.

In other words, the events $E_1, E_2, ..., E_n$ represent a partition of the sample space $S$ if they are pairwise disjoint, exhaustive and have nonzero probabilities.

As an example, we see that any nonempty event $E$ and its complement $E'$ form a partition of the sample space $S$ since they satisfy $E \cap E' = \phi$ and $E \cup E' = S$.

From the Venn diagram in Fig 13.3, one can easily observe that if $E$ and $F$ are any two events associated with a sample space $S$, then the set $\{E \cap F', E \cap F, E' \cap F, E' \cap F'\}$ is a partition of the sample space $S$. It may be mentioned that the partition of a sample space is not unique. There can be several partitions of the same sample space.

We shall now prove a theorem known as Theorem of total probability.

#### 13.5.2 Theorem of total probability

Let $\{E_1, E_2, ..., E_n\}$ be a partition of the sample space $S$, and suppose that each of the events $E_1, E_2, ..., E_n$ has nonzero probability of occurrence. Let $A$ be any event associated with $S$, then

$P(A) = P(E_1) P(A|E_1) + P(E_2) P(A|E_2) + ... + P(E_n) P(A|E_n)$

$= \sum_{j=1}^{n} P(E_j) P(A|E_j)$

**Proof:** Given that $E_1, E_2, ..., E_n$ is a partition of the sample space $S$ (Fig 13.4). Therefore,
$S = E_1 \cup E_2 \cup ... \cup E_n$ ... (1)
and $E_i \cap E_j = \phi, i \neq j, i, j = 1, 2, ..., n$

Now, we know that for any event $A$,
$A = A \cap S$
$= A \cap (E_1 \cup E_2 \cup ... \cup E_n)$
$= (A \cap E_1) \cup (A \cap E_2) \cup ... \cup (A \cap E_n)$

Also $A \cap E_i$ and $A \cap E_j$ are respectively the subsets of $E_i$ and $E_j$. We know that $E_i$ and $E_j$ are disjoint, for $i \neq j$, therefore, $A \cap E_i$ and $A \cap E_j$ are also disjoint for all $i \neq j, i, j = 1, 2, ..., n$.

Thus, $P(A) = P [(A \cap E_1) \cup (A \cap E_2) \cup ... \cup (A \cap E_n)]$
$= P(A \cap E_1) + P(A \cap E_2) + ... + P(A \cap E_n)$

Now, by multiplication rule of probability, we have
$P(A \cap E_i) = P(E_i) P(A|E_i)$ as $P(E_i) \neq 0 \forall i = 1, 2, ..., n$
