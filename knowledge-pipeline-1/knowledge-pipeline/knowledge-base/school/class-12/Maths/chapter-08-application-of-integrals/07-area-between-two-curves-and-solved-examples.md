---
type: concept
title: Area Between Two Curves and Solved Examples
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
- circle
- class12
- parabola
- area-between-curves
- integration
---

### APPLICATION OF INTEGRALS

For functions $y = f(x)$ and $y = g(x)$, the elementary area is $dA = [f(x) - g(x)] dx$, and the total area $A$ can be taken as:

$A = \int_{a}^{b} [f(x) - g(x)] dx$

Alternatively,

$A = [\text{area bounded by } y = f(x), x\text{-axis and the lines } x = a, x = b] - [\text{area bounded by } y = g(x), x\text{-axis and the lines } x = a, x = b]$

$= \int_{a}^{b} f(x) dx - \int_{a}^{b} g(x) dx = \int_{a}^{b} [f(x) - g(x)] dx$, where $f(x) \geq g(x)$ in $[a, b]$.

If $f(x) \geq g(x)$ in $[a, c]$ and $f(x) \leq g(x)$ in $[c, b]$, where $a < c < b$, then the area of the regions bounded by curves can be written as:

$\text{Total Area} = \text{Area of the region ACBDA} + \text{Area of the region BPRQB}$

$= \int_{a}^{c} [f(x) - g(x)] dx + \int_{c}^{b} [g(x) - f(x)] dx$

---

**Example 6:** Find the area of the region bounded by the two parabolas $y = x^2$ and $y^2 = x$.

**Solution:** The point of intersection of these two parabolas are $O(0, 0)$ and $A(1, 1)$. Here, we can set $y = \sqrt{x} = f(x)$ and $y = x^2 = g(x)$, where $f(x) \geq g(x)$ in $[0, 1]$.

Therefore, the required area of the shaded region

$= \int_{0}^{1} [f(x) - g(x)] dx$

$= \int_{0}^{1} (\sqrt{x} - x^2) dx$

$= [\frac{2}{3}x^{3/2} - \frac{x^3}{3}]_{0}^{1} = \frac{2}{3} - \frac{1}{3} = \frac{1}{3}$

---

**Example 7:** Find the area lying above $x$-axis and included between the circle $x^2 + y^2 = 8x$ and inside of the parabola $y^2 = 4x$.

**Solution:** The given equation of the circle $x^2 + y^2 = 8x$ can be expressed as $(x - 4)^2 + y^2 = 16$. Thus, the centre of the circle is $(4, 0)$ and radius is 4. Its intersection with the parabola $y^2 = 4x$ gives:

$x^2 + 4x = 8x$

or $x^2 - 4x = 0$

or $x(x - 4) = 0$

or $x = 0, x = 4$

Thus, the points of intersection of these two curves are $O(0, 0)$ and $P(4, 4)$ above the $x$-axis. The required area of the region $OPQCO$ included between these two curves above $x$-axis is:

$= (\text{area of the region OCPO}) + (\text{area of the region PCQP})$

$= \int_{0}^{4} y dx + \int_{4}^{8} y dx$

$= \int_{0}^{4} (2\sqrt{x}) dx + \int_{4}^{8} \sqrt{16 - (x - 4)^2} dx$
