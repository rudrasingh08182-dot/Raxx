---
type: concept
title: Properties of Transpose and Symmetric Matrices
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- skew-symmetric-matrix
- symmetric-matrix
- linear-algebra
- MATRICES
- Maths
- transpose-properties
- class12
---

### Properties of Transpose of Matrices

#### Solution

(i) We have
$A = \begin{bmatrix} 3 & 4 \\ 3 & 2 \\ 4 & 2 \end{bmatrix} \implies A' = \begin{bmatrix} 3 & 3 & 4 \\ 4 & 2 & 2 \end{bmatrix} \implies (A')' = \begin{bmatrix} 3 & 4 \\ 3 & 2 \\ 4 & 2 \end{bmatrix} = A$
Thus $(A')' = A$

(ii) We have
$A = \begin{bmatrix} 3 & 3 & 2 \\ 4 & 2 & 0 \end{bmatrix}$, $B = \begin{bmatrix} 2 & 1 & 2 \\ 1 & 2 & 4 \end{bmatrix} \implies A + B = \begin{bmatrix} 5 & 4 & 4 \\ 5 & 4 & 4 \end{bmatrix}$
Therefore $(A + B)' = \begin{bmatrix} 5 & 5 \\ 4 & 4 \\ 4 & 4 \end{bmatrix}$
Now $A' = \begin{bmatrix} 3 & 4 \\ 3 & 2 \\ 2 & 0 \end{bmatrix}$, $B' = \begin{bmatrix} 2 & 1 \\ 1 & 2 \\ 2 & 4 \end{bmatrix}$
So $A' + B' = \begin{bmatrix} 5 & 5 \\ 4 & 4 \\ 4 & 4 \end{bmatrix}$
Thus $(A + B)' = A' + B'$

(iii) We have
$kB = k \begin{bmatrix} 2 & 1 & 2 \\ 1 & 2 & 4 \end{bmatrix} = \begin{bmatrix} 2k & k & 2k \\ k & 2k & 4k \end{bmatrix}$
Then $(kB)' = \begin{bmatrix} 2k & k \\ k & 2k \\ 2k & 4k \end{bmatrix} = k \begin{bmatrix} 2 & 1 \\ 1 & 2 \\ 2 & 4 \end{bmatrix} = kB'$
Thus $(kB)' = kB'$

**Example 21:** If $A = \begin{bmatrix} -2 \\ 4 \\ 5 \end{bmatrix}$, $B = \begin{bmatrix} 1 & 3 & -6 \end{bmatrix}$, verify that $(AB)' = B'A'$.

**Solution:** We have
$A = \begin{bmatrix} -2 \\ 4 \\ 5 \end{bmatrix}$, $B = \begin{bmatrix} 1 & 3 & -6 \end{bmatrix}$
then $AB = \begin{bmatrix} -2 \\ 4 \\ 5 \end{bmatrix} \begin{bmatrix} 1 & 3 & -6 \end{bmatrix} = \begin{bmatrix} -2 & -6 & 12 \\ 4 & 12 & -24 \\ 5 & 15 & -30 \end{bmatrix}$
Now $A' = \begin{bmatrix} -2 & 4 & 5 \end{bmatrix}$, $B' = \begin{bmatrix} 1 \\ 3 \\ -6 \end{bmatrix}$
$B'A' = \begin{bmatrix} 1 \\ 3 \\ -6 \end{bmatrix} \begin{bmatrix} -2 & 4 & 5 \end{bmatrix} = \begin{bmatrix} -2 & 4 & 5 \\ -6 & 12 & 15 \\ 12 & -24 & -30 \end{bmatrix} = (AB)'$
Clearly $(AB)' = B'A'$

### 3.6 Symmetric and Skew Symmetric Matrices

**Definition 4:** A square matrix $A = [a_{ij}]$ is said to be symmetric if $A' = A$, that is, $[a_{ij}] = [a_{ji}]$ for all possible values of $i$ and $j$.
For example, $A = \begin{bmatrix} 3 & 2 & 3 \\ 2 & 1.5 & -1 \\ 3 & -1 & 1 \end{bmatrix}$ is a symmetric matrix as $A' = A$.

**Definition 5:** A square matrix $A = [a_{ij}]$ is said to be skew symmetric matrix if $A' = -A$, that is $a_{ji} = -a_{ij}$ for all possible values of $i$ and $j$. Now, if we put $i = j$, we have $a_{ii} = -a_{ii}$. Therefore $2a_{ii} = 0$ or $a_{ii} = 0$ for all $i$'s.
This means that all the diagonal elements of a skew symmetric matrix are zero.
