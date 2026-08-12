---
type: concept
title: Derivation and Application of the Distance Formula
category: school
subject: Maths
level: class-11
chapter: 7
chapter_name: COORDINATE GEOMETRY
content_type: concept
tags:
- COORDINATE GEOMETRY
- class12
- Maths
- mathematics
- coordinate-geometry
- pythagoras-theorem
- distance-formula
---

### COORDINATE GEOMETRY

Therefore, $QT = 2$ units and $PT = RS = 2$ units.
Now, using the Pythagoras theorem, we have:
$PQ^2 = PT^2 + QT^2 = 2^2 + 2^2 = 8$
So, $PQ = \sqrt{8} = 2\sqrt{2}$ units.

How will we find the distance between two points in two different quadrants?
Consider the points $P(6, 4)$ and $Q(-5, -3)$ (see Fig. 7.4). Draw $QS$ perpendicular to the x-axis. Also draw a perpendicular $PT$ from the point $P$ on $QS$ (extended) to meet the y-axis at the point $R$.

Then $PT = 11$ units and $QT = 7$ units. (Why?)
Using the Pythagoras Theorem to the right triangle $PTQ$, we get:
$PQ = \sqrt{11^2 + 7^2} = \sqrt{121 + 49} = \sqrt{170}$ units.

Let us now find the distance between any two points $P(x_1, y_1)$ and $Q(x_2, y_2)$. Draw $PR$ and $QS$ perpendicular to the x-axis. A perpendicular from the point $P$ on $QS$ is drawn to meet it at the point $T$ (see Fig. 7.5).

Then, $OR = x_1$, $OS = x_2$. So, $RS = x_2 - x_1 = PT$.
Also, $SQ = y_2$, $ST = PR = y_1$. So, $QT = y_2 - y_1$.
Now, applying the Pythagoras theorem in $\Delta PTQ$, we get:
$PQ^2 = PT^2 + QT^2$
$PQ^2 = (x_2 - x_1)^2 + (y_2 - y_1)^2$
Therefore, $PQ = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$

Note that since distance is always non-negative, we take only the positive square root. So, the distance between the points $P(x_1, y_1)$ and $Q(x_2, y_2)$ is:
$PQ = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$
which is called the distance formula.

**Remarks:**
1. In particular, the distance of a point $P(x, y)$ from the origin $O(0, 0)$ is given by $OP = \sqrt{x^2 + y^2}$.
2. We can also write, $PQ = \sqrt{(x_1 - x_2)^2 + (y_1 - y_2)^2}$. (Why?)

**Example 1:** Do the points $(3, 2)$, $(-2, -3)$ and $(2, 3)$ form a triangle? If so, name the type of triangle formed.

**Solution:** Let us apply the distance formula to find the distances $PQ$, $QR$ and $PR$, where $P(3, 2)$, $Q(-2, -3)$ and $R(2, 3)$ are the given points. We have:
$PQ = \sqrt{(3 - (-2))^2 + (2 - (-3))^2} = \sqrt{5^2 + 5^2} = \sqrt{50} = 7.07$ (approx.)
$QR = \sqrt{(-2 - 2)^2 + (-3 - 3)^2} = \sqrt{(-4)^2 + (-6)^2} = \sqrt{16 + 36} = \sqrt{52} = 7.21$ (approx.)
$PR = \sqrt{(3 - 2)^2 + (2 - 3)^2} = \sqrt{1^2 + (-1)^2} = \sqrt{2} = 1.41$ (approx.)

Since the sum of any two of these distances is greater than the third distance, therefore, the points $P, Q$ and $R$ form a triangle.
