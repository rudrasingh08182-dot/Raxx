---
type: concept
title: Finding Local Maxima and Minima using Derivatives
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: solved-example
tags:
- local-maxima
- APPLICATION OF DERIVATIVES
- second-derivative-test
- class12
- local-minima
- mathematics
- calculus
- first-derivative-test
- Maths
---

To the right of 0, $f(x) = 3 + x$ and so $f'(x) = 1 > 0$. Therefore, by first derivative test, $x = 0$ is a point of local minima of $f$ and local minimum value of $f$ is $f(0) = 3$.

**Example 32** Find local maximum and local minimum values of the function $f$ given by $f(x) = 3x^4 + 4x^3 - 12x^2 + 12$.

**Solution** We have $f(x) = 3x^4 + 4x^3 - 12x^2 + 12$
$f'(x) = 12x^3 + 12x^2 - 24x = 12x(x - 1)(x + 2)$
$f'(x) = 0$ at $x = 0, x = 1$ and $x = -2$.
Now $f''(x) = 36x^2 + 24x - 24 = 12(3x^2 + 2x - 2)$

| Point | $f''(x)$ value | Result |
| :--- | :--- | :--- |
| $f''(0)$ | $-24 < 0$ | Local Maxima |
| $f''(1)$ | $36 > 0$ | Local Minima |
| $f''(-2)$ | $72 > 0$ | Local Minima |

Therefore, by second derivative test, $x = 0$ is a point of local maxima and local maximum value of $f$ at $x = 0$ is $f(0) = 12$ while $x = 1$ and $x = -2$ are the points of local minima and local minimum values of $f$ at $x = 1$ and $-2$ are $f(1) = 7$ and $f(-2) = -20$, respectively.

**Example 33** Find all the points of local maxima and local minima of the function $f$ given by $f(x) = 2x^3 - 6x^2 + 6x + 5$.

**Solution** We have $f(x) = 2x^3 - 6x^2 + 6x + 5$
$f'(x) = 6x^2 - 12x + 6 = 6(x - 1)^2$
$f''(x) = 12(x - 1)$

Now $f'(x) = 0$ gives $x = 1$. Also $f''(1) = 0$. Therefore, the second derivative test fails in this case. So, we shall go back to the first derivative test.
We have already seen (Example 30) that, using first derivative test, $x = 1$ is neither a point of local maxima nor a point of local minima and so it is a point of inflexion.

**Example 34** Find two positive numbers whose sum is 15 and the sum of whose squares is minimum.

**Solution** Let one of the numbers be $x$. Then the other number is $(15 - x)$. Let $S(x)$ denote the sum of the squares of these numbers. Then
