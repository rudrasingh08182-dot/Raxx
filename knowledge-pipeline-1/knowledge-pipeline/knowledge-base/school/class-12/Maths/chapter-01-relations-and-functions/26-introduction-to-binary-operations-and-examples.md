---
type: concept
title: Introduction to Binary Operations and Examples
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- binary-operations
- real-numbers
- functions
- set-theory
- mathematics
- RELATIONS AND FUNCTIONS
- class12
- Maths
---

Addition, subtraction, multiplication, and division are examples of binary operations, as ‘binary’ means two. If we want to have a general definition which can cover all these four operations, then the set of numbers is to be replaced by an arbitrary set X and then general binary operation is nothing but association of any pair of elements a, b from X to another element of X. This gives rise to a general definition as follows:

Definition 10: A binary operation $*$ on a set A is a function $* : A \times A \to A$. We denote $*(a, b)$ by $a * b$.

Example 29: Show that addition, subtraction and multiplication are binary operations on $\mathbb{R}$, but division is not a binary operation on $\mathbb{R}$. Further, show that division is a binary operation on the set $\mathbb{R}^*$ of nonzero real numbers.

Solution:
$+ : \mathbb{R} \times \mathbb{R} \to \mathbb{R}$ is given by $(a, b) \to a + b$
$- : \mathbb{R} \times \mathbb{R} \to \mathbb{R}$ is given by $(a, b) \to a - b$
$\times : \mathbb{R} \times \mathbb{R} \to \mathbb{R}$ is given by $(a, b) \to ab$

Since ‘+’, ‘–’ and ‘×’ are functions, they are binary operations on $\mathbb{R}$.
But $\div : \mathbb{R} \times \mathbb{R} \to \mathbb{R}$, given by $(a, b) \to \frac{a}{b}$, is not a function and hence not a binary operation, as for $b = 0$, $\frac{a}{b}$ is not defined.
However, $\div : \mathbb{R}^* \times \mathbb{R}^* \to \mathbb{R}^*$, given by $(a, b) \to \frac{a}{b}$ is a function and hence a binary operation on $\mathbb{R}^*$.

Example 30: Show that subtraction and division are not binary operations on $\mathbb{N}$.

Solution:
$- : \mathbb{N} \times \mathbb{N} \to \mathbb{N}$, given by $(a, b) \to a - b$, is not a binary operation, as the image of $(3, 5)$ under ‘–’ is $3 - 5 = -2 \notin \mathbb{N}$. Similarly, $\div : \mathbb{N} \times \mathbb{N} \to \mathbb{N}$, given by $(a, b) \to a \div b$ is not a binary operation, as the image of $(3, 5)$ under $\div$ is $3 \div 5 = \frac{3}{5} \notin \mathbb{N}$.

Example 31: Show that $* : \mathbb{R} \times \mathbb{R} \to \mathbb{R}$ given by $(a, b) \to a + 4b^2$ is a binary operation.

Solution:
Since $*$ carries each pair $(a, b)$ to a unique element $a + 4b^2$ in $\mathbb{R}$, $*$ is a binary operation on $\mathbb{R}$.
