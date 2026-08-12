---
type: concept
title: 'Applications of Derivatives: Finding Approximate Values and Errors'
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
- approximation
- rate-of-change
- mathematics
- calculus
- Maths
---

### Example 23
Find the approximate value of $f(3.02)$, where $f(x) = 3x^2 + 5x + 3$.

**Solution:**
Let $x = 3$ and $\Delta x = 0.02$. Then
$f(3.02) = f(x + \Delta x) = 3(x + \Delta x)^2 + 5(x + \Delta x) + 3$
Note that $\Delta y = f(x + \Delta x) - f(x)$. Therefore
$f(x + \Delta x) = f(x) + \Delta y$
$\approx f(x) + f'(x) \Delta x$ (as $dx = \Delta x$)
or $f(3.02) \approx (3x^2 + 5x + 3) + (6x + 5) \Delta x$
$= (3(3)^2 + 5(3) + 3) + (6(3) + 5) (0.02)$ (as $x = 3, \Delta x = 0.02$)
$= (27 + 15 + 3) + (18 + 5) (0.02)$
$= 45 + 0.46 = 45.46$
Hence, approximate value of $f(3.02)$ is $45.46$.

### Example 24
Find the approximate change in the volume $V$ of a cube of side $x$ meters caused by increasing the side by 2%.

**Solution:**
Note that
$V = x^3$
or $dV = \left( \frac{dV}{dx} \right) \Delta x = (3x^2) \Delta x$
$= (3x^2) (0.02x) = 0.06x^3 \text{ m}^3$ (as 2% of $x$ is $0.02x$)
Thus, the approximate change in volume is $0.06x^3 \text{ m}^3$.

### Example 25
If the radius of a sphere is measured as 9 cm with an error of 0.03 cm, then find the approximate error in calculating its volume.

**Solution:**
Let $r$ be the radius of the sphere and $\Delta r$ be the error in measuring the radius. Then $r = 9 \text{ cm}$ and $\Delta r = 0.03 \text{ cm}$. Now, the volume $V$ of the sphere is given by
$V = \frac{4}{3} \pi r^3$
or $\frac{dV}{dr} = 4\pi r^2$
Therefore $dV = \left( \frac{dV}{dr} \right) \Delta r = 4\pi r^2 \Delta r$
$= 4\pi (9)^2 (0.03) = 9.72\pi \text{ cm}^3$
Thus, the approximate error in calculating the volume is $9.72\pi \text{ cm}^3$.
