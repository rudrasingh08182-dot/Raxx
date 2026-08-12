---
type: concept
title: Mutual Inductance of Concentric Coils and Induced EMF
category: school
subject: Physics
level: class-12
chapter: 6
chapter_name: ELECTROMAGNETIC INDUCTION
content_type: solved-example
tags:
- magnetic-flux
- mutual-inductance
- Physics
- class12
- ELECTROMAGNETIC INDUCTION
- solenoids
- electromagnetic-induction
- physics-concepts
---

### Electromagnetic Induction

**EXAMPLE 6.8**

We explained the above example with air as the medium within the solenoids. Instead, if a medium of relative permeability $\mu_r$ had been present, the mutual inductance would be:

$M = \mu_r \mu_0 n_1 n_2 \pi r_1^2 l$

It is also important to know that the mutual inductance of a pair of coils, solenoids, etc., depends on their separation as well as their relative orientation.

**Example 6.8** Two concentric circular coils, one of small radius $r_1$ and the other of large radius $r_2$, such that $r_1 \ll r_2$, are placed co-axially with centres coinciding. Obtain the mutual inductance of the arrangement.

**Solution:** Let a current $I_2$ flow through the outer circular coil. The field at the centre of the coil is $B_2 = \frac{\mu_0 I_2}{2 r_2}$. Since the other co-axially placed coil has a very small radius, $B_2$ may be considered constant over its cross-sectional area. Hence,

$\Phi_1 = \pi r_1^2 B_2$

$\Phi_1 = \frac{\mu_0 \pi r_1^2 I_2}{2 r_2} = M_{12} I_2$

Thus,

$M_{12} = \frac{\mu_0 \pi r_1^2}{2 r_2}$

From Eq. (6.12),

$M_{12} = M_{21} = \frac{\mu_0 \pi r_1^2}{2 r_2}$

Note that we calculated $M_{12}$ from an approximate value of $\Phi_1$, assuming the magnetic field $B_2$ to be uniform over the area $\pi r_1^2$. However, we can accept this value because $r_1 \ll r_2$.

Now, let us recollect Experiment 6.3 in Section 6.2. In that experiment, emf is induced in coil $C_1$ wherever there was any change in current through coil $C_2$. Let $\Phi_1$ be the flux through coil $C_1$ (say of $N_1$ turns) when current in coil $C_2$ is $I_2$.

Then, from Eq. (6.7), we have:

$N_1 \Phi_1 = M I_2$

For currents varying with time,

$N_1 \frac{d\Phi_1}{dt} = M \frac{dI_2}{dt}$

Since induced emf in coil $C_1$ is given by:

$\varepsilon_1 = -N_1 \frac{d\Phi_1}{dt}$

We get,

$\varepsilon_1 = -M \frac{dI_2}{dt}$
