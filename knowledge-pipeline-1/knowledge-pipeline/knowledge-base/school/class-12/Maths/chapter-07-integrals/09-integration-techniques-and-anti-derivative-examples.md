---
type: concept
title: Integration Techniques and Anti-derivative Examples
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
- integration
- INTEGRALS
- anti-derivative
- Maths
- functions
---

### Integrals

(ii) We have
$\int (\csc^2 x + \csc x \cot x) dx = \int \csc^2 x dx + \int \csc x \cot x dx = -\cot x - \csc x + C$

(iii) We have
$\int \frac{1 - \sin x}{\cos^2 x} dx = \int \frac{1}{\cos^2 x} dx - \int \frac{\sin x}{\cos^2 x} dx$
$= \int \sec^2 x dx - \int \sec x \tan x dx = \tan x - \sec x + C$

**Example 4:** Find the anti-derivative $F$ of $f$ defined by $f(x) = 4x^3 - 6$, where $F(0) = 3$.

**Solution:** One anti-derivative of $f(x)$ is $x^4 - 6x$ since $\frac{d}{dx}(x^4 - 6x) = 4x^3 - 6$.
Therefore, the anti-derivative $F$ is given by $F(x) = x^4 - 6x + C$, where $C$ is a constant.
Given that $F(0) = 3$, which gives:
$3 = 0 - 6 \times 0 + C$ or $C = 3$
Hence, the required anti-derivative is the unique function $F$ defined by $F(x) = x^4 - 6x + 3$.

**Remarks**
(i) We see that if $F$ is an anti-derivative of $f$, then so is $F + C$, where $C$ is any constant. Thus, if we know one anti-derivative $F$ of a function $f$, we can write down an infinite number of anti-derivatives of $f$ by adding any constant to $F$ expressed by $F(x) + C, C \in R$. In applications, it is often necessary to satisfy an additional condition which then determines a specific value of $C$ giving a unique anti-derivative of the given function.

(ii) Sometimes, $F$ is not expressible in terms of elementary functions viz., polynomial, logarithmic, exponential, trigonometric functions and their inverses etc. We are therefore blocked for finding $\int f(x) dx$. For example, it is not possible to find $\int e^{-x^2} dx$ by inspection since we cannot find a function whose derivative is $e^{-x^2}$.
