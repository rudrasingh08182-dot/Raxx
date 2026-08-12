---
type: concept
title: AC Voltage Applied to a Purely Capacitive Circuit
category: school
subject: Physics
level: class-12
chapter: 7
chapter_name: ALTERNATING CURRENT
content_type: concept
tags:
- capacitor
- alternating-current
- capacitive-reactance
- class12
- Physics
- ALTERNATING CURRENT
- kirchhoffs-loop-rule
- physics
---

### 7.5 AC VOLTAGE APPLIED TO A CAPACITOR

Figure 7.7 shows an ac source generating ac voltage $v = v_m \sin \omega t$ connected to a capacitor only, a purely capacitive ac circuit.

When a capacitor is connected to a voltage source in a dc circuit, current will flow for the short time required to charge the capacitor. As charge accumulates on the capacitor plates, the voltage across them increases, opposing the current. That is, a capacitor in a dc circuit will limit or oppose the current as it charges. When the capacitor is fully charged, the current in the circuit falls to zero.

When the capacitor is connected to an ac source, as in Fig. 7.7, it limits or regulates the current, but does not completely prevent the flow of charge. The capacitor is alternately charged and discharged as the current reverses each half cycle. Let $q$ be the charge on the capacitor at any time $t$. The instantaneous voltage $v$ across the capacitor is:

$v = q/C$ (7.15)

From the Kirchhoff’s loop rule, the voltage across the source and the capacitor are equal,

$v_m \sin \omega t = q/C$

To find the current, we use the relation $i = dq/dt$:

$i = \frac{d}{dt} (C v_m \sin \omega t) = \omega C v_m \cos \omega t$

Using the relation, $\cos \omega t = \sin(\omega t + \pi/2)$, we have:

$i = i_m \sin(\omega t + \pi/2)$ (7.16)

where the amplitude of the oscillating current is $i_m = \omega C v_m$. We can rewrite it as:

$i_m = \frac{v_m}{(1/\omega C)}$

Comparing it to $i_m = v_m/R$ for a purely resistive circuit, we find that $(1/\omega C)$ plays the role of resistance. It is called capacitive reactance and is denoted by $X_c$,

$X_c = 1/\omega C$ (7.17)

so that the amplitude of the current is:

$i_m = v_m / X_c$ (7.18)

**FIGURE 7.7** An ac source connected to a capacitor.
