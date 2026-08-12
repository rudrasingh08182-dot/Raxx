---
type: concept
title: Relationship Between Zeroes and Coefficients of Polynomials
category: school
subject: Maths
level: class-11
chapter: 2
chapter_name: POLYNOMIALS
content_type: solved-example
tags:
- Maths
- class12
- cubic-polynomial
- polynomials
- POLYNOMIALS
- quadratic-polynomial
- mathematics
- zeroes-of-polynomial
---

### Example 4: Find a quadratic polynomial, the sum and product of whose zeroes are –3 and 2, respectively.

**Solution:** Let the quadratic polynomial be $ax^2 + bx + c$, and its zeroes be $\alpha$ and $\beta$.
We have
$\alpha + \beta = -3 = -\frac{b}{a}$,
and $\alpha\beta = 2 = \frac{c}{a}$.

If $a = 1$, then $b = 3$ and $c = 2$.
So, one quadratic polynomial which fits the given conditions is $x^2 + 3x + 2$.
You can check that any other quadratic polynomial that fits these conditions will be of the form $k(x^2 + 3x + 2)$, where $k$ is real.

Let us now look at cubic polynomials. Do you think a similar relation holds between the zeroes of a cubic polynomial and its coefficients?
Let us consider $p(x) = 2x^3 - 5x^2 - 14x + 8$.
You can check that $p(x) = 0$ for $x = 4, -2, \frac{1}{2}$. Since $p(x)$ can have at most three zeroes, these are the zeroes of $2x^3 - 5x^2 - 14x + 8$. Now,

Sum of the zeroes = $4 + (-2) + \frac{1}{2} = \frac{5}{2} = -\frac{(-5)}{2} = -\frac{\text{Coefficient of } x^2}{\text{Coefficient of } x^3}$,

Product of the zeroes = $4 \times (-2) \times \frac{1}{2} = -4 = -\frac{8}{2} = -\frac{\text{Constant term}}{\text{Coefficient of } x^3}$.

However, there is one more relationship here. Consider the sum of the products of the zeroes taken two at a time. We have

$\{4 \times (-2)\} + \{(-2) \times \frac{1}{2}\} + \{\frac{1}{2} \times 4\}$
$= -8 - 1 + 2 = -7 = \frac{-14}{2} = \frac{\text{Coefficient of } x}{\text{Coefficient of } x^3}$.

In general, it can be proved that if $\alpha, \beta, \gamma$ are the zeroes of the cubic polynomial $ax^3 + bx^2 + cx + d$, then
