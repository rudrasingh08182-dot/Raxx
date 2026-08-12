---
type: concept
title: Formation of Differential Equations and Solving First-Order Equations
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: solved-example
tags:
- mathematics
- calculus
- differential-equations
- particular-solution
- DIFFERENTIAL  EQUATIONS
- homogeneous-equations
- class12
- Maths
---

Equation representing the family C is
$(x + a)^2 + (y - a)^2 = a^2$ ... (1)
or $x^2 + y^2 + 2ax - 2ay + a^2 = 0$ ... (2)
Differentiating equation (2) with respect to x, we get
$2x + 2y \frac{dy}{dx} + 2a - 2a \frac{dy}{dx} = 0$
or $\frac{dy}{dx} (y - a) = -(x + a)$
or $a = \frac{x + y y'}{y' - 1}$
Substituting the value of a in equation (1), we get
$\left[ x + \frac{x + y y'}{y' - 1} \right]^2 + \left[ y - \frac{x + y y'}{y' - 1} \right]^2 = \left[ \frac{x + y y'}{y' - 1} \right]^2$
or $[xy' - x + x + y y']^2 + [y y' - y - x - y y']^2 = [x + y y']^2$
or $(x + y)^2 (y')^2 + [x + y]^2 = [x + y y']^2$
or $(x + y)^2 [(y')^2 + 1] = [x + y y']^2$
which is the differential equation representing the given family of circles.

**Example 26** Find the particular solution of the differential equation $\frac{dy}{dx} = e^{3x + 4y}$ given that $y = 0$ when $x = 0$.
**Solution** The given differential equation can be written as
$\frac{dy}{dx} = e^{3x} \cdot e^{4y}$ ... (1)
Separating the variables, we get
$e^{-4y} dy = e^{3x} dx$
Therefore
$\int e^{-4y} dy = \int e^{3x} dx$
or $\frac{e^{-4y}}{-4} = \frac{e^{3x}}{3} + C$
or $4e^{3x} + 3e^{-4y} + 12C = 0$ ... (2)
Substituting $x = 0$ and $y = 0$ in (2), we get
$4 + 3 + 12C = 0$ or $C = -\frac{7}{12}$
Substituting the value of C in equation (2), we get
$4e^{3x} + 3e^{-4y} - 7 = 0$,
which is a particular solution of the given differential equation.

**Example 27** Solve the differential equation
$(x dy - y dx) y \sin(\frac{y}{x}) = (y dx + x dy) x \cos(\frac{y}{x})$.
**Solution** The given differential equation can be written as
$x y \sin(\frac{y}{x}) dy - y^2 \sin(\frac{y}{x}) dx = y x \cos(\frac{y}{x}) dx + x^2 \cos(\frac{y}{x}) dy$
or $\frac{dy}{dx} = \frac{y x \cos(\frac{y}{x}) + y^2 \sin(\frac{y}{x})}{x y \sin(\frac{y}{x}) - x^2 \cos(\frac{y}{x})}$
Dividing numerator and denominator on RHS by $x^2$, we get
$\frac{dy}{dx} = \frac{\frac{y}{x} \cos(\frac{y}{x}) + (\frac{y}{x})^2 \sin(\frac{y}{x})}{\frac{y}{x} \sin(\frac{y}{x}) - \cos(\frac{y}{x})}$ ... (1)
Clearly, equation (1) is a homogeneous differential equation of the form $\frac{dy}{dx} = f(\frac{y}{x})$.
To solve it, we make the substitution
$y = vx$ ... (2)
or $\frac{dy}{dx} = v + x \frac{dv}{dx}$
