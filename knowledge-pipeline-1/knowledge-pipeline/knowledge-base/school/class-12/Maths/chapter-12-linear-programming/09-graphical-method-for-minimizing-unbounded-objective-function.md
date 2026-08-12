---
type: concept
title: Graphical Method for Minimizing Unbounded Objective Function
category: school
subject: Maths
level: class-12
chapter: 12
chapter_name: LINEAR PROGRAMMING
content_type: solved-example
tags:
- class12
- objective-function
- LINEAR PROGRAMMING
- feasible-region
- Maths
- unbounded-solution
- linear-programming
- graphical-method
---

Example 4: Determine graphically the minimum value of the objective function $Z = -50x + 20y$ ... (1) subject to the constraints:
$2x - y \geq -5$ ... (2)
$3x + y \geq 3$ ... (3)
$2x - 3y \leq 12$ ... (4)
$x \geq 0, y \geq 0$ ... (5)

Solution: First of all, let us graph the feasible region of the system of inequalities (2) to (5). The feasible region (shaded) is shown in Fig 12.5. Observe that the feasible region is unbounded.

We now evaluate Z at the corner points:

| Corner Point | $Z = -50x + 20y$ |
| :--- | :--- |
| (0, 5) | 100 |
| (0, 3) | 60 |
| (1, 0) | -50 |
| (6, 0) | -300 (smallest) |

From this table, we find that -300 is the smallest value of Z at the corner point (6, 0). Can we say that the minimum value of Z is -300? Note that if the region would have been bounded, this smallest value of Z is the minimum value of Z (Theorem 2). But here we see that the feasible region is unbounded. Therefore, -300 may or may not be the minimum value of Z. To decide this issue, we graph the inequality $-50x + 20y < -300$ (see Step 3(ii) of Corner Point Method), i.e., $-5x + 2y < -30$ and check whether the resulting open half plane has points in common with the feasible region or not. If it has common points, then -300 will not be the minimum value of Z. Otherwise, -300 will be the minimum value of Z.
