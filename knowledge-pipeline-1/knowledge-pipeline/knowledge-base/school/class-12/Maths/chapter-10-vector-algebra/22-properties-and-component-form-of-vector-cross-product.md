---
type: concept
title: Properties and Component Form of Vector Cross Product
category: school
subject: Maths
level: class-12
chapter: 10
chapter_name: VECTOR ALGEBRA
content_type: concept
tags:
- vector-geometry
- mathematics
- class12
- vector-algebra
- VECTOR ALGEBRA
- cross-product
- Maths
- determinant-form
---

### VECTOR ALGEBRA

7. In view of the Observations 4 and 6, we have $\hat{i} \times \hat{j} = \hat{k}, \hat{j} \times \hat{k} = \hat{i}, \hat{k} \times \hat{i} = \hat{j}$ and $\hat{j} \times \hat{i} = -\hat{k}, \hat{k} \times \hat{j} = -\hat{i}, \hat{i} \times \hat{k} = -\hat{j}$.

8. If $\vec{a}$ and $\vec{b}$ represent the adjacent sides of a triangle then its area is given as $\frac{1}{2} |\vec{a} \times \vec{b}|$.
By definition of the area of a triangle, we have from Fig 10.26,
Area of triangle ABC = $\frac{1}{2} |\vec{AB}| |\vec{CD}|$.
But $|\vec{AB}| = |\vec{a}|$ (as given), and $|\vec{CD}| = |\vec{b}| \sin \theta$.
Thus, Area of triangle ABC = $\frac{1}{2} |\vec{a}| |\vec{b}| \sin \theta = \frac{1}{2} |\vec{a} \times \vec{b}|$.

9. If $\vec{a}$ and $\vec{b}$ represent the adjacent sides of a parallelogram, then its area is given by $|\vec{a} \times \vec{b}|$.
From Fig 10.27, we have
Area of parallelogram ABCD = $|\vec{AB}| |\vec{DE}|$.
But $|\vec{AB}| = |\vec{a}|$ (as given), and $|\vec{DE}| = |\vec{b}| \sin \theta$.
Thus, Area of parallelogram ABCD = $|\vec{a}| |\vec{b}| \sin \theta = |\vec{a} \times \vec{b}|$.

We now state two important properties of vector product.
Property 3 (Distributivity of vector product over addition): If $\vec{a}, \vec{b}, \vec{c}$ are any three vectors and $\lambda$ be a scalar, then
(i) $\vec{a} \times (\vec{b} + \vec{c}) = \vec{a} \times \vec{b} + \vec{a} \times \vec{c}$
(ii) $\vec{a} \times (\lambda \vec{b}) = \lambda (\vec{a} \times \vec{b})$

Let $\vec{a} = a_1\hat{i} + a_2\hat{j} + a_3\hat{k}$ and $\vec{b} = b_1\hat{i} + b_2\hat{j} + b_3\hat{k}$ be two vectors given in component form, respectively. Then their cross product may be given by
$\vec{a} \times \vec{b} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \end{vmatrix}$

Explanation: We have
$\vec{a} \times \vec{b} = (a_1\hat{i} + a_2\hat{j} + a_3\hat{k}) \times (b_1\hat{i} + b_2\hat{j} + b_3\hat{k})$
$= a_1b_1(\hat{i} \times \hat{i}) + a_1b_2(\hat{i} \times \hat{j}) + a_1b_3(\hat{i} \times \hat{k}) + a_2b_1(\hat{j} \times \hat{i}) + a_2b_2(\hat{j} \times \hat{j}) + a_2b_3(\hat{j} \times \hat{k}) + a_3b_1(\hat{k} \times \hat{i}) + a_3b_2(\hat{k} \times \hat{j}) + a_3b_3(\hat{k} \times \hat{k})$ (by Property 1)
$= a_1b_2(\hat{k}) + a_1b_3(-\hat{j}) + a_2b_1(-\hat{k}) + a_2b_3(\hat{i}) + a_3b_1(\hat{j}) + a_3b_2(-\hat{i})$ (as $\hat{i} \times \hat{i} = \hat{j} \times \hat{j} = \hat{k} \times \hat{k} = 0$ and $\hat{i} \times \hat{j} = \hat{k}, \hat{j} \times \hat{i} = -\hat{k}$, etc.)
$= (a_2b_3 - a_3b_2)\hat{i} + (a_3b_1 - a_1b_3)\hat{j} + (a_1b_2 - a_2b_1)\hat{k}$
$= \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \end{vmatrix}$

Example 22: Find $\vec{a} \times \vec{b}$.
Solution: We have
$\vec{a} \times \vec{b} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 2 & 1 & 3 \\ 3 & 5 & -2 \end{vmatrix} = \hat{i}(-2 - 15) - \hat{j}(-4 - 9) + \hat{k}(10 - 3) = -17\hat{i} + 13\hat{j} + 7\hat{k}$
Hence $|\vec{a} \times \vec{b}| = \sqrt{(-17)^2 + (13)^2 + (7)^2} = \sqrt{507}$
