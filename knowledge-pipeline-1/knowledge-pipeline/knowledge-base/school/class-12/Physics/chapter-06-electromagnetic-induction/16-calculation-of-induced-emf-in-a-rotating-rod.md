---
type: concept
title: Calculation of Induced EMF in a Rotating Rod
category: school
subject: Physics
level: class-12
chapter: 6
chapter_name: ELECTROMAGNETIC INDUCTION
content_type: solved-example
tags:
- physics-derivation
- Physics
- class12
- ELECTROMAGNETIC INDUCTION
- rotating-rod
- electromagnetic-induction
- motional-emf
---

### EXAMPLE 6.6

**Solution**

**Method I**
As the rod is rotated, free electrons in the rod move towards the outer end due to Lorentz force and get distributed over the ring. Thus, the resulting separation of charges produces an emf across the ends of the rod. At a certain value of emf, there is no more flow of electrons and a steady state is reached. Using Eq. (6.5), the magnitude of the emf generated across a length $dr$ of the rod as it moves at right angles to the magnetic field is given by $d\varepsilon = Bv dr$. Hence,

$\varepsilon = \int d\varepsilon = \int_{0}^{R} Bv dr = \int_{0}^{R} B\omega r dr = \frac{1}{2} B\omega R^2$

Note that we have used $v = \omega r$. This gives

$\varepsilon = \frac{1}{2} \times 1.0 \times 50 \times (1)^2 = 157 \text{ V}$

**Method II**
To calculate the emf, we can imagine a closed loop OPQ in which point O and P are connected with a resistor R and OQ is the rotating rod. The potential difference across the resistor is then equal to the induced emf and equals $B \times$ (rate of change of area of loop). If $\theta$ is the angle between the rod and the radius of the circle at P at time $t$, the area of the sector OPQ is given by

$\frac{1}{2} R^2 \theta$

where $R$ is the radius of the circle. Hence, the induced emf is

$\varepsilon = B \frac{d}{dt} \left[ \frac{1}{2} R^2 \theta \right] = \frac{1}{2} B R^2 \frac{d\theta}{dt} = \frac{1}{2} B R^2 \omega$

[Note: $\frac{d\theta}{dt} = \omega$]

This expression is identical to the expression obtained by Method I and we get the same value of $\varepsilon$.
