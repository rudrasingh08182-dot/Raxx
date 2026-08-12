---
type: concept
title: Steps and Examples for Evaluating Definite Integrals
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
- INTEGRALS
- definite-integrals
- Maths
- fundamental-theorem-of-calculus
---

### Steps for calculating $\int_{a}^{b} f(x) dx$.

(i) Find the indefinite integral $\int f(x) dx$. Let this be $F(x)$. There is no need to keep integration constant $C$ because if we consider $F(x) + C$ instead of $F(x)$, we get
$\int_{a}^{b} f(x) dx = [F(x) + C]_{a}^{b} = [F(b) + C] - [F(a) + C] = F(b) - F(a)$.
Thus, the arbitrary constant disappears in evaluating the value of the definite integral.

(ii) Evaluate $F(b) - F(a) = [F(x)]_{a}^{b}$, which is the value of $\int_{a}^{b} f(x) dx$.

We now consider some examples.

**Example 27 Evaluate the following integrals:**

(i) $\int_{2}^{3} x^2 dx$
(ii) $\int_{3}^{4} \frac{x^2}{x^2 - 30} dx$
(iii) $\int_{1}^{2} \frac{x}{(x+1)(x+2)} dx$
(iv) $\int_{0}^{\pi/4} \sin^3 2t \cos 2t dt$

**Solution**

(i) Let $I = \int_{2}^{3} x^2 dx$. Since $F(x) = \int x^2 dx = \frac{x^3}{3}$,
Therefore, by the second fundamental theorem, we get
$I = F(3) - F(2) = \frac{27}{3} - \frac{8}{3} = \frac{19}{3}$

(ii) Let $I = \int_{3}^{4} \frac{x^2}{x^2 - 30} dx$. We first find the anti-derivative of the integrand.
Put $t = x^2 - 30$. Then $dt = 2x dx$ or $x dx = \frac{1}{2} dt$.
Thus, $\int \frac{x^2}{x^2 - 30} dx = \int \frac{1}{2t} dt = \frac{1}{2} \log |t| = F(x) = \frac{1}{2} \log |x^2 - 30|$.
Therefore, by the second fundamental theorem of calculus, we have
$I = [F(x)]_{3}^{4} = F(4) - F(3) = \frac{1}{2} \log |16 - 30| - \frac{1}{2} \log |9 - 30|$
$= \frac{1}{2} \log 14 - \frac{1}{2} \log 21 = \frac{1}{2} \log \frac{14}{21} = \frac{1}{2} \log \frac{2}{3}$

(iii) Let $I = \int_{1}^{2} \frac{x}{(x+1)(x+2)} dx$.
Using partial fraction, we get $\frac{x}{(x+1)(x+2)} = \frac{-1}{x+1} + \frac{2}{x+2}$.
So $\int \frac{x}{(x+1)(x+2)} dx = -\log |x+1| + 2 \log |x+2| = F(x)$.
Therefore, by the second fundamental theorem of calculus, we have
$I = F(2) - F(1) = [-\log 3 + 2 \log 4] - [-\log 2 + 2 \log 3]$
$= -3 \log 3 + \log 2 + 2 \log 4 = \log \frac{32}{27}$

(iv) Let $I = \int_{0}^{\pi/4} \sin^3 2t \cos 2t dt$. Consider $\int \sin^3 2t \cos 2t dt$.
Put $\sin 2t = u$ so that $2 \cos 2t dt = du$ or $\cos 2t dt = \frac{1}{2} du$.
So $\int \sin^3 2t \cos 2t dt = \int \frac{1}{2} u^3 du = \frac{u^4}{8} = F(t) = \frac{\sin^4 2t}{8}$.
Therefore, by the second fundamental theorem of integral calculus
$I = F(\pi/4) - F(0) = \frac{1}{8} [\sin^4(\pi/2) - \sin^4(0)] = \frac{1}{8} [1 - 0] = \frac{1}{8}$
