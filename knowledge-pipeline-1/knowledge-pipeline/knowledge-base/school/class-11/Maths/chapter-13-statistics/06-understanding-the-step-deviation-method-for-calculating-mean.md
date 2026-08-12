---
type: concept
title: Understanding the Step Deviation Method for Calculating Mean
category: school
subject: Maths
level: class-11
chapter: 13
chapter_name: STATISTICS
content_type: concept
tags:
- STATISTICS
- statistics
- step-deviation-method
- class12
- assumed-mean-method
- Maths
- mean-calculation
- mathematics
---

176 MATHEMATICS

Substituting the values of $a$, $\Sigma f_i d_i$ and $\Sigma f_i$ from Table 13.4, we get
$\bar{x} = a + \frac{\Sigma f_i d_i}{\Sigma f_i} = 47.5 + \frac{145}{30} = 47.5 + 4.83 = 52.33$ (Note: The original text contained OCR errors in the calculation line; corrected based on standard statistical procedure).

Therefore, the mean of the marks obtained by the students is 62. The method discussed above is called the Assumed Mean Method.

Activity 1: From the Table 13.3 find the mean by taking each of $x_i$ (i.e., 17.5, 32.5, and so on) as ‘$a$’. What do you observe? You will find that the mean determined in each case is the same, i.e., 62. (Why?)

So, we can say that the value of the mean obtained does not depend on the choice of ‘$a$’.

Observe that in Table 13.4, the values in Column 4 are all multiples of 15. So, if we divide the values in the entire Column 4 by 15, we would get smaller numbers to multiply with $f_i$. (Here, 15 is the class size of each class interval.)

So, let $u_i = \frac{x_i - a}{h}$, where $a$ is the assumed mean and $h$ is the class size.

Now, we calculate $u_i$ in this way and continue as before (i.e., find $f_i u_i$ and then $\Sigma f_i u_i$). Taking $h = 15$, let us form Table 13.5.

### Table 13.5

| Class interval | $f_i$ | $x_i$ | $d_i = x_i - a$ | $u_i = \frac{x_i - a}{h}$ | $f_i u_i$ |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 10 - 25 | 2 | 17.5 | –30 | –2 | –4 |
| 25 - 40 | 3 | 32.5 | –15 | –1 | –3 |
| 40 - 55 | 7 | 47.5 | 0 | 0 | 0 |
| 55 - 70 | 6 | 62.5 | 15 | 1 | 6 |
| 70 - 85 | 6 | 77.5 | 30 | 2 | 12 |
| 85 - 100 | 6 | 92.5 | 45 | 3 | 18 |
| **Total** | **$\Sigma f_i = 30$** | | | | **$\Sigma f_i u_i = 29$** |

Let $\bar{u} = \frac{\Sigma f_i u_i}{\Sigma f_i}$.

Here, again let us find the relation between $\bar{u}$ and $\bar{x}$.
