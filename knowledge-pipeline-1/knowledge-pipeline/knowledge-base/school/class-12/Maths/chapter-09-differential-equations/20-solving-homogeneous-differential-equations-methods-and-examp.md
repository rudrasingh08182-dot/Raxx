---
type: concept
title: 'Solving Homogeneous Differential Equations: Methods and Examples'
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
- DIFFERENTIAL  EQUATIONS
- homogeneous-equations
- substitution-method
- class12
- Maths
---

Therefore, $F(x, y)$ is a homogenous function of degree zero. So, the given differential equation is a homogenous differential equation.

Alternatively,
$\frac{dy}{dx} = \frac{y}{x} + \phi \left( \frac{y}{x} \right) = g \left( \frac{y}{x} \right)$ ... (2)

R.H.S. of differential equation (2) is of the form $g \left( \frac{y}{x} \right)$ and so it is a homogeneous function of degree zero. Therefore, equation (1) is a homogeneous differential equation.

To solve it we make the substitution
$y = vx$ ... (3)

Differentiating equation (3) with respect to $x$, we get
$\frac{dy}{dx} = v + x \frac{dv}{dx}$ ... (4)

Substituting the value of $y$ and $\frac{dy}{dx}$ in equation (1) we get
$v + x \frac{dv}{dx} = \frac{1 + 2v}{1 - v}$

or $x \frac{dv}{dx} = \frac{1 + 2v}{1 - v} - v$

or $x \frac{dv}{dx} = \frac{1 + 2v - v + v^2}{1 - v} = \frac{v^2 + v + 1}{1 - v}$

or $\frac{1 - v}{v^2 + v + 1} dv = \frac{dx}{x}$

Integrating both sides of equation (5), we get
$= \int \frac{1 - v}{v^2 + v + 1} dv = \int \frac{dx}{x} = - \log |x| + C$

Replacing $v$ by $\frac{y}{x}$, we get
$\frac{1}{2} \log |v^2 + v + 1| - \frac{3}{2} \cdot \frac{2}{\sqrt{3}} \tan^{-1} \left( \frac{2v + 1}{\sqrt{3}} \right) = - \log |x| + C$

or $\frac{1}{2} \log \left( \frac{y^2}{x^2} + \frac{y}{x} + 1 \right) - \sqrt{3} \tan^{-1} \left( \frac{2y + x}{\sqrt{3}x} \right) = - \log |x| + C$

or $\frac{1}{2} \log \left( \frac{y^2 + xy + x^2}{x^2} \right) - \sqrt{3} \tan^{-1} \left( \frac{2y + x}{\sqrt{3}x} \right) = - \log |x| + C$

or $\frac{1}{2} \log (y^2 + xy + x^2) - \log |x| - \sqrt{3} \tan^{-1} \left( \frac{2y + x}{\sqrt{3}x} \right) = - \log |x| + C$

or $\frac{1}{2} \log (y^2 + xy + x^2) - \sqrt{3} \tan^{-1} \left( \frac{2y + x}{\sqrt{3}x} \right) = C$, which is the general solution of the differential equation (1).

**Example 16** Show that the differential equation $\frac{dy}{dx} = \frac{y}{x} + \sin \left( \frac{y}{x} \right)$ is homogeneous and solve it.

**Solution** The given differential equation can be written as
$\frac{dy}{dx} = \frac{y}{x} + \sin \left( \frac{y}{x} \right)$ ... (1)

It is a differential equation of the form $\frac{dy}{dx} = F(x, y)$.
Here $F(x, y) = \frac{y}{x} + \sin \left( \frac{y}{x} \right)$.
Replacing $x$ by $\lambda x$ and $y$ by $\lambda y$, we get
$F(\lambda x, \lambda y) = \frac{\lambda y}{\lambda x} + \sin \left( \frac{\lambda y}{\lambda x} \right) = \frac{y}{x} + \sin \left( \frac{y}{x} \right) = \lambda^0 [F(x, y)]$

Thus, $F(x, y)$ is a homogeneous function of degree zero.
Therefore, the given differential equation is a homogeneous differential equation.
To solve it we make the substitution
$y = vx$ ... (2)

Differentiating equation (2) with respect to $x$, we get
$\frac{dy}{dx} = v + x \frac{dv}{dx}$ ... (3)

Substituting the value of $y$ and $\frac{dy}{dx}$ in equation (1), we get
$v + x \frac{dv}{dx} = v + \sin v$

or $x \frac{dv}{dx} = \sin v$

or $\frac{dv}{\sin v} = \frac{dx}{x}$

Therefore $\int \csc v \, dv = \int \frac{dx}{x}$
