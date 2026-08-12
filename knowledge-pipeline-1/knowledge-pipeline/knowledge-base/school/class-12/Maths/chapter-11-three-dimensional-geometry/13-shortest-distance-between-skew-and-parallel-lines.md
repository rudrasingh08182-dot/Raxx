---
type: concept
title: Shortest Distance Between Skew and Parallel Lines
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- cartesian-form
- shortest-distance
- three-dimensional-geometry
- class12
- parallel-lines
- THREE DIMENSIONAL GEOMETRY
- vector-algebra
- Maths
---

### THREE DIMENSIONAL GEOMETRY

Hence, the required shortest distance is
$d = PQ = ST | \cos \theta |$

**Cartesian form**
The shortest distance between the lines
$l_1 : \frac{x-x_1}{a_1} = \frac{y-y_1}{b_1} = \frac{z-z_1}{c_1}$
and $l_2 : \frac{x-x_2}{a_2} = \frac{y-y_2}{b_2} = \frac{z-z_2}{c_2}$
is
$d = \frac{|(x_2-x_1)(b_1c_2-b_2c_1) + (y_2-y_1)(c_1a_2-c_2a_1) + (z_2-z_1)(a_1b_2-a_2b_1)|}{\sqrt{(b_1c_2-b_2c_1)^2 + (c_1a_2-c_2a_1)^2 + (a_1b_2-a_2b_1)^2}}$

#### 11.5.2 Distance between parallel lines
If two lines $l_1$ and $l_2$ are parallel, then they are coplanar. Let the lines be given by
$\vec{r} = \vec{a}_1 + \lambda \vec{b}$ ... (1)
and $\vec{r} = \vec{a}_2 + \mu \vec{b}$ … (2)
where, $\vec{a}_1$ is the position vector of a point S on $l_1$ and $\vec{a}_2$ is the position vector of a point T on $l_2$ (Fig 11.9).

As $l_1, l_2$ are coplanar, if the foot of the perpendicular from T on the line $l_1$ is P, then the distance between the lines $l_1$ and $l_2 = |TP|$.
Let $\theta$ be the angle between the vectors $\vec{ST}$ and $\vec{b}$.
Then $\vec{ST} \times \vec{b} = |\vec{ST}| |\vec{b}| \sin \theta \hat{n}$ ... (3)
where $\hat{n}$ is the unit vector perpendicular to the plane of the lines $l_1$ and $l_2$.
But $\vec{ST} = \vec{a}_2 - \vec{a}_1$

Therefore, from (3), we get
$|(\vec{a}_2 - \vec{a}_1) \times \vec{b}| = |PT| |\vec{b}|$ (since $PT = ST \sin \theta$)
i.e., $|(\vec{a}_2 - \vec{a}_1) \times \vec{b}| = |PT| |\vec{b}|$ (as $|\hat{n}| = 1$)

Hence, the distance between the given parallel lines is
$d = \frac{|(\vec{a}_2 - \vec{a}_1) \times \vec{b}|}{|\vec{b}|}$

**Example 11:** Find the shortest distance between the lines $l_1$ and $l_2$ whose vector equations are
$\vec{r} = (\hat{i} + \hat{j}) + \lambda (2\hat{i} - \hat{j} + \hat{k})$ ... (1)
and $\vec{r} = (2\hat{i} + \hat{j} - \hat{k}) + \mu (3\hat{i} - 5\hat{j} + 2\hat{k})$ ... (2)

**Solution:** Comparing (1) and (2) with $\vec{r} = \vec{a}_1 + \lambda \vec{b}_1$ and $\vec{r} = \vec{a}_2 + \mu \vec{b}_2$ respectively,
we get $\vec{a}_1 = \hat{i} + \hat{j}$, $\vec{b}_1 = 2\hat{i} - \hat{j} + \hat{k}$
$\vec{a}_2 = 2\hat{i} + \hat{j} - \hat{k}$ and $\vec{b}_2 = 3\hat{i} - 5\hat{j} + 2\hat{k}$
Therefore $\vec{a}_2 - \vec{a}_1 = \hat{i} - \hat{k}$
and $\vec{b}_1 \times \vec{b}_2 = (2\hat{i} - \hat{j} + \hat{k}) \times (3\hat{i} - 5\hat{j} + 2\hat{k})$
$= \begin{vmatrix} \hat{i} & \hat{j} & \hat{k} \\ 2 & -1 & 1 \\ 3 & -5 & 2 \end{vmatrix} = 3\hat{i} - \hat{j} - 7\hat{k}$
So $|\vec{b}_1 \times \vec{b}_2| = \sqrt{9 + 1 + 49} = \sqrt{59}$
Hence, the shortest distance between the given lines is given by
$d = \frac{|(\vec{a}_2 - \vec{a}_1) \cdot (\vec{b}_1 \times \vec{b}_2)|}{|\vec{b}_1 \times \vec{b}_2|} = \frac{|3 + 0 + 7|}{\sqrt{59}} = \frac{10}{\sqrt{59}}$

**Example 12:** Find the distance between the lines $l_1$ and $l_2$ given by
$\vec{r} = (\hat{i} + 2\hat{j} - 4\hat{k}) + \lambda (2\hat{i} + 3\hat{j} + 6\hat{k})$
and $\vec{r} = (3\hat{i} + 3\hat{j} - 5\hat{k}) + \mu (2\hat{i} + 3\hat{j} + 6\hat{k})$
