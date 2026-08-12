---
type: concept
title: Introduction to Determinants and Their Evaluation
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
- square-matrices
- Maths
- linear-algebra
---

### 104 MATHEMATICS

This may be thought of as a function which associates each square matrix with a unique number (real or complex). If $M$ is the set of square matrices, $K$ is the set of numbers (real or complex) and $f : M \to K$ is defined by $f(A) = k$, where $A \in M$ and $k \in K$, then $f(A)$ is called the determinant of $A$. It is also denoted by $|A|$ or $\det A$ or $\Delta$.

If $A = \begin{bmatrix} a & b \\ c & d \end{bmatrix}$, then determinant of $A$ is written as $|A| = \begin{vmatrix} a & b \\ c & d \end{vmatrix} = \det(A)$.

**Remarks**
(i) For matrix $A$, $|A|$ is read as determinant of $A$ and not modulus of $A$.
(ii) Only square matrices have determinants.

#### 4.2.1 Determinant of a matrix of order one
Let $A = [a]$ be the matrix of order 1, then determinant of $A$ is defined to be equal to $a$.

#### 4.2.2 Determinant of a matrix of order two
Let $A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$ be a matrix of order $2 \times 2$, then the determinant of $A$ is defined as:
$\det(A) = |A| = \Delta = \begin{vmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{vmatrix} = a_{11}a_{22} - a_{21}a_{12}$

**Example 1** Evaluate $\begin{vmatrix} 2 & 4 \\ -1 & 2 \end{vmatrix}$.
**Solution** We have $\begin{vmatrix} 2 & 4 \\ -1 & 2 \end{vmatrix} = 2(2) - 4(-1) = 4 + 4 = 8$.

**Example 2** Evaluate $\begin{vmatrix} x & x+1 \\ x-1 & x \end{vmatrix}$.
**Solution** We have $\begin{vmatrix} x & x+1 \\ x-1 & x \end{vmatrix} = x(x) - (x+1)(x-1) = x^2 - (x^2 - 1) = x^2 - x^2 + 1 = 1$.

#### 4.2.3 Determinant of a matrix of order $3 \times 3$
Determinant of a matrix of order three can be determined by expressing it in terms of second order determinants. This is known as expansion of a determinant along a row (or a column). There are six ways of expanding a determinant of order.
