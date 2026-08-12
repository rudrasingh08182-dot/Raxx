---
type: concept
title: Examples of Matrix Construction and Order Determination
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: solved-example
tags:
- matrices
- linear-algebra
- MATRICES
- matrix-construction
- Maths
- class12
- matrix-order
---

### Solution
The information is represented in the form of a $3 \times 2$ matrix as follows:

$$A = \begin{bmatrix} 30 & 25 \\ 25 & 31 \\ 27 & 26 \end{bmatrix}$$

The entry in the third row and second column represents the number of women workers in factory III.

**Example 2** If a matrix has 8 elements, what are the possible orders it can have?

**Solution** We know that if a matrix is of order $m \times n$, it has $mn$ elements. Thus, to find all possible orders of a matrix with 8 elements, we will find all ordered pairs of natural numbers, whose product is 8.

Thus, all possible ordered pairs are $(1, 8), (8, 1), (4, 2), (2, 4)$.

Hence, possible orders are $1 \times 8, 8 \times 1, 4 \times 2, 2 \times 4$.

**Example 3** Construct a $3 \times 2$ matrix whose elements are given by $a_{ij} = \frac{1}{2} |i - 3j|$.

**Solution** In general a $3 \times 2$ matrix is given by:

$$A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \\ a_{31} & a_{32} \end{bmatrix}$$

Now $a_{ij} = \frac{1}{2} |i - 3j|$, $i = 1, 2, 3$ and $j = 1, 2$.

Therefore:
$a_{11} = \frac{1}{2} |1 - 3(1)| = \frac{2}{2} = 1$
$a_{12} = \frac{1}{2} |1 - 3(2)| = \frac{5}{2}$
$a_{21} = \frac{1}{2} |2 - 3(1)| = \frac{1}{2}$
$a_{22} = \frac{1}{2} |2 - 3(2)| = \frac{4}{2} = 2$
$a_{31} = \frac{1}{2} |3 - 3(1)| = 0$
$a_{32} = \frac{1}{2} |3 - 3(2)| = \frac{3}{2}$

Hence the required matrix is given by:

$$A = \begin{bmatrix} 1 & 5/2 \\ 1/2 & 2 \\ 0 & 3/2 \end{bmatrix}$$
