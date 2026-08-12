---
type: concept
title: Proof of Irrationality of Square Roots
category: school
subject: Maths
level: class-11
chapter: 1
chapter_name: REAL NUMBERS
content_type: concept
tags:
- REAL NUMBERS
- Maths
- class12
- mathematical-proof
- real-numbers
- number-theory
- irrational-numbers
---

So, we can find integers $r$ and $s$ ($s \neq 0$) such that $\sqrt{2} = \frac{r}{s}$.
Suppose $r$ and $s$ have a common factor other than 1. Then, we divide by the common factor to get $\sqrt{2} = \frac{a}{b}$ where $a$ and $b$ are coprime.
So, $b\sqrt{2} = a$.
Squaring on both sides and rearranging, we get $2b^2 = a^2$. Therefore, 2 divides $a^2$.
Now, by Theorem 1.2, it follows that 2 divides $a$.
So, we can write $a = 2c$ for some integer $c$.
Substituting for $a$, we get $2b^2 = 4c^2$, that is, $b^2 = 2c^2$.
This means that 2 divides $b^2$, and so 2 divides $b$ (again using Theorem 1.2 with $p = 2$).
Therefore, $a$ and $b$ have at least 2 as a common factor.
But this contradicts the fact that $a$ and $b$ have no common factors other than 1.
This contradiction has arisen because of our incorrect assumption that $\sqrt{2}$ is rational.
So, we conclude that $\sqrt{2}$ is irrational.

Example 5 : Prove that $\sqrt{3}$ is irrational.
Solution : Let us assume, to the contrary, that $\sqrt{3}$ is rational.
That is, we can find integers $a$ and $b$ ($b \neq 0$) such that $\sqrt{3} = \frac{a}{b}$.
Suppose $a$ and $b$ have a common factor other than 1, then we can divide by the common factor, and assume that $a$ and $b$ are coprime.
So, $\sqrt{3}b = a$.
Squaring on both sides, and rearranging, we get $3b^2 = a^2$.
Therefore, $a^2$ is divisible by 3, and by Theorem 1.2, it follows that $a$ is also divisible by 3.
So, we can write $a = 3c$ for some integer $c$.
Substituting for $a$, we get $3b^2 = 9c^2$, that is, $b^2 = 3c^2$.
This means that $b^2$ is divisible by 3, and so $b$ is also divisible by 3 (using Theorem 1.2 with $p = 3$).
