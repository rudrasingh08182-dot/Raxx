---
type: concept
title: Integration Using Partial Fractions and Substitution
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
- substitution-method
- Maths
- partial-fractions
---

### Integration Using Partial Fractions

**Example 12 (Continued):**
We have the integrand:
$\frac{x^2+1}{x^2-5x+6} = 1 + \frac{5x-5}{(x-2)(x-3)}$

Let $\frac{5x-5}{(x-2)(x-3)} = \frac{A}{x-2} + \frac{B}{x-3}$
So that $5x - 5 = A(x - 3) + B(x - 2)$.
Equating the coefficients of $x$ and constant terms on both sides, we get $A + B = 5$ and $3A + 2B = 5$. Solving these equations, we get $A = -5$ and $B = 10$.

Thus, $\frac{x^2+1}{x^2-5x+6} = 1 - \frac{5}{x-2} + \frac{10}{x-3}$.

Therefore, $\int \frac{x^2+1}{x^2-5x+6} dx = \int 1 dx - 5 \int \frac{1}{x-2} dx + 10 \int \frac{1}{x-3} dx$
$= x - 5 \log |x - 2| + 10 \log |x - 3| + C$.

**Example 13:** Find $\int \frac{x}{(x-1)(x-3)^2} dx$

*Solution:* The integrand is of the type as given in Table 7.2 (4). We write:
$\frac{x}{(x-1)(x-3)^2} = \frac{A}{x-1} + \frac{B}{x-3} + \frac{C}{(x-3)^2}$

So that $x = A(x-3)^2 + B(x-1)(x-3) + C(x-1)$
$= A(x^2 - 6x + 9) + B(x^2 - 4x + 3) + C(x-1)$

Comparing coefficients of $x^2$, $x$, and constant term on both sides, we get:
$A + B = 0$, $-6A - 4B + C = 1$, and $9A + 3B - C = 0$.
Solving these equations, we get $A = 1/4$, $B = -1/4$, and $C = 3/2$.

Thus, the integrand is given by:
$\frac{x}{(x-1)(x-3)^2} = \frac{1}{4(x-1)} - \frac{1}{4(x-3)} + \frac{3}{2(x-3)^2}$

Therefore, $\int \frac{x}{(x-1)(x-3)^2} dx = \frac{1}{4} \int \frac{1}{x-1} dx - \frac{1}{4} \int \frac{1}{x-3} dx + \frac{3}{2} \int \frac{1}{(x-3)^2} dx$
$= \frac{1}{4} \log |x-1| - \frac{1}{4} \log |x-3| - \frac{3}{2(x-3)} + C$
$= \frac{1}{4} \log |\frac{x-1}{x-3}| - \frac{3}{2(x-3)} + C$.

**Example 14:** Find $\int \frac{x^2}{(x^2+1)(x^2+4)} dx$

*Solution:* Consider $\frac{x^2}{(x^2+1)(x^2+4)}$ and put $x^2 = y$.
Then $\frac{x^2}{(x^2+1)(x^2+4)} = \frac{y}{(y+1)(y+4)}$.
Write $\frac{y}{(y+1)(y+4)} = \frac{A}{y+1} + \frac{B}{y+4}$.
So that $y = A(y+4) + B(y+1)$.
Comparing coefficients of $y$ and constant terms on both sides, we get $A + B = 1$ and $4A + B = 0$, which give $A = -1/3$ and $B = 4/3$.

Thus, $\frac{x^2}{(x^2+1)(x^2+4)} = \frac{-1}{3(x^2+1)} + \frac{4}{3(x^2+4)}$.

Therefore, $\int \frac{x^2}{(x^2+1)(x^2+4)} dx = -\frac{1}{3} \int \frac{1}{x^2+1} dx + \frac{4}{3} \int \frac{1}{x^2+4} dx$
$= -\frac{1}{3} \tan^{-1} x + \frac{4}{3} \cdot \frac{1}{2} \tan^{-1} \frac{x}{2} + C$
$= -\frac{1}{3} \tan^{-1} x + \frac{2}{3} \tan^{-1} \frac{x}{2} + C$.

In the above example, the substitution was made only for the partial fraction part and not for the integration part. Now, we consider an example, where the integration involves a combination of the substitution method and the partial fraction method.

**Example 15:** Find $\int \frac{\cos \phi}{(1-\sin \phi)(2-\sin \phi)} d\phi$

*Solution:* Let $y = \sin \phi$. Then $dy = \cos \phi d\phi$.
