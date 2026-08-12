---
type: concept
title: 'Differential Equations: Principal Growth and General Solutions'
category: school
subject: Maths
level: class-12
chapter: 9
chapter_name: DIFFERENTIAL  EQUATIONS
content_type: solved-example
tags:
- integration
- mathematics
- exponential-growth
- differential-equations
- calculus
- DIFFERENTIAL  EQUATIONS
- class12
- Maths
---

Substituting $x = -2$, $y = 3$ in equation (3), we get $C = 5$.
Substituting the value of $C$ in equation (3), we get the equation of the required curve as $y = \frac{x^3}{3} + 5$ or $y = \frac{x^3 + 15}{3}$.

**Example 14** In a bank, principal increases continuously at the rate of 5% per year. In how many years Rs 1000 double itself?

**Solution** Let $P$ be the principal at any time $t$. According to the given problem,
$\frac{dp}{dt} = \frac{5}{100} \times P$ or $\frac{dp}{dt} = \frac{P}{20}$ ... (1)

Separating the variables in equation (1), we get
$\frac{dp}{P} = \frac{dt}{20}$ ... (2)

Integrating both sides of equation (2), we get
$\log P = \frac{t}{20} + C_1$

or $P = e^{\frac{t}{20}} \cdot e^{C_1}$

or $P = Ce^{\frac{t}{20}}$ (where $C = e^{C_1}$) ... (3)

Now $P = 1000$, when $t = 0$. Substituting the values of $P$ and $t$ in (3), we get $C = 1000$. Therefore, equation (3) gives
$P = 1000 e^{\frac{t}{20}}$

Let $t$ years be the time required to double the principal. Then
$2000 = 1000 e^{\frac{t}{20}} \implies t = 20 \log_e 2$

**EXERCISE 9.4**
For each of the differential equations in Exercises 1 to 10, find the general solution:
1. $\frac{dy}{dx} = \frac{1 - \cos x}{1 + \cos x}$
2. $\frac{dy}{dx} = 2^y (y^2 - 2) < y < 2$
