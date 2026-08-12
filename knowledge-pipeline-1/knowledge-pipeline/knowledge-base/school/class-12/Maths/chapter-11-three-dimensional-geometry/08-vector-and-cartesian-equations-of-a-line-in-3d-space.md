---
type: concept
title: Vector and Cartesian Equations of a Line in 3D Space
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- class12
- mathematics
- THREE DIMENSIONAL GEOMETRY
- cartesian-equation
- line-equation
- 3d-geometry
- vector-algebra
- Maths
---

### Vector and Cartesian Equations of a Line

The vector equation of a line passing through two points with position vectors $\vec{a}$ and $\vec{b}$ is given by:
$\vec{r} = \vec{a} + \lambda(\vec{b} - \vec{a}), \lambda \in R$ ... (1)

#### Derivation of Cartesian form from vector form
We have $\vec{r} = x\hat{i} + y\hat{j} + z\hat{k}$, $\vec{a} = x_1\hat{i} + y_1\hat{j} + z_1\hat{k}$, and $\vec{b} = x_2\hat{i} + y_2\hat{j} + z_2\hat{k}$.

Substituting these values in (1), we get:
$(x\hat{i} + y\hat{j} + z\hat{k}) = (x_1\hat{i} + y_1\hat{j} + z_1\hat{k}) + \lambda[(x_2 - x_1)\hat{i} + (y_2 - y_1)\hat{j} + (z_2 - z_1)\hat{k}]$

Equating the like coefficients of $\hat{i}, \hat{j}, \hat{k}$, we get:
$x = x_1 + \lambda(x_2 - x_1); y = y_1 + \lambda(y_2 - y_1); z = z_1 + \lambda(z_2 - z_1)$

On eliminating $\lambda$, we obtain:
$\frac{x - x_1}{x_2 - x_1} = \frac{y - y_1}{y_2 - y_1} = \frac{z - z_1}{z_2 - z_1}$
which is the equation of the line in Cartesian form.

**Example 7:** Find the vector equation for the line passing through the points (-1, 0, 2) and (3, 4, 6).
**Solution:** Let $\vec{a}$ and $\vec{b}$ be the position vectors of the point A (-1, 0, 2) and B (3, 4, 6).
Then $\vec{a} = -\hat{i} + 2\hat{k}$ and $\vec{b} = 3\hat{i} + 4\hat{j} + 6\hat{k}$.
Therefore $\vec{b} - \vec{a} = 4\hat{i} + 4\hat{j} + 4\hat{k}$.
Let $\vec{r}$ be the position vector of any point on the line. Then the vector equation of the line is:
$\vec{r} = (-\hat{i} + 2\hat{k}) + \lambda(4\hat{i} + 4\hat{j} + 4\hat{k})$

**Example 8:** The Cartesian equation of a line is $\frac{x+3}{2} = \frac{y-5}{4} = \frac{z+6}{2}$. Find the vector equation for the line.
**Solution:** Comparing the given equation with the standard form $\frac{x - x_1}{a} = \frac{y - y_1}{b} = \frac{z - z_1}{c}$, we observe that $x_1 = -3, y_1 = 5, z_1 = -6$; $a = 2, b = 4, c = 2$.
