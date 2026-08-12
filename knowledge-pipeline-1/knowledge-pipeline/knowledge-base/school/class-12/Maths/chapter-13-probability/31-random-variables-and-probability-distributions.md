---
type: concept
title: Random Variables and Probability Distributions
category: school
subject: Maths
level: class-12
chapter: 13
chapter_name: PROBABILITY
content_type: concept
tags:
- PROBABILITY
- Maths
- sample-space
- class12
- probability
- probability-distribution
- random-variable
---

Then $X(HHH) = Rs (2 \times 3) = Rs 6$
$X(HHT) = X(HTH) = X(THH) = Rs (2 \times 2 - 1 \times 1.50) = Rs 2.50$
$X(HTT) = X(THT) = X(TTH) = Rs (1 \times 2) - (2 \times 1.50) = - Re 1$
and $X(TTT) = - Rs (3 \times 1.50) = - Rs 4.50$
where, minus sign shows the loss to the player. Thus, for each element of the sample space, $X$ takes a unique value, hence, $X$ is a function on the sample space whose range is $\{-1, 2.50, -4.50, 6\}$.

**Example 23** A bag contains 2 white and 1 red balls. One ball is drawn at random and then put back in the box after noting its colour. The process is repeated again. If $X$ denotes the number of red balls recorded in the two draws, describe $X$.

**Solution** Let the balls in the bag be denoted by $w_1, w_2, r$. Then the sample space is $S = \{w_1w_1, w_1w_2, w_2w_2, w_2w_1, w_1r, w_2r, rw_1, rw_2, rr\}$.
Now, for $\omega \in S$, $X(\omega) = \text{number of red balls}$.
Therefore,
$X(\{w_1w_1\}) = X(\{w_1w_2\}) = X(\{w_2w_2\}) = X(\{w_2w_1\}) = 0$
$X(\{w_1r\}) = X(\{w_2r\}) = X(\{rw_1\}) = X(\{rw_2\}) = 1$ and $X(\{rr\}) = 2$
Thus, $X$ is a random variable which can take values 0, 1 or 2.

### 13.6.1 Probability distribution of a random variable
Let us look at the experiment of selecting one family out of ten families $f_1, f_2, ..., f_{10}$ in such a manner that each family is equally likely to be selected. Let the families $f_1, f_2, ..., f_{10}$ have 3, 4, 3, 2, 5, 4, 3, 6, 4, 5 members, respectively.
Let us select a family and note down the number of members in the family denoting $X$. Clearly, $X$ is a random variable defined as below:
$X(f_1) = 3, X(f_2) = 4, X(f_3) = 3, X(f_4) = 2, X(f_5) = 5, X(f_6) = 4, X(f_7) = 3, X(f_8) = 6, X(f_9) = 4, X(f_{10}) = 5$
Thus, $X$ can take any value 2, 3, 4, 5 or 6 depending upon which family is selected.
Now, $X$ will take the value 2 when the family $f_4$ is selected. $X$ can take the value 3 when any one of the families $f_1, f_3, f_7$ is selected.
Similarly, $X = 4$, when family $f_2, f_6$ or $f_9$ is selected,
$X = 5$, when family $f_5$ or $f_{10}$ is selected
and $X = 6$, when family $f_8$ is selected.
