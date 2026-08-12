---
type: concept
title: Examples of Continuity of Functions
category: school
subject: Maths
level: class-12
chapter: 5
chapter_name: CONTINUITY AND DIFFERENTIABILITY
content_type: solved-example
tags:
- mathematics
- calculus
- Maths
- real-numbers
- functions
- continuity
- class12
- CONTINUITY AND DIFFERENTIABILITY
---

### Example 7
Is the function defined by $f(x) = |x|$, a continuous function?

**Solution:**
We may rewrite $f$ as:
$f(x) = \begin{cases} -x, & \text{if } x < 0 \\ x, & \text{if } x \geq 0 \end{cases}$

By Example 3, we know that $f$ is continuous at $x = 0$.
Let $c$ be a real number such that $c < 0$. Then $f(c) = -c$. Also
$\lim_{x \to c} f(x) = \lim_{x \to c} (-x) = -c$ (Why?)
Since $\lim_{x \to c} f(x) = f(c)$, $f$ is continuous at all negative real numbers.
Now, let $c$ be a real number such that $c > 0$. Then $f(c) = c$. Also
$\lim_{x \to c} f(x) = \lim_{x \to c} x = c$ (Why?)
Since $\lim_{x \to c} f(x) = f(c)$, $f$ is continuous at all positive real numbers. Hence, $f$ is continuous at all points.

### Example 8
Discuss the continuity of the function $f$ given by $f(x) = x^3 + x^2 - 1$.

**Solution:**
Clearly $f$ is defined at every real number $c$ and its value at $c$ is $c^3 + c^2 - 1$. We also know that
$\lim_{x \to c} f(x) = \lim_{x \to c} (x^3 + x^2 - 1) = c^3 + c^2 - 1$
Thus $\lim_{x \to c} f(x) = f(c)$, and hence $f$ is continuous at every real number. This means $f$ is a continuous function.

### Example 9
Discuss the continuity of the function $f$ defined by $f(x) = \frac{1}{x}, x \neq 0$.

**Solution:**
Fix any non-zero real number $c$, we have
$\lim_{x \to c} f(x) = \lim_{x \to c} \frac{1}{x} = \frac{1}{c}$
Also, since for $c \neq 0, f(c) = \frac{1}{c}$, we have $\lim_{x \to c} f(x) = f(c)$ and hence, $f$ is continuous at every point in the domain of $f$. Thus $f$ is a continuous function.
