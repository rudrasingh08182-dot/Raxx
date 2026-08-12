---
type: concept
title: Angle Between a Line and a Plane
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- geometry
- class12
- mathematics
- THREE DIMENSIONAL GEOMETRY
- line-plane-angle
- vector-algebra
- Maths
---

### 11.10 Angle between a Line and a Plane

**Definition 3:** The angle between a line and a plane is the complement of the angle between the line and normal to the plane (Fig 11.20).

**Vector form:** If the equation of the line is $\vec{r} = \vec{a} + \lambda\vec{b}$ and the equation of the plane is $\vec{r} \cdot \vec{n} = d$. Then the angle $\theta$ between the line and the normal to the plane is

$\cos \theta = \frac{|\vec{b} \cdot \vec{n}|}{|\vec{b}| |\vec{n}|}$

and so the angle $\phi$ between the line and the plane is given by $90^\circ - \theta$, i.e.,

$\sin(90^\circ - \theta) = \cos \theta$

i.e. $\sin \phi = \frac{|\vec{b} \cdot \vec{n}|}{|\vec{b}| |\vec{n}|}$ or $\phi = \sin^{-1} \left( \frac{|\vec{b} \cdot \vec{n}|}{|\vec{b}| |\vec{n}|} \right)$

**Example 25:** Find the angle between the line $\frac{x+1}{2} = \frac{y}{3} = \frac{z-3}{6}$ and the plane $10x + 2y - 11z = 3$.

**Solution:** Let $\theta$ be the angle between the line and the normal to the plane. Converting the given equations into vector form, we have

$\vec{r} = (-\hat{i} + 3\hat{k}) + \lambda(2\hat{i} + 3\hat{j} + 6\hat{k})$

and $\vec{r} \cdot (10\hat{i} + 2\hat{j} - 11\hat{k}) = 3$

Here $\vec{b} = 2\hat{i} + 3\hat{j} + 6\hat{k}$ and $\vec{n} = 10\hat{i} + 2\hat{j} - 11\hat{k}$

$\sin \phi = \frac{|(2\hat{i} + 3\hat{j} + 6\hat{k}) \cdot (10\hat{i} + 2\hat{j} - 11\hat{k})|}{\sqrt{2^2 + 3^2 + 6^2} \sqrt{10^2 + 2^2 + (-11)^2}}$

$= \frac{|20 + 6 - 66|}{\sqrt{4 + 9 + 36} \sqrt{100 + 4 + 121}} = \frac{|-40|}{\sqrt{49} \sqrt{225}} = \frac{40}{7 \times 15} = \frac{40}{105} = \frac{8}{21}$

or $\phi = \sin^{-1} \left( \frac{8}{21} \right)$
