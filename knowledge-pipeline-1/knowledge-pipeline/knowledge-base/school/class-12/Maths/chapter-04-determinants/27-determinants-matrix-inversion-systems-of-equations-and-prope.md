---
type: concept
title: 'Determinants: Matrix Inversion, Systems of Equations, and Properties'
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: solved-example
tags:
- DETERMINANTS
- class12
- mathematics
- determinants
- matrix-method
- linear-equations
- algebra
- Maths
---

### Determinants

**15.** If $A = \begin{bmatrix} 2 & -3 & 5 \\ 3 & 2 & -4 \\ 1 & 1 & -2 \end{bmatrix}$, find $A^{-1}$. Using $A^{-1}$ solve the system of equations:
$2x - 3y + 5z = 11$
$3x + 2y - 4z = -5$
$x + y - 2z = -3$

**16.** The cost of 4 kg onion, 3 kg wheat and 2 kg rice is ₹ 60. The cost of 2 kg onion, 4 kg wheat and 6 kg rice is ₹ 90. The cost of 6 kg onion, 2 kg wheat and 3 kg rice is ₹ 70. Find cost of each item per kg by matrix method.

#### Miscellaneous Examples

**Example 30:** If $a, b, c$ are positive and unequal, show that value of the determinant $\Delta = \begin{vmatrix} a & b & c \\ b & c & a \\ c & a & b \end{vmatrix}$ is negative.

**Solution:** Applying $C_1 \to C_1 + C_2 + C_3$ to the given determinant, we get:
$\Delta = \begin{vmatrix} a+b+c & b & c \\ a+b+c & c & a \\ a+b+c & a & b \end{vmatrix} = (a + b + c) \begin{vmatrix} 1 & b & c \\ 1 & c & a \\ 1 & a & b \end{vmatrix}$

(Applying $R_2 \to R_2 - R_1$ and $R_3 \to R_3 - R_1$)
$= (a + b + c) \begin{vmatrix} 1 & b & c \\ 0 & c-b & a-c \\ 0 & a-b & b-c \end{vmatrix}$
$= (a + b + c) [(c - b)(b - c) - (a - c)(a - b)]$ (Expanding along $C_1$)
$= (a + b + c)(-a^2 - b^2 - c^2 + ab + bc + ca)$
$= -\frac{1}{2}(a + b + c)(2a^2 + 2b^2 + 2c^2 - 2ab - 2bc - 2ca)$
$= -\frac{1}{2}(a + b + c)[(a - b)^2 + (b - c)^2 + (c - a)^2]$
which is negative (since $a + b + c > 0$ and $(a - b)^2 + (b - c)^2 + (c - a)^2 > 0$).

**Example 31:** If $a, b, c$ are in A.P, find value of $\Delta = \begin{vmatrix} y+1 & y+2 & y+a \\ y+2 & y+3 & y+b \\ y+3 & y+4 & y+c \end{vmatrix}$.

**Solution:** Applying $R_1 \to R_1 + R_3 - 2R_2$ to the given determinant, we obtain:
$\Delta = \begin{vmatrix} 0 & 0 & 0 \\ y+2 & y+3 & y+b \\ y+3 & y+4 & y+c \end{vmatrix} = 0$ (Since $2b = a + c$).

**Example 32:** Show that $\Delta = \begin{vmatrix} (y+z)^2 & xy & zx \\ xy & (x+z)^2 & yz \\ xz & yz & (x+y)^2 \end{vmatrix} = 2xyz(x + y + z)^3$.

**Solution:** Applying $R_1 \to xR_1, R_2 \to yR_2, R_3 \to zR_3$ to $\Delta$ and dividing by $xyz$, we get:
$\Delta = \frac{1}{xyz} \begin{vmatrix} x(y+z)^2 & x^2y & x^2z \\ xy^2 & y(x+z)^2 & y^2z \\ xz^2 & yz^2 & z(x+y)^2 \end{vmatrix}$
Taking common factors $x, y, z$ from $C_1, C_2$ and $C_3$, respectively, we get:
$\Delta = \frac{xyz}{xyz} \begin{vmatrix} (y+z)^2 & x^2 & x^2 \\ y^2 & (x+z)^2 & y^2 \\ z^2 & z^2 & (x+y)^2 \end{vmatrix} = \begin{vmatrix} (y+z)^2 & x^2 & x^2 \\ y^2 & (x+z)^2 & y^2 \\ z^2 & z^2 & (x+y)^2 \end{vmatrix}$
Applying $C_2 \to C_2 - C_1, C_3 \to C_3 - C_1$, we have:
$\Delta = \begin{vmatrix} (y+z)^2 & x^2-(y+z)^2 & x^2-(y+z)^2 \\ y^2 & (x+z)^2-y^2 & 0 \\ z^2 & 0 & (x+y)^2-z^2 \end{vmatrix}$
