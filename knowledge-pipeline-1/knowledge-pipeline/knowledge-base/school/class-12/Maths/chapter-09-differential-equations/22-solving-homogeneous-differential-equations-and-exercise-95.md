---
type: concept
title: Solving Homogeneous Differential Equations and Exercise 9.5
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: concept
tags:
- calculus
- differential-equations
- mathematics-exercise
- DIFFERENTIAL  EQUATIONS
- homogeneous-equations
- class12
- Maths
---

### DIFFERENTIAL EQUATIONS

$\frac{dy}{dx} = \frac{x^2 + y^2}{2xy}$ ... (1)

Clearly, (1) is a homogeneous differential equation. To solve it we make substitution $y = vx$.
Differentiating $y = vx$ with respect to $x$, we get:
$\frac{dy}{dx} = v + x \frac{dv}{dx}$

or $v + x \frac{dv}{dx} = \frac{x^2 + v^2x^2}{2x(vx)} = \frac{1 + v^2}{2v}$

or $x \frac{dv}{dx} = \frac{1 + v^2}{2v} - v = \frac{1 + v^2 - 2v^2}{2v} = \frac{1 - v^2}{2v}$

or $\frac{2v}{1 - v^2} dv = \frac{dx}{x}$

Therefore, $\int \frac{2v}{1 - v^2} dv = \int \frac{dx}{x}$

or $\log |v^2 - 1| = - \log |x| + \log |C_1|$

or $\log |(v^2 - 1)(x)| = \log |C_1|$

or $(v^2 - 1)x = \pm C_1$

Replacing $v$ by $\frac{y}{x}$, we get:
$(\frac{y^2}{x^2} - 1)x = \pm C_1$

or $(y^2 - x^2) = \pm C_1 x$ or $x^2 - y^2 = Cx$

---

### EXERCISE 9.5

In each of the Exercises 1 to 10, show that the given differential equation is homogeneous and solve each of them.

1. $(x^2 + xy) dy = (x^2 + y^2) dx$
2. $y' = \frac{x + y}{x}$
3. $(x - y) dy - (x + y) dx = 0$
4. $(x^2 - y^2) dx + 2xy dy = 0$
5. $\frac{dy}{dx} = \frac{x^2 + y^2}{2x^2}$
6. $x dy - y dx = \sqrt{x^2 + y^2} dx$
7. $\left( y \cos \frac{y}{x} + x \sin \frac{y}{x} \right) x dy = \left( x \sin \frac{y}{x} - y \cos \frac{y}{x} \right) y dx$
8. $\left( 1 + e^{x/y} \right) dx + e^{x/y} \left( 1 - \frac{x}{y} \right) dy = 0$
9. $y^2 dx + (x^2 - xy) dy = 0$
10. $(1 + e^{x/y}) dx + e^{x/y} (1 - x/y) dy = 0$

For each of the differential equations in Exercises from 11 to 15, find the particular solution satisfying the given condition:

11. $(x + y) dy + (x - y) dx = 0; y = 1$ when $x = 1$
12. $x^2 dy + (xy + y^2) dx = 0; y = 1$ when $x = 1$
13. $[x \sin^2(y/x) - y] dx + x dy = 0; y = \pi/4$ when $x = 1$
14. $\frac{dy}{dx} - \frac{y}{x} + \csc(y/x) = 0; y = 0$ when $x = 1$
15. $2xy + y^2 - 2x^2 \frac{dy}{dx} = 0; y = 2$ when $x = 1$

16. A homogeneous differential equation of the form $\frac{dy}{dx} = h(y/x)$ can be solved by making the substitution.
(A) $y = vx$ (B) $v = y/x$ (C) $x = vy$ (D) $x = v$
