---
type: concept
title: Mathematical Induction for Matrix Powers and Symmetric Matrix Properties
category: school
subject: Maths
level: class-12
chapter: 3
chapter_name: MATRICES
content_type: solved-example
tags:
- mathematical-induction
- matrix-powers
- linear-algebra
- MATRICES
- symmetric-matrices
- matrix-algebra
- Maths
- class12
---

### Miscellaneous Examples

**Example 26** If $A = \begin{bmatrix} \cos \theta & \sin \theta \\ -\sin \theta & \cos \theta \end{bmatrix}$, then prove that $A^n = \begin{bmatrix} \cos n\theta & \sin n\theta \\ -\sin n\theta & \cos n\theta \end{bmatrix}$, $n \in N$.

**Solution:** We shall prove the result by using the principle of mathematical induction.

We have $P(n)$ : If $A = \begin{bmatrix} \cos \theta & \sin \theta \\ -\sin \theta & \cos \theta \end{bmatrix}$, then $A^n = \begin{bmatrix} \cos n\theta & \sin n\theta \\ -\sin n\theta & \cos n\theta \end{bmatrix}$, $n \in N$.

$P(1) : A^1 = \begin{bmatrix} \cos \theta & \sin \theta \\ -\sin \theta & \cos \theta \end{bmatrix}$, so $A^1 = \begin{bmatrix} \cos \theta & \sin \theta \\ -\sin \theta & \cos \theta \end{bmatrix}$.

Therefore, the result is true for $n = 1$.

Let the result be true for $n = k$. So $P(k) : A^k = \begin{bmatrix} \cos k\theta & \sin k\theta \\ -\sin k\theta & \cos k\theta \end{bmatrix}$.

Now, we prove that the result holds for $n = k + 1$.

Now $A^{k+1} = A^k \cdot A = \begin{bmatrix} \cos k\theta & \sin k\theta \\ -\sin k\theta & \cos k\theta \end{bmatrix} \begin{bmatrix} \cos \theta & \sin \theta \\ -\sin \theta & \cos \theta \end{bmatrix}$

$= \begin{bmatrix} \cos k\theta \cos \theta - \sin k\theta \sin \theta & \cos k\theta \sin \theta + \sin k\theta \cos \theta \\ -\sin k\theta \cos \theta - \cos k\theta \sin \theta & -\sin k\theta \sin \theta + \cos k\theta \cos \theta \end{bmatrix}$

$= \begin{bmatrix} \cos(k+1)\theta & \sin(k+1)\theta \\ -\sin(k+1)\theta & \cos(k+1)\theta \end{bmatrix}$

Therefore, the result is true for $n = k + 1$. Thus by the principle of mathematical induction, we have $A^n = \begin{bmatrix} \cos n\theta & \sin n\theta \\ -\sin n\theta & \cos n\theta \end{bmatrix}$, holds for all natural numbers.

**Example 27** If A and B are symmetric matrices of the same order, then show that AB is symmetric if and only if A and B commute, that is $AB = BA$.

**Solution:** Since A and B are both symmetric matrices, therefore $A' = A$ and $B' = B$.

Let AB be symmetric, then $(AB)' = AB$.
