---
type: concept
title: Addition of Matrices and Scalar Multiplication Concepts
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrix-addition
- matrix-operations
- scalar-multiplication
- linear-algebra
- MATRICES
- Maths
- class12
---

### 66 MATHEMATICS

This new matrix is the sum of the above two matrices. We observe that the sum of two matrices is a matrix obtained by adding the corresponding elements of the given matrices. Furthermore, the two matrices have to be of the same order.

Thus, if 

$A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \end{bmatrix}$

is a $2 \times 3$ matrix and 

$B = \begin{bmatrix} b_{11} & b_{12} & b_{13} \\ b_{21} & b_{22} & b_{23} \end{bmatrix}$

is another $2 \times 3$ matrix. Then, we define 

$A + B = \begin{bmatrix} a_{11} + b_{11} & a_{12} + b_{12} & a_{13} + b_{13} \\ a_{21} + b_{21} & a_{22} + b_{22} & a_{23} + b_{23} \end{bmatrix}$.

In general, if $A = [a_{ij}]$ and $B = [b_{ij}]$ are two matrices of the same order, say $m \times n$. Then, the sum of the two matrices $A$ and $B$ is defined as a matrix $C = [c_{ij}]_{m \times n}$, where $c_{ij} = a_{ij} + b_{ij}$, for all possible values of $i$ and $j$.

**Example 6** Given $A = \begin{bmatrix} 3 & 1 & 1 \\ 2 & 3 & 0 \end{bmatrix}$ and $B = \begin{bmatrix} 2 & 5 & 1 \\ 1 & 2 & 3 \end{bmatrix}$, find $A + B$.

Since $A, B$ are of the same order $2 \times 3$. Therefore, addition of $A$ and $B$ is defined and is given by

$A + B = \begin{bmatrix} 3+2 & 1+5 & 1+1 \\ 2+1 & 3+2 & 0+3 \end{bmatrix} = \begin{bmatrix} 5 & 6 & 2 \\ 3 & 5 & 3 \end{bmatrix}$

**Note**
1. We emphasise that if $A$ and $B$ are not of the same order, then $A + B$ is not defined. For example if $A = \begin{bmatrix} 2 & 3 \\ 1 & 0 \end{bmatrix}$, $B = \begin{bmatrix} 1 & 2 & 3 \\ 1 & 0 & 1 \end{bmatrix}$ then $A + B$ is not defined.
2. We may observe that addition of matrices is an example of binary operation on the set of matrices of the same order.

**3.4.2 Multiplication of a matrix by a scalar**
Now suppose that Fatima has doubled the production at a factory $A$ in all categories (refer to 3.4.1).
