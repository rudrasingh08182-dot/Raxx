---
type: concept
title: Solving Systems of Linear Equations Using Matrix Method
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: solved-example
tags:
- DETERMINANTS
- class12
- singular-matrix
- matrix-method
- linear-equations
- algebra
- non-singular-matrix
- Maths
---

### Case II: If A is a singular matrix, then $|A| = 0$.

In this case, we calculate $(adj A) B$.

If $(adj A) B \neq O$, ($O$ being zero matrix), then the solution does not exist and the system of equations is called inconsistent.

If $(adj A) B = O$, then the system may be either consistent or inconsistent according as the system has either infinitely many solutions or no solution.

**Example 27:** Solve the system of equations:
$2x + 5y = 1$
$3x + 2y = 7$

**Solution:** The system of equations can be written in the form $AX = B$, where
$A = \begin{bmatrix} 2 & 5 \\ 3 & 2 \end{bmatrix}, X = \begin{bmatrix} x \\ y \end{bmatrix}$ and $B = \begin{bmatrix} 1 \\ 7 \end{bmatrix}$

Now, $|A| = 4 - 15 = -11 \neq 0$. Hence, $A$ is a non-singular matrix and so has a unique solution.

Note that $A^{-1} = -\frac{1}{11} \begin{bmatrix} 2 & -5 \\ -3 & 2 \end{bmatrix}$

Therefore $X = A^{-1} B = -\frac{1}{11} \begin{bmatrix} 2 & -5 \\ -3 & 2 \end{bmatrix} \begin{bmatrix} 1 \\ 7 \end{bmatrix}$

i.e., $\begin{bmatrix} x \\ y \end{bmatrix} = -\frac{1}{11} \begin{bmatrix} -33 \\ 11 \end{bmatrix} = \begin{bmatrix} 3 \\ -1 \end{bmatrix}$

Hence $x = 3, y = -1$.

**Example 28:** Solve the following system of equations by matrix method:
$3x - 2y + 3z = 8$
$2x + y - z = 1$
$4x - 3y + 2z = 4$

**Solution:** The system of equations can be written in the form $AX = B$, where
$A = \begin{bmatrix} 3 & -2 & 3 \\ 2 & 1 & -1 \\ 4 & -3 & 2 \end{bmatrix}, X = \begin{bmatrix} x \\ y \\ z \end{bmatrix}$ and $B = \begin{bmatrix} 8 \\ 1 \\ 4 \end{bmatrix}$

We see that:
$|A| = 3(2 - 3) + 2(4 + 4) + 3(-6 - 4) = -3 + 16 - 30 = -17 \neq 0$
