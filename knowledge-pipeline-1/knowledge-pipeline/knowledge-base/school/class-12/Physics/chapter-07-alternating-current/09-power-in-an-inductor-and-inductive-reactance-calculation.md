---
type: concept
title: Power in an Inductor and Inductive Reactance Calculation
category: school
subject: Physics
level: class-12
chapter: 7
chapter_name: ALTERNATING CURRENT
content_type: solved-example
tags:
- rms-current
- alternating-current
- class12
- Physics
- ALTERNATING CURRENT
- average-power
- pure-inductor
- inductive-reactance
---

183
Alternating Current
EXAMPLE 7.2

We see that the current reaches its maximum value later than the voltage by one-fourth of a period $T/4 = [\pi / (2\omega)]$. You have seen that an inductor has reactance that limits current similar to resistance in a dc circuit. Does it also consume power like a resistance? Let us try to find out.

The instantaneous power supplied to the inductor is
$p = iv = i_m \sin(\omega t - \pi/2) \times v_m \sin(\omega t)$
$p = -i_m v_m \cos(\omega t) \sin(\omega t)$
$p = -i_m v_m \sin(2\omega t) / 2$

So, the average power over a complete cycle is
$P_L = \langle -i_m v_m \sin(2\omega t) / 2 \rangle = 0$,
since the average of $\sin(2\omega t)$ over a complete cycle is zero.

Thus, the average power supplied to an inductor over one complete cycle is zero.

**Example 7.2** A pure inductor of 25.0 mH is connected to a source of 220 V. Find the inductive reactance and rms current in the circuit if the frequency of the source is 50 Hz.

**Solution** The inductive reactance,
$X_L = 2\pi \nu L = 2 \times 3.14 \times 50 \times 25 \times 10^{-3} \Omega$
$X_L = 7.85 \Omega$

The rms current in the circuit is
$I = V / X_L = 220 / 7.85 = 28 A$

FIGURE 7.6 (a) A Phasor diagram for the circuit in Fig. 7.5. (b) Graph of v and i versus $\omega t$.

Reprint 2026-27
