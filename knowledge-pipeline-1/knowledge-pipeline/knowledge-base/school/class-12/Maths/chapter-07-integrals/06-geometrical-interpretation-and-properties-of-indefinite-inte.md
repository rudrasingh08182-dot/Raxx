---
type: concept
title: Geometrical Interpretation and Properties of Indefinite Integrals
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- indefinite-integrals
- class12
- family-of-curves
- INTEGRALS
- anti-derivative
- Maths
- mathematical-properties
---

The tangents to all the curves $y = F(x) + C, C \in R$, at the points of intersection of the curves by the line $x = a, (a \in R)$, are parallel.

Further, the following equation (statement) $\int f(x) dx = F(x) + C$ (say), represents a family of curves. The different values of $C$ will correspond to different members of this family and these members can be obtained by shifting any one of the curves parallel to itself. This is the geometrical interpretation of indefinite integral.

### 7.2.2 Some properties of indefinite integral
In this subsection, we shall derive some properties of indefinite integrals.

(I) The process of differentiation and integration are inverses of each other in the sense of the following results:
$\frac{d}{dx} \int f(x) dx = f(x)$
and $\int f'(x) dx = f(x) + C$, where $C$ is any arbitrary constant.

**Proof:** Let $F$ be any anti-derivative of $f$, i.e.,
$\frac{d}{dx} F(x) = f(x)$
Then $\int f(x) dx = F(x) + C$
Therefore $\frac{d}{dx} \int f(x) dx = \frac{d}{dx} (F(x) + C)$
$= F'(x) = f(x)$
Similarly, we note that
$f'(x) = \frac{d}{dx} f(x)$
and hence $\int f'(x) dx = f(x) + C$
where $C$ is arbitrary constant called constant of integration.

(II) Two indefinite integrals with the same derivative lead to the same family of curves and so they are equivalent.

**Proof:** Let $f$ and $g$ be two functions such that
$\frac{d}{dx} \int f(x) dx = \frac{d}{dx} \int g(x) dx$
or $\frac{d}{dx} [\int f(x) dx - \int g(x) dx] = 0$
Hence $\int f(x) dx - \int g(x) dx = C$, where $C$ is any real number (Why?)
or $\int f(x) dx = \int g(x) dx + C$
So the families of curves $\{ \int f(x) dx + C, C \in R \}$ and $\{ \int g(x) dx + C, C \in R \}$ are identical.
Hence, in this sense, $\int f(x) dx$ and $\int g(x) dx$ are equivalent.
