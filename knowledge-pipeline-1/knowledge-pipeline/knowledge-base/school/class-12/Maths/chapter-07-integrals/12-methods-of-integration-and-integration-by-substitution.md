---
type: concept
title: Methods of Integration and Integration by Substitution
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- integral-calculus
- calculus
- mathematics
- class12
- integration
- INTEGRALS
- substitution-method
- Maths
---

### 7.3 Methods of Integration

In the previous section, we discussed integrals of those functions which were readily obtainable from derivatives of some functions. It was based on inspection, i.e., on the search of a function $F$ whose derivative is $f$ which led us to the integral of $f$. However, this method, which depends on inspection, is not very suitable for many functions. Hence, we need to develop additional techniques or methods for finding the integrals by reducing them into standard forms. Prominent among them are methods based on:

1. Integration by Substitution
2. Integration using Partial Fractions
3. Integration by Parts

#### 7.3.1 Integration by substitution

In this section, we consider the method of integration by substitution.

The given integral $\int f(x) dx$ can be transformed into another form by changing the independent variable $x$ to $t$ by substituting $x = g(t)$.

Consider $I = \int f(x) dx$

Put $x = g(t)$ so that $\frac{dx}{dt} = g'(t)$.

We write $dx = g'(t) dt$

Thus $I = \int f(x) dx = \int f(g(t)) g'(t) dt$

This change of variable formula is one of the important tools available to us in the name of integration by substitution. It is often important to guess what will be the useful substitution. Usually, we make a substitution for a function whose derivative also occurs in the integrand as illustrated in the following examples.

**Example 5:** Integrate the following functions w.r.t. $x$:

(i) $\sin mx$
(ii) $x^2 \sin(x^3 + 1)$
(iii) $\frac{\tan^4 \sqrt{x} \sec^2 \sqrt{x}}{\sqrt{x}}$
(iv) $\frac{\sin(\tan^{-1} x)}{1 + x^2}$

**Solution**

(i) We know that derivative of $mx$ is $m$. Thus, we make the substitution $mx = t$ so that $m dx = dt$.

Therefore, $\int \sin mx dx = \frac{1}{m} \int \sin t dt = -\frac{1}{m} \cos t + C = -\frac{1}{m} \cos mx + C$
