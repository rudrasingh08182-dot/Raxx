---
type: concept
title: Angle Between Planes and Distance of a Point from a Plane
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- three-dimensional-geometry
- class12
- distance-formula
- mathematics
- planes
- THREE DIMENSIONAL GEOMETRY
- vector-algebra
- Maths
---

### Example 23
Find the angle between the two planes $3x - 6y + 2z = 7$ and $2x + 2y - 2z = 5$.

**Solution:**
Comparing the given equations of the planes with the equations $A_1x + B_1y + C_1z + D_1 = 0$ and $A_2x + B_2y + C_2z + D_2 = 0$, we get:
$A_1 = 3, B_1 = -6, C_1 = 2$
$A_2 = 2, B_2 = 2, C_2 = -2$

$\cos \theta = \frac{|A_1A_2 + B_1B_2 + C_1C_2|}{\sqrt{A_1^2 + B_1^2 + C_1^2} \sqrt{A_2^2 + B_2^2 + C_2^2}}$

$\cos \theta = \frac{|(3)(2) + (-6)(2) + (2)(-2)|}{\sqrt{3^2 + (-6)^2 + 2^2} \sqrt{2^2 + 2^2 + (-2)^2}}$

$= \frac{|6 - 12 - 4|}{\sqrt{9 + 36 + 4} \sqrt{4 + 4 + 4}} = \frac{|-10|}{\sqrt{49} \sqrt{12}} = \frac{10}{7 \times 2\sqrt{3}} = \frac{5}{7\sqrt{3}}$

Therefore, $\theta = \cos^{-1} \left( \frac{5}{7\sqrt{3}} \right)$

### 11.9 Distance of a Point from a Plane
**Vector form**
Consider a point $P$ with position vector $\vec{a}$ and a plane $\pi_1$ whose equation is $\vec{r} \cdot \hat{n} = d$ (Fig 11.19).

Consider a plane $\pi_2$ through $P$ parallel to the plane $\pi_1$. The unit vector normal to $\pi_2$ is $\hat{n}$. Hence, its equation is $(\vec{r} - \vec{a}) \cdot \hat{n} = 0$, i.e., $\vec{r} \cdot \hat{n} = \vec{a} \cdot \hat{n}$.

Thus, the distance $ON'$ of this plane from the origin is $|\vec{a} \cdot \hat{n}|$. Therefore, the distance $PQ$ from the plane $\pi_1$ is (Fig 11.21 (a)) i.e., $ON - ON' = |d - \vec{a} \cdot \hat{n}|$.

| Figure | Description |
| :--- | :--- |
| Fig 11.19(a) | Geometry of point P and plane $\pi_1$ |
| Fig 11.21(a) | Distance PQ from plane $\pi_1$ |
