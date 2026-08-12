---
type: concept
title: Identity and Invertible Elements in Binary Operations
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- binary-operations
- mathematics
- RELATIONS AND FUNCTIONS
- identity-element
- class12
- invertible-element
- algebra
- Maths
---

For the binary operation ‘+’ on $\mathbb{R}$, the interesting feature of the number zero is that $a + 0 = a = 0 + a$, i.e., any number remains unaltered by adding zero. But in case of multiplication, the number 1 plays this role, as $a \times 1 = a = 1 \times a$, $\forall a \in \mathbb{R}$. This leads to the following definition:

**Definition 13** Given a binary operation $\ast : A \times A \to A$, an element $e \in A$, if it exists, is called identity for the operation $\ast$, if $a \ast e = a = e \ast a$, $\forall a \in A$.

**Example 38** Show that zero is the identity for addition on $\mathbb{R}$ and 1 is the identity for multiplication on $\mathbb{R}$. But there is no identity element for the operations $- : \mathbb{R} \times \mathbb{R} \to \mathbb{R}$ and $\div : \mathbb{R}^* \times \mathbb{R}^* \to \mathbb{R}^*$.

**Solution** $a + 0 = 0 + a = a$ and $a \times 1 = a = 1 \times a$, $\forall a \in \mathbb{R}$ implies that 0 and 1 are identity elements for the operations ‘+’ and ‘×’ respectively. Further, there is no element $e$ in $\mathbb{R}$ with $a - e = e - a$, $\forall a$. Similarly, we cannot find any element $e$ in $\mathbb{R}^*$ such that $a \div e = e \div a$, $\forall a$ in $\mathbb{R}^*$. Hence, ‘–’ and ‘÷’ do not have identity element.

**Remark** Zero is identity for the addition operation on $\mathbb{R}$ but it is not identity for the addition operation on $\mathbb{N}$, as $0 \notin \mathbb{N}$. In fact, the addition operation on $\mathbb{N}$ does not have any identity. One further notices that for the addition operation $+ : \mathbb{R} \times \mathbb{R} \to \mathbb{R}$, given any $a \in \mathbb{R}$, there exists $-a$ in $\mathbb{R}$ such that $a + (-a) = 0$ (identity for ‘+’) $= (-a) + a$. Similarly, for the multiplication operation on $\mathbb{R}$, given any $a \neq 0$ in $\mathbb{R}$, we can choose $\frac{1}{a}$ in $\mathbb{R}$ such that $a \times \frac{1}{a} = 1$ (identity for ‘×’) $= \frac{1}{a} \times a$. This leads to the following definition:

**Definition 14** Given a binary operation $\ast : A \times A \to A$ with the identity element $e$ in $A$, an element $a \in A$ is said to be invertible with respect to the operation $\ast$, if there exists an element $b$ in $A$ such that $a \ast b = e = b \ast a$ and $b$ is called the inverse of $a$ and is denoted by $a^{-1}$.

**Example 39** Show that $-a$ is the inverse of $a$ for the addition operation ‘+’ on $\mathbb{R}$ and $\frac{1}{a}$ is the inverse of $a \neq 0$ for the multiplication operation ‘×’ on $\mathbb{R}$.

**Solution** As $a + (-a) = a - a = 0$ and $(-a) + a = 0$, $-a$ is the inverse of $a$ for addition. Similarly, for $a \neq 0$, $a \times \frac{1}{a} = 1 = \frac{1}{a} \times a$ implies that $\frac{1}{a}$ is the inverse of $a$ for multiplication.
