---
type: concept
title: Angle Between Two Lines in Vector and Cartesian Form
category: school
subject: Maths
level: class-12
chapter: 11
chapter_name: THREE DIMENSIONAL GEOMETRY
content_type: concept
tags:
- three-dimensional-geometry
- class12
- angle-between-lines
- mathematics
- THREE DIMENSIONAL GEOMETRY
- direction-ratios
- direction-cosines
- Maths
---

If instead of direction ratios for the lines $L_1$ and $L_2$, direction cosines, namely $l_1, m_1, n_1$ for $L_1$ and $l_2, m_2, n_2$ for $L_2$ are given, then (1) and (2) takes the following form:

$\cos \theta = |l_1 l_2 + m_1 m_2 + n_1 n_2|$ (as $l_1^2 + m_1^2 + n_1^2 = 1$ and $l_2^2 + m_2^2 + n_2^2 = 1$) ... (3)

and $\sin \theta = \sqrt{(l_1 m_2 - l_2 m_1)^2 + (m_1 n_2 - m_2 n_1)^2 + (n_1 l_2 - n_2 l_1)^2}$ ... (4)

Two lines with direction ratios $a_1, b_1, c_1$ and $a_2, b_2, c_2$ are:
(i) perpendicular i.e. if $\theta = 90^\circ$ by (1)
$a_1 a_2 + b_1 b_2 + c_1 c_2 = 0$
(ii) parallel i.e. if $\theta = 0$ by (2)
$\frac{a_1}{a_2} = \frac{b_1}{b_2} = \frac{c_1}{c_2}$

Now, we find the angle between two lines when their equations are given. If $\theta$ is acute, the angle between the lines $\vec{r} = \vec{a_1} + \lambda \vec{b_1}$ and $\vec{r} = \vec{a_2} + \mu \vec{b_2}$ then $\cos \theta = \left| \frac{\vec{b_1} \cdot \vec{b_2}}{|\vec{b_1}| |\vec{b_2}|} \right|$.

In Cartesian form, if $\theta$ is the angle between the lines
$\frac{x - x_1}{a_1} = \frac{y - y_1}{b_1} = \frac{z - z_1}{c_1}$ ... (1)
and
$\frac{x - x_2}{a_2} = \frac{y - y_2}{b_2} = \frac{z - z_2}{c_2}$ ... (2)
where $a_1, b_1, c_1$ and $a_2, b_2, c_2$ are the direction ratios of the lines (1) and (2), respectively, then

$\cos \theta = \left| \frac{a_1 a_2 + b_1 b_2 + c_1 c_2}{\sqrt{a_1^2 + b_1^2 + c_1^2} \sqrt{a_2^2 + b_2^2 + c_2^2}} \right|$

Example 9: Find the angle between the pair of lines given by
$\vec{r} = (3\hat{i} + 2\hat{j} - 4\hat{k}) + \lambda (\hat{i} + 2\hat{j} + 2\hat{k})$
and $\vec{r} = (5\hat{i} - 2\hat{j}) + \mu (3\hat{i} + 2\hat{j} + 6\hat{k})$
