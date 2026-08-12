---
type: concept
title: 'Homogeneous Differential Equations: Concepts and Solutions'
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: concept
tags:
- mathematics
- calculus
- differential-equations
- DIFFERENTIAL  EQUATIONS
- homogeneous-functions
- class12
- Maths
---

### MATHEMATICS

We also observe that:
$F_1(x, y) = x^2 \left( \frac{y}{x} \right)^2 + 2xy + y^2$ or $F_1(x, y) = y^2 \left( \frac{x}{y} \right)^2 + 2xy + x^2$

$F_2(x, y) = x^3 \left( \frac{y}{x} \right)^3 - y^2 \left( \frac{x}{y} \right)^2$

$F_3(x, y) = x^5 \cos \left( \frac{y}{x} \right)$

$F_4(x, y) \neq x^n \left( \frac{y}{x} \right)$, for any $n \in N$ or $F_4(x, y) \neq y^n \left( \frac{x}{y} \right)$, for any $n \in N$

Therefore, a function $F(x, y)$ is a homogeneous function of degree $n$ if $F(x, y) = x^n g(y/x)$ or $F(x, y) = y^n h(x/y)$.

A differential equation of the form $\frac{dy}{dx} = F(x, y)$ is said to be homogeneous if $F(x, y)$ is a homogeneous function of degree zero.

To solve a homogeneous differential equation of the type:
$\frac{dy}{dx} = F(x, y) = g\left( \frac{y}{x} \right)$ ... (1)

We make the substitution $y = vx$ ... (2)

Differentiating equation (2) with respect to $x$, we get:
$\frac{dy}{dx} = v + x \frac{dv}{dx}$ ... (3)

Substituting the value of $\frac{dy}{dx}$ from equation (3) in equation (1), we get:
$v + x \frac{dv}{dx} = g(v)$

or $x \frac{dv}{dx} = g(v) - v$ ... (4)

Separating the variables in equation (4), we get:
$\frac{dv}{g(v) - v} = \frac{dx}{x}$ ... (5)

Integrating both sides of equation (5), we get:
$\int \frac{dv}{g(v) - v} = \int \frac{dx}{x} + C$ ... (6)

Equation (6) gives the general solution (primitive) of the differential equation (1) when we replace $v$ by $\frac{y}{x}$.

**Note:** If the homogeneous differential equation is in the form $\frac{dx}{dy} = F(x, y)$, where $F(x, y)$ is a homogeneous function of degree zero, then we make the substitution $x = vy$ i.e., $x = vy$ and we proceed further to find the general solution as discussed above by writing $\frac{dx}{dy} = h\left( \frac{x}{y} \right)$.

**Example 15:** Show that the differential equation $(x - y) \frac{dy}{dx} = x + 2y$ is homogeneous and solve it.

**Solution:** The given differential equation can be expressed as:
$\frac{dy}{dx} = \frac{x + 2y}{x - y}$ ... (1)

Let $F(x, y) = \frac{x + 2y}{x - y}$

Now $F(\lambda x, \lambda y) = \lambda^0 F(x, y) = \frac{\lambda x + 2\lambda y}{\lambda x - \lambda y}$
