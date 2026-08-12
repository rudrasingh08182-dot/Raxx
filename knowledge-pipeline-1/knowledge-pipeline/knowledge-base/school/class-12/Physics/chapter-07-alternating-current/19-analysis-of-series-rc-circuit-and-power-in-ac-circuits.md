---
type: concept
title: Analysis of Series RC Circuit and Power in AC Circuits
category: school
subject: Physics
level: class-12
chapter: 7
chapter_name: ALTERNATING CURRENT
content_type: solved-example
tags:
- class12
- Physics
- ALTERNATING CURRENT
- power-factor
- impedance
- ac-circuits
- physics
- phase-difference
---

### Example 7.6
A resistor of $200 \, \Omega$ and a capacitor of $15.0 \, \mu\text{F}$ are connected in series to a $220 \, \text{V}$, $50 \, \text{Hz}$ ac source. 
(a) Calculate the current in the circuit;
(b) Calculate the voltage (rms) across the resistor and the capacitor. Is the algebraic sum of these voltages more than the source voltage? If yes, resolve the paradox.

**Solution**
Given:
$R = 200 \, \Omega$, $C = 15.0 \, \mu\text{F} = 15.0 \times 10^{-6} \, \text{F}$
$V = 220 \, \text{V}$, $\nu = 50 \, \text{Hz}$

(a) In order to calculate the current, we need the impedance of the circuit. It is:
$Z = \sqrt{R^2 + X_C^2} = \sqrt{R^2 + (\frac{1}{2\pi\nu C})^2}$
$Z = \sqrt{(200 \, \Omega)^2 + (\frac{1}{2 \times 3.14 \times 50 \times 15.0 \times 10^{-6} \, \text{F}})^2}$
$Z = \sqrt{(200 \, \Omega)^2 + (212.3 \, \Omega)^2}$
$Z = 291.67 \, \Omega$

Therefore, the current in the circuit is:
$I = \frac{V}{Z} = \frac{220 \, \text{V}}{291.5 \, \Omega} = 0.755 \, \text{A}$

(b) Since the current is the same throughout the circuit, we have:
$V_R = I R = (0.755 \, \text{A})(200 \, \Omega) = 151 \, \text{V}$
$V_C = I X_C = (0.755 \, \text{A})(212.3 \, \Omega) = 160.3 \, \text{V}$

The algebraic sum of the two voltages, $V_R$ and $V_C$ is $311.3 \, \text{V}$ which is more than the source voltage of $220 \, \text{V}$. How to resolve this paradox? As you have learnt in the text, the two voltages are not in the same phase. Therefore, they cannot be added like ordinary numbers. The two voltages are out of phase by ninety degrees. Therefore, the total of these voltages must be obtained using the Pythagorean theorem:
$V = \sqrt{V_R^2 + V_C^2} = 220 \, \text{V}$

Thus, if the phase difference between two voltages is properly taken into account, the total voltage across the resistor and the capacitor is equal to the voltage of the source.

### 7.7 POWER IN AC CIRCUIT: THE POWER FACTOR
We have seen that a voltage $v = v_m \sin \omega t$ applied to a series RLC circuit drives a current in the circuit given by $i = i_m \sin(\omega t + \phi)$ where $i_m = \frac{v_m}{Z}$ and $\phi = \tan^{-1}(\frac{X_C - X_L}{R})$.

Therefore, the instantaneous power $p$ supplied by the source is...
