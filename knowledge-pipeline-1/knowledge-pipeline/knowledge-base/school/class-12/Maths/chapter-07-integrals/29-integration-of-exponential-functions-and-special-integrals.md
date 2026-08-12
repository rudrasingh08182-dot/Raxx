---
type: concept
title: Integration of Exponential Functions and Special Integrals
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: solved-example
tags:
- calculus
- mathematics
- class12
- integration
- integration-by-parts
- INTEGRALS
- exponential-functions
- Maths
---

### Integrals

Thus, $\int e^x [f(x) + f'(x)] dx = e^x f(x) + C$

**Example 22** Find:
(i) $\int e^x \left( \tan^{-1} x + \frac{1}{1+x^2} \right) dx$
(ii) $\int \frac{x^2+1}{(x+1)^2} e^x dx$

**Solution**

(i) We have $I = \int e^x \left( \tan^{-1} x + \frac{1}{1+x^2} \right) dx$
Consider $f(x) = \tan^{-1} x$, then $f'(x) = \frac{1}{1+x^2}$.
Thus, the given integrand is of the form $e^x [f(x) + f'(x)]$.
Therefore, $I = \int e^x \left( \tan^{-1} x + \frac{1}{1+x^2} \right) dx = e^x \tan^{-1} x + C$

(ii) We have $I = \int \frac{x^2+1}{(x+1)^2} e^x dx$
$= \int e^x \left[ \frac{x^2-1+2}{(x+1)^2} \right] dx$
$= \int e^x \left[ \frac{(x-1)(x+1)}{(x+1)^2} + \frac{2}{(x+1)^2} \right] dx = \int e^x \left[ \frac{x-1}{x+1} + \frac{2}{(x+1)^2} \right] dx$
Consider $f(x) = \frac{x-1}{x+1}$, then $f'(x) = \frac{2}{(x+1)^2}$.
Thus, the given integrand is of the form $e^x [f(x) + f'(x)]$.
Therefore, $\int \frac{x^2+1}{(x+1)^2} e^x dx = e^x \left( \frac{x-1}{x+1} \right) + C$

**EXERCISE 7.6**
Integrate the functions in Exercises 1 to 22.
1. $x \sin x$ 2. $x \sin 3x$ 3. $x^2 e^x$ 4. $x \log x$
5. $x \log 2x$ 6. $x^2 \log x$ 7. $x \sin^{-1} x$ 8. $x \tan^{-1} x$
9. $x \cos^{-1} x$ 10. $(\sin^{-1} x)^2$ 11. $\frac{x \cos^{-1} x}{\sqrt{1-x^2}}$
12. $x \sec^2 x$ 13. $\tan^{-1} x$ 14. $x (\log x)^2$ 15. $(x^2 + 1) \log x$
16. $e^x (\sin x + \cos x)$ 17. $\frac{xe^x}{(1+x)^2}$ 18. $e^x \left( \frac{1+\sin x}{1+\cos x} \right)$
19. $e^x \left( \frac{1}{x} - \frac{1}{x^2} \right)$ 20. $\frac{(x-3)e^x}{(x-1)^3}$ 21. $e^{2x} \sin x$
22. $e^x \left( \frac{\sin 4x - 2}{1 - \cos 4x} \right)$

Choose the correct answer in Exercises 23 and 24.
23. $\int x^2 e^{x^3} dx$ equals
(A) $\frac{1}{3} e^{x^3} + C$ (B) $\frac{1}{3} e^{x^2} + C$ (C) $\frac{1}{2} e^{x^3} + C$ (D) $\frac{1}{2} e^{x^2} + C$
24. $\int e^x \sec x (1 + \tan x) dx$ equals
(A) $e^x \cos x + C$ (B) $e^x \sec x + C$ (C) $e^x \sin x + C$ (D) $e^x \tan x + C$

**7.6.2 Integrals of some more types**
Here, we discuss some special types of standard integrals based on the technique of integration by parts:
(i) $\int \sqrt{x^2 - a^2} dx$ (ii) $\int \sqrt{x^2 + a^2} dx$ (iii) $\int \sqrt{a^2 - x^2} dx$
(i) Let $I = \int \sqrt{x^2 - a^2} dx$
Taking constant function 1 as the second function and integrating by parts, we have
$I = x \sqrt{x^2 - a^2} - \int \frac{x \cdot 2x}{2\sqrt{x^2 - a^2}} dx$
$= x \sqrt{x^2 - a^2} - \int \frac{x^2}{\sqrt{x^2 - a^2}} dx = x \sqrt{x^2 - a^2} - \int \frac{x^2 - a^2 + a^2}{\sqrt{x^2 - a^2}} dx$
