---
type: concept
title: Definite Integrals by Substitution and Exercise 7.10
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: practice-question
tags:
- calculus
- exercise-problems
- mathematics
- class12
- INTEGRALS
- definite-integrals
- substitution-method
- Maths
---

340 MATHEMATICS

Let $t = x^5 + 1$. Then $dt = 5x^4 dx$.
Note that, when $x = -1$, $t = 0$ and when $x = 1$, $t = 2$.
Thus, as $x$ varies from $-1$ to $1$, $t$ varies from $0$ to $2$.
Therefore,
$\int_{-1}^{1} 5x^4(x^5+1)^4 dx = \int_{0}^{2} t^4 dt$
$= \left[ \frac{t^5}{5} \right]_{0}^{2} = \frac{32}{5}$

**Example 29** Evaluate $\int_{0}^{1} \frac{\tan^{-1} x}{1+x^2} dx$

**Solution** Let $t = \tan^{-1} x$, then $dt = \frac{1}{1+x^2} dx$. The new limits are, when $x = 0$, $t = 0$ and when $x = 1$, $t = \frac{\pi}{4}$. Thus, as $x$ varies from $0$ to $1$, $t$ varies from $0$ to $\frac{\pi}{4}$.
Therefore,
$\int_{0}^{1} \frac{\tan^{-1} x}{1+x^2} dx = \int_{0}^{\frac{\pi}{4}} t dt = \left[ \frac{t^2}{2} \right]_{0}^{\frac{\pi}{4}} = \frac{\pi^2}{32}$

**EXERCISE 7.10**
Evaluate the integrals in Exercises 1 to 8 using substitution.

1. $\int_{0}^{1} \frac{x}{x^2+1} dx$
2. $\int_{0}^{\frac{\pi}{2}} \sin \phi \cos^5 \phi d\phi$
3. $\int_{0}^{1} \sin^{-1} \left( \frac{2x}{1+x^2} \right) dx$
4. $\int_{0}^{2} x\sqrt{x+2} dx$ (Put $x + 2 = t^2$)
5. $\int_{0}^{\frac{\pi}{2}} \frac{\sin x}{1 + \cos^2 x} dx$
6. $\int_{0}^{2} \frac{dx}{x+4-x^2}$
7. $\int_{-1}^{1} \frac{dx}{x^2+2x+5}$
8. $\int_{1}^{2} \left( \frac{1}{x} - \frac{1}{2x^2} \right) e^{2x} dx$

Choose the correct answer in Exercises 9 and 10.

9. The value of the integral $\int_{1/3}^{1} \frac{(x-x^3)^{1/3}}{x^4} dx$ is
(A) 6 (B) 0 (C) 3 (D) 4

10. If $f(x) = \int_{0}^{x^2} \frac{\sin t}{t} dt$, then $f'(x)$ is
(A) $\cos x + x \sin x$ (B) $x \sin x$
(C) $x \cos x$ (D) $\sin x + x \cos x$
