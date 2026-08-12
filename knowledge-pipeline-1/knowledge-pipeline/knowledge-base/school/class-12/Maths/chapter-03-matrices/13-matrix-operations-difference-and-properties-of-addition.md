---
type: concept
title: 'Matrix Operations: Difference and Properties of Addition'
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: concept
tags:
- linear-algebra
- MATRICES
- commutative-law
- associative-law
- matrix-algebra
- Maths
- matrix-subtraction
- class12
---

For example, let $A = \begin{bmatrix} 3 & 1 \\ 5 & x \end{bmatrix}$, then $-A$ is given by
$-A = (-1)A = (-1) \begin{bmatrix} 3 & 1 \\ 5 & x \end{bmatrix} = \begin{bmatrix} -3 & -1 \\ -5 & -x \end{bmatrix}$

### Difference of matrices
If $A = [a_{ij}]$, $B = [b_{ij}]$ are two matrices of the same order, say $m \times n$, then difference $A - B$ is defined as a matrix $D = [d_{ij}]$, where $d_{ij} = a_{ij} - b_{ij}$, for all value of $i$ and $j$. In other words, $D = A - B = A + (-1)B$, that is sum of the matrix $A$ and the matrix $-B$.

**Example 7** If $A = \begin{bmatrix} 1 & 2 & 3 \\ 2 & 3 & 1 \end{bmatrix}$ and $B = \begin{bmatrix} 3 & -1 & 3 \\ -1 & 0 & 2 \end{bmatrix}$, then find $2A - B$.

**Solution** We have
$2A - B = 2 \begin{bmatrix} 1 & 2 & 3 \\ 2 & 3 & 1 \end{bmatrix} - \begin{bmatrix} 3 & -1 & 3 \\ -1 & 0 & 2 \end{bmatrix}$
$= \begin{bmatrix} 2 & 4 & 6 \\ 4 & 6 & 2 \end{bmatrix} + \begin{bmatrix} -3 & 1 & -3 \\ 1 & 0 & -2 \end{bmatrix}$
$= \begin{bmatrix} 2-3 & 4+1 & 6-3 \\ 4+1 & 6+0 & 2-2 \end{bmatrix} = \begin{bmatrix} -1 & 5 & 3 \\ 5 & 6 & 0 \end{bmatrix}$

### 3.4.3 Properties of matrix addition
The addition of matrices satisfy the following properties:

(i) **Commutative Law** If $A = [a_{ij}]$, $B = [b_{ij}]$ are matrices of the same order, say $m \times n$, then $A + B = B + A$.
Now $A + B = [a_{ij}] + [b_{ij}] = [a_{ij} + b_{ij}]$
$= [b_{ij} + a_{ij}]$ (addition of numbers is commutative)
$= ([b_{ij}] + [a_{ij}]) = B + A$

(ii) **Associative Law** For any three matrices $A = [a_{ij}]$, $B = [b_{ij}]$, $C = [c_{ij}]$ of the same order, say $m \times n$, $(A + B) + C = A + (B + C)$.
Now $(A + B) + C = ([a_{ij}] + [b_{ij}]) + [c_{ij}]$
$= [a_{ij} + b_{ij}] + [c_{ij}] = [(a_{ij} + b_{ij}) + c_{ij}]$
$= [a_{ij} + (b_{ij} + c_{ij})]$ (Why?)
$= [a_{ij}] + [(b_{ij} + c_{ij})] = [a_{ij}] + ([b_{ij}] + [c_{ij}]) = A + (B + C)$
