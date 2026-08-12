---
type: concept
title: Solving Linear Differential Equations and Order/Degree Analysis
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: solved-example
tags:
- linear-differential-equation
- integration-factor
- mathematics
- calculus
- differential-equations
- DIFFERENTIAL  EQUATIONS
- class12
- Maths
---

### Solving Differential Equations

$\frac{dv}{dx} = \frac{2 \cos v - v \sin v}{\cos v}$ (using (1) and (2))

or $\frac{dv}{dx} = \frac{2 \cos v - v \sin v}{\cos v}$

or $\left( \frac{\cos v}{2 \cos v - v \sin v} \right) dv = \frac{dx}{x}$

Therefore, $\int \left( \frac{\cos v}{2 \cos v - v \sin v} \right) dv = \int \frac{1}{2} \frac{dx}{x}$

or $\int \frac{1}{v} dv - \int \tan v dv = \int \frac{1}{2} \frac{dx}{x}$

or $\log |v| - \log |\sec v| = \frac{1}{2} \log |x| + \log |C_1|$

or $\log \left| \frac{v}{\sec v} \right| = \log |C_1 \sqrt{x}|$

or $\frac{v}{\sec v} = \pm C_1 \sqrt{x} ... (3)$

Replacing $v$ by $\frac{y}{x}$ in equation (3), we get

$\frac{y/x}{\sec(y/x)} = C \sqrt{x}$ where, $C = \pm C_1$

or $\sec \left( \frac{y}{x} \right) = C \frac{y}{x \sqrt{x}}$

which is the general solution of the given differential equation.

**Example 28** Solve the differential equation $( \tan^{-1} y - x) dy = (1 + y^2) dx$.

**Solution** The given differential equation can be written as

$\frac{dx}{dy} + \frac{x}{1 + y^2} = \frac{\tan^{-1} y}{1 + y^2} ... (1)$

Now (1) is a linear differential equation of the form $\frac{dx}{dy} + P_1 x = Q_1$, where $P_1 = \frac{1}{1 + y^2}$ and $Q_1 = \frac{\tan^{-1} y}{1 + y^2}$.

Therefore, $I.F = e^{\int \frac{1}{1 + y^2} dy} = e^{\tan^{-1} y}$.

Thus, the solution of the given differential equation is

$x e^{\tan^{-1} y} = \int \left( \frac{\tan^{-1} y}{1 + y^2} \right) e^{\tan^{-1} y} dy + C ... (2)$

Let $I = \int \left( \frac{\tan^{-1} y}{1 + y^2} \right) e^{\tan^{-1} y} dy$.

Substituting $\tan^{-1} y = t$ so that $\frac{1}{1 + y^2} dy = dt$, we get

$I = \int t e^t dt = t e^t - \int 1 \cdot e^t dt = t e^t - e^t = e^t (t - 1)$

or $I = e^{\tan^{-1} y} (\tan^{-1} y - 1)$

Substituting the value of $I$ in equation (2), we get

$x e^{\tan^{-1} y} = e^{\tan^{-1} y} (\tan^{-1} y - 1) + C$

or $x = (\tan^{-1} y - 1) + C e^{-\tan^{-1} y}$

which is the general solution of the given differential equation.

### Miscellaneous Exercise on Chapter 9

1. For each of the differential equations given below, indicate its order and degree (if defined).

(i) $\left( \frac{d^2y}{dx^2} \right)^2 + 5 \left( \frac{dy}{dx} \right)^6 - 6 \log x = y$

(ii) $\left( \frac{d^3y}{dx^3} \right)^4 + 7 \left( \frac{dy}{dx} \right)^2 - \sin y = 0$

(iii) $\left( \frac{d^4y}{dx^4} \right)^3 - 4 \sin \left( \frac{dy}{dx} \right) = 0$
