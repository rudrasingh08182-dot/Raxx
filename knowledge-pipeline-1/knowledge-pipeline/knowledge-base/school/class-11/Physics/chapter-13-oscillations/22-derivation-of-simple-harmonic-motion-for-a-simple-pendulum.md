---
type: concept
title: Derivation of Simple Harmonic Motion for a Simple Pendulum
category: school
subject: Physics
level: class-11
chapter: 13
chapter_name: OSCILLATIONS
content_type: concept
tags:
- oscillations
- Physics
- angular-motion
- OSCILLATIONS
- simple-pendulum
- simple-harmonic-motion
- physics-mechanics
- class12
---

OSCILLATIONS 271

Force due to gravity ($mg$). The force $mg$ can be resolved into the component $mg \cos\theta$ along the string and $mg \sin\theta$ perpendicular to it. Since the motion of the bob is along a circle of length $L$ and centre at the support point, the bob has a radial acceleration ($\omega^2 L$) and also a tangential acceleration; the latter arises since motion along the arc of the circle is not uniform. The radial acceleration is provided by the net radial force $T - mg \cos\theta$, while the tangential acceleration is provided by $mg \sin\theta$. It is more convenient to work with torque about the support since the radial force gives zero torque. Torque $\tau$ about the support is entirely provided by the tangential component of force:

$\tau = -L (mg \sin\theta)$ (13.19)

This is the restoring torque that tends to reduce angular displacement — hence the negative sign. By Newton’s law of rotational motion,

$\tau = I \alpha$ (13.20)

where $I$ is the moment of inertia of the system about the support and $\alpha$ is the angular acceleration. Thus,

$I \alpha = -mg \sin\theta L$ (13.21)

Or,

$\alpha = -\frac{mgL}{I} \sin\theta$ (13.22)

We can simplify Eq. (13.22) if we assume that the displacement $\theta$ is small. We know that $\sin\theta$ can be expressed as,

$\sin\theta = \theta - \frac{\theta^3}{3!} + \frac{\theta^5}{5!} - ...$ (13.23)

where $\theta$ is in radians.

Now if $\theta$ is small, $\sin\theta$ can be approximated by $\theta$ and Eq. (13.22) can then be written as,

$\alpha = -\frac{mgL}{I} \theta$ (13.24)

In Table 13.1, we have listed the angle $\theta$ in degrees, its equivalent in radians, and the value of the function $\sin\theta$. From this table it can be seen that for $\theta$ as large as 20 degrees, $\sin\theta$ is nearly the same as $\theta$ expressed in radians.

| Table 13.1 | $\sin\theta$ as a function of angle $\theta$ |
| :--- | :--- |
| (degrees) | (radians) | $\sin\theta$ |

Equation (13.24) is mathematically identical to Eq. (13.11) except that the variable is angular displacement. Hence we have proved that for small $\theta$, the motion of the bob is simple harmonic. From Eqs. (13.24) and (13.11),

$\omega = \sqrt{\frac{mgL}{I}}$

and
