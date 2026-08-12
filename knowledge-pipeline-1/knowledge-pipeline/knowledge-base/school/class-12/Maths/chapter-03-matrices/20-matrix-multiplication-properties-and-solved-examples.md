---
type: concept
title: Matrix Multiplication Properties and Solved Examples
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: solved-example
tags:
- matrices
- distributive-property
- matrix-multiplication
- linear-algebra
- MATRICES
- Maths
- associative-property
- class12
---

### Matrices

**Solution:** We have

$AB = \begin{bmatrix} 1 & 1 & 1 \\ 2 & 0 & 3 \\ 3 & 1 & 2 \end{bmatrix} \begin{bmatrix} 1 & 3 & 2 \\ 0 & 1 & 3 \\ 1 & 4 & 2 \end{bmatrix} = \begin{bmatrix} 2 & 8 & 7 \\ 5 & 18 & 10 \\ 5 & 18 & 13 \end{bmatrix}$

$(AB)C = \begin{bmatrix} 2 & 8 & 7 \\ 5 & 18 & 10 \\ 5 & 18 & 13 \end{bmatrix} \begin{bmatrix} 1 & 2 & 3 \\ 4 & 1 & 1 \\ 3 & 1 & 2 \end{bmatrix} = \begin{bmatrix} 55 & 19 & 28 \\ 107 & 38 & 53 \\ 116 & 41 & 59 \end{bmatrix}$

Now $BC = \begin{bmatrix} 1 & 3 & 2 \\ 0 & 1 & 3 \\ 1 & 4 & 2 \end{bmatrix} \begin{bmatrix} 1 & 2 & 3 \\ 4 & 1 & 1 \\ 3 & 1 & 2 \end{bmatrix} = \begin{bmatrix} 19 & 7 & 10 \\ 13 & 4 & 7 \\ 23 & 8 & 11 \end{bmatrix}$

Therefore $A(BC) = \begin{bmatrix} 1 & 1 & 1 \\ 2 & 0 & 3 \\ 3 & 1 & 2 \end{bmatrix} \begin{bmatrix} 19 & 7 & 10 \\ 13 & 4 & 7 \\ 23 & 8 & 11 \end{bmatrix} = \begin{bmatrix} 55 & 19 & 28 \\ 107 & 38 & 53 \\ 116 & 41 & 59 \end{bmatrix}$

Clearly, $(AB)C = A(BC)$.

---

**Example 17:** If $A = \begin{bmatrix} 0 & 6 & 7 \\ -6 & 0 & 8 \\ 7 & -8 & 0 \end{bmatrix}$, $B = \begin{bmatrix} 0 & 1 & 1 \\ 1 & 0 & 2 \\ 1 & -2 & 0 \end{bmatrix}$, $C = \begin{bmatrix} 2 \\ -2 \\ 3 \end{bmatrix}$. Calculate $AC$, $BC$ and $(A + B)C$. Also, verify that $(A + B)C = AC + BC$.

**Solution:** Now, $A + B = \begin{bmatrix} 0 & 7 & 8 \\ -5 & 0 & 10 \\ 8 & -10 & 0 \end{bmatrix}$

So $(A + B)C = \begin{bmatrix} 0 & 7 & 8 \\ -5 & 0 & 10 \\ 8 & -10 & 0 \end{bmatrix} \begin{bmatrix} 2 \\ -2 \\ 3 \end{bmatrix} = \begin{bmatrix} 0-14+24 \\ -10+0+30 \\ 16+20+0 \end{bmatrix} = \begin{bmatrix} 10 \\ 20 \\ 36 \end{bmatrix}$

Further $AC = \begin{bmatrix} 0 & 6 & 7 \\ -6 & 0 & 8 \\ 7 & -8 & 0 \end{bmatrix} \begin{bmatrix} 2 \\ -2 \\ 3 \end{bmatrix} = \begin{bmatrix} 0-12+21 \\ -12+0+24 \\ 14+16+0 \end{bmatrix} = \begin{bmatrix} 9 \\ 12 \\ 30 \end{bmatrix}$

And $BC = \begin{bmatrix} 0 & 1 & 1 \\ 1 & 0 & 2 \\ 1 & -2 & 0 \end{bmatrix} \begin{bmatrix} 2 \\ -2 \\ 3 \end{bmatrix} = \begin{bmatrix} 0-2+3 \\ 2+0+6 \\ 2+4+0 \end{bmatrix} = \begin{bmatrix} 1 \\ 8 \\ 6 \end{bmatrix}$

So $AC + BC = \begin{bmatrix} 9 \\ 12 \\ 30 \end{bmatrix} + \begin{bmatrix} 1 \\ 8 \\ 6 \end{bmatrix} = \begin{bmatrix} 10 \\ 20 \\ 36 \end{bmatrix}$

Clearly, $(A + B)C = AC + BC$.

---

**Example 18:** If $A = \begin{bmatrix} 1 & 2 & 3 \\ 3 & -2 & 1 \\ 4 & 2 & 1 \end{bmatrix}$, then show that $A^3 - 23A - 40I = O$.

**Solution:** We have $A^2 = A \cdot A = \begin{bmatrix} 1 & 2 & 3 \\ 3 & -2 & 1 \\ 4 & 2 & 1 \end{bmatrix} \begin{bmatrix} 1 & 2 & 3 \\ 3 & -2 & 1 \\ 4 & 2 & 1 \end{bmatrix} = \begin{bmatrix} 19 & 4 & 8 \\ 1 & 12 & 8 \\ 14 & 6 & 15 \end{bmatrix}$
