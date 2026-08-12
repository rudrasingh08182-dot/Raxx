---
type: concept
title: Introduction to Determinants and Their Applications
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- mathematics
- determinants
- matrices
- Maths
- linear-algebra
---

### Chapter 4: DETERMINANTS

> "All Mathematical truths are relative and conditional." — C.P. STEINMETZ

#### 4.1 Introduction
In the previous chapter, we have studied about matrices and algebra of matrices. We have also learnt that a system of algebraic equations can be expressed in the form of matrices. This means, a system of linear equations like:
$a_1 x + b_1 y = c_1$
$a_2 x + b_2 y = c_2$

can be represented as:
$\begin{bmatrix} a_1 & b_1 \\ a_2 & b_2 \end{bmatrix} \begin{bmatrix} x \\ y \end{bmatrix} = \begin{bmatrix} c_1 \\ c_2 \end{bmatrix}$

Now, this system of equations has a unique solution or not, is determined by the number $a_1 b_2 – a_2 b_1$. (Recall that if $\frac{a_1}{a_2} \neq \frac{b_1}{b_2}$ or, $a_1 b_2 – a_2 b_1 \neq 0$, then the system of linear equations has a unique solution). The number $a_1 b_2 – a_2 b_1$ which determines uniqueness of solution is associated with the matrix $A = \begin{bmatrix} a_1 & b_1 \\ a_2 & b_2 \end{bmatrix}$ and is called the determinant of A or det A. Determinants have wide applications in Engineering, Science, Economics, Social Science, etc.

In this chapter, we shall study determinants up to order three only with real entries. Also, we will study various properties of determinants, minors, cofactors and applications of determinants in finding the area of a triangle, adjoint and inverse of a square matrix, consistency and inconsistency of system of linear equations and solution of linear equations in two or three variables using inverse of a matrix.

#### 4.2 Determinant
To every square matrix $A = [a_{ij}]$ of order $n$, we can associate a number (real or complex) called determinant of the square matrix A, where $a_{ij} = (i, j)^{th}$ element of A.

*P.S. Laplace (1749-1827)*
