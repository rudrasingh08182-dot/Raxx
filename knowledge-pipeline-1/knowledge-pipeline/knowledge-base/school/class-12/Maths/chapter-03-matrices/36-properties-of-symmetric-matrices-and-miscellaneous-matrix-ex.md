---
type: concept
title: Properties of Symmetric Matrices and Miscellaneous Matrix Exercises
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: solved-example
tags:
- matrices
- MATRICES
- symmetric-matrices
- miscellaneous-exercises
- matrix-algebra
- Maths
- class12
- mathematics
---

But $(AB)' = B'A' = BA$ (Why?)
Therefore $BA = AB$
Conversely, if $AB = BA$, then we shall show that $AB$ is symmetric.
Now $(AB)' = B'A'$
$= BA$ (as $A$ and $B$ are symmetric)
$= AB$
Hence $AB$ is symmetric.

**Example 28** Let $A = \begin{bmatrix} 2 & 1 \\ 3 & 4 \end{bmatrix}$, $B = \begin{bmatrix} 5 & 2 \\ 7 & 4 \end{bmatrix}$, $C = \begin{bmatrix} 2 & 5 \\ 3 & 8 \end{bmatrix}$. Find a matrix $D$ such that $CD - AB = O$.

**Solution** Since $A, B, C$ are all square matrices of order 2, and $CD - AB$ is well defined, $D$ must be a square matrix of order 2.
Let $D = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$. Then $CD - AB = 0$ gives:
$\begin{bmatrix} 2 & 5 \\ 3 & 8 \end{bmatrix} \begin{bmatrix} a & b \\ c & d \end{bmatrix} - \begin{bmatrix} 2 & 1 \\ 3 & 4 \end{bmatrix} \begin{bmatrix} 5 & 2 \\ 7 & 4 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$

or $\begin{bmatrix} 2a+5c & 2b+5d \\ 3a+8c & 3b+8d \end{bmatrix} - \begin{bmatrix} 17 & 8 \\ 43 & 22 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$

or $\begin{bmatrix} 2a+5c-17 & 2b+5d-8 \\ 3a+8c-43 & 3b+8d-22 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$

By equality of matrices, we get:
$2a + 5c - 17 = 0$ ... (1)
$3a + 8c - 43 = 0$ ... (2)
$2b + 5d - 8 = 0$ ... (3)
$3b + 8d - 22 = 0$ ... (4)

Solving (1) and (2), we get $a = -69, c = 31$. Solving (3) and (4), we get $b = -46, d = 20$.
Therefore $D = \begin{bmatrix} -69 & -46 \\ 31 & 20 \end{bmatrix}$.

**Miscellaneous Exercise on Chapter 3**

1. Let $A = \begin{bmatrix} 0 & 1 \\ 0 & 0 \end{bmatrix}$, show that $(aI + bA)^n = a^n I + na^{n-1} bA$, where $I$ is the identity matrix of order 2 and $n \in N$.

2. If $A = \begin{bmatrix} 1 & 1 & 1 \\ 1 & 1 & 1 \\ 1 & 1 & 1 \end{bmatrix}$, prove that $A^n = \begin{bmatrix} 3^{n-1} & 3^{n-1} & 3^{n-1} \\ 3^{n-1} & 3^{n-1} & 3^{n-1} \\ 3^{n-1} & 3^{n-1} & 3^{n-1} \end{bmatrix}$ for all $n \in N$.

3. If $A = \begin{bmatrix} 3 & 1 \\ -1 & 2 \end{bmatrix}$, then prove that $A^2 - 5A + 7I = 0$, where $n$ is any positive integer.

4. If $A$ and $B$ are symmetric matrices, prove that $AB - BA$ is a skew symmetric matrix.

5. Show that the matrix $B'AB$ is symmetric or skew symmetric according as $A$ is symmetric or skew symmetric.

6. Find the values of $x, y, z$ if the matrix $A = \begin{bmatrix} 0 & 2y & z \\ x & y & -z \\ x & -y & z \end{bmatrix}$ satisfy the equation $A'A = I$.

7. For what values of $x$: $\begin{bmatrix} 1 & 2 & 1 \end{bmatrix} \begin{bmatrix} 1 & 2 & 0 \\ 2 & 0 & 1 \\ 1 & 0 & 2 \end{bmatrix} \begin{bmatrix} 0 \\ 2 \\ x \end{bmatrix} = O$?

8. If $A = \begin{bmatrix} 3 & 1 \\ -1 & 2 \end{bmatrix}$, show that $A^2 - 5A + 7I = 0$.

9. Find $x$, if $\begin{bmatrix} x & -5 & -1 \end{bmatrix} \begin{bmatrix} 1 & 0 & 2 \\ 0 & 2 & 1 \\ 2 & 0 & 3 \end{bmatrix} \begin{bmatrix} x \\ 4 \\ 1 \end{bmatrix} = O$.
