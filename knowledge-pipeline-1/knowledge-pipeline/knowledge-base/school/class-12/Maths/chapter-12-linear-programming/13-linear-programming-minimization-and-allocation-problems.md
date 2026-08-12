---
type: concept
title: 'Linear Programming: Minimization and Allocation Problems'
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
- mathematics
- allocation-problem
---

Let us evaluate $Z$ at the corner points $A(0,8)$, $B(2,4)$ and $C(10,0)$.

| Corner Point | $Z = 50x + 70y$ |
| :--- | :--- |
| (0,8) | 560 |
| (2,4) | 380 |
| (10,0) | 500 |

In the table, we find that the smallest value of $Z$ is 380 at the point (2,4). Can we say that the minimum value of $Z$ is 380? Remember that the feasible region is unbounded. Therefore, we have to draw the graph of the inequality $50x + 70y < 380$ i.e., $5x + 7y < 38$ to check whether the resulting open half plane has any point common with the feasible region. From the Fig 12.7, we see that it has no points in common.

Thus, the minimum value of $Z$ is 380 attained at the point (2, 4). Hence, the optimal mixing strategy for the dietician would be to mix 2 kg of Food ‘I’ and 4 kg of Food ‘II’, and with this strategy, the minimum cost of the mixture will be Rs 380.

**Example 7 (Allocation problem)** A cooperative society of farmers has 50 hectare of land to grow two crops X and Y. The profit from crops X and Y per hectare are estimated as Rs 10,500 and Rs 9,000 respectively. To control weeds, a liquid herbicide has to be used for crops X and Y at rates of 20 litres and 10 litres per hectare. Further, no more than 800 litres of herbicide should be used in order to protect fish and wild life using a pond which collects drainage from this land. How much land should be allocated to each crop so as to maximise the total profit of the society?

**Solution** Let $x$ hectare of land be allocated to crop X and $y$ hectare to crop Y. Obviously, $x \geq 0, y \geq 0$.

Profit per hectare on crop X = Rs 10500
Profit per hectare on crop Y = Rs 9000
Therefore, total profit = Rs $(10500x + 9000y)$
