---
type: concept
title: Area Under Curves and Circle Integration
category: school
subject: Maths
level: class-12
chapter: 8
chapter_name: APPLICATION OF INTEGRALS
content_type: concept
tags:
- calculus
- mathematics
- Maths
- APPLICATION OF INTEGRALS
- definite-integrals
- class12
- area-under-curve
- integration
---

### Area Under Curves

This area is called the elementary area which is located at an arbitrary position within the region which is specified by some value of $x$ between $a$ and $b$. We can think of the total area $A$ of the region between $x$-axis, ordinates $x = a$, $x = b$ and the curve $y = f(x)$ as the result of adding up the elementary areas of thin strips across the region $PQRSP$. Symbolically, we express:

$A = \int_{a}^{b} y dx = \int_{a}^{b} f(x) dx$

The area $A$ of the region bounded by the curve $x = g(y)$, $y$-axis and the lines $y = c$, $y = d$ is given by:

$A = \int_{c}^{d} x dy = \int_{c}^{d} g(y) dy$

Here, we consider horizontal strips as shown in the Fig 8.2.

**Remark:** If the position of the curve under consideration is below the $x$-axis, then since $f(x) < 0$ from $x = a$ to $x = b$, as shown in Fig 8.3, the area bounded by the curve, $x$-axis and the ordinates $x = a$, $x = b$ come out to be negative. But, it is only the numerical value of the area which is taken into consideration. Thus, if the area is negative, we take its absolute value, i.e., $|\int_{a}^{b} f(x) dx|$.

Generally, it may happen that some portion of the curve is above $x$-axis and some is below the $x$-axis as shown in the Fig 8.4. Here, $A_1 < 0$ and $A_2 > 0$. Therefore, the area $A$ bounded by the curve $y = f(x)$, $x$-axis and the ordinates $x = a$ and $x = b$ is given by $A = |A_1| + A_2$.

### Example 1: Find the area enclosed by the circle $x^2 + y^2 = a^2$.

**Solution:** From Fig 8.5, the whole area enclosed by the given circle:
$= 4 \times$ (area of the region $AOBA$ bounded by the curve, $x$-axis and the ordinates $x = 0$ and $x = a$) [as the circle is symmetrical about both $x$-axis and $y$-axis]
$= 4 \int_{0}^{a} y dx$ (taking vertical strips)
$= 4 \int_{0}^{a} \sqrt{a^2 - x^2} dx$

Since $x^2 + y^2 = a^2$ gives $y = \pm \sqrt{a^2 - x^2}$. As the region $AOBA$ lies in the first quadrant, $y$ is taken as positive. Integrating, we get the whole area enclosed by the given circle:

$= 4 \left[ \frac{x}{2} \sqrt{a^2 - x^2} + \frac{a^2}{2} \sin^{-1} \frac{x}{a} \right]_{0}^{a}$
$= 4 \left[ \left( 0 + \frac{a^2}{2} \sin^{-1}(1) \right) - (0 + 0) \right] = 4 \left( \frac{a^2}{2} \cdot \frac{\pi}{2} \right) = \pi a^2$
