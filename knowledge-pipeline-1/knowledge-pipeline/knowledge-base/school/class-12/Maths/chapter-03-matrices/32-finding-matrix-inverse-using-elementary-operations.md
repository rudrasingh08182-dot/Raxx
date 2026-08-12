---
type: concept
title: Finding Matrix Inverse Using Elementary Operations
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: solved-example
tags:
- matrices
- column-transformation
- row-transformation
- MATRICES
- inverse-matrix
- Maths
- elementary-operations
- class12
---

### Finding Inverse of a Matrix Using Elementary Operations

To find the inverse of matrix $A = \begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix}$, we can use elementary row operations:

$\begin{bmatrix} 1 & 2 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 \\ -\frac{1}{5} & \frac{1}{5} \end{bmatrix} A$ (applying $R_2 \to R_2 - 2R_1$)

$\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = \begin{bmatrix} -\frac{1}{5} & \frac{2}{5} \\ \frac{2}{5} & -\frac{1}{5} \end{bmatrix} A$ (applying $R_1 \to R_1 - 2R_2$)

Thus, $A^{-1} = \begin{bmatrix} -\frac{1}{5} & \frac{2}{5} \\ \frac{2}{5} & -\frac{1}{5} \end{bmatrix}$.

Alternatively, using elementary column operations, we write $A = AI$:

$\begin{bmatrix} 1 & 2 \\ 2 & 1 \end{bmatrix} = A \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$

Applying $C_2 \to C_2 - 2C_1$, we get:

$\begin{bmatrix} 1 & 0 \\ 2 & -3 \end{bmatrix} = A \begin{bmatrix} 1 & -2 \\ 0 & 1 \end{bmatrix}$

Now applying $C_2 \to -\frac{1}{3}C_2$, we have:

$\begin{bmatrix} 1 & 0 \\ 2 & 1 \end{bmatrix} = A \begin{bmatrix} 1 & \frac{2}{3} \\ 0 & -\frac{1}{3} \end{bmatrix}$

Finally, applying $C_1 \to C_1 - 2C_2$, we obtain:

$\begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix} = A \begin{bmatrix} -\frac{1}{3} & \frac{2}{3} \\ \frac{2}{3} & -\frac{1}{3} \end{bmatrix}$

Hence, $A^{-1} = \begin{bmatrix} -\frac{1}{3} & \frac{2}{3} \\ \frac{2}{3} & -\frac{1}{3} \end{bmatrix}$.

---

**Example 24:** Obtain the inverse of the following matrix using elementary operations:
$A = \begin{bmatrix} 0 & 1 & 2 \\ 1 & 2 & 3 \\ 3 & 1 & 1 \end{bmatrix}$

**Solution:** Write $A = IA$, i.e.,

$\begin{bmatrix} 0 & 1 & 2 \\ 1 & 2 & 3 \\ 3 & 1 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} A$

Applying $R_1 \leftrightarrow R_2$:

$\begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 3 & 1 & 1 \end{bmatrix} = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix} A$

Applying $R_3 \to R_3 - 3R_1$:

$\begin{bmatrix} 1 & 2 & 3 \\ 0 & 1 & 2 \\ 0 & -5 & -8 \end{bmatrix} = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & -3 & 1 \end{bmatrix} A$

Applying $R_1 \to R_1 - 2R_2$:

$\begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & 2 \\ 0 & -5 & -8 \end{bmatrix} = \begin{bmatrix} -2 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & -3 & 1 \end{bmatrix} A$

Applying $R_3 \to R_3 + 5R_2$:

$\begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & 2 \\ 0 & 0 & 2 \end{bmatrix} = \begin{bmatrix} -2 & 1 & 0 \\ 1 & 0 & 0 \\ 5 & -3 & 1 \end{bmatrix} A$

Applying $R_3 \to \frac{1}{2}R_3$:

$\begin{bmatrix} 1 & 0 & -1 \\ 0 & 1 & 2 \\ 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} -2 & 1 & 0 \\ 1 & 0 & 0 \\ \frac{5}{2} & -\frac{3}{2} & \frac{1}{2} \end{bmatrix} A$

Applying $R_1 \to R_1 + R_3$:

$\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 2 \\ 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} \frac{1}{2} & -\frac{1}{2} & \frac{1}{2} \\ 1 & 0 & 0 \\ \frac{5}{2} & -\frac{3}{2} & \frac{1}{2} \end{bmatrix} A$
