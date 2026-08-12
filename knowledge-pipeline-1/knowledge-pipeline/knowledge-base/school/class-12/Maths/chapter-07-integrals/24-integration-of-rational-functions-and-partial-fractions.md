---
type: concept
title: Integration of Rational Functions and Partial Fractions
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

### Integration of Rational Functions

Therefore, 
$\int \frac{3 \sin \phi - 2}{\cos \phi (5 - \cos^2 \phi - 4 \sin \phi)} d\phi = \int \frac{3y - 2}{y(5 - (1 - y^2) - 4y)} dy = \int \frac{3y - 2}{y^2 - 4y + 4} dy = \int \frac{3y - 2}{(y - 2)^2} dy$

Now, we write
$\frac{3y - 2}{(y - 2)^2} = \frac{A}{y - 2} + \frac{B}{(y - 2)^2}$ [by Table 7.2 (2)]

Therefore, $3y - 2 = A(y - 2) + B$. Comparing the coefficients of $y$ and constant term, we get $A = 3$ and $B - 2A = -2$, which gives $A = 3$ and $B = 4$.

Therefore, the required integral is given by
$I = \int \frac{3y - 2}{(y - 2)^2} dy = 3 \int \frac{1}{y - 2} dy + 4 \int \frac{1}{(y - 2)^2} dy$
$= 3 \log |y - 2| - \frac{4}{y - 2} + C$
$= 3 \log |\sin \phi - 2| - \frac{4}{\sin \phi - 2} + C$
$= 3 \log (2 - \sin \phi) + \frac{4}{2 - \sin \phi} + C$ (since, $2 - \sin \phi$ is always positive)

**Example 16:** Find $\int \frac{x^2 + x + 1}{(x^2 + 1)(x + 2)} dx$

**Solution:** The integrand is a proper rational function. Decompose the rational function into partial fraction [Table 2.2(5)]. Write
$\frac{x^2 + x + 1}{(x^2 + 1)(x + 2)} = \frac{Ax + B}{x^2 + 1} + \frac{C}{x + 2}$

Therefore, $x^2 + x + 1 = (Ax + B)(x + 2) + C(x^2 + 1)$

Equating the coefficients of $x^2$, $x$ and of constant term of both sides, we get $A + C = 1$, $2A + B = 1$ and $2B + C = 1$. Solving these equations, we get $A = 3/5$, $B = 1/5$ and $C = 2/5$.

Thus, the integrand is given by
$\frac{x^2 + x + 1}{(x^2 + 1)(x + 2)} = \frac{1}{5} \left( \frac{3x + 1}{x^2 + 1} + \frac{2}{x + 2} \right) = \frac{3}{5} \frac{x}{x^2 + 1} + \frac{1}{5} \frac{1}{x^2 + 1} + \frac{2}{5} \frac{1}{x + 2}$

Therefore,
$\int \frac{x^2 + x + 1}{(x^2 + 1)(x + 2)} dx = \frac{3}{10} \int \frac{2x}{x^2 + 1} dx + \frac{1}{5} \int \frac{1}{x^2 + 1} dx + \frac{2}{5} \int \frac{1}{x + 2} dx$
$= \frac{3}{10} \log |x^2 + 1| + \frac{1}{5} \tan^{-1} x + \frac{2}{5} \log |x + 2| + C$

### EXERCISE 7.5
Integrate the rational functions in Exercises 1 to 21.
1. $\frac{x}{(x+1)(x+2)}$
2. $\frac{1}{x^2 - 9}$
3. $\frac{3x - 1}{(x - 1)(x - 2)(x - 3)}$
4. $\frac{x}{(x - 1)(x - 2)(x - 3)}$
5. $\frac{2x}{x^2 + 3x + 2}$
6. $\frac{1 - x^2}{x(1 - 2x)}$
7. $\frac{x}{(x^2 + 1)(x - 1)}$
8. $\frac{x}{(x - 1)^2(x + 2)}$
9. $\frac{3x + 5}{x^3 - x^2 - x + 1}$
10. $\frac{2x - 3}{(x^2 - 1)(2x + 3)}$
11. $\frac{5x}{(x + 1)(x^2 - 4)}$
12. $\frac{x^3 + x + 1}{x^2 - 1}$
13. $\frac{2}{(1 - x)(1 + x^2)}$
14. $\frac{3x - 1}{(x + 2)^2}$
15. $\frac{1}{x^4 - 1}$
16. $\frac{1}{x(x^n + 1)}$ [Hint: multiply numerator and denominator by $x^{n-1}$ and put $x^n = t$]
17. $\frac{\cos x}{(1 - \sin x)(2 - \sin x)}$ [Hint: Put $\sin x = t$]
