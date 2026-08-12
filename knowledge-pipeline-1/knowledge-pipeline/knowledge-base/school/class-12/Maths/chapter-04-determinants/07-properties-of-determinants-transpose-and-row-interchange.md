---
type: concept
title: 'Properties of Determinants: Transpose and Row Interchange'
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- determinants
- matrix-properties
- row-interchange
- Maths
- transpose
- linear-algebra
---

Expanding $\Delta_1$ along first column, we get
$\Delta_1 = a_1 (b_2 c_3 – c_2 b_3) – a_2 (b_1 c_3 – b_3 c_1) + a_3 (b_1 c_2 – b_2 c_1)$
Hence $\Delta = \Delta_1$

**Remark:** It follows from above property that if $A$ is a square matrix, then $\det(A) = \det(A')$, where $A' = \text{transpose of } A$.

**Note:** If $R_i = i^{th}$ row and $C_i = i^{th}$ column, then for interchange of row and columns, we will symbolically write $C_i \leftrightarrow R_i$.

Let us verify the above property by example.

**Example 6:** Verify Property 1 for $\Delta = \begin{vmatrix} 2 & -3 & 5 \\ 6 & 0 & 4 \\ 1 & 5 & -7 \end{vmatrix}$

**Solution:** Expanding the determinant along first row, we have
$\Delta = 2 \begin{vmatrix} 0 & 4 \\ 5 & -7 \end{vmatrix} - (-3) \begin{vmatrix} 6 & 4 \\ 1 & -7 \end{vmatrix} + 5 \begin{vmatrix} 6 & 0 \\ 1 & 5 \end{vmatrix}$
$= 2 (0 – 20) + 3 (– 42 – 4) + 5 (30 – 0)$
$= – 40 – 138 + 150 = – 28$

By interchanging rows and columns, we get
$\Delta_1 = \begin{vmatrix} 2 & 6 & 1 \\ -3 & 0 & 5 \\ 5 & 4 & -7 \end{vmatrix}$
(Expanding along first column)
$= 2 \begin{vmatrix} 0 & 5 \\ 4 & -7 \end{vmatrix} - (-3) \begin{vmatrix} 6 & 1 \\ 4 & -7 \end{vmatrix} + 5 \begin{vmatrix} 6 & 1 \\ 0 & 5 \end{vmatrix}$
$= 2 (0 – 20) + 3 (– 42 – 4) + 5 (30 – 0)$
$= – 40 – 138 + 150 = – 28$
Clearly $\Delta = \Delta_1$. Hence, Property 1 is verified.

**Property 2:** If any two rows (or columns) of a determinant are interchanged, then sign of determinant changes.

**Verification:** Let $\Delta = \begin{vmatrix} a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \\ c_1 & c_2 & c_3 \end{vmatrix}$
Expanding along first row, we get
$\Delta = a_1 (b_2 c_3 – b_3 c_2) – a_2 (b_1 c_3 – b_3 c_1) + a_3 (b_1 c_2 – b_2 c_1)$
Interchanging first and third rows, the new determinant obtained is given by
$\Delta_1 = \begin{vmatrix} c_1 & c_2 & c_3 \\ b_1 & b_2 & b_3 \\ a_1 & a_2 & a_3 \end{vmatrix}$
Expanding along third row, we get
$\Delta_1 = a_1 (c_2 b_3 – b_2 c_3) – a_2 (c_1 b_3 – c_3 b_1) + a_3 (b_2 c_1 – b_1 c_2)$
$= – [ a_1 (b_2 c_3 – b_3 c_2) – a_2 (b_1 c_3 – b_3 c_1) + a_3 (b_1 c_2 – b_2 c_1)]$
Clearly $\Delta_1 = – \Delta$. Similarly, we can verify the result by interchanging any two columns.

**Note:** We can denote the interchange of rows by $R_i \leftrightarrow R_j$ and interchange of columns by $C_i \leftrightarrow C_j$.

**Example 7:** Verify Property 2 for $\Delta = \begin{vmatrix} 2 & -3 & 5 \\ 6 & 0 & 4 \\ 1 & 5 & -7 \end{vmatrix}$.

**Solution:** $\Delta = \begin{vmatrix} 2 & -3 & 5 \\ 6 & 0 & 4 \\ 1 & 5 & -7 \end{vmatrix} = – 28$ (See Example 6)
Interchanging rows $R_2$ and $R_3$ i.e., $R_2 \leftrightarrow R_3$, we have
$\Delta_1 = \begin{vmatrix} 2 & -3 & 5 \\ 1 & 5 & -7 \\ 6 & 0 & 4 \end{vmatrix}$
Expanding the determinant $\Delta_1$ along first row, we have
$\Delta_1 = 2 \begin{vmatrix} 5 & -7 \\ 0 & 4 \end{vmatrix} - (-3) \begin{vmatrix} 1 & -7 \\ 6 & 4 \end{vmatrix} + 5 \begin{vmatrix} 1 & 5 \\ 6 & 0 \end{vmatrix}$
$= 2 (20 – 0) + 3 (4 + 42) + 5 (0 – 30)$
$= 40 + 138 – 150 = 28$
