---
type: concept
title: Inverse of a Matrix and Elementary Operations
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- column-transformation
- row-transformation
- linear-algebra
- MATRICES
- matrix-inverse
- Maths
- elementary-operations
- class12
---

### Proof of Inverse of Product of Matrices
From the definition of inverse of a matrix, we have:
$(AB)(AB)^{-1} = I$

Pre-multiplying both sides by $A^{-1}$:
$A^{-1}(AB)(AB)^{-1} = A^{-1}I$

Using the associative property $(A^{-1}A)B(AB)^{-1} = A^{-1}$ (Since $A^{-1}I = A^{-1}$):
$IB(AB)^{-1} = A^{-1}$
$B(AB)^{-1} = A^{-1}$

Pre-multiplying both sides by $B^{-1}$:
$B^{-1}B(AB)^{-1} = B^{-1}A^{-1}$
$I(AB)^{-1} = B^{-1}A^{-1}$

Hence, $(AB)^{-1} = B^{-1}A^{-1}$

### 3.8.1 Inverse of a matrix by elementary operations
Let $X$, $A$, and $B$ be matrices of the same order such that $X = AB$. In order to apply a sequence of elementary row operations on the matrix equation $X = AB$, we will apply these row operations simultaneously on $X$ and on the first matrix $A$ of the product $AB$ on RHS.

Similarly, in order to apply a sequence of elementary column operations on the matrix equation $X = AB$, we will apply these operations simultaneously on $X$ and on the second matrix $B$ of the product $AB$ on RHS.

In view of the above discussion, we conclude that if $A$ is a matrix such that $A^{-1}$ exists, then to find $A^{-1}$ using elementary row operations, write $A = IA$ and apply a sequence of row operations on $A = IA$ till we get $I = BA$. The matrix $B$ will be the inverse of $A$. Similarly, if we wish to find $A^{-1}$ using column operations, then write $A = AI$ and apply a sequence of column operations on $A = AI$ till we get $I = AB$.

**Remark:** In case, after applying one or more elementary row (column) operations on $A = IA$ ($A = AI$), if we obtain all zeros in one or more rows of the matrix $A$ on L.H.S., then $A^{-1}$ does not exist.

**Example 23:** By using elementary operations, find the inverse of the matrix $A = \begin{bmatrix} 1 & 2 \\ 2 & -1 \end{bmatrix}$.

**Solution:** In order to use elementary row operations we may write $A = IA$.

$\begin{bmatrix} 1 & 2 \\ 2 & -1 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} A$, then $\begin{bmatrix} 1 & 2 \\ 0 & -5 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ -2 & 1 \end{bmatrix} A$ (applying $R_2 \to R_2 - 2R_1$)
