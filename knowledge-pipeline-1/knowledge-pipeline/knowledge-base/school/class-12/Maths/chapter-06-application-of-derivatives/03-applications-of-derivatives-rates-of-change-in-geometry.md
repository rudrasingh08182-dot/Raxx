---
type: concept
title: 'Applications of Derivatives: Rates of Change in Geometry'
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: solved-example
tags:
- derivatives
- APPLICATION OF DERIVATIVES
- class12
- rate-of-change
- mathematics
- geometry-problems
- calculus
- Maths
---

### Example 3
A stone is dropped into a quiet lake and waves move in circles at a speed of 4 cm/s. At the instant when the radius of the circular wave is 10 cm, how fast is the enclosed area increasing?

**Solution:**
The area $A$ of a circle with radius $r$ is given by $A = \pi r^2$. Therefore, the rate of change of area $A$ with respect to time $t$ is:
$\frac{dA}{dt} = \frac{d}{dt}(\pi r^2) = \pi \cdot 2r \frac{dr}{dt} = 2\pi r \frac{dr}{dt}$ (By Chain Rule)

It is given that $\frac{dr}{dt} = 4 \text{ cm/s}$.
Therefore, when $r = 10 \text{ cm}$, $\frac{dA}{dt} = 2\pi(10)(4) = 80\pi$.
Thus, the enclosed area is increasing at the rate of $80\pi \text{ cm}^2/\text{s}$, when $r = 10 \text{ cm}$.

**Note:** $\frac{dy}{dx}$ is positive if $y$ increases as $x$ increases and is negative if $y$ decreases as $x$ increases.

### Example 4
The length $x$ of a rectangle is decreasing at the rate of 3 cm/minute and the width $y$ is increasing at the rate of 2 cm/minute. When $x = 10 \text{ cm}$ and $y = 6 \text{ cm}$, find the rates of change of (a) the perimeter and (b) the area of the rectangle.

**Solution:**
Since the length $x$ is decreasing and the width $y$ is increasing with respect to time, we have:
$\frac{dx}{dt} = -3 \text{ cm/min}$ and $\frac{dy}{dt} = 2 \text{ cm/min}$.

(a) The perimeter $P$ of a rectangle is given by:
$P = 2(x + y)$
Therefore, $\frac{dP}{dt} = 2 \left( \frac{dx}{dt} + \frac{dy}{dt} \right) = 2(-3 + 2) = -2 \text{ cm/min}$.

(b) The area $A$ of the rectangle is given by:
$A = x \cdot y$
Therefore, $\frac{dA}{dt} = x \frac{dy}{dt} + y \frac{dx}{dt}$
$= 10(2) + 6(-3) \text{ (as } x = 10 \text{ cm and } y = 6 \text{ cm)}$
$= 20 - 18 = 2 \text{ cm}^2/\text{min}$.
