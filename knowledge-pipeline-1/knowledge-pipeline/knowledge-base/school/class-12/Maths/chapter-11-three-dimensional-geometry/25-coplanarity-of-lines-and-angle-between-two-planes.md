---
type: concept
title: Coplanarity of Lines and Angle Between Two Planes
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- cartesian-form
- angle-between-planes
- three-dimensional-geometry
- class12
- coplanar-lines
- THREE DIMENSIONAL GEOMETRY
- vector-algebra
- Maths
---

Let $a_1, b_1, c_1$ and $a_2, b_2, c_2$ be the direction ratios of $\vec{b_1}$ and $\vec{b_2}$, respectively. Then
$\vec{AB} = (x_2 - x_1)\hat{i} + (y_2 - y_1)\hat{j} + (z_2 - z_1)\hat{k}$
and $\vec{b_1} = a_1\hat{i} + b_1\hat{j} + c_1\hat{k}$, $\vec{b_2} = a_2\hat{i} + b_2\hat{j} + c_2\hat{k}$.

The given lines are coplanar if and only if $\vec{AB} \cdot (\vec{b_1} \times \vec{b_2}) = 0$. In the cartesian form, it can be expressed as

$$\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\ a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \end{vmatrix} = 0 \quad ... (4)$$

**Example 21:** Show that the lines $\frac{x+3}{-3} = \frac{y-1}{1} = \frac{z-5}{5}$ and $\frac{x+1}{-1} = \frac{y-2}{2} = \frac{z-5}{5}$ are coplanar.

**Solution:** Here, $x_1 = -3, y_1 = 1, z_1 = 5, a_1 = -3, b_1 = 1, c_1 = 5$
$x_2 = -1, y_2 = 2, z_2 = 5, a_2 = -1, b_2 = 2, c_2 = 5$

Now, consider the determinant

$$\begin{vmatrix} x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\ a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \end{vmatrix} = \begin{vmatrix} 2 & 1 & 0 \\ -3 & 1 & 5 \\ -1 & 2 & 5 \end{vmatrix} = 2(5-10) - 1(-15+5) + 0 = 2(-5) - 1(-10) = -10 + 10 = 0$$

Therefore, lines are coplanar.

### 11.8 Angle between Two Planes

**Definition 2:** The angle between two planes is defined as the angle between their normals (Fig 11.18 (a)). Observe that if $\theta$ is an angle between the two planes, then so is $180^\circ - \theta$ (Fig 11.18 (b)). We shall take the acute angle as the angle between two planes.

Fig 11.18
