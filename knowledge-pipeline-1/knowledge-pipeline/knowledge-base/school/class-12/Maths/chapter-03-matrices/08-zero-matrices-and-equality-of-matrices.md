---
type: concept
title: Zero Matrices and Equality of Matrices
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- zero-matrix
- matrix-equality
- linear-algebra
- MATRICES
- Maths
- class12
---

### Zero matrix
A matrix is said to be a zero matrix or null matrix if all its elements are zero. For example, $[0]$, $\begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$, $\begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix}$, $[0, 0]$ are all zero matrices. We denote a zero matrix by $O$. Its order will be clear from the context.

### 3.3.1 Equality of matrices
**Definition 2:** Two matrices $A = [a_{ij}]$ and $B = [b_{ij}]$ are said to be equal if:
(i) they are of the same order
(ii) each element of $A$ is equal to the corresponding element of $B$, that is $a_{ij} = b_{ij}$ for all $i$ and $j$.

For example, $\begin{bmatrix} 2 & 3 \\ 0 & 1 \end{bmatrix}$ and $\begin{bmatrix} 2 & 3 \\ 0 & 1 \end{bmatrix}$ are equal matrices, but $\begin{bmatrix} 3 & 2 \\ 0 & 1 \end{bmatrix}$ and $\begin{bmatrix} 2 & 3 \\ 0 & 1 \end{bmatrix}$ are not equal matrices. Symbolically, if two matrices $A$ and $B$ are equal, we write $A = B$.

If $\begin{bmatrix} x & y \\ z & a \\ b & c \end{bmatrix} = \begin{bmatrix} -1.5 & 0 \\ 2 & 6 \\ 3 & 2 \end{bmatrix}$, then $x = -1.5$, $y = 0$, $z = 2$, $a = 6$, $b = 3$, $c = 2$.

**Example 4:** If $\begin{bmatrix} x+3 & z+4 & 2y-7 \\ -6 & a-1 & 0 \\ b-3 & -21 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 6 & 3y-2 \\ -6 & -3 & 2c+2 \\ 2b+4 & -21 & 0 \end{bmatrix}$, find the values of $a, b, c, x, y$ and $z$.

**Solution:** As the given matrices are equal, therefore, their corresponding elements must be equal. Comparing the corresponding elements, we get:
$x + 3 = 0, z + 4 = 6, 2y - 7 = 3y - 2$
$a - 1 = -3, 0 = 2c + 2, b - 3 = 2b + 4$
Simplifying, we get:
$a = -2, b = -7, c = -1, x = -3, y = -5, z = 2$

**Example 5:** Find the values of $a, b, c,$ and $d$ from the following equation:
$\begin{bmatrix} a-b & 2a+c \\ 2a-b & 3c+d \end{bmatrix} = \begin{bmatrix} -1 & 5 \\ 0 & 13 \end{bmatrix}$
