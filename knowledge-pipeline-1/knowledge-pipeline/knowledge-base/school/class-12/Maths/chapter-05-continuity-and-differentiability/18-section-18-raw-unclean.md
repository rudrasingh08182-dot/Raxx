---
type: concept
title: Section 18 (raw, unclean)
category: school
subject: Maths
level: class-12
chapter: 5
chapter_name: CONTINUITY AND DIFFERENTIABILITY
content_type: concept
tags:
- class12
- Maths
- CONTINUITY AND DIFFERENTIABILITY
---

MATHEMATICS164
One way is to expand (2x + 1)3 using binomial theorem and find the derivative as
a polynomial function as illustrated below.
( )d f xdx  =
3(2 1)d xdx
  + 
=
3 2(8 12 6 1)d x x xdx + + +
= 24x2 + 24x + 6
= 6 (2x + 1)2
Now, observe that f (x) = (h o g) (x)
where g(x) = 2x + 1 and h(x) = x3. Put t = g(x) = 2x + 1. Then f(x) = h(t) = t3. Thus
df
dx  = 6 (2x + 1)2 = 3(2x + 1)2 . 2 = 3t2 . 2 = dh dt
dt dx⋅
The advantage with such observation is that it simplifies the calculation in finding
the derivative of, say, (2x + 1)100. We may formalise this observation in the following
theorem called the chain rule.
Theorem 4 (Chain Rule) Let f be a real valued function which is a composite of two
functions u and v; i.e., f = v o u. Suppose t = u(x) and if both dt
dx  and dv
dt  exist, we have
df dv dt
dx dt dx= ⋅
We skip the proof of this theorem. Chain rule may be extended as follows. Suppose
f is a real valued function which is a composite of three functions u, v and w; i.e.,
f = (w o u) o v. If t = v (x) and s = u (t), then
( o )df d w u dt dw ds dt
dx dt dx ds dt dx= ⋅ = ⋅ ⋅
provided all the derivatives in the statement exist. Reader is invited to formulate chain
rule for composite of more functions.
Example 21 Find the derivative of the function given by f (x) = sin (x2).
Solution Observe that the given function is a composite of two functions. Indeed, if
t = u(x) = x2 and v(t) = sin t, then
f (x) = (v o u) (x) = v(u(x)) = v(x2) = sin x 2
2019-20
