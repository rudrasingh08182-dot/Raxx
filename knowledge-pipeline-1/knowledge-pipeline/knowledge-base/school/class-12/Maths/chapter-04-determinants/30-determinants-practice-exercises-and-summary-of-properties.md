---
type: concept
title: 'Determinants: Practice Exercises and Summary of Properties'
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: summary
tags:
- DETERMINANTS
- class12
- matrix-algebra
- mathematics
- determinants
- properties-of-determinants
- exercise-problems
- Maths
---

DETERMINANTS 143

$4x + 6y + 5z = 1$
$6x + 9y + 20z = 2$

Choose the correct answer in Exercise 17 to 19.

17. If $a, b, c$ are in A.P., then the determinant

| $x+a$ $x+b$ $x+c$ |
| $x+2$ $x+3$ $x+4$ |
| $x+3$ $x+4$ $x+5$ |

is
(A) 0 (B) 1 (C) $x$ (D) $2x$

18. If $x, y, z$ are nonzero real numbers, then the inverse of matrix
$A = \begin{bmatrix} x & 0 & 0 \\ 0 & y & 0 \\ 0 & 0 & z \end{bmatrix}$ is

(A) $\begin{bmatrix} x^{-1} & 0 & 0 \\ 0 & y^{-1} & 0 \\ 0 & 0 & z^{-1} \end{bmatrix}$ (B) $\begin{bmatrix} x^{-1} & 0 & 0 \\ 0 & y^{-1} & 0 \\ 0 & 0 & z^{-1} \end{bmatrix}$ (C) $\begin{bmatrix} x & 0 & 0 \\ 0 & y & 0 \\ 0 & 0 & z \end{bmatrix}$ (D) $\begin{bmatrix} 1/x & 0 & 0 \\ 0 & 1/y & 0 \\ 0 & 0 & 1/z \end{bmatrix}$

19. Let $A = \begin{bmatrix} 1 & \sin \theta & 1 \\ -\sin \theta & 1 & \sin \theta \\ -1 & -\sin \theta & 1 \end{bmatrix}$, where $0 \le \theta \le 2\pi$. Then
(A) $\text{Det}(A) = 0$ (B) $\text{Det}(A) \in (2, \infty)$ (C) $\text{Det}(A) \in (2, 4)$ (D) $\text{Det}(A) \in [2, 4]$

144 MATHEMATICS

Summary

* Determinant of a matrix $A = [a_{11}]_{1 \times 1}$ is given by $|a_{11}| = a_{11}$
* Determinant of a matrix $A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$ is given by $|A| = a_{11}a_{22} - a_{12}a_{21}$
* Determinant of a matrix $A = \begin{bmatrix} a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \\ a_3 & b_3 & c_3 \end{bmatrix}$ is given by (expanding along $R_1$):
$|A| = a_1(b_2c_3 - b_3c_2) - b_1(a_2c_3 - a_3c_2) + c_1(a_2b_3 - a_3b_2)$

For any square matrix $A$, the $|A|$ satisfy following properties:
* $|A'| = |A|$, where $A'$ = transpose of $A$.
* If we interchange any two rows (or columns), then sign of determinant changes.
* If any two rows or any two columns are identical or proportional, then value of determinant is zero.
* If we multiply each element of a row or a column of a determinant by constant $k$, then value of determinant is multiplied by $k$.
* Multiplying a determinant by $k$ means multiply elements of only one row (or one column) by $k$.
* If $A = [a_{ij}]_{3 \times 3}$, then $|kA| = k^3|A|$.
* If elements of a row or a column in a determinant can be expressed as sum of two or more elements, then the given determinant can be expressed as sum of two or more determinants.
* If to each element of a row or a column of a determinant the equimultiples of corresponding elements of other rows or columns are added, then value of determinant remains same.
