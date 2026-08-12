---
type: concept
title: Properties of Adjoint and Invertibility of Matrices
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- invertible-matrix
- determinants
- matrix-inverse
- adjoint-matrix
- Maths
- linear-algebra
---

Writing determinants of matrices on both sides, we have:
$(A)(\text{adj } A) = |A| I$

i.e., $|(\text{adj } A)| |A| = |A|^3 \begin{vmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{vmatrix}$

i.e., $|(\text{adj } A)| |A| = |A|^3$ (1)

i.e., $|(\text{adj } A)| = |A|^2$

In general, if $A$ is a square matrix of order $n$, then $|\text{adj}(A)| = |A|^{n-1}$.

**Theorem 4:** A square matrix $A$ is invertible if and only if $A$ is a nonsingular matrix.

**Proof:** Let $A$ be an invertible matrix of order $n$ and $I$ be the identity matrix of order $n$. Then, there exists a square matrix $B$ of order $n$ such that $AB = BA = I$. Now $|AB| = |I|$. So $|A| |B| = 1$ (since $|I| = 1$, $|AB| = |A| |B|$). This gives $|A| \neq 0$. Hence $A$ is nonsingular.

Conversely, let $A$ be nonsingular. Then $|A| \neq 0$. Now $A(\text{adj } A) = (\text{adj } A)A = |A|I$ (Theorem 1). Or $A \left( \frac{1}{|A|} \text{adj } A \right) = \left( \frac{1}{|A|} \text{adj } A \right) A = I$. Or $AB = BA = I$, where $B = \frac{1}{|A|} \text{adj } A$. Thus $A$ is invertible and $A^{-1} = \frac{1}{|A|} \text{adj } A$.

**Example 24:** If $A = \begin{bmatrix} 1 & 3 & 3 \\ 1 & 4 & 3 \\ 1 & 3 & 4 \end{bmatrix}$, then verify that $A(\text{adj } A) = |A| I$. Also find $A^{-1}$.

**Solution:** We have $|A| = 1(16 - 9) - 3(4 - 3) + 3(3 - 4) = 1 \neq 0$. Now $A_{11} = 7, A_{12} = -1, A_{13} = -1, A_{21} = -3, A_{22} = 1, A_{23} = 0, A_{31} = -3, A_{32} = 0, A_{33} = 1$. Therefore $\text{adj } A = \begin{bmatrix} 7 & -3 & -3 \\ -1 & 1 & 0 \\ -1 & 0 & 1 \end{bmatrix}$.

Now $A(\text{adj } A) = \begin{bmatrix} 1 & 3 & 3 \\ 1 & 4 & 3 \\ 1 & 3 & 4 \end{bmatrix} \begin{bmatrix} 7 & -3 & -3 \\ -1 & 1 & 0 \\ -1 & 0 & 1 \end{bmatrix} = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix} = |A| I$.

Also $A^{-1} = \frac{1}{|A|} \text{adj } A = \begin{bmatrix} 7 & -3 & -3 \\ -1 & 1 & 0 \\ -1 & 0 & 1 \end{bmatrix}$.

**Example 25:** If $A = \begin{bmatrix} 2 & 3 \\ 1 & 4 \end{bmatrix}$ and $B = \begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix}$, then verify that $(AB)^{-1} = B^{-1} A^{-1}$.

**Solution:** We have $AB = \begin{bmatrix} 2 & 3 \\ 1 & 4 \end{bmatrix} \begin{bmatrix} 1 & 2 \\ -1 & 3 \end{bmatrix} = \begin{bmatrix} -1 & 13 \\ -3 & 14 \end{bmatrix}$. Since $|AB| = -1 \neq 0$, $(AB)^{-1}$ exists and is given by $(AB)^{-1} = \frac{1}{|AB|} \text{adj}(AB) = \frac{1}{-1} \begin{bmatrix} 14 & -13 \\ 3 & -1 \end{bmatrix} = \begin{bmatrix} -14 & 13 \\ -3 & 1 \end{bmatrix}$. Further, $|A| = 5 \neq 0$ and $|B| = 5 \neq 0$. Therefore, $A^{-1}$ and $B^{-1}$ both exist.
