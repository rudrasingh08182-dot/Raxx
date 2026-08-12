---
type: concept
title: Shortest Distance Between Two Skew Lines
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- shortest-distance
- three-dimensional-geometry
- class12
- mathematics
- skew-lines
- THREE DIMENSIONAL GEOMETRY
- vector-algebra
- Maths
---

The line GE that goes diagonally across the ceiling and the line DB passes through one corner of the ceiling directly above A and goes diagonally down the wall. These lines are skew because they are not parallel and also never meet.

By the shortest distance between two lines we mean the join of a point in one line with one point on the other line so that the length of the segment so obtained is the smallest.

For skew lines, the line of the shortest distance will be perpendicular to both the lines.

### 11.5.1 Distance between two skew lines

We now determine the shortest distance between two skew lines in the following way:

Let $l_1$ and $l_2$ be two skew lines with equations (Fig. 11.8)

$\vec{r} = \vec{a_1} + \lambda \vec{b_1}$ ... (1)

and $\vec{r} = \vec{a_2} + \mu \vec{b_2}$ ... (2)

Take any point S on $l_1$ with position vector $\vec{a_1}$ and T on $l_2$, with position vector $\vec{a_2}$.

Then the magnitude of the shortest distance vector will be equal to that of the projection of $\vec{ST}$ along the direction of the line of shortest distance (See 10.6.2).

If $\vec{PQ}$ is the shortest distance vector between $l_1$ and $l_2$, then it being perpendicular to both $\vec{b_1}$ and $\vec{b_2}$, the unit vector $\hat{n}$ along $\vec{PQ}$ would therefore be

$\hat{n} = \frac{\vec{b_1} \times \vec{b_2}}{|\vec{b_1} \times \vec{b_2}|}$ ... (3)

Then $\vec{PQ} = d \hat{n}$

where, $d$ is the magnitude of the shortest distance vector. Let $\theta$ be the angle between $\vec{ST}$ and $\vec{PQ}$. Then

$PQ = ST | \cos \theta |$

But $\cos \theta = \frac{\vec{PQ} \cdot \vec{ST}}{|\vec{PQ}| |\vec{ST}|} = \frac{\hat{n} \cdot (\vec{a_2} - \vec{a_1})}{d}$ (since $\vec{ST} = \vec{a_2} - \vec{a_1}$)

$= \frac{(\vec{b_1} \times \vec{b_2}) \cdot (\vec{a_2} - \vec{a_1})}{|\vec{b_1} \times \vec{b_2}|}$ [From (3)]
