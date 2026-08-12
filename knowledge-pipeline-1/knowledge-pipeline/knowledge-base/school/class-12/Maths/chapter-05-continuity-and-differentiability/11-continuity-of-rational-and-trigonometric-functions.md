---
type: concept
title: Continuity of Rational and Trigonometric Functions
category: school
subject: Maths
level: class-12
chapter: 5
chapter_name: CONTINUITY AND DIFFERENTIABILITY
content_type: concept
tags:
- trigonometric-functions
- calculus
- Maths
- rational-functions
- mathematical-analysis
- continuity
- class12
- CONTINUITY AND DIFFERENTIABILITY
---

### Remarks
(i) As a special case of (3) above, if $f$ is a constant function, i.e., $f(x) = \lambda$ for some real number $\lambda$, then the function $(\lambda \cdot g)$ defined by $(\lambda \cdot g)(x) = \lambda \cdot g(x)$ is also continuous. In particular if $\lambda = -1$, the continuity of $f$ implies continuity of $-f$.

(ii) As a special case of (4) above, if $f$ is the constant function $f(x) = \lambda$, then the function $\frac{\lambda}{g}$ defined by $\left(\frac{\lambda}{g}\right)(x) = \frac{\lambda}{g(x)}$ is also continuous wherever $g(x) \neq 0$. In particular, the continuity of $g$ implies continuity of $\frac{1}{g}$.

The above theorem can be exploited to generate many continuous functions. They also aid in deciding if certain functions are continuous or not. The following examples illustrate this:

**Example 16:** Prove that every rational function is continuous.
**Solution:** Recall that every rational function $f$ is given by $f(x) = \frac{p(x)}{q(x)}, q(x) \neq 0$, where $p$ and $q$ are polynomial functions. The domain of $f$ is all real numbers except points at which $q$ is zero. Since polynomial functions are continuous (Example 14), $f$ is continuous by (4) of Theorem 1.

**Example 17:** Discuss the continuity of sine function.
**Solution:** To see this we use the following facts: $\lim_{x \to 0} \sin x = 0$. We have not proved it, but is intuitively clear from the graph of $\sin x$ near 0.

Now, observe that $f(x) = \sin x$ is defined for every real number. Let $c$ be a real number. Put $x = c + h$. If $x \to c$ we know that $h \to 0$. Therefore:

$\lim_{x \to c} f(x) = \lim_{x \to c} \sin x$
$= \lim_{h \to 0} \sin(c + h)$
$= \lim_{h \to 0} [\sin c \cos h + \cos c \sin h]$
$= \lim_{h \to 0} [\sin c \cos h] + \lim_{h \to 0} [\cos c \sin h]$
$= \sin c + 0 = \sin c = f(c)$

Thus $\lim_{x \to c} f(x) = f(c)$ and hence $f$ is a continuous function.
