---
type: concept
title: Equivalence Relations and Properties of Binary Operations
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: solved-example
tags:
- binary-operations
- relations-and-functions
- associative-property
- RELATIONS AND FUNCTIONS
- equivalence-relation
- class12
- commutative-property
- Maths
---

RELATIONS AND FUNCTIONS 27

Solution: Note that the characteristic of sets {1, 4, 7}, {2, 5, 8} and {3, 6, 9} is that difference between any two elements of these sets is a multiple of 3. Therefore, $(x, y) \in R_1 \implies x - y$ is a multiple of $3 \implies \{x, y\} \subset \{1, 4, 7\}$ or $\{x, y\} \subset \{2, 5, 8\}$ or $\{x, y\} \subset \{3, 6, 9\} \implies (x, y) \in R_2$. Hence, $R_1 \subset R_2$. Similarly, $\{x, y\} \in R_2 \implies \{x, y\} \subset \{1, 4, 7\}$ or $\{x, y\} \subset \{2, 5, 8\}$ or $\{x, y\} \subset \{3, 6, 9\} \implies x - y$ is divisible by $3 \implies \{x, y\} \in R_1$. This shows that $R_2 \subset R_1$. Hence, $R_1 = R_2$.

Example 44: Let $f : X \to Y$ be a function. Define a relation $R$ in $X$ given by $R = \{(a, b) : f(a) = f(b)\}$. Examine whether $R$ is an equivalence relation or not.

Solution: For every $a \in X, (a, a) \in R$, since $f(a) = f(a)$, showing that $R$ is reflexive. Similarly, $(a, b) \in R \implies f(a) = f(b) \implies f(b) = f(a) \implies (b, a) \in R$. Therefore, $R$ is symmetric. Further, $(a, b) \in R$ and $(b, c) \in R \implies f(a) = f(b)$ and $f(b) = f(c) \implies f(a) = f(c) \implies (a, c) \in R$, which implies that $R$ is transitive. Hence, $R$ is an equivalence relation.

Example 45: Determine which of the following binary operations on the set $\mathbb{R}$ are associative and which are commutative.
(a) $a * b = 1, \forall a, b \in \mathbb{R}$
(b) $a * b = \frac{a+b}{2}, \forall a, b \in \mathbb{R}$

Solution:
(a) Clearly, by definition $a * b = b * a = 1, \forall a, b \in \mathbb{R}$. Also $(a * b) * c = (1 * c) = 1$ and $a * (b * c) = a * (1) = 1, \forall a, b, c \in \mathbb{R}$. Hence $*$ is both associative and commutative.
(b) $a * b = \frac{a+b}{2} = \frac{b+a}{2} = b * a$, shows that $*$ is commutative. Further,
$(a * b) * c = \left( \frac{a+b}{2} \right) * c = \frac{\frac{a+b}{2} + c}{2} = \frac{a+b+2c}{4}$.
But $a * (b * c) = a * \left( \frac{b+c}{2} \right) = \frac{a + \frac{b+c}{2}}{2} = \frac{2a+b+c}{4} \neq \frac{a+b+2c}{4}$ in general.
Hence, $*$ is not associative.
