---
type: concept
title: Evaluation of Definite Integrals by Substitution
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- mathematics
- class12
- INTEGRALS
- definite-integrals
- substitution-method
- Maths
---

### INTEGRALS

To evaluate $\int_{a}^{b} f(x) dx$, by substitution, the steps could be as follows:

1. Consider the integral without limits and substitute, $y = f(x)$ or $x = g(y)$ to reduce the given integral to a known form.
2. Integrate the new integrand with respect to the new variable without mentioning the constant of integration.
3. Resubstitute for the new variable and write the answer in terms of the original variable.
4. Find the values of answers obtained in (3) at the given limits of integral and find the difference of the values at the upper and lower limits.

**Note:** In order to quicken this method, we can proceed as follows: After performing steps 1 and 2, there is no need of step 3. Here, the integral will be kept in the new variable itself, and the limits of the integral will accordingly be changed, so that we can perform the last step.

Let us illustrate this by examples.

**Example 28:** Evaluate $\int_{-1}^{1} 5x^4(x^5 + 1)^3 dx$.

**Solution:** Put $t = x^5 + 1$, then $dt = 5x^4 dx$.

Therefore,
$\int 5x^4(x^5 + 1)^3 dx = \int t^3 dt = \frac{t^4}{4} = \frac{(x^5 + 1)^4}{4}$

Hence,
$\int_{-1}^{1} 5x^4(x^5 + 1)^3 dx = \left[ \frac{(x^5 + 1)^4}{4} \right]_{-1}^{1}$
$= \left[ \frac{(1^5 + 1)^4}{4} - \frac{((-1)^5 + 1)^4}{4} \right]$
$= \left[ \frac{2^4}{4} - \frac{0^4}{4} \right]$
$= \frac{16}{4} = 4$

Alternatively, first we transform the integral and then evaluate the transformed integral with new limits.
