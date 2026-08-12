---
type: concept
title: Drift Velocity and the Derivation of Ohm's Law
category: school
subject: Physics
level: class-12
chapter: 3
chapter_name: CURRENT ELECTRICITY
content_type: concept
tags:
- class12
- relaxation-time
- Physics
- drift-velocity
- CURRENT ELECTRICITY
- current-density
- electrodynamics
- ohms-law
---

Physics 86

Time more than $t$ and some less than $t$. In other words, the time $t_i$ in Eq. (3.16) will be less than $t$ for some and more than $t$ for others as we go through the values of $i = 1, 2, ..., N$. The average value of $t_i$ then is $\tau$ (known as relaxation time). Thus, averaging Eq. (3.16) over the $N$-electrons at any given time $t$ gives us for the average velocity $v_d$:

$v_d = \langle v_i \rangle = \langle v_{i0} \rangle - \frac{eE}{m} \langle t_i \rangle = 0 - \frac{eE}{m} \tau = -\frac{eE\tau}{m}$ (3.17)

This last result is surprising. It tells us that the electrons move with an average velocity which is independent of time, although electrons are accelerated. This is the phenomenon of drift and the velocity $v_d$ in Eq. (3.17) is called the drift velocity. Because of the drift, there will be net transport of charges across any area perpendicular to $E$. Consider a planar area $A$, located inside the conductor such that the normal to the area is parallel to $E$ (Fig. 3.4). Then because of the drift, in an infinitesimal amount of time $\Delta t$, all electrons to the left of the area at distances up to $|v_d|\Delta t$ would have crossed the area. If $n$ is the number of free electrons per unit volume in the metal, then there are $n \Delta t |v_d| A$ such electrons. Since each electron carries a charge $-e$, the total charge transported across this area $A$ to the right in time $\Delta t$ is $-neA|v_d|\Delta t$. $E$ is directed towards the left and hence the total charge transported along $E$ across the area is negative of this. The amount of charge crossing the area $A$ in time $\Delta t$ is by definition [Eq. (3.2)] $I \Delta t$, where $I$ is the magnitude of the current. Hence,

$I \Delta t = n e A |v_d| \Delta t$ (3.18)

Substituting the value of $|v_d|$ from Eq. (3.17)

$I \Delta t = n e A \left( \frac{eE\tau}{m} \right) \Delta t$ (3.19)

By definition $I$ is related to the magnitude $|j|$ of the current density by

$I = |j|A$ (3.20)

Hence, from Eqs. (3.19) and (3.20),

$j = \frac{ne^2\tau}{m} E$ (3.21)

The vector $j$ is parallel to $E$ and hence we can write Eq. (3.21) in the vector form

$j = \frac{ne^2\tau}{m} E$ (3.22)

Comparison with Eq. (3.13) shows that Eq. (3.22) is exactly the Ohm’s law, if we identify the conductivity $\sigma$ as:

FIGURE 3.4 Current in a metallic conductor. The magnitude of current density in a metal is the magnitude of charge contained in a cylinder of unit area and length $v_d$. Reprint 2026-27
