---
type: concept
title: Understanding Equivalence Classes and Partitions of Sets
category: school
subject: Maths
level: class-12
chapter: 1
chapter_name: RELATIONS AND FUNCTIONS
content_type: concept
tags:
- set-theory
- mathematics
- equivalence-classes
- RELATIONS AND FUNCTIONS
- equivalence-relation
- class12
- partitions
- Maths
---

In Example 5, note that all even integers are related to zero, as $(0, ± 2)$, $(0, ± 4)$ etc., lie in $R$ and no odd integer is related to $0$, as $(0, ± 1)$, $(0, ± 3)$ etc., do not lie in $R$. Similarly, all odd integers are related to one and no even integer is related to one. Therefore, the set $E$ of all even integers and the set $O$ of all odd integers are subsets of $Z$ satisfying following conditions:

(i) All elements of $E$ are related to each other and all elements of $O$ are related to each other.
(ii) No element of $E$ is related to any element of $O$ and vice-versa.
(iii) $E$ and $O$ are disjoint and $Z = E ∪ O$.

The subset $E$ is called the equivalence class containing zero and is denoted by $[0]$. Similarly, $O$ is the equivalence class containing $1$ and is denoted by $[1]$. Note that $[0] ≠ [1]$, $[0] = [2r]$ and $[1] = [2r + 1]$, $r ∈ Z$. In fact, what we have seen above is true for an arbitrary equivalence relation $R$ in a set $X$. Given an arbitrary equivalence relation $R$ in an arbitrary set $X$, $R$ divides $X$ into mutually disjoint subsets $A_i$ called partitions or subdivisions of $X$ satisfying:

(i) all elements of $A_i$ are related to each other, for all $i$.
(ii) no element of $A_i$ is related to any element of $A_j$, $i ≠ j$.
(iii) $∪ A_j = X$ and $A_i ∩ A_j = φ$, $i ≠ j$.

The subsets $A_i$ are called equivalence classes. The interesting part of the situation is that we can go reverse also. For example, consider a subdivision of the set $Z$ given by three mutually disjoint subsets $A_1, A_2$ and $A_3$ whose union is $Z$ with:

$A_1 = \{x ∈ Z : x \text{ is a multiple of } 3\} = \{\dots, -6, -3, 0, 3, 6, \dots\}$
$A_2 = \{x ∈ Z : x - 1 \text{ is a multiple of } 3\} = \{\dots, -5, -2, 1, 4, 7, \dots\}$
$A_3 = \{x ∈ Z : x - 2 \text{ is a multiple of } 3\} = \{\dots, -4, -1, 2, 5, 8, \dots\}$

Define a relation $R$ in $Z$ given by $R = \{(a, b) : 3 \text{ divides } a - b\}$. Following the arguments similar to those used in Example 5, we can show that $R$ is an equivalence relation. Also, $A_1$ coincides with the set of all integers in $Z$ which are related to zero, $A_2$ coincides with the set of all integers which are related to $1$ and $A_3$ coincides with the set of all integers in $Z$ which are related to $2$. Thus, $A_1 = [0]$, $A_2 = [1]$ and $A_3 = [2]$. In fact, $A_1 = [3r]$, $A_2 = [3r + 1]$ and $A_3 = [3r + 2]$, for all $r ∈ Z$.
