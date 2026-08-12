---
type: concept
title: Properties of Definite Integrals and Their Proofs
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- integration-theorems
- calculus
- class12
- INTEGRALS
- definite-integrals
- Maths
- mathematical-properties
---

### 7.10 Some Properties of Definite Integrals

We list below some important properties of definite integrals. These will be useful in evaluating the definite integrals more easily.

**P0:** $\int_{a}^{b} f(x) dx = \int_{a}^{b} f(t) dt$

**P1:** $\int_{a}^{b} f(x) dx = -\int_{b}^{a} f(x) dx$. In particular, $\int_{a}^{a} f(x) dx = 0$

**P2:** $\int_{a}^{b} f(x) dx = \int_{a}^{c} f(x) dx + \int_{c}^{b} f(x) dx$

**P3:** $\int_{a}^{b} f(x) dx = \int_{a}^{b} f(a + b - x) dx$

**P4:** $\int_{0}^{a} f(x) dx = \int_{0}^{a} f(a - x) dx$
(Note that P4 is a particular case of P3)

**P5:** $\int_{0}^{2a} f(x) dx = \int_{0}^{a} f(x) dx + \int_{0}^{a} f(2a - x) dx$

**P6:** $\int_{0}^{2a} f(x) dx = 2\int_{0}^{a} f(x) dx$, if $f(2a - x) = f(x)$ and $0$ if $f(2a - x) = -f(x)$

**P7:** 
(i) $\int_{-a}^{a} f(x) dx = 2\int_{0}^{a} f(x) dx$, if $f$ is an even function, i.e., if $f(-x) = f(x)$.
(ii) $\int_{-a}^{a} f(x) dx = 0$, if $f$ is an odd function, i.e., if $f(-x) = -f(x)$.

We give the proofs of these properties one by one.

**Proof of P0:** It follows directly by making the substitution $x = t$.

**Proof of P1:** Let $F$ be anti-derivative of $f$. Then, by the second fundamental theorem of calculus, we have $\int_{a}^{b} f(x) dx = F(b) - F(a) = -[F(a) - F(b)] = -\int_{b}^{a} f(x) dx$.
Here, we observe that, if $a = b$, then $\int_{a}^{a} f(x) dx = 0$.

**Proof of P2:** Let $F$ be anti-derivative of $f$. Then
$\int_{a}^{b} f(x) dx = F(b) - F(a) \dots (1)$
$\int_{a}^{c} f(x) dx = F(c) - F(a) \dots (2)$
and $\int_{c}^{b} f(x) dx = F(b) - F(c) \dots (3)$
