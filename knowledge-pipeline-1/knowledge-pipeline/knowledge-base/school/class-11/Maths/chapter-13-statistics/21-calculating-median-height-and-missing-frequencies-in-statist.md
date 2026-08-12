---
type: concept
title: Calculating Median Height and Missing Frequencies in Statistics
category: school
subject: Maths
level: class-11
chapter: 13
chapter_name: STATISTICS
content_type: solved-example
tags:
- STATISTICS
- statistics
- cumulative-frequency
- class12
- median
- frequency-distribution
- Maths
- mathematics
---

### Example 7
A survey regarding the heights (in cm) of 51 girls of Class X of a school was conducted and the following data was obtained:

| Height (in cm) | Number of girls |
| :--- | :--- |
| Less than 140 | 4 |
| Less than 145 | 11 |
| Less than 150 | 29 |
| Less than 155 | 40 |
| Less than 160 | 46 |
| Less than 165 | 51 |

**Find the median height.**

**Solution:** To calculate the median height, we need to find the class intervals and their corresponding frequencies. The given distribution being of the less than type, 140, 145, 150, . . ., 165 give the upper limits of the corresponding class intervals. So, the classes should be below 140, 140 - 145, 145 - 150, . . ., 160 - 165. Observe that from the given distribution, we find that there are 4 girls with height less than 140, i.e., the frequency of class interval below 140 is 4. Now, there are 11 girls with heights less than 145 and 4 girls with height less than 140. Therefore, the number of girls with height in the interval 140 - 145 is 11 – 4 = 7. Similarly, the frequency of 145 - 150 is 29 – 11 = 18, for 150 - 155, it is 40 – 29 = 11, and so on. So, our frequency distribution table with the given cumulative frequencies becomes:

| Class intervals | Frequency | Cumulative frequency |
| :--- | :--- | :--- |
| Below 140 | 4 | 4 |
| 140 - 145 | 7 | 11 |
| 145 - 150 | 18 | 29 |
| 150 - 155 | 11 | 40 |
| 155 - 160 | 6 | 46 |
| 160 - 165 | 5 | 51 |

Now $n = 51$. So, $\frac{n}{2} = \frac{51}{2} = 25.5$. This observation lies in the class 145 - 150. Then,
$l$ (the lower limit) = 145,
$cf$ (the cumulative frequency of the class preceding 145 - 150) = 11,
$f$ (the frequency of the median class 145 - 150) = 18,
$h$ (the class size) = 5.

Using the formula, $\text{Median} = l + \left( \frac{\frac{n}{2} - cf}{f} \right) \times h$, we have

$\text{Median} = 145 + \left( \frac{25.5 - 11}{18} \right) \times 5$
$= 145 + \frac{72.5}{18} = 149.03$.

So, the median height of the girls is 149.03 cm. This means that the height of about 50% of the girls is less than this height, and 50% are taller than this height.

### Example 8
The median of the following data is 525. Find the values of $x$ and $y$, if the total frequency is 100.

| Class intervals | Frequency |
| :--- | :--- |
| 0 - 100 | 2 |
| 100 - 200 | 5 |
| 200 - 300 | $x$ |
| 300 - 400 | 12 |
| 400 - 500 | 17 |
| 500 - 600 | 20 |
| 600 - 700 | $y$ |
| 700 - 800 | 9 |
| 800 - 900 | 7 |
| 900 - 1000 | 4 |
