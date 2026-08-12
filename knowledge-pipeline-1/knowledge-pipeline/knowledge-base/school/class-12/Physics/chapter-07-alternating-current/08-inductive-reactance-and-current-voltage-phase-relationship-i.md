---
type: concept
title: Inductive Reactance and Current-Voltage Phase Relationship in AC Circuits
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
- electromagnetic-induction
- physics
- inductive-reactance
---

The negative sign follows from Lenz’s law (Chapter 6). Combining Eqs. (7.1) and (7.10), we have

$\frac{di}{dt} = \frac{v_m}{L} \sin(\omega t)$ (7.11)

Equation (7.11) implies that the equation for $i(t)$, the current as a function of time, must be such that its slope $di/dt$ is a sinusoidally varying quantity, with the same phase as the source voltage and an amplitude given by $v_m/L$. To obtain the current, we integrate $di/dt$ with respect to time:

$i = \int \frac{di}{dt} dt = \int \frac{v_m}{L} \sin(\omega t) dt$

and get,

$i = -\frac{v_m}{\omega L} \cos(\omega t) + \text{constant}$

The integration constant has the dimension of current and is time-independent. Since the source has an emf which oscillates symmetrically about zero, the current it sustains also oscillates symmetrically about zero, so that no constant or time-independent component of the current exists. Therefore, the integration constant is zero.

Using $-\cos(\omega t) = \sin(\omega t - \frac{\pi}{2})$, we have

$i = i_m \sin(\omega t - \frac{\pi}{2})$ (7.12)

where $i_m = \frac{v_m}{\omega L}$ is the amplitude of the current. The quantity $\omega L$ is analogous to the resistance and is called inductive reactance, denoted by $X_L$:

$X_L = \omega L$ (7.13)

The amplitude of the current is, then

$i_m = \frac{v_m}{X_L}$ (7.14)

The dimension of inductive reactance is the same as that of resistance and its SI unit is ohm ($\Omega$). The inductive reactance limits the current in a purely inductive circuit in the same way as the resistance limits the current in a purely resistive circuit. The inductive reactance is directly proportional to the inductance and to the frequency of the current.

A comparison of Eqs. (7.1) and (7.12) for the source voltage and the current in an inductor shows that the current lags the voltage by $\pi/2$ or one-quarter (1/4) cycle. Figure 7.6 (a) shows the voltage and the current phasors in the present case at instant $t_1$. The current phasor $I$ is $\pi/2$ behind the voltage phasor $V$. When rotated with frequency $\omega$ counter-clockwise, they generate the voltage and current given by Eqs. (7.1) and (7.12), respectively and as shown in Fig. 7.6(b).

Interactive animation on Phasor diagrams of ac circuits containing, R, L, C and RLC series circuits:
http://www.animations.physics.unsw.edu.au//jw/AC.html
