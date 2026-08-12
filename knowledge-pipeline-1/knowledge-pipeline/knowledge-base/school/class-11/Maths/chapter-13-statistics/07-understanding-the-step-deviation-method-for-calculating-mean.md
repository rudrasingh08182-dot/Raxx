---
type: concept
title: Understanding the Step-Deviation Method for Calculating Mean
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

We have, $u_i = \frac{x_i - a}{h}$

Therefore, $\bar{u} = \frac{\sum f_i u_i}{\sum f_i} = \frac{\sum f_i (\frac{x_i - a}{h})}{\sum f_i} = \frac{1}{h} [\frac{\sum f_i x_i}{\sum f_i} - a] = \frac{1}{h} [\bar{x} - a]$

So, $h\bar{u} = \bar{x} - a$
i.e., $\bar{x} = a + h\bar{u}$

So, $\bar{x} = a + h (\frac{\sum f_i u_i}{\sum f_i})$

Now, substituting the values of $a$, $h$, $\sum f_i u_i$ and $\sum f_i$ from Table 14.5, we get
$\bar{x} = 47.5 + (\frac{15}{30}) \times 10 = 47.5 + 14.5 = 62$

So, the mean marks obtained by a student is 62.

The method discussed above is called the Step-deviation method.

We note that:
* The step-deviation method will be convenient to apply if all the $d_i$'s have a common factor.
* The mean obtained by all the three methods is the same.
* The assumed mean method and step-deviation method are just simplified forms of the direct method.
* The formula $\bar{x} = a + h\bar{u}$ still holds if $a$ and $h$ are not as given above, but are any non-zero numbers such that $u_i = \frac{x_i - a}{h}$.

Let us apply these methods in another example.

**Example 2:** The table below gives the percentage distribution of female teachers in the primary schools of rural areas of various states and union territories (U.T.) of India. Find the mean percentage of female teachers by all the three methods discussed in this section.

| Percentage of female teachers | 15 - 25 | 25 - 35 | 35 - 45 | 45 - 55 | 55 - 65 | 65 - 75 | 75 - 85 |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| Number of States/U.T. | 6 | 11 | 7 | 4 | 4 | 2 | 1 |

*Source: Seventh All India School Education Survey conducted by NCERT*

**Solution:** Let us find the class marks, $x_i$, of each class, and put them in a column (see Table 13.6):

**Table 13.6**

| Percentage of female teachers | Number of States/U.T. ($f_i$) | $x_i$ |
| :--- | :--- | :--- |
| 15 - 25 | 6 | 20 |
| 25 - 35 | 11 | 30 |
| 35 - 45 | 7 | 40 |
| 45 - 55 | 4 | 50 |
| 55 - 65 | 4 | 60 |
| 65 - 75 | 2 | 70 |
| 75 - 85 | 1 | 80 |

Here we take $a = 50$, $h = 10$, then $d_i = x_i - 50$ and $u_i = \frac{x_i - 50}{10}$.

We now find $d_i$ and $u_i$ and put them in Table 13.7.
