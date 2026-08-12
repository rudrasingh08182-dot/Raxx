---
type: concept
title: Integration Using Partial Fractions and Rational Functions
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: solved-example
tags:
- calculus
- rational-functions
- class12
- mathematics
- integration
- INTEGRALS
- Maths
- partial-fractions
---

### Example 11
Find $\int \frac{1}{(x+1)(x+2)} dx$

**Solution:** The integrand is a proper rational function. Therefore, by using the form of partial fraction [Table 7.2 (i)], we write

$\frac{1}{(x+1)(x+2)} = \frac{A}{x+1} + \frac{B}{x+2}$ ... (1)

where, real numbers A and B are to be determined suitably. This gives
$1 = A(x + 2) + B(x + 1)$.

Equating the coefficients of x and the constant term, we get
$A + B = 0$
and $2A + B = 1$

Solving these equations, we get $A = 1$ and $B = -1$.

Thus, the integrand is given by
$\frac{1}{(x+1)(x+2)} = \frac{1}{x+1} - \frac{1}{x+2}$

Therefore, $\int \frac{1}{(x+1)(x+2)} dx = \int \frac{1}{x+1} dx - \int \frac{1}{x+2} dx$
$= \log |x+1| - \log |x+2| + C$
$= \log |\frac{x+1}{x+2}| + C$

**Remark:** The equation (1) above is an identity, i.e. a statement true for all (permissible) values of x. Some authors use the symbol ‘≡’ to indicate that the statement is an identity and use the symbol ‘=’ to indicate that the statement is an equation, i.e., to indicate that the statement is true only for certain values of x.

### Example 12
Find $\int \frac{x^2+1}{x^2-5x+6} dx$

**Solution:** Here the integrand $\frac{x^2+1}{x^2-5x+6}$ is not a proper rational function, so we divide $x^2 + 1$ by $x^2 - 5x + 6$ and find that
