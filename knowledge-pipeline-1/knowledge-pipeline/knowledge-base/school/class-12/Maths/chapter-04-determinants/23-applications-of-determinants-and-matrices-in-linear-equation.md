---
type: concept
title: Applications of Determinants and Matrices in Linear Equations
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- determinants
- linear-equations
- matrix-method
- matrices
- inverse-matrix
- Maths
---

### 4.7 Applications of Determinants and Matrices

In this section, we shall discuss the application of determinants and matrices for solving the system of linear equations in two or three variables and for checking the consistency of the system of linear equations.

**Consistent system:** A system of equations is said to be consistent if its solution (one or more) exists.

**Inconsistent system:** A system of equations is said to be inconsistent if its solution does not exist.

**Note:** In this chapter, we restrict ourselves to the system of linear equations having unique solutions only.

### 4.7.1 Solution of system of linear equations using inverse of a matrix

Let us express the system of linear equations as matrix equations and solve them using the inverse of the coefficient matrix.

Consider the system of equations:
$a_1 x + b_1 y + c_1 z = d_1$
$a_2 x + b_2 y + c_2 z = d_2$
$a_3 x + b_3 y + c_3 z = d_3$

Let 
$A = \begin{bmatrix} a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \\ a_3 & b_3 & c_3 \end{bmatrix}$, $X = \begin{bmatrix} x \\ y \\ z \end{bmatrix}$ and $B = \begin{bmatrix} d_1 \\ d_2 \\ d_3 \end{bmatrix}$

Then, the system of equations can be written as $AX = B$, i.e.,

$\begin{bmatrix} a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \\ a_3 & b_3 & c_3 \end{bmatrix} \begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} d_1 \\ d_2 \\ d_3 \end{bmatrix}$

**Case I:** If $A$ is a nonsingular matrix, then its inverse exists. Now
$AX = B$
$A^{-1}(AX) = A^{-1}B$ (premultiplying by $A^{-1}$)
$(A^{-1}A)X = A^{-1}B$ (by associative property)
$IX = A^{-1}B$
$X = A^{-1}B$

This matrix equation provides a unique solution for the given system of equations as the inverse of a matrix is unique. This method of solving a system of equations is known as the Matrix Method.
