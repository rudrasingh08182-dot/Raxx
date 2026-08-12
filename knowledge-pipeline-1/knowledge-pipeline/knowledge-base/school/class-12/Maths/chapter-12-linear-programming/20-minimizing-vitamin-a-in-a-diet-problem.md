---
type: concept
title: Minimizing Vitamin A in a Diet Problem
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

### Miscellaneous Examples

**Example 9 (Diet problem)** A dietician has to develop a special diet using two foods P and Q. Each packet (containing 30 g) of food P contains 12 units of calcium, 4 units of iron, 6 units of cholesterol and 6 units of vitamin A. Each packet of the same quantity of food Q contains 3 units of calcium, 20 units of iron, 4 units of cholesterol and 3 units of vitamin A. The diet requires at least 240 units of calcium, at least 460 units of iron and at most 300 units of cholesterol. How many packets of each food should be used to minimise the amount of vitamin A in the diet? What is the minimum amount of vitamin A?

**Solution:** Let $x$ and $y$ be the number of packets of food P and Q respectively. Obviously $x \geq 0, y \geq 0$. Mathematical formulation of the given problem is as follows:

Minimise $Z = 6x + 3y$ (vitamin A)

subject to the constraints:
$12x + 3y \geq 240$ (constraint on calcium), i.e., $4x + y \geq 80$ ... (1)
$4x + 20y \geq 460$ (constraint on iron), i.e., $x + 5y \geq 115$ ... (2)
$6x + 4y \leq 300$ (constraint on cholesterol), i.e., $3x + 2y \leq 150$ ... (3)
$x \geq 0, y \geq 0$ ... (4)

Let us graph the inequalities (1) to (4).

The feasible region (shaded) determined by the constraints (1) to (4) is shown in Fig 12.10 and note that it is bounded.
