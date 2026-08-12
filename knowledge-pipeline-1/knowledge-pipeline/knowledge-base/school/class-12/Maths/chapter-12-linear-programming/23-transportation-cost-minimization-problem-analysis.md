---
type: concept
title: Transportation Cost Minimization Problem Analysis
category: school
subject: Maths
level: class-12
chapter: 12
chapter_name: LINEAR PROGRAMMING
content_type: solved-example
tags:
- class12
- transportation-problem
- LINEAR PROGRAMMING
- optimization
- mathematical-modeling
- Maths
- linear-programming
---

### Transportation Problem Analysis

**Cost of transportation per unit is given below:**

| From/To | A | B | C |
| :--- | :--- | :--- | :--- |
| **P** | 160 | 100 | 150 |
| **Q** | 100 | 120 | 100 |

How many units should be transported from each factory to each depot in order that the transportation cost is minimum? What will be the minimum transportation cost?

**Solution:**

The problem can be explained diagrammatically as follows (Fig 12.12):

Let $x$ units and $y$ units of the commodity be transported from the factory at P to the depots at A and B respectively. Then $(8 - x - y)$ units will be transported to depot at C (Why?)

Hence, we have $x \geq 0$, $y \geq 0$ and $8 - x - y \geq 0$
i.e., $x \geq 0$, $y \geq 0$ and $x + y \leq 8$

Now, the weekly requirement of the depot at A is 5 units of the commodity. Since $x$ units are transported from the factory at P, the remaining $(5 - x)$ units need to be transported from the factory at Q. Obviously, $5 - x \geq 0$, i.e., $x \leq 5$.

Similarly, $(5 - y)$ and $6 - (5 - x + 5 - y) = x + y - 4$ units are to be transported from the factory at Q to the depots at B and C respectively.

Thus, $5 - y \geq 0$, $x + y - 4 \geq 0$
i.e., $y \leq 5$, $x + y \geq 4$
