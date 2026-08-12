---
type: concept
title: Power in Alternating Current Circuits and Power Factor
category: school
subject: Physics
level: class-12
chapter: 7
chapter_name: ALTERNATING CURRENT
content_type: concept
tags:
- alternating-current
- wattless-current
- class12
- Physics
- resonance
- power-factor
- ALTERNATING CURRENT
- lcr-circuit
---

191
Alternating Current

$v = v_m \sin(\omega t)$
$i = i_m \sin(\omega t + \phi)$

$P = \frac{v_m i_m}{2} \cos \phi = \frac{v_m}{\sqrt{2}} \frac{i_m}{\sqrt{2}} \cos \phi = V I \cos \phi$ [7.30(a)]

This can also be written as,
$P = I^2 Z \cos \phi$ [7.30(b)]

So, the average power dissipated depends not only on the voltage and current but also on the cosine of the phase angle $\phi$ between them. The quantity $\cos \phi$ is called the power factor. Let us discuss the following cases:

**Case (i) Resistive circuit:** If the circuit contains only pure R, it is called resistive. In that case $\phi = 0$, $\cos \phi = 1$. There is maximum power dissipation.

**Case (ii) Purely inductive or capacitive circuit:** If the circuit contains only an inductor or capacitor, we know that the phase difference between voltage and current is $\pi/2$. Therefore, $\cos \phi = 0$, and no power is dissipated even though a current is flowing in the circuit. This current is sometimes referred to as wattless current.

**Case (iii) LCR series circuit:** In an LCR series circuit, power dissipated is given by Eq. (7.30) where $\phi = \tan^{-1} (X_c - X_L) / R$. So, $\phi$ may be non-zero in a RL or RC or RCL circuit. Even in such cases, power is dissipated only in the resistor.

**Case (iv) Power dissipated at resonance in LCR circuit:** At resonance $X_c - X_L = 0$, and $\phi = 0$. Therefore, $\cos \phi = 1$ and $P = I^2 Z = I^2 R$. That is, maximum power is dissipated in a circuit (through R) at resonance.

**Example 7.7**
(a) For circuits used for transporting electric power, a low power factor implies large power loss in transmission. Explain.
(b) Power factor can often be improved by the use of a capacitor of appropriate capacitance in the circuit. Explain.

**Solution**
(a) We know that $P = I V \cos \phi$ where $\cos \phi$ is the power factor.
