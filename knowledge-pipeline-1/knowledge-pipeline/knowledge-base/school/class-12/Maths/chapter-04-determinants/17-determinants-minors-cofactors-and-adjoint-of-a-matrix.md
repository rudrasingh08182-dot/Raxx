---
type: concept
title: 'Determinants: Minors, Cofactors, and Adjoint of a Matrix'
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: solved-example
tags:
- DETERMINANTS
- class12
- cofactors
- determinants
- minors
- adjoint-matrix
- Maths
- linear-algebra
---

DETERMINANTS 125

$\Delta = a_{11} A_{21} + a_{12} A_{22} + a_{13} A_{23}$
$= a_{11} (-1)^{1+1} \begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix} + a_{12} (-1)^{1+2} \begin{vmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{vmatrix} + a_{13} (-1)^{1+3} \begin{vmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{vmatrix}$
$= \begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{11} & a_{12} & a_{13} \\ a_{31} & a_{32} & a_{33} \end{vmatrix} = 0$ (since $R_1$ and $R_2$ are identical)

Similarly, we can try for other rows and columns.

**Example 22:** Find minors and cofactors of the elements of the determinant $\begin{vmatrix} 2 & -3 & 5 \\ 6 & 0 & 4 \\ 1 & 5 & -7 \end{vmatrix}$ and verify that $a_{11} A_{31} + a_{12} A_{32} + a_{13} A_{33} = 0$

**Solution:** We have 
$M_{11} = \begin{vmatrix} 0 & 4 \\ 5 & -7 \end{vmatrix} = 0 - 20 = -20; A_{11} = (-1)^{1+1} (-20) = -20$
$M_{12} = \begin{vmatrix} 6 & 4 \\ 1 & -7 \end{vmatrix} = -42 - 4 = -46; A_{12} = (-1)^{1+2} (-46) = 46$
$M_{13} = \begin{vmatrix} 6 & 0 \\ 1 & 5 \end{vmatrix} = 30 - 0 = 30; A_{13} = (-1)^{1+3} (30) = 30$
$M_{21} = \begin{vmatrix} -3 & 5 \\ 5 & -7 \end{vmatrix} = 21 - 25 = -4; A_{21} = (-1)^{2+1} (-4) = 4$
$M_{22} = \begin{vmatrix} 2 & 5 \\ 1 & -7 \end{vmatrix} = -14 - 5 = -19; A_{22} = (-1)^{2+2} (-19) = -19$
$M_{23} = \begin{vmatrix} 2 & -3 \\ 1 & 5 \end{vmatrix} = 10 + 3 = 13; A_{23} = (-1)^{2+3} (13) = -13$
$M_{31} = \begin{vmatrix} -3 & 5 \\ 0 & 4 \end{vmatrix} = -12 - 0 = -12; A_{31} = (-1)^{3+1} (-12) = -12$

126 MATHEMATICS

$M_{32} = \begin{vmatrix} 2 & 5 \\ 6 & 4 \end{vmatrix} = 8 - 30 = -22; A_{32} = (-1)^{3+2} (-22) = 22$
and $M_{33} = \begin{vmatrix} 2 & -3 \\ 6 & 0 \end{vmatrix} = 0 + 18 = 18; A_{33} = (-1)^{3+3} (18) = 18$

Now $a_{11} = 2, a_{12} = -3, a_{13} = 5; A_{31} = -12, A_{32} = 22, A_{33} = 18$
So $a_{11} A_{31} + a_{12} A_{32} + a_{13} A_{33} = 2(-12) + (-3)(22) + 5(18) = -24 - 66 + 90 = 0$

**EXERCISE 4.4**
Write Minors and Cofactors of the elements of following determinants:
1. (i) $\begin{vmatrix} 2 & -4 \\ 0 & 3 \end{vmatrix}$ (ii) $\begin{vmatrix} a & c \\ b & d \end{vmatrix}$
2. (i) $\begin{vmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{vmatrix}$ (ii) $\begin{vmatrix} 1 & 0 & 4 \\ 3 & 5 & -1 \\ 0 & 1 & 2 \end{vmatrix}$
3. Using Cofactors of elements of second row, evaluate $\Delta = \begin{vmatrix} 5 & 3 & 8 \\ 2 & 0 & 1 \\ 1 & 2 & 3 \end{vmatrix}$.
4. Using Cofactors of elements of third column, evaluate $\Delta = \begin{vmatrix} 1 & x & yz \\ 1 & y & zx \\ 1 & z & xy \end{vmatrix}$.
5. If $\Delta = \begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{vmatrix}$ and $A_{ij}$ is Cofactors of $a_{ij}$, then value of $\Delta$ is given by
(A) $a_{11} A_{31} + a_{12} A_{32} + a_{13} A_{33}$ (B) $a_{11} A_{11} + a_{12} A_{21} + a_{13} A_{31}$
(C) $a_{21} A_{11} + a_{22} A_{12} + a_{23} A_{13}$ (D) $a_{11} A_{11} + a_{21} A_{21} + a_{31} A_{31}$

**4.6 Adjoint and Inverse of a Matrix**
In the previous chapter, we have studied inverse of a matrix. In this section, we shall discuss the condition for existence of inverse of a matrix.
To find inverse of a matrix A, i.e., $A^{-1}$ we shall first define adjoint of a matrix.
