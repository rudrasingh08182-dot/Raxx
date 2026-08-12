---
type: concept
title: Examples of Anti-derivatives and Indefinite Integrals
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: solved-example
tags:
- calculus
- indefinite-integrals
- mathematics
- class12
- integration
- INTEGRALS
- anti-derivative
- Maths
---

### Example 1
Write an anti-derivative for each of the following functions using the method of inspection:
(i) $\cos 2x$ (ii) $3x^2 + 4x^3$ (iii) $\frac{1}{x}, x \neq 0$

**Solution**
(i) We look for a function whose derivative is $\cos 2x$. Recall that $\frac{d}{dx} \sin 2x = 2 \cos 2x$ or $\cos 2x = \frac{1}{2} \frac{d}{dx} (\sin 2x) = \frac{d}{dx} \left( \frac{1}{2} \sin 2x \right)$. Therefore, an anti-derivative of $\cos 2x$ is $\frac{1}{2} \sin 2x$.

(ii) We look for a function whose derivative is $3x^2 + 4x^3$. Note that $\frac{d}{dx} (x^3 + x^4) = 3x^2 + 4x^3$. Therefore, an anti-derivative of $3x^2 + 4x^3$ is $x^3 + x^4$.

(iii) We know that $\frac{d}{dx} (\log x) = \frac{1}{x}, x > 0$ and $\frac{d}{dx} [\log (-x)] = \frac{1}{-x} (-1) = \frac{1}{x}, x < 0$. Combining above, we get $\frac{d}{dx} (\log |x|) = \frac{1}{x}, x \neq 0$. Therefore, $\int \frac{1}{x} dx = \log |x|$ is one of the anti-derivatives of $\frac{1}{x}$.

### Example 2
Find the following integrals:
(i) $\int (x^3 - 1) x^{-2} dx$ (ii) $\int (x^3 + 1) dx$ (iii) $\int (x^3 + 2^x + e^x) dx$

**Solution**
(i) We have $\int (x^3 - 1) x^{-2} dx = \int x dx - \int x^{-2} dx$ (by Property V)
$= \left( \frac{x^2}{2} + C_1 \right) - \left( \frac{x^{-1}}{-1} + C_2 \right)$; $C_1, C_2$ are constants of integration
$= \frac{x^2}{2} + C_1 + \frac{1}{x} - C_2 = \frac{x^2}{2} + \frac{1}{x} + C$, where $C = C_1 - C_2$ is another constant of integration.

*Note: From now onwards, we shall write only one constant of integration in the final answer.*

(ii) We have $\int (x^3 + 1) dx = \int x^3 dx + \int 1 dx = \frac{x^4}{4} + x + C$

(iii) We have $\int (x^3 + 2^x + e^x) dx = \int x^3 dx + \int 2^x dx + \int e^x dx = \frac{x^4}{4} + \frac{2^x}{\log 2} + e^x + C$

### Example 3
Find the following integrals:
(i) $\int (\sin x + \cos x) dx$ (ii) $\int \csc x (\csc x + \cot x) dx$ (iii) $\int \frac{1 - \sin x}{\cos^2 x} dx$

**Solution**
(i) We have $\int (\sin x + \cos x) dx = \int \sin x dx + \int \cos x dx = -\cos x + \sin x + C$
