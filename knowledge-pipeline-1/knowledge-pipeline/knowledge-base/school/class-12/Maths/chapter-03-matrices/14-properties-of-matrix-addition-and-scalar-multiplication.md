---
type: concept
title: Properties of Matrix Addition and Scalar Multiplication
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- matrix-addition
- scalar-multiplication
- MATRICES
- Maths
- additive-inverse
- class12
- additive-identity
---

### MATRICES

(iii) Existence of additive identity: Let $A = [a_{ij}]$ be an $m \times n$ matrix and $O$ be an $m \times n$ zero matrix, then $A + O = O + A = A$. In other words, $O$ is the additive identity for matrix addition.

(iv) The existence of additive inverse: Let $A = [a_{ij}]_{m \times n}$ be any matrix, then we have another matrix as $-A = [-a_{ij}]_{m \times n}$ such that $A + (-A) = (-A) + A = O$. So $-A$ is the additive inverse of $A$ or negative of $A$.

### 3.4.4 Properties of scalar multiplication of a matrix
If $A = [a_{ij}]$ and $B = [b_{ij}]$ be two matrices of the same order, say $m \times n$, and $k$ and $l$ are scalars, then:
(i) $k(A + B) = kA + kB$
(ii) $(k + l)A = kA + lA$

(ii) $k(A + B) = k([a_{ij}] + [b_{ij}]) = k[a_{ij} + b_{ij}] = [k(a_{ij} + b_{ij})] = [(ka_{ij}) + (kb_{ij})] = [ka_{ij}] + [kb_{ij}] = kA + kB$

(iii) $(k + l)A = (k + l)[a_{ij}] = [(k + l)a_{ij}] = [ka_{ij} + la_{ij}] = [ka_{ij}] + [la_{ij}] = kA + lA$

**Example 8:** If 
$A = \begin{bmatrix} 8 & 0 \\ 4 & -2 \\ 3 & 6 \end{bmatrix}$ and $B = \begin{bmatrix} 2 & -2 \\ 4 & 2 \\ -5 & 1 \end{bmatrix}$, then find the matrix $X$, such that $2A + 3X = 5B$.

**Solution:** 
We have $2A + 3X = 5B$
or $2A + 3X - 2A = 5B - 2A$
or $2A - 2A + 3X = 5B - 2A$ (Matrix addition is commutative)
or $O + 3X = 5B - 2A$ ($-2A$ is the additive inverse of $2A$)
or $3X = 5B - 2A$ ($O$ is the additive identity)
or $X = \frac{1}{3}(5B - 2A)$
or $X = \frac{1}{3} \left( 5 \begin{bmatrix} 2 & -2 \\ 4 & 2 \\ -5 & 1 \end{bmatrix} - 2 \begin{bmatrix} 8 & 0 \\ 4 & -2 \\ 3 & 6 \end{bmatrix} \right)$
$= \frac{1}{3} \left( \begin{bmatrix} 10 & -10 \\ 20 & 10 \\ -25 & 5 \end{bmatrix} - \begin{bmatrix} 16 & 0 \\ 8 & -4 \\ 6 & 12 \end{bmatrix} \right)$
