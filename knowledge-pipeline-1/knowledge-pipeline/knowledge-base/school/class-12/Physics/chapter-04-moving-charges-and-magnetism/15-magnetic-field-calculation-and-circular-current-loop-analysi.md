---
type: concept
title: Magnetic Field Calculation and Circular Current Loop Analysis
category: school
subject: Physics
level: class-12
chapter: 4
chapter_name: MOVING CHARGES AND MAGNETISM
content_type: concept
tags:
- circular-current-loop
- Physics
- biot-savart-law
- class12
- MOVING CHARGES AND MAGNETISM
- magnetic-field
- moving-charges
- magnetism
---

### Solution

$B = \frac{\mu_0}{4\pi} \frac{I \Delta l \sin \theta}{r^2}$ [using Eq. (4.7)]

Given: $\Delta l = 10^{-2} \text{ m}$, $I = 10 \text{ A}$, $r = 0.5 \text{ m}$, $\frac{\mu_0}{4\pi} = 10^{-7} \text{ T m/A}$, $\theta = 90^\circ$; $\sin \theta = 1$

$B = \frac{10^{-7} \times 10 \times 10^{-2}}{0.5^2} = 4 \times 10^{-8} \text{ T}$

The direction of the field is in the +z-direction. This is so since, $\Delta \vec{l} \times \vec{r} = \Delta l \hat{i} \times r \hat{j} = \Delta l r \hat{k}$.

We remind you of the following cyclic property of cross-products, $\hat{i} \times \hat{j} = \hat{k}; \hat{j} \times \hat{k} = \hat{i}; \hat{k} \times \hat{i} = \hat{j}$.

Note that the field is small in magnitude.

In the next section, we shall use the Biot-Savart law to calculate the magnetic field due to a circular loop.

### 4.5 MAGNETIC FIELD ON THE AXIS OF A CIRCULAR CURRENT LOOP

In this section, we shall evaluate the magnetic field due to a circular coil along its axis. The evaluation entails summing up the effect of infinitesimal current elements ($I d\vec{l}$) mentioned in the previous section. We assume that the current $I$ is steady and that the evaluation is carried out in free space (i.e., vacuum).

Fig. 4.9 depicts a circular loop carrying a steady current $I$. The loop is placed in the $yz$ plane with its centre at the origin $O$ and has a radius $R$. The x-axis is the axis of the loop. We wish to calculate the magnetic field at the point $P$ on this axis. Let $x$ be the distance of $P$ from the centre $O$ of the loop.

Consider a conducting element $dl$ of the loop. This is shown in Fig. 4.9. The magnitude $dB$ of the magnetic field due to $dl$ is given by the Biot-Savart law [Eq. 4.7(a)],

$dB = \frac{\mu_0}{4\pi} \frac{I dl \times r}{r^3}$ (4.8)

Now $r^2 = x^2 + R^2$. Further, any element of the loop will be perpendicular to the displacement vector from the element to the axial point. For example, the element $dl$ in Fig. 4.9 is in the $yz$ plane, whereas, the displacement vector $r$ from $dl$ to the axial point $P$ is in the $xy$ plane. Hence $|dl \times r| = r dl$. Thus,

$dB = \frac{\mu_0}{4\pi} \frac{I dl}{x^2 + R^2}$ (4.9)

**FIGURE 4.9** Magnetic field on the axis of a current carrying circular loop of radius $R$. Shown are the magnetic field $dB$ (due to a line element $dl$) and its components along and perpendicular to the axis.

**EXAMPLE 4.4**
