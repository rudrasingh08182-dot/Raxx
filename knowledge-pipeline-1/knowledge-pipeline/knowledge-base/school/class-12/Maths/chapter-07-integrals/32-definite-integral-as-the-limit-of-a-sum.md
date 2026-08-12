---
type: concept
title: Definite Integral as the Limit of a Sum
category: school
subject: Maths
level: class-12
chapter: 7
chapter_name: INTEGRALS
content_type: concept
tags:
- calculus
- mathematical-analysis
- class12
- riemann-sum
- definite-integral
- INTEGRALS
- Maths
---

The region PRSQP under consideration is the sum of $n$ subregions, where each subregion is defined on subintervals $[x_{r-1}, x_r]$, $r = 1, 2, 3, \dots, n$. From Fig 7.2, we have:

area of the rectangle (ABLC) < area of the region (ABDCA) < area of the rectangle (ABDM) ... (1)

Evidently as $x_r - x_{r-1} \to 0$, i.e., $h \to 0$ all the three areas shown in (1) become nearly equal to each other. Now we form the following sums:

$s_n = h [f(x_0) + \dots + f(x_{n-1})] = \sum_{r=1}^{n} h f(x_{r-1})$ ... (2)

and $S_n = h [f(x_1) + f(x_2) + \dots + f(x_n)] = \sum_{r=1}^{n} h f(x_r)$ ... (3)

Here, $s_n$ and $S_n$ denote the sum of areas of all lower rectangles and upper rectangles raised over subintervals $[x_{r-1}, x_r]$ for $r = 1, 2, 3, \dots, n$, respectively.

In view of the inequality (1) for an arbitrary subinterval $[x_{r-1}, x_r]$, we have:

$s_n < \text{area of the region PRSQP} < S_n$ ... (4)

As $n \to \infty$ strips become narrower and narrower, it is assumed that the limiting values of (2) and (3) are the same in both cases and the common limiting value is the required area under the curve.

Symbolically, we write:

$\lim_{n \to \infty} S_n = \lim_{n \to \infty} s_n = \text{area of the region PRSQP} = \int_{a}^{b} f(x) dx$ ... (5)

It follows that this area is also the limiting value of any area which is between that of the rectangles below the curve and that of the rectangles above the curve. For the sake of convenience, we shall take rectangles with height equal to that of the curve at the left hand edge of each subinterval. Thus, we rewrite (5) as:

$\int_{a}^{b} f(x) dx = \lim_{h \to 0} [h f(a) + h f(a+h) + \dots + h f(a + (n-1)h)]$

or

$\int_{a}^{b} f(x) dx = \lim_{n \to \infty} \frac{b-a}{n} [f(a) + f(a+h) + \dots + f(a + (n-1)h)]$ ... (6)

where $h = \frac{b-a}{n}$ as $n \to \infty$.

The above expression (6) is known as the definition of definite integral as the limit of sum.

Remark: The value of the definite integral of a function over any particular interval depends on the function and the interval, but not on the variable of integration.
