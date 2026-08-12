---
type: concept
title: 'Matrices: Operations, Transpose Properties, and Practice Problems'
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- linear-algebra
- matrix-transpose
- MATRICES
- matrix-algebra
- Maths
- class12
---

### MATRICES 83

20. The bookshop of a particular school has 10 dozen chemistry books, 8 dozen physics books, 10 dozen economics books. Their selling prices are ₹ 80, ₹ 60 and ₹ 40 each respectively. Find the total amount the bookshop will receive from selling all the books using matrix algebra.

Assume $X, Y, Z, W$ and $P$ are matrices of order $2 \times n, 3 \times k, 2 \times p, n \times 3$ and $p \times k$, respectively. Choose the correct answer in Exercises 21 and 22.

21. The restriction on $n, k$ and $p$ so that $PY + WY$ will be defined are:
(A) $k = 3, p = n$
(B) $k$ is arbitrary, $p = 2$
(C) $p$ is arbitrary, $k = 3$
(D) $k = 2, p = 3$

22. If $n = p$, then the order of the matrix $7X – 5Z$ is:
(A) $p \times 2$
(B) $2 \times n$
(C) $n \times 3$
(D) $p \times n$

### 3.5. Transpose of a Matrix
In this section, we shall learn about transpose of a matrix and special types of matrices such as symmetric and skew symmetric matrices.

**Definition 3** If $A = [a_{ij}]$ be an $m \times n$ matrix, then the matrix obtained by interchanging the rows and columns of $A$ is called the transpose of $A$. Transpose of the matrix $A$ is denoted by $A'$ or $(A^T)$. In other words, if $A = [a_{ij}]_{m \times n}$, then $A' = [a_{ji}]_{n \times m}$. 

For example, if 
$A = \begin{bmatrix} 3 & 5 \\ 2 & 3 \\ 3 & 1 \end{bmatrix}$, then $A' = \begin{bmatrix} 3 & 2 & 3 \\ 5 & 3 & 1 \end{bmatrix}$

### 3.5.1 Properties of transpose of the matrices
We now state the following properties of transpose of matrices without proof. These may be verified by taking suitable examples.
For any matrices $A$ and $B$ of suitable orders, we have:
(i) $(A')' = A$
(ii) $(kA)' = kA'$ (where $k$ is any constant)
(iii) $(A + B)' = A' + B'$
(iv) $(AB)' = B'A'$

**Example 20** If $A = \begin{bmatrix} 3 & 4 \\ 2 & 2 \\ 1 & 0 \end{bmatrix}$ and $B = \begin{bmatrix} -1 & 2 & 1 \\ 1 & 2 & 3 \end{bmatrix}$, verify that:
(i) $(A')' = A$
(ii) $(A + B)' = A' + B'$
(iii) $(kB)' = kB'$, where $k$ is any constant.
