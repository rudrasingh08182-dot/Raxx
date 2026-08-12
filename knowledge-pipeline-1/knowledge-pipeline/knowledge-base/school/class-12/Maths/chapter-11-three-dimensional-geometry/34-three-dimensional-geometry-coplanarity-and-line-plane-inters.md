---
type: concept
title: 'Three Dimensional Geometry: Coplanarity and Line-Plane Intersection'
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: solved-example
tags:
- vector-equation
- three-dimensional-geometry
- class12
- coplanar-lines
- xy-plane-intersection
- THREE DIMENSIONAL GEOMETRY
- direction-cosines
- Maths
---

### THREE DIMENSIONAL GEOMETRY

Adding third column to the first column, we get

$$\begin{vmatrix} \alpha + \delta & \alpha & \alpha + \delta \\ \beta + \gamma & \beta & \beta + \gamma \\ b & a & b \end{vmatrix} = 0$$

Since the first and second columns are identical. Hence, the given two lines are coplanar.

**Example 30:** Find the coordinates of the point where the line through the points A(3, 4, 1) and B(5, 1, 6) crosses the XY-plane.

**Solution:** The vector equation of the line through the points A and B is
$$\vec{r} = (3\hat{i} + 4\hat{j} + \hat{k}) + \lambda[(5-3)\hat{i} + (1-4)\hat{j} + (6-1)\hat{k}]$$

i.e., $\vec{r} = (3\hat{i} + 4\hat{j} + \hat{k}) + \lambda(2\hat{i} - 3\hat{j} + 5\hat{k})$ ... (1)

Let P be the point where the line AB crosses the XY-plane. Then the position vector of the point P is of the form $x\hat{i} + y\hat{j}$.
This point must satisfy the equation (1). (Why?)

i.e., $x\hat{i} + y\hat{j} = (3+2\lambda)\hat{i} + (4-3\lambda)\hat{j} + (1+5\lambda)\hat{k}$

Equating the like coefficients of $\hat{i}, \hat{j},$ and $\hat{k}$, we have
$x = 3 + 2\lambda$
$y = 4 - 3\lambda$
$0 = 1 + 5\lambda$

Solving the above equations, we get
$\lambda = -\frac{1}{5}, x = \frac{13}{5}, y = \frac{23}{5}$

Hence, the coordinates of the required point are $(\frac{13}{5}, \frac{23}{5}, 0)$.

### Miscellaneous Exercise on Chapter 11

1. Show that the line joining the origin to the point (2, 1, 1) is perpendicular to the line determined by the points (3, 5, –1), (4, 3, –1).

2. If $l_1, m_1, n_1$ and $l_2, m_2, n_2$ are the direction cosines of two mutually perpendicular lines, show that the direction cosines of the line perpendicular to both of these are $(m_1n_2 - m_2n_1), (n_1l_2 - n_2l_1), (l_1m_2 - l_2m_1)$.
