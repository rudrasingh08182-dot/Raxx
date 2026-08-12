---
type: concept
title: 'Applications of Derivatives: Optimization and Rate of Change'
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: solved-example
tags:
- derivatives
- APPLICATION OF DERIVATIVES
- maxima-minima
- class12
- rate-of-change
- calculus
- optimization
- Maths
---

### Rate of Change of Area

Solution: Let $r$ be the radius of the given disc and $A$ be its area. Then
$A = \pi r^2$
$\frac{dA}{dt} = 2\pi r \frac{dr}{dt}$ (by Chain Rule)

Now, approximate rate of increase of radius = $\frac{dr}{dt} = 0.05$ cm/s. Therefore, the approximate rate of increase in area is given by
$\frac{dA}{dt} = 2\pi r \frac{dr}{dt}$
$= 2\pi (3.2) (0.05) = 0.320\pi$ cm$^2$/s (for $r = 3.2$ cm)

### Example 50: Largest Volume of an Open-Topped Box

An open-topped box is to be constructed by removing equal squares from each corner of a 3 metre by 8 metre rectangular sheet of aluminium and folding up the sides. Find the volume of the largest such box.

**Solution:** Let $x$ metre be the length of a side of the removed squares. Then, the height of the box is $x$, length is $8 - 2x$ and breadth is $3 - 2x$ (Fig 6.25). If $V(x)$ is the volume of the box, then

$V(x) = x(3 - 2x)(8 - 2x)$
$= 4x^3 - 22x^2 + 24x$

Therefore,
$V'(x) = 12x^2 - 44x + 24 = 4(3x^2 - 11x + 6) = 4(x - 3)(3x - 2)$
$V''(x) = 24x - 44$

Now $V'(x) = 0$ gives $x = 3, x = 2/3$. But $x \neq 3$ (Why?)

Thus, we have $x = 2/3$. Now $V''(2/3) = 24(2/3) - 44 = 16 - 44 = -28 < 0$.

Therefore, $x = 2/3$ is the point of maxima, i.e., if we remove a square of side $2/3$ metre from each corner of the sheet and make a box from the remaining sheet, then the volume of the box such obtained will be the largest and it is given by
$V(2/3) = 4(2/3)^3 - 22(2/3)^2 + 24(2/3) = 200/27$ m$^3$

### Example 51: Maximum Profit Calculation

Manufacturer can sell $x$ items at a price of rupees $(5 - x/100)$ each. The cost price of $x$ items is Rs $(x/5 + 500)$. Find the number of items he should sell to earn maximum profit.

**Solution:** Let $S(x)$ be the selling price of $x$ items and let $C(x)$ be the cost price of $x$ items. Then, we have
$S(x) = x(5 - x/100) = 5x - x^2/100$
and $C(x) = x/5 + 500$

Thus, the profit function $P(x)$ is given by
$P(x) = S(x) - C(x) = 5x - x^2/100 - x/5 - 500$
i.e., $P(x) = -x^2/100 + 24x/5 - 500$
or $P'(x) = -x/50 + 24/5$

Now $P'(x) = 0$ gives $x = 240$. Also $P''(x) = -1/50$. So $P''(240) = -1/50 < 0$.

Thus, $x = 240$ is a point of maxima. Hence, the manufacturer can earn maximum profit, if he sells 240 items.
