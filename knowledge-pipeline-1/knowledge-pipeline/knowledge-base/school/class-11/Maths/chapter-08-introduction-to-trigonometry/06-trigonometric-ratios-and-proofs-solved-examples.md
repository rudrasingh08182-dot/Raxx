---
type: concept
title: 'Trigonometric Ratios and Proofs: Solved Examples'
category: school
subject: Maths
level: class-11
chapter: 8
chapter_name: INTRODUCTION TO TRIGONOMETRY
content_type: solved-example
tags:
- Maths
- trigonometric-ratios
- pythagoras-theorem
- INTRODUCTION TO TRIGONOMETRY
- right-triangle
- trigonometry
- geometry
- class12
---

### Remark
Since the hypotenuse is the longest side in a right triangle, the value of $\sin A$ or $\cos A$ is always less than 1 (or, in particular, equal to 1).

Let us consider some examples.

**Example 1:** Given $\tan A = \frac{4}{3}$, find the other trigonometric ratios of the angle $A$.

**Solution:** Let us first draw a right $\Delta ABC$ (see Fig 8.8).
Now, we know that $\tan A = \frac{BC}{AB} = \frac{4}{3}$.
Therefore, if $BC = 4k$, then $AB = 3k$, where $k$ is a positive number.
Now, by using the Pythagoras Theorem, we have:
$AC^2 = AB^2 + BC^2 = (4k)^2 + (3k)^2 = 25k^2$
So, $AC = 5k$
Now, we can write all the trigonometric ratios using their definitions:
$\sin A = \frac{BC}{AC} = \frac{4k}{5k} = \frac{4}{5}$
$\cos A = \frac{AB}{AC} = \frac{3k}{5k} = \frac{3}{5}$
Therefore, $\cot A = \frac{1}{\tan A} = \frac{3}{4}$, $\csc A = \frac{1}{\sin A} = \frac{5}{4}$ and $\sec A = \frac{1}{\cos A} = \frac{5}{3}$.

**Example 2:** If $\angle B$ and $\angle Q$ are acute angles such that $\sin B = \sin Q$, then prove that $\angle B = \angle Q$.

**Solution:** Let us consider two right triangles $ABC$ and $PQR$ where $\sin B = \sin Q$ (see Fig. 8.9).
We have $\sin B = \frac{AC}{AB}$ and $\sin Q = \frac{PR}{PQ}$.
Then $\frac{AC}{AB} = \frac{PR}{PQ}$.
Therefore, $\frac{AC}{PR} = \frac{AB}{PQ} = k$ (say) (1)
Now, using Pythagoras theorem,
$BC = \sqrt{AB^2 - AC^2}$ and $QR = \sqrt{PQ^2 - PR^2}$
So, $\frac{BC}{QR} = \frac{\sqrt{AB^2 - AC^2}}{\sqrt{PQ^2 - PR^2}} = \frac{\sqrt{k^2PQ^2 - k^2PR^2}}{\sqrt{PQ^2 - PR^2}} = \frac{k\sqrt{PQ^2 - PR^2}}{\sqrt{PQ^2 - PR^2}} = k$ (2)
From (1) and (2), we have $\frac{AC}{PR} = \frac{AB}{PQ} = \frac{BC}{QR}$.
Then, by using Theorem 6.4, $\Delta ACB \sim \Delta PRQ$ and therefore, $\angle B = \angle Q$.

**Example 3:** Consider $\Delta ACB$, right-angled at $C$, in which $AB = 29$ units, $BC = 21$ units and $\angle ABC = \theta$ (see Fig. 8.10). Determine the values of:
(i) $\cos^2 \theta + \sin^2 \theta$
(ii) $\cos^2 \theta - \sin^2 \theta$

**Solution:** In $\Delta ACB$, we have:
$AC = \sqrt{AB^2 - BC^2} = \sqrt{(29)^2 - (21)^2} = \sqrt{(29 - 21)(29 + 21)} = \sqrt{(8)(50)} = \sqrt{400} = 20$ units.
So, $\sin \theta = \frac{AC}{AB} = \frac{20}{29}$, $\cos \theta = \frac{BC}{AB} = \frac{21}{29}$.
Now,
(i) $\cos^2 \theta + \sin^2 \theta = \left(\frac{21}{29}\right)^2 + \left(\frac{20}{29}\right)^2 = \frac{441 + 400}{841} = \frac{841}{841} = 1$
(ii) $\cos^2 \theta - \sin^2 \theta = \left(\frac{21}{29}\right)^2 - \left(\frac{20}{29}\right)^2 = \frac{(21 - 20)(21 + 20)}{841} = \frac{41}{841}$
