---
type: concept
title: Expansion of 3x3 Determinants Along Rows and Columns
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
- column-expansion
- row-expansion
- Maths
- linear-algebra
---

106 MATHEMATICS

$|A| = a_{11} a_{22} a_{33} - a_{11} a_{32} a_{23} - a_{12} a_{21} a_{33} + a_{12} a_{31} a_{23} + a_{13} a_{21} a_{32} - a_{13} a_{31} a_{22} ... (1)$

Note: We shall apply all four steps together.

**Expansion along second row ($R_2$)**

$|A| = \begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{vmatrix}$

Expanding along $R_2$, we get:

$|A| = (-1)^{2+1} a_{21} \begin{vmatrix} a_{12} & a_{13} \\ a_{32} & a_{33} \end{vmatrix} + (-1)^{2+2} a_{22} \begin{vmatrix} a_{11} & a_{13} \\ a_{31} & a_{33} \end{vmatrix} + (-1)^{2+3} a_{23} \begin{vmatrix} a_{11} & a_{12} \\ a_{31} & a_{32} \end{vmatrix}$

$= - a_{21} (a_{12} a_{33} - a_{32} a_{13}) + a_{22} (a_{11} a_{33} - a_{31} a_{13}) - a_{23} (a_{11} a_{32} - a_{31} a_{12})$

$|A| = - a_{21} a_{12} a_{33} + a_{21} a_{32} a_{13} + a_{22} a_{11} a_{33} - a_{22} a_{31} a_{13} - a_{23} a_{11} a_{32} + a_{23} a_{31} a_{12}$

$= a_{11} a_{22} a_{33} - a_{11} a_{23} a_{32} - a_{12} a_{21} a_{33} + a_{12} a_{23} a_{31} + a_{13} a_{21} a_{32} - a_{13} a_{31} a_{22} ... (2)$

**Expansion along first Column ($C_1$)**

$|A| = \begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{vmatrix}$

By expanding along $C_1$, we get:

$|A| = (-1)^{1+1} a_{11} \begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix} + (-1)^{2+1} a_{21} \begin{vmatrix} a_{12} & a_{13} \\ a_{32} & a_{33} \end{vmatrix} + (-1)^{3+1} a_{31} \begin{vmatrix} a_{12} & a_{13} \\ a_{22} & a_{23} \end{vmatrix}$

$= a_{11} (a_{22} a_{33} - a_{23} a_{32}) - a_{21} (a_{12} a_{33} - a_{13} a_{32}) + a_{31} (a_{12} a_{23} - a_{13} a_{22})$

2019-20
