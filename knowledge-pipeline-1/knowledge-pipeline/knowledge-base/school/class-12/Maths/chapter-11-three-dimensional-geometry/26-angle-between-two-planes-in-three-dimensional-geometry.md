---
type: concept
title: Angle Between Two Planes in Three Dimensional Geometry
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- angle-between-planes
- three-dimensional-geometry
- class12
- planes
- THREE DIMENSIONAL GEOMETRY
- direction-ratios
- vector-algebra
- Maths
---

### THREE DIMENSIONAL GEOMETRY

If $\vec{n_1}$ and $\vec{n_2}$ are normals to the planes and $\theta$ be the angle between the planes $\vec{r} \cdot \vec{n_1} = d_1$ and $\vec{r} \cdot \vec{n_2} = d_2$.

Then $\theta$ is the angle between the normals to the planes drawn from some common point.

We have, $\cos \theta = \frac{|\vec{n_1} \cdot \vec{n_2}|}{|\vec{n_1}| |\vec{n_2}|}$

**Note:** The planes are perpendicular to each other if $\vec{n_1} \cdot \vec{n_2} = 0$ and parallel if $\vec{n_1}$ is parallel to $\vec{n_2}$.

#### Cartesian form
Let $\theta$ be the angle between the planes,
$A_1 x + B_1 y + C_1 z + D_1 = 0$ and $A_2 x + B_2 y + C_2 z + D_2 = 0$

The direction ratios of the normal to the planes are $A_1, B_1, C_1$ and $A_2, B_2, C_2$ respectively.

Therefore, $\cos \theta = \frac{|A_1 A_2 + B_1 B_2 + C_1 C_2|}{\sqrt{A_1^2 + B_1^2 + C_1^2} \sqrt{A_2^2 + B_2^2 + C_2^2}}$

**Note:**
1. If the planes are at right angles, then $\theta = 90^\circ$ and so $\cos \theta = 0$. Hence, $A_1 A_2 + B_1 B_2 + C_1 C_2 = 0$.
2. If the planes are parallel, then $\frac{A_1}{A_2} = \frac{B_1}{B_2} = \frac{C_1}{C_2}$.

**Example 22:** Find the angle between the two planes $2x + y - 2z = 5$ and $3x - 6y - 2z = 7$ using vector method.

**Solution:** The angle between two planes is the angle between their normals. From the equation of the planes, the normal vectors are
$\vec{N_1} = 2\hat{i} + \hat{j} - 2\hat{k}$ and $\vec{N_2} = 3\hat{i} - 6\hat{j} - 2\hat{k}$

Therefore $\cos \theta = \frac{|(2)(3) + (1)(-6) + (-2)(-2)|}{\sqrt{2^2 + 1^2 + (-2)^2} \sqrt{3^2 + (-6)^2 + (-2)^2}} = \frac{|6 - 6 + 4|}{\sqrt{9} \sqrt{49}} = \frac{4}{3 \times 7} = \frac{4}{21}$

Hence $\theta = \cos^{-1} \left( \frac{4}{21} \right)$
