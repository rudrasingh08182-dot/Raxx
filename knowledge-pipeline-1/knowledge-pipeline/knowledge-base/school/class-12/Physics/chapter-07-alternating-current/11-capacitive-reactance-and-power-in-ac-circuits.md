---
type: concept
title: Capacitive Reactance and Power in AC Circuits
category: school
subject: Physics
level: class-12
chapter: 7
chapter_name: ALTERNATING CURRENT
content_type: concept
tags:
- capacitive-reactance
- alternating-current
- class12
- phasor-diagram
- Physics
- ALTERNATING CURRENT
- instantaneous-power
- physics-concepts
---

185
Alternating Current

FIGURE 7.8 (a) A Phasor diagram for the circuit in Fig. 7.7. (b) Graph of $v$ and $i$ versus $\omega t$. The dimension of capacitive reactance is the same as that of resistance and its SI unit is ohm ($\Omega$). The capacitive reactance limits the amplitude of the current in a purely capacitive circuit in the same way as the resistance limits the current in a purely resistive circuit. But it is inversely proportional to the frequency and the capacitance. A comparison of Eq. (7.16) with the equation of source voltage, Eq. (7.1) shows that the current is $\pi/2$ ahead of voltage. Figure 7.8(a) shows the phasor diagram at an instant $t_1$. Here the current phasor $I$ is $\pi/2$ ahead of the voltage phasor $V$ as they rotate counterclockwise. Figure 7.8(b) shows the variation of voltage and current with time. We see that the current reaches its maximum value earlier than the voltage by one-fourth of a period. The instantaneous power supplied to the capacitor is:

$p_c = i v = i_m \cos(\omega t) v_m \sin(\omega t)$
$= i_m v_m \cos(\omega t) \sin(\omega t)$
$= \frac{i_m v_m}{2} \sin(2\omega t)$ (7.19)

So, as in the case of an inductor, the average power

$P_C = \langle \frac{i_m v_m}{2} \sin(2\omega t) \rangle = \frac{i_m v_m}{2} \langle \sin(2\omega t) \rangle = 0$

since $\langle \sin(2\omega t) \rangle = 0$ over a complete cycle. Thus, we see that in the case of an inductor, the current lags the voltage by $\pi/2$ and in the case of a capacitor, the current leads the voltage by $\pi/2$.

**Example 7.3** A lamp is connected in series with a capacitor. Predict your observations for dc and ac connections. What happens in each case if the capacitance of the capacitor is reduced?

**Solution** When a dc source is connected to a capacitor, the capacitor gets charged and after charging no current flows in the circuit and the lamp will not glow. There will be no change even if $C$ is reduced. With ac source, the capacitor offers capacitive reactance ($1/\omega C$) and the current flows in the circuit. Consequently, the lamp will shine. Reducing $C$ will increase reactance and the lamp will shine less brightly than before.

**Example 7.4** A 15.0 $\mu F$ capacitor is connected to a 220 V, 50 Hz source. Find the capacitive reactance and the current (rms and peak) in the circuit. If the frequency is doubled, what happens to the capacitive reactance and the current?
