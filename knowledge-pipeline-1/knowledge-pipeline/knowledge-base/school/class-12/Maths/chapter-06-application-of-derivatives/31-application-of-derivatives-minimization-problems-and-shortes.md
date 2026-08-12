---
type: concept
title: 'Application of Derivatives: Minimization Problems and Shortest Distance'
category: school
subject: Maths
level: class-12
chapter: 6
chapter_name: APPLICATION OF DERIVATIVES
content_type: solved-example
tags:
- optimization-problems
- APPLICATION OF DERIVATIVES
- second-derivative-test
- application-of-derivatives
- class12
- local-minima
- calculus
- Maths
---

APPLICATION OF DERIVATIVES 225

$S(x) = x^2 + (15 - x)^2 = 2x^2 - 30x + 225$

$S'(x) = 4x - 30$
$S''(x) = 4$

Now $S'(x) = 0$ gives $x = \frac{15}{2}$. Also $S''(\frac{15}{2}) = 4 > 0$. Therefore, by second derivative test, $x = \frac{15}{2}$ is the point of local minima of $S$. Hence the sum of squares of numbers is minimum when the numbers are $\frac{15}{2}$ and $15 - \frac{15}{2} = \frac{15}{2}$.

Remark: Proceeding as in Example 34 one may prove that the two positive numbers, whose sum is $k$ and the sum of whose squares is minimum, are $\frac{k}{2}$ and $\frac{k}{2}$.

Example 35: Find the shortest distance of the point $(0, c)$ from the parabola $y = x^2$, where $\frac{1}{2} \le c \le 5$.

Solution: Let $(h, k)$ be any point on the parabola $y = x^2$. Let $D$ be the required distance between $(h, k)$ and $(0, c)$. Then

$D^2 = (h - 0)^2 + (k - c)^2 = h^2 + (k - c)^2$ ... (1)

Since $(h, k)$ lies on the parabola $y = x^2$, we have $k = h^2$. So (1) gives

$D^2 = D(k) = k + (k - c)^2$

or $D'(k) = 1 + 2(k - c)$

Now $D'(k) = 0$ gives $k = c - \frac{1}{2}$.

Observe that when $k < c - \frac{1}{2}$, then $2(k - c) + 1 < 0$, i.e., $D'(k) < 0$. Also when $k > c - \frac{1}{2}$, then $D'(k) > 0$. So, by first derivative test, $D(k)$ is minimum at $k = c - \frac{1}{2}$.
