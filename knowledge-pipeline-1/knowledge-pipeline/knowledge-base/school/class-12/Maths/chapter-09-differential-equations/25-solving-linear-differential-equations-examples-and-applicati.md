---
type: concept
title: 'Solving Linear Differential Equations: Examples and Applications'
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: solved-example
tags:
- integration-factor
- mathematics
- calculus
- differential-equations
- DIFFERENTIAL  EQUATIONS
- class12
- Maths
- linear-differential-equations
---

### Example 21
Find the general solution of the differential equation $y dx - (x + 2y^2) dy = 0$.

**Solution:**
The given differential equation can be written as:
$\frac{dx}{dy} - \frac{x}{y} = 2y$

This is a linear differential equation of the type $\frac{dx}{dy} + Px = Q$, where $P = -\frac{1}{y}$ and $Q = 2y$. Therefore,
$I.F = e^{\int -\frac{1}{y} dy} = e^{-\log y} = e^{\log(y^{-1})} = \frac{1}{y}$

Hence, the solution of the given differential equation is:
$x \cdot \frac{1}{y} = \int (2y \cdot \frac{1}{y}) dy + C$
$or \frac{x}{y} = \int 2 dy + C$
$or \frac{x}{y} = 2y + C$
$or x = 2y^2 + Cy$
which is a general solution of the given differential equation.

### Example 22
Find the particular solution of the differential equation $\frac{dy}{dx} + y \cot x = 2x + x^2 \cot x$ ($x \neq 0$) given that $y = 0$ when $x = \frac{\pi}{2}$.

**Solution:**
The given equation is a linear differential equation of the type $\frac{dy}{dx} + Py = Q$, where $P = \cot x$ and $Q = 2x + x^2 \cot x$. Therefore,
$I.F = e^{\int \cot x dx} = e^{\log \sin x} = \sin x$

Hence, the solution of the differential equation is given by:
$y \cdot \sin x = \int (2x + x^2 \cot x) \sin x dx + C$
$or y \sin x = \int 2x \sin x dx + \int x^2 \cos x dx + C$
$or y \sin x = x^2 \sin x + C \dots (1)$

Substituting $y = 0$ and $x = \frac{\pi}{2}$ in equation (1), we get:
$0 = (\frac{\pi}{2})^2 \sin(\frac{\pi}{2}) + C$
$or C = -\frac{\pi^2}{4}$

Substituting the value of $C$ in equation (1), we get:
$y \sin x = x^2 \sin x - \frac{\pi^2}{4}$
$or y = x^2 - \frac{\pi^2}{4 \sin x}$ ($x \neq 0$)
which is the particular solution of the given differential equation.

### Example 23
Find the equation of a curve passing through the point (0, 1). If the slope of the tangent to the curve at any point $(x, y)$ is equal to the sum of the $x$ coordinate (abscissa) and the product of the $x$ coordinate and $y$ coordinate (ordinate) of that point.

**Solution:**
We know that the slope of the tangent to the curve is $\frac{dy}{dx}$.
Therefore, $\frac{dy}{dx} = x + xy$
$or \frac{dy}{dx} - xy = x \dots (1)$

This is a linear differential equation of the type $\frac{dy}{dx} + Py = Q$, where $P = -x$ and $Q = x$.
Therefore, $I.F = e^{\int -x dx} = e^{-\frac{x^2}{2}}$
