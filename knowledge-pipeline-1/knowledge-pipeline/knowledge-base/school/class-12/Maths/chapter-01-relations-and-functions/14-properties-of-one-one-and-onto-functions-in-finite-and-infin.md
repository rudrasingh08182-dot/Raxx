---
type: concept
title: Properties of One-One and Onto Functions in Finite and Infinite Sets
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- one-one-function
- functions
- finite-sets
- mathematics
- RELATIONS AND FUNCTIONS
- class12
- infinite-sets
- Maths
- onto-function
---

### Solution
Suppose $f(x_1) = f(x_2)$. Note that if $x_1$ is odd and $x_2$ is even, then we will have $x_1 + 1 = x_2 - 1$, i.e., $x_2 - x_1 = 2$ which is impossible. Similarly, the possibility of $x_1$ being even and $x_2$ being odd can also be ruled out, using the similar argument. Therefore, both $x_1$ and $x_2$ must be either odd or even. Suppose both $x_1$ and $x_2$ are odd. Then $f(x_1) = f(x_2) \Rightarrow x_1 + 1 = x_2 + 1 \Rightarrow x_1 = x_2$. Similarly, if both $x_1$ and $x_2$ are even, then also $f(x_1) = f(x_2) \Rightarrow x_1 - 1 = x_2 - 1 \Rightarrow x_1 = x_2$. Thus, $f$ is one-one. Also, any odd number $2r + 1$ in the co-domain $N$ is the image of $2r + 2$ in the domain $N$ and any even number $2r$ in the co-domain $N$ is the image of $2r - 1$ in the domain $N$. Thus, $f$ is onto.

**Example 13:** Show that an onto function $f : \{1, 2, 3\} \to \{1, 2, 3\}$ is always one-one.
**Solution:** Suppose $f$ is not one-one. Then there exists two elements, say 1 and 2 in the domain whose image in the co-domain is same. Also, the image of 3 under $f$ can be only one element. Therefore, the range set can have at the most two elements of the co-domain $\{1, 2, 3\}$, showing that $f$ is not onto, a contradiction. Hence, $f$ must be one-one.

**Example 14:** Show that a one-one function $f : \{1, 2, 3\} \to \{1, 2, 3\}$ must be onto.
**Solution:** Since $f$ is one-one, three elements of $\{1, 2, 3\}$ must be taken to 3 different elements of the co-domain $\{1, 2, 3\}$ under $f$. Hence, $f$ has to be onto.

**Remark:** The results mentioned in Examples 13 and 14 are also true for an arbitrary finite set $X$, i.e., a one-one function $f : X \to X$ is necessarily onto and an onto map $f : X \to X$ is necessarily one-one, for every finite set $X$. In contrast to this, Examples 8 and 10 show that for an infinite set, this may not be true. In fact, this is a characteristic difference between a finite and an infinite set.

### EXERCISE 1.2
1. Show that the function $f : R^* \to R^*$ defined by $f(x) = \frac{1}{x}$ is one-one and onto, where $R^*$ is the set of all non-zero real numbers. Is the result true, if the domain $R^*$ is replaced by $N$ with co-domain being same as $R^*$?
2.
