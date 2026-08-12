---
type: concept
title: Composition of Functions and Invertible Functions
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- functions
- mathematics
- RELATIONS AND FUNCTIONS
- class12
- calculus
- composition-of-functions
- invertible-functions
- Maths
---

### 1.4 Composition of Functions and Invertible Function

In this section, we will study composition of functions and the inverse of a bijective function. Consider the set A of all students, who appeared in Class X of a Board Examination in 2006. Each student appearing in the Board Examination is assigned a roll number by the Board which is written by the students in the answer script at the time of examination. In order to have confidentiality, the Board arranges to deface the roll numbers of students in the answer scripts and assigns a fake code number to each roll number. Let $B \subset N$ be the set of all roll numbers and $C \subset N$ be the set of all code numbers. This gives rise to two functions $f : A \to B$ and $g : B \to C$ given by $f(a) =$ the roll number assigned to the student $a$ and $g(b) =$ the code number assigned to the roll number $b$. In this process each student is assigned a roll number through the function $f$ and each roll number is assigned a code number through the function $g$. Thus, by the combination of these two functions, each student is eventually attached a code number. This leads to the following definition:

**Definition 8** Let $f : A \to B$ and $g : B \to C$ be two functions. Then the composition of $f$ and $g$, denoted by $gof$, is defined as the function $gof : A \to C$ given by $gof(x) = g(f(x))$, $\forall x \in A$.

Fig 1.5

**Example 15** Let $f : \{2, 3, 4, 5\} \to \{3, 4, 5, 9\}$ and $g : \{3, 4, 5, 9\} \to \{7, 11, 15\}$ be functions defined as $f(2) = 3, f(3) = 4, f(4) = f(5) = 5$ and $g(3) = g(4) = 7$ and $g(5) = g(9) = 11$. Find $gof$.

**Solution** We have $gof(2) = g(f(2)) = g(3) = 7$, $gof(3) = g(f(3)) = g(4) = 7$, $gof(4) = g(f(4)) = g(5) = 11$ and $gof(5) = g(5) = 11$.

**Example 16** Find $gof$ and $fog$, if $f : R \to R$ and $g : R \to R$ are given by $f(x) = \cos x$ and $g(x) = 3x^2$. Show that $gof \neq fog$.

**Solution** We have $gof(x) = g(f(x)) = g(\cos x) = 3(\cos x)^2 = 3\cos^2 x$. Similarly, $fog(x) = f(g(x)) = f(3x^2) = \cos(3x^2)$. Note that $3\cos^2 x \neq \cos(3x^2)$, for $x = 0$. Hence, $gof \neq fog$.
