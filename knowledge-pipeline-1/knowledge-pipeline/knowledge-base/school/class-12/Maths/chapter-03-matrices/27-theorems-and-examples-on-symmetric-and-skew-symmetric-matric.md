---
type: concept
title: Theorems and Examples on Symmetric and Skew-Symmetric Matrices
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- skew-symmetric-matrix
- symmetric-matrix
- linear-algebra
- MATRICES
- Maths
- matrix-theorems
- class12
---

### Symmetric and Skew-Symmetric Matrices

For example, the matrix 

$$B = \begin{bmatrix} 0 & e & f \\ -e & 0 & g \\ -f & -g & 0 \end{bmatrix}$$

is a skew symmetric matrix as $B' = -B$.

Now, we are going to prove some results of symmetric and skew-symmetric matrices.

**Theorem 1:** For any square matrix $A$ with real number entries, $A + A'$ is a symmetric matrix and $A - A'$ is a skew symmetric matrix.

**Proof:** Let $B = A + A'$, then
$B' = (A + A')'$
$= A' + (A')'$ (as $(A + B)' = A' + B'$)
$= A' + A$ (as $(A')' = A$)
$= A + A'$ (as $A + B = B + A$)
$= B$
Therefore $B = A + A'$ is a symmetric matrix.

Now let $C = A - A'$.
$C' = (A - A')' = A' - (A')' = A' - A = -(A - A') = -C$
Therefore $C = A - A'$ is a skew symmetric matrix.

**Theorem 2:** Any square matrix can be expressed as the sum of a symmetric and a skew symmetric matrix.

**Proof:** Let $A$ be a square matrix, then we can write:
$A = \frac{1}{2}(A + A') + \frac{1}{2}(A - A')$

From the Theorem 1, we know that $(A + A')$ is a symmetric matrix and $(A - A')$ is a skew symmetric matrix. Since for any matrix $A$, $(kA)' = kA'$, it follows that $\frac{1}{2}(A + A')$ is a symmetric matrix and $\frac{1}{2}(A - A')$ is a skew symmetric matrix. Thus, any square matrix can be expressed as the sum of a symmetric and a skew symmetric matrix.

**Example 22:** Express the matrix 

$$B = \begin{bmatrix} 2 & -2 & -4 \\ -1 & 3 & 4 \\ 1 & -2 & -3 \end{bmatrix}$$

as the sum of a symmetric and a skew symmetric matrix.

**Solution:** Here

$$B' = \begin{bmatrix} 2 & -1 & 1 \\ -2 & 3 & -2 \\ -4 & 4 & -3 \end{bmatrix}$$

Let $P = \frac{1}{2}(B + B') = \frac{1}{2} \begin{bmatrix} 4 & -3 & -3 \\ -3 & 6 & 2 \\ -3 & 2 & -6 \end{bmatrix} = \begin{bmatrix} 2 & -3/2 & -3/2 \\ -3/2 & 3 & 1 \\ -3/2 & 1 & -3 \end{bmatrix}$

Now $P' = \begin{bmatrix} 2 & -3/2 & -3/2 \\ -3/2 & 3 & 1 \\ -3/2 & 1 & -3 \end{bmatrix} = P$

Thus $P = \frac{1}{2}(B + B')$ is a symmetric matrix.

Also, let $Q = \frac{1}{2}(B - B') = \frac{1}{2} \begin{bmatrix} 0 & -1 & -5 \\ 1 & 0 & 6 \\ 5 & -6 & 0 \end{bmatrix} = \begin{bmatrix} 0 & -1/2 & -5/2 \\ 1/2 & 0 & 3 \\ 5/2 & -3 & 0 \end{bmatrix}$

Then $Q' = \begin{bmatrix} 0 & 1/2 & 5/2 \\ -1/2 & 0 & -3 \\ -5/2 & 3 & 0 \end{bmatrix} = -Q$
