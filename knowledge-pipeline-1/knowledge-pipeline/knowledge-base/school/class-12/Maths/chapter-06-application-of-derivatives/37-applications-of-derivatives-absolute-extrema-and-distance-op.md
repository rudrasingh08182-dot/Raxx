---
type: concept
title: 'Applications of Derivatives: Absolute Extrema and Distance Optimization'
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: solved-example
tags:
- optimization-problems
- APPLICATION OF DERIVATIVES
- calculus-problems
- application-of-derivatives
- absolute-maxima-minima
- class12
- Maths
---

APPLICATION OF DERIVATIVES 231

$f\left(\frac{1}{8}\right) = \frac{4}{3}\left(\frac{1}{8}\right)^3 - \frac{1}{3}\left(\frac{1}{8}\right) = \frac{1}{912} - \frac{68}{8} = -\frac{4}{3}$

$f(1) = \frac{4}{3}(1)^3 - 6(1) = -\frac{12}{3} = -4$

Hence, we conclude that absolute maximum value of $f$ is 18 that occurs at $x = -1$ and absolute minimum value of $f$ is $-\frac{9}{4}$ that occurs at $x = \frac{1}{8}$.

**Example 41** An Apache helicopter of enemy is flying along the curve given by $y = x^2 + 7$. A soldier, placed at (3, 7), wants to shoot down the helicopter when it is nearest to him. Find the nearest distance.

**Solution** For each value of $x$, the helicopter’s position is at point $(x, x^2 + 7)$. Therefore, the distance between the helicopter and the soldier placed at (3, 7) is $\sqrt{(x - 3)^2 + (x^2 + 7 - 7)^2}$, i.e., $\sqrt{(x - 3)^2 + x^4}$.

Let $f(x) = (x - 3)^2 + x^4$

or $f'(x) = 2(x - 3) + 4x^3 = 2(x - 1)(2x^2 + 2x + 3)$

Thus, $f'(x) = 0$ gives $x = 1$ or $2x^2 + 2x + 3 = 0$ for which there are no real roots.

Also, there are no end points of the interval to be added to the set for which $f'$ is zero, i.e., there is only one point, namely, $x = 1$. The value of $f$ at this point is given by $f(1) = (1 - 3)^2 + (1)^4 = 5$. Thus, the distance between the soldier and the helicopter is $\sqrt{f(1)} = \sqrt{5}$.

Note that $\sqrt{5}$ is either a maximum value or a minimum value. Since $f(0) = (0 - 3)^2 + (0)^4 = 9 > 5$, it follows that $\sqrt{5}$ is the minimum value of $f(x)$. Hence, $\sqrt{5}$ is the minimum distance between the soldier and the helicopter.

**EXERCISE 6.5**

1. Find the maximum and minimum values, if any, of the following functions given by:
(i) $f(x) = (2x - 1)^2 + 3$
(ii) $f(x) = 9x^2 + 12x + 2$
(iii) $f(x) = -(x - 1)^2 + 10$
(iv) $g(x) = x^3 + 1$
