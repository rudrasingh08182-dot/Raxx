---
type: concept
title: Integration of Special Irrational Functions and Exercises
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- indefinite-integrals
- mathematics
- class12
- integration
- exercise-solutions
- INTEGRALS
- Maths
---

INTEGRALS 329

$I = \int \sqrt{x^2 - a^2} dx = \frac{x}{2} \sqrt{x^2 - a^2} - \frac{a^2}{2} \log |x + \sqrt{x^2 - a^2}| + C$

Similarly, integrating other two integrals by parts, taking constant function 1 as the second function, we get:

(ii) $\int \sqrt{x^2 + a^2} dx = \frac{x}{2} \sqrt{x^2 + a^2} + \frac{a^2}{2} \log |x + \sqrt{x^2 + a^2}| + C$

(iii) $\int \sqrt{a^2 - x^2} dx = \frac{x}{2} \sqrt{a^2 - x^2} + \frac{a^2}{2} \sin^{-1} \frac{x}{a} + C$

Alternatively, integrals (i), (ii) and (iii) can also be found by making trigonometric substitution $x = a \sec \theta$ in (i), $x = a \tan \theta$ in (ii) and $x = a \sin \theta$ in (iii) respectively.

**Example 23** Find $\int \sqrt{x^2 + 2x + 5} dx$

**Solution** Note that $\int \sqrt{x^2 + 2x + 5} dx = \int \sqrt{(x + 1)^2 + 4} dx$

Put $x + 1 = y$, so that $dx = dy$. Then

$\int \sqrt{x^2 + 2x + 5} dx = \int \sqrt{y^2 + 2^2} dy$

$= \frac{y}{2} \sqrt{y^2 + 4} + \frac{4}{2} \log |y + \sqrt{y^2 + 4}| + C$ [using 7.6.2 (ii)]

$= \frac{x+1}{2} \sqrt{x^2 + 2x + 5} + 2 \log |(x+1) + \sqrt{x^2 + 2x + 5}| + C$

**Example 24** Find $\int \sqrt{3 - 2x - x^2} dx$

**Solution** Note that $\int \sqrt{3 - 2x - x^2} dx = \int \sqrt{4 - (x + 1)^2} dx$

Put $x + 1 = y$ so that $dx = dy$. Thus

$\int \sqrt{3 - 2x - x^2} dx = \int \sqrt{2^2 - y^2} dy$

$= \frac{y}{2} \sqrt{4 - y^2} + \frac{4}{2} \sin^{-1} \frac{y}{2} + C$ [using 7.6.2 (iii)]

$= \frac{x+1}{2} \sqrt{3 - 2x - x^2} + 2 \sin^{-1} \left( \frac{x+1}{2} \right) + C$

**EXERCISE 7.7**

Integrate the functions in Exercises 1 to 9.

1. $\sqrt{4 - x^2}$
2. $\sqrt{1 - 4x^2}$
3. $\sqrt{x^2 + 4x + 6}$
4. $\sqrt{x^2 + 4x + 1}$
5. $\sqrt{1 - 4x - x^2}$
6. $\sqrt{x^2 + 4x - 5}$
7. $\sqrt{1 + 3x - x^2}$
8. $\sqrt{x^2 + 3x}$
9. $\sqrt{1 + \frac{x^2}{9}}$

Choose the correct answer in Exercises 10 to 11.

10. $\int \sqrt{1 + x^2} dx$ is equal to
(A) $\frac{x}{2} \sqrt{1 + x^2} + \frac{1}{2} \log |x + \sqrt{1 + x^2}| + C$
(B) $\frac{2}{3} (1 + x^2)^{3/2} + C$
(C) $\frac{2}{3} x (1 + x^2)^{3/2} + C$
(D) $\frac{x^2}{2} \sqrt{1 + x^2} + \frac{1}{2} \log |x + \sqrt{1 + x^2}| + C$

11. $\int \sqrt{x^2 - 8x + 7} dx$ is equal to
(A) $\frac{1}{2} (x - 4) \sqrt{x^2 - 8x + 7} + 9 \log |x - 4 + \sqrt{x^2 - 8x + 7}| + C$
(B) $\frac{1}{2} (x - 4) \sqrt{x^2 - 8x + 7} - 3 \sqrt{2} \log |x - 4 + \sqrt{x^2 - 8x + 7}| + C$
(C) $\frac{1}{2} (x - 4) \sqrt{x^2 - 8x + 7} - \frac{9}{2} \log |x - 4 + \sqrt{x^2 - 8x + 7}| + C$
(D) $\frac{1}{2} (x - 4) \sqrt{x^2 - 8x + 7} + \frac{9}{2} \log |x - 4 + \sqrt{x^2 - 8x + 7}| + C$
