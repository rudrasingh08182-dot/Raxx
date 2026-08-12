---
type: concept
title: Understanding Equivalence Relations and Properties of Relations
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: solved-example
tags:
- transitive-relation
- relations-and-functions
- reflexive-relation
- RELATIONS AND FUNCTIONS
- mathematics
- equivalence-relation
- class12
- symmetric-relation
- Maths
---

### Definition 4
A relation $R$ in a set $A$ is said to be an equivalence relation if $R$ is reflexive, symmetric and transitive.

**Example 2** Let $T$ be the set of all triangles in a plane with $R$ a relation in $T$ given by $R = \{(T_1, T_2) : T_1 \text{ is congruent to } T_2\}$. Show that $R$ is an equivalence relation.

**Solution:** $R$ is reflexive, since every triangle is congruent to itself. Further, $(T_1, T_2) \in R \implies T_1 \text{ is congruent to } T_2 \implies T_2 \text{ is congruent to } T_1 \implies (T_2, T_1) \in R$. Hence, $R$ is symmetric. Moreover, $(T_1, T_2), (T_2, T_3) \in R \implies T_1 \text{ is congruent to } T_2 \text{ and } T_2 \text{ is congruent to } T_3 \implies T_1 \text{ is congruent to } T_3 \implies (T_1, T_3) \in R$. Therefore, $R$ is an equivalence relation.

**Example 3** Let $L$ be the set of all lines in a plane and $R$ be the relation in $L$ defined as $R = \{(L_1, L_2) : L_1 \text{ is perpendicular to } L_2\}$. Show that $R$ is symmetric but neither reflexive nor transitive.

**Solution:** $R$ is not reflexive, as a line $L_1$ cannot be perpendicular to itself, i.e., $(L_1, L_1) \notin R$. $R$ is symmetric as $(L_1, L_2) \in R \implies L_1 \text{ is perpendicular to } L_2 \implies L_2 \text{ is perpendicular to } L_1 \implies (L_2, L_1) \in R$. $R$ is not transitive. Indeed, if $L_1$ is perpendicular to $L_2$ and $L_2$ is perpendicular to $L_3$, then $L_1$ can never be perpendicular to $L_3$. In fact, $L_1$ is parallel to $L_3$, i.e., $(L_1, L_2) \in R, (L_2, L_3) \in R \text{ but } (L_1, L_3) \notin R$.

**Example 4** Show that the relation $R$ in the set $\{1, 2, 3\}$ given by $R = \{(1, 1), (2, 2), (3, 3), (1, 2), (2, 3)\}$ is reflexive but neither symmetric nor transitive.

**Solution:** $R$ is reflexive, since $(1, 1), (2, 2) \text{ and } (3, 3)$ lie in $R$. Also, $R$ is not symmetric, as $(1, 2) \in R \text{ but } (2, 1) \notin R$. Similarly, $R$ is not transitive, as $(1, 2) \in R \text{ and } (2, 3) \in R \text{ but } (1, 3) \notin R$.

**Example 5** Show that the relation $R$ in the set $Z$ of integers given by $R = \{(a, b) : 2 \text{ divides } a - b\}$ is an equivalence relation.

**Solution:** $R$ is reflexive, as $2$ divides $(a - a)$ for all $a \in Z$. Further, if $(a, b) \in R$, then $2$ divides $a - b$. Therefore, $2$ divides $b - a$. Hence, $(b, a) \in R$, which shows that $R$ is symmetric. Similarly, if $(a, b) \in R \text{ and } (b, c) \in R$, then $a - b \text{ and } b - c$ are divisible by $2$. Now, $a - c = (a - b) + (b - c)$ is even (Why?). So, $(a - c)$ is divisible by $2$. This shows that $R$ is transitive. Thus, $R$ is an equivalence relation in $Z$.
