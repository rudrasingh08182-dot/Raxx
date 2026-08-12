---
type: concept
title: Derivation of Electric Potential Due to an Electric Dipole
category: school
subject: Physics
level: class-12
chapter: 2
chapter_name: ELECTROSTATIC POTENTIAL AND CAPACITANCE
content_type: concept
tags:
- ELECTROSTATIC POTENTIAL AND CAPACITANCE
- electric-potential
- Physics
- electric-dipole
- superposition-principle
- class12
- physics-derivation
- electrostatics
---

The field falls off, at large distance, not as $1/r^2$ (typical of field due to a single charge) but as $1/r^3$. We, now, determine the electric potential due to a dipole and contrast it with the potential due to a single charge. As before, we take the origin at the centre of the dipole. Now we know that the electric field obeys the superposition principle. Since potential is related to the work done by the field, electrostatic potential also follows the superposition principle. Thus, the potential due to the dipole is the sum of potentials due to the charges $q$ and $-q$:

$V = \frac{1}{4\pi\epsilon_0} \left( \frac{q}{r_1} - \frac{q}{r_2} \right)$ (2.9)

where $r_1$ and $r_2$ are the distances of the point $P$ from $q$ and $-q$, respectively. Now, by geometry,

$r_1^2 = r^2 + a^2 - 2ar \cos\theta$
$r_2^2 = r^2 + a^2 + 2ar \cos\theta$ (2.10)

We take $r$ much greater than $a$ ($r \gg a$) and retain terms only up to the first order in $a/r$:

$r_1 = r \left( 1 - \frac{2a}{r} \cos\theta + \frac{a^2}{r^2} \right)^{1/2} \cong r \left( 1 - \frac{a}{r} \cos\theta \right)$ (2.11)

Similarly,

$r_2 \cong r \left( 1 + \frac{a}{r} \cos\theta \right)$ (2.12)

Using the Binomial theorem and retaining terms up to the first order in $a/r$, we obtain:

$\frac{1}{r_1} \cong \frac{1}{r} \left( 1 + \frac{a}{r} \cos\theta \right)$ [2.13(a)]

$\frac{1}{r_2} \cong \frac{1}{r} \left( 1 - \frac{a}{r} \cos\theta \right)$ [2.13(b)]

Using Eqs. (2.9) and (2.13) and $p = 2qa$, we get:

$V = \frac{q}{4\pi\epsilon_0} \frac{2a \cos\theta}{r^2} = \frac{p \cos\theta}{4\pi\epsilon_0 r^2}$ (2.14)

Now, $p \cos\theta = \mathbf{p} \cdot \mathbf{\hat{r}}$

FIGURE 2.5 Quantities involved in the calculation of potential due to a dipole.
