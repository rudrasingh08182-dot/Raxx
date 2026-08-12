---
type: concept
title: Properties and Applications of Determinants
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
- properties-of-determinants
- Maths
---

Applying $R_1 \rightarrow R_1 - R_2 - R_3$ to $\Delta$, we get

$\Delta = \begin{vmatrix} 0 & -2c & -2b \\ b+c & a+b & b \\ c+b & c & a+b \end{vmatrix}$

Expanding along $R_1$, we obtain

$\Delta = 0 - (-2c)(b+c)(a+b) - bc(c+b) + (-2b)(b+c)c - (a+b)(c+b)$
$= 2c(ab + b^2 - bc) - 2b(bc - c^2 - ac)$
$= 2abc + 2cb^2 - 2bc^2 - 2b^2c + 2bc^2 + 2abc$
$= 4abc$

**Example 15** If $x, y, z$ are different and 

$\Delta = \begin{vmatrix} x & x^2 & 1+x^3 \\ y & y^2 & 1+y^3 \\ z & z^2 & 1+z^3 \end{vmatrix} = 0$, then show that $1 + xyz = 0$

**Solution** We have

$\Delta = \begin{vmatrix} x & x^2 & 1 \\ y & y^2 & 1 \\ z & z^2 & 1 \end{vmatrix} + \begin{vmatrix} x & x^2 & x^3 \\ y & y^2 & y^3 \\ z & z^2 & z^3 \end{vmatrix}$ (Using Property 5)

$= \begin{vmatrix} 1 & x & x^2 \\ 1 & y & y^2 \\ 1 & z & z^2 \end{vmatrix} + xyz \begin{vmatrix} 1 & x & x^2 \\ 1 & y & y^2 \\ 1 & z & z^2 \end{vmatrix}$ (Using $C_3 \leftrightarrow C_2$ and then $C_1 \leftrightarrow C_2$)

$= (1 + xyz) \begin{vmatrix} 1 & x & x^2 \\ 1 & y & y^2 \\ 1 & z & z^2 \end{vmatrix}$

$= (1 + xyz) \begin{vmatrix} 1 & x & x^2 \\ 0 & y-x & y^2-x^2 \\ 0 & z-x & z^2-x^2 \end{vmatrix}$ (Using $R_2 \rightarrow R_2 - R_1$ and $R_3 \rightarrow R_3 - R_1$)

Taking out common factor $(y - x)$ from $R_2$ and $(z - x)$ from $R_3$, we get

$\Delta = (1 + xyz)(y - x)(z - x) \begin{vmatrix} 1 & x & x^2 \\ 0 & 1 & y+x \\ 0 & 1 & z+x \end{vmatrix}$

$= (1 + xyz)(y - x)(z - x)(z - y)$ (on expanding along $C_1$)

Since $\Delta = 0$ and $x, y, z$ are all different, i.e., $x - y \neq 0, y - z \neq 0, z - x \neq 0$, we get
$1 + xyz = 0$

**Example 16** Show that

$\begin{vmatrix} 1+a & 1 & 1 \\ 1 & 1+b & 1 \\ 1 & 1 & 1+c \end{vmatrix} = abc(1 + \frac{1}{a} + \frac{1}{b} + \frac{1}{c}) = abc + bc + ca + ab$

**Solution** Taking out factors $a, b, c$ common from $R_1, R_2$ and $R_3$, we get

$L.H.S. = abc \begin{vmatrix} \frac{1}{a}+1 & \frac{1}{a} & \frac{1}{a} \\ \frac{1}{b} & \frac{1}{b}+1 & \frac{1}{b} \\ \frac{1}{c} & \frac{1}{c} & \frac{1}{c}+1 \end{vmatrix}$

Applying $R_1 \rightarrow R_1 + R_2 + R_3$, we have

$\Delta = abc \begin{vmatrix} 1+\frac{1}{a}+\frac{1}{b}+\frac{1}{c} & 1+\frac{1}{a}+\frac{1}{b}+\frac{1}{c} & 1+\frac{1}{a}+\frac{1}{b}+\frac{1}{c} \\ \frac{1}{b} & \frac{1}{b}+1 & \frac{1}{b} \\ \frac{1}{c} & \frac{1}{c} & \frac{1}{c}+1 \end{vmatrix}$
