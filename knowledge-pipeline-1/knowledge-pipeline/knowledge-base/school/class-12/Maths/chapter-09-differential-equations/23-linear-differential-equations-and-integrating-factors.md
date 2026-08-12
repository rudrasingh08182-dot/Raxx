---
type: concept
title: Linear Differential Equations and Integrating Factors
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: concept
tags:
- mathematics
- integrating-factor
- differential-equations
- DIFFERENTIAL  EQUATIONS
- class12
- Maths
- linear-differential-equations
---

### DIFFERENTIAL EQUATIONS

17. Which of the following is a homogeneous differential equation?
(A) $(4x + 6y + 5) dy - (3y + 2x + 4) dx = 0$
(B) $(xy) dx - (x^3 + y^3) dy = 0$
(C) $(x^3 + 2y^2) dx + 2xy dy = 0$
(D) $y^2 dx + (x^2 - xy - y^2) dy = 0$

### 9.5.3 Linear differential equations
A differential equation of the form
$\frac{dy}{dx} + Py = Q$
where $P$ and $Q$ are constants or functions of $x$ only, is known as a first order linear differential equation. Some examples of the first order linear differential equation are:
$\frac{dy}{dx} + y = \sin x$
$\frac{dy}{dx} + \left(\frac{1}{x}\right)y = e^x$
$\frac{dy}{dx} + \left(\frac{y}{x}\right) = \frac{1}{x}$

Another form of first order linear differential equation is
$\frac{dx}{dy} + P_1x = Q_1$
where $P_1$ and $Q_1$ are constants or functions of $y$ only. Some examples of this type of differential equation are:
$\frac{dx}{dy} + x = \cos y$
$\frac{dx}{dy} - \left(\frac{x}{y}\right) = y^2 e^{-y}$

To solve the first order linear differential equation of the type
$\frac{dy}{dx} + Py = Q$ ... (1)
Multiply both sides of the equation by a function of $x$ say $g(x)$ to get
$g(x) \frac{dy}{dx} + P \cdot g(x)y = Q \cdot g(x)$ ... (2)

Choose $g(x)$ in such a way that R.H.S. becomes a derivative of $y \cdot g(x)$.
i.e., $g(x) \frac{dy}{dx} + P \cdot g(x)y = \frac{d}{dx} [y \cdot g(x)]$
or $g(x) \frac{dy}{dx} + P \cdot g(x)y = g(x) \frac{dy}{dx} + y g'(x)$
$\Rightarrow P \cdot g(x) = g'(x)$
or $P = \frac{g'(x)}{g(x)}$

Integrating both sides with respect to $x$, we get
$\int P dx = \int \frac{g'(x)}{g(x)} dx$
or $\int P dx = \log(g(x))$
or $g(x) = e^{\int P dx}$

On multiplying the equation (1) by $g(x) = e^{\int P dx}$, the L.H.S. becomes the derivative of some function of $x$ and $y$. This function $g(x) = e^{\int P dx}$ is called Integrating Factor (I.F.) of the given differential equation.

Substituting the value of $g(x)$ in equation (2), we get
$\frac{d}{dx} [y e^{\int P dx}] = Q e^{\int P dx}$

Integrating both sides with respect to $x$, we get
$y e^{\int P dx} = \int (Q e^{\int P dx}) dx + C$
or $y = e^{-\int P dx} \int (Q e^{\int P dx}) dx + C e^{-\int P dx}$
which is the general solution of the differential equation.
