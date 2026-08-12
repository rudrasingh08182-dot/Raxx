---
type: concept
title: Approximation of Values Using Differentials
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: solved-example
tags:
- APPLICATION OF DERIVATIVES
- numerical-methods
- class12
- approximation
- mathematics
- calculus
- Maths
- differentials
---

In case $dx = \Delta x$ is relatively small when compared with $x$, $dy$ is a good approximation of $\Delta y$ and we denote it by $dy \approx \Delta y$.

For geometrical meaning of $\Delta x$, $\Delta y$, $dx$ and $dy$, one may refer to Fig 6.8.

**Note:** In view of the above discussion and Fig 6.8, we may note that the differential of the dependent variable is not equal to the increment of the variable whereas the differential of the independent variable is equal to the increment of the variable.

**Example 21:** Use differential to approximate $\sqrt{36.6}$.

**Solution:** Take $y = \sqrt{x}$. Let $x = 36$ and let $\Delta x = 0.6$. Then
$\Delta y = \sqrt{x + \Delta x} - \sqrt{x} = \sqrt{36.6} - \sqrt{36}$

or $\sqrt{36.6} = 6 + \Delta y$

Now $dy$ is approximately equal to $\Delta y$ and is given by
$dy = \left( \frac{dy}{dx} \right) \Delta x = \frac{1}{2\sqrt{x}} (0.6)$

$= \frac{1}{2\sqrt{36}} (0.6) = 0.05$ (as $y = \sqrt{x}$)

Thus, the approximate value of $\sqrt{36.6}$ is $6 + 0.05 = 6.05$.

**Example 22:** Use differential to approximate $(25)^{1/3}$.

**Solution:** Let $y = x^{1/3}$. Let $x = 27$ and let $\Delta x = -2$. Then
$\Delta y = (x + \Delta x)^{1/3} - x^{1/3} = (25)^{1/3} - (27)^{1/3} = (25)^{1/3} - 3$

or $(25)^{1/3} = 3 + \Delta y$

Now $dy$ is approximately equal to $\Delta y$ and is given by
$dy = \left( \frac{dy}{dx} \right) \Delta x = \frac{1}{3x^{2/3}} (-2)$ (as $y = x^{1/3}$)

$= \frac{1}{3(27)^{2/3}} (-2) = \frac{1}{3(9)} (-2) = -0.074$

Thus, the approximate value of $(25)^{1/3}$ is given by
$3 + (-0.074) = 2.926$
