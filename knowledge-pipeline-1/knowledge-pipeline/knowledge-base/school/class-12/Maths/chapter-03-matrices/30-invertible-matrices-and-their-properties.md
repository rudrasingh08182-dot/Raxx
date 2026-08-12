---
type: concept
title: Invertible Matrices and Their Properties
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- invertible-matrices
- linear-algebra
- MATRICES
- inverse-matrix
- Maths
- class12
- mathematics
---

MATRICES 91

The corresponding column operation is denoted by $C_i \to C_i + kC_j$.

For example, applying $R_2 \to R_2 - 2R_1$, to $\begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix}$, we get $\begin{bmatrix} 1 & 2 \\ 0 & -3 \end{bmatrix}$.

### 3.8 Invertible Matrices

**Definition 6** If $A$ is a square matrix of order $m$, and if there exists another square matrix $B$ of the same order $m$, such that $AB = BA = I$, then $B$ is called the inverse matrix of $A$ and it is denoted by $A^{-1}$. In that case $A$ is said to be invertible.

For example, let $A = \begin{bmatrix} 2 & 3 \\ 1 & 2 \end{bmatrix}$ and $B = \begin{bmatrix} 2 & -3 \\ -1 & 2 \end{bmatrix}$ be two matrices.

Now $AB = \begin{bmatrix} 2 & 3 \\ 1 & 2 \end{bmatrix} \begin{bmatrix} 2 & -3 \\ -1 & 2 \end{bmatrix} = \begin{bmatrix} 4-3 & -6+6 \\ 2-2 & -3+4 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I_2$.

Also $BA = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = I$. Thus $B$ is the inverse of $A$, in other words $B = A^{-1}$ and $A$ is inverse of $B$, i.e., $A = B^{-1}$.

**Note**
1. A rectangular matrix does not possess an inverse matrix, since for products $BA$ and $AB$ to be defined and to be equal, it is necessary that matrices $A$ and $B$ should be square matrices of the same order.
2. If $B$ is the inverse of $A$, then $A$ is also the inverse of $B$.

**Theorem 3 (Uniqueness of inverse)** Inverse of a square matrix, if it exists, is unique.

**Proof** Let $A = [a_{ij}]$ be a square matrix of order $m$. If possible, let $B$ and $C$ be two inverses of $A$. We shall show that $B = C$.
Since $B$ is the inverse of $A$, $AB = BA = I$ ... (1)
Since $C$ is also the inverse of $A$, $AC = CA = I$ ... (2)
Thus $B = BI = B(AC) = (BA)C = IC = C$.

**Theorem 4** If $A$ and $B$ are invertible matrices of the same order, then $(AB)^{-1} = B^{-1}A^{-1}$.
