---
type: concept
title: 'Determinants: Properties and Exercise 4.2 Problems'
category: school
subject: Maths
level: class-12
chapter: 4
chapter_name: DETERMINANTS
content_type: practice-question
tags:
- DETERMINANTS
- class12
- mathematics
- determinants
- exercise-4.2
- matrix-properties
- algebra
- Maths
---

DETERMINANTS 119

$\Delta = \begin{vmatrix} 1 & 1 & 1 \\ a & b & c \\ bc & ca & ab \end{vmatrix} = (1+abc) \begin{vmatrix} 1 & 1 & 1 \\ a & b & c \\ a^2 & b^2 & c^2 \end{vmatrix}$

Now applying $C_2 \to C_2 - C_1$, $C_3 \to C_3 - C_1$, we get

$\Delta = \begin{vmatrix} 1 & 0 & 0 \\ a & b-a & c-a \\ bc & ca-bc & ab-bc \end{vmatrix} = (b-a)(c-a) \begin{vmatrix} 1 & 0 & 0 \\ a & 1 & 1 \\ bc & -c & -b \end{vmatrix}$

$= (b-a)(c-a)(-b+c) = (a-b)(b-c)(c-a)$

Note: Alternately try by applying $C_1 \to C_1 - C_2$ and $C_3 \to C_3 - C_2$, then apply $C_1 \to C_1 - a C_3$.

### EXERCISE 4.2

Using the property of determinants and without expanding in Exercises 1 to 7, prove that:

1. $\begin{vmatrix} x & a & x+a \\ y & b & y+b \\ z & c & z+c \end{vmatrix} = 0$

2. $\begin{vmatrix} a-b & b-c & c-a \\ b-c & c-a & a-b \\ c-a & a-b & b-c \end{vmatrix} = 0$

3. $\begin{vmatrix} 2 & 7 & 65 \\ 3 & 8 & 75 \\ 5 & 9 & 86 \end{vmatrix} = 0$

4. $\begin{vmatrix} 1 & bc & a(b+c) \\ 1 & ca & b(c+a) \\ 1 & ab & c(a+b) \end{vmatrix} = 0$

5. $\begin{vmatrix} b+c & q+r & y+z \\ c+a & r+p & z+x \\ a+b & p+q & x+y \end{vmatrix} = 2 \begin{vmatrix} a & p & x \\ b & q & y \\ c & r & z \end{vmatrix}$

120 MATHEMATICS

6. $\begin{vmatrix} 0 & a & -b \\ -a & 0 & -c \\ b & c & 0 \end{vmatrix} = 0$

7. $\begin{vmatrix} -a^2 & ab & ac \\ ba & -b^2 & bc \\ ca & cb & -c^2 \end{vmatrix} = 4a^2b^2c^2$

By using properties of determinants, in Exercises 8 to 14, show that:

8. (i) $\begin{vmatrix} 1 & a & a^2 \\ 1 & b & b^2 \\ 1 & c & c^2 \end{vmatrix} = (a-b)(b-c)(c-a)$

(ii) $\begin{vmatrix} 1 & 1 & 1 \\ a & b & c \\ a^3 & b^3 & c^3 \end{vmatrix} = (a-b)(b-c)(c-a)(a+b+c)$

9. $\begin{vmatrix} x & x^2 & yz \\ y & y^2 & zx \\ z & z^2 & xy \end{vmatrix} = (x-y)(y-z)(z-x)(xy+yz+zx)$

10. (i) $\begin{vmatrix} x+4 & 2x & 2x \\ 2x & x+4 & 2x \\ 2x & 2x & x+4 \end{vmatrix} = (5x+4)(4-x)^2$

(ii) $\begin{vmatrix} y+k & y & y \\ y & y+k & y \\ y & y & y+k \end{vmatrix} = k^2(3y+k)$

11. (i) $\begin{vmatrix} a-b-c & 2a & 2a \\ 2b & b-c-a & 2b \\ 2c & 2c & c-a-b \end{vmatrix} = (a+b+c)^3$

(ii) $\begin{vmatrix} x+y+2z & x & y \\ z & y+z+2x & y \\ z & x & z+x+2y \end{vmatrix} = 2(x+y+z)^3$
