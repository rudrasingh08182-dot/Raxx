---
type: concept
title: Formulation of Diet Problem in Linear Programming
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
- mathematical-formulation
- Maths
- linear-programming
- constraints
- diet-problem
---

### Example 6 (Diet problem)

A dietician wishes to mix two types of foods in such a way that vitamin contents of the mixture contain at least 8 units of vitamin A and 10 units of vitamin C. Food ‘I’ contains 2 units/kg of vitamin A and 1 unit/kg of vitamin C. Food ‘II’ contains 1 unit/kg of vitamin A and 2 units/kg of vitamin C. It costs Rs 50 per kg to purchase Food ‘I’ and Rs 70 per kg to purchase Food ‘II’. Formulate this problem as a linear programming problem to minimise the cost of such a mixture.

**Solution:**

Let the mixture contain $x$ kg of Food ‘I’ and $y$ kg of Food ‘II’. Clearly, $x \ge 0, y \ge 0$. We make the following table from the given data:

| Resources | Food I ($x$) | Food II ($y$) | Requirement |
| :--- | :--- | :--- | :--- |
| Vitamin A (units/kg) | 2 | 1 | 8 |
| Vitamin C (units/kg) | 1 | 2 | 10 |
| Cost (Rs/kg) | 50 | 70 | - |

Since the mixture must contain at least 8 units of vitamin A and 10 units of vitamin C, we have the constraints:
$2x + y \ge 8$
$x + 2y \ge 10$

Total cost $Z$ of purchasing $x$ kg of food ‘I’ and $y$ kg of Food ‘II’ is:
$Z = 50x + 70y$

Hence, the mathematical formulation of the problem is:

Minimise $Z = 50x + 70y$ ... (1)

subject to the constraints:
$2x + y \ge 8$ ... (2)
$x + 2y \ge 10$ ... (3)
$x, y \ge 0$ ... (4)

Let us graph the inequalities (2) to (4). The feasible region determined by the system is shown in the Fig 12.7. Here again, observe that the feasible region is unbounded.
