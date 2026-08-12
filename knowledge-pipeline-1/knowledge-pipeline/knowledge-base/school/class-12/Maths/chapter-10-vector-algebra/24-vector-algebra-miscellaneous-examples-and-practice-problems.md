---
type: concept
title: 'Vector Algebra: Miscellaneous Examples and Practice Problems'
category: school
subject: Maths
level: class-12
chapter: 10
chapter_name: VECTOR ALGEBRA
content_type: solved-example
tags:
- mathematics
- geometry
- class12
- collinear-vectors
- vector-algebra
- VECTOR ALGEBRA
- Maths
- unit-vectors
---

### VECTOR ALGEBRA 455

10. Find the area of the parallelogram whose adjacent sides are determined by the vectors $\vec{a}$ and $\vec{b}$.

11. Let the vectors be $\vec{a}$ and $\vec{b}$ such that $|\vec{a}| = 3, |\vec{b}| = \frac{\sqrt{2}}{3}$, then $\vec{a} \times \vec{b}$ is a unit vector, if the angle between $\vec{a}$ and $\vec{b}$ is:
(A) $\pi/6$ (B) $\pi/4$ (C) $\pi/3$ (D) $\pi/2$

12. Area of a rectangle having vertices A, B, C and D with position vectors $-\hat{i} + \frac{1}{2}\hat{j} + 4\hat{k}$, $\hat{i} + \frac{1}{2}\hat{j} + 4\hat{k}$, $\hat{i} - \frac{1}{2}\hat{j} + 4\hat{k}$ and $-\hat{i} - \frac{1}{2}\hat{j} + 4\hat{k}$, respectively is:
(A) 1/2 (B) 1 (C) 2 (D) 4

#### Miscellaneous Examples

**Example 26:** Write all the unit vectors in XY-plane.
**Solution:** Let $\vec{r}$ be a unit vector in XY-plane (Fig 10.28). Then, from the figure, we have $x = \cos \theta$ and $y = \sin \theta$ (since $|\vec{r}| = 1$). So, we may write the vector $\vec{r}$ as:
$\vec{r} = \cos \theta \hat{i} + \sin \theta \hat{j}$ ... (1)
Clearly, $|\vec{r}| = \sqrt{\cos^2 \theta + \sin^2 \theta} = 1$.
Also, as $\theta$ varies from 0 to $2\pi$, the point P (Fig 10.28) traces the circle $x^2 + y^2 = 1$ counterclockwise, and this covers all possible directions. So, (1) gives every unit vector in the XY-plane.

### MATHEMATICS 456

**Example 27:** If $\hat{i} + \hat{j} + \hat{k}$, $2\hat{i} + 5\hat{j}$, $3\hat{i} + 2\hat{j} - 3\hat{k}$ and $\hat{i} - 6\hat{i} - \hat{j} + \hat{k}$ are the position vectors of points A, B, C and D respectively, then find the angle between $\vec{AB}$ and $\vec{CD}$. Deduce that $\vec{AB}$ and $\vec{CD}$ are collinear.
**Solution:** Note that if $\theta$ is the angle between $\vec{AB}$ and $\vec{CD}$, then $\theta$ is also the angle between $\vec{AB}$ and $\vec{CD}$.
Now $\vec{AB} = \text{Position vector of B} - \text{Position vector of A} = (2\hat{i} + 5\hat{j}) - (\hat{i} + \hat{j} + \hat{k}) = \hat{i} + 4\hat{j} - \hat{k}$.
Therefore $|\vec{AB}| = \sqrt{1^2 + 4^2 + (-1)^2} = \sqrt{18} = 3\sqrt{2}$.
Similarly $\vec{CD} = -2\hat{i} - 8\hat{j} + 2\hat{k}$ and $|\vec{CD}| = \sqrt{4 + 64 + 4} = \sqrt{72} = 6\sqrt{2}$.
Thus $\cos \theta = \frac{\vec{AB} \cdot \vec{CD}}{|\vec{AB}| |\vec{CD}|} = \frac{1(-2) + 4(-8) + (-1)(2)}{(3\sqrt{2})(6\sqrt{2})} = \frac{-2 - 32 - 2}{36} = -1$.
Since $0 \le \theta \le \pi$, it follows that $\theta = \pi$. This shows that $\vec{AB}$ and $\vec{CD}$ are collinear.
Alternatively, $\vec{CD} = -2\vec{AB}$, which implies that $\vec{AB}$ and $\vec{CD}$ are collinear vectors.

**Example 28:** Let $\vec{a}, \vec{b}, \vec{c}$ be three vectors such that $|\vec{a}| = 3, |\vec{b}| = 4, |\vec{c}| = 5$ and each one of them being perpendicular to the sum of the other two, find $|\vec{a} + \vec{b} + \vec{c}|$.
**Solution:** Given $\vec{a} \cdot (\vec{b} + \vec{c}) = 0, \vec{b} \cdot (\vec{a} + \vec{c}) = 0, \vec{c} \cdot (\vec{a} + \vec{b}) = 0$.
Now $|\vec{a} + \vec{b} + \vec{c}|^2 = |\vec{a}|^2 + |\vec{b}|^2 + |\vec{c}|^2 + 2(\vec{a} \cdot \vec{b} + \vec{b} \cdot \vec{c} + \vec{c} \cdot \vec{a}) = 9 + 16 + 25 + 0 = 50$.
Therefore $|\vec{a} + \vec{b} + \vec{c}| = \sqrt{50} = 5\sqrt{2}$.
