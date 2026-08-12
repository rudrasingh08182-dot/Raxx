---
type: concept
title: Determinant Properties and Matrix Method for Linear Equations
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: solved-example
tags:
- DETERMINANTS
- class12
- matrix-algebra
- mathematics
- determinants
- linear-equations
- Maths
- matrix-inversion
---

DETERMINANTS 139

Taking common factor $(x + y + z)$ from $C_2$ and $C_3$, we have
$\Delta = (x + y + z)^2 \begin{vmatrix} 0 & y & z \\ x-y & z & x-y \\ z & x & y-z \end{vmatrix}$

Applying $R_1 \rightarrow R_1 - (R_2 + R_3)$, we have
$\Delta = (x + y + z)^2 \begin{vmatrix} 0 & -z & -y \\ x-y & z & x-y \\ z & x & y-z \end{vmatrix}$

Applying $C_2 \rightarrow (C_2 + \frac{1}{y} C_1)$ and $C_3 \rightarrow (C_3 + \frac{1}{z} C_1)$, we get
$\Delta = (x + y + z)^2 \begin{vmatrix} 0 & 0 & 0 \\ x-y & z + \frac{x-y}{y} & x-y + \frac{x-y}{z} \\ z & x + \frac{z}{y} & y-z + \frac{z}{z} \end{vmatrix}$

Finally expanding along $R_1$, we have
$\Delta = (x + y + z)^2 (2yz) [(x + z) (x + y) - yz] = (x + y + z)^2 (2yz) (x^2 + xy + xz) = (x + y + z)^3 (2xyz)$

**Example 33** Use product $\begin{bmatrix} 1 & -1 & 2 \\ 0 & 2 & -3 \\ 3 & -2 & 4 \end{bmatrix} \begin{bmatrix} -2 & 0 & 1 \\ 9 & 2 & -3 \\ 6 & 1 & -2 \end{bmatrix}$ to solve the system of equations:
$x - y + 2z = 1$
$2y - 3z = 1$
$3x - 2y + 4z = 2$

**Solution** Consider the product
$\begin{bmatrix} 1 & -1 & 2 \\ 0 & 2 & -3 \\ 3 & -2 & 4 \end{bmatrix} \begin{bmatrix} -2 & 0 & 1 \\ 9 & 2 & -3 \\ 6 & 1 & -2 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$

Hence $\begin{bmatrix} 1 & -1 & 2 \\ 0 & 2 & -3 \\ 3 & -2 & 4 \end{bmatrix}^{-1} = \begin{bmatrix} -2 & 0 & 1 \\ 9 & 2 & -3 \\ 6 & 1 & -2 \end{bmatrix}$

Now, given system of equations can be written, in matrix form, as follows:
$\begin{bmatrix} 1 & -1 & 2 \\ 0 & 2 & -3 \\ 3 & -2 & 4 \end{bmatrix} \begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 1 \\ 1 \\ 2 \end{bmatrix}$

$\begin{bmatrix} x \\ y \\ z \end{bmatrix} = \begin{bmatrix} 1 & -1 & 2 \\ 0 & 2 & -3 \\ 3 & -2 & 4 \end{bmatrix}^{-1} \begin{bmatrix} 1 \\ 1 \\ 2 \end{bmatrix} = \begin{bmatrix} -2 & 0 & 1 \\ 9 & 2 & -3 \\ 6 & 1 & -2 \end{bmatrix} \begin{bmatrix} 1 \\ 1 \\ 2 \end{bmatrix} = \begin{bmatrix} 0 \\ 5 \\ 3 \end{bmatrix}$

Hence $x = 0, y = 5$ and $z = 3$.

**Example 34** Prove that
$\Delta = \begin{vmatrix} a(1+x) & b & c \\ ax+b & c & d \\ u & v & w \end{vmatrix} = (1-x^2) \begin{vmatrix} a & b & c \\ ax+b & c & d \\ u & v & w \end{vmatrix}$

**Solution** Applying $R_1 \rightarrow R_1 - x R_2$ to $\Delta$, we get
$\Delta = \begin{vmatrix} a(1-x^2) & b(1-x^2) & c(1-x^2) \\ ax+b & c & d \\ u & v & w \end{vmatrix} = (1-x^2) \begin{vmatrix} a & b & c \\ ax+b & c & d \\ u & v & w \end{vmatrix}$
