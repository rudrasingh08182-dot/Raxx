---
type: concept
title: Equation of a Plane Passing Through Three Non-Collinear Points
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- cartesian-form
- plane-equation
- geometry
- class12
- mathematics
- THREE DIMENSIONAL GEOMETRY
- vector-algebra
- Maths
---

### Equation of a Plane Passing Through Three Non-Collinear Points

**Fig 11.15**

This is the equation of the plane in vector form passing through three non-collinear points.

**Note:** Why was it necessary to say that the three points had to be non-collinear? If the three points were on the same line, then there will be many planes that will contain them (Fig 11.15). These planes will resemble the pages of a book where the line containing the points R, S, and T are members in the binding of the book.

#### Cartesian form

Let $(x_1, y_1, z_1)$, $(x_2, y_2, z_2)$ and $(x_3, y_3, z_3)$ be the coordinates of the points R, S and T respectively. Let $(x, y, z)$ be the coordinates of any point P on the plane with position vector $\vec{r}$. Then

$\vec{RP} = (x - x_1)\hat{i} + (y - y_1)\hat{j} + (z - z_1)\hat{k}$

$\vec{RS} = (x_2 - x_1)\hat{i} + (y_2 - y_1)\hat{j} + (z_2 - z_1)\hat{k}$

$\vec{RT} = (x_3 - x_1)\hat{i} + (y_3 - y_1)\hat{j} + (z_3 - z_1)\hat{k}$

Substituting these values in equation (1) of the vector form and expressing it in the form of a determinant, we have:

$$\begin{vmatrix} x - x_1 & y - y_1 & z - z_1 \\ x_2 - x_1 & y_2 - y_1 & z_2 - z_1 \\ x_3 - x_1 & y_3 - y_1 & z_3 - z_1 \end{vmatrix} = 0$$

which is the equation of the plane in Cartesian form passing through three non-collinear points $(x_1, y_1, z_1)$, $(x_2, y_2, z_2)$ and $(x_3, y_3, z_3)$.

**Example 18:** Find the vector equations of the plane passing through the points R(2, 5, –3), S(–2, –3, 5) and T(5, 3, –3).

**Solution:** Let $\vec{a} = 2\hat{i} + 5\hat{j} - 3\hat{k}$, $\vec{b} = -2\hat{i} - 3\hat{j} + 5\hat{k}$, $\vec{c} = 5\hat{i} + 3\hat{j} - 3\hat{k}$.

Then the vector equation of the plane passing through $\vec{a}$, $\vec{b}$ and $\vec{c}$ is given by

$(\vec{r} - \vec{a}) \cdot (\vec{RS} \times \vec{RT}) = 0$ (Why?)

or $(\vec{r} - \vec{a}) \cdot ((\vec{b} - \vec{a}) \times (\vec{c} - \vec{a})) = 0$

i.e., $(\vec{r} - (2\hat{i} + 5\hat{j} - 3\hat{k})) \cdot [(-4\hat{i} - 8\hat{j} + 8\hat{k}) \times (3\hat{i} - 2\hat{j})] = 0$
