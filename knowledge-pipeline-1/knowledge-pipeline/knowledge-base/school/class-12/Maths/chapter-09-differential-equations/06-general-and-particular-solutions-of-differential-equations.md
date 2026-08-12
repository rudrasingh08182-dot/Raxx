---
type: concept
title: General and Particular Solutions of Differential Equations
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
- particular-solution
- DIFFERENTIAL  EQUATIONS
- general-solution
- class12
- Maths
---

Function $\phi$ consists of two arbitrary constants (parameters) $a, b$ and it is called the general solution of the given differential equation. Whereas function $\phi_1$ contains no arbitrary constants but only the particular values of the parameters $a$ and $b$ and hence is called a particular solution of the given differential equation.

The solution which contains arbitrary constants is called the general solution (primitive) of the differential equation.

The solution free from arbitrary constants i.e., the solution obtained from the general solution by giving particular values to the arbitrary constants is called a particular solution of the differential equation.

**Example 2:** Verify that the function $y = e^{-3x}$ is a solution of the differential equation $\frac{d^2y}{dx^2} + \frac{dy}{dx} - 6y = 0$.

**Solution:** Given function is $y = e^{-3x}$. Differentiating both sides of equation with respect to $x$, we get:
$\frac{dy}{dx} = -3e^{-3x}$ ... (1)

Now, differentiating (1) with respect to $x$, we have:
$\frac{d^2y}{dx^2} = 9e^{-3x}$

Substituting the values of $\frac{d^2y}{dx^2}$, $\frac{dy}{dx}$ and $y$ in the given differential equation, we get:
L.H.S. = $9e^{-3x} + (-3e^{-3x}) - 6(e^{-3x}) = 9e^{-3x} - 9e^{-3x} = 0 = R.H.S.$

Therefore, the given function is a solution of the given differential equation.

**Example 3:** Verify that the function $y = a \cos x + b \sin x$, where $a, b \in R$ is a solution of the differential equation $\frac{d^2y}{dx^2} + y = 0$.

**Solution:** The given function is:
$y = a \cos x + b \sin x$ ... (1)

Differentiating both sides of equation (1) with respect to $x$, successively, we get:
$\frac{dy}{dx} = -a \sin x + b \cos x$
$\frac{d^2y}{dx^2} = -a \cos x - b \sin x$
