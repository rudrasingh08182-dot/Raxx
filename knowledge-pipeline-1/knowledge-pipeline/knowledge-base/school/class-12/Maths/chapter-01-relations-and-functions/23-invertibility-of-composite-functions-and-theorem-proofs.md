---
type: concept
title: Invertibility of Composite Functions and Theorem Proofs
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- mathematical-theorems
- relations-and-functions
- RELATIONS AND FUNCTIONS
- class12
- invertible-functions
- composite-functions
- Maths
- inverse-mapping
---

Solution: Note that by definition, $f$ and $g$ are bijective functions. Let $f^{-1} : \{a, b, c\} \to \{1, 2, 3\}$ and $g^{-1} : \{\text{apple, ball, cat}\} \to \{a, b, c\}$ be defined as $f^{-1}(a) = 1$, $f^{-1}(b) = 2$, $f^{-1}(c) = 3$, $g^{-1}(\text{apple}) = a$, $g^{-1}(\text{ball}) = b$ and $g^{-1}(\text{cat}) = c$. It is easy to verify that $f^{-1} \circ f = I_{\{1, 2, 3\}}$, $f \circ f^{-1} = I_{\{a, b, c\}}$, $g^{-1} \circ g = I_{\{a, b, c\}}$ and $g \circ g^{-1} = I_D$, where $D = \{\text{apple, ball, cat}\}$. Now, $g \circ f : \{1, 2, 3\} \to \{\text{apple, ball, cat}\}$ is given by $g \circ f(1) = \text{apple}$, $g \circ f(2) = \text{ball}$, $g \circ f(3) = \text{cat}$. We can define $(g \circ f)^{-1} : \{\text{apple, ball, cat}\} \to \{1, 2, 3\}$ by $(g \circ f)^{-1}(\text{apple}) = 1$, $(g \circ f)^{-1}(\text{ball}) = 2$ and $(g \circ f)^{-1}(\text{cat}) = 3$. It is easy to see that $(g \circ f)^{-1} \circ (g \circ f) = I_{\{1, 2, 3\}}$ and $(g \circ f) \circ (g \circ f)^{-1} = I_D$. Thus, we have seen that $f$, $g$ and $g \circ f$ are invertible. Now,

$f^{-1} \circ g^{-1}(\text{apple}) = f^{-1}(g^{-1}(\text{apple})) = f^{-1}(a) = 1 = (g \circ f)^{-1}(\text{apple})$
$f^{-1} \circ g^{-1}(\text{ball}) = f^{-1}(g^{-1}(\text{ball})) = f^{-1}(b) = 2 = (g \circ f)^{-1}(\text{ball})$ and
$f^{-1} \circ g^{-1}(\text{cat}) = f^{-1}(g^{-1}(\text{cat})) = f^{-1}(c) = 3 = (g \circ f)^{-1}(\text{cat})$.

Hence $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$. The above result is true in general situation also.

**Theorem 2:** Let $f : X \to Y$ and $g : Y \to Z$ be two invertible functions. Then $g \circ f$ is also invertible with $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$.

**Proof:** To show that $g \circ f$ is invertible with $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$, it is enough to show that $(f^{-1} \circ g^{-1}) \circ (g \circ f) = I_X$ and $(g \circ f) \circ (f^{-1} \circ g^{-1}) = I_Z$. Now,

$(f^{-1} \circ g^{-1}) \circ (g \circ f) = ((f^{-1} \circ g^{-1}) \circ g) \circ f$, by Theorem 1
$= (f^{-1} \circ (g^{-1} \circ g)) \circ f$, by Theorem 1
$= (f^{-1} \circ I_Y) \circ f$, by definition of $g^{-1}$
$= I_X$.

Similarly, it can be shown that $(g \circ f) \circ (f^{-1} \circ g^{-1}) = I_Z$.

**Example 28:** Let $S = \{1, 2, 3\}$. Determine whether the functions $f : S \to S$ defined as below have inverses. Find $f^{-1}$, if it exists.
(a) $f = \{(1, 1), (2, 2), (3, 3)\}$
(b) $f = \{(1, 2), (2, 1), (3, 1)\}$
(c) $f = \{(1, 3), (3, 2), (2, 1)\}$

**Solution:**
(a) It is easy to see that $f$ is one-one and onto, so that $f$ is invertible with the inverse $f^{-1}$ of $f$ given by $f^{-1} = \{(1, 1), (2, 2), (3, 3)\} = f$.
(b) Since $f(2) = f(3) = 1$, $f$ is not one-one, so that $f$ is not invertible.
(c) It is easy to see that $f$ is one-one and onto, so that $f$ is invertible with $f^{-1} = \{(3, 1), (2, 3), (1, 2)\}$.
