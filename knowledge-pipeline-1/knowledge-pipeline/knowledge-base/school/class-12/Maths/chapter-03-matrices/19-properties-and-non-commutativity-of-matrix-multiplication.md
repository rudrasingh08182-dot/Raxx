---
type: concept
title: Properties and Non-Commutativity of Matrix Multiplication
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- distributive-law
- matrix-multiplication
- non-commutative
- multiplicative-identity
- MATRICES
- associative-law
- Maths
- class12
---

### Non-Commutativity of Matrix Multiplication

Consider the following matrices:
$A = \begin{bmatrix} 10 & 2 & 2 \\ 1 & 6 & 2 \\ 3 & 7 & 2 \end{bmatrix}$, $B = \begin{bmatrix} 2 & 1 \\ 1 & -1 \\ -1 & -2 \end{bmatrix}$

Clearly $AB \neq BA$.

In the above example, both $AB$ and $BA$ are of different order and so $AB \neq BA$. But one may think that perhaps $AB$ and $BA$ could be the same if they were of the same order. But it is not so; here we give an example to show that even if $AB$ and $BA$ are of the same order, they may not be the same.

**Example 14:** If $A = \begin{bmatrix} 1 & 0 \\ 0 & -1 \end{bmatrix}$ and $B = \begin{bmatrix} 0 & 1 \\ 1 & 0 \end{bmatrix}$, then $AB = \begin{bmatrix} 0 & 1 \\ -1 & 0 \end{bmatrix}$ and $BA = \begin{bmatrix} 0 & -1 \\ 1 & 0 \end{bmatrix}$. Clearly $AB \neq BA$.

Thus, matrix multiplication is not commutative.

**Note:** This does not mean that $AB \neq BA$ for every pair of matrices $A, B$ for which $AB$ and $BA$ are defined. For instance, if $A = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix}, B = \begin{bmatrix} 3 & 0 \\ 0 & 4 \end{bmatrix}$, then $AB = BA = \begin{bmatrix} 3 & 0 \\ 0 & 8 \end{bmatrix}$. Observe that multiplication of diagonal matrices of the same order will be commutative.

### Zero matrix as the product of two non-zero matrices
We know that, for real numbers $a, b$ if $ab = 0$, then either $a = 0$ or $b = 0$. This need not be true for matrices; we will observe this through an example.

**Example 15:** Find $AB$, if $A = \begin{bmatrix} 0 & -1 \\ 0 & 2 \end{bmatrix}$ and $B = \begin{bmatrix} 3 & 5 \\ 0 & 0 \end{bmatrix}$.

**Solution:** We have $AB = \begin{bmatrix} 0 & -1 \\ 0 & 2 \end{bmatrix} \begin{bmatrix} 3 & 5 \\ 0 & 0 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}$.

Thus, if the product of two matrices is a zero matrix, it is not necessary that one of the matrices is a zero matrix.

### 3.4.6 Properties of multiplication of matrices
The multiplication of matrices possesses the following properties, which we state without proof:

1. **The associative law:** For any three matrices $A, B$ and $C$, we have $(AB)C = A(BC)$, whenever both sides of the equality are defined.
2. **The distributive law:** For three matrices $A, B$ and $C$:
   (i) $A(B+C) = AB + AC$
   (ii) $(A+B)C = AC + BC$, whenever both sides of equality are defined.
3. **The existence of multiplicative identity:** For every square matrix $A$, there exists an identity matrix of the same order such that $IA = AI = A$.

Now, we shall verify these properties by examples.

**Example 16:** If $A = \begin{bmatrix} 1 & 1 & -1 \\ 2 & 0 & 3 \\ 3 & -1 & 2 \end{bmatrix}$, $B = \begin{bmatrix} 1 & 3 \\ 0 & 2 \\ 1 & 4 \end{bmatrix}$ and $C = \begin{bmatrix} 1 & 2 & 3 \\ -4 & 2 & 0 \end{bmatrix}$, find $A(BC)$, $(AB)C$ and show that $(AB)C = A(BC)$.
