---
type: concept
title: Key Concepts and Formulas in Determinants
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- cofactors
- determinants
- matrices
- inverse-matrix
- Maths
- linear-algebra
---

### Determinants

*   Area of a triangle with vertices $(x_1, y_1)$, $(x_2, y_2)$ and $(x_3, y_3)$ is given by:
    $\Delta = \frac{1}{2} \begin{vmatrix} x_1 & y_1 & 1 \\ x_2 & y_2 & 1 \\ x_3 & y_3 & 1 \end{vmatrix}$

*   Minor of an element $a_{ij}$ of the determinant of matrix $A$ is the determinant obtained by deleting $i^{th}$ row and $j^{th}$ column and denoted by $M_{ij}$.

*   Cofactor of $a_{ij}$ is given by $A_{ij} = (-1)^{i+j} M_{ij}$.

*   Value of determinant of a matrix $A$ is obtained by the sum of the product of elements of a row (or a column) with corresponding cofactors. For example, $|A| = a_{11} A_{11} + a_{12} A_{12} + a_{13} A_{13}$.

*   If elements of one row (or column) are multiplied with cofactors of elements of any other row (or column), then their sum is zero. For example, $a_{11} A_{21} + a_{12} A_{22} + a_{13} A_{23} = 0$.

*   If $A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$, then $\text{adj } A = \begin{bmatrix} A_{11} & A_{21} & A_{31} \\ A_{12} & A_{22} & A_{32} \\ A_{13} & A_{23} & A_{33} \end{bmatrix}$, where $A_{ij}$ is the cofactor of $a_{ij}$.

*   $A(\text{adj } A) = (\text{adj } A)A = |A|I$, where $A$ is a square matrix of order $n$.

*   A square matrix $A$ is said to be singular or non-singular according as $|A| = 0$ or $|A| \neq 0$.

*   If $AB = BA = I$, where $B$ is a square matrix, then $B$ is called the inverse of $A$. Also $A^{-1} = B$ or $B^{-1} = A$ and hence $(A^{-1})^{-1} = A$.

*   A square matrix $A$ has an inverse if and only if $A$ is non-singular.

*   $A^{-1} = \frac{1}{|A|} \text{adj } A$

*   If $a_1 x + b_1 y + c_1 z = d_1$, $a_2 x + b_2 y + c_2 z = d_2$, $a_3 x + b_3 y + c_3 z = d_3$, then these equations can be written as $AX = B$, where
    $A = \begin{bmatrix} a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \\ a_3 & b_3 & c_3 \end{bmatrix}$, $X = \begin{bmatrix} x \\ y \\ z \end{bmatrix}$ and $B = \begin{bmatrix} d_1 \\ d_2 \\ d_3 \end{bmatrix}$
