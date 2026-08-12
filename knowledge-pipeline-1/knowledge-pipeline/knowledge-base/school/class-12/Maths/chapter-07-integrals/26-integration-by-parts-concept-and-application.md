---
type: concept
title: 'Integration by Parts: Concept and Application'
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
- integration-by-parts
---

Therefore, expression (1) can be rewritten as:
$\int f(x)g(x) dx = f(x) \int g(x) dx - \int [f'(x) \int g(x) dx] dx$

i.e., $\int f(x)g(x) dx = f(x) \int g(x) dx - \int [f'(x) \int g(x) dx] dx$

If we take $f$ as the first function and $g$ as the second function, then this formula may be stated as follows:
“The integral of the product of two functions = (first function) × (integral of the second function) – Integral of [(differential coefficient of the first function) × (integral of the second function)]”

**Example 17:** Find $\int x \cos x dx$

**Solution:** Put $f(x) = x$ (first function) and $g(x) = \cos x$ (second function). Then, integration by parts gives:
$\int x \cos x dx = x \int \cos x dx - \int [\frac{d}{dx}(x) \int \cos x dx] dx$
$= x \sin x - \int 1 \cdot \sin x dx = x \sin x + \cos x + C$

Suppose, we take $f(x) = \cos x$ and $g(x) = x$. Then:
$\int x \cos x dx = \cos x \int x dx - \int [\frac{d}{dx}(\cos x) \int x dx] dx$
$= \cos x \frac{x^2}{2} - \int (-\sin x) \frac{x^2}{2} dx$
$= \frac{x^2}{2} \cos x + \frac{1}{2} \int x^2 \sin x dx$

Thus, it shows that the integral $\int x \cos x dx$ is reduced to the comparatively more complicated integral having more power of $x$. Therefore, the proper choice of the first function and the second function is significant.

**Remarks**
(i) It is worth mentioning that integration by parts is not applicable to product of functions in all cases. For instance, the method does not work for $\int \sqrt{x} \sin x dx$. The reason is that there does not exist any function whose derivative is $\sqrt{x} \sin x$.
(ii) Observe that while finding the integral of the second function, we did not add any constant of integration. If we write the integral of the second function $\cos x$.
