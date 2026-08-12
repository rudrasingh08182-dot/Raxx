---
type: concept
title: Chain Rule Applications in Differentiation
category: school
subject: Maths
level: class-12
chapter: 5
chapter_name: CONTINUITY AND DIFFERENTIABILITY
content_type: solved-example
tags:
- mathematics
- chain-rule
- calculus
- Maths
- differentiation
- composite-functions
- class12
- CONTINUITY AND DIFFERENTIABILITY
---

### Continuity and Differentiability

Put $t = u(x) = x^2$. Observe that $\frac{dv}{dt} = \cos t$ and $\frac{dt}{dx} = 2x$ exist. Hence, by chain rule:

$\frac{df}{dx} = \frac{dv}{dt} \cdot \frac{dt}{dx} = \cos t \cdot 2x$

It is normal practice to express the final result only in terms of $x$. Thus:

$\frac{df}{dx} = 2x \cos(x^2)$

Alternatively, we can also directly proceed as follows:

$y = \sin(x^2) \implies \frac{dy}{dx} = \frac{d}{dx}(\sin x^2) = \cos(x^2) \frac{d}{dx}(x^2) = 2x \cos(x^2)$

**Example 22:** Find the derivative of $\tan(2x + 3)$.

**Solution:** Let $f(x) = \tan(2x + 3)$, $u(x) = 2x + 3$ and $v(t) = \tan t$. Then

$(v \circ u)(x) = v(u(x)) = v(2x + 3) = \tan(2x + 3) = f(x)$

Thus $f$ is a composite of two functions. Put $t = u(x) = 2x + 3$. Then $\frac{dv}{dt} = \sec^2 t$ and $\frac{dt}{dx} = 2$ exist. Hence, by chain rule:

$\frac{df}{dx} = \frac{dv}{dt} \cdot \frac{dt}{dx} = 2 \sec^2(2x + 3)$

**Example 23:** Differentiate $\sin(\cos(x^2))$ with respect to $x$.

**Solution:** The function $f(x) = \sin(\cos(x^2))$ is a composition $f(x) = (w \circ v \circ u)(x)$ of the three functions $u$, $v$ and $w$, where $u(x) = x^2$, $v(t) = \cos t$ and $w(s) = \sin s$. Put $t = u(x) = x^2$ and $s = v(t) = \cos t$. Observe that $\frac{dw}{ds} = \cos s$, $\frac{ds}{dt} = -\sin t$ and $\frac{dt}{dx} = 2x$ exist for all real $x$. Hence by a generalisation of chain rule, we have:

$\frac{df}{dx} = \frac{dw}{ds} \cdot \frac{ds}{dt} \cdot \frac{dt}{dx} = (\cos s) \cdot (-\sin t) \cdot (2x) = -2x \sin(x^2) \cdot \cos(\cos(x^2))$
