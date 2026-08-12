---
type: concept
title: Discussion on Continuity of Piecewise Functions
category: school
subject: Maths
level: class-12
chapter: 5
chapter_name: CONTINUITY AND DIFFERENTIABILITY
content_type: solved-example
tags:
- mathematics
- real-analysis
- piecewise-functions
- calculus
- Maths
- continuity
- class12
- CONTINUITY AND DIFFERENTIABILITY
---

### Example 12
Discuss the continuity of the function defined by:
$f(x) = \begin{cases} x + 2, & \text{if } x < 0 \\ -x + 2, & \text{if } x > 0 \end{cases}$

**Solution:**
Observe that the function is defined at all real numbers except at 0. Domain of definition of this function is $D_1 \cup D_2$ where $D_1 = \{x \in \mathbb{R} : x < 0\}$ and $D_2 = \{x \in \mathbb{R} : x > 0\}$.

**Case 1:** If $c \in D_1$, then $\lim_{x \to c} f(x) = \lim_{x \to c} (x + 2) = c + 2 = f(c)$ and hence $f$ is continuous in $D_1$.

**Case 2:** If $c \in D_2$, then $\lim_{x \to c} f(x) = \lim_{x \to c} (-x + 2) = -c + 2 = f(c)$ and hence $f$ is continuous in $D_2$.

Since $f$ is continuous at all points in the domain of $f$, we deduce that $f$ is continuous. Graph of this function is given in the Fig 5.6. Note that to graph this function we need to lift the pen from the plane of the paper, but we need to do that only for those points where the function is not defined.

### Example 13
Discuss the continuity of the function $f$ given by:
$f(x) = \begin{cases} x^2, & \text{if } x \ge 0 \\ x, & \text{if } x < 0 \end{cases}$

**Solution:**
Clearly the function is defined at every real number. Graph of the function is given in Fig 5.7. By inspection, it seems prudent to partition the domain of definition of $f$ into three disjoint subsets of the real line.
Let $D_1 = \{x \in \mathbb{R} : x < 0\}$, $D_2 = \{0\}$ and $D_3 = \{x \in \mathbb{R} : x > 0\}$.

**Case 1:** At any point in $D_1$, we have $f(x) = x^2$ and it is easy to see that it is continuous there (see Example 2).

**Case 2:** At any point in $D_3$, we have $f(x) = x$ and it is easy to see that it is continuous there (see Example 6).

| Figure | Description |
| :--- | :--- |
| Fig 5.6 | Graph for Example 12 |
| Fig 5.7 | Graph for Example 13 |
