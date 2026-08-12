---
type: concept
title: 'Linear Programming: Minimization and Manufacturing Profit Maximization Problems'
category: school
subject: Maths
level: class-12
chapter: 12
chapter_name: LINEAR PROGRAMMING
content_type: solved-example
tags:
- class12
- LINEAR PROGRAMMING
- optimization
- mathematical-modeling
- Maths
- linear-programming
- constraints
- profit-maximization
---

The coordinates of the corner points L, M and N are (2, 72), (15, 20) and (40, 15) respectively. Let us evaluate $Z$ at these points:

| Corner Point | $Z = 6x + 3y$ |
| :--- | :--- |
| (2, 72) | 228 |
| (15, 20) | 150 $\leftarrow$ Minimum |
| (40, 15) | 285 |

From the table, we find that $Z$ is minimum at the point (15, 20). Hence, the amount of vitamin A under the constraints given in the problem will be minimum, if 15 packets of food P and 20 packets of food Q are used in the special diet. The minimum amount of vitamin A will be 150 units.

**Example 10 (Manufacturing problem)**

A manufacturer has three machines I, II and III installed in his factory. Machines I and II are capable of being operated for at most 12 hours whereas machine III must be operated for at least 5 hours a day. She produces only two items M and N each requiring the use of all the three machines. The number of hours required for producing 1 unit of each of M and N on the three machines are given in the following table:

| Items | Number of hours required on machines | | |
| :--- | :--- | :--- | :--- |
| | I | II | III |
| M | 1 | 2 | 1 |
| N | 2 | 1 | 1.25 |

She makes a profit of Rs 600 and Rs 400 on items M and N respectively. How many of each item should she produce so as to maximise her profit assuming that she can sell all the items that she produced? What will be the maximum profit?

**Solution**

Let $x$ and $y$ be the number of items M and N respectively.
Total profit on the production = Rs $(600x + 400y)$

Mathematical formulation of the given problem is as follows:
Maximise $Z = 600x + 400y$
subject to the constraints:
$x + 2y \le 12$ (constraint on Machine I) ... (1)
$2x + y \le 12$ (constraint on Machine II) ... (2)
$x + \frac{5}{4}y \ge 5$ (constraint on Machine III) ... (3)
$x \ge 0, y \ge 0$ ... (4)
