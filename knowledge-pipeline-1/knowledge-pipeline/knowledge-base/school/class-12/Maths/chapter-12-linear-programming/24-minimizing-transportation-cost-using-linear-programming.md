---
type: concept
title: Minimizing Transportation Cost Using Linear Programming
category: school
subject: Maths
level: class-12
chapter: 12
chapter_name: LINEAR PROGRAMMING
content_type: solved-example
tags:
- class12
- LINEAR PROGRAMMING
- feasible-region
- optimization
- Maths
- linear-programming
- transportation-cost
- mathematics
---

LINEAR PROGRAMMING 525

Total transportation cost Z is given by
$Z = 160x + 100y + 150(8 - x - y) + 100(5 - x) + 120(5 - y) + 100(x + y - 4)$
$= 10(x - 7y + 190)$

Therefore, the problem reduces to
Minimise $Z = 10(x - 7y + 190)$
subject to the constraints:
$x \ge 0, y \ge 0$ ... (1)
$x + y \le 8$ ... (2)
$x \le 5$ ... (3)
$y \le 5$ ... (4)
and $x + y \ge 4$ ... (5)

The shaded region ABCDEF represented by the constraints (1) to (5) is the feasible region (Fig 12.13). Observe that the feasible region is bounded. The coordinates of the corner points of the feasible region are (0, 4), (0, 5), (3, 5), (5, 3), (5, 0) and (4, 0). Let us evaluate Z at these points.

| Corner Point | $Z = 10(x - 7y + 190)$ |
| :--- | :--- |
| (0, 4) | 1620 |
| (0, 5) | 1550 (Minimum) |
| (3, 5) | 1580 |
| (5, 3) | 1740 |
| (5, 0) | 1950 |
| (4, 0) | 1940 |

From the table, we see that the minimum value of Z is 1550 at the point (0, 5). Hence, the optimal transportation strategy will be to deliver 0, 5 and 3 units from the factory at P and 5, 0 and 1 units from the factory at Q to the depots at A, B and C respectively. Corresponding to this strategy, the transportation cost would be minimum, i.e., Rs 1550.

Miscellaneous Exercise on Chapter 12
1. Refer to Example 9. How many packets of each food should be used to maximise the amount of vitamin A in the diet? What is the maximum amount of vitamin A in the diet?

Fig 12.13
2019-20
