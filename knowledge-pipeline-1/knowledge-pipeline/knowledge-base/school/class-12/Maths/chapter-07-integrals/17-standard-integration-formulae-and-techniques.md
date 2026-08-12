---
type: concept
title: Standard Integration Formulae and Techniques
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
- algebraic-substitution
- integration
- INTEGRALS
- standard-integrals
- Maths
---

### INTEGRALS

Therefore, $\int \frac{dx}{a^2 - x^2} = \frac{1}{2a} \log \left| \frac{a+x}{a-x} \right| + C$

*Note: The technique used in (1) will be explained in Section 7.5.*

(3) Put $x = a \tan \theta$. Then $dx = a \sec^2 \theta \ d\theta$.
Therefore, $\int \frac{dx}{x^2 + a^2} = \frac{1}{a} \tan^{-1} \frac{x}{a} + C$

(4) Let $x = a \sec \theta$. Then $dx = a \sec \theta \tan \theta \ d\theta$.
Therefore, $\int \frac{dx}{\sqrt{x^2 - a^2}} = \log |x + \sqrt{x^2 - a^2}| + C$

(5) Let $x = a \sin \theta$. Then $dx = a \cos \theta \ d\theta$.
Therefore, $\int \frac{dx}{\sqrt{a^2 - x^2}} = \sin^{-1} \frac{x}{a} + C$

(6) Let $x = a \tan \theta$. Then $dx = a \sec^2 \theta \ d\theta$.
Therefore, $\int \frac{dx}{\sqrt{x^2 + a^2}} = \log |x + \sqrt{x^2 + a^2}| + C$

Applying these standard formulae, we now obtain some more formulae which are useful from applications point of view and can be applied directly to evaluate other integrals.

(7) To find the integral $\int \frac{dx}{ax^2 + bx + c}$, we write:
$ax^2 + bx + c = a \left[ x^2 + \frac{b}{a}x + \frac{c}{a} \right] = a \left[ \left( x + \frac{b}{2a} \right)^2 + \left( \frac{c}{a} - \frac{b^2}{4a^2} \right) \right]$

Now, put $t = x + \frac{b}{2a}$ so that $dx = dt$ and writing $\frac{c}{a} - \frac{b^2}{4a^2} = \pm k^2$. We find the integral reduced to the form $\int \frac{dt}{t^2 \pm k^2}$ depending upon the sign of $\left( \frac{c}{a} - \frac{b^2}{4a^2} \right)$ and hence can be evaluated.

(8) To find the integral of the type $\int \frac{dx}{\sqrt{ax^2 + bx + c}}$, proceeding as in (7), we obtain the integral using the standard formulae.

(9) To find the integral of the type $\int \frac{px + q}{ax^2 + bx + c} dx$, where $p, q, a, b, c$ are constants, we are to find real numbers $A, B$ such that:
$px + q = A \frac{d}{dx} (ax^2 + bx + c) + B = A(2ax + b) + B$

To determine $A$ and $B$, we equate from both sides the coefficients of $x$ and the constant terms. $A$ and $B$ are thus obtained and hence the integral is reduced to one of the known forms.
