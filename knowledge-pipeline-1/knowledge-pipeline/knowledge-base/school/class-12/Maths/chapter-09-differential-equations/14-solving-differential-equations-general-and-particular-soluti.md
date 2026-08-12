---
type: concept
title: 'Solving Differential Equations: General and Particular Solutions'
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: solved-example
tags:
- integration
- mathematics
- calculus
- differential-equations
- DIFFERENTIAL  EQUATIONS
- class12
- Maths
- variable-separable
---

### Example 10
Find the general solution of the differential equation $\frac{dy}{dx} = \frac{1+y^2}{1+x^2}$.

**Solution:** Since $1 + y^2 \neq 0$, therefore separating the variables, the given differential equation can be written as:
$\int \frac{dy}{1+y^2} = \int \frac{dx}{1+x^2} \dots (1)$

Integrating both sides of equation (1), we get:
$\tan^{-1} y = \tan^{-1} x + C$
which is the general solution of equation (1).

### Example 11
Find the particular solution of the differential equation $\frac{dy}{dx} = -4xy^2$ given that $y = 1$, when $x = 0$.

**Solution:** If $y \neq 0$, the given differential equation can be written as:
$\frac{dy}{y^2} = -4x dx \dots (1)$

Integrating both sides of equation (1), we get:
$\int \frac{dy}{y^2} = - \int 4x dx$
$\Rightarrow -\frac{1}{y} = -2x^2 + C$
$\Rightarrow y = \frac{1}{2x^2 - C} \dots (2)$

Substituting $y = 1$ and $x = 0$ in equation (2), we get $C = -1$.
Now substituting the value of $C$ in equation (2), we get the particular solution of the given differential equation as $y = \frac{1}{2x^2 + 1}$.

### Example 12
Find the equation of the curve passing through the point (1, 1) whose differential equation is $x dy = (2x^2 + 1) dx$ ($x \neq 0$).
