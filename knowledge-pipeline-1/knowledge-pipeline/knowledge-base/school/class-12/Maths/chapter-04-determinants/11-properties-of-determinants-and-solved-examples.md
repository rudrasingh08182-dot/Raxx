---
type: concept
title: Properties of Determinants and Solved Examples
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: solved-example
tags:
- DETERMINANTS
- class12
- matrix-algebra
- row-operations
- mathematics
- determinants
- Maths
- column-operations
---

### DETERMINANTS

Now, again
$\Delta_1 = \begin{vmatrix} a & a & a \\ b & b & b \\ c & c & c \end{vmatrix} + \begin{vmatrix} k_1c & k_2c & k_3c \\ b & b & b \\ c & c & c \end{vmatrix}$ (Using Property 5)
$= \Delta + 0$ (since $R_1$ and $R_3$ are proportional)
Hence $\Delta = \Delta_1$

**Remarks**
(i) If $\Delta_1$ is the determinant obtained by applying $R_i \to kR_i$ or $C_i \to kC_i$ to the determinant $\Delta$, then $\Delta_1 = k\Delta$.
(ii) If more than one operation like $R_i \to R_i + kR_j$ is done in one step, care should be taken to see that a row that is affected in one operation should not be used in another operation. A similar remark applies to column operations.

**Example 11** Prove that $\begin{vmatrix} a & a+b & a+b+c \\ 2a & 3a+2b & 4a+3b+2c \\ 3a & 6a+3b & 10a+6b+3c \end{vmatrix} = a^3$.

**Solution** Applying operations $R_2 \to R_2 - 2R_1$ and $R_3 \to R_3 - 3R_1$ to the given determinant $\Delta$, we have
$\Delta = \begin{vmatrix} a & a+b & a+b+c \\ 0 & a & 2a+b \\ 0 & 3a+3b & 7a+3b \end{vmatrix}$
Now applying $R_3 \to R_3 - 3R_2$, we get
$\Delta = \begin{vmatrix} a & a+b & a+b+c \\ 0 & a & 2a+b \\ 0 & 0 & a \end{vmatrix}$
Expanding along $C_1$, we obtain
$\Delta = a(a^2 - 0) + 0 + 0 = a(a^2) = a^3$.

**Example 12** Without expanding, prove that $\Delta = \begin{vmatrix} 1 & 1 & 1 \\ x & y & z \\ x+y & y+z & z+x \end{vmatrix} = 0$.

**Solution** Applying $R_1 \to R_1 + R_2$ to $\Delta$, we get
$\Delta = \begin{vmatrix} x+y & y+z & z+x \\ x & y & z \\ x+y & y+z & z+x \end{vmatrix}$
Since the elements of $R_1$ and $R_3$ are proportional, $\Delta = 0$.

**Example 13** Evaluate $\Delta = \begin{vmatrix} 1 & a & bc \\ 1 & b & ca \\ 1 & c & ab \end{vmatrix}$.

**Solution** Applying $R_2 \to R_2 - R_1$ and $R_3 \to R_3 - R_1$, we get
$\Delta = \begin{vmatrix} 1 & a & bc \\ 0 & b-a & c(a-b) \\ 0 & c-a & b(a-c) \end{vmatrix}$
Taking factors $(b-a)$ and $(c-a)$ common from $R_2$ and $R_3$, respectively, we get
$\Delta = (b-a)(c-a) \begin{vmatrix} 1 & a & bc \\ 0 & 1 & -c \\ 0 & 1 & -b \end{vmatrix} = (b-a)(c-a)[(-b+c)]$ (Expanding along first column)
$= (a-b)(b-c)(c-a)$.

**Example 14** Prove that $\begin{vmatrix} a & a+b & a+b+c \\ 2a & 3a+2b & 4a+3b+2c \\ 3a & 6a+3b & 10a+6b+3c \end{vmatrix} = a^3$ (Note: The text provided for Example 14 appears truncated in the source).

**Solution** Let $\Delta = \begin{vmatrix} a & a+b & a+b+c \\ 2a & 3a+2b & 4a+3b+2c \\ 3a & 6a+3b & 10a+6b+3c \end{vmatrix}$.
