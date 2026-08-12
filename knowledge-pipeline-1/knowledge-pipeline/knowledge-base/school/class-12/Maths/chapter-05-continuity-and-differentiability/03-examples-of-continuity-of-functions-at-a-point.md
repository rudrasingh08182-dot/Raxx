---
type: concept
title: Examples of Continuity of Functions at a Point
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
- limits
- functions
- continuity
- class12
- CONTINUITY AND DIFFERENTIABILITY
---

### Example 1
Check the continuity of the function $f$ given by $f(x) = 2x + 3$ at $x = 1$.

**Solution:** First note that the function is defined at the given point $x = 1$ and its value is $5$. Then find the limit of the function at $x = 1$. Clearly,
$\lim_{x \to 1} f(x) = \lim_{x \to 1} (2x + 3) = 2(1) + 3 = 5$
Thus, $\lim_{x \to 1} f(x) = 5 = f(1)$. Hence, $f$ is continuous at $x = 1$.

### Example 2
Examine whether the function $f$ given by $f(x) = x^2$ is continuous at $x = 0$.

**Solution:** First note that the function is defined at the given point $x = 0$ and its value is $0$. Then find the limit of the function at $x = 0$. Clearly,
$\lim_{x \to 0} f(x) = \lim_{x \to 0} x^2 = 0$
Thus, $\lim_{x \to 0} f(x) = 0 = f(0)$. Hence, $f$ is continuous at $x = 0$.

### Example 3
Discuss the continuity of the function $f$ given by $f(x) = |x|$ at $x = 0$.

**Solution:** By definition,
$f(x) = \begin{cases} -x, & \text{if } x < 0 \\ x, & \text{if } x \ge 0 \end{cases}$
Clearly the function is defined at $0$ and $f(0) = 0$. Left hand limit of $f$ at $0$ is
$\lim_{x \to 0^-} f(x) = \lim_{x \to 0^-} (-x) = 0$
Similarly, the right hand limit of $f$ at $0$ is
$\lim_{x \to 0^+} f(x) = \lim_{x \to 0^+} x = 0$
Thus, the left hand limit, right hand limit and the value of the function coincide at $x = 0$. Hence, $f$ is continuous at $x = 0$.

### Example 4
Show that the function $f$ given by
$f(x) = \begin{cases} x^3 + 3, & \text{if } x \neq 0 \\ 1, & \text{if } x = 0 \end{cases}$
is not continuous at $x = 0$.
