---
type: concept
title: Solving Differential Equations by Variable Separation
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
- variable-separation
- class12
- Maths
---

### Solution
The given differential equation can be expressed as:
$\frac{dy}{dx} = 2x + \frac{1}{x}$ ... (1)

Integrating both sides of equation (1), we get:
$\int dy = \int (2x + \frac{1}{x}) dx$

or $y = x^2 + \log |x| + C$ ... (2)

Equation (2) represents the family of solution curves of the given differential equation, but we are interested in finding the equation of a particular member of the family which passes through the point (1, 1). Therefore, substituting $x = 1, y = 1$ in equation (2), we get $C = 0$.

Now substituting the value of $C$ in equation (2), we get the equation of the required curve as $y = x^2 + \log |x|$.

**Example 13:** Find the equation of a curve passing through the point (-2, 3), given that the slope of the tangent to the curve at any point $(x, y)$ is $\frac{2x}{y^2}$.

**Solution:** We know that the slope of the tangent to a curve is given by $\frac{dy}{dx}$.
So, $\frac{dy}{dx} = \frac{2x}{y^2}$ ... (1)

Separating the variables, equation (1) can be written as:
$y^2 dy = 2x dx$ ... (2)

Integrating both sides of equation (2), we get:
$\int y^2 dy = \int 2x dx$

or $\frac{y^3}{3} = x^2 + C$ ... (3)

* The notation $\frac{dy}{dx}$ due to Leibnitz is extremely flexible and useful in many calculations and formal transformations, where we can deal with symbols $dy$ and $dx$ exactly as if they were ordinary numbers. By treating $dx$ and $dy$ like separate entities, we can give neater expressions to many calculations.

Refer: Introduction to Calculus and Analysis, volume-I page 172, By Richard Courant, Fritz John Springer – Verlag New York.
