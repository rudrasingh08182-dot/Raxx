---
type: concept
title: Differential Equations and Homogeneous Functions
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: concept
tags:
- mathematics
- calculus
- differential-equations
- DIFFERENTIAL  EQUATIONS
- homogeneous-functions
- class12
- Maths
---

DIFFERENTIAL EQUATIONS 397

20. In a bank, principal increases continuously at the rate of r% per year. Find the value of r if Rs 100 double itself in 10 years ($\log_e 2 = 0.6931$).

21. In a bank, principal increases continuously at the rate of 5% per year. An amount of Rs 1000 is deposited with this bank, how much will it worth after 10 years ($e^{0.5} = 1.648$).

22. In a culture, the bacteria count is 1,00,000. The number is increased by 10% in 2 hours. In how many hours will the count reach 2,00,000, if the rate of growth of bacteria is proportional to the number present?

23. The general solution of the differential equation $xy \frac{dy}{dx} = e^x$ is
(A) $e^x + e^{-y} = C$ (B) $e^x + e^y = C$
(C) $e^{-x} + e^y = C$ (D) $e^{-x} + e^{-y} = C$

9.5.2 Homogeneous differential equations
Consider the following functions in $x$ and $y$:
$F_1(x, y) = y^2 + 2xy$, $F_2(x, y) = 2x - 3y$,
$F_3(x, y) = \cos\left(\frac{y}{x}\right)$, $F_4(x, y) = \sin x + \cos y$

If we replace $x$ and $y$ by $\lambda x$ and $\lambda y$ respectively in the above functions, for any nonzero constant $\lambda$, we get:
$F_1(\lambda x, \lambda y) = \lambda^2(y^2 + 2xy) = \lambda^2 F_1(x, y)$
$F_2(\lambda x, \lambda y) = \lambda(2x - 3y) = \lambda F_2(x, y)$
$F_3(\lambda x, \lambda y) = \cos\left(\frac{\lambda y}{\lambda x}\right) = \lambda^0 F_3(x, y)$
$F_4(\lambda x, \lambda y) = \sin \lambda x + \cos \lambda y \neq \lambda^n F_4(x, y)$, for any $n \in N$

Here, we observe that the functions $F_1, F_2, F_3$ can be written in the form $F(\lambda x, \lambda y) = \lambda^n F(x, y)$ but $F_4$ can not be written in this form. This leads to the following definition:

A function $F(x, y)$ is said to be homogeneous function of degree $n$ if $F(\lambda x, \lambda y) = \lambda^n F(x, y)$ for any nonzero constant $\lambda$.

We note that in the above examples, $F_1, F_2, F_3$ are homogeneous functions of degree 2, 1, 0 respectively but $F_4$ is not a homogeneous function.
