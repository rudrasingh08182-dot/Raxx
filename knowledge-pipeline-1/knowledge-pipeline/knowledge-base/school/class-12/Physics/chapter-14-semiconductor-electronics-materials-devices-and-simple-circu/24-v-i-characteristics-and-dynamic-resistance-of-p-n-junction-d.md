---
type: concept
title: V-I Characteristics and Dynamic Resistance of P-N Junction Diodes
category: school
subject: Physics
level: class-12
chapter: 14
chapter_name: 'SEMICONDUCTOR ELECTRONICS: MATERIALS, DEVICES AND SIMPLE CIRCUITS'
content_type: solved-example
tags:
- Physics
- 'SEMICONDUCTOR ELECTRONICS: MATERIALS, DEVICES AND SIMPLE CIRCUITS'
- class12
- semiconductor-electronics
- p-n-junction-diode
- reverse-bias
- dynamic-resistance
- forward-bias
- rectification
---

### Semiconductor Electronics: Materials, Devices and Simple Circuits

In forward bias, the current first increases very slowly, almost negligibly, till the voltage across the diode crosses a certain value. After the characteristic voltage, the diode current increases significantly (exponentially), even for a very small increase in the diode bias voltage. This voltage is called the threshold voltage or cut-in voltage (~0.2V for germanium diode and ~0.7 V for silicon diode).

For the diode in reverse bias, the current is very small (~µA) and almost remains constant with change in bias. It is called reverse saturation current. However, for special cases, at very high reverse bias (breakdown voltage), the current suddenly increases. This special action of the diode is discussed later in Section 14.8. The general purpose diodes are not used beyond the reverse saturation current region.

The above discussion shows that the p-n junction diode primarily allows the flow of current only in one direction (forward bias). The forward bias resistance is low as compared to the reverse bias resistance. This property is used for rectification of ac voltages as discussed in the next section. For diodes, we define a quantity called dynamic resistance as the ratio of small change in voltage $\Delta V$ to a small change in current $\Delta I$:

$r_d = \frac{\Delta V}{\Delta I}$ (14.6)

**Example 14.4** The V-I characteristic of a silicon diode is shown in the Fig. 14.17. Calculate the resistance of the diode at (a) $I_D = 15 \text{ mA}$ and (b) $V_D = -10 \text{ V}$.

**FIGURE 14.17**

**Solution** Considering the diode characteristics as a straight line between $I = 10 \text{ mA}$ to $I = 20 \text{ mA}$ passing through the origin, we can calculate the resistance using Ohm’s law.

(a) From the curve, at $I = 20 \text{ mA}$, $V = 0.8 \text{ V}$; $I = 10 \text{ mA}$, $V = 0.7 \text{ V}$
$r_{fb} = \frac{\Delta V}{\Delta I} = \frac{0.1 \text{ V}}{10 \text{ mA}} = 10 \text{ } \Omega$

(b) From the curve at $V = -10 \text{ V}$, $I = -1 \text{ } \mu\text{A}$,
Therefore,
$r_{rb} = \frac{10 \text{ V}}{1 \text{ } \mu\text{A}} = 1.0 \times 10^7 \text{ } \Omega$
