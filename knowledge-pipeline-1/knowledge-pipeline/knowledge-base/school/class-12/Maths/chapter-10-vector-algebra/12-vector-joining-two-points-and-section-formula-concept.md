---
type: concept
title: Vector Joining Two Points and Section Formula Concept
category: school
subject: Maths
level: class-12
chapter: 10
chapter_name: VECTOR ALGEBRA
content_type: concept
tags:
- position-vectors
- mathematics
- class12
- vector-algebra
- VECTOR ALGEBRA
- Maths
- section-formula
---

### Example 10
Find the vector joining the points $P(2, 3, 0)$ and $Q(-1, -2, -4)$ directed from $P$ to $Q$.

**Solution:** Since the vector is to be directed from $P$ to $Q$, clearly $P$ is the initial point and $Q$ is the terminal point. So, the required vector joining $P$ and $Q$ is the vector $\vec{PQ}$, given by:
$\vec{PQ} = (-1 - 2)\hat{i} + (-2 - 3)\hat{j} + (-4 - 0)\hat{k}$
i.e., $\vec{PQ} = -3\hat{i} - 5\hat{j} - 4\hat{k}$.

### 10.5.3 Section formula
Let $P$ and $Q$ be two points represented by the position vectors $\vec{OP}$ and $\vec{OQ}$ respectively, with respect to the origin $O$. Then the line segment joining the points $P$ and $Q$ may be divided by a third point, say $R$, in two ways – internally (Fig 10.16) and externally (Fig 10.17). Here, we intend to find the position vector $\vec{OR}$ for the point $R$ with respect to the origin $O$. We take the two cases one by one.

**Case I: When $R$ divides $PQ$ internally (Fig 10.16).**
If $R$ divides $PQ$ such that $\frac{PR}{RQ} = \frac{m}{n}$, where $m$ and $n$ are positive scalars, we say that the point $R$ divides $PQ$ internally in the ratio of $m : n$. Now from triangles $ORQ$ and $OPR$, we have:
$\vec{PR} = \vec{OR} - \vec{OP}$
and $\vec{RQ} = \vec{OQ} - \vec{OR}$.
Therefore, we have $m(\vec{OQ} - \vec{OR}) = n(\vec{OR} - \vec{OP})$ (Why?)
or $\vec{OR} = \frac{m\vec{OQ} + n\vec{OP}}{m + n}$ (on simplification).

Hence, the position vector of the point $R$ which divides $P$ and $Q$ internally in the ratio of $m : n$ is given by:
$\vec{OR} = \frac{m\vec{b} + n\vec{a}}{m + n}$ (where $\vec{a} = \vec{OP}$ and $\vec{b} = \vec{OQ}$).
