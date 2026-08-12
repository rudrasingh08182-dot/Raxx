---
type: concept
title: Definite Integrals and Miscellaneous Exercises on Integration
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
- integration-techniques
- INTEGRALS
- definite-integrals
- miscellaneous-exercises
- Maths
---

Put $\cos^2(2x) = t$ so that $4 \sin(2x) \cos(2x) dx = -dt$.
Therefore, $I = -\frac{1}{4} \int \frac{dt}{t} = -\frac{1}{4} \log |t| + C = -\frac{1}{4} \log |\cos^2(2x)| + C$.

**Example 43** Evaluate $\int_{-1}^{3} |x \sin(\pi x)| dx$.

**Solution:** Here $f(x) = |x \sin(\pi x)| = \begin{cases} x \sin(\pi x) & \text{for } -1 \le x \le 1 \\ -x \sin(\pi x) & \text{for } 1 \le x \le 3 \end{cases}$
Therefore, $\int_{-1}^{3} |x \sin(\pi x)| dx = \int_{-1}^{1} x \sin(\pi x) dx + \int_{1}^{3} -x \sin(\pi x) dx$.
Integrating both integrals on the right-hand side, we get:
$\int_{-1}^{3} |x \sin(\pi x)| dx = \left[ \frac{-x \cos(\pi x)}{\pi} + \frac{\sin(\pi x)}{\pi^2} \right]_{-1}^{1} - \left[ \frac{-x \cos(\pi x)}{\pi} + \frac{\sin(\pi x)}{\pi^2} \right]_{1}^{3} = \frac{2}{\pi} + \frac{4}{\pi} = \frac{6}{\pi}$.

**Example 44** Evaluate $\int_{0}^{\pi} \frac{x dx}{a^2 \cos^2 x + b^2 \sin^2 x}$.

**Solution:** Let $I = \int_{0}^{\pi} \frac{(\pi - x) dx}{a^2 \cos^2(\pi - x) + b^2 \sin^2(\pi - x)} = \int_{0}^{\pi} \frac{(\pi - x) dx}{a^2 \cos^2 x + b^2 \sin^2 x}$ (using P4).
$= \pi \int_{0}^{\pi} \frac{dx}{a^2 \cos^2 x + b^2 \sin^2 x} - I$.
Thus $2I = \pi \int_{0}^{\pi} \frac{dx}{a^2 \cos^2 x + b^2 \sin^2 x} = 2\pi \int_{0}^{\pi/2} \frac{dx}{a^2 \cos^2 x + b^2 \sin^2 x}$ (using P6).
$= 2\pi \int_{0}^{\pi/2} \frac{\sec^2 x dx}{a^2 + b^2 \tan^2 x} = \frac{2\pi}{b^2} \int_{0}^{\infty} \frac{dt}{a^2/b^2 + t^2}$ (put $\tan x = t$).
$= \frac{2\pi}{b^2} \cdot \frac{b}{a} \left[ \tan^{-1} \left( \frac{bt}{a} \right) \right]_{0}^{\infty} = \frac{2\pi}{ab} \cdot \frac{\pi}{2} = \frac{\pi^2}{ab}$.

**Miscellaneous Exercise on Chapter 7**
Integrate the functions in Exercises 1 to 24.
1. $\frac{1}{x - x^3}$
2. $\frac{1}{\sqrt{x+a} + \sqrt{x+b}}$
3. $\frac{1}{x \sqrt{ax - x^2}}$ [Hint: Put $x = a/t$]
4. $\frac{1}{x^2(x^4+1)^{3/4}}$
5. $\frac{1}{x^{1/2} + x^{1/3}}$ [Hint: $\frac{1}{x^{1/2} + x^{1/3}} = \frac{1}{x^{1/3}(x^{1/6} + 1)}$, put $x = t^6$]
6. $\frac{5x}{(x+1)(x^2+9)}$
7. $\frac{\sin x}{\sin(x-a)}$
8. $\frac{e^{5 \log x} - e^{4 \log x}}{e^{3 \log x} - e^{2 \log x}}$
9. $\frac{\cos x}{\sqrt{4 - \sin^2 x}}$
10. $\frac{\sin^8 x - \cos^8 x}{1 - 2 \sin^2 x \cos^2 x}$
11. $\frac{1}{\cos(x+a) \cos(x+b)}$
12. $\frac{x^3}{\sqrt{1 - x^8}}$
13. $\frac{e^x}{(1+e^x)(2+e^x)}$
14. $\frac{1}{(x^2+1)(x^2+4)}$
15. $\cos^3 x e^{\log \sin x}$
16. $e^{3 \log x} (x^4 + 1)^{-1}$
17. $f'(ax+b) [f(ax+b)]^n$
18. $\frac{1}{\sqrt{\sin^3 x \sin(x+\alpha)}}$
19. $\frac{\sin^{-1} \sqrt{x} - \cos^{-1} \sqrt{x}}{\sin^{-1} \sqrt{x} + \cos^{-1} \sqrt{x}}, x \in [0, 1]$
