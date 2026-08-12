---
type: concept
title: Examples on Functions, Relations, and Binary Operations
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: solved-example
tags:
- binary-operations
- set-theory
- one-one-functions
- mathematics
- RELATIONS AND FUNCTIONS
- class12
- equivalence-relations
- Maths
---

### Example 46
Find the number of all one-one functions from set $A = \{1, 2, 3\}$ to itself.

**Solution:**
One-one function from $\{1, 2, 3\}$ to itself is simply a permutation on three symbols 1, 2, 3. Therefore, total number of one-one maps from $\{1, 2, 3\}$ to itself is same as total number of permutations on three symbols 1, 2, 3 which is $3! = 6$.

### Example 47
Let $A = \{1, 2, 3\}$. Then show that the number of relations containing $(1, 2)$ and $(2, 3)$ which are reflexive and transitive but not symmetric is three.

**Solution:**
The smallest relation $R_1$ containing $(1, 2)$ and $(2, 3)$ which is reflexive and transitive but not symmetric is $\{(1, 1), (2, 2), (3, 3), (1, 2), (2, 3), (1, 3)\}$. Now, if we add the pair $(2, 1)$ to $R_1$ to get $R_2$, then the relation $R_2$ will be reflexive, transitive but not symmetric. Similarly, we can obtain $R_3$ by adding $(3, 2)$ to $R_1$ to get the desired relation. However, we can not add two pairs $(2, 1), (3, 2)$ or single pair $(3, 1)$ to $R_1$ at a time, as by doing so, we will be forced to add the remaining pair in order to maintain transitivity and in the process, the relation will become symmetric also which is not required. Thus, the total number of desired relations is three.

### Example 48
Show that the number of equivalence relation in the set $\{1, 2, 3\}$ containing $(1, 2)$ and $(2, 1)$ is two.

**Solution:**
The smallest equivalence relation $R_1$ containing $(1, 2)$ and $(2, 1)$ is $\{(1, 1), (2, 2), (3, 3), (1, 2), (2, 1)\}$. Now we are left with only 4 pairs namely $(2, 3), (3, 2), (1, 3)$ and $(3, 1)$. If we add any one, say $(2, 3)$ to $R_1$, then for symmetry we must add $(3, 2)$ also and now for transitivity we are forced to add $(1, 3)$ and $(3, 1)$. Thus, the only equivalence relation bigger than $R_1$ is the universal relation. This shows that the total number of equivalence relations containing $(1, 2)$ and $(2, 1)$ is two.

### Example 49
Show that the number of binary operations on $\{1, 2\}$ having 1 as identity and having 2 as the inverse of 2 is exactly one.

**Solution:**
A binary operation $*$ on $\{1, 2\}$ is a function from $\{1, 2\} \times \{1, 2\}$ to $\{1, 2\}$, i.e., a function from $\{(1, 1), (1, 2), (2, 1), (2, 2)\} \to \{1, 2\}$.
