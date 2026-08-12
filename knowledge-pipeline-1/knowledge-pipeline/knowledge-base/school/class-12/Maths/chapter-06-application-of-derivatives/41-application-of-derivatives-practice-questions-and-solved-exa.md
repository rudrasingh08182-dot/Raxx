---
type: concept
title: 'Application of Derivatives: Practice Questions and Solved Examples'
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: solved-example
tags:
- APPLICATION OF DERIVATIVES
- application-of-derivatives
- class12
- rate-of-change
- mathematics
- calculus
- optimization
- Maths
---

### MATHEMATICS 234

Choose the correct answer in Questions 27 and 29.

27. The point on the curve $x^2 = 2y$ which is nearest to the point (0, 5) is
(A) $(2\sqrt{2}, 4)$ (B) $(2\sqrt{2}, 0)$ (C) $(0, 0)$ (D) $(2, 2)$

28. For all real values of $x$, the minimum value of $\frac{x^2 - x + 1}{x^2 + x + 1}$ is
(A) 0 (B) 1 (C) 3 (D) $1/3$

29. The maximum value of $f(x) = |x - 1| + 1$, $0 \le x \le 1$ is
(A) $1/3$ (B) $1/2$ (C) 1 (D) 0

#### Miscellaneous Examples

**Example 42** A car starts from a point P at time $t = 0$ seconds and stops at point Q. The distance $x$, in metres, covered by it, in $t$ seconds is given by $x = 2t^2 - \frac{t^3}{3}$. Find the time taken by it to reach Q and also find distance between P and Q.

**Solution** Let $v$ be the velocity of the car at $t$ seconds.
Now $x = 2t^2 - \frac{t^3}{3}$.
Therefore $v = \frac{dx}{dt} = 4t - t^2 = t(4 - t)$.
Thus, $v = 0$ gives $t = 0$ and/or $t = 4$.
Now $v = 0$ at P as well as at Q and at P, $t = 0$. So, at Q, $t = 4$. Thus, the car will reach the point Q after 4 seconds. Also the distance travelled in 4 seconds is given by $x|_{t=4} = 2(4)^2 - \frac{(4)^3}{3} = 32 - \frac{64}{3} = \frac{32}{3}$ m.

### APPLICATION OF DERIVATIVES 235

**Example 43** A water tank has the shape of an inverted right circular cone with its axis vertical and vertex lowermost. Its semi-vertical angle is $\tan^{-1}(0.5)$. Water is poured into it at a constant rate of 5 cubic metre per hour. Find the rate at which the level of the water is rising at the instant when the depth of water in the tank is 4 m.

**Solution** Let $r, h$ and $\alpha$ be as in Fig 6.22. Then $\tan \alpha = \frac{r}{h}$.
So $\alpha = \tan^{-1}(\frac{r}{h})$.
But $\alpha = \tan^{-1}(0.5)$ (given)
or $\frac{r}{h} = 0.5$
or $r = \frac{h}{2}$.
Let $V$ be the volume of the cone. Then $V = \frac{1}{3}\pi r^2 h = \frac{1}{3}\pi (\frac{h}{2})^2 h = \frac{\pi h^3}{12}$.
Therefore $\frac{dV}{dt} = \frac{\pi}{12} \cdot 3h^2 \frac{dh}{dt} = \frac{\pi h^2}{4} \frac{dh}{dt}$.
Now rate of change of volume, i.e., $\frac{dV}{dt} = 5$ m$^3$/h and $h = 4$ m.
Therefore $5 = \frac{\pi(4)^2}{4} \frac{dh}{dt}$
or $\frac{dh}{dt} = \frac{5}{4\pi} = \frac{5}{4\pi} \approx \frac{35}{88}$ m/h.
Thus, the rate of change of water level is $\frac{5}{4\pi}$ m/h.

**Example 44** A man of height 2 metres walks at a uniform speed of 5 km/h away from a lamp post which is 6 metres high. Find the rate at which the length of his shadow increases.
