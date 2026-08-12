---
type: concept
title: Definition and Properties of Adjoint of a Matrix
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- matrix-theory
- determinants
- adjoint-matrix
- Maths
- linear-algebra
---

### 4.6.1 Adjoint of a matrix

**Definition 3** The adjoint of a square matrix $A = [a_{ij}]_{n \times n}$ is defined as the transpose of the matrix $[A_{ij}]_{n \times n}$, where $A_{ij}$ is the cofactor of the element $a_{ij}$. Adjoint of the matrix $A$ is denoted by $\text{adj } A$.

Let

$$A = \begin{bmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{bmatrix}$$

Then

$$\text{adj } A = \text{Transpose of } \begin{bmatrix} A_{11} & A_{12} & A_{13} \\ A_{21} & A_{22} & A_{23} \\ A_{31} & A_{32} & A_{33} \end{bmatrix} = \begin{bmatrix} A_{11} & A_{21} & A_{31} \\ A_{12} & A_{22} & A_{32} \\ A_{13} & A_{23} & A_{33} \end{bmatrix}$$

**Example 23** Find $\text{adj } A$ for $A = \begin{bmatrix} 2 & 3 \\ 1 & 4 \end{bmatrix}$

**Solution** We have $A_{11} = 4, A_{12} = -1, A_{21} = -3, A_{22} = 2$

Hence $\text{adj } A = \begin{bmatrix} A_{11} & A_{21} \\ A_{12} & A_{22} \end{bmatrix} = \begin{bmatrix} 4 & -3 \\ -1 & 2 \end{bmatrix}$

**Remark** For a square matrix of order 2, given by

$$A = \begin{bmatrix} a_{11} & a_{12} \\ a_{21} & a_{22} \end{bmatrix}$$

The $\text{adj } A$ can also be obtained by interchanging $a_{11}$ and $a_{22}$ and by changing signs of $a_{12}$ and $a_{21}$.

We state the following theorem without proof.

**Theorem 1** If $A$ be any given square matrix of order $n$, then

$$A(\text{adj } A) = (\text{adj } A) A = |A| I$$

where $I$ is the identity matrix of order $n$.
