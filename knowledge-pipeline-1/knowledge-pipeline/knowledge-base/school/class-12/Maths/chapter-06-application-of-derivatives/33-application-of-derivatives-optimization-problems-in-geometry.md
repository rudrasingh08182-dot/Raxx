---
type: concept
title: 'Application of Derivatives: Optimization Problems in Geometry'
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: solved-example
tags:
- APPLICATION OF DERIVATIVES
- application-of-derivatives
- class12
- cylinder-in-cone
- calculus
- optimization
- trapezium-area
- Maths
---

APPLICATION OF DERIVATIVES 227

CQ on AB. Let $AP = x$ cm. Note that $\Delta APD \sim \Delta BQC$. Therefore, $QB = x$ cm. Also, by Pythagoras theorem, $DP = QC = \sqrt{100 - x^2}$. Let $A$ be the area of the trapezium. Then

$A = A(x) = \frac{1}{2} (\text{sum of parallel sides}) (\text{height})$

$= \frac{1}{2} (20 + 10 + 2x) \sqrt{100 - x^2}$

$= (15 + x) \sqrt{100 - x^2}$

or $A'(x) = (15 + x) \frac{-2x}{2\sqrt{100 - x^2}} + \sqrt{100 - x^2}$

$= \frac{-15x - x^2 + 100 - x^2}{\sqrt{100 - x^2}} = \frac{-2x^2 - 15x + 100}{\sqrt{100 - x^2}}$

Now $A'(x) = 0$ gives $-2x^2 - 15x + 100 = 0$, i.e., $x = 5$ and $x = -10$. Since $x$ represents distance, it cannot be negative. So, $x = 5$. Now

$A''(x) = \frac{\sqrt{100 - x^2}(-4x - 15) - (-2x^2 - 15x + 100) \frac{-x}{\sqrt{100 - x^2}}}{100 - x^2}$

$= \frac{-4x^3 - 15x^2 + 400x + 1500 - 2x^3 - 15x^2 + 100x}{(100 - x^2)^{3/2}}$ (on simplification)

or $A''(5) = \frac{-2(5)^3 - 30(5)^2 + 500(5) + 1500}{(100 - 25)^{3/2}} < 0$

Thus, area of trapezium is maximum at $x = 5$ and the area is given by $A(5) = (15 + 5) \sqrt{100 - 25} = 20 \sqrt{75} = 100\sqrt{3} \text{ cm}^2$.

**Example 38** Prove that the radius of the right circular cylinder of greatest curved surface area which can be inscribed in a given cone is half of that of the cone.

**Solution** Let $OC = r$ be the radius of the cone and $OA = h$ be its height. Let a cylinder with radius $OE = x$ inscribed in the given cone (Fig 6.20). The height $QE$ of the cylinder is given by
