---
type: concept
title: Phasor Diagram Solution for Series LCR Circuit
category: school
subject: Physics
level: class-12
chapter: 7
chapter_name: ALTERNATING CURRENT
content_type: concept
tags:
- alternating-current
- class12
- phasor-diagram
- Physics
- ALTERNATING CURRENT
- impedance
- physics
- lcr-circuit
---

187
Alternating Current
7.6.1 Phasor-diagram solution
From the circuit shown in Fig. 7.10, we see that the resistor, inductor and capacitor are in series. Therefore, the ac current in each element is the same at any time, having the same amplitude and phase. Let it be
$i = i_m \sin(\omega t + \phi)$ (7.21)
where $\phi$ is the phase difference between the voltage across the source and the current in the circuit. On the basis of what we have learnt in the previous sections, we shall construct a phasor diagram for the present case.
Let $I$ be the phasor representing the current in the circuit as given by Eq. (7.21). Further, let $V_L$, $V_R$, $V_C$, and $V$ represent the voltage across the inductor, resistor, capacitor and the source, respectively. From previous section, we know that $V_R$ is parallel to $I$, $V_C$ is $\pi/2$ behind $I$ and $V_L$ is $\pi/2$ ahead of $I$. $V_L$, $V_R$, $V_C$ and $I$ are shown in Fig. 7.11(a) with appropriate phase-relations.
The length of these phasors or the amplitude of $V_R$, $V_C$ and $V_L$ are:
$V_{Rm} = i_m R$, $V_{Cm} = i_m X_C$, $V_{Lm} = i_m X_L$ (7.22)
The voltage Equation (7.20) for the circuit can be written as
$v_L + v_R + v_C = v$ (7.23)
The phasor relation whose vertical component gives the above equation is
$V_L + V_R + V_C = V$ (7.24)
This relation is represented in Fig. 7.11(b). Since $V_C$ and $V_L$ are always along the same line and in opposite directions, they can be combined into a single phasor $(V_C + V_L)$ which has a magnitude $|V_{Cm} - V_{Lm}|$. Since $V$ is represented as the hypotenuse of a right-triangle whose sides are $V_R$ and $(V_C + V_L)$, the pythagorean theorem gives:
$V_m^2 = V_{Rm}^2 + (V_{Cm} - V_{Lm})^2$
Substituting the values of $V_{Rm}$, $V_{Cm}$, and $V_{Lm}$ from Eq. (7.22) into the above equation, we have
$V_m^2 = (i_m R)^2 + (i_m X_C - i_m X_L)^2$
$V_m^2 = i_m^2 [R^2 + (X_C - X_L)^2]$
or, $\frac{V_m}{i_m} = \sqrt{R^2 + (X_C - X_L)^2}$ [7.25(a)]
By analogy to the resistance in a circuit, we introduce the impedance $Z$ in an ac circuit:
$Z = \frac{V_m}{i_m}$ [7.25(b)]
where $Z = \sqrt{R^2 + (X_C - X_L)^2}$ (7.26)
FIGURE 7.11 (a) Relation between the phasors $V_L$, $V_R$, $V_C$, and $I$, (b) Relation between the phasors $V_L$, $V_R$, and $(V_L + V_C)$ for the circuit in Fig. 7.10.
Reprint 2026-27
