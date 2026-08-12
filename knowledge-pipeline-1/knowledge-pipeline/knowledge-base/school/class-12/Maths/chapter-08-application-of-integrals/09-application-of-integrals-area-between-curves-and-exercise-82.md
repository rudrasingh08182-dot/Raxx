---
type: concept
title: 'Application of Integrals: Area Between Curves and Exercise 8.2'
category: school
subject: Maths
level: class-12
chapter: 8
chapter_name: APPLICATION OF INTEGRALS
content_type: solved-example
tags:
- calculus
- mathematics
- Maths
- APPLICATION OF INTEGRALS
- exercise-8.2
- class12
- area-under-curve
- integration
---

### APPLICATION OF INTEGRALS

Required area of the enclosed region $OACA'O$ between circles
$= 2 [\text{area of the region } ODCAO] \text{ (Why?)}$
$= 2 [\text{area of the region } ODAO + \text{area of the region } DCAD]$
$= 2 \left[ \int_{0}^{1} y_1 dx + \int_{1}^{2} y_2 dx \right]$
$= 2 \left[ \int_{0}^{1} \sqrt{4 - (x-2)^2} dx + \int_{1}^{2} \sqrt{4 - x^2} dx \right] \text{ (Why?)}$
$= 2 \left[ \left( \frac{x-2}{2} \sqrt{4-(x-2)^2} + \frac{4}{2} \sin^{-1} \frac{x-2}{2} \right)_{0}^{1} + \left( \frac{x}{2} \sqrt{4-x^2} + \frac{4}{2} \sin^{-1} \frac{x}{2} \right)_{1}^{2} \right]$
$= 2 \left[ \left( \frac{x-2}{2} \sqrt{4-(x-2)^2} + 2 \sin^{-1} \frac{x-2}{2} \right)_{0}^{1} + \left( \frac{x}{2} \sqrt{4-x^2} + 2 \sin^{-1} \frac{x}{2} \right)_{1}^{2} \right]$
$= \left[ \left( \frac{-1}{2} \sqrt{3} + 2 \sin^{-1} \left( -\frac{1}{2} \right) \right) - \left( -1 \sqrt{3} + 2 \sin^{-1} (-1) \right) \right] + \left[ \left( 1 \sqrt{0} + 2 \sin^{-1} (1) \right) - \left( \frac{1}{2} \sqrt{3} + 2 \sin^{-1} \frac{1}{2} \right) \right]$
$= \left[ \left( -\frac{\sqrt{3}}{2} - \frac{\pi}{3} \right) - \left( -\sqrt{3} - \pi \right) \right] + \left[ \left( 0 + \pi \right) - \left( \frac{\sqrt{3}}{2} + \frac{\pi}{3} \right) \right]$
$= \frac{8\pi}{3} - 2\sqrt{3}$

### EXERCISE 8.2

1. Find the area of the circle $4x^2 + 4y^2 = 9$ which is interior to the parabola $x^2 = 4y$.
2. Find the area bounded by curves $(x - 1)^2 + y^2 = 1$ and $x^2 + y^2 = 1$.
3. Find the area of the region bounded by the curves $y = x^2 + 2$, $y = x$, $x = 0$ and $x = 3$.
4. Using integration find the area of region bounded by the triangle whose vertices are $(-1, 0)$, $(1, 3)$ and $(3, 2)$.
5. Using integration find the area of the triangular region whose sides have the equations $y = 2x + 1$, $y = 3x + 1$ and $x = 4$.
