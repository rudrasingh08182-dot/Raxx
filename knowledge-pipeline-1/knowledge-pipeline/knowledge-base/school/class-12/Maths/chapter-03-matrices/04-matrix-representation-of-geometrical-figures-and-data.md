---
type: concept
title: Matrix Representation of Geometrical Figures and Data
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- matrices
- matrix-representation
- coordinate-geometry
- linear-algebra
- MATRICES
- Maths
- data-representation
- class12
---

### MATRICES

**Note**
1. We shall follow the notation, namely $A = [a_{ij}]_{m \times n}$ to indicate that $A$ is a matrix of order $m \times n$.
2. We shall consider only those matrices whose elements are real numbers or functions taking real values.

We can also represent any point $(x, y)$ in a plane by a matrix (column or row) as $\begin{bmatrix} x \\ y \end{bmatrix}$ (or $[x, y]$). For example, point $P(0, 1)$ as a matrix representation may be given as $P = \begin{bmatrix} 0 \\ 1 \end{bmatrix}$ or $[0, 1]$.

Observe that in this way we can also express the vertices of a closed rectilinear figure in the form of a matrix. For example, consider a quadrilateral $ABCD$ with vertices $A(1, 0)$, $B(3, 2)$, $C(1, 3)$, $D(-1, 2)$.

Now, quadrilateral $ABCD$ in the matrix form, can be represented as:

$X = \begin{bmatrix} 1 & 3 & 1 & -1 \\ 0 & 2 & 3 & 2 \end{bmatrix}_{2 \times 4}$

or

$Y = \begin{bmatrix} 1 & 0 \\ 3 & 2 \\ 1 & 3 \\ -1 & 2 \end{bmatrix}_{4 \times 2}$

Thus, matrices can be used as representation of vertices of geometrical figures in a plane.

Now, let us consider some examples.

**Example 1:** Consider the following information regarding the number of men and women workers in three factories I, II and III:

| | Men workers | Women workers |
|---|---|---|
| I | 30 | 25 |
| II | 25 | 31 |
| III | 27 | 26 |

Represent the above information in the form of a $3 \times 2$ matrix. What does the entry in the third row and second column represent?
