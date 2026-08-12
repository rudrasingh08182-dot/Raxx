---
type: concept
title: Solving Systems of Linear Equations Using Matrix Method
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: solved-example
tags:
- DETERMINANTS
- class12
- algebraic-representation
- determinants
- matrix-method
- linear-equations
- inverse-matrix
- Maths
---

DETERMINANTS 135

Hence, $A$ is nonsingular and so its inverse exists. Now
$A_{11} = -1, A_{12} = -8, A_{13} = -10$
$A_{21} = -5, A_{22} = -6, A_{23} = 1$
$A_{31} = -1, A_{32} = 9, A_{33} = 7$

Therefore $A^{-1} = \begin{bmatrix} -1 & -5 & -1 \\ -8 & -6 & 9 \\ -10 & 1 & 7 \end{bmatrix}$

So $X = A^{-1}B = \begin{bmatrix} -1 & -5 & -1 \\ -8 & -6 & 9 \\ -10 & 1 & 7 \end{bmatrix} \begin{bmatrix} 8 \\ 1 \\ 4 \end{bmatrix}$

i.e., $\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} -17 \\ -34 \\ -51 \end{bmatrix} = \begin{bmatrix} 1 \\ 2 \\ 3 \end{bmatrix}$

Hence $x = 1, y = 2$ and $z = 3$.

**Example 29** The sum of three numbers is 6. If we multiply third number by 3 and add second number to it, we get 11. By adding first and third numbers, we get double of the second number. Represent it algebraically and find the numbers using matrix method.

**Solution** Let first, second and third numbers be denoted by $x, y$ and $z$, respectively. Then, according to given conditions, we have:
$x + y + z = 6$
$y + 3z = 11$
$x + z = 2y$ or $x - 2y + z = 0$

This system can be written as $AX = B$, where
$A = \begin{bmatrix} 1 & 1 & 1 \\ 0 & 1 & 3 \\ 1 & -2 & 1 \end{bmatrix}, X = \begin{bmatrix} x \\ y \\ z \end{bmatrix}$ and $B = \begin{bmatrix} 6 \\ 11 \\ 0 \end{bmatrix}$

Here $|A| = 1(1 + 6) - 1(0 - 3) + 1(0 - 1) = 7 + 3 - 1 = 9 \neq 0$. Now we find $adj A$:
$A_{11} = 1(1 + 6) = 7, A_{12} = -(0 - 3) = 3, A_{13} = -1$
$A_{21} = -(1 + 2) = -3, A_{22} = 0, A_{23} = -(-2 - 1) = 3$
$A_{31} = (3 - 1) = 2, A_{32} = -(3 - 0) = -3, A_{33} = (1 - 0) = 1$
