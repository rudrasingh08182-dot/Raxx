---
type: concept
title: Scalar Product of Vectors and Their Properties
category: school
subject: Maths
level: class-12
chapter: 10
chapter_name: VECTOR ALGEBRA
content_type: concept
tags:
- vector-projection
- mathematics
- class12
- vector-algebra
- VECTOR ALGEBRA
- Maths
- scalar-product
- dot-product
---

### Scalar Product of Vectors

The scalar product of two vectors $\vec{a}$ and $\vec{b}$ is defined as $\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}| \cos \theta$, where $\theta$ is the angle between $\vec{a}$ and $\vec{b}$ (Fig 10.19). If either $\vec{a} = \vec{0}$ or $\vec{b} = \vec{0}$, then $\theta$ is not defined, and in this case, we define $\vec{a} \cdot \vec{b} = 0$.

#### Observations
1. $\vec{a} \cdot \vec{b}$ is a real number.
2. Let $\vec{a}$ and $\vec{b}$ be two nonzero vectors, then $\vec{a} \cdot \vec{b} = 0$ if and only if $\vec{a}$ and $\vec{b}$ are perpendicular to each other, i.e., $\vec{a} \perp \vec{b}$.
3. If $\theta = 0$, then $\vec{a} \cdot \vec{b} = |\vec{a}| |\vec{b}|$. In particular, $\vec{a} \cdot \vec{a} = |\vec{a}|^2$, as $\theta$ in this case is 0.
4. If $\theta = \pi$, then $\vec{a} \cdot \vec{b} = -|\vec{a}| |\vec{b}|$. In particular, $\vec{a} \cdot \vec{b} = -|\vec{a}| |\vec{b}|$, as $\theta$ in this case is $\pi$.
5. In view of the Observations 2 and 3, for mutually perpendicular unit vectors $\hat{i}, \hat{j}$ and $\hat{k}$, we have:
   $\hat{i} \cdot \hat{i} = \hat{j} \cdot \hat{j} = \hat{k} \cdot \hat{k} = 1$
   $\hat{i} \cdot \hat{j} = \hat{j} \cdot \hat{i} = \hat{j} \cdot \hat{k} = \hat{k} \cdot \hat{j} = \hat{k} \cdot \hat{i} = \hat{i} \cdot \hat{k} = 0$
6. The angle between two nonzero vectors is given by $\cos \theta = \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| |\vec{b}|}$ or $\theta = \cos^{-1} \left( \frac{\vec{a} \cdot \vec{b}}{|\vec{a}| |\vec{b}|} \right)$.
7. The scalar product is commutative, i.e., $\vec{a} \cdot \vec{b} = \vec{b} \cdot \vec{a}$.

### Two Important Properties of Scalar Product

**Property 1 (Distributivity of scalar product over addition):** Let $\vec{a}, \vec{b}, \vec{c}$ be any three vectors, then $\vec{a} \cdot (\vec{b} + \vec{c}) = \vec{a} \cdot \vec{b} + \vec{a} \cdot \vec{c}$.

**Property 2:** Let $\vec{a}$ and $\vec{b}$ be any two vectors, and $\lambda$ be any scalar. Then $(\lambda \vec{a}) \cdot \vec{b} = \lambda (\vec{a} \cdot \vec{b}) = \vec{a} \cdot (\lambda \vec{b})$.

If two vectors $\vec{a}$ and $\vec{b}$ are given in component form as $\vec{a} = a_1 \hat{i} + a_2 \hat{j} + a_3 \hat{k}$ and $\vec{b} = b_1 \hat{i} + b_2 \hat{j} + b_3 \hat{k}$, then their scalar product is given as:
$\vec{a} \cdot \vec{b} = (a_1 \hat{i} + a_2 \hat{j} + a_3 \hat{k}) \cdot (b_1 \hat{i} + b_2 \hat{j} + b_3 \hat{k})$
$= a_1 b_1 (\hat{i} \cdot \hat{i}) + a_1 b_2 (\hat{i} \cdot \hat{j}) + a_1 b_3 (\hat{i} \cdot \hat{k}) + a_2 b_1 (\hat{j} \cdot \hat{i}) + a_2 b_2 (\hat{j} \cdot \hat{j}) + a_2 b_3 (\hat{j} \cdot \hat{k}) + a_3 b_1 (\hat{k} \cdot \hat{i}) + a_3 b_2 (\hat{k} \cdot \hat{j}) + a_3 b_3 (\hat{k} \cdot \hat{k})$
$= a_1 b_1 + a_2 b_2 + a_3 b_3$ (Using Observation 5)
Thus, $\vec{a} \cdot \vec{b} = a_1 b_1 + a_2 b_2 + a_3 b_3$.

### 10.6.2 Projection of a vector on a line
Suppose a vector $\vec{a}$ makes an angle $\theta$ with a given directed line $l$ (say), in the anticlockwise direction (Fig 10.20). Then the projection of $\vec{a}$ on $l$ is a vector $\vec{p}$ (say) with magnitude $|\vec{a}| |\cos \theta|$, and the direction of $\vec{p}$ being the same (or opposite) to that of the line $l$, depending upon whether $\cos \theta$ is positive or negative.
