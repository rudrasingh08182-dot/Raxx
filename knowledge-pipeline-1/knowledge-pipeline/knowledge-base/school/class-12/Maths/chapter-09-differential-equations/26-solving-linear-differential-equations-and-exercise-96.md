---
type: concept
title: Solving Linear Differential Equations and Exercise 9.6
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: solved-example
tags:
- calculus
- differential-equations
- DIFFERENTIAL  EQUATIONS
- mathematics-exercises
- class12
- Maths
- linear-differential-equations
---

DIFFERENTIAL EQUATIONS 413

Hence, the solution of equation is given by
$y e^{x^2} = \int (2x e^{-x^2}) dx + C$ ... (2)

Let $I = \int (2x e^{-x^2}) dx$
Let $x^2 = t$, then $2x dx = dt$.
Therefore, $I = \int e^{-t} dt = -e^{-t} = -e^{-x^2}$

Substituting the value of $I$ in equation (2), we get
$y e^{x^2} = -e^{-x^2} + C$
or $y = -1 + C e^{-x^2}$ ... (3)

Now (3) represents the equation of family of curves. But we are interested in finding a particular member of the family passing through (0, 1). Substituting $x = 0$ and $y = 1$ in equation (3) we get
$1 = -1 + C \cdot e^0$ or $C = 2$

Substituting the value of $C$ in equation (3), we get
$y = -1 + 2e^{-x^2}$
which is the equation of the required curve.

EXERCISE 9.6
For each of the differential equations given in Exercises 1 to 12, find the general solution:
1. $\frac{dy}{dx} + y = \sin x$
2. $\frac{dy}{dx} + 3y = e^{-2x}$
3. $\frac{dy}{dx} + \frac{y}{x} = x^2$
4. $\frac{dy}{dx} + (\sec x) y = \tan x$ ($0 \le x < \frac{\pi}{2}$)
5. $\frac{dy}{dx} + y \cos x = \frac{1}{2} \sin 2x$ ($0 \le x < \frac{\pi}{2}$)
6. $\frac{dy}{dx} + y = x^2$
7. $x \frac{dy}{dx} + y = xy \log x$
8. $(1 + x^2) dy + 2xy dx = \cot x dx$ ($x \neq 0$)
