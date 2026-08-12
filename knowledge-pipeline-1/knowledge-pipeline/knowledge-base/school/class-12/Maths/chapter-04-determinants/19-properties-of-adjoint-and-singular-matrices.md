---
type: concept
title: Properties of Adjoint and Singular Matrices
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- singular-matrix
- determinants
- adjoint-matrix
- matrices
- Maths
- linear-algebra
---

### Verification
Let $A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$, then $\text{adj } A = \begin{bmatrix} A_{11} & A_{21} & A_{31} \\ A_{12} & A_{22} & A_{32} \\ A_{13} & A_{23} & A_{33} \end{bmatrix}$.

Since the sum of the product of elements of a row (or a column) with corresponding cofactors is equal to $|A|$ and otherwise zero, we have:
$A (\text{adj } A) = \begin{bmatrix} |A| & 0 & 0 \\ 0 & |A| & 0 \\ 0 & 0 & |A| \end{bmatrix} = |A| \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} = |A| I$

Similarly, we can show $(\text{adj } A) A = |A| I$.
Hence $A (\text{adj } A) = (\text{adj } A) A = |A| I$.

**Definition 4:** A square matrix $A$ is said to be singular if $|A| = 0$.
For example, the determinant of matrix $A = \begin{bmatrix} 1 & 2 \\ 4 & 8 \end{bmatrix}$ is zero. Hence $A$ is a singular matrix.

**Definition 5:** A square matrix $A$ is said to be non-singular if $|A| \neq 0$.
Let $A = \begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$. Then $|A| = \begin{vmatrix} 1 & 2 \\ 3 & 4 \end{vmatrix} = 4 - 6 = -2 \neq 0$. Hence $A$ is a non-singular matrix.

We state the following theorems without proof.

**Theorem 2:** If $A$ and $B$ are nonsingular matrices of the same order, then $AB$ and $BA$ are also nonsingular matrices of the same order.

**Theorem 3:** The determinant of the product of matrices is equal to the product of their respective determinants, that is, $|AB| = |A| |B|$, where $A$ and $B$ are square matrices of the same order.

**Remark:** We know that $(\text{adj } A) A = |A| I = \begin{bmatrix} |A| & 0 & 0 \\ 0 & |A| & 0 \\ 0 & 0 & |A| \end{bmatrix}$.
