---
type: concept
title: 'Understanding Types of Relations: Empty, Universal, and Trivial'
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- set-theory
- mathematics
- empty-relation
- RELATIONS AND FUNCTIONS
- class12
- universal-relation
- Maths
- relations
---

### 1.2 Types of Relations

In this section, we would like to study different types of relations. We know that a relation in a set $A$ is a subset of $A \times A$. Thus, the empty set $\phi$ and $A \times A$ are two extreme relations. For illustration, consider a relation $R$ in the set $A = \{1, 2, 3, 4\}$ given by $R = \{(a, b) : a - b = 10\}$. This is the empty set, as no pair $(a, b)$ satisfies the condition $a - b = 10$. Similarly, $R' = \{(a, b) : |a - b| \ge 0\}$ is the whole set $A \times A$, as all pairs $(a, b)$ in $A \times A$ satisfy $|a - b| \ge 0$. These two extreme examples lead us to the following definitions.

**Definition 1:** A relation $R$ in a set $A$ is called empty relation, if no element of $A$ is related to any element of $A$, i.e., $R = \phi \subset A \times A$.

**Definition 2:** A relation $R$ in a set $A$ is called universal relation, if each element of $A$ is related to every element of $A$, i.e., $R = A \times A$.

Both the empty relation and the universal relation are sometimes called trivial relations.

**Example 1:** Let $A$ be the set of all students of a boys school. Show that the relation $R$ in $A$ given by $R = \{(a, b) : a \text{ is sister of } b\}$ is the empty relation and $R' = \{(a, b) : \text{the difference between heights of } a \text{ and } b \text{ is less than 3 meters}\}$ is the universal relation.

**Solution:** Since the school is a boys school, no student of the school can be sister of any student of the school. Hence, $R = \phi$, showing that $R$ is the empty relation. It is also obvious that the difference between heights of any two students of the school has to be less than 3 meters. This shows that $R' = A \times A$ is the universal relation.

**Remark:** In Class XI, we have seen two ways of representing a relation, namely roster method and set builder method. However, a relation $R$ in the set $\{1, 2, 3, 4\}$ defined by $R = \{(a, b) : b = a + 1\}$ is also expressed as $a R b$ if and only if $b = a + 1$ by many authors. We may also use this notation, as and when convenient. If $(a, b) \in R$, we say that $a$ is related to $b$ and we denote it as $a R b$.

One of the most important relations, which plays a significant role in Mathematics, is an equivalence relation. To study equivalence relation, we first consider three types of relations, namely reflexive, symmetric and transitive.
