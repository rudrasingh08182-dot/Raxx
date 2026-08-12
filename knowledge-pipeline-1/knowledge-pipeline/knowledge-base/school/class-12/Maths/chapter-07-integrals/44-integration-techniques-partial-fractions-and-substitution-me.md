---
type: concept
title: 'Integration Techniques: Partial Fractions and Substitution Methods'
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: solved-example
tags:
- calculus
- class12
- integration
- integration-by-parts
- INTEGRALS
- substitution-method
- Maths
- partial-fractions
---

INTEGRALS 349

So $1 = A(x^2 + 1) + (Bx + C)(x - 1)$
$= (A + B)x^2 + (C - B)x + A - C$

Equating coefficients on both sides, we get $A + B = 0$, $C - B = 0$ and $A - C = 1$, which give $A = 1/2, B = -1/2, C = -1/2$. Substituting values of $A, B$ and $C$ in (2), we get

$\frac{1}{(x-1)(x^2+1)} = \frac{1}{2(x-1)} - \frac{1}{2} \frac{x+1}{x^2+1} = \frac{1}{2(x-1)} - \frac{x}{2(x^2+1)} - \frac{1}{2(x^2+1)}$ ... (3)

Again, substituting (3) in (1), we have

$\frac{4x^2}{(x-1)(x^2+1)} = \frac{1}{2(x-1)} - \frac{x}{2(x^2+1)} - \frac{1}{2(x^2+1)}$

Therefore

$\int \frac{4x^2}{(x-1)(x^2+1)} dx = \frac{1}{2} \log |x-1| - \frac{1}{2} \log (x^2+1) - \tan^{-1} x + C$

**Example 40** Find $\int \left[ \frac{1}{\log x} - \frac{1}{(\log x)^2} \right] dx$

**Solution** Let $I = \int \left[ \frac{1}{\log x} - \frac{1}{(\log x)^2} \right] dx$
$= \int \frac{1}{\log x} dx - \int \frac{1}{(\log x)^2} dx$

In the first integral, let us take 1 as the second function. Then integrating it by parts, we get

$I = \frac{x}{\log x} - \int x \left( -\frac{1}{(\log x)^2} \cdot \frac{1}{x} \right) dx - \int \frac{1}{(\log x)^2} dx$
$= \frac{x}{\log x} + \int \frac{1}{(\log x)^2} dx - \int \frac{1}{(\log x)^2} dx = \frac{x}{\log x} + C$ ... (1)

Again, consider $\int \frac{1}{\log x} dx$, take 1 as the second function and integrate it by parts, we have

$\int \frac{1}{\log x} dx = \left[ \frac{x}{\log x} - \int x \left( -\frac{1}{(\log x)^2} \cdot \frac{1}{x} \right) dx \right] = \frac{x}{\log x} + \int \frac{1}{(\log x)^2} dx$ ... (2)

Putting (2) in (1), we get

$I = \frac{x}{\log x} - \int \frac{1}{(\log x)^2} dx + \int \frac{1}{(\log x)^2} dx = \frac{x}{\log x} + C$

**Example 41** Find $\int [\cot x + \tan x] dx$

**Solution** We have
$I = \int [\cot x + \tan x] dx = \int \tan x (1 + \cot^2 x) dx$

Put $\tan x = t^2$, so that $\sec^2 x dx = 2t dt$ or $dx = \frac{2t dt}{1+t^4}$

Then $I = \int \frac{1}{t^2} (1 + t^4) \frac{2t}{1+t^4} dt = \int \frac{2}{t} dt = 2 \log |t| + C = 2 \log |\sqrt{\tan x}| + C = \log |\tan x| + C$

**Example 42** Find $\int \frac{\sin 2x \cos 2x}{9 - \cos^4 (2x)} dx$

**Solution** Let $I = \int \frac{\sin 2x \cos 2x}{9 - \cos^4 (2x)} dx$
