---
type: concept
title: Power Factor Improvement and LCR Circuit Analysis
category: school
subject: Physics
level: class-12
chapter: 7
chapter_name: ALTERNATING CURRENT
content_type: solved-example
tags:
- wattless-current
- class12
- Physics
- ALTERNATING CURRENT
- power-factor
- impedance
- physics
- lcr-circuit
---

Physics 192

How this can be achieved. Let us resolve $I$ into two components: $I_p$ along the applied voltage $V$ and $I_q$ perpendicular to the applied voltage. $I_q$, as you have learnt in Section 7.7, is called the wattless component since corresponding to this component of current, there is no power loss. $I_p$ is known as the power component because it is in phase with the voltage and corresponds to power loss in the circuit. It’s clear from this analysis that if we want to improve power factor, we must completely neutralize the lagging wattless current $I_q$ by an equal leading wattless current $I'_q$. This can be done by connecting a capacitor of appropriate value in parallel so that $I_q$ and $I'_q$ cancel each other and $P$ is effectively $I_p V$.

**Example 7.8** A sinusoidal voltage of peak value 283 V and frequency 50 Hz is applied to a series LCR circuit in which $R = 3 \, \Omega$, $L = 25.48 \, \text{mH}$, and $C = 796 \, \mu\text{F}$. Find (a) the impedance of the circuit; (b) the phase difference between the voltage across the source and the current; (c) the power dissipated in the circuit; and (d) the power factor.

**Solution**

(a) To find the impedance of the circuit, we first calculate $X_L$ and $X_C$.
$X_L = 2 \pi \nu L = 2 \times 3.14 \times 50 \times 25.48 \times 10^{-3} \, \Omega = 8 \, \Omega$
$X_C = \frac{1}{2 \pi \nu C} = \frac{1}{2 \times 3.14 \times 50 \times 796 \times 10^{-6}} = 4 \, \Omega$

Therefore,
$Z = \sqrt{R^2 + (X_L - X_C)^2} = \sqrt{3^2 + (8 - 4)^2} = 5 \, \Omega$

(b) Phase difference, $\phi = \tan^{-1} \left( \frac{X_C - X_L}{R} \right) = \tan^{-1} \left( \frac{4 - 8}{3} \right) = -53.1^\circ$
