---
type: concept
title: Vector Equation of a Plane and Coplanarity of Two Lines
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- cartesian-form
- vector-equation
- three-dimensional-geometry
- class12
- planes
- THREE DIMENSIONAL GEOMETRY
- coplanarity
- Maths
---

### THREE DIMENSIONAL GEOMETRY 487

Taking $\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}$, we get
$(x\hat{i} + y\hat{j} + z\hat{k}) \cdot [(1 + 2\lambda)\hat{i} + (1 + 3\lambda)\hat{j} + (1 + 4\lambda)\hat{k}] = 6 - 5\lambda$

or $(1 + 2\lambda)x + (1 + 3\lambda)y + (1 + 4\lambda)z = 6 - 5\lambda$

or $(x + y + z - 6) + \lambda(2x + 3y + 4z + 5) = 0$ ... (2)

Given that the plane passes through the point (1,1,1), it must satisfy (2), i.e.
$(1 + 1 + 1 - 6) + \lambda(2 + 3 + 4 + 5) = 0$

or $\lambda = \frac{3}{14}$

Putting the values of $\lambda$ in (1), we get
$\vec{r} \cdot [(\hat{i} + \hat{j} + \hat{k}) + \frac{3}{14}(2\hat{i} + 3\hat{j} + 4\hat{k})] = 6 - 5(\frac{3}{14})$

or $\vec{r} \cdot [(\frac{14+6}{14})\hat{i} + (\frac{14+9}{14})\hat{j} + (\frac{14+12}{14})\hat{k}] = \frac{84-15}{14}$

or $\vec{r} \cdot (20\hat{i} + 23\hat{j} + 26\hat{k}) = 69$

which is the required vector equation of the plane.

### 11.7 Coplanarity of Two Lines

Let the given lines be
$\vec{r} = \vec{a_1} + \lambda\vec{b_1}$ ... (1)
and $\vec{r} = \vec{a_2} + \mu\vec{b_2}$ ... (2)

The line (1) passes through the point, say A, with position vector $\vec{a_1}$ and is parallel to $\vec{b_1}$. The line (2) passes through the point, say B with position vector $\vec{a_2}$ and is parallel to $\vec{b_2}$.

Thus, $\vec{AB} = \vec{a_2} - \vec{a_1}$

The given lines are coplanar if and only if $\vec{AB}$ is perpendicular to $\vec{b_1} \times \vec{b_2}$.

i.e. $\vec{AB} \cdot (\vec{b_1} \times \vec{b_2}) = 0$ or $(\vec{a_2} - \vec{a_1}) \cdot (\vec{b_1} \times \vec{b_2}) = 0$

**Cartesian form**
Let $(x_1, y_1, z_1)$ and $(x_2, y_2, z_2)$ be the coordinates of the points A and B respectively.
