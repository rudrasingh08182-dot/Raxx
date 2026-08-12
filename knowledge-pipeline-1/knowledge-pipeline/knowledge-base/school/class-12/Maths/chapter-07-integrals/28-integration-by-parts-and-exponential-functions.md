---
type: concept
title: Integration by Parts and Exponential Functions
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- integral-calculus
- calculus
- mathematics
- class12
- Maths
- INTEGRALS
- exponential-functions
- integration-by-parts
---

### 326 MATHEMATICS

Therefore, $\int \frac{1}{\sqrt{1-x^2}} dx = \int \frac{1}{t} dt = \ln |t| + C = \ln |\sin^{-1} x| + C$

Hence,
$\int \sin^{-1} x dx = x \sin^{-1} x - \int \frac{x}{\sqrt{1-x^2}} dx$
$= x \sin^{-1} x + \frac{1}{2} \int \frac{-2x}{\sqrt{1-x^2}} dx = x \sin^{-1} x + \sqrt{1-x^2} + C$

Alternatively, this integral can also be worked out by making substitution $\sin^{-1} x = \theta$ and then integrating by parts.

**Example 21:** Find $\int e^x \sin x dx$

**Solution:** Take $e^x$ as the first function and $\sin x$ as the second function. Then, integrating by parts, we have
$I = \int e^x \sin x dx = e^x (-\cos x) - \int e^x (-\cos x) dx = -e^x \cos x + \int e^x \cos x dx$
$= -e^x \cos x + I_1$ (say) ... (1)

Taking $e^x$ and $\cos x$ as the first and second functions, respectively, in $I_1$, we get
$I_1 = e^x \sin x - \int e^x \sin x dx$

Substituting the value of $I_1$ in (1), we get
$I = -e^x \cos x + e^x \sin x - I$ or $2I = e^x (\sin x - \cos x)$
Hence, $I = \frac{e^x}{2} (\sin x - \cos x) + C$

Alternatively, above integral can also be determined by taking $\sin x$ as the first function and $e^x$ the second function.

### 7.6.1 Integral of the type $\int e^x [f(x) + f'(x)] dx$

We have $I = \int e^x [f(x) + f'(x)] dx = \int e^x f(x) dx + \int e^x f'(x) dx$
$= I_1 + \int e^x f'(x) dx$, where $I_1 = \int e^x f(x) dx$ ... (1)

Taking $f(x)$ and $e^x$ as the first function and second function, respectively, in $I_1$ and integrating it by parts, we have $I_1 = f(x) e^x - \int f'(x) e^x dx + C$

Substituting $I_1$ in (1), we get
$I = f(x) e^x - \int f'(x) e^x dx + \int e^x f'(x) dx + C = e^x f(x) + C$
