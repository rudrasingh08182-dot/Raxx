---
type: concept
title: Determinants, Area of Triangles, and Coordinate Geometry
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: concept
tags:
- DETERMINANTS
- class12
- area-of-triangle
- determinants
- mathematics
- linear-equations
- coordinate-geometry
- Maths
---

12. $\begin{vmatrix} x & x+1 \\ x-1 & x \end{vmatrix} = 1$

13. $\begin{vmatrix} a-b & ab & b^2 \\ ab & a^2 & b \\ b^2 & a & a^2-b^2 \end{vmatrix} = a^3+b^3$

14. $\begin{vmatrix} a^2+2a & 2a+1 & 1 \\ 2a+1 & a+2 & 1 \\ 3 & 3 & 1 \end{vmatrix} = (a-1)^3$

Choose the correct answer in Exercises 15 and 16.

15. Let A be a square matrix of order 3 × 3, then |kA| is equal to
(A) k|A| (B) k²|A| (C) k³|A| (D) 3k|A|

16. Which of the following is correct
(A) Determinant is a square matrix.
(B) Determinant is a number associated to a matrix.
(C) Determinant is a number associated to a square matrix.
(D) None of these

### 4.4 Area of a Triangle
In earlier classes, we have studied that the area of a triangle whose vertices are $(x_1, y_1)$, $(x_2, y_2)$ and $(x_3, y_3)$, is given by the expression $\frac{1}{2} [x_1(y_2– y_3) + x_2 ( y_3– y_1) + x_3 (y_1– y_2)]$. Now this expression can be written in the form of a determinant as:

$\Delta = \frac{1}{2} \begin{vmatrix} x_1 & y_1 & 1 \\ x_2 & y_2 & 1 \\ x_3 & y_3 & 1 \end{vmatrix}$ ... (1)

**Remarks**
(i) Since area is a positive quantity, we always take the absolute value of the determinant in (1).
(ii) If area is given, use both positive and negative values of the determinant for calculation.
(iii) The area of the triangle formed by three collinear points is zero.

**Example 17** Find the area of the triangle whose vertices are (3, 8), (–4, 2) and (5, 1).
**Solution** The area of triangle is given by
$\Delta = \frac{1}{2} \begin{vmatrix} 3 & 8 & 1 \\ -4 & 2 & 1 \\ 5 & 1 & 1 \end{vmatrix}$
$= \frac{1}{2} [3(2-1) - 8(-4-5) + 1(-4-10)]$
$= \frac{1}{2} [3(1) - 8(-9) + 1(-14)] = \frac{1}{2} [3 + 72 - 14] = \frac{61}{2}$

**Example 18** Find the equation of the line joining A(1, 3) and B(0, 0) using determinants and find k if D(k, 0) is a point such that area of triangle ABD is 3 sq units.
**Solution** Let P (x, y) be any point on AB. Then, area of triangle ABP is zero (Why?). So
$\frac{1}{2} \begin{vmatrix} x & y & 1 \\ 1 & 3 & 1 \\ 0 & 0 & 1 \end{vmatrix} = 0$
This gives $\frac{1}{2} [x(3-0) - y(1-0) + 1(0-0)] = 0$ or $3x - y = 0$ or $y = 3x$, which is the equation of required line AB.
Also, since the area of the triangle ABD is 3 sq. units, we have
$\frac{1}{2} \begin{vmatrix} k & 0 & 1 \\ 1 & 3 & 1 \\ 0 & 0 & 1 \end{vmatrix} = \pm 3$
This gives, $\frac{1}{2} [k(3-0) - 0 + 1(0-0)] = \pm 3$, i.e., $\frac{3k}{2} = \pm 3$, i.e., $k = \pm 2$.

### EXERCISE 4.3
1. Find area of the triangle with vertices at the point given in each of the following :
(i) (1, 0), (6, 0), (4, 3) 
(ii) (2, 7), (1, 1), (10, 8)
(iii) (–2, –3), (3, 2), (–1, –8)
