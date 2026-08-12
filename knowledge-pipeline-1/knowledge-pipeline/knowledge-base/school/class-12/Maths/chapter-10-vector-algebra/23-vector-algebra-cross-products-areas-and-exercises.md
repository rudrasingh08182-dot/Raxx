---
type: concept
title: 'Vector Algebra: Cross Products, Areas, and Exercises'
category: school
subject: Maths
level: class-12
chapter: 10
chapter_name: VECTOR ALGEBRA
content_type: solved-example
tags:
- area-of-parallelogram
- mathematics
- area-of-triangle
- class12
- vector-algebra
- VECTOR ALGEBRA
- cross-product
- Maths
- unit-vector
---

### Example 23
Find a unit vector perpendicular to each of the vectors $\vec{a}$ and $\vec{b}$ where $\vec{a} = 3\hat{i} + 2\hat{j} + 2\hat{k}$ and $\vec{b} = \hat{i} + 2\hat{j} - 2\hat{k}$.

**Solution:** We have $\vec{a} \times \vec{b}$. A vector $\vec{c}$ which is perpendicular to both $\vec{a}$ and $\vec{b}$ is given by $\vec{c} = \vec{a} \times \vec{b}$.
Now $|\vec{c}| = \sqrt{4^2 + 8^2 + 4^2} = \sqrt{16 + 64 + 16} = \sqrt{96} = 4\sqrt{6}$.
Therefore, the required unit vector is $\hat{c} = \frac{\vec{c}}{|\vec{c}|} = \frac{1}{4\sqrt{6}} (-8\hat{i} + 8\hat{j} + 4\hat{k}) = -\frac{2}{\sqrt{6}}\hat{i} + \frac{2}{\sqrt{6}}\hat{j} + \frac{1}{\sqrt{6}}\hat{k}$.

**Note:** There are two perpendicular directions to any plane. Thus, another unit vector perpendicular to $\vec{a}$ and $\vec{b}$ will be $\frac{2}{\sqrt{6}}\hat{i} - \frac{2}{\sqrt{6}}\hat{j} - \frac{1}{\sqrt{6}}\hat{k}$. But that will be a consequence of $-(\vec{a} \times \vec{b})$.

### Example 24
Find the area of a triangle having the points A(1, 1, 1), B(1, 2, 3) and C(2, 3, 1) as its vertices.

**Solution:** We have $\vec{AB} = (1-1)\hat{i} + (2-1)\hat{j} + (3-1)\hat{k} = \hat{j} + 2\hat{k}$ and $\vec{AC} = (2-1)\hat{i} + (3-1)\hat{j} + (1-1)\hat{k} = \hat{i} + 2\hat{j}$. The area of the given triangle is $\frac{1}{2} |\vec{AB} \times \vec{AC}|$.
Now $\vec{AB} \times \vec{AC} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 0 & 1 & 2 \\ 1 & 2 & 0 \end{vmatrix} = \hat{i}(0-4) - \hat{j}(0-2) + \hat{k}(0-1) = -4\hat{i} + 2\hat{j} - \hat{k}$.
Therefore $|\vec{AB} \times \vec{AC}| = \sqrt{(-4)^2 + 2^2 + (-1)^2} = \sqrt{16 + 4 + 1} = \sqrt{21}$.
Thus, the required area is $\frac{\sqrt{21}}{2}$.

### Example 25
Find the area of a parallelogram whose adjacent sides are given by the vectors $\vec{a} = 3\hat{i} + \hat{j} + 4\hat{k}$ and $\vec{b} = \hat{i} - \hat{j} + \hat{k}$.

**Solution:** The area of a parallelogram with $\vec{a}$ and $\vec{b}$ as its adjacent sides is given by $|\vec{a} \times \vec{b}|$.
Now $\vec{a} \times \vec{b} = \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 3 & 1 & 4 \\ 1 & -1 & 1 \end{vmatrix} = \hat{i}(1+4) - \hat{j}(3-4) + \hat{k}(-3-1) = 5\hat{i} + \hat{j} - 4\hat{k}$.
Therefore $|\vec{a} \times \vec{b}| = \sqrt{5^2 + 1^2 + (-4)^2} = \sqrt{25 + 1 + 16} = \sqrt{42}$, and hence, the required area is $\sqrt{42}$.

### EXERCISE 10.4
1. Find $|\vec{a} \times \vec{b}|$ if $\vec{a} = \hat{i} - 7\hat{j} + 7\hat{k}$ and $\vec{b} = 3\hat{i} - 2\hat{j} + 2\hat{k}$.
2. Find a unit vector perpendicular to each of the vector $\vec{a} + \vec{b}$ and $\vec{a} - \vec{b}$, where $\vec{a} = 3\hat{i} + 2\hat{j} + 2\hat{k}$ and $\vec{b} = \hat{i} + 2\hat{j} - 2\hat{k}$.
3. If a unit vector $\vec{a}$ makes angles $\frac{\pi}{3}$ with $\hat{i}$, $\frac{\pi}{4}$ with $\hat{j}$ and an acute angle $\theta$ with $\hat{k}$, then find $\theta$ and hence, the components of $\vec{a}$.
4. Show that $(\vec{a} - \vec{b}) \times (\vec{a} + \vec{b}) = 2(\vec{a} \times \vec{b})$.
5. Find $\lambda$ and $\mu$ if $(2\hat{i} + 6\hat{j} + 27\hat{k}) \times (\hat{i} + \lambda\hat{j} + \mu\hat{k}) = \vec{0}$.
6. Given that $\vec{a} \cdot \vec{b} = 0$ and $\vec{a} \times \vec{b} = \vec{0}$. What can you conclude about the vectors $\vec{a}$ and $\vec{b}$?
7. Let the vectors $\vec{a}, \vec{b}, \vec{c}$ be given as $\vec{a} = a_1\hat{i} + a_2\hat{j} + a_3\hat{k}$, $\vec{b} = b_1\hat{i} + b_2\hat{j} + b_3\hat{k}$, $\vec{c} = c_1\hat{i} + c_2\hat{j} + c_3\hat{k}$. Then show that $\vec{a} \times (\vec{b} + \vec{c}) = \vec{a} \times \vec{b} + \vec{a} \times \vec{c}$.
8. If either $\vec{a} = \vec{0}$ or $\vec{b} = \vec{0}$, then $\vec{a} \times \vec{b} = \vec{0}$. Is the converse true? Justify your answer with an example.
9. Find the area of the triangle with vertices A(1, 1, 2), B(2, 3, 5) and C(1, 5, 5).
