---
type: concept
title: Bijective Functions and Examples of One-One and Onto Mappings
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- one-one-mapping
- functions
- mathematics
- RELATIONS AND FUNCTIONS
- class12
- bijective-functions
- onto-mapping
- Maths
---

Remark: $f : X \to Y$ is onto if and only if Range of $f = Y$.

Definition 7: A function $f : X \to Y$ is said to be one-one and onto (or bijective), if $f$ is both one-one and onto. The function $f_4$ in Fig 1.2 (iv) is one-one and onto.

Example 7: Let $A$ be the set of all 50 students of Class X in a school. Let $f : A \to N$ be a function defined by $f(x) = \text{roll number of the student } x$. Show that $f$ is one-one but not onto.

Solution: No two different students of the class can have the same roll number. Therefore, $f$ must be one-one. We can assume without any loss of generality that roll numbers of students are from 1 to 50. This implies that 51 in $N$ is not the roll number of any student of the class, so that 51 cannot be the image of any element of $X$ under $f$. Hence, $f$ is not onto.

Example 8: Show that the function $f : N \to N$, given by $f(x) = 2x$, is one-one but not onto.

Solution: The function $f$ is one-one, for $f(x_1) = f(x_2) \implies 2x_1 = 2x_2 \implies x_1 = x_2$. Further, $f$ is not onto, as for $1 \in N$, there does not exist any $x$ in $N$ such that $f(x) = 2x = 1$.

Example 9: Prove that the function $f : R \to R$, given by $f(x) = 2x$, is one-one and onto.

Solution: $f$ is one-one, as $f(x_1) = f(x_2) \implies 2x_1 = 2x_2 \implies x_1 = x_2$. Also, given any real number $y$ in $R$, there exists $\frac{y}{2}$ in $R$ such that $f(\frac{y}{2}) = 2 \cdot (\frac{y}{2}) = y$. Hence, $f$ is onto.

Example 10: Show that the function $f : N \to N$, given by $f(1) = f(2) = 1$ and $f(x) = x - 1$, for every $x > 2$, is onto but not one-one.

Solution: $f$ is not one-one, as $f(1) = f(2) = 1$. But $f$ is onto, as given any $y \in N, y \neq 1$, we can choose $x$ as $y + 1$ such that $f(y + 1) = y + 1 - 1 = y$. Also for $1 \in N$, we have $f(1) = 1$.

Example 11: Show that the function $f : R \to R$, defined as $f(x) = x^2$, is neither one-one nor onto.

Solution: Since $f(-1) = 1 = f(1)$, $f$ is not one-one. Also, the element $-2$ in the co-domain $R$ is not the image of any element $x$ in the domain $R$ (Why?). Therefore $f$ is not onto.

Example 12: Show that $f : N \to N$, given by $f(x) = \begin{cases} x+1, & \text{if } x \text{ is odd} \\ x-1, & \text{if } x \text{ is even} \end{cases}$ is both one-one and onto.
