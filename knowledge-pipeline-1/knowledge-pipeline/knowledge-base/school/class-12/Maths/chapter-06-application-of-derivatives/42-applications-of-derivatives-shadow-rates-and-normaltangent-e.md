---
type: concept
title: 'Applications of Derivatives: Shadow Rates and Normal/Tangent Equations'
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
- calculus
- Maths
- tangents-and-normals
---

### Solution
In Fig 6.23, Let AB be the lamp-post, the lamp being at the position B and let MN be the man at a particular time $t$ and let $AM = l$ metres. Then, MS is the shadow of the man. Let $MS = s$ metres.
Note that $\Delta MSN \sim \Delta ASB$
$\frac{MS}{AS} = \frac{MN}{AB}$
or $\frac{s}{AS} = \frac{2}{6}$ (as $MN = 2$ and $AB = 6$ (given))
Thus $AS = 3s$. Since $AM = AS - MS$, we have $AM = 3s - s = 2s$. But $AM = l$.
So $l = 2s$.
Therefore $\frac{dl}{dt} = 2 \frac{ds}{dt}$.
Since $\frac{dl}{dt} = 5$ km/h. Hence, the length of the shadow increases at the rate $\frac{5}{2}$ km/h.

**Example 45** Find the equation of the normal to the curve $x^2 = 4y$ which passes through the point (1, 2).
**Solution** Differentiating $x^2 = 4y$ with respect to $x$, we get $\frac{dy}{dx} = \frac{x}{2}$.
Let $(h, k)$ be the coordinates of the point of contact of the normal to the curve $x^2 = 4y$. Now, slope of the tangent at $(h, k)$ is given by $\left[ \frac{dy}{dx} \right]_{(h, k)} = \frac{h}{2}$.
Hence, slope of the normal at $(h, k) = -\frac{2}{h}$.
Therefore, the equation of normal at $(h, k)$ is $y - k = -\frac{2}{h}(x - h)$ ... (1)
Since it passes through the point (1, 2), we have $2 - k = -\frac{2}{h}(1 - h)$ or $k = 2 + \frac{2}{h}(1 - h)$ ... (2)
Since $(h, k)$ lies on the curve $x^2 = 4y$, we have $h^2 = 4k$ ... (3)
From (2) and (3), we have $h = 2$ and $k = 1$. Substituting the values of $h$ and $k$ in (1), we get the required equation of normal as $y - 1 = -\frac{2}{2}(x - 2)$ or $x + y = 3$.

**Example 46** Find the equation of tangents to the curve $y = \cos(x + y)$, $-2\pi \leq x \leq 2\pi$ that are parallel to the line $x + 2y = 0$.
**Solution** Differentiating $y = \cos(x + y)$ with respect to $x$, we have $\frac{dy}{dx} = -\frac{\sin(x + y)}{1 + \sin(x + y)}$ or slope of tangent at $(x, y) = -\frac{\sin(x + y)}{1 + \sin(x + y)}$.
Since the tangents to the given curve are parallel to the line $x + 2y = 0$, whose slope is $-\frac{1}{2}$, we have $-\frac{\sin(x + y)}{1 + \sin(x + y)} = -\frac{1}{2}$ or $\sin(x + y) = 1$ or $x + y = n\pi + (-1)^n \frac{\pi}{2}, n \in Z$.
Then $y = \cos(x + y) = \cos(n\pi + (-1)^n \frac{\pi}{2}) = 0$, for all $n \in Z$.
Also, since $-2\pi \leq x \leq 2\pi$, we get $x = -\frac{3\pi}{2}$ and $x = \frac{\pi}{2}$. Thus, tangents to the given curve are parallel to the line $x + 2y = 0$ only at points $(-\frac{3\pi}{2}, 0)$ and $(\frac{\pi}{2}, 0)$.
Therefore, the required equation of tangents are...
