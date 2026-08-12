---
type: concept
title: Variable Separable Differential Equations and Solutions
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

If $F(x, y)$ can be expressed as a product $g(x)h(y)$, where $g(x)$ is a function of $x$ and $h(y)$ is a function of $y$, then the differential equation (1) is said to be of variable separable type. The differential equation (1) then has the form:

$\frac{dy}{dx} = h(y) \cdot g(x)$ ... (2)

If $h(y) \neq 0$, separating the variables, (2) can be rewritten as:

$\frac{1}{h(y)} dy = g(x) dx$ ... (3)

Integrating both sides of (3), we get:

$\int \frac{1}{h(y)} dy = \int g(x) dx$ ... (4)

Thus, (4) provides the solutions of given differential equation in the form:

$H(y) = G(x) + C$

Here, $H(y)$ and $G(x)$ are the anti-derivatives of $\frac{1}{h(y)}$ and $g(x)$ respectively and $C$ is the arbitrary constant.

**Example 9:** Find the general solution of the differential equation $\frac{dy}{dx} = \frac{x+1}{2-y}$, $(y \neq 2)$

**Solution:** We have

$\frac{dy}{dx} = \frac{x+1}{2-y}$ ... (1)

Separating the variables in equation (1), we get

$(2 - y) dy = (x + 1) dx$ ... (2)

Integrating both sides of equation (2), we get

$\int (2 - y) dy = \int (x + 1) dx$

or $2y - \frac{y^2}{2} = \frac{x^2}{2} + x + C_1$

or $x^2 + y^2 + 2x - 4y + 2C_1 = 0$

or $x^2 + y^2 + 2x - 4y + C = 0$, where $C = 2C_1$

which is the general solution of equation (1).
