---
type: concept
title: Binary Operations and Equivalence Relations Practice Problems
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: practice-question
tags:
- binary-operations
- set-theory
- mathematics
- RELATIONS AND FUNCTIONS
- class12
- algebra
- equivalence-relations
- Maths
---

MATHEMATICS 26

Show that $*$ is commutative and associative. Find the identity element for $*$ on A, if any.

12. State whether the following statements are true or false. Justify.
(i) For an arbitrary binary operation $*$ on a set $N$, $a * a = a \forall a \in N$.
(ii) If $*$ is a commutative binary operation on $N$, then $a * (b * c) = (c * b) * a$

13. Consider a binary operation $*$ on $N$ defined as $a * b = a^3 + b^3$. Choose the correct answer.
(A) Is $*$ both associative and commutative?
(B) Is $*$ commutative but not associative?
(C) Is $*$ associative but not commutative?
(D) Is $*$ neither commutative nor associative?

### Miscellaneous Examples

**Example 41** If $R_1$ and $R_2$ are equivalence relations in a set $A$, show that $R_1 \cap R_2$ is also an equivalence relation.

**Solution** Since $R_1$ and $R_2$ are equivalence relations, $(a, a) \in R_1$, and $(a, a) \in R_2 \forall a \in A$. This implies that $(a, a) \in R_1 \cap R_2, \forall a$, showing $R_1 \cap R_2$ is reflexive. Further, $(a, b) \in R_1 \cap R_2 \Rightarrow (a, b) \in R_1$ and $(a, b) \in R_2 \Rightarrow (b, a) \in R_1$ and $(b, a) \in R_2 \Rightarrow (b, a) \in R_1 \cap R_2$, hence, $R_1 \cap R_2$ is symmetric. Similarly, $(a, b) \in R_1 \cap R_2$ and $(b, c) \in R_1 \cap R_2 \Rightarrow (a, c) \in R_1$ and $(a, c) \in R_2 \Rightarrow (a, c) \in R_1 \cap R_2$. This shows that $R_1 \cap R_2$ is transitive. Thus, $R_1 \cap R_2$ is an equivalence relation.

**Example 42** Let $R$ be a relation on the set $A$ of ordered pairs of positive integers defined by $(x, y) R (u, v)$ if and only if $xv = yu$. Show that $R$ is an equivalence relation.

**Solution** Clearly, $(x, y) R (x, y), \forall (x, y) \in A$, since $xy = yx$. This shows that $R$ is reflexive. Further, $(x, y) R (u, v) \Rightarrow xv = yu \Rightarrow uy = vx$ and hence $(u, v) R (x, y)$. This shows that $R$ is symmetric. Similarly, $(x, y) R (u, v)$ and $(u, v) R (a, b) \Rightarrow xv = yu$ and $ub = va \Rightarrow xb = ya$ and hence $(x, y) R (a, b)$. Thus, $R$ is transitive. Thus, $R$ is an equivalence relation.

**Example 43** Let $X = \{1, 2, 3, 4, 5, 6, 7, 8, 9\}$. Let $R_1$ be a relation in $X$ given by $R_1 = \{(x, y) : x - y \text{ is divisible by } 3\}$ and $R_2$ be another relation on $X$ given by $R_2 = \{(x, y): \{x, y\} \subset \{1, 4, 7\} \text{ or } \{x, y\} \subset \{2, 5, 8\} \text{ or } \{x, y\} \subset \{3, 6, 9\}\}$. Show that $R_1 = R_2$.
