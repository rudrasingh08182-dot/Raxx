---
type: concept
title: Section 32 (raw, unclean)
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

CONTINUITY  AND DIFFERENTIABILITY 183
Example 41 If y = sin –1  x, show that (1 – x2) 
2
2 0d y dy x dxdx
− = .
Solution We have y = sin – 1x. Then
dy
dx  = 2
1
(1 ) x−
or
2(1 ) 1 dyx dx− =
So
2(1 ) . 0d dyxdx dx
 − =  
or ( )
2
2 2
2(1 ) (1 ) 0d y dy dx x dx dxdx
− ⋅ + ⋅ − =
or
2
2
2 2
2(1 ) 0
2 1
d y dy xx dxdx x
− ⋅ − ⋅ =
−
Hence
2
2
2(1 ) 0d y dyx x dxdx
− − =
Alternatively, Given that y = sin–1 x, we have
1 2
1
1
y
x
=
−
, i.e., ( )2 2
11 1x y− =
So 2 2
1 2 1(1 ) . 2 (0 2 ) 0x y y y x− + − =
Hence (1 – x2) y2 – xy1 = 0
EXERCISE 5.7
Find the second order derivatives of the functions given in Exercises 1 to 10.
1. x2 + 3x + 2 2. x 20 3. x . cos x
4. log x 5. x3 log x 6. ex sin 5x
7. e6x cos 3x 8. tan–1 x 9. log (log x)
10. sin (log x)
11. If y = 5 cos x – 3 sin x, prove that 
2
2 0d y y
dx
+ =
2019-20

 MATHEMATICS184
12. If y = cos–1  x, Find  
2
2
d y
dx
in terms of y alone.
13. If y = 3 cos (log x) + 4 sin (log x), show that x2 y2 + xy1 + y = 0
14. If y = Aemx + Benx, show that 
2
2 ( ) 0d y dy m n mnydxdx
− + + =
15. If y = 500e7x + 600e– 7x, show that 
2
2 49d y y
dx
=
16. If ey
 (x + 1) = 1, show that 
22
2
d y dy
dxdx
 =   
17. If y = (tan–1  x)2, show that (x 2 + 1) 2 y2 + 2x (x2 + 1) y 1 = 2
5.8  Mean Value Theorem
In this section, we will state two fundamental results in Calculus without proof. We
shall also learn the geometric interpretation of these theorems.
Theorem 6  (Rolle’ s Theorem) Let f : [ a, b] →  R be continuous on [ a, b] and
differentiable on (a, b), such that f(a) = f(b), where a and b are some real numbers.
Then there exists some c in (a, b) such that f ′(c) = 0.
In Fig 5.12 and 5.13, graphs of a few typical differentiable functions satisfying the
hypothesis of Rolle’s theorem are given.
Fig 5.12 Fig 5.13
Observe what happens to the slope of the tangent to the curve at various points
between a and b. In each of the graphs, the slope becomes zero at least at one point.
That is precisely the claim of the Rolle’ s theorem as the slope of the tangent at any
point on the graph of y = f (x) is nothing but the derivative of f (x) at that point.
2019-20
