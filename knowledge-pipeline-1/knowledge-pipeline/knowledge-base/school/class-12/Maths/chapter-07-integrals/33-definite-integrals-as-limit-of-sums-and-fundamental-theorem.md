---
type: concept
title: Definite Integrals as Limit of Sums and Fundamental Theorem
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
- limit-of-sums
- INTEGRALS
- definite-integrals
- Maths
- fundamental-theorem-of-calculus
---

### Definite Integrals as Limit of Sums

If the independent variable is denoted by $t$ or $u$ instead of $x$, we simply write the integral as $\int_{a}^{b} f(t) dt$ or $\int_{a}^{b} f(u) du$ instead of $\int_{a}^{b} f(x) dx$. Hence, the variable of integration is called a dummy variable.

**Example 25:** Find $\int_{0}^{2} (x^2 + 1) dx$ as the limit of a sum.

**Solution:** By definition,
$\int_{a}^{b} f(x) dx = \lim_{n \to \infty} h [f(a) + f(a+h) + ... + f(a + (n-1)h)]$, where $h = \frac{b-a}{n}$.

In this example, $a = 0, b = 2, f(x) = x^2 + 1, h = \frac{2-0}{n} = \frac{2}{n}$.
Therefore,
$\int_{0}^{2} (x^2 + 1) dx = \lim_{n \to \infty} h [f(0) + f(h) + f(2h) + ... + f((n-1)h)]$
$= \lim_{n \to \infty} \frac{2}{n} [1 + (h^2 + 1) + ((2h)^2 + 1) + ... + (((n-1)h)^2 + 1)]$
$= \lim_{n \to \infty} \frac{2}{n} [n + h^2(1^2 + 2^2 + ... + (n-1)^2)]$
$= \lim_{n \to \infty} \frac{2}{n} [n + \frac{4}{n^2} \frac{(n-1)n(2n-1)}{6}]$
$= \lim_{n \to \infty} 2 [1 + \frac{2}{3} \frac{(n-1)(2n-1)}{n^2}]$
$= 2 [1 + \frac{2}{3} (1)(2)] = 2 [1 + \frac{4}{3}] = \frac{14}{3}$.

**Example 26:** Evaluate $\int_{0}^{2} e^x dx$ as the limit of a sum.

**Solution:** By definition,
$\int_{0}^{2} e^x dx = \lim_{n \to \infty} h [e^0 + e^h + e^{2h} + ... + e^{(n-1)h}]$, where $h = \frac{2}{n}$.
Using the sum to $n$ terms of a G.P., where $a = 1, r = e^h$, we have:
$\int_{0}^{2} e^x dx = \lim_{n \to \infty} h [\frac{e^{nh} - 1}{e^h - 1}] = \lim_{n \to \infty} \frac{2}{n} [\frac{e^2 - 1}{e^{2/n} - 1}]$
$= (e^2 - 1) \lim_{n \to \infty} [\frac{2/n}{e^{2/n} - 1}] = e^2 - 1$ [using $\lim_{h \to 0} \frac{e^h - 1}{h} = 1$].

**EXERCISE 7.8**
Evaluate the following definite integrals as limit of sums:
1. $\int_{a}^{b} x dx$
2. $\int_{0}^{5} (x+1) dx$
3. $\int_{2}^{3} x^2 dx$
4. $\int_{1}^{4} (x^2 - x) dx$
5. $\int_{-1}^{1} e^x dx$
6. $\int_{0}^{4} (x + e^{2x}) dx$

### 7.8 Fundamental Theorem of Calculus
#### 7.8.1 Area function
We have defined $\int_{a}^{b} f(x) dx$ as the area of the region bounded by the curve $y = f(x)$, the ordinates $x = a$ and $x = b$ and $x$-axis. Let $x$ be a given point in $[a, b]$. Then $\int_{a}^{x} f(x) dx$ represents the area of the light shaded region (Fig 7.3).
