---
type: concept
title: 'Determinants: Collinearity, Area, and Minors and Cofactors'
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- minors-and-cofactors
- mathematics
- determinants
- coordinate-geometry
- Maths
---

### DETERMINANTS 123

2. Show that points $A(a, b + c)$, $B(b, c + a)$, $C(c, a + b)$ are collinear.

3. Find values of $k$ if area of triangle is 4 sq. units and vertices are:
(i) $(k, 0), (4, 0), (0, 2)$
(ii) $(-2, 0), (0, 4), (0, k)$

4. (i) Find equation of line joining $(1, 2)$ and $(3, 6)$ using determinants.
(ii) Find equation of line joining $(3, 1)$ and $(9, 3)$ using determinants.

5. If area of triangle is 35 sq units with vertices $(2, -6), (5, 4)$ and $(k, 4)$. Then $k$ is:
(A) 12 (B) -2 (C) -12, -2 (D) 12, -2

#### 4.5 Minors and Cofactors
In this section, we will learn to write the expansion of a determinant in compact form using minors and cofactors.

**Definition 1:** Minor of an element $a_{ij}$ of a determinant is the determinant obtained by deleting its $i^{th}$ row and $j^{th}$ column in which element $a_{ij}$ lies. Minor of an element $a_{ij}$ is denoted by $M_{ij}$.

**Remark:** Minor of an element of a determinant of order $n (n \geq 2)$ is a determinant of order $n - 1$.

**Example 19:** Find the minor of element 6 in the determinant $\Delta = \begin{vmatrix} 1 & 2 & 3 \\ 4 & 5 & 6 \\ 7 & 8 & 9 \end{vmatrix}$

**Solution:** Since 6 lies in the second row and third column, its minor $M_{23}$ is given by $M_{23} = \begin{vmatrix} 1 & 2 \\ 7 & 8 \end{vmatrix} = 8 - 14 = -6$ (obtained by deleting $R_2$ and $C_3$ in $\Delta$).

**Definition 2:** Cofactor of an element $a_{ij}$, denoted by $A_{ij}$ is defined by $A_{ij} = (-1)^{i+j} M_{ij}$, where $M_{ij}$ is minor of $a_{ij}$.

**Example 20:** Find minors and cofactors of all the elements of the determinant $\begin{vmatrix} 1 & -2 \\ 4 & 3 \end{vmatrix}$

**Solution:** Minor of the element $a_{ij}$ is $M_{ij}$.
Here $a_{11} = 1$. So $M_{11} = \text{Minor of } a_{11} = 3$
$M_{12} = \text{Minor of the element } a_{12} = 4$
$M_{21} = \text{Minor of the element } a_{21} = -2$
