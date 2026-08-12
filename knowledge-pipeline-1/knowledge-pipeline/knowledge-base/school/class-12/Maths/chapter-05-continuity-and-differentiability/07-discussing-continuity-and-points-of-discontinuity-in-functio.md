---
type: concept
title: Discussing Continuity and Points of Discontinuity in Functions
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
- class12
- continuity
- differentiability
- CONTINUITY AND DIFFERENTIABILITY
---

### Example 10
Discuss the continuity of the function $f$ defined by:

$f(x) = \begin{cases} x + 2, & \text{if } x \le 1 \\ x - 2, & \text{if } x > 1 \end{cases}$

**Solution:**
The function $f$ is defined at all points of the real line.

**Case 1:** If $c < 1$, then $f(c) = c + 2$. Therefore, $\lim_{x \to c} f(x) = \lim_{x \to c} (x + 2) = c + 2$. Thus, $f$ is continuous at all real numbers less than 1.

**Case 2:** If $c > 1$, then $f(c) = c - 2$. Therefore, $\lim_{x \to c} f(x) = \lim_{x \to c} (x - 2) = c - 2 = f(c)$. Thus, $f$ is continuous at all points $x > 1$.

**Case 3:** If $c = 1$, then the left hand limit of $f$ at $x = 1$ is:
$\lim_{x \to 1^-} f(x) = \lim_{x \to 1^-} (x + 2) = 1 + 2 = 3$

The right hand limit of $f$ at $x = 1$ is:
$\lim_{x \to 1^+} f(x) = \lim_{x \to 1^+} (x - 2) = 1 - 2 = -1$

Since the left and right hand limits of $f$ at $x = 1$ do not coincide, $f$ is not continuous at $x = 1$. Hence, $x = 1$ is the only point of discontinuity of $f$. The graph of the function is given in Fig 5.4.

### Example 11
Find all the points of discontinuity of the function $f$ defined by:

$f(x) = \begin{cases} x + 2, & \text{if } x < 1 \\ 0, & \text{if } x = 1 \\ x - 2, & \text{if } x > 1 \end{cases}$

**Solution:**
As in the previous example, we find that $f$ is continuous at all real numbers $x \neq 1$. The left hand limit of $f$ at $x = 1$ is:
$\lim_{x \to 1^-} f(x) = \lim_{x \to 1^-} (x + 2) = 1 + 2 = 3$

The right hand limit of $f$ at $x = 1$ is:
$\lim_{x \to 1^+} f(x) = \lim_{x \to 1^+} (x - 2) = 1 - 2 = -1$

Since the left and right hand limits of $f$ at $x = 1$ do not coincide, $f$ is not continuous at $x = 1$. Hence, $x = 1$ is the only point of discontinuity of $f$. The graph of the function is given in Fig 5.5.

**Fig 5.4**
**Fig 5.5**
