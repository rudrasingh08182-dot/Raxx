---
type: concept
title: Fundamental Theorems of Integral Calculus
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- fundamental-theorem
- class12
- mathematics
- area-function
- INTEGRALS
- definite-integrals
- Maths
---

In Fig 7.3 [Here it is assumed that $f(x) > 0$ for $x \in [a, b]$, the assertion made below is equally true for other functions as well]. The area of this shaded region depends upon the value of $x$.

In other words, the area of this shaded region is a function of $x$. We denote this function of $x$ by $A(x)$. We call the function $A(x)$ as Area function and is given by:
$A(x) = \int_{a}^{x} f(x) dx$ ... (1)

Based on this definition, the two basic fundamental theorems have been given. However, we only state them as their proofs are beyond the scope of this textbook.

### 7.8.2 First fundamental theorem of integral calculus
**Theorem 1:** Let $f$ be a continuous function on the closed interval $[a, b]$ and let $A(x)$ be the area function. Then $A'(x) = f(x)$, for all $x \in [a, b]$.

### 7.8.3 Second fundamental theorem of integral calculus
We state below an important theorem which enables us to evaluate definite integrals by making use of anti-derivative.

**Theorem 2:** Let $f$ be a continuous function defined on the closed interval $[a, b]$ and $F$ be an anti-derivative of $f$. Then $\int_{a}^{b} f(x) dx = [F(x)]_{a}^{b} = F(b) - F(a)$.

**Remarks**
(i) In words, the Theorem 2 tells us that $\int_{a}^{b} f(x) dx = (	ext{value of the anti-derivative } F 	ext{ of } f 	ext{ at the upper limit } b - 	ext{value of the same anti-derivative at the lower limit } a)$.
(ii) This theorem is very useful, because it gives us a method of calculating the definite integral more easily, without calculating the limit of a sum.
(iii) The crucial operation in evaluating a definite integral is that of finding a function whose derivative is equal to the integrand. This strengthens the relationship between differentiation and integration.
(iv) In $\int_{a}^{b} f(x) dx$, the function $f$ needs to be well defined and continuous in $[a, b]$. For instance, the consideration of definite integral $\int_{-2}^{3} \frac{1}{x^2-1} dx$ is erroneous since the function $f$ expressed by $f(x) = \frac{1}{x^2-1}$ is not defined in a portion $-1 < x < 1$ of the closed interval $[-2, 3]$.
