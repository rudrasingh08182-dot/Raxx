---
type: concept
title: Continuity of Greatest Integer Function and Algebra of Continuous Functions
category: school
subject: Maths
level: class-12
chapter: 5
chapter_name: CONTINUITY AND DIFFERENTIABILITY
content_type: concept
tags:
- mathematics
- calculus
- algebra-of-functions
- Maths
- limits
- continuity
- class12
- CONTINUITY AND DIFFERENTIABILITY
---

### Case 1
Let $c$ be a real number which is not equal to any integer. It is evident from the graph that for all real numbers close to $c$ the value of the function is equal to $[c]$; i.e., $\lim_{x \to c} f(x) = \lim_{x \to c} [x] = [c]$. Also $f(c) = [c]$ and hence the function is continuous at all real numbers not equal to integers.

### Case 2
Let $c$ be an integer. Then we can find a sufficiently small real number $r > 0$ such that $[c - r] = c - 1$ whereas $[c + r] = c$.
This, in terms of limits means that:
$\lim_{x \to c^-} f(x) = c - 1$, $\lim_{x \to c^+} f(x) = c$
Since these limits cannot be equal to each other for any $c$, the function is discontinuous at every integral point.

### 5.2.1 Algebra of continuous functions
In the previous class, after having understood the concept of limits, we learnt some algebra of limits. Analogously, now we will study some algebra of continuous functions. Since continuity of a function at a point is entirely dictated by the limit of the function at that point, it is reasonable to expect results analogous to the case of limits.

**Theorem 1** Suppose $f$ and $g$ be two real functions continuous at a real number $c$. Then:
(1) $f + g$ is continuous at $x = c$.
(2) $f - g$ is continuous at $x = c$.
(3) $f \cdot g$ is continuous at $x = c$.
(4) $\frac{f}{g}$ is continuous at $x = c$, (provided $g(c) \neq 0$).

**Proof**
We are investigating continuity of $(f + g)$ at $x = c$. Clearly it is defined at $x = c$. We have:
$\lim_{x \to c} (f + g)(x) = \lim_{x \to c} [f(x) + g(x)]$ (by definition of $f + g$)
$= \lim_{x \to c} f(x) + \lim_{x \to c} g(x)$ (by the theorem on limits)
$= f(c) + g(c)$ (as $f$ and $g$ are continuous)
$= (f + g)(c)$ (by definition of $f + g$)
Hence, $f + g$ is continuous at $x = c$.
Proofs for the remaining parts are similar and left as an exercise to the reader.
