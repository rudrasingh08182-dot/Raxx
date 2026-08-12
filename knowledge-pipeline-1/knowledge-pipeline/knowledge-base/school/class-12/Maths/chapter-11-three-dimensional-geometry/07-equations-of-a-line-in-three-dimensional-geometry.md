---
type: concept
title: Equations of a Line in Three Dimensional Geometry
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- parametric-equations
- line-passing-through-two-points
- vector-equation
- three-dimensional-geometry
- class12
- THREE DIMENSIONAL GEOMETRY
- cartesian-equation
- Maths
---

### THREE DIMENSIONAL GEOMETRY 469

These are parametric equations of the line. Eliminating the parameter $\lambda$ from (2), we get

$$\frac{x-x_1}{a} = \frac{y-y_1}{b} = \frac{z-z_1}{c} \dots (3)$$

This is the Cartesian equation of the line.

**Note:** If $l, m, n$ are the direction cosines of the line, the equation of the line is

$$\frac{x-x_1}{l} = \frac{y-y_1}{m} = \frac{z-z_1}{n}$$

**Example 6:** Find the vector and the Cartesian equations of the line through the point $(5, 2, -4)$ and which is parallel to the vector $3\hat{i} + 2\hat{j} - 8\hat{k}$.

**Solution:** We have

$\vec{a} = 5\hat{i} + 2\hat{j} - 4\hat{k}$ and $\vec{b} = 3\hat{i} + 2\hat{j} - 8\hat{k}$

Therefore, the vector equation of the line is

$\vec{r} = (5\hat{i} + 2\hat{j} - 4\hat{k}) + \lambda(3\hat{i} + 2\hat{j} - 8\hat{k})$

Now, $\vec{r}$ is the position vector of any point $P(x, y, z)$ on the line.
Therefore, $x\hat{i} + y\hat{j} + z\hat{k} = (5\hat{i} + 2\hat{j} - 4\hat{k}) + \lambda(3\hat{i} + 2\hat{j} - 8\hat{k})$
$= (5 + 3\lambda)\hat{i} + (2 + 2\lambda)\hat{j} + (-4 - 8\lambda)\hat{k}$

Eliminating $\lambda$, we get

$$\frac{x-5}{3} = \frac{y-2}{2} = \frac{z+4}{-8}$$

which is the equation of the line in Cartesian form.

### 11.3.2 Equation of a line passing through two given points

Let $\vec{a}$ and $\vec{b}$ be the position vectors of two points $A(x_1, y_1, z_1)$ and $B(x_2, y_2, z_2)$, respectively that are lying on a line (Fig 11.5).

Let $\vec{r}$ be the position vector of an arbitrary point $P(x, y, z)$, then $P$ is a point on the line if and only if $\vec{AP} = \vec{r} - \vec{a}$ and $\vec{AB} = \vec{b} - \vec{a}$ are collinear vectors. Therefore, $P$ is on the line if and only if

$(\vec{r} - \vec{a}) = \lambda(\vec{b} - \vec{a})$
