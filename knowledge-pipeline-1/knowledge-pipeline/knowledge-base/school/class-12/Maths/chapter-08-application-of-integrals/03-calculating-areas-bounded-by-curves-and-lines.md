---
type: concept
title: Calculating Areas Bounded by Curves and Lines
category: school
subject: Maths
level: class-12
chapter: 8
chapter_name: APPLICATION OF INTEGRALS
content_type: solved-example
tags:
- calculus
- Maths
- APPLICATION OF INTEGRALS
- class12
- parabola-area
- area-under-curve
- integration
- ellipse-area
---

### Area Calculation of Ellipses and Parabolas

Alternatively, considering horizontal strips as shown in Fig 8.6, the whole area of the region enclosed by circle:

$= 4 \int_{0}^{a} x dy = 4 \int_{0}^{a} \sqrt{a^2 - y^2} dy$ (Why?)
$= 4 \left[ \frac{y}{2} \sqrt{a^2 - y^2} + \frac{a^2}{2} \sin^{-1} \frac{y}{a} \right]_{0}^{a}$
$= 4 \left( \frac{a^2}{4} \pi \right) = \pi a^2$

**Example 2:** Find the area enclosed by the ellipse $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$.

**Solution:** From Fig 8.7, the area of the region $ABA'B'A$ bounded by the ellipse is 4 times the area of the region $AOBA$ in the first quadrant bounded by the curve, x-axis, and the ordinates $x=0, x=a$ (as the ellipse is symmetrical about both x-axis and y-axis).

Area $= 4 \int_{0}^{a} y dx$

Now $\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1$ gives $y = \pm \frac{b}{a} \sqrt{a^2 - x^2}$, but as the region $AOBA$ lies in the first quadrant, $y$ is taken as positive. So, the required area is:

$= 4 \int_{0}^{a} \frac{b}{a} \sqrt{a^2 - x^2} dx$
$= \frac{4b}{a} \left[ \frac{x}{2} \sqrt{a^2 - x^2} + \frac{a^2}{2} \sin^{-1} \frac{x}{a} \right]_{0}^{a}$ (Why?)
$= \frac{4b}{a} \left[ \left( 0 + \frac{a^2}{2} \sin^{-1}(1) \right) - (0 + 0) \right]$
$= \frac{4b}{a} \left( \frac{a^2}{2} \cdot \frac{\pi}{2} \right) = \pi ab$

Alternatively, considering horizontal strips as shown in Fig 8.8, the area of the ellipse is:

$= 4 \int_{0}^{b} x dy = 4 \int_{0}^{b} \frac{a}{b} \sqrt{b^2 - y^2} dy$ (Why?)
$= \frac{4a}{b} \left[ \frac{y}{2} \sqrt{b^2 - y^2} + \frac{b^2}{2} \sin^{-1} \frac{y}{b} \right]_{0}^{b}$
$= \frac{4a}{b} \left( \frac{b^2}{2} \cdot \frac{\pi}{2} \right) = \pi ab$

#### 8.2.1 The area of the region bounded by a curve and a line
In this subsection, we will find the area of the region bounded by a line and a circle, a line and a parabola, a line and an ellipse. Equations of above mentioned curves will be in their standard forms only as the cases in other forms go beyond the scope of this textbook.

**Example 3:** Find the area of the region bounded by the curve $y = x^2$ and the line $y = 4$.

**Solution:** Since the given curve represented by the equation $y = x^2$ is a parabola symmetrical about y-axis only, therefore, from Fig 8.9, the required area of the region $AOBA$ is given by:

Area $= \int_{0}^{4} x dy = \int_{0}^{4} \sqrt{y} dy$
$= \left[ \frac{y^{3/2}}{3/2} \right]_{0}^{4} = \frac{2}{3} (4)^{3/2} = \frac{2}{3} \times 8 = \frac{16}{3}$

Here, we have taken horizontal strips as indicated in Fig 8.9.
