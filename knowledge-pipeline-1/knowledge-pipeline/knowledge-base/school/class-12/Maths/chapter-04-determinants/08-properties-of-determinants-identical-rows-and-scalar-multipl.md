---
type: concept
title: 'Properties of Determinants: Identical Rows and Scalar Multiplication'
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- mathematics
- determinants
- matrix-properties
- Maths
- linear-algebra
---

### Property 3
If any two rows (or columns) of a determinant are identical (all corresponding elements are same), then the value of the determinant is zero.

**Proof:** If we interchange the identical rows (or columns) of the determinant $\Delta$, then $\Delta$ does not change. However, by Property 2, it follows that $\Delta$ has changed its sign. Therefore, $\Delta = -\Delta$, or $\Delta = 0$.

Let us verify the above property by an example.

**Example 8:** Evaluate $\Delta = \begin{vmatrix} 3 & 2 & 3 \\ 2 & 2 & 3 \\ 3 & 2 & 3 \end{vmatrix}$

**Solution:** Expanding along the first row, we get:
$\Delta = 3(6 - 6) - 2(6 - 9) + 3(4 - 6)$
$= 0 - 2(-3) + 3(-2) = 6 - 6 = 0$
Here $R_1$ and $R_3$ are identical.

### Property 4
If each element of a row (or a column) of a determinant is multiplied by a constant $k$, then its value gets multiplied by $k$.

**Verification:** Let $\Delta = \begin{vmatrix} a_1 & b_1 & c_1 \\ a_2 & b_2 & c_2 \\ a_3 & b_3 & c_3 \end{vmatrix}$ and $\Delta_1$ be the determinant obtained by multiplying the elements of the first row by $k$. Then:

$\Delta_1 = \begin{vmatrix} ka_1 & kb_1 & kc_1 \\ a_2 & b_2 & c_2 \\ a_3 & b_3 & c_3 \end{vmatrix}$

Expanding along the first row, we get:
$\Delta_1 = ka_1(b_2c_3 - b_3c_2) - kb_1(a_2c_3 - c_2a_3) + kc_1(a_2b_3 - b_2a_3)$
$= k[a_1(b_2c_3 - b_3c_2) - b_1(a_2c_3 - c_2a_3) + c_1(a_2b_3 - b_2a_3)]$
$= k\Delta$
