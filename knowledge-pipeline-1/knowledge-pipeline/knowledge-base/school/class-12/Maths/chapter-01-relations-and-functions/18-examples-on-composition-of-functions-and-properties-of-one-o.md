---
type: concept
title: Examples on Composition of Functions and Properties of One-One and Onto Functions
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: solved-example
tags:
- one-one-functions
- relations-and-functions
- onto-functions
- RELATIONS AND FUNCTIONS
- class12
- composition-of-functions
- identity-functions
- Maths
---

### Example 17
Show that if $f: \mathbb{R} - \{\frac{3}{5}\} \to \mathbb{R} - \{\frac{3}{5}\}$ is defined by $f(x) = \frac{3x+4}{5x-7}$ and $g: \mathbb{R} - \{\frac{7}{5}\} \to \mathbb{R} - \{\frac{7}{5}\}$ is defined by $g(x) = \frac{7x+4}{5x-3}$, then $f \circ g = I_A$ and $g \circ f = I_B$, where $A = \mathbb{R} - \{\frac{3}{5}\}$, $B = \mathbb{R} - \{\frac{7}{5}\}$; $I_A(x) = x, \forall x \in A$, $I_B(x) = x, \forall x \in B$ are called identity functions on sets $A$ and $B$, respectively.

**Solution**
We have
$(g \circ f)(x) = g(f(x)) = g\left(\frac{3x+4}{5x-7}\right) = \frac{7\left(\frac{3x+4}{5x-7}\right) + 4}{5\left(\frac{3x+4}{5x-7}\right) - 3}$
$= \frac{21x + 28 + 20x - 28}{15x + 20 - 15x + 21} = \frac{41x}{41} = x$

Similarly,
$(f \circ g)(x) = f(g(x)) = f\left(\frac{7x+4}{5x-3}\right) = \frac{3\left(\frac{7x+4}{5x-3}\right) + 4}{5\left(\frac{7x+4}{5x-3}\right) - 7}$
$= \frac{21x + 12 + 20x - 12}{35x + 20 - 35x + 21} = \frac{41x}{41} = x$

Thus, $g \circ f(x) = x, \forall x \in B$ and $f \circ g(x) = x, \forall x \in A$, which implies that $g \circ f = I_B$ and $f \circ g = I_A$.

### Example 18
Show that if $f: A \to B$ and $g: B \to C$ are one-one, then $g \circ f: A \to C$ is also one-one.

**Solution**
Suppose $(g \circ f)(x_1) = (g \circ f)(x_2)$
$\Rightarrow g(f(x_1)) = g(f(x_2))$
$\Rightarrow f(x_1) = f(x_2)$, as $g$ is one-one
$\Rightarrow x_1 = x_2$, as $f$ is one-one
Hence, $g \circ f$ is one-one.

### Example 19
Show that if $f: A \to B$ and $g: B \to C$ are onto, then $g \circ f: A \to C$ is also onto.

**Solution**
Given an arbitrary element $z \in C$, there exists a pre-image $y$ of $z$ under $g$ such that $g(y) = z$, since $g$ is onto. Further, for $y \in B$, there exists an element $x$ in $A$.
