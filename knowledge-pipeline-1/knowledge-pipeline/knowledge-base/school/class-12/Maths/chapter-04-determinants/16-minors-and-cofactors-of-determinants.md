---
type: concept
title: Minors and Cofactors of Determinants
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- cofactors
- mathematics
- determinants
- minors
- Maths
- linear-algebra
---

124 MATHEMATICS

$M_{22}$ = Minor of the element $a_{22} = 1$

Now, cofactor of $a_{ij}$ is $A_{ij}$. So
$A_{11} = (-1)^{1+1} M_{11} = (-1)^2 (3) = 3$
$A_{12} = (-1)^{1+2} M_{12} = (-1)^3 (4) = -4$
$A_{21} = (-1)^{2+1} M_{21} = (-1)^3 (-2) = 2$
$A_{22} = (-1)^{2+2} M_{22} = (-1)^4 (1) = 1$

**Example 21** Find minors and cofactors of the elements $a_{11}, a_{21}$ in the determinant

$\Delta = \begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{vmatrix}$

**Solution** By definition of minors and cofactors, we have

Minor of $a_{11} = M_{11} = \begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix} = a_{22} a_{33} - a_{23} a_{32}$

Cofactor of $a_{11} = A_{11} = (-1)^{1+1} M_{11} = a_{22} a_{33} - a_{23} a_{32}$

Minor of $a_{21} = M_{21} = \begin{vmatrix} a_{12} & a_{13} \\ a_{32} & a_{33} \end{vmatrix} = a_{12} a_{33} - a_{13} a_{32}$

Cofactor of $a_{21} = A_{21} = (-1)^{2+1} M_{21} = (-1) (a_{12} a_{33} - a_{13} a_{32}) = -a_{12} a_{33} + a_{13} a_{32}$

**Remark** Expanding the determinant $\Delta$, in Example 21, along $R_1$, we have

$\Delta = (-1)^{1+1} a_{11} \begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix} + (-1)^{1+2} a_{12} \begin{vmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{vmatrix} + (-1)^{1+3} a_{13} \begin{vmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{vmatrix}$

$= a_{11} A_{11} + a_{12} A_{12} + a_{13} A_{13}$, where $A_{ij}$ is cofactor of $a_{ij}$

$= \text{sum of product of elements of } R_1 \text{ with their corresponding cofactors}$

Similarly, $\Delta$ can be calculated by other five ways of expansion that is along $R_2, R_3, C_1, C_2$ and $C_3$.

Hence $\Delta = \text{sum of the product of elements of any row (or column) with their corresponding cofactors.}$

**Note** If elements of a row (or column) are multiplied with cofactors of any other row (or column), then their sum is zero. For example,
