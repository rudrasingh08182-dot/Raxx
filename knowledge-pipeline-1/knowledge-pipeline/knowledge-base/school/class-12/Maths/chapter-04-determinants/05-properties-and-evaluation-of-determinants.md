---
type: concept
title: Properties and Evaluation of Determinants
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- matrix-algebra
- mathematics
- determinants
- Maths
- linear-algebra
---

DETERMINANTS 107

$|A| = a_{11} a_{22} a_{33} - a_{11} a_{23} a_{32} - a_{21} a_{12} a_{33} + a_{21} a_{13} a_{32} + a_{31} a_{12} a_{23} - a_{31} a_{13} a_{22}$
$= a_{11} a_{22} a_{33} - a_{11} a_{23} a_{32} - a_{12} a_{21} a_{33} + a_{12} a_{23} a_{31} + a_{13} a_{21} a_{32} - a_{13} a_{31} a_{22} ... (3)$

Clearly, values of $|A|$ in (1), (2) and (3) are equal. It is left as an exercise to the reader to verify that the values of $|A|$ by expanding along $R_3$, $C_2$ and $C_3$ are equal to the value of $|A|$ obtained in (1), (2) or (3).

Hence, expanding a determinant along any row or column gives same value.

**Remarks**
(i) For easier calculations, we shall expand the determinant along that row or column which contains maximum number of zeros.
(ii) While expanding, instead of multiplying by $(-1)^{i+j}$, we can multiply by $+1$ or $-1$ according as $(i + j)$ is even or odd.
(iii) Let $A = \begin{bmatrix} 2 & 2 \\ 4 & 0 \end{bmatrix}$ and $B = \begin{bmatrix} 1 & 1 \\ 2 & 0 \end{bmatrix}$. Then, it is easy to verify that $A = 2B$. Also $|A| = 0 - 8 = -8$ and $|B| = 0 - 2 = -2$.
Observe that, $|A| = 4(-2) = 2^2|B|$ or $|A| = 2^n|B|$, where $n = 2$ is the order of square matrices $A$ and $B$.
In general, if $A = kB$ where $A$ and $B$ are square matrices of order $n$, then $|A| = k^n |B|$, where $n = 1, 2, 3$.

**Example 3** Evaluate the determinant $\Delta = \begin{vmatrix} 1 & 2 & 4 \\ -1 & 3 & 0 \\ 4 & 1 & 0 \end{vmatrix}$.
**Solution** Note that in the third column, two entries are zero. So expanding along third column ($C_3$), we get
$\Delta = 4 \begin{vmatrix} -1 & 3 \\ 4 & 1 \end{vmatrix} - 0 + 0 = 4(-1 - 12) = -52$

**Example 4** Evaluate $\Delta = \begin{vmatrix} 0 & \sin \alpha & -\cos \alpha \\ -\sin \alpha & 0 & \sin \beta \\ \cos \alpha & -\sin \beta & 0 \end{vmatrix}$.
