---
type: concept
title: Section 22 (raw, unclean)
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- RELATIONS AND FUNCTIONS
- Maths
- class12
---

MATHEMA TICS16
Let us define g : S →  N by g (y) = 
( )( )6 3
2
y − −
.
Now gof (x) = g(f (x)) = g(4x2 + 12x + 15) = g ((2x + 3) 2 + 6)
=
)( )( ( )
2(2 3) 6 6 3 2 3 3
2 2
x x x
+ + − − + −= =
and fog (y) =
( )( ) ( )( )
2
6 3 2 6 3
3 62 2
y y
f
   − − − −   = + +      
= ( )( )) ( )
2 2
6 3 3 6 6 6y y− − + + = − +  = y – 6 + 6 = y .
Hence, gof = IN and fog =IS. This implies that f is invertible with f –1  = g.
Example 26 Consider f : N →  N, g : N →  N and h : N →  R defined as f (x) = 2 x,
g (y) = 3y + 4 and h (z) = sin z, ∀ x, y and z in N. Show that ho(gof ) = (hog) of.
Solution We have
   h o(gof) (x) = h(gof (x)) = h(g(f(x))) = h(g (2x))
= h(3(2x) + 4) = h(6x + 4) = sin (6x + 4) .x∀ ∈ N
Also,      (( hog) o f ) (x) = (hog) ( f (x)) = ( hog) (2x) = h ( g (2x))
= h(3(2x) + 4) = h(6x + 4) = sin (6x + 4), ∀ x ∈  N.
This shows that ho(gof) = ( hog)o f.
This result is true in general situation as well.
Theorem 1 If f : X →  Y, g : Y →  Z and h : Z →  S are functions, then
ho(gof ) = (hog)o f.
Proof We have
ho(gof ) (x) = h(gof (x)) = h(g(f(x))), ∀ x in X
and (hog) of (x) = hog(f (x)) = h(g(f (x))), ∀ x in X.
Hence, ho(gof) = (hog) o f.
Example 27 Consider f : {1, 2, 3} →  {a, b, c} and g : {a, b, c} → {apple, ball, cat}
defined as f (1) = a, f(2) = b, f (3) = c, g(a) = apple, g(b) = ball and g(c) = cat.
Show that f, g and gof are invertible. Find out f –1 , g–1  and ( gof)–1  and show that
(gof) –1  = f –1 o g–1 .
2019-20
