---
type: concept
title: Verification of Differential Equation Solutions and Formation of Circle Equations
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: solved-example
tags:
- calculus
- differential-equations
- mathematical-derivation
- DIFFERENTIAL  EQUATIONS
- coordinate-geometry
- class12
- Maths
---

### DIFFERENTIAL EQUATIONS 415

**Solution**
The given function is
$y = e^{ax} [c_1 \cos bx + c_2 \sin bx]$ ... (1)

Differentiating both sides of equation (1) with respect to $x$, we get
$\frac{dy}{dx} = e^{ax} [c_1 (-b \sin bx) + c_2 (b \cos bx)] + a e^{ax} [c_1 \cos bx + c_2 \sin bx]$

or $\frac{dy}{dx} = e^{ax} [(ac_1 - bc_2) \cos bx + (ac_2 + bc_1) \sin bx]$ ... (2)

Differentiating both sides of equation (2) with respect to $x$, we get
$\frac{d^2y}{dx^2} = e^{ax} [(ac_1 - bc_2)(-b \sin bx) + (ac_2 + bc_1)(b \cos bx)] + a e^{ax} [(ac_1 - bc_2) \cos bx + (ac_2 + bc_1) \sin bx]$

$= e^{ax} [(-abc_1 + b^2c_2) \sin bx + (abc_2 + b^2c_1) \cos bx + (a^2c_1 - abc_2) \cos bx + (a^2c_2 + abc_1) \sin bx]$

$= e^{ax} [(a^2c_1 - 2abc_2 - b^2c_1) \cos bx + (a^2c_2 + 2abc_1 - b^2c_2) \sin bx]$

Substituting the values of $\frac{d^2y}{dx^2}$, $\frac{dy}{dx}$ and $y$ in the given differential equation, we get

L.H.S. $= e^{ax} [(a^2c_1 - 2abc_2 - b^2c_1) \cos bx + (a^2c_2 + 2abc_1 - b^2c_2) \sin bx] - 2a e^{ax} [(ac_1 - bc_2) \cos bx + (ac_2 + bc_1) \sin bx] + (a^2 + b^2) e^{ax} [c_1 \cos bx + c_2 \sin bx]$

$= e^{ax} [ (a^2c_1 - 2abc_2 - b^2c_1 - 2a^2c_1 + 2abc_2 + a^2c_1 + b^2c_1) \cos bx + (a^2c_2 + 2abc_1 - b^2c_2 - 2a^2c_2 - 2abc_1 + a^2c_2 + b^2c_2) \sin bx ]$

$= e^{ax} [0 \cos bx + 0 \sin bx] = e^{ax} \times 0 = 0 = R.H.S.$

Hence, the given function is a solution of the given differential equation.

**Example 25** Form the differential equation of the family of circles in the second quadrant and touching the coordinate axes.

**Solution** Let $C$ denote the family of circles in the second quadrant and touching the coordinate axes. Let $(-a, a)$ be the coordinate of the centre of any member of this family (see Fig 9.6).
