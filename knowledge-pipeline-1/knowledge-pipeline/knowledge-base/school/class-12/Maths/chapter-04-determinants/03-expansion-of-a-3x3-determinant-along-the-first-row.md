---
type: concept
title: Expansion of a 3x3 Determinant Along the First Row
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- matrix-theory
- mathematics
- determinants
- Maths
- linear-algebra
---

DETERMINANTS 105

Corresponding to each of three rows ($R_1, R_2$ and $R_3$) and three columns ($C_1, C_2$ and $C_3$) giving the same value as shown below.

Consider the determinant of square matrix $A = [a_{ij}]_{3 \times 3}$, i.e.,

$|A| = \begin{vmatrix} a_{11} & a_{12} & a_{13} \\ a_{21} & a_{22} & a_{23} \\ a_{31} & a_{32} & a_{33} \end{vmatrix}$

**Expansion along first Row ($R_1$)**

**Step 1:** Multiply first element $a_{11}$ of $R_1$ by $(-1)^{(1+1)}$ $[(-1)^{\text{sum of suffixes in } a_{11}}]$ and with the second order determinant obtained by deleting the elements of first row ($R_1$) and first column ($C_1$) of $|A|$ as $a_{11}$ lies in $R_1$ and $C_1$, i.e., $(-1)^{1+1} a_{11} \begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix}$

**Step 2:** Multiply 2nd element $a_{12}$ of $R_1$ by $(-1)^{1+2}$ $[(-1)^{\text{sum of suffixes in } a_{12}}]$ and the second order determinant obtained by deleting elements of first row ($R_1$) and 2nd column ($C_2$) of $|A|$ as $a_{12}$ lies in $R_1$ and $C_2$, i.e., $(-1)^{1+2} a_{12} \begin{vmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{vmatrix}$

**Step 3:** Multiply third element $a_{13}$ of $R_1$ by $(-1)^{1+3}$ $[(-1)^{\text{sum of suffixes in } a_{13}}]$ and the second order determinant obtained by deleting elements of first row ($R_1$) and third column ($C_3$) of $|A|$ as $a_{13}$ lies in $R_1$ and $C_3$, i.e., $(-1)^{1+3} a_{13} \begin{vmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{vmatrix}$

**Step 4:** Now the expansion of determinant of $A$, that is, $|A|$ written as sum of all three terms obtained in steps 1, 2 and 3 above is given by:

$|A| = (-1)^{1+1} a_{11} \begin{vmatrix} a_{22} & a_{23} \\ a_{32} & a_{33} \end{vmatrix} + (-1)^{1+2} a_{12} \begin{vmatrix} a_{21} & a_{23} \\ a_{31} & a_{33} \end{vmatrix} + (-1)^{1+3} a_{13} \begin{vmatrix} a_{21} & a_{22} \\ a_{31} & a_{32} \end{vmatrix}$

or $|A| = a_{11} (a_{22} a_{33} - a_{32} a_{23}) - a_{12} (a_{21} a_{33} - a_{31} a_{23}) + a_{13} (a_{21} a_{32} - a_{31} a_{22})$
