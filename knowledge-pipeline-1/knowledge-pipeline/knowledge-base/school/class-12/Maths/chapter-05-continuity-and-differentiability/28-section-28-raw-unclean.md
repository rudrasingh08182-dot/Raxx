---
type: concept
title: Section 28 (raw, unclean)
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

CONTINUITY  AND DIFFERENTIABILITY 175
Using chain rule we may differentiate this to get
1 1( ) ( )
dy v xy dx u x⋅ = ⋅  . u′(x) + v′(x) . log [u(x)]
which implies that
[ ]( ) ( ) ( ) log ( )( )
dy v xy u x v x u xdx u x
 = ⋅ ′ + ′ ⋅  
The main point to be noted in this method is that f (x) and u(x) must always be
positive as otherwise their logarithms are not defined. This process of differentiation is
known as logarithms differentiation and is illustrated by the following examples:
Example 30 Differentiate 
2
2
( 3) ( 4)
3 4 5
x x
x x
− +
+ +
 w.r.t. x.
Solution Let 
2
2
( 3) ( 4)
(3 4 5)
x xy
x x
− +=
+ +
Taking logarithm on both sides, we have
log y = 1
2 [log (x – 3) + log (x 2 + 4) – log (3x 2 + 4x + 5)]
Now, differentiating both sides w.r.t. x, we get
1 dy
y dx
⋅  = 2 2
1 1 2 6 4
2 ( 3) 4 3 4 5
x x
x x x x
+ + − − + + + 
or dy
dx  = 2 2
1 2 6 4
2 ( 3) 4 3 4 5
y x x
x x x x
+ + − − + + + 
=
2
2 2 2
1 ( 3)( 4) 1 2 6 4
2 ( 3)3 4 5 4 3 4 5
x x x x
xx x x x x
− + + + − −+ + + + + 
Example 31 Differentiate ax w.r.t. x, where a is a positive constant.
Solution Let y = ax. Then
log y = x log a
Differentiating both sides w.r.t. x, we have
1 dy
y dx  = log a
2019-20

 MATHEMATICS176
or dy
dx  = y log a
Thus ( )xd adx  = ax log a
Alternatively ( )xd adx  =
log log( ) ( log )x a x ad de e x adx dx=
= ex log a . log a = ax log a.
Example 32 Differentiate x sin x, x > 0 w.r.t. x.
Solution Let y = xsin x. Taking logarithm on both sides, we have
log y = sin x log x
Therefore
1 . dy
y dx  = sin (log ) log (sin )d dx x x xdx dx+
or
1 dy
y dx  = 1(sin ) log cosx x xx +
or dy
dx  = sin cos logxy x xx
 +  
=
sin sin cos logx xx x xx
 +  
= sin 1 sinsin cos logx xx x x x x− ⋅ + ⋅
Example 33 Find dy
dx
, if yx + xy + xx = ab.
Solution Given that y x + xy + xx = ab.
Putting u = yx, v = xy and w = xx, we get u + v + w = ab
Therefore 0du dv dw
dx dx dx+ + = ... (1)
Now, u = yx. Taking logarithm on both sides, we have
log u = x log y
Differentiating both sides w.r.t. x, we have
2019-20
