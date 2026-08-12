---
type: concept
title: 'Properties of Determinants: Expansion and Operations'
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

Expanding the determinants along the first row, we get:

$\Delta = (a_1 + \lambda_1) (b_2 c_3 – c_2 b_3) – (a_2 + \lambda_2) (b_1 c_3 – b_3 c_1) + (a_3 + \lambda_3) (b_1 c_2 – b_2 c_1)$

$= a_1 (b_2 c_3 – c_2 b_3) – a_2 (b_1 c_3 – b_3 c_1) + a_3 (b_1 c_2 – b_2 c_1) + \lambda_1 (b_2 c_3 – c_2 b_3) – \lambda_2 (b_1 c_3 – b_3 c_1) + \lambda_3 (b_1 c_2 – b_2 c_1)$

(by rearranging terms)

$= \begin{vmatrix} a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \\ c_1 & c_2 & c_3 \end{vmatrix} + \begin{vmatrix} \lambda_1 & \lambda_2 & \lambda_3 \\ b_1 & b_2 & b_3 \\ c_1 & c_2 & c_3 \end{vmatrix} = R.H.S.$

Similarly, we may verify Property 5 for other rows or columns.

**Example 10:** Show that $\begin{vmatrix} a & b & c \\ a+x & b+y & c+z \\ x & y & z \end{vmatrix} = 0$

**Solution:** We have $\begin{vmatrix} a & b & c \\ a+x & b+y & c+z \\ x & y & z \end{vmatrix} = \begin{vmatrix} a & b & c \\ a & b & c \\ x & y & z \end{vmatrix} + \begin{vmatrix} a & b & c \\ x & y & z \\ x & y & z \end{vmatrix}$ (by Property 5)

$= 0 + 0 = 0$ (Using Property 3 and Property 4)

**Property 6:** If, to each element of any row or column of a determinant, the equimultiples of corresponding elements of other row (or column) are added, then value of determinant remains the same, i.e., the value of determinant remain same if we apply the operation $R_i \to R_i + kR_j$ or $C_i \to C_i + kC_j$.

**Verification:**
Let $\Delta = \begin{vmatrix} a_1 & a_2 & a_3 \\ b_1 & b_2 & b_3 \\ c_1 & c_2 & c_3 \end{vmatrix}$ and $\Delta_1 = \begin{vmatrix} a_1+kc_1 & a_2+kc_2 & a_3+kc_3 \\ b_1 & b_2 & b_3 \\ c_1 & c_2 & c_3 \end{vmatrix}$, where $\Delta_1$ is obtained by the operation $R_1 \to R_1 + kR_3$.

Here, we have multiplied the elements of the third row ($R_3$) by a constant $k$ and added them to the corresponding elements of the first row ($R_1$). Symbolically, we write this operation as $R_1 \to R_1 + kR_3$.
