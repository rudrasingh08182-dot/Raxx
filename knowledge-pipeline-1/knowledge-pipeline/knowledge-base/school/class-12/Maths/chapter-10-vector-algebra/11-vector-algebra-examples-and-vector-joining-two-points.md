---
type: concept
title: 'Vector Algebra: Examples and Vector Joining Two Points'
category: school
subject: Maths
level: class-12
chapter: 10
chapter_name: VECTOR ALGEBRA
content_type: solved-example
tags:
- mathematics
- class12
- vector-algebra
- VECTOR ALGEBRA
- Maths
- unit-vector
- vector-addition
- direction-cosines
---

### Example 5
Let $\vec{a} = 2\hat{i} + 3\hat{j}$ and $\vec{b} = 3\hat{i} + 2\hat{j}$. Is $\vec{a} = \vec{b}$? Are the vectors equal?
**Solution:** We have $\vec{a} = 2\hat{i} + 3\hat{j}$ and $\vec{b} = 3\hat{i} + 2\hat{j}$. So, $\vec{a} \neq \vec{b}$. But, the two vectors are not equal since their corresponding components are distinct.

### Example 6
Find unit vector in the direction of vector $\vec{a} = 2\hat{i} + 3\hat{j} + \hat{k}$.
**Solution:** The unit vector in the direction of a vector $\vec{a}$ is given by $\hat{a} = \frac{1}{|\vec{a}|} \vec{a}$.
Now $|\vec{a}| = \sqrt{2^2 + 3^2 + 1^2} = \sqrt{4 + 9 + 1} = \sqrt{14}$.
Therefore, $\hat{a} = \frac{1}{\sqrt{14}}(2\hat{i} + 3\hat{j} + \hat{k}) = \frac{2}{\sqrt{14}}\hat{i} + \frac{3}{\sqrt{14}}\hat{j} + \frac{1}{\sqrt{14}}\hat{k}$.

### Example 7
Find a vector in the direction of vector $\vec{a} = \hat{i} - 2\hat{j}$ that has magnitude 7 units.
**Solution:** The unit vector in the direction of the given vector $\vec{a}$ is $\hat{a} = \frac{1}{\sqrt{1^2 + (-2)^2}}(\hat{i} - 2\hat{j}) = \frac{1}{\sqrt{5}}(\hat{i} - 2\hat{j})$.
Therefore, the vector having magnitude equal to 7 and in the direction of $\vec{a}$ is $7\hat{a} = 7 \left( \frac{1}{\sqrt{5}}\hat{i} - \frac{2}{\sqrt{5}}\hat{j} \right) = \frac{7}{\sqrt{5}}\hat{i} - \frac{14}{\sqrt{5}}\hat{j}$.

### Example 8
Find the unit vector in the direction of the sum of the vectors, $\vec{a} = 2\hat{i} + 2\hat{j} - 5\hat{k}$ and $\vec{b} = 2\hat{i} + \hat{j} + 3\hat{k}$.
**Solution:** The sum of the given vectors is $\vec{c} = \vec{a} + \vec{b} = (2+2)\hat{i} + (2+1)\hat{j} + (-5+3)\hat{k} = 4\hat{i} + 3\hat{j} - 2\hat{k}$.
$|\vec{c}| = \sqrt{4^2 + 3^2 + (-2)^2} = \sqrt{16 + 9 + 4} = \sqrt{29}$.
Thus, the required unit vector is $\hat{c} = \frac{1}{\sqrt{29}}(4\hat{i} + 3\hat{j} - 2\hat{k}) = \frac{4}{\sqrt{29}}\hat{i} + \frac{3}{\sqrt{29}}\hat{j} - \frac{2}{\sqrt{29}}\hat{k}$.

### Example 9
Write the direction ratios of the vector $\vec{a} = \hat{i} + \hat{j} - 2\hat{k}$ and hence calculate its direction cosines.
**Solution:** Note that the direction ratios $a, b, c$ of a vector $\vec{a}$ are just the respective components $x, y$ and $z$ of the vector $\vec{a}$. So, for the given vector, we have $a = 1, b = 1$ and $c = -2$. Further, if $l, m$ and $n$ are the direction cosines of the given vector, then $l = \frac{a}{|\vec{a}|}, m = \frac{b}{|\vec{a}|}, n = \frac{c}{|\vec{a}|}$.
$|\vec{a}| = \sqrt{1^2 + 1^2 + (-2)^2} = \sqrt{6}$.
Thus, the direction cosines are $\frac{1}{\sqrt{6}}, \frac{1}{\sqrt{6}}, \frac{-2}{\sqrt{6}}$.

### 10.5.2 Vector joining two points
If $P_1(x_1, y_1, z_1)$ and $P_2(x_2, y_2, z_2)$ are any two points, then the vector joining $P_1$ and $P_2$ is the vector $\vec{P_1P_2}$.
Joining the points $P_1$ and $P_2$ with the origin $O$, and applying triangle law, from the triangle $OP_1P_2$, we have $\vec{OP_1} + \vec{P_1P_2} = \vec{OP_2}$.
Using the properties of vector addition, the above equation becomes $\vec{P_1P_2} = \vec{OP_2} - \vec{OP_1}$.
i.e., $\vec{P_1P_2} = (x_2\hat{i} + y_2\hat{j} + z_2\hat{k}) - (x_1\hat{i} + y_1\hat{j} + z_1\hat{k}) = (x_2 - x_1)\hat{i} + (y_2 - y_1)\hat{j} + (z_2 - z_1)\hat{k}$.
The magnitude of vector $\vec{P_1P_2}$ is given by $|\vec{P_1P_2}| = \sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2 + (z_2 - z_1)^2}$.
