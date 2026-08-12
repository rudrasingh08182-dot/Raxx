---
type: concept
title: Solving Homogeneous Differential Equations and Tangent Slopes
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

DIFFERENTIAL EQUATIONS 403

or $\sin v = \log |x| + \log |C|$

or $\sin v = \log |Cx|$

Replacing $v$ by $\frac{y}{x}$, we get

$\sin \left( \frac{y}{x} \right) = \log |Cx|$

which is the general solution of the differential equation (1).

**Example 17** Show that the differential equation $\left( x - y \frac{e^{x/y}}{y} \right) dx + x e^{x/y} dy = 0$ is homogeneous and find its particular solution, given that $x = 0$ when $y = 1$.

**Solution** The given differential equation can be written as

$\frac{dx}{dy} = \frac{x e^{x/y} - y}{x e^{x/y}}$ ... (1)

Let $F(x, y) = \frac{x e^{x/y} - y}{x e^{x/y}}$

Then $F(\lambda x, \lambda y) = \frac{\lambda x e^{\lambda x / \lambda y} - \lambda y}{\lambda x e^{\lambda x / \lambda y}} = \lambda^0 \left[ \frac{x e^{x/y} - y}{x e^{x/y}} \right] = F(x, y)$

Thus, $F(x, y)$ is a homogeneous function of degree zero. Therefore, the given differential equation is a homogeneous differential equation.

To solve it, we make the substitution

$x = vy$ ... (2)

Differentiating equation (2) with respect to $y$, we get

$\frac{dx}{dy} = v + y \frac{dv}{dy}$

MATHEMATICS 404

Substituting the value of $x$ and $\frac{dx}{dy}$ in equation (1), we get

$v + y \frac{dv}{dy} = \frac{ve^v - 1}{e^v}$

or $y \frac{dv}{dy} = \frac{ve^v - 1}{e^v} - v$

or $y \frac{dv}{dy} = \frac{-1}{e^v}$

or $e^v dv = -\frac{dy}{y}$

or $\int e^v dv = -\int \frac{dy}{y}$

or $e^v = -\log |y| + C$

and replacing $v$ by $\frac{x}{y}$, we get

$e^{x/y} + \log |y| = C$ ... (3)

Substituting $x = 0$ and $y = 1$ in equation (3), we get

$e^0 + \log |1| = C \implies C = 1$

Substituting the value of $C$ in equation (3), we get

$e^{x/y} + \log |y| = 1$

which is the particular solution of the given differential equation.

**Example 18** Show that the family of curves for which the slope of the tangent at any point $(x, y)$ on it is $\frac{x^2 + y^2}{2xy}$, is given by $x^2 - y^2 = cx$.

**Solution** We know that the slope of the tangent at any point on a curve is $\frac{dy}{dx}$.

Therefore, $\frac{dy}{dx} = \frac{x^2 + y^2}{2xy}$
