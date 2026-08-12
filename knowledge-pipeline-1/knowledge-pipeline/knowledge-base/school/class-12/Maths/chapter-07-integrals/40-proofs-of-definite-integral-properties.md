---
type: concept
title: Proofs of Definite Integral Properties
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- mathematical-proofs
- class12
- integration-properties
- INTEGRALS
- definite-integrals
- Maths
---

342 MATHEMATICS

Adding (2) and (3), we get
$\int_{a}^{c} f(x) dx + \int_{c}^{b} f(x) dx = \int_{a}^{b} f(x) dx$
This proves the property $P_2$.

Proof of $P_3$: Let $t = a + b - x$. Then $dt = -dx$. When $x = a$, $t = b$ and when $x = b$, $t = a$.
Therefore
$\int_{a}^{b} f(x) dx = \int_{b}^{a} f(a + b - t) (-dt)$
$= \int_{a}^{b} f(a + b - t) dt$ (by $P_1$)
$= \int_{a}^{b} f(a + b - x) dx$ (by $P_0$)

Proof of $P_4$: Put $t = a - x$. Then $dt = -dx$. When $x = 0$, $t = a$ and when $x = a$, $t = 0$. Now proceed as in $P_3$.

Proof of $P_5$: Using $P_2$, we have
$\int_{0}^{2a} f(x) dx = \int_{0}^{a} f(x) dx + \int_{a}^{2a} f(x) dx$
Let $t = 2a - x$ in the second integral on the right hand side. Then $dt = -dx$. When $x = a$, $t = a$ and when $x = 2a$, $t = 0$. Also $x = 2a - t$.
Therefore, the second integral becomes
$\int_{a}^{2a} f(x) dx = \int_{a}^{0} f(2a - t) (-dt) = \int_{0}^{a} f(2a - t) dt = \int_{0}^{a} f(2a - x) dx$
Hence
$\int_{0}^{2a} f(x) dx = \int_{0}^{a} f(x) dx + \int_{0}^{a} f(2a - x) dx$

Proof of $P_6$: Using $P_5$, we have
$\int_{0}^{2a} f(x) dx = \int_{0}^{a} f(x) dx + \int_{0}^{a} f(2a - x) dx$ ... (1)
Now, if $f(2a - x) = f(x)$, then (1) becomes
$\int_{0}^{2a} f(x) dx = \int_{0}^{a} f(x) dx + \int_{0}^{a} f(x) dx = 2\int_{0}^{a} f(x) dx$,
and if $f(2a - x) = -f(x)$, then (1) becomes
$\int_{0}^{2a} f(x) dx = \int_{0}^{a} f(x) dx - \int_{0}^{a} f(x) dx = 0$

Proof of $P_7$: Using $P_2$, we have
$\int_{-a}^{a} f(x) dx = \int_{-a}^{0} f(x) dx + \int_{0}^{a} f(x) dx$. Then
Let $t = -x$ in the first integral on the right hand side.
$dt = -dx$. When $x = -a$, $t = a$ and when $x = 0$, $t = 0$. Also $x = -t$.
