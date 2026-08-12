---
type: concept
title: Matrix Multiplication and Non-Commutativity
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: solved-example
tags:
- matrices
- matrix-multiplication
- non-commutative-property
- linear-algebra
- MATRICES
- Maths
- class12
---

### Matrix Multiplication and Non-Commutativity

And is given by 
$CD = \begin{bmatrix} 2 & 1 \\ 3 & 4 \end{bmatrix} \begin{bmatrix} 7 & 1 \\ 5 & 4 \end{bmatrix} = \begin{bmatrix} 19 & 6 \\ 41 & 19 \end{bmatrix}$. This is a 2 × 2 matrix in which each entry is the sum of the products across some row of C with the corresponding entries down some column of D. These four computations are:

Thus $CD = \begin{bmatrix} 19 & 6 \\ 41 & 19 \end{bmatrix}$.

**Example 12:** Find AB, if $A = \begin{bmatrix} 6 & 9 \\ 2 & 3 \end{bmatrix}$ and $B = \begin{bmatrix} 2 & 6 & 0 \\ 7 & 9 & 8 \end{bmatrix}$.

**Solution:** The matrix A has 2 columns which is equal to the number of rows of B. Hence AB is defined. Now

$AB = \begin{bmatrix} 6(2) + 9(7) & 6(6) + 9(9) & 6(0) + 9(8) \\ 2(2) + 3(7) & 2(6) + 3(9) & 2(0) + 3(8) \end{bmatrix}$

$= \begin{bmatrix} 12 + 63 & 36 + 81 & 0 + 72 \\ 4 + 21 & 12 + 27 & 0 + 24 \end{bmatrix}$

$= \begin{bmatrix} 75 & 117 & 72 \\ 25 & 39 & 24 \end{bmatrix}$

**Remark:** If AB is defined, then BA need not be defined. In the above example, AB is defined but BA is not defined because B has 3 columns while A has only 2 (and not 3) rows. If A, B are, respectively $m \times n$, $k \times l$ matrices, then both AB and BA are defined if and only if $n = k$ and $l = m$. In particular, if both A and B are square matrices of the same order, then both AB and BA are defined.

**Non-commutativity of multiplication of matrices:**
Now, we shall see by an example that even if AB and BA are both defined, it is not necessary that $AB = BA$.

**Example 13:** If $A = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix}$ and $B = \begin{bmatrix} 2 & 3 \\ 4 & 2 \\ 5 & 1 \end{bmatrix}$, then find AB, BA. Show that $AB \neq BA$.

**Solution:** Since A is a 2 × 3 matrix and B is 3 × 2 matrix. Hence AB and BA are both defined and are matrices of order 2 × 2 and 3 × 3, respectively. Note that

$AB = \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} \begin{bmatrix} 2 & 3 \\ 4 & 2 \\ 5 & 1 \end{bmatrix} = \begin{bmatrix} 2+8+15 & 3+4+3 \\ 8+20+30 & 12+10+6 \end{bmatrix} = \begin{bmatrix} 25 & 10 \\ 58 & 28 \end{bmatrix}$

and

$BA = \begin{bmatrix} 2 & 3 \\ 4 & 2 \\ 5 & 1 \end{bmatrix} \begin{bmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \end{bmatrix} = \begin{bmatrix} 2+12 & 4+15 & 6+18 \\ 4+8 & 8+10 & 12+12 \\ 5+4 & 10+5 & 15+6 \end{bmatrix} = \begin{bmatrix} 14 & 19 & 24 \\ 12 & 18 & 24 \\ 9 & 15 & 21 \end{bmatrix}$
