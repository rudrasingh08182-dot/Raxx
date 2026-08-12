---
type: concept
title: Matrix Operations and Application in Cost Analysis
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: solved-example
tags:
- matrices
- matrix-multiplication
- linear-algebra
- MATRICES
- cost-analysis
- Maths
- class12
---

### MATRICES 79

So $A^3 = A \cdot A^2 = \begin{bmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \\ 4 & 2 & 1 \end{bmatrix} \begin{bmatrix} 19 & 4 & 8 \\ 12 & 8 & 6 \\ 19 & 6 & 23 \end{bmatrix} = \begin{bmatrix} 63 & 46 & 69 \\ 69 & 6 & 23 \\ 92 & 46 & 63 \end{bmatrix}$

Now
$A^3 - 23A - 40I = \begin{bmatrix} 63 & 46 & 69 \\ 69 & 6 & 23 \\ 92 & 46 & 63 \end{bmatrix} - 23 \begin{bmatrix} 1 & 2 & 3 \\ 3 & 2 & 1 \\ 4 & 2 & 1 \end{bmatrix} - 40 \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$

$= \begin{bmatrix} 63 & 46 & 69 \\ 69 & 6 & 23 \\ 92 & 46 & 63 \end{bmatrix} - \begin{bmatrix} 23 & 46 & 69 \\ 69 & 46 & 23 \\ 92 & 46 & 23 \end{bmatrix} - \begin{bmatrix} 40 & 0 & 0 \\ 0 & 40 & 0 \\ 0 & 0 & 40 \end{bmatrix}$

$= \begin{bmatrix} 63-23-40 & 46-46-0 & 69-69-0 \\ 69-69-0 & 6-46-40 & 23-23-0 \\ 92-92-0 & 46-46-0 & 63-23-40 \end{bmatrix}$

$= \begin{bmatrix} 0 & 0 & 0 \\ 0 & 0 & 0 \\ 0 & 0 & 0 \end{bmatrix} = O$

**Example 19** In a legislative assembly election, a political group hired a public relations firm to promote its candidate in three ways: telephone, house calls, and letters. The cost per contact (in paise) is given in matrix A as

$A = \begin{bmatrix} 40 \\ 100 \\ 50 \end{bmatrix} \begin{matrix} \text{Telephone} \\ \text{Housecall} \\ \text{Letter} \end{matrix} \text{Cost per contact}$

The number of contacts of each type made in two cities X and Y is given by

$B = \begin{bmatrix} 1000 & 500 & 5000 \\ 3000 & 1000 & 10000 \end{bmatrix} \begin{matrix} \text{X} \\ \text{Y} \end{matrix} \begin{matrix} \text{Telephone} & \text{Housecall} & \text{Letter} \end{matrix}$

Find the total amount spent by the group in the two cities X and Y.
