---
type: concept
title: Understanding Continuity of Functions and Points of Discontinuity
category: school
subject: Maths
level: class-12
chapter: 5
chapter_name: CONTINUITY AND DIFFERENTIABILITY
content_type: concept
tags:
- mathematics
- discontinuity
- calculus
- Maths
- limits
- continuity
- class12
- CONTINUITY AND DIFFERENTIABILITY
---

The value of the function is 2 at 0.001. Using the language of left and right hand limits, we may say that the left (respectively right) hand limit of $f$ at 0 is 1 (respectively 2). In particular, the left and right hand limits do not coincide. We also observe that the value of the function at $x = 0$ coincides with the left hand limit. Note that when we try to draw the graph, we cannot draw it in one stroke, i.e., without lifting the pen from the plane of the paper, we cannot draw the graph of this function. In fact, we need to lift the pen when we come to 0 from the left. This is one instance of a function being not continuous at $x = 0$.

Now, consider the function defined as:
$f(x) = \begin{cases} 1 & \text{if } x \neq 0 \\ 2 & \text{if } x = 0 \end{cases}$

This function is also defined at every point. Left and the right hand limits at $x = 0$ are both equal to 1. But the value of the function at $x = 0$ equals 2, which does not coincide with the common value of the left and right hand limits. Again, we note that we cannot draw the graph of the function without lifting the pen. This is yet another instance of a function being not continuous at $x = 0$.

Naively, we may say that a function is continuous at a fixed point if we can draw the graph of the function around that point without lifting the pen from the plane of the paper. Mathematically, it may be phrased precisely as follows:

**Definition 1:** Suppose $f$ is a real function on a subset of the real numbers and let $c$ be a point in the domain of $f$. Then $f$ is continuous at $c$ if:
$\lim_{x \to c} f(x) = f(c)$

More elaborately, if the left hand limit, right hand limit, and the value of the function at $x = c$ exist and are equal to each other, then $f$ is said to be continuous at $x = c$. Recall that if the right hand and left hand limits at $x = c$ coincide, then we say that the common value is the limit of the function at $x = c$. Hence, we may also rephrase the definition of continuity as follows: a function is continuous at $x = c$ if the function is defined at $x = c$ and if the value of the function at $x = c$ equals the limit of the function at $x = c$. If $f$ is not continuous at $c$, we say $f$ is discontinuous at $c$ and $c$ is called a point of discontinuity of $f$.
