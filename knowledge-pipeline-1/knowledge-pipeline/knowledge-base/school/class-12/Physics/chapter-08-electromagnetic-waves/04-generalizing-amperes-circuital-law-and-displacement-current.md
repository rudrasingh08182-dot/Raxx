---
type: concept
title: Generalizing Ampere's Circuital Law and Displacement Current
category: school
subject: Physics
level: class-12
chapter: 8
chapter_name: ELECTROMAGNETIC WAVES
content_type: concept
tags:
- gauss-law
- electric-flux
- class12
- ampere-circuital-law
- displacement-current
- electromagnetic-waves
- ELECTROMAGNETIC WAVES
- Physics
---

Now, consider a different surface, which has the same boundary. This is a pot-like surface [Fig. 8.1(b)] which nowhere touches the current, but has its bottom between the capacitor plates; its mouth is the circular loop mentioned above. Another such surface is shaped like a tiffin box (without the lid) [Fig. 8.1(c)]. On applying Ampere’s circuital law to such surfaces with the same perimeter, we find that the left hand side of Eq. (8.1) has not changed but the right hand side is zero and not $\mu_0 i$, since no current passes through the surface of Fig. 8.1(b) and (c). So we have a contradiction; calculated one way, there is a magnetic field at a point P; calculated another way, the magnetic field at P is zero. Since the contradiction arises from our use of Ampere’s circuital law, this law must be missing something. The missing term must be such that one gets the same magnetic field at point P, no matter what surface is used. We can actually guess the missing term by looking carefully at Fig. 8.1(c). Is there anything passing through the surface S between the plates of the capacitor? Yes, of course, the electric field! If the plates of the capacitor have an area A, and a total charge Q, the magnitude of the electric field E between the plates is $(Q/A)/\epsilon_0$ (see Eq. 2.41). The field is perpendicular to the surface S of Fig. 8.1(c). It has the same magnitude over the area A of the capacitor plates, and vanishes outside it. So what is the electric flux $\Phi_E$ through the surface S? Using Gauss’s law, it is:

$\Phi_E = E A = \frac{1}{\epsilon_0} \frac{Q}{A} A = \frac{Q}{\epsilon_0}$ (8.3)

Now if the charge Q on the capacitor plates changes with time, there is a current $i = (dQ/dt)$, so that using Eq. (8.3), we have:

$\frac{d\Phi_E}{dt} = \frac{d}{dt} \left( \frac{Q}{\epsilon_0} \right) = \frac{1}{\epsilon_0} \frac{dQ}{dt}$

This implies that for consistency,

$\epsilon_0 \left( \frac{d\Phi_E}{dt} \right) = i$ (8.4)

This is the missing term in Ampere’s circuital law. If we generalise this law by adding to the total current carried by conductors through the surface, another term which is $\epsilon_0$ times the rate of change of electric flux through the same surface, the total has the same value of current $i$ for all surfaces.
