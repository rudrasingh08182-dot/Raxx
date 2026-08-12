---
type: concept
title: Fundamentals of Derivatives and Differentiability
category: school
subject: Maths
level: class-12
chapter: 5
chapter_name: CONTINUITY AND DIFFERENTIABILITY
content_type: concept
tags:
- mathematics
- derivatives
- calculus
- Maths
- differentiability
- class12
- differentiation-rules
- CONTINUITY AND DIFFERENTIABILITY
---

### Derivatives and Differentiability

For a function $f(x)$, the derivative is defined as:

$f'(x) = \lim_{h \to 0} \frac{f(x+h) - f(x)}{h}$

provided this limit exists. The derivative of $f$ at $c$ is denoted by $f'(c)$ or $\left. \frac{d}{dx} f(x) \right|_c$. The derivative of $f$ is denoted by $f'(x)$ or $\frac{d}{dx} f(x)$ or, if $y = f(x)$, by $\frac{dy}{dx}$ or $y'$. The process of finding the derivative of a function is called differentiation. We also use the phrase "differentiate $f(x)$ with respect to $x$" to mean find $f'(x)$.

The following rules were established as a part of the algebra of derivatives:

1. $(u \pm v)' = u' \pm v'$
2. $(uv)' = u'v + uv'$ (Leibnitz or product rule)
3. $\left( \frac{u}{v} \right)' = \frac{u'v - uv'}{v^2}$, wherever $v \neq 0$ (Quotient rule).

The following table gives a list of derivatives of certain standard functions:

| Function $f(x)$ | Derivative $f'(x)$ |
| :--- | :--- |
| $x^n$ | $nx^{n-1}$ |
| $\sin x$ | $\cos x$ |
| $\cos x$ | $-\sin x$ |
| $\tan x$ | $\sec^2 x$ |

Whenever we defined the derivative, we had put a caution: "provided the limit exists." Now the natural question is: what if it doesn't? The question is quite pertinent and so is its answer. If $\lim_{h \to 0} \frac{f(c+h) - f(c)}{h}$ does not exist, we say that $f$ is not differentiable at $c$.

In other words, we say that a function $f$ is differentiable at a point $c$ in its domain if both $\lim_{h \to 0^-} \frac{f(c+h) - f(c)}{h}$ and $\lim_{h \to 0^+} \frac{f(c+h) - f(c)}{h}$ are finite and equal. A function is said to be differentiable in an interval $[a, b]$ if it is differentiable at every point of $[a, b]$. As in the case of continuity, at the end points $a$ and $b$, we take the right-hand limit and left-hand limit, which are nothing but the left-hand derivative and right-hand derivative of the function at $a$ and $b$ respectively. Similarly, a function is said to be differentiable in an interval $(a, b)$ if it is differentiable at every point of $(a, b)$.
