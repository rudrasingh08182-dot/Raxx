---
type: concept
title: Fundamental Theorems and Corner Point Method in Linear Programming
category: school
subject: Maths
level: class-12
chapter: 12
chapter_name: LINEAR PROGRAMMING
content_type: concept
tags:
- class12
- objective-function
- LINEAR PROGRAMMING
- feasible-region
- optimization
- Maths
- corner-point-method
- linear-programming
---

### LINEAR PROGRAMMING

* Any point in the feasible region that gives the optimal value (maximum or minimum) of the objective function is called an optimal solution.
* The following Theorems are fundamental in solving linear programming problems:

**Theorem 1:** Let $R$ be the feasible region (convex polygon) for a linear programming problem and let $Z = ax + by$ be the objective function. When $Z$ has an optimal value (maximum or minimum), where the variables $x$ and $y$ are subject to constraints described by linear inequalities, this optimal value must occur at a corner point (vertex) of the feasible region.

**Theorem 2:** Let $R$ be the feasible region for a linear programming problem, and let $Z = ax + by$ be the objective function. If $R$ is bounded, then the objective function $Z$ has both a maximum and a minimum value on $R$ and each of these occurs at a corner point (vertex) of $R$.

* If the feasible region is unbounded, then a maximum or a minimum may not exist. However, if it exists, it must occur at a corner point of $R$.

* **Corner point method** for solving a linear programming problem. The method comprises of the following steps:

(i) Find the feasible region of the linear programming problem and determine its corner points (vertices).
(ii) Evaluate the objective function $Z = ax + by$ at each corner point. Let $M$ and $m$ respectively be the largest and smallest values at these points.
(iii) If the feasible region is bounded, $M$ and $m$ respectively are the maximum and minimum values of the objective function. If the feasible region is unbounded, then:
    (i) $M$ is the maximum value of the objective function, if the open half plane determined by $ax + by > M$ has no point in common with the feasible region. Otherwise, the objective function has no maximum value.
    (ii) $m$ is the minimum value of the objective function, if the open half plane determined by $ax + by < m$ has no point in common with the feasible region. Otherwise, the objective function has no minimum value.
