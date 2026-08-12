---
type: concept
title: Properties of Composite Functions and Inverse Mappings
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- one-one-function
- mathematics
- RELATIONS AND FUNCTIONS
- class12
- composite-functions
- Maths
- inverse-mapping
- onto-function
---

With $f(x) = y$, since $f$ is onto. Therefore, $g \circ f(x) = g(f(x)) = g(y) = z$, showing that $g \circ f$ is onto.

**Example 20:** Consider functions $f$ and $g$ such that composite $g \circ f$ is defined and is one-one. Are $f$ and $g$ both necessarily one-one?

**Solution:** Consider $f: \{1, 2, 3, 4\} \to \{1, 2, 3, 4, 5, 6\}$ defined as $f(x) = x, \forall x$ and $g: \{1, 2, 3, 4, 5, 6\} \to \{1, 2, 3, 4, 5, 6\}$ as $g(x) = x$, for $x = 1, 2, 3, 4$ and $g(5) = g(6) = 5$. Then, $g \circ f(x) = x \forall x$, which shows that $g \circ f$ is one-one. But $g$ is clearly not one-one.

**Example 21:** Are $f$ and $g$ both necessarily onto, if $g \circ f$ is onto?

**Solution:** Consider $f: \{1, 2, 3, 4\} \to \{1, 2, 3, 4\}$ and $g: \{1, 2, 3, 4\} \to \{1, 2, 3\}$ defined as $f(1) = 1, f(2) = 2, f(3) = f(4) = 3, g(1) = 1, g(2) = 2$ and $g(3) = g(4) = 3$. It can be seen that $g \circ f$ is onto but $f$ is not onto.

**Remark:** It can be verified in general that $g \circ f$ is one-one implies that $f$ is one-one. Similarly, $g \circ f$ is onto implies that $g$ is onto.

Now, we would like to have a close look at the functions $f$ and $g$ described in the beginning of this section in reference to a Board Examination. Each student appearing in Class X Examination of the Board is assigned a roll number under the function $f$ and each roll number is assigned a code number under $g$. After the answer scripts are examined, the examiner enters the mark against each code number in a mark book and submits it to the office of the Board. The Board officials decode by assigning a roll number back to each code number through a process reverse to $g$ and thus the mark gets attached to the roll number rather than the code number. Further, the process reverse to $f$ assigns a roll number to the student having that roll number. This helps in assigning the mark to the student scoring that mark. We observe that while composing $f$ and $g$, to get $g \circ f$, first $f$ and then $g$ was applied, while in the reverse process of the composite $g \circ f$, first the reverse process of $g$ is applied and then the reverse process of $f$.

**Example 22:** Let $f: \{1, 2, 3\} \to \{a, b, c\}$ be a one-one and onto function given by $f(1) = a, f(2) = b$ and $f(3) = c$. Show that there exists a function $g: \{a, b, c\} \to \{1, 2, 3\}$ such that $g \circ f = I_X$ and $f \circ g = I_Y$, where $X = \{1, 2, 3\}$ and $Y = \{a, b, c\}$.
