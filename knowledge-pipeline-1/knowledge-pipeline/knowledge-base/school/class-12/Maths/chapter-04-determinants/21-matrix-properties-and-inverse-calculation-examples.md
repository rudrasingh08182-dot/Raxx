---
type: concept
title: Matrix Properties and Inverse Calculation Examples
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: solved-example
tags:
- DETERMINANTS
- class12
- determinants
- matrix-inverse
- adjoint-matrix
- Maths
- linear-algebra
---

DETERMINANTS 131

Therefore $BA = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix} \begin{bmatrix} 3 & 2 \\ 1 & 4 \end{bmatrix} = \begin{bmatrix} 4 & 6 \\ 4 & 6 \end{bmatrix}$

Hence $(AB)^{-1} = B^{-1} A^{-1}$

**Example 26** Show that the matrix $A = \begin{bmatrix} 2 & 3 \\ 1 & 2 \end{bmatrix}$ satisfies the equation $A^2 - 4A + I = O$, where $I$ is $2 \times 2$ identity matrix and $O$ is $2 \times 2$ zero matrix. Using this equation, find $A^{-1}$.

**Solution** We have $A^2 = A \cdot A = \begin{bmatrix} 2 & 3 \\ 1 & 2 \end{bmatrix} \begin{bmatrix} 2 & 3 \\ 1 & 2 \end{bmatrix} = \begin{bmatrix} 7 & 12 \\ 4 & 7 \end{bmatrix}$

Hence $A^2 - 4A + I = \begin{bmatrix} 7 & 12 \\ 4 & 7 \end{bmatrix} - \begin{bmatrix} 8 & 12 \\ 4 & 8 \end{bmatrix} + \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix} = O$

Now $A^2 - 4A + I = O$
Therefore $A^2 - 4A = -I$
or $A(A)A^{-1} - 4AA^{-1} = -IA^{-1}$ (Post multiplying by $A^{-1}$ because $|A| \neq 0$)
or $A(AA^{-1}) - 4I = -A^{-1}$
or $AI - 4I = -A^{-1}$
or $A^{-1} = 4I - A = \begin{bmatrix} 4 & 0 \\ 0 & 4 \end{bmatrix} - \begin{bmatrix} 2 & 3 \\ 1 & 2 \end{bmatrix} = \begin{bmatrix} 2 & -3 \\ -1 & 2 \end{bmatrix}$

Hence $A^{-1} = \begin{bmatrix} 2 & -3 \\ -1 & 2 \end{bmatrix}$

**EXERCISE 4.5**
Find adjoint of each of the matrices in Exercises 1 and 2.

1. $\begin{bmatrix} 1 & 2 \\ 3 & 4 \end{bmatrix}$

2. $\begin{bmatrix} 1 & -1 & 2 \\ 2 & 3 & 5 \\ -2 & 0 & 1 \end{bmatrix}$

Verify $A(\text{adj } A) = (\text{adj } A)A = |A|I$ in Exercises 3 and 4

3. $\begin{bmatrix} 2 & 3 \\ -4 & -6 \end{bmatrix}$

4. $\begin{bmatrix} 1 & -1 & 2 \\ 3 & 0 & -2 \\ 1 & 0 & 3 \end{bmatrix}$
