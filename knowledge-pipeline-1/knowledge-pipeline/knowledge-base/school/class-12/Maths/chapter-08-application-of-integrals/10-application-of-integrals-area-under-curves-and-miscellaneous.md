---
type: concept
title: 'Application of Integrals: Area Under Curves and Miscellaneous Examples'
category: school
subject: Maths
level: class-12
chapter: 8
chapter_name: APPLICATION OF INTEGRALS
content_type: solved-example
tags:
- calculus
- mathematics
- Maths
- APPLICATION OF INTEGRALS
- definite-integrals
- class12
- parabola
- area-under-curves
---

### Exercises

Choose the correct answer in the following exercises 6 and 7.

6. Smaller area enclosed by the circle $x^2 + y^2 = 4$ and the line $x + y = 2$ is
(A) $2(\pi - 2)$ (B) $\pi - 2$ (C) $2\pi - 1$ (D) $2(\pi + 2)$

7. Area lying between the curves $y^2 = 4x$ and $y = 2x$ is
(A) $\frac{2}{3}$ (B) $\frac{1}{3}$ (C) $\frac{1}{4}$ (D) $\frac{3}{4}$

### Miscellaneous Examples

**Example 11:** Find the area of the parabola $y^2 = 4ax$ bounded by its latus rectum.

**Solution:** From Fig 8.20, the vertex of the parabola $y^2 = 4ax$ is at origin $(0, 0)$. The equation of the latus rectum $LSL'$ is $x = a$. Also, parabola is symmetrical about the x-axis.

The required area of the region $OLL'O$
$= 2 \times (\text{area of the region } OLSO)$
$= 2 \int_{0}^{a} y dx = 2 \int_{0}^{a} \sqrt{4ax} dx$
$= 2 \times 2\sqrt{a} \int_{0}^{a} x^{1/2} dx$
$= 4\sqrt{a} \left[ \frac{x^{3/2}}{3/2} \right]_{0}^{a}$
$= 4\sqrt{a} \times \frac{2}{3} a^{3/2} = \frac{8}{3} a^2$

**Example 12:** Find the area of the region bounded by the line $y = 3x + 2$, the x-axis and the ordinates $x = -1$ and $x = 1$.

**Solution:** As shown in the Fig 8.21, the line $y = 3x + 2$ meets x-axis at $x = -\frac{2}{3}$ and its graph lies below x-axis for $x < -\frac{2}{3}$ and above x-axis for $x > -\frac{2}{3}$.

The required area = Area of the region $ACBA$ + Area of the region $ADEA$
$= \left| \int_{-1}^{-2/3} (3x + 2) dx \right| + \int_{-2/3}^{1} (3x + 2) dx$
$= \left| \left[ \frac{3x^2}{2} + 2x \right]_{-1}^{-2/3} \right| + \left[ \frac{3x^2}{2} + 2x \right]_{-2/3}^{1}$
$= \frac{1}{6} + \frac{25}{6} = \frac{13}{3}$

**Example 13:** Find the area bounded by the curve $y = \cos x$ between $x = 0$ and $x = 2\pi$.

**Solution:** From the Fig 8.22, the required area = area of the region $OABO$ + area of the region $BCDB$ + area of the region $DEFD$.

Thus, we have the required area
$= \int_{0}^{\pi/2} \cos x dx + \left| \int_{\pi/2}^{3\pi/2} \cos x dx \right| + \int_{3\pi/2}^{2\pi} \cos x dx$
$= [\sin x]_{0}^{\pi/2} + |[\sin x]_{\pi/2}^{3\pi/2}| + [\sin x]_{3\pi/2}^{2\pi}$
$= 1 + 2 + 1 = 4$

**Example 14:** Prove that the curves $y^2 = 4x$ and $x^2 = 4y$ divide the area of the square bounded by $x = 0, x = 4, y = 4$ and $y = 0$ into three equal parts.

**Solution:** Note that the point of intersection of the parabolas $y^2 = 4x$ and $x^2 = 4y$ are $(0, 0)$ and $(4, 4)$.
