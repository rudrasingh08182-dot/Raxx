---
type: concept
title: Solving First Order Linear Differential Equations
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
- calculus
- DIFFERENTIAL  EQUATIONS
- class12
- Maths
- linear-differential-equations
---

### Steps involved to solve first order linear differential equation:

(i) Write the given differential equation in the form $\frac{dy}{dx} + Py = Q$, where $P, Q$ are constants or functions of $x$ only.
(ii) Find the Integrating Factor (I.F) = $e^{\int P dx}$.
(iii) Write the solution of the given differential equation as $y \cdot (I.F) = \int (Q \times I.F) dx + C$.

In case, the first order linear differential equation is in the form $\frac{dx}{dy} + P_1x = Q_1$, where $P_1$ and $Q_1$ are constants or functions of $y$ only. Then $I.F = e^{\int P_1 dy}$ and the solution of the differential equation is given by $x \cdot (I.F) = \int (Q_1 \times I.F) dy + C$.

**Example 19:** Find the general solution of the differential equation $\frac{dy}{dx} - y = \cos x$.

**Solution:** Given differential equation is of the form $\frac{dy}{dx} + Py = Q$, where $P = -1$ and $Q = \cos x$.
Therefore $I.F = e^{\int -1 dx} = e^{-x}$.
Multiplying both sides of equation by I.F, we get $e^{-x} \frac{dy}{dx} - e^{-x} y = e^{-x} \cos x$ or $\frac{d}{dx} (y e^{-x}) = e^{-x} \cos x$.
On integrating both sides with respect to $x$, we get $y e^{-x} = \int e^{-x} \cos x dx + C$ ... (1).
Let $I = \int e^{-x} \cos x dx = \cos x (-e^{-x}) - \int (-\sin x) (-e^{-x}) dx = -e^{-x} \cos x - \int e^{-x} \sin x dx$.
$= -e^{-x} \cos x - [\sin x (-e^{-x}) - \int \cos x (-e^{-x}) dx] = -e^{-x} \cos x + e^{-x} \sin x - \int e^{-x} \cos x dx$.
Or $I = -e^{-x} \cos x + e^{-x} \sin x - I$.
Or $2I = e^{-x} (\sin x - \cos x)$.
Or $I = \frac{e^{-x} (\sin x - \cos x)}{2}$.
Substituting the value of $I$ in equation (1), we get $y e^{-x} = \frac{e^{-x} (\sin x - \cos x)}{2} + C$.
Or $y = \frac{\sin x - \cos x}{2} + C e^x$, which is the general solution of the given differential equation.

**Example 20:** Find the general solution of the differential equation $x \frac{dy}{dx} + 2y = x^2 (x \neq 0)$.

**Solution:** The given differential equation is $x \frac{dy}{dx} + 2y = x^2$ ... (1).
Dividing both sides of equation (1) by $x$, we get $\frac{dy}{dx} + \frac{2}{x} y = x$, which is a linear differential equation of the type $\frac{dy}{dx} + Py = Q$, where $P = \frac{2}{x}$ and $Q = x$.
So $I.F = e^{\int \frac{2}{x} dx} = e^{2 \log x} = e^{\log x^2} = x^2$ (as $e^{\log f(x)} = f(x)$).
Therefore, solution of the given equation is given by $y \cdot x^2 = \int (x \cdot x^2) dx + C = \int x^3 dx + C = \frac{x^4}{4} + C$.
Or $y = \frac{x^2}{4} + \frac{C}{x^2}$, which is the general solution of the given differential equation.
