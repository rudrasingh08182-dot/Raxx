---
type: concept
title: Proof and Examples of Increasing and Decreasing Functions
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: concept
tags:
- APPLICATION OF DERIVATIVES
- application-of-derivatives
- class12
- calculus
- Maths
- mathematical-proof
- monotonicity
---

### Proof
(a) Let $x_1, x_2 \in [a, b]$ be such that $x_1 < x_2$.
Then, by Mean Value Theorem (Theorem 8 in Chapter 5), there exists a point $c$ between $x_1$ and $x_2$ such that
$f(x_2) – f(x_1) = f'(c)(x_2 – x_1)$
i.e., $f(x_2) – f(x_1) > 0$ (as $f'(c) > 0$ (given))
i.e., $f(x_2) > f(x_1)$
Thus, we have
$f(x_1) < f(x_2)$, for all $x_1, x_2 \in [a, b]$
Hence, $f$ is an increasing function in $[a, b]$.

The proofs of part (b) and (c) are similar. It is left as an exercise to the reader.

### Remarks
There is a more generalised theorem, which states that if $f'(x) > 0$ for $x$ in an interval excluding the end points and $f$ is continuous in the interval, then $f$ is increasing. Similarly, if $f'(x) < 0$ for $x$ in an interval excluding the end points and $f$ is continuous in the interval, then $f$ is decreasing.

**Example 8** Show that the function $f$ given by
$f(x) = x^3 – 3x^2 + 4x, x \in R$
is increasing on $R$.

**Solution** Note that
$f'(x) = 3x^2 – 6x + 4$
$= 3(x^2 – 2x + 1) + 1$
$= 3(x – 1)^2 + 1 > 0$, in every interval of $R$
Therefore, the function $f$ is increasing on $R$.

**Example 9** Prove that the function given by $f(x) = \cos x$ is
(a) decreasing in $(0, \pi)$
(b) increasing in $(\pi, 2\pi)$, and
(c) neither increasing nor decreasing in $(0, 2\pi)$.
