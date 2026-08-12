---
type: concept
title: Section 36 (raw, unclean)
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

CONTINUITY  AND DIFFERENTIABILITY 189
we need to find all x such that 
12 1
1 4
x
x
+
≤
+
, i.e., all x such that 2x + 1 ≤  1 + 4x. We
may rewrite this as 2 ≤  1
2x  + 2 x which is true for all x. Hence the function
is defined at every real number . By putting 2 x = tan θ , this function may be
rewritten as
f(x) =
1
1 2sin
1 4
x
x
+
−  
 + 
= sin − ⋅
+ ( )








1
2
2 2
1 2
x
x
=
1
2
2 tansin
1 tan
− θ 
 + θ 
= sin – 1 [sin 2θ ]
= 2θ  = 2 ta n – 1 (2x)
Thus f ′(x) =
( )
2
12 (2 )
1 2
x
x
d
dx⋅ ⋅
+
= 2 (2 )log 21 4
x
x ⋅+
=
12 log 2
1 4
x
x
+
+
Example 46 Find  f ′(x) if f(x) = (sin x)sin x for all 0 < x  < π .
Solution The function y = (sin x)sin x is defined for all positive real numbers. Taking
logarithms, we have
log y = log (sin x)sin x = sin x log (sin x)
Then 1 dy
y dx  = d
dx  (sin x log (sin x))
= cos x log (sin x) + sin x . 1 (sin )sin
d xx dx⋅
= cos x log (sin x) + cos x
= (1 + log (sin x)) cos x
2019-20

 MATHEMATICS190
Thus dy
dx  = y((1 + log (sin x)) cos x) = (1 + log (sin x)) ( sin x)sin x cos x
Example 47 For a positive constant a find dy
dx , where
1
1, and
at ty a x t t
+  = = +  
Solution Observe that both y and x are defined for all real t ≠  0. Clearly
dy
dt  = ( )
1t
t
d
adt
+  =
1
1 log
t t da t adt t
+  + ⋅  
=
1
2
11 log
t ta a
t
+  −  
Similarly dx
dt  =
1
1 1
a
da t t t dt t
−
   + ⋅ +      
=
1
2
1 1 1
a
a t t t
−
   + ⋅ −      
dx
dt  ≠  0 only if t ≠  ± 1. Thus for t ≠  ± 1,
dy
dy dt
dxdx
dt
=  =
a t a
a t t t
t t
a
+
−
−
 

+


 ⋅ − 
 

1
2
1
2
1 1
1 1 1
log
=
1
1
log
1
t t
a
a a
a t t
+
−
 +  
Example 48 Differentiate sin 2 x w.r.t. e cos x.
Solution Let u (x) = sin 2 x and v (x) = e cos x. We want to find /
/
du du dx
dv dv dx= . Clearly
du
dx  = 2 sin x cos x and dv
dx  = e cos x (– sin x ) = – (sin x ) e cos x
2019-20
