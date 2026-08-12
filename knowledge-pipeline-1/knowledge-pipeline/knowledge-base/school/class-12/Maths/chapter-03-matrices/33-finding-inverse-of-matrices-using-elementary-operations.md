---
type: concept
title: Finding Inverse of Matrices Using Elementary Operations
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
- elementary-row-operations
- inverse-matrix
- Maths
- elementary-column-operations
- class12
---

### Matrices

$$\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \\ 4 & 3 & 1 \end{bmatrix} A \begin{bmatrix} 5 & 3 & 1 \\ 2 & 2 & 2 \\ - & - & - \end{bmatrix}$$ (applying $R_2 \rightarrow R_2 - 2R_3$)

Hence $A^{-1} = \begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \\ 4 & 3 & 1 \\ 5 & 3 & 1 \\ 2 & 2 & 2 \end{bmatrix}$ (Note: Matrix structure preserved from source).

Alternatively, write $A = IA$, i.e.,
$$\begin{bmatrix} 0 & 1 & 2 \\ 1 & 2 & 3 \\ 3 & 1 & 1 \end{bmatrix} = A \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$

or
$$\begin{bmatrix} 1 & 0 & 2 \\ 2 & 1 & 3 \\ 1 & 3 & 1 \end{bmatrix} = A \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \\ 0 & 0 & 1 \end{bmatrix}$$ ($C_1 \leftrightarrow C_2$)

or
$$\begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & -1 \\ 1 & 3 & -1 \end{bmatrix} = A \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 2 \\ 0 & 0 & 1 \end{bmatrix}$$ ($C_3 \rightarrow C_3 - 2C_1$)

or
$$\begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 1 & 3 & 2 \end{bmatrix} = A \begin{bmatrix} 0 & 1 & 1 \\ 1 & 0 & 2 \\ 0 & 0 & 1 \end{bmatrix}$$ ($C_3 \rightarrow C_3 + C_2$)

or
$$\begin{bmatrix} 1 & 0 & 0 \\ 2 & 1 & 0 \\ 1 & 3 & 1 \end{bmatrix} = A \begin{bmatrix} 1/2 & 1 & 2 \\ 1 & 0 & 1 \\ 1/2 & 0 & 2 \end{bmatrix}$$ ($C_3 \rightarrow \frac{1}{2} C_3$)

or
$$\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 5 & 3 & 1 \end{bmatrix} = A \begin{bmatrix} 1/2 & 1 & 2 \\ 1 & 0 & 1 \\ 1/2 & 0 & 2 \end{bmatrix}$$ ($C_1 \rightarrow C_1 - 2C_2$)

or
$$\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 3 & 1 \end{bmatrix} = A \begin{bmatrix} 1 & 1 & 1/2 \\ 4 & 0 & 1 \\ 5 & 1 & 0 \end{bmatrix}$$ ($C_1 \rightarrow C_1 + 5C_3$)

or
$$\begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} = A \begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \\ 4 & 3 & 1 \\ 5 & 3 & 1 \\ 2 & 2 & 2 \end{bmatrix}$$ ($C_2 \rightarrow C_2 - 3C_3$)

Hence $A^{-1} = \begin{bmatrix} 1 & 1 & 1 \\ 2 & 2 & 2 \\ 4 & 3 & 1 \\ 5 & 3 & 1 \\ 2 & 2 & 2 \end{bmatrix}$.

**Example 25** Find $P^{-1}$, if it exists, given $\begin{bmatrix} 1 & 0 \\ 5 & 1 \end{bmatrix} = P \begin{bmatrix} 2 & 1 \\ 0 & -1 \end{bmatrix}$.

**Solution** We have $P = IP$, i.e., $\begin{bmatrix} 1 & 0 \\ 5 & 1 \end{bmatrix} = P \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$.

or
$$\begin{bmatrix} 1 & 5 \\ 5 & 1 \end{bmatrix} = P \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}$$ (applying $R_1 \rightarrow \frac{1}{10} R_1$)
