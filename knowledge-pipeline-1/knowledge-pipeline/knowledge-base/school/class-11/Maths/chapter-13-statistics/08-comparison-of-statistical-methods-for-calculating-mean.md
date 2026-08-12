---
type: concept
title: Comparison of Statistical Methods for Calculating Mean
category: school
subject: Maths
level: class-11
chapter: 13
chapter_name: STATISTICS
content_type: solved-example
tags:
- STATISTICS
- statistics
- direct-method
- step-deviation-method
- class12
- assumed-mean-method
- Maths
- mean-calculation
---

### Table 13.7: Calculation of Mean Percentage of Female Teachers

| Class Interval | Number of states/U.T. ($f_i$) | $x_i$ | $d_i = x_i - 50$ | $u_i = \frac{x_i - 50}{10}$ | $f_ix_i$ | $f_id_i$ | $f_iu_i$ |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 15 - 25 | 6 | 20 | -30 | -3 | 120 | -180 | -18 |
| 25 - 35 | 11 | 30 | -20 | -2 | 330 | -220 | -22 |
| 35 - 45 | 7 | 40 | -10 | -1 | 280 | -70 | -7 |
| 45 - 55 | 4 | 50 | 0 | 0 | 200 | 0 | 0 |
| 55 - 65 | 4 | 60 | 10 | 1 | 240 | 40 | 4 |
| 65 - 75 | 2 | 70 | 20 | 2 | 140 | 40 | 4 |
| 75 - 85 | 1 | 80 | 30 | 3 | 80 | 30 | 3 |
| **Total** | **35** | | | | **1390** | **-360** | **-36** |

From the table above, we obtain $\sum f_i = 35$, $\sum f_ix_i = 1390$, $\sum f_id_i = -360$, $\sum f_iu_i = -36$.

**Using the direct method:**
$\bar{x} = \frac{\sum f_ix_i}{\sum f_i} = \frac{1390}{35} = 39.71$

**Using the assumed mean method:**
$\bar{x} = a + \frac{\sum f_id_i}{\sum f_i} = 50 + \frac{-360}{35} = 50 - 10.29 = 39.71$

**Using the step-deviation method:**
$\bar{x} = a + \left( \frac{\sum f_iu_i}{\sum f_i} \right) \times h = 50 + \left( \frac{-36}{35} \right) \times 10 = 50 - 10.29 = 39.71$

Therefore, the mean percentage of female teachers in the primary schools of rural areas is 39.71.

**Remark:** The result obtained by all the three methods is the same. So the choice of method to be used depends on the numerical values of $x_i$ and $f_i$. If $x_i$ and $f_i$ are sufficiently small, then the direct method is an appropriate choice. If $x_i$ and $f_i$ are numerically large numbers, then we can go for the assumed mean method or step-deviation method. If the class sizes are unequal, and $x_i$ are large numerically, we can still apply the step-deviation method by taking $h$ to be a suitable divisor of all the $d_i$'s.
