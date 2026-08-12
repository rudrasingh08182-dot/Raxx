---
type: concept
title: Magnetic Energy in Inductors and Solenoids
category: school
subject: Physics
level: class-12
chapter: 6
chapter_name: ELECTROMAGNETIC INDUCTION
content_type: concept
tags:
- solenoid
- Physics
- class12
- ELECTROMAGNETIC INDUCTION
- self-inductance
- electromagnetic-induction
- physics-concepts
- magnetic-energy
---

Electromagnetic Induction 169

The role of inertia. It is the electromagnetic analogue of mass in mechanics. So, work needs to be done against the back emf ($\varepsilon$) in establishing the current. This work done is stored as magnetic potential energy. For the current $I$ at an instant in a circuit, the rate of work done is

$\frac{dW}{dt} = I\varepsilon$

If we ignore the resistive losses and consider only inductive effect, then using Eq. (6.14),

$\frac{dW}{dt} = L I \frac{dI}{dt}$

Total amount of work done in establishing the current $I$ is

$W = \int dW = \int_{0}^{I} L I dI$

Thus, the energy required to build up the current $I$ is,

$U = \frac{1}{2} L I^2$ (6.17)

This expression reminds us of $\frac{1}{2}mv^2$ for the (mechanical) kinetic energy of a particle of mass $m$, and shows that $L$ is analogous to $m$ (i.e., $L$ is electrical inertia and opposes growth and decay of current in the circuit).

Consider the general case of currents flowing simultaneously in two nearby coils. The flux linked with one coil will be the sum of two fluxes which exist independently. Equation (6.7) would be modified into

$N_1 \Phi_1 = M_{11} I_1 + M_{12} I_2$

where $M_{11}$ represents inductance due to the same coil. Therefore, using Faraday’s law,

$\varepsilon_1 = - M_{11} \frac{dI_1}{dt} - M_{12} \frac{dI_2}{dt}$

$M_{11}$ is the self-inductance and is written as $L_1$. Therefore,

$\varepsilon_1 = - L_1 \frac{dI_1}{dt} - M_{12} \frac{dI_2}{dt}$

**Example 6.9**
(a) Obtain the expression for the magnetic energy stored in a solenoid in terms of magnetic field $B$, area $A$ and length $l$ of the solenoid. (b) How does this magnetic energy compare with the electrostatic energy stored in a capacitor?

**Solution**
(a) From Eq. (6.17), the magnetic energy is

$U_B = \frac{1}{2} L I^2$

$= \frac{1}{2} (\mu_0 n^2 Al) \left( \frac{B}{\mu_0 n} \right)^2$ (since $B = \mu_0 n I$ for a solenoid)

$= \frac{1}{2} \left( \frac{B^2}{\mu_0^2 n^2} \right) (\mu_0 n^2 Al)$ [from Eq. (6.15)]

$= \frac{1}{2} \frac{B^2}{\mu_0} Al$

(b) The magnetic energy per unit volume is,

$u_B = \frac{U_B}{V}$ (where $V$ is volume that contains flux)

$u_B = \frac{U_B}{Al}$
