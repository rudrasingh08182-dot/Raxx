---
type: concept
title: Equation of a Plane Passing Through the Intersection of Two Planes
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- cartesian-form
- plane-equation
- three-dimensional-geometry
- class12
- THREE DIMENSIONAL GEOMETRY
- intersection-of-planes
- vector-algebra
- Maths
---

### Equation of a Plane Passing Through the Intersection of Two Planes

If $\vec{r}$ is the position vector of a point on the line, then
$\vec{n}_1 \cdot \vec{r} = d_1$ and $\vec{n}_2 \cdot \vec{r} = d_2$

Therefore, for all real values of $\lambda$, we have
$(\vec{n}_1 + \lambda \vec{n}_2) \cdot \vec{r} = d_1 + \lambda d_2$

Since $\vec{r}$ is arbitrary, it satisfies for any point on the line.
Hence, the equation $(\vec{n}_1 + \lambda \vec{n}_2) \cdot \vec{r} = d_1 + \lambda d_2$ represents a plane $\pi_3$ which is such that if any vector $\vec{r}$ satisfies both the equations $\pi_1$ and $\pi_2$, it also satisfies the equation $\pi_3$ i.e., any plane passing through the intersection of the planes $\vec{r} \cdot \vec{n}_1 = d_1$ and $\vec{r} \cdot \vec{n}_2 = d_2$ has the equation $(\vec{n}_1 + \lambda \vec{n}_2) \cdot \vec{r} = d_1 + \lambda d_2$ ... (1)

#### Cartesian form
In Cartesian system, let
$\vec{n}_1 = A_1 \hat{i} + B_1 \hat{j} + C_1 \hat{k}$
$\vec{n}_2 = A_2 \hat{i} + B_2 \hat{j} + C_2 \hat{k}$
and $\vec{r} = x \hat{i} + y \hat{j} + z \hat{k}$

Then (1) becomes
$x(A_1 + \lambda A_2) + y(B_1 + \lambda B_2) + z(C_1 + \lambda C_2) = d_1 + \lambda d_2$

or $(A_1 x + B_1 y + C_1 z - d_1) + \lambda (A_2 x + B_2 y + C_2 z - d_2) = 0$ ... (2)

which is the required Cartesian form of the equation of the plane passing through the intersection of the given planes for each value of $\lambda$.

**Example 20:** Find the vector equation of the plane passing through the intersection of the planes $\vec{r} \cdot (\hat{i} + \hat{j} + \hat{k}) = 6$ and $\vec{r} \cdot (2\hat{i} + 3\hat{j} + 4\hat{k}) = -5$ and the point (1, 1, 1).

**Solution:** Here, $\vec{n}_1 = \hat{i} + \hat{j} + \hat{k}$ and $\vec{n}_2 = 2\hat{i} + 3\hat{j} + 4\hat{k}$; and $d_1 = 6$ and $d_2 = -5$.

Hence, using the relation $(\vec{n}_1 + \lambda \vec{n}_2) \cdot \vec{r} = d_1 + \lambda d_2$, we get
$\vec{r} \cdot [(\hat{i} + \hat{j} + \hat{k}) + \lambda (2\hat{i} + 3\hat{j} + 4\hat{k})] = 6 - 5\lambda$

or $\vec{r} \cdot [(1 + 2\lambda) \hat{i} + (1 + 3\lambda) \hat{j} + (1 + 4\lambda) \hat{k}] = 6 - 5\lambda$ ... (1)

where, $\lambda$ is some real number.
