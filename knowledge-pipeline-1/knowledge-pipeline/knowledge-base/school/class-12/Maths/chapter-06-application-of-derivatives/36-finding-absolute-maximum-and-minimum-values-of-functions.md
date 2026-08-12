---
type: concept
title: Finding Absolute Maximum and Minimum Values of Functions
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: solved-example
tags:
- APPLICATION OF DERIVATIVES
- class12
- mathematics
- critical-points
- calculus
- optimization
- Maths
- absolute-extrema
---

### Example 39
Find the absolute maximum and minimum values of a function $f$ given by $f(x) = 2x^3 - 15x^2 + 36x + 1$ on the interval $[1, 5]$.

**Solution**
We have $f(x) = 2x^3 - 15x^2 + 36x + 1$
$f'(x) = 6x^2 - 30x + 36 = 6(x - 3)(x - 2)$
Note that $f'(x) = 0$ gives $x = 2$ and $x = 3$.

We shall now evaluate the value of $f$ at these points and at the end points of the interval $[1, 5]$, i.e., at $x = 1, x = 2, x = 3$ and at $x = 5$. So:
$f(1) = 2(1)^3 - 15(1)^2 + 36(1) + 1 = 24$
$f(2) = 2(2)^3 - 15(2)^2 + 36(2) + 1 = 29$
$f(3) = 2(3)^3 - 15(3)^2 + 36(3) + 1 = 28$
$f(5) = 2(5)^3 - 15(5)^2 + 36(5) + 1 = 56$

Thus, we conclude that absolute maximum value of $f$ on $[1, 5]$ is $56$, occurring at $x = 5$, and absolute minimum value of $f$ on $[1, 5]$ is $24$ which occurs at $x = 1$.

### Example 40
Find absolute maximum and minimum values of a function $f$ given by $f(x) = 3x^{4/3} - 12x^{1/3}, x \in [-1, 1]$.

**Solution**
We have $f(x) = 3x^{4/3} - 12x^{1/3}$
$f'(x) = 4x^{1/3} - 4x^{-2/3} = 4x^{-2/3}(x - 1) = \frac{4(x - 1)}{x^{2/3}}$

Thus, $f'(x) = 0$ gives $x = 1$. Further note that $f'(x)$ is not defined at $x = 0$. So the critical points are $x = 0$ and $x = 1$. Now evaluating the value of $f$ at critical points $x = 0, x = 1$ and at end points of the interval $x = -1$ and $x = 1$, we have:
$f(-1) = 3(-1)^{4/3} - 12(-1)^{1/3} = 3(1) - 12(-1) = 3 + 12 = 15$
$f(0) = 3(0)^{4/3} - 12(0)^{1/3} = 0$
