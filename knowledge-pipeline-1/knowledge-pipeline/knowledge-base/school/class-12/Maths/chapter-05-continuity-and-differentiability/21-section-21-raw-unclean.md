---
type: concept
title: Section 21 (raw, unclean)
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

CONTINUITY  AND DIFFERENTIABILITY 167
is implicit that y is a function of x and we say that the relationship of the second type,
above, gives function implicitly. In this subsection, we learn to dif ferentiate implicit
functions.
Example 24 Find dy
dx  if x – y = π .
Solution One way is to solve for y and rewrite the above as
y = x – π
But then dy
dx  = 1
Alternatively, directly differentiating the relationship w.r.t., x, we have
( )d x ydx −  =  d
dx
π
Recall that d
dx
π  means to differentiate the constant function taking value π
everywhere w.r.t., x. Thus
( ) ( )d d x ydx dx −  = 0
which implies that
dy
dx  = 1dx
dx =
Example 25 Find dy
dx
, if y + sin y = cos x.
Solution We differentiate the relationship directly with respect to x, i.e.,
(sin )dy d ydx dx+  = (cos )d xdx
which implies using chain rule
cosdy dy ydx dx+ ⋅  = – sin x
This gives dy
dx  = sin
1 cos
x
y− +
where y ≠ (2n + 1) π
2019-20

 MATHEMATICS168
5.3.3  Derivatives of inverse trigonometric functions
We remark that inverse trigonometric functions are continuous functions, but we will
not prove this. Now we use chain rule to find derivatives of these functions.
Example 26 Find the derivative of f given by f (x) = sin–1  x assuming it exists.
Solution Let y = sin–1  x. Then, x = sin y.
Differentiating both sides w.r.t. x, we get
1 = cos y dy
dx
which implies that dy
dx  = 1
1 1
cos cos(sin )y x−=
Observe that this is defined only for cos y ≠  0, i.e., sin–1  x ≠  ,2 2
π π− , i.e., x ≠  – 1, 1,
i.e., x ∈  (– 1, 1).
To make this result a bit more attractive, we carry out the following manipulation.
Recall that for x ∈  (– 1, 1), sin (sin –1  x) = x and hence
cos2 y = 1 – (sin y)2 = 1 – (sin (sin –1 x))2 = 1 – x 2
Also, since y ∈  ,2 2
π π −   , cos y is positive and hence cos y = 21 x−
Thus, for x ∈  (– 1, 1),
2
1 1
cos 1
dy
dx y x
= =
−
Example 27 Find the derivative of f given by f (x) = tan–1  x assuming it exists.
Solution Let y = tan –1  x. Then, x = tan y.
Differentiating both sides w.r.t. x, we get
1 = sec2 y dy
dx
which implies that
2 2 1 2 2
1 1 1 1
sec 1 tan 1 (tan (tan )) 1
dy
dx y y x x−= = = =
+ + +
2019-20
