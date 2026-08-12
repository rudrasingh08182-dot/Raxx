---
type: concept
title: Introduction to Integration as an Inverse Process of Differentiation
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- mathematics
- class12
- integration
- anti-differentiation
- INTEGRALS
- Maths
- fundamental-theorem-of-calculus
---

There is a connection, known as the Fundamental Theorem of Calculus, between indefinite integral and definite integral which makes the definite integral a practical tool for science and engineering. The definite integral is also used to solve many interesting problems from various disciplines like economics, finance and probability.

In this Chapter, we shall confine ourselves to the study of indefinite and definite integrals and their elementary properties including some techniques of integration.

### 7.2 Integration as an Inverse Process of Differentiation

Integration is the inverse process of differentiation. Instead of differentiating a function, we are given the derivative of a function and asked to find its primitive, i.e., the original function. Such a process is called integration or anti-differentiation.

Let us consider the following examples:
We know that:

1. $\frac{d}{dx}(\sin x) = \cos x$ ... (1)
2. $\frac{d}{dx}(\frac{x^3}{3}) = x^2$ ... (2)
3. $\frac{d}{dx}(e^x) = e^x$ ... (3)

We observe that in (1), the function $\cos x$ is the derived function of $\sin x$. We say that $\sin x$ is an anti-derivative (or an integral) of $\cos x$. Similarly, in (2) and (3), $\frac{x^3}{3}$ and $e^x$ are the anti-derivatives (or integrals) of $x^2$ and $e^x$, respectively. Again, we note that for any real number $C$, treated as a constant function, its derivative is zero and hence, we can write (1), (2) and (3) as follows:

* $\frac{d}{dx}(\sin x + C) = \cos x$
* $\frac{d}{dx}(\frac{x^3}{3} + C) = x^2$
* $\frac{d}{dx}(e^x + C) = e^x$

Thus, anti-derivatives (or integrals) of the above cited functions are not unique. Actually, there exist infinitely many anti-derivatives of each of these functions which can be obtained by choosing $C$ arbitrarily from the set of real numbers. For this reason, $C$ is customarily referred to as an arbitrary constant. In fact, $C$ is the parameter by varying which one gets different anti-derivatives (or integrals) of the given function.

More generally, if there is a function $F$ such that:

$\frac{d}{dx}F(x) = f(x), \forall x \in I$ (interval),

then for any arbitrary real number $C$ (also called constant of integration):

$\frac{d}{dx}[F(x) + C] = f(x), x \in I$
