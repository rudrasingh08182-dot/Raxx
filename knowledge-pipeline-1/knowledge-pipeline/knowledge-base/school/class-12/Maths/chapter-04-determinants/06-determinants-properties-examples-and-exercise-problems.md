---
type: concept
title: 'Determinants: Properties, Examples, and Exercise Problems'
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- matrix-algebra
- mathematics
- determinants
- properties-of-determinants
- Maths
---

### Solution
Expanding along $R_1$, we get
$\Delta = 0 \sin \beta \cos \alpha - \sin \alpha (0 - \sin \beta \cos \alpha) - \cos \alpha (\sin \alpha \sin \beta - 0)$
$= \sin \alpha \sin \beta \cos \alpha - \cos \alpha \sin \alpha \sin \beta = 0$

**Example 5:** Find values of $x$ for which $\begin{vmatrix} 3 & x \\ x & 1 \end{vmatrix} = \begin{vmatrix} 3 & 2 \\ 4 & 1 \end{vmatrix}$.

**Solution:** We have $\begin{vmatrix} 3 & x \\ x & 1 \end{vmatrix} = \begin{vmatrix} 3 & 2 \\ 4 & 1 \end{vmatrix}$
i.e., $3 - x^2 = 3 - 8$
i.e., $x^2 = 8$
Hence $x = \pm 2\sqrt{2}$

### EXERCISE 4.1
Evaluate the determinants in Exercises 1 and 2.
1. $\begin{vmatrix} 2 & 4 \\ -5 & -1 \end{vmatrix}$
2. (i) $\begin{vmatrix} \cos \theta & -\sin \theta \\ \sin \theta & \cos \theta \end{vmatrix}$ (ii) $\begin{vmatrix} x^2 - x + 1 & x - 1 \\ x + 1 & x + 1 \end{vmatrix}$
3. If $A = \begin{bmatrix} 1 & 2 \\ 4 & 2 \end{bmatrix}$, then show that $|2A| = 4|A|$.
4. If $A = \begin{bmatrix} 1 & 0 & 1 \\ 0 & 1 & 2 \\ 0 & 0 & 4 \end{bmatrix}$, then show that $|3A| = 27|A|$.
5. Evaluate the determinants:
(i) $\begin{vmatrix} 3 & -1 & -2 \\ 0 & 0 & -1 \\ 3 & -5 & 0 \end{vmatrix}$ (ii) $\begin{vmatrix} 3 & -4 & 5 \\ 1 & 1 & -2 \\ 2 & 3 & 1 \end{vmatrix}$
(iii) $\begin{vmatrix} 0 & 1 & 2 \\ -1 & 0 & -3 \\ -2 & 3 & 0 \end{vmatrix}$ (iv) $\begin{vmatrix} 2 & -1 & -2 \\ 0 & 2 & -1 \\ 3 & -5 & 0 \end{vmatrix}$
6. If $A = \begin{bmatrix} 1 & 1 & -2 \\ 2 & 1 & -3 \\ 5 & 4 & -9 \end{bmatrix}$, find $|A|$.
7. Find values of $x$, if:
(i) $\begin{vmatrix} 2 & 4 \\ 5 & 1 \end{vmatrix} = \begin{vmatrix} 2x & 4 \\ 6 & x \end{vmatrix}$ (ii) $\begin{vmatrix} 2 & 3 \\ 4 & 5 \end{vmatrix} = \begin{vmatrix} x & 3 \\ 2x & 5 \end{vmatrix}$
8. If $\begin{vmatrix} x & 2 \\ 18 & x \end{vmatrix} = \begin{vmatrix} 6 & 2 \\ 18 & 6 \end{vmatrix}$, then $x$ is equal to
(A) 6 (B) $\pm 6$ (C) $-6$ (D) 0

### 4.3 Properties of Determinants
In the previous section, we have learnt how to expand the determinants. In this section, we will study some properties of determinants which simplifies its evaluation by obtaining maximum number of zeros in a row or a column. These properties are true for determinants of any order. However, we shall restrict ourselves upto determinants of order 3 only.

**Property 1:** The value of the determinant remains unchanged if its rows and columns are interchanged.

**Verification:** Let $\Delta = \begin{vmatrix} a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \\ c_1 & c_2 & c_3 \end{vmatrix}$
Expanding along first row, we get
$\Delta = a_1(b_2c_3 - b_3c_2) - a_2(b_1c_3 - b_3c_1) + a_3(b_1c_2 - b_2c_1)$
By interchanging the rows and columns of $\Delta$, we get the determinant
$\Delta_1 = \begin{vmatrix} a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \\ a_3 & b_3 & c_3 \end{vmatrix}$
