---
type: concept
title: Introduction to Matrix Multiplication and Definition
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- matrix-multiplication
- linear-algebra
- MATRICES
- Maths
- class12
- mathematics
---

### MATRICES

Again, the above information can be represented as follows:

| Requirements | Prices per piece (in Rupees) | Money needed (in Rupees) |
| :--- | :--- | :--- |
| 2 | 5 | 4 |
| 8 | 10 | 40 |

$$\begin{bmatrix} 2 \\ 8 \end{bmatrix} \times \begin{bmatrix} 5 \\ 10 \end{bmatrix} = \begin{bmatrix} 2 \times 4 + 5 \times 208 \\ 8 \times 4 + 10 \times 432 \end{bmatrix}$$

Now, the information in both the cases can be combined and expressed in terms of matrices as follows:

| Requirements | Prices per piece (in Rupees) | Money needed (in Rupees) |
| :--- | :--- | :--- |
| 2 | 5 | 5 | 4 |
| 8 | 10 | 50 | 40 |

$$\begin{bmatrix} 2 \times 5 + 5 \times 50 & 4 \times 2 + 40 \times 5 \\ 8 \times 5 + 10 \times 50 & 8 \times 4 + 10 \times 40 \end{bmatrix} = \begin{bmatrix} 260 & 208 \\ 540 & 432 \end{bmatrix}$$

The above is an example of multiplication of matrices. We observe that, for multiplication of two matrices $A$ and $B$, the number of columns in $A$ should be equal to the number of rows in $B$. Furthermore, for getting the elements of the product matrix, we take rows of $A$ and columns of $B$, multiply them element-wise and take the sum.

Formally, we define multiplication of matrices as follows:

The product of two matrices $A$ and $B$ is defined if the number of columns of $A$ is equal to the number of rows of $B$. Let $A = [a_{ij}]$ be an $m \times n$ matrix and $B = [b_{jk}]$ be an $n \times p$ matrix. Then the product of the matrices $A$ and $B$ is the matrix $C$ of order $m \times p$. To get the $(i, k)^{th}$ element $c_{ik}$ of the matrix $C$, we take the $i^{th}$ row of $A$ and $k^{th}$ column of $B$, multiply them element-wise and take the sum of all these products. In other words, if $A = [a_{ij}]_{m \times n}$, $B = [b_{jk}]_{n \times p}$, then the $i^{th}$ row of $A$ is $[a_{i1} \, a_{i2} \, ... \, a_{in}]$ and the $k^{th}$ column of $B$ is $\begin{bmatrix} b_{1k} \\ b_{2k} \\ \vdots \\ b_{nk} \end{bmatrix}$, then $c_{ik} = a_{i1}b_{1k} + a_{i2}b_{2k} + a_{i3}b_{3k} + ... + a_{in}b_{nk} = \sum_{j=1}^{n} a_{ij}b_{jk}$.

The matrix $C = [c_{ik}]_{m \times p}$ is the product of $A$ and $B$.

For example, if $C = \begin{bmatrix} 1 & -1 & 2 \\ 0 & 3 & 4 \end{bmatrix}$ and $D = \begin{bmatrix} 2 & 7 \\ -1 & 1 \\ 5 & -4 \end{bmatrix}$, then the product $CD$ is defined.
