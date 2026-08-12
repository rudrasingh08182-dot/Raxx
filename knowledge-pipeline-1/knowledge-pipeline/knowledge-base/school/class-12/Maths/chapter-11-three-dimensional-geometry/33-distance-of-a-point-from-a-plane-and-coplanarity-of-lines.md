---
type: concept
title: Distance of a Point from a Plane and Coplanarity of Lines
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: solved-example
tags:
- three-dimensional-geometry
- class12
- coplanar-lines
- THREE DIMENSIONAL GEOMETRY
- determinant-method
- dot-product
- vector-algebra
- Maths
---

Hence, $PD$ = the dot product of $\vec{AP}$ with the unit vector along $\vec{AB} \times \vec{AC}$.

So $\vec{AP} = 3\hat{i} + 6\hat{j} + 7\hat{k}$ and $\vec{AB} \times \vec{AC} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 2 & 3 & 2 \\ 12 & 16 & 12 \end{vmatrix} = 4\hat{i} - 0\hat{j} - 4\hat{k}$.

Unit vector along $\vec{AB} \times \vec{AC} = \frac{4\hat{i} - 0\hat{j} - 4\hat{k}}{\sqrt{34}}$.

Hence $PD = (3\hat{i} + 6\hat{j} + 7\hat{k}) \cdot \frac{4\hat{i} - 0\hat{j} - 4\hat{k}}{\sqrt{34}} = \frac{17}{\sqrt{34}}$.

Alternatively, find the equation of the plane passing through A, B and C and then compute the distance of the point P from the plane.

**Example 29** Show that the lines $\frac{x - (a - \delta)}{\alpha - \delta} = \frac{y - a}{\alpha} = \frac{z - (a + \delta)}{\alpha + \delta}$ and $\frac{x - (b - c)}{\beta - \gamma} = \frac{y - b}{\beta} = \frac{z - (b + c)}{\beta + \gamma}$ are coplanar.

**Solution**
Here $x_1 = a - \delta, x_2 = b - c$
$y_1 = a, y_2 = b$
$z_1 = a + \delta, z_2 = b + c$
$a_1 = \alpha - \delta, a_2 = \beta - \gamma$
$b_1 = \alpha, b_2 = \beta$
$c_1 = \alpha + \delta, c_2 = \beta + \gamma$

Now consider the determinant:

| $x_2 - x_1$ | $y_2 - y_1$ | $z_2 - z_1$ |
| :--- | :--- | :--- |
| $a_1$ | $b_1$ | $c_1$ |
| $a_2$ | $b_2$ | $c_2$ |

$= \begin{vmatrix} b - c - a + \delta & b - a & b + c - a - \delta \\ \alpha - \delta & \alpha & \alpha + \delta \\ \beta - \gamma & \beta & \beta + \gamma \end{vmatrix}$
