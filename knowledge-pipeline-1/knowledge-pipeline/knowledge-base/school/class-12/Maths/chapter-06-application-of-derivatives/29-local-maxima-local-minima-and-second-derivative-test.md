---
type: concept
title: Local Maxima, Local Minima and Second Derivative Test
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: concept
tags:
- derivatives
- APPLICATION OF DERIVATIVES
- local-maxima
- second-derivative-test
- class12
- local-minima
- calculus
- inflexion-point
- Maths
---

### Example 30
Find all the points of local maxima and local minima of the function $f$ given by $f(x) = 2x^3 - 6x^2 + 6x + 5$.

**Solution:**
We have $f(x) = 2x^3 - 6x^2 + 6x + 5$
$f'(x) = 6x^2 - 12x + 6 = 6(x - 1)^2$
$f'(x) = 0$ at $x = 1$

Thus, $x = 1$ is the only critical point of $f$. We shall now examine this point for local maxima and/or local minima of $f$. Observe that $f'(x) \geq 0$, for all $x \in R$ and in particular $f'(x) > 0$, for values close to 1 and to the left and to the right of 1. Therefore, by the first derivative test, the point $x = 1$ is neither a point of local maxima nor a point of local minima. Hence $x = 1$ is a point of inflexion.

**Remark:**
One may note that since $f'(x)$, in Example 30, never changes its sign on $R$, the graph of $f$ has no turning points and hence no point of local maxima or local minima.

We shall now give another test to examine local maxima and local minima of a given function. This test is often easier to apply than the first derivative test.

### Theorem 4 (Second Derivative Test)
Let $f$ be a function defined on an interval $I$ and $c \in I$. Let $f$ be twice differentiable at $c$. Then:

(i) $x = c$ is a point of local maxima if $f'(c) = 0$ and $f''(c) < 0$. The value $f(c)$ is the local maximum value of $f$.

(ii) $x = c$ is a point of local minima if $f'(c) = 0$ and $f''(c) > 0$. In this case, $f(c)$ is the local minimum value of $f$.

(iii) The test fails if $f'(c) = 0$ and $f''(c) = 0$. In this case, we go back to the first derivative test and find whether $c$ is a point of local maxima, local minima or a point of inflexion.

**Note:** As $f$ is twice differentiable at $c$, we mean the second order derivative of $f$ exists at $c$.

### Example 31
Find local minimum value of the function $f$ given by $f(x) = 3 + |x|$, $x \in R$.

**Solution:**
Note that the given function is not differentiable at $x = 0$. So, the second derivative test fails. Let us try the first derivative test. Note that 0 is a critical point of $f$. Now to the left of 0, $f(x) = 3 - x$ and so $f'(x) = -1 < 0$.
