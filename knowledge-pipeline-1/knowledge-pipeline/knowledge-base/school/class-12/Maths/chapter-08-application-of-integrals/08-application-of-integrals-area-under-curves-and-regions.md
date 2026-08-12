---
type: concept
title: 'Application of Integrals: Area Under Curves and Regions'
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
- circles
- class12
- area-under-curve
- triangle-area
- integration
- ellipse
---

### Example 8
In Fig 8.17, AOBA is the part of the ellipse $9x^2 + y^2 = 36$ in the first quadrant such that OA = 2 and OB = 6. Find the area between the arc AB and the chord AB.

**Solution:**
Given equation of the ellipse $9x^2 + y^2 = 36$ can be expressed as $\frac{x^2}{4} + \frac{y^2}{36} = 1$ or $\frac{x^2}{2^2} + \frac{y^2}{6^2} = 1$ and hence, its shape is as given in Fig 8.17.
Accordingly, the equation of the chord AB is:
$y - 0 = \frac{6-0}{0-2}(x - 2)$
or $y = -3(x - 2)$
or $y = -3x + 6$
Area of the shaded region as shown in the Fig 8.17:
$= \int_{0}^{2} 3\sqrt{4-x^2} dx - \int_{0}^{2} (-3x + 6) dx$
$= 3\pi - 6$

### Example 9
Using integration find the area of region bounded by the triangle whose vertices are (1, 0), (2, 2) and (3, 1).

**Solution:**
Let A(1, 0), B(2, 2) and C(3, 1) be the vertices of a triangle ABC (Fig 8.18).
Area of $\Delta ABC = \text{Area of } \Delta ABD + \text{Area of trapezium BDEC} - \text{Area of } \Delta AEC$
Now equation of the sides AB, BC and CA are given by $y = 2(x - 1)$, $y = 4 - x$, $y = \frac{1}{2}(x - 1)$, respectively.
Hence, area of $\Delta ABC = \int_{1}^{2} 2(x - 1) dx + \int_{2}^{3} (4 - x) dx - \int_{1}^{3} \frac{1}{2}(x - 1) dx$
$= \left[ x^2 - 2x \right]_{1}^{2} + \left[ 4x - \frac{x^2}{2} \right]_{2}^{3} - \left[ \frac{x^2}{4} - \frac{x}{2} \right]_{1}^{3}$
$= (4 - 4) - (1 - 2) + (12 - 4.5) - (8 - 2) - [(\frac{9}{4} - \frac{3}{2}) - (\frac{1}{4} - \frac{1}{2})]$
$= \frac{3}{2}$

### Example 10
Find the area of the region enclosed between the two circles: $x^2 + y^2 = 4$ and $(x - 2)^2 + y^2 = 4$.

**Solution:**
Equations of the given circles are:
$x^2 + y^2 = 4$ ... (1)
$(x - 2)^2 + y^2 = 4$ ... (2)
Equation (1) is a circle with centre O at the origin and radius 2. Equation (2) is a circle with centre C(2, 0) and radius 2. Solving equations (1) and (2), we have:
$(x - 2)^2 + y^2 = x^2 + y^2$
or $x^2 - 4x + 4 + y^2 = x^2 + y^2$
or $x = 1$ which gives $y = \pm\sqrt{3}$
Thus, the points of intersection of the given circles are $A(1, \sqrt{3})$ and $A'(1, -\sqrt{3})$ as shown in the Fig 8.19.
