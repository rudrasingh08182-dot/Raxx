---
type: concept
title: Binary Operations and Operation Tables
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- binary-operations
- set-theory
- mathematics
- RELATIONS AND FUNCTIONS
- class12
- operation-tables
- Maths
---

### Example 32
Let $P$ be the set of all subsets of a given set $X$. Show that $\cup : P \times P \to P$ given by $(A, B) \to A \cup B$ and $\cap : P \times P \to P$ given by $(A, B) \to A \cap B$ are binary operations on the set $P$.

**Solution:** Since union operation $\cup$ carries each pair $(A, B)$ in $P \times P$ to a unique element $A \cup B$ in $P$, $\cup$ is a binary operation on $P$. Similarly, the intersection operation $\cap$ carries each pair $(A, B)$ in $P \times P$ to a unique element $A \cap B$ in $P$, $\cap$ is a binary operation on $P$.

### Example 33
Show that the $\vee : R \times R \to R$ given by $(a, b) \to \max \{a, b\}$ and the $\wedge : R \times R \to R$ given by $(a, b) \to \min \{a, b\}$ are binary operations.

**Solution:** Since $\vee$ carries each pair $(a, b)$ in $R \times R$ to a unique element namely maximum of $a$ and $b$ lying in $R$, $\vee$ is a binary operation. Using the similar argument, one can say that $\wedge$ is also a binary operation.

**Remark:** $\vee(4, 7) = 7$, $\vee(4, -7) = 4$, $\wedge(4, 7) = 4$ and $\wedge(4, -7) = -7$.

When the number of elements in a set $A$ is small, we can express a binary operation $*$ on the set $A$ through a table called the operation table for the operation $*$. For example, consider $A = \{1, 2, 3\}$. Then, the operation $\vee$ on $A$ defined in Example 33 can be expressed by the following operation table (Table 1.1). Here, $\vee(1, 3) = 3$, $\vee(2, 3) = 3$, $\vee(1, 2) = 2$.

**Table 1.1**

Here, we are having 3 rows and 3 columns in the operation table with $(i, j)$ the entry of the table being maximum of $i^{th}$ and $j^{th}$ elements of the set $A$. This can be generalised for a general operation $* : A \times A \to A$. If $A = \{a_1, a_2, ..., a_n\}$, then the operation table will be having $n$ rows and $n$ columns with $(i, j)^{th}$ entry being $a_i * a_j$.

Conversely, given any operation table having $n$ rows and $n$ columns with each entry being an element of $A = \{a_1, a_2, ..., a_n\}$, we can define a binary operation $* : A \times A \to A$ given by $a_i * a_j = $ the entry in the $i^{th}$ row and $j^{th}$ column of the operation table.

One may note that 3 and 4 can be added in any order and the result is same, i.e., $3 + 4 = 4 + 3$, but subtraction of 3 and 4 in different order give different results, i.e., $3 - 4 \neq 4 - 3$.
