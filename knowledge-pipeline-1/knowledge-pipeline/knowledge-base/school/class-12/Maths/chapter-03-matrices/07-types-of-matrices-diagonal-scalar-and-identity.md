---
type: concept
title: 'Types of Matrices: Diagonal, Scalar, and Identity'
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- diagonal-matrix
- linear-algebra
- MATRICES
- scalar-matrix
- Maths
- identity-matrix
- class12
---

(iv) Diagonal matrix
A square matrix $B = [b_{ij}]_{m \times m}$ is said to be a diagonal matrix if all its non-diagonal elements are zero, that is a matrix $B = [b_{ij}]_{m \times m}$ is said to be a diagonal matrix if $b_{ij} = 0$, when $i \neq j$.

For example,
$A = [4]$, 
$B = \begin{bmatrix} 1 & 0 \\ 0 & 2 \end{bmatrix}$, 
$C = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 2 & 0 \\ 0 & 0 & 3 \end{bmatrix}$, are diagonal matrices of order 1, 2, 3, respectively.

(v) Scalar matrix
A diagonal matrix is said to be a scalar matrix if its diagonal elements are equal, that is, a square matrix $B = [b_{ij}]_{n \times n}$ is said to be a scalar matrix if
$b_{ij} = 0$, when $i \neq j$
$b_{ij} = k$, when $i = j$, for some constant $k$.

For example
$A = [3]$, 
$B = \begin{bmatrix} -1 & 0 \\ 0 & -1 \end{bmatrix}$, 
$C = \begin{bmatrix} 3 & 0 & 0 \\ 0 & 3 & 0 \\ 0 & 0 & 3 \end{bmatrix}$ are scalar matrices of order 1, 2 and 3, respectively.

(vi) Identity matrix
A square matrix in which elements in the diagonal are all 1 and rest are all zero is called an identity matrix. In other words, the square matrix $A = [a_{ij}]_{n \times n}$ is an identity matrix, if 
$a_{ij} = \begin{cases} 1 & \text{if } i = j \\ 0 & \text{if } i \neq j \end{cases}$.

We denote the identity matrix of order $n$ by $I_n$. When order is clear from the context, we simply write it as $I$.

For example $[1]$, 
$\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$, 
$\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$ are identity matrices of order 1, 2 and 3, respectively.

Observe that a scalar matrix is an identity matrix when $k = 1$. But every identity matrix is clearly a scalar matrix.
