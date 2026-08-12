---
type: concept
title: Properties of Indefinite Integrals and Method of Inspection
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- indefinite-integrals
- integration-by-inspection
- class12
- INTEGRALS
- Maths
- mathematical-properties
---

### Note
The equivalence of the families $\{ \int f(x) dx + C, C \in R \}$ and $\{ \int g(x) dx + C, C \in R \}$ is customarily expressed by writing $\int f(x) dx = \int g(x) dx$, without mentioning the parameter $C$.

**(III)** $\int [f(x) + g(x)] dx = \int f(x) dx + \int g(x) dx$

**Proof:** By Property (I), we have
$\frac{d}{dx} [\int (f(x) + g(x)) dx] = f(x) + g(x)$ ... (1)

On the other hand, we find that
$\frac{d}{dx} [\int f(x) dx + \int g(x) dx] = \frac{d}{dx} \int f(x) dx + \frac{d}{dx} \int g(x) dx = f(x) + g(x)$ ... (2)

Thus, in view of Property (II), it follows by (1) and (2) that
$\int (f(x) + g(x)) dx = \int f(x) dx + \int g(x) dx$.

**(IV)** For any real number $k$, $\int k f(x) dx = k \int f(x) dx$

**Proof:** By the Property (I), $\frac{d}{dx} \int k f(x) dx = k f(x)$.
Also $\frac{d}{dx} [k \int f(x) dx] = k \frac{d}{dx} \int f(x) dx = k f(x)$.
Therefore, using the Property (II), we have $\int k f(x) dx = k \int f(x) dx$.

**(V)** Properties (III) and (IV) can be generalised to a finite number of functions $f_1, f_2, ..., f_n$ and the real numbers, $k_1, k_2, ..., k_n$ giving
$\int [k_1 f_1(x) + k_2 f_2(x) + ... + k_n f_n(x)] dx = k_1 \int f_1(x) dx + k_2 \int f_2(x) dx + ... + k_n \int f_n(x) dx$.

To find an anti-derivative of a given function, we search intuitively for a function whose derivative is the given function. The search for the requisite function for finding an anti-derivative is known as integration by the method of inspection. We illustrate it through some examples.
