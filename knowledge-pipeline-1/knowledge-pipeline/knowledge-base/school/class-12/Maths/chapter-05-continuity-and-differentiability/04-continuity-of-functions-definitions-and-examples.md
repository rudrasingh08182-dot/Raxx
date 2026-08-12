---
type: concept
title: 'Continuity of Functions: Definitions and Examples'
category: school
subject: Maths
level: class-12
chapter: 5
chapter_name: CONTINUITY AND DIFFERENTIABILITY
content_type: concept
tags:
- mathematics
- real-functions
- calculus
- Maths
- limits
- continuity
- class12
- CONTINUITY AND DIFFERENTIABILITY
---

### Solution
The function is defined at $x = 0$ and its value at $x = 0$ is $1$. When $x \neq 0$, the function is given by a polynomial. Hence,
$\lim_{x \to 0} f(x) = \lim_{x \to 0} (x^3 + 3) = 0 + 3 = 3$

Since the limit of $f$ at $x = 0$ does not coincide with $f(0)$, the function is not continuous at $x = 0$. It may be noted that $x = 0$ is the only point of discontinuity for this function.

**Example 5:** Check the points where the constant function $f(x) = k$ is continuous.

**Solution:** The function is defined at all real numbers and by definition, its value at any real number equals $k$. Let $c$ be any real number. Then
$\lim_{x \to c} f(x) = \lim_{x \to c} k = k$

Since $f(c) = k = \lim_{x \to c} f(x)$ for any real number $c$, the function $f$ is continuous at every real number.

**Example 6:** Prove that the identity function on real numbers given by $f(x) = x$ is continuous at every real number.

**Solution:** The function is clearly defined at every point and $f(c) = c$ for every real number $c$. Also,
$\lim_{x \to c} f(x) = \lim_{x \to c} x = c$

Thus, $\lim_{x \to c} f(x) = c = f(c)$ and hence the function is continuous at every real number.

Having defined continuity of a function at a given point, now we make a natural extension of this definition to discuss continuity of a function.

**Definition 2:** A real function $f$ is said to be continuous if it is continuous at every point in the domain of $f$.

This definition requires a bit of elaboration. Suppose $f$ is a function defined on a closed interval $[a, b]$, then for $f$ to be continuous, it needs to be continuous at every point in $[a, b]$ including the end points $a$ and $b$. Continuity of $f$ at $a$ means
$\lim_{x \to a^+} f(x) = f(a)$
and continuity of $f$ at $b$ means
$\lim_{x \to b^-} f(x) = f(b)$

Observe that $\lim_{x \to a^-} f(x)$ and $\lim_{x \to b^+} f(x)$ do not make sense. As a consequence of this definition, if $f$ is defined only at one point, it is continuous there, i.e., if the domain of $f$ is a singleton, $f$ is a continuous function.
