---
type: concept
title: Equations and Properties of Planes and Lines in 3D Geometry
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- vector-equations
- class12
- planes
- coplanar-lines
- THREE DIMENSIONAL GEOMETRY
- cartesian-equations
- 3d-geometry
- Maths
---

### Equations of Planes and Lines

*   The equation of a plane passing through three non-collinear points $(x_1, y_1, z_1)$, $(x_2, y_2, z_2)$, and $(x_3, y_3, z_3)$ is:
    $$\begin{vmatrix} x-x_1 & y-y_1 & z-z_1 \\ x_2-x_1 & y_2-y_1 & z_2-z_1 \\ x_3-x_1 & y_3-y_1 & z_3-z_1 \end{vmatrix} = 0$$

*   Vector equation of a plane that contains three non-collinear points having position vectors $\vec{a}, \vec{b},$ and $\vec{c}$ is $(\vec{r} - \vec{a}) \cdot [(\vec{b} - \vec{a}) \times (\vec{c} - \vec{a})] = 0$.

*   Equation of a plane that cuts the coordinate axes at $(a, 0, 0)$, $(0, b, 0)$, and $(0, 0, c)$ is:
    $$\frac{x}{a} + \frac{y}{b} + \frac{z}{c} = 1$$

*   Vector equation of a plane that passes through the intersection of planes $\vec{r} \cdot \vec{n}_1 = d_1$ and $\vec{r} \cdot \vec{n}_2 = d_2$ is $\vec{r} \cdot (\vec{n}_1 + \lambda \vec{n}_2) = d_1 + \lambda d_2$, where $\lambda$ is any nonzero constant.

*   Cartesian equation of a plane that passes through the intersection of two given planes $A_1x + B_1y + C_1z + D_1 = 0$ and $A_2x + B_2y + C_2z + D_2 = 0$ is $(A_1x + B_1y + C_1z + D_1) + \lambda (A_2x + B_2y + C_2z + D_2) = 0$.

*   Two lines $\vec{r} = \vec{a}_1 + \lambda \vec{b}_1$ and $\vec{r} = \vec{a}_2 + \mu \vec{b}_2$ are coplanar if $(\vec{a}_2 - \vec{a}_1) \cdot (\vec{b}_1 \times \vec{b}_2) = 0$.

*   In the cartesian form, two lines $\frac{x-x_1}{a_1} = \frac{y-y_1}{b_1} = \frac{z-z_1}{c_1}$ and $\frac{x-x_2}{a_2} = \frac{y-y_2}{b_2} = \frac{z-z_2}{c_2}$ are coplanar if:
    $$\begin{vmatrix} x_2-x_1 & y_2-y_1 & z_2-z_1 \\ a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \end{vmatrix} = 0$$

*   In the vector form, if $\theta$ is the angle between the two planes $\vec{r} \cdot \vec{n}_1 = d_1$ and $\vec{r} \cdot \vec{n}_2 = d_2$, then $\theta = \cos^{-1} \left( \frac{|\vec{n}_1 \cdot \vec{n}_2|}{|\vec{n}_1| |\vec{n}_2|} \right)$.

*   The angle $\phi$ between the line $\vec{r} = \vec{a} + \lambda \vec{b}$ and the plane $\vec{r} \cdot \hat{n} = d$ is $\sin \phi = \frac{|\vec{b} \cdot \hat{n}|}{|\vec{b}| |\hat{n}|}$.

*   The angle $\theta$ between the planes $A_1x + B_1y + C_1z + D_1 = 0$ and $A_2x + B_2y + C_2z + D_2 = 0$ is given by:
    $$\cos \theta = \frac{|A_1A_2 + B_1B_2 + C_1C_2|}{\sqrt{A_1^2 + B_1^2 + C_1^2} \sqrt{A_2^2 + B_2^2 + C_2^2}}$$

*   The distance of a point whose position vector is $\vec{a}$ from the plane $\vec{r} \cdot \hat{n} = d$ is $|d - \vec{a} \cdot \hat{n}|$.

*   The distance from a point $(x_1, y_1, z_1)$ to the plane $Ax + By + Cz + D = 0$ is $\frac{|Ax_1 + By_1 + Cz_1 + D|}{\sqrt{A^2 + B^2 + C^2}}$.
