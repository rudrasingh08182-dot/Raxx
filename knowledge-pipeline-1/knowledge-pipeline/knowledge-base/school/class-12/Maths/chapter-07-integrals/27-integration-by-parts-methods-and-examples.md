---
type: concept
title: 'Integration by Parts: Methods and Examples'
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- mathematics
- class12
- Maths
- INTEGRALS
- definite-integrals
- integration-by-parts
---

INTEGRALS 325

as $\sin x + k$, where $k$ is any constant, then
$\int \cos x dx = \int (\sin x + k) dx - \int (\sin x + k) dx$
$= \int (\sin x + k) dx - \int (\sin x + k) dx$
$= \sin x + kx - (\sin x + kx) + C = \sin x + C$

This shows that adding a constant to the integral of the second function is superfluous so far as the final result is concerned while applying the method of integration by parts.

(iii) Usually, if any function is a power of $x$ or a polynomial in $x$, then we take it as the first function. However, in cases where the other function is an inverse trigonometric function or logarithmic function, then we take them as the first function.

**Example 18:** Find $\int \log x dx$
**Solution:** To start with, we are unable to guess a function whose derivative is $\log x$. We take $\log x$ as the first function and the constant function $1$ as the second function. Then, the integral of the second function is $x$.
Hence, $\int (\log x \cdot 1) dx = \log x \cdot x - \int \left( \frac{d}{dx} (\log x) \cdot \int 1 dx \right) dx$
$= x \log x - \int \frac{1}{x} \cdot x dx = x \log x - \int 1 dx = x \log x - x + C$.

**Example 19:** Find $\int x e^x dx$
**Solution:** Take the first function as $x$ and the second function as $e^x$. The integral of the second function is $e^x$.
Therefore,
$\int x e^x dx = x e^x - \int 1 \cdot e^x dx = x e^x - e^x + C$.

**Example 20:** Find $\int \frac{\sin^{-1} x}{\sqrt{1-x^2}} dx$
**Solution:** Let the first function be $\sin^{-1} x$ and the second function be $\frac{1}{\sqrt{1-x^2}}$.
First we find the integral of the second function, i.e., $\int \frac{1}{\sqrt{1-x^2}} dx$.
Put $t = 1 - x^2$. Then $dt = -2x dx$.
