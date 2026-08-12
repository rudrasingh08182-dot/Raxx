---
type: concept
title: 'Applications of Derivatives: Rate of Change Examples'
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
- calculus
- Maths
- geometry-applications
---

### Application of Derivatives

Thus, the rate of change of $y$ with respect to $x$ can be calculated using the rate of change of $y$ and that of $x$ both with respect to $t$.

Let us consider some examples.

**Example 1:** Find the rate of change of the area of a circle per second with respect to its radius $r$ when $r = 5$ cm.

**Solution:** The area $A$ of a circle with radius $r$ is given by $A = \pi r^2$. Therefore, the rate of change of the area $A$ with respect to its radius $r$ is given by $\frac{dA}{dr} = \frac{d}{dr}(\pi r^2) = 2\pi r$.

When $r = 5$ cm, $\frac{dA}{dr} = 10\pi$. Thus, the area of the circle is changing at the rate of $10\pi \text{ cm}^2/\text{s}$.

**Example 2:** The volume of a cube is increasing at a rate of 9 cubic centimetres per second. How fast is the surface area increasing when the length of an edge is 10 centimetres?

**Solution:** Let $x$ be the length of a side, $V$ be the volume and $S$ be the surface area of the cube. Then, $V = x^3$ and $S = 6x^2$, where $x$ is a function of time $t$.

Now $\frac{dV}{dt} = 9 \text{ cm}^3/\text{s}$ (Given)

Therefore $9 = \frac{dV}{dt} = \frac{d}{dt}(x^3) = \frac{d}{dx}(x^3) \cdot \frac{dx}{dt}$ (By Chain Rule)

$= 3x^2 \frac{dx}{dt}$

or $\frac{dx}{dt} = \frac{9}{3x^2} = \frac{3}{x^2}$ ... (1)

Now $\frac{dS}{dt} = \frac{d}{dt}(6x^2) = \frac{d}{dx}(6x^2) \cdot \frac{dx}{dt}$ (By Chain Rule)

$= 12x \cdot \frac{dx}{dt} = 12x \cdot \left( \frac{3}{x^2} \right) = \frac{36}{x}$ (Using (1))

Hence, when $x = 10$ cm, $\frac{dS}{dt} = 3.6 \text{ cm}^2/\text{s}$.
