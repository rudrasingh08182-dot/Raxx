---
type: concept
title: Commutative and Associative Binary Operations
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- binary-operations
- associative-property
- mathematics
- RELATIONS AND FUNCTIONS
- commutative-property
- class12
- Maths
---

### Definition 11
A binary operation $*$ on the set $X$ is called commutative, if $a * b = b * a$, for every $a, b \in X$.

**Example 34**
Show that $+ : R \times R \to R$ and $\times : R \times R \to R$ are commutative binary operations, but $- : R \times R \to R$ and $\div : R^* \times R^* \to R^*$ are not commutative.

**Solution**
Since $a + b = b + a$ and $a \times b = b \times a, \forall a, b \in R$, '+' and '$\times$' are commutative binary operations. However, '$-$' is not commutative, since $3 - 4 \neq 4 - 3$. Similarly, $3 \div 4 \neq 4 \div 3$ shows that '$\div$' is not commutative.

**Example 35**
Show that $* : R \times R \to R$ defined by $a * b = a + 2b$ is not commutative.

**Solution**
Since $3 * 4 = 3 + 8 = 11$ and $4 * 3 = 4 + 6 = 10$, showing that the operation $*$ is not commutative.

If we want to associate three elements of a set $X$ through a binary operation on $X$, we encounter a natural problem. The expression $a * b * c$ may be interpreted as $(a * b) * c$ or $a * (b * c)$ and these two expressions need not be same. For example, $(8 - 5) - 2 \neq 8 - (5 - 2)$. Therefore, association of three numbers 8, 5 and 3 through the binary operation 'subtraction' is meaningless, unless bracket is used. But in case of addition, $8 + 5 + 2$ has the same value whether we look at it as $(8 + 5) + 2$ or as $8 + (5 + 2)$. Thus, association of 3 or even more than 3 numbers through addition is meaningful without using bracket. This leads to the following:

### Definition 12
A binary operation $* : A \times A \to A$ is said to be associative if $(a * b) * c = a * (b * c), \forall a, b, c \in A$.

**Example 36**
Show that addition and multiplication are associative binary operation on $R$. But subtraction is not associative on $R$. Division is not associative on $R^*$.

**Solution**
Addition and multiplication are associative, since $(a + b) + c = a + (b + c)$ and $(a \times b) \times c = a \times (b \times c) \forall a, b, c \in R$. However, subtraction and division are not associative, as $(8 - 5) - 3 \neq 8 - (5 - 3)$ and $(8 \div 5) \div 3 \neq 8 \div (5 \div 3)$.

**Example 37**
Show that $* : R \times R \to R$ given by $a * b = a + 2b$ is not associative.

**Solution**
The operation $*$ is not associative, since:
$(8 * 5) * 3 = (8 + 10) * 3 = (8 + 10) + 6 = 24$
while $8 * (5 * 3) = 8 * (5 + 6) = 8 * 11 = 8 + 22 = 30$.
