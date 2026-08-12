---
type: concept
title: 'Invertible Functions: Definitions and Examples'
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- inverse-function
- relations-and-functions
- mathematics
- RELATIONS AND FUNCTIONS
- class12
- invertible-functions
- calculus-preliminaries
- Maths
---

### RELATIONS AND FUNCTIONS

**Definition 9** A function $f : X \to Y$ is defined to be invertible, if there exists a function $g : Y \to X$ such that $g \circ f = I_X$ and $f \circ g = I_Y$. The function $g$ is called the inverse of $f$ and is denoted by $f^{-1}$.

Thus, if $f$ is invertible, then $f$ must be one-one and onto and conversely, if $f$ is one-one and onto, then $f$ must be invertible. This fact significantly helps for proving a function $f$ to be invertible by showing that $f$ is one-one and onto, specially when the actual inverse of $f$ is not to be determined.

**Example 23** Let $f : N \to Y$ be a function defined as $f(x) = 4x + 3$, where, $Y = \{y \in N : y = 4x + 3 \text{ for some } x \in N\}$. Show that $f$ is invertible. Find the inverse.

**Solution** Consider an arbitrary element $y$ of $Y$. By the definition of $Y$, $y = 4x + 3$, for some $x$ in the domain $N$. This shows that $x = \frac{y - 3}{4}$. Define $g : Y \to N$ by $g(y) = \frac{y - 3}{4}$. Now, $g \circ f(x) = g(f(x)) = g(4x + 3) = \frac{(4x + 3) - 3}{4} = x$ and $f \circ g(y) = f(g(y)) = f\left(\frac{y - 3}{4}\right) = 4\left(\frac{y - 3}{4}\right) + 3 = y - 3 + 3 = y$. This shows that $g \circ f = I_N$ and $f \circ g = I_Y$, which implies that $f$ is invertible and $g$ is the inverse of $f$.

**Example 24** Let $Y = \{n^2 : n \in N\} \subset N$. Consider $f : N \to Y$ as $f(n) = n^2$. Show that $f$ is invertible. Find the inverse of $f$.

**Solution** An arbitrary element $y$ in $Y$ is of the form $n^2$, for some $n \in N$. This implies that $n = \sqrt{y}$. This gives a function $g : Y \to N$, defined by $g(y) = \sqrt{y}$. Now, $g \circ f(n) = g(n^2) = \sqrt{n^2} = n$ and $f \circ g(y) = f(\sqrt{y}) = (\sqrt{y})^2 = y$, which shows that $g \circ f = I_N$ and $f \circ g = I_Y$. Hence, $f$ is invertible with $f^{-1} = g$.

**Example 25** Let $f : N \to R$ be a function defined as $f(x) = 4x^2 + 12x + 15$. Show that $f : N \to S$, where, $S$ is the range of $f$, is invertible. Find the inverse of $f$.

**Solution** Let $y$ be an arbitrary element of range $f$. Then $y = 4x^2 + 12x + 15$, for some $x$ in $N$, which implies that $y = (2x + 3)^2 + 6$. This gives $x = \frac{\sqrt{y - 6} - 3}{2}$, as $y \ge 6$.
