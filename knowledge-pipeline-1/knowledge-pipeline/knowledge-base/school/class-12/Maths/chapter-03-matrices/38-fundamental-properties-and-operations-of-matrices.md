---
type: concept
title: Fundamental Properties and Operations of Matrices
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- matrix-operations
- symmetric-matrix
- linear-algebra
- MATRICES
- inverse-matrix
- Maths
- class12
---

A = $[a_{ij}]_{n \times n}$ is a scalar matrix if $a_{ij} = 0$, when $i \neq j$, $a_{ij} = k$, ($k$ is some constant), when $i = j$.

A = $[a_{ij}]_{n \times n}$ is an identity matrix, if $a_{ij} = 1$, when $i = j$, $a_{ij} = 0$, when $i \neq j$.

A zero matrix has all its elements as zero.

A = $[a_{ij}] = [b_{ij}] = B$ if (i) $A$ and $B$ are of same order, (ii) $a_{ij} = b_{ij}$ for all possible values of $i$ and $j$.

$kA = k[a_{ij}]_{m \times n} = [k(a_{ij})]_{m \times n}$

$-A = (-1)A$

$A - B = A + (-1)B$

$A + B = B + A$

$(A + B) + C = A + (B + C)$, where $A$, $B$ and $C$ are of same order.

$k(A + B) = kA + kB$, where $A$ and $B$ are of same order, $k$ is constant.

$(k + l)A = kA + lA$, where $k$ and $l$ are constant.

If $A = [a_{ij}]_{m \times n}$ and $B = [b_{jk}]_{n \times p}$, then $AB = C = [c_{ik}]_{m \times p}$, where $c_{ik} = \sum_{j=1}^{n} a_{ij}b_{jk}$

(i) $A(BC) = (AB)C$, (ii) $A(B + C) = AB + AC$, (iii) $(A + B)C = AC + BC$

If $A = [a_{ij}]_{m \times n}$, then $A'$ or $A^T = [a_{ji}]_{n \times m}$

(i) $(A')' = A$, (ii) $(kA)' = kA'$, (iii) $(A + B)' = A' + B'$, (iv) $(AB)' = B'A'$

$A$ is a symmetric matrix if $A' = A$.

$A$ is a skew symmetric matrix if $A' = -A$.

Any square matrix can be represented as the sum of a symmetric and a skew symmetric matrix.

Elementary operations of a matrix are as follows:
(i) $R_i \leftrightarrow R_j$ or $C_i \leftrightarrow C_j$
(ii) $R_i \rightarrow kR_i$ or $C_i \rightarrow kC_i$
(iii) $R_i \rightarrow R_i + kR_j$ or $C_i \rightarrow C_i + kC_j$

If $A$ and $B$ are two square matrices such that $AB = BA = I$, then $B$ is the inverse matrix of $A$ and is denoted by $A^{-1}$ and $A$ is the inverse of $B$.

Inverse of a square matrix, if it exists, is unique.
